import {
  buildAttackerDescription,
  buildDefenderTail,
  buildDescription,
  computeMultiHitKOChance,
  getBerryRecovery,
  getDamageWithoutBerry,
  getEndOfTurn,
  roundChance,
  serializeEndOfTurnTexts,
  toxicDamageAtStage,
  truncateToRoll
} from "@calc/engine/desc"
import { isStaminaActive, landsTargetDefensiveDrop, readsDefensiveStage } from "@calc/engine/defensive-boost-ladder"
import { afterHits, defenderReactsToHit } from "@calc/engine/hit-reactions"
import { Combatants } from "@calc/engine/prepare-combatants"
import { HpPathInput, rowsAlongPath, turnsUntilKO, walkHpPath } from "@calc/engine/hp-path"
import { ProgressiveDefensiveDamage } from "@calc/engine/progressive-defensive-damage"
import { FIRST_HIT_ONLY_ABILITIES } from "@calc/engine/target-hp"
import { effectiveSelfStatChange } from "@calc/engine/self-stat-change"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Field } from "@calc/model/field"
import { AfterTurnData, AfterTurnResult, applyTurnDamage, DEFAULT_ROLL_INDEX, Result, TurnBerry } from "@calc/model/result"
import { RawDesc, StatID } from "@data/types"

type KOChanceSetup = {
  baseDamages: number[][]
  baseBerryRecovery: number[]
  baseBerryThreshold: number[]
  progressiveBerryRecovery: number[]
  damageAfterBerryByRow: (number[] | undefined)[]
  rowsPerTurn: number
  toxicCounter: number
  hasProgressiveBoosts: boolean
  progressiveDamages: number[][]
  progressiveFullHpRows: number[][]
  progressiveContinuesUse: boolean[]
}

export class MultiResult {
  defender: Pokemon
  results: Result[]
  eot: { damage: number; texts: string[] }
  turns: number

  readonly inputs: Combatants[]
  private simulator?: ProgressiveDefensiveDamage

  constructor(defender: Pokemon, results: Result[], eot: { damage: number; texts: string[] }, turns: number, inputs: Combatants[]) {
    this.defender = defender
    this.results = results
    this.eot = eot
    this.turns = turns
    this.inputs = inputs
  }

  afterTurn(rollIndex = DEFAULT_ROLL_INDEX): AfterTurnResult {
    if (this.usesSimulator()) {
      return new AfterTurnResult(turnsUntilKO(walkHpPath(this.hpPathInput(10), rollIndex).turns))
    }

    const defender = this.results[0].defender
    const totalEotDamage = this.currentEotDamage()
    const berry = this.berryOf(defender)

    const data: AfterTurnData[] = []
    let currentHP = defender.currentHp()
    let berryConsumed = false

    const damagesAtIndex = this.results.map(r => new DamageDistribution(r.damage).totalAt(rollIndex))
    const damagesWithoutBerryAtIndex = this.results.map(r => {
      const withoutBerry = getDamageWithoutBerry(r.damage, r.rawDesc, r.move, defender)

      return withoutBerry !== undefined ? new DamageDistribution(withoutBerry).totalAt(rollIndex) : null
    })
    const hasTypeBerry = damagesWithoutBerryAtIndex.some(d => d !== null)

    for (let i = 1; i <= 10; i++) {
      const turnDamages = i === 1 || !hasTypeBerry ? damagesAtIndex : damagesWithoutBerryAtIndex.map((d, idx) => d ?? damagesAtIndex[idx])
      const turn = applyTurnDamage(currentHP, turnDamages, defender.maxHp(), berry, berryConsumed)
      currentHP = turn.hp
      berryConsumed = turn.berryConsumed
      let turnValue = turn.recovered

      if (currentHP <= 0) {
        data.push({ turn: i, residualDelta: turnValue, hp: 0 })
        break
      }

      const turnEotDamage = totalEotDamage - this.toxicDamageForTurn(i)

      currentHP += turnEotDamage
      turnValue += turnEotDamage

      if (currentHP > defender.maxHp()) {
        currentHP = defender.maxHp()
      }

      data.push({ turn: i, residualDelta: turnValue, hp: currentHP })

      if (currentHP <= 0) {
        break
      }
    }

    return new AfterTurnResult(data)
  }

  private berryOf(defender: Pokemon): TurnBerry {
    return getBerryRecovery(this.results[0].attacker, defender, this.results[0].move)
  }

  private hpPathInput(turns: number): HpPathInput {
    const defender = this.results[0].defender
    const simulator = this.progressiveSimulator()
    const rows = simulator.hitDamages(turns)
    const berry = this.berryOf(defender)

    return {
      rows,
      fullHpRows: simulator.fullHpRows(turns),
      continuesUse: simulator.continuesUse(turns),
      rowsPerTurn: rows.length / turns,
      hp: defender.currentHp(),
      maxHp: defender.maxHp(),
      eot: this.currentEotDamage(),
      toxicDamageForTurn: turn => this.toxicDamageForTurn(turn),
      berryRecovery: berry.recovery,
      berryThreshold: berry.threshold,
      itemLoss: simulator.itemLoss(turns)
    }
  }

  private afterFirstTurn(): { defender: Pokemon; field: Field } {
    return afterHits(this.results, this.results[0].defender, this.results[0].field)
  }

  private progressiveSimulator(): ProgressiveDefensiveDamage {
    this.simulator ??= new ProgressiveDefensiveDamage(this.defender, this.results, this.turns, this.inputs)

    return this.simulator
  }

  private toxicDamageForTurn(turn: number): number {
    const defender = this.results[0].defender

    if (!defender.hasStatus("tox") || defender.hasAbility("Magic Guard", "Poison Heal")) {
      return 0
    }

    return toxicDamageAtStage(defender.toxicCounter + turn - 1, defender.maxHp())
  }

  survivesHits(hits: number, rollIndex = DEFAULT_ROLL_INDEX): boolean {
    return this.koChanceWithin(hits, rollIndex) === 0
  }

  koChanceWithin(hits: number, rollIndex = DEFAULT_ROLL_INDEX): number {
    if (hits < 1) {
      return 0
    }

    const target = this.results[0].defender
    const setup = this.koChanceSetup(rollIndex)
    const eotDamage = this.currentEotDamage()

    return this.koChanceForTurn(setup, hits, target, eotDamage).chance
  }

  koChanceLowerBound(hits: number, rollIndex: number): number {
    const target = this.results[0].defender
    const setup = this.koChanceSetup(rollIndex)
    const recovery = this.maxBerryRecovery(target)
    const healingEot = Math.max(0, this.currentEotDamage())
    const rows = setup.hasProgressiveBoosts ? setup.progressiveFullHpRows.slice(0, hits * setup.rowsPerTurn) : this.repeatedBaseDamages(setup, hits)
    const noBerry = rows.map(() => 0)

    return computeMultiHitKOChance(rows, target.currentHp() + recovery, healingEot, target.maxHp() + recovery, noBerry, noBerry, setup.rowsPerTurn, setup.toxicCounter).chance
  }

  private maxBerryRecovery(target: Pokemon): number {
    let recovery = 0

    for (const result of this.results) {
      recovery = Math.max(recovery, getBerryRecovery(result.attacker, target, result.move).recovery)
    }

    return recovery
  }

  certainlyKOs(hits: number, rollIndex = DEFAULT_ROLL_INDEX): boolean {
    if (hits < 1) {
      return false
    }

    const target = this.results[0].defender
    const setup = this.koChanceSetup(rollIndex)
    const maxBerryRecovery = this.maxBerryRecovery(target)

    const rows = setup.hasProgressiveBoosts ? setup.progressiveDamages.slice(0, hits * setup.rowsPerTurn).map(row => truncateToRoll(row, rollIndex)) : this.repeatedBaseDamages(setup, hits)

    let maxDamage = 0

    for (const row of rows) {
      maxDamage += Math.max(...row)
    }

    const maxHealing = maxBerryRecovery + hits * Math.max(0, this.currentEotDamage())

    return maxDamage >= target.currentHp() + maxHealing
  }

  private repeatedBaseDamages(setup: KOChanceSetup, hits: number): number[][] {
    const rows: number[][] = []

    for (let turn = 0; turn < hits; turn++) {
      rows.push(...setup.baseDamages)
    }

    return rows
  }

  private currentEotDamage(): number {
    const { defender, field } = this.afterFirstTurn()
    const baseEot = getEndOfTurn(this.results[0].attacker, defender, new Move("Splash"), field)

    let totalEotDamage = baseEot.damage

    for (const result of this.results) {
      const resultEot = getEndOfTurn(result.attacker, defender, result.move, field)
      totalEotDamage += Math.min(0, resultEot.damage - baseEot.damage)
    }

    return totalEotDamage
  }

  private koChanceSetup(rollIndex = DEFAULT_ROLL_INDEX): KOChanceSetup {
    const target = this.results[0].defender

    const baseDamages: number[][] = []
    const baseBerryRecovery: number[] = []
    const baseBerryThreshold: number[] = []

    for (const result of this.results) {
      const damage = new DamageDistribution(result.damage).subArrays().map(row => truncateToRoll(row, rollIndex))
      const berry = getBerryRecovery(result.attacker, target, result.move)

      baseDamages.push(...damage)

      damage.forEach(() => {
        baseBerryRecovery.push(berry.recovery)
        baseBerryThreshold.push(berry.threshold)
      })
    }

    const hasProgressiveBoosts = this.usesSimulator()
    const progressiveTurns = Math.max(9, this.turns)
    const progressiveDamages = hasProgressiveBoosts ? this.progressiveSimulator().hitDamages(progressiveTurns) : []
    const itemLoss = hasProgressiveBoosts ? this.progressiveSimulator().itemLoss(progressiveTurns) : undefined
    const progressiveBerryRecovery = progressiveDamages.map((_, row) => (itemLoss && row >= itemLoss.row ? 0 : baseBerryRecovery[row % baseDamages.length]))
    const damageAfterBerryByRow = progressiveDamages.map((_, row) => (itemLoss?.row === row ? truncateToRoll(itemLoss.rowWithoutItem, rollIndex) : undefined))

    return {
      baseDamages,
      baseBerryRecovery,
      baseBerryThreshold,
      progressiveBerryRecovery,
      damageAfterBerryByRow,
      rowsPerTurn: baseDamages.length,
      toxicCounter: target.status === "tox" ? target.toxicCounter : 0,
      hasProgressiveBoosts,
      progressiveDamages: progressiveDamages.map(row => truncateToRoll(row, rollIndex)),
      progressiveContinuesUse: hasProgressiveBoosts ? this.progressiveSimulator().continuesUse(progressiveTurns) : [],
      progressiveFullHpRows: hasProgressiveBoosts
        ? this.progressiveSimulator()
            .fullHpRows(progressiveTurns)
            .map(row => truncateToRoll(row, rollIndex))
        : []
    }
  }

  private koChanceForTurn(setup: KOChanceSetup, turn: number, target: Pokemon, eotDamage: number, toxicCounter = setup.toxicCounter) {
    const rows = turn * setup.rowsPerTurn
    const currentBerryRecovery: number[] = []
    const currentBerryThreshold: number[] = []

    for (let j = 0; j < turn; j++) {
      currentBerryRecovery.push(...setup.baseBerryRecovery)
      currentBerryThreshold.push(...setup.baseBerryThreshold)
    }

    if (setup.hasProgressiveBoosts) {
      const recovery = setup.progressiveBerryRecovery.slice(0, rows)

      return computeMultiHitKOChance(
        setup.progressiveDamages.slice(0, rows),
        target.currentHp(),
        eotDamage,
        target.maxHp(),
        recovery,
        currentBerryThreshold,
        setup.rowsPerTurn,
        toxicCounter,
        setup.damageAfterBerryByRow,
        setup.progressiveFullHpRows,
        setup.progressiveContinuesUse
      )
    }

    return computeMultiHitKOChance(this.repeatedBaseDamages(setup, turn), target.currentHp(), eotDamage, target.maxHp(), currentBerryRecovery, currentBerryThreshold, setup.rowsPerTurn, toxicCounter)
  }

  getHKO(): string {
    const target = this.results[0].defender
    const setup = this.koChanceSetup()
    const firstTurn = this.turns > 1 ? this.turns : 1
    const lastTurn = this.turns > 1 ? this.turns : 9

    for (let i = firstTurn; i <= lastTurn; i++) {
      const result = this.koChanceForTurn(setup, i, target, this.eot.damage)

      if (result.chance > 0) {
        const koText = this.turns > 1 ? `KO in ${i} turns` : i === 1 ? "OHKO" : `${i}HKO`
        const berryText = result.berryConsumed ? ` after ${target.item} recovery` : ""
        const eotText = this.eotAffectsKO(setup, i, target, result.chance) ? ` after ${serializeEndOfTurnTexts(this.eot.texts)}` : ""

        if (result.chance === 1) {
          return `guaranteed ${koText}${berryText}${eotText}`
        }

        const percentage = roundChance(result.chance)

        return `${percentage}% chance to ${koText}${berryText}${eotText}`
      }
    }

    return this.turns > 1 ? "not a KO" : "10HKO or more"
  }

  private eotAffectsKO(setup: KOChanceSetup, turn: number, target: Pokemon, chance: number): boolean {
    if (this.eot.texts.length === 0) return false

    for (let i = 1; i < turn; i++) {
      if (this.koChanceForTurn(setup, i, target, 0, 0).chance > 0) return true
    }

    return this.koChanceForTurn(setup, turn, target, 0, 0).chance !== chance
  }

  rollsFor(resultIndex: number): number[][] {
    const rolls = this.allTurnsRolls()
    const rowsPerResult = this.results.map(result => new DamageDistribution(result.damage).subArrays().length)
    const rowsPerTurn = rowsPerResult.reduce((total, rows) => total + rows, 0)
    const start = rowsPerResult.slice(0, resultIndex).reduce((total, rows) => total + rows, 0)
    const resultRolls: number[][] = []

    for (let turn = 0; turn < this.turns; turn++) {
      const turnStart = turn * rowsPerTurn + start

      resultRolls.push(...rolls.slice(turnStart, turnStart + rowsPerResult[resultIndex]))
    }

    return resultRolls
  }

  private allTurnsRolls(): number[][] {
    if (this.usesSimulator()) {
      const input = this.hpPathInput(this.turns)

      return input.fullHpRows.some((row, index) => row !== input.rows[index]) ? rowsAlongPath(input) : input.rows
    }

    return this.results.flatMap(result => new DamageDistribution(result.damage).subArrays())
  }

  range(): { min: number; max: number } {
    return this.getMinMaxDamageFromRolls(this.allTurnsRolls())
  }

  rangePercentage(): { min: number; max: number } {
    const { min, max } = this.range()
    const defender = this.results[0].defender

    return {
      min: Math.floor((min / defender.originalCurrentHp) * 1000) / 10,
      max: Math.floor((max / defender.originalCurrentHp) * 1000) / 10
    }
  }

  resultString(): string {
    const { min, max } = this.rangePercentage()

    return `${min} - ${max}%`
  }

  description(): string {
    const resultOne = this.results[0]
    const resultTwo = this.results[1]
    const defender = resultOne.defender

    if (this.range().max === 0) {
      return `${resultOne.attacker.name} ${resultOne.move.name}` + ` AND ${resultTwo.attacker.name} ${resultTwo.move.name}` + ` vs. ${defender.name}: 0-0 (0 - 0%) -- possibly the worst move ever`
    }

    const attackerOne = buildAttackerDescription(resultOne.rawDesc).trimEnd()
    const attackerTwo = buildAttackerDescription(resultTwo.rawDesc).trimEnd()

    const defenderBulk = this.mergeBulkStats(resultOne, resultTwo)
    const defenderTail = buildDefenderTail({ ...resultOne.rawDesc, defenderAbility: undefined }, true).trimEnd()

    const { min: totalMin, max: totalMax } = this.range()
    const { min: minPercent, max: maxPercent } = this.rangePercentage()

    const statChangesText = this.hasStatChanges() ? " (stat changes considered)" : ""
    const staminaText = isStaminaActive(this.defender) ? " (Stamina considered)" : ""
    const damageText = `${totalMin}-${totalMax} (${minPercent} - ${maxPercent}%)`
    const turnsText = this.turns > 1 ? ` over ${this.turns} turns` : ""

    const koChanceText = this.getHKO()

    return `${attackerOne} AND ${attackerTwo}${turnsText}${statChangesText}` + ` vs. ${defenderBulk} ${defenderTail}${staminaText}: ${damageText} -- ${koChanceText}`
  }

  maxDamage(): number {
    return this.range().max
  }

  damageWithRemainingUntilTurn(turn: number, rollIndex = DEFAULT_ROLL_INDEX): number {
    const hp = this.defender.currentHp()
    const remainingHp = this.afterTurn(rollIndex).remainingHpUntilTurn(turn)

    return hp - remainingHp
  }

  private mergeBulkStats(resultOne: Result, resultTwo: Result): string {
    const defender = resultOne.defender

    let output = `${defender.sps.hp} HP`

    output += this.defenseStat(resultOne.rawDesc, resultTwo.rawDesc, defender, "Def", "def")
    output += this.defenseStat(resultOne.rawDesc, resultTwo.rawDesc, defender, "SpD", "spd")

    const item = defender.item

    if (item && (this.describesItem(resultOne, item) || this.describesItem(resultTwo, item))) {
      output += ` ${item}`
    }

    return output
  }

  private describesItem(result: Result, item: string): boolean {
    if (result.range()[1] === 0) return buildDescription(result.rawDesc).includes(item)

    return result.description().includes(item)
  }

  private defenseStat(rawDescOne: RawDesc, rawDescTwo: RawDesc, defender: Pokemon, statText: string, stat: StatID): string {
    const defenseEVs = this.defenseEVsFor(rawDescOne, statText) ?? this.defenseEVsFor(rawDescTwo, statText)

    if (!defenseEVs) return ""

    const boostValue = defender.boosts[stat]
    const boost = boostValue ? ` ${boostValue > 0 ? "+" : ""}${boostValue}` : ""

    return ` /${boost} ${defenseEVs}`
  }

  private defenseEVsFor(rawDesc: RawDesc, statText: string): string | undefined {
    return rawDesc.defenseEVs?.endsWith(statText) ? rawDesc.defenseEVs : undefined
  }

  private getMinMaxDamageFromRolls(rolls: number[][]): { min: number; max: number } {
    let min = 0
    let max = 0

    for (const sub of rolls) {
      min += sub[0]
      max += sub[sub.length - 1]
    }

    return { min, max }
  }

  private usesSimulator(): boolean {
    return this.turns > 1 || isStaminaActive(this.defender) || this.hasStatChanges() || this.defenderReacts() || this.halvesAtFullHp()
  }

  private defenderReacts(): boolean {
    return this.results.some(result => defenderReactsToHit(result.attacker, this.defender, result.move, result.damage))
  }

  private halvesAtFullHp(): boolean {
    return this.defender.hasAbility(...FIRST_HIT_ONLY_ABILITIES)
  }

  private hasStatChanges(): boolean {
    const dropsTargetStat = this.results.some((_, index) => this.landsDropReadLater(index))
    const changesOwnStat = this.turns > 1 && !this.defender.hasAbility("Unaware") && this.results.some(result => effectiveSelfStatChange(result.attacker, result.move) !== undefined)

    return dropsTargetStat || changesOwnStat
  }

  private landsDropReadLater(resultIndex: number): boolean {
    const result = this.results[resultIndex]
    const drop = result.move.targetDefensiveDrop

    if (!drop || !landsTargetDefensiveDrop(result.attacker, result.defender, result.move, result.field)) return false

    const laterResults = this.turns > 1 ? this.results : this.results.slice(resultIndex + 1)

    return laterResults.some(later => readsDefensiveStage(later.attacker, later.move, drop.stat))
  }
}
