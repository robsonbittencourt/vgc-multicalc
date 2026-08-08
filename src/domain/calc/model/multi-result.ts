import { buildAttackerDescription, buildDefenderTail, buildDescription, computeMultiHitKOChance, getBerryRecovery, getDamageWithoutBerry, getEndOfTurn, roundChance, serializeEndOfTurnTexts, truncateToRoll } from "@calc/engine/desc"
import { StaminaBoostSimulator } from "@calc/engine/stamina-boost-simulator"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { AfterTurnData, AfterTurnResult, applyTurnDamage, DEFAULT_ROLL_INDEX, Result } from "@calc/model/result"
import { RawDesc, StatID } from "@data/types"

type KOChanceSetup = {
  baseDamages: number[][]
  baseBerryRecovery: number[]
  baseBerryThreshold: number[]
  rowsPerTurn: number
  toxicCounter: number
  hasStamina: boolean
  allStaminaDamages: number[][]
}

export class MultiResult {
  defender: Pokemon
  results: Result[]
  eot: { damage: number; texts: string[] }

  constructor(defender: Pokemon, results: Result[], eot: { damage: number; texts: string[] }) {
    this.defender = defender
    this.results = results
    this.eot = eot
  }

  afterTurn(rollIndex = DEFAULT_ROLL_INDEX): AfterTurnResult {
    const defender = this.results[0].defender
    const field = this.results[0].field
    const hp = defender.currentHp()

    const splash = new Move("Splash")
    const baseEot = getEndOfTurn(this.results[0].attacker, defender, splash, field)

    let totalEotDamage = baseEot.damage

    for (const result of this.results) {
      const resultEot = getEndOfTurn(result.attacker, defender, result.move, field)
      const moveSpecific = Math.min(0, resultEot.damage - baseEot.damage)
      totalEotDamage += moveSpecific
    }

    const berry = getBerryRecovery(this.results[0].attacker, defender, this.results[0].move)

    const data: AfterTurnData[] = []
    let currentHP = hp
    let berryConsumed = false

    const damagesAtIndex = this.results.map(r => new DamageDistribution(r.damage).totalAt(rollIndex))
    const damagesWithoutBerryAtIndex = this.results.map(r => {
      const withoutBerry = getDamageWithoutBerry(r.damage, r.rawDesc, r.move, defender)

      return withoutBerry !== undefined ? new DamageDistribution(withoutBerry).totalAt(rollIndex) : null
    })
    const hasTypeBerry = damagesWithoutBerryAtIndex.some(d => d !== null)
    const hasStamina = this.hasStaminaDefender()
    const staminaSimulator = new StaminaBoostSimulator(this.results)
    let staminaBoost = hasStamina ? this.initialDefBoost() : 0
    let staminaTypeBerryAvailable = true

    for (let i = 1; i <= 10; i++) {
      let turnDamages: number[]

      if (hasStamina) {
        const turn = staminaSimulator.turnDamages(staminaBoost, rollIndex, staminaTypeBerryAvailable)
        turnDamages = turn.damages
        staminaBoost = turn.nextBoost
        staminaTypeBerryAvailable = turn.typeBerryAvailable
      } else {
        turnDamages = i === 1 || !hasTypeBerry ? damagesAtIndex : damagesWithoutBerryAtIndex.map((d, idx) => d ?? damagesAtIndex[idx])
      }

      const turn = applyTurnDamage(currentHP, turnDamages, defender.maxHp(), berry, berryConsumed)
      currentHP = turn.hp
      berryConsumed = turn.berryConsumed
      let turnValue = turn.recovered

      if (currentHP <= 0) {
        data.push({ turn: i, residualDelta: turnValue, hp: 0 })
        break
      }

      currentHP += totalEotDamage
      turnValue += totalEotDamage

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

  survivesHits(hits: number, rollIndex = DEFAULT_ROLL_INDEX): boolean {
    if (hits < 1) {
      return true
    }

    const target = this.results[0].defender
    const setup = this.koChanceSetup(rollIndex)
    const eotDamage = this.currentEotDamage()

    return this.koChanceForTurn(setup, hits, target, eotDamage).chance === 0
  }

  certainlyKOs(hits: number, rollIndex = DEFAULT_ROLL_INDEX): boolean {
    if (hits < 1) {
      return false
    }

    const target = this.results[0].defender

    let maxDamagePerTurn = 0
    let maxBerryRecovery = 0

    for (const result of this.results) {
      for (const subArray of new DamageDistribution(result.damage).subArrays()) {
        maxDamagePerTurn += Math.max(...truncateToRoll(subArray, rollIndex))
      }

      maxBerryRecovery = Math.max(maxBerryRecovery, getBerryRecovery(result.attacker, target, result.move).recovery)
    }

    const maxHealing = maxBerryRecovery + hits * Math.max(0, this.currentEotDamage())

    return hits * maxDamagePerTurn >= target.currentHp() + maxHealing
  }

  private currentEotDamage(): number {
    const defender = this.results[0].defender
    const field = this.results[0].field
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

    const hasStamina = this.hasStaminaDefender()

    return {
      baseDamages,
      baseBerryRecovery,
      baseBerryThreshold,
      rowsPerTurn: baseDamages.length,
      toxicCounter: target.status === "tox" ? target.toxicCounter : 0,
      hasStamina,
      allStaminaDamages: hasStamina ? new StaminaBoostSimulator(this.results).hitDamages(9, this.initialDefBoost()) : []
    }
  }

  private koChanceForTurn(setup: KOChanceSetup, turn: number, target: Pokemon, eotDamage: number) {
    const currentBerryRecovery: number[] = []
    const currentBerryThreshold: number[] = []

    for (let j = 0; j < turn; j++) {
      currentBerryRecovery.push(...setup.baseBerryRecovery)
      currentBerryThreshold.push(...setup.baseBerryThreshold)
    }

    const currentDamages: number[][] = setup.hasStamina ? setup.allStaminaDamages.slice(0, turn * setup.rowsPerTurn) : []

    if (!setup.hasStamina) {
      for (let j = 0; j < turn; j++) {
        currentDamages.push(...setup.baseDamages)
      }
    }

    return computeMultiHitKOChance(currentDamages, target.currentHp(), eotDamage, target.maxHp(), currentBerryRecovery, currentBerryThreshold, setup.rowsPerTurn, setup.toxicCounter)
  }

  getHKO(): string {
    const target = this.results[0].defender
    const setup = this.koChanceSetup()

    for (let i = 1; i <= 9; i++) {
      const result = this.koChanceForTurn(setup, i, target, this.eot.damage)

      if (result.chance > 0) {
        const hkoText = i === 1 ? "OHKO" : `${i}HKO`
        const berryText = result.berryConsumed ? ` after ${target.item} recovery` : ""
        const eotText = this.eot.texts.length > 0 ? ` after ${serializeEndOfTurnTexts(this.eot.texts)}` : ""

        if (result.chance === 1) {
          return `guaranteed ${hkoText}${berryText}${eotText}`
        }

        const percentage = roundChance(result.chance)

        return `${percentage}% chance to ${hkoText}${berryText}${eotText}`
      }
    }

    return "10HKO or more"
  }

  range(): { min: number; max: number } {
    let min = 0
    let max = 0

    for (const result of this.results) {
      const damage = new DamageDistribution(result.damage).subArrays()
      const r = this.getMinMaxDamageFromRolls(damage)
      min += r.min
      max += r.max
    }

    return { min, max }
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

    const staminaText = this.hasStaminaDefender() ? " (Stamina considered)" : ""
    const damageText = `${totalMin}-${totalMax} (${minPercent} - ${maxPercent}%)`

    const koChanceText = this.getHKO()

    return `${attackerOne} AND ${attackerTwo}` + ` vs. ${defenderBulk} ${defenderTail}${staminaText}: ${damageText} -- ${koChanceText}`
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

    let output = `${defender.evs.hp} HP`

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

  private hasStaminaDefender(): boolean {
    return this.defender.hasAbility("Stamina")
  }

  private initialDefBoost(): number {
    return this.defender.boosts.def
  }
}
