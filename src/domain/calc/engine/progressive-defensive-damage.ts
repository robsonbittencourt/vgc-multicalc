import { calculateDamage } from "@calc/engine/calculate"
import { afterMoveDefensiveBoosts, DefensiveBoosts, endTurnDefensiveBoosts, initialDefensiveBoosts, nextDefensiveBoosts } from "@calc/engine/defensive-boost-ladder"
import { rawTypeEffectiveness } from "@calc/engine/guards"
import { dealsDamage, reactAfterMove, reactToHit, withDefenderState, withFieldState } from "@calc/engine/hit-reactions"
import { clampBoost } from "@calc/engine/math"
import { Combatants } from "@calc/engine/prepare-combatants"
import { effectiveSelfStatChange, initialSelfBoost, nextSelfBoost } from "@calc/engine/self-stat-change"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { getBerryResistType } from "@calc/model/items"
import { Field } from "@calc/model/field"
import { Pokemon } from "@calc/model/pokemon"
import { Result } from "@calc/model/result"
import { FIRST_HIT_ONLY_ABILITIES } from "@calc/engine/target-hp"
import { AbilityName } from "@data/types"

export type AttackerState = { boost: number; whiteHerbUsed: boolean; spe: number; ability: AbilityName | undefined; uses: number }

export type ProgressiveBoosts = { defender: DefensiveBoosts; attackers: AttackerState[] }

export type ItemLoss = { row: number; rowWithoutItem: number[] }

type Simulation = { rows: number[][]; fullHpRows: number[][]; continuesUse: boolean[]; itemLoss?: ItemLoss }

export class ProgressiveDefensiveDamage {
  private defender: Pokemon
  private results: Result[]
  private turns: number
  private inputs: Combatants[]
  private recomputeDamageCache = new Map<string, number[][]>()
  private simulationCache = new Map<number, Simulation>()

  constructor(defender: Pokemon, results: Result[], turns: number, inputs: Combatants[]) {
    this.defender = defender
    this.results = results
    this.turns = turns
    this.inputs = inputs
  }

  private initialBoosts(): ProgressiveBoosts {
    return { defender: initialDefensiveBoosts(this.defender), attackers: this.inputs.map(input => this.initialAttacker(input)) }
  }

  private initialAttacker(input: Combatants): AttackerState {
    return { boost: initialSelfBoost(input.attacker, input.move), whiteHerbUsed: false, spe: input.attacker.boosts.spe, ability: input.attacker.ability, uses: 0 }
  }

  hitDamages(turns: number): number[][] {
    return this.simulate(turns).rows
  }

  itemLoss(turns: number): ItemLoss | undefined {
    return this.simulate(turns).itemLoss
  }

  fullHpRows(turns: number): number[][] {
    return this.simulate(turns).fullHpRows
  }

  continuesUse(turns: number): boolean[] {
    return this.simulate(turns).continuesUse
  }

  private simulate(turns: number): Simulation {
    const cached = this.simulationCache.get(turns)

    if (cached) return cached

    const rows: number[][] = []
    const fullHpRows: number[][] = []
    const continuesUse: boolean[] = []
    let itemLoss: ItemLoss | undefined
    let boosts = this.initialBoosts()
    let berryAvailable = true

    for (let turn = 0; turn < turns; turn++) {
      for (let idx = 0; idx < this.results.length; idx++) {
        const subArrays = this.recomputeDamageAtBoosts(idx, boosts, berryAvailable)
        const consumesBerry = berryAvailable && this.consumesTypeBerry(this.results[idx])
        const atFullHp = boosts.defender.damaged && this.halvesAtFullHp(boosts) ? this.recomputeDamageAtBoosts(idx, boosts, berryAvailable, true) : subArrays

        subArrays.forEach((sub, hit) => {
          const next = this.applyHit(idx, boosts, sub)

          if (!itemLoss && next.defender.itemLost && !boosts.defender.itemLost) {
            itemLoss = { row: rows.length, rowWithoutItem: this.recomputeDamageAtBoosts(idx, { ...boosts, defender: { ...boosts.defender, itemLost: true } }, berryAvailable)[hit] }
          }

          rows.push(sub)
          fullHpRows.push(atFullHp[hit])
          continuesUse.push(hit > 0)
          boosts = next
        })

        boosts = this.afterUse(idx, boosts, subArrays)

        if (consumesBerry) {
          berryAvailable = false
        }
      }

      boosts = this.endTurn(boosts)
    }

    const simulation = { rows, fullHpRows, continuesUse, itemLoss }
    this.simulationCache.set(turns, simulation)

    return simulation
  }

  private halvesAtFullHp(boosts: ProgressiveBoosts): boolean {
    return withDefenderState(this.defender, boosts.defender).hasAbility(...FIRST_HIT_ONLY_ABILITIES)
  }

  private applyHit(resultIndex: number, boosts: ProgressiveBoosts, row: number[]): ProgressiveBoosts {
    const result = this.results[resultIndex]
    const current = boosts.attackers[resultIndex]
    const attacker = this.attackerWith(result.attacker, current)
    const defender = withDefenderState(this.defender, boosts.defender)
    const field = withFieldState(result.field, boosts.defender)
    const change = effectiveSelfStatChange(attacker, result.move)
    const boost = change ? nextSelfBoost(attacker, change, current.boost) : current.boost
    const reaction = reactToHit(attacker, defender, result.move, { defender: boosts.defender, attacker: { spe: current.spe, ability: current.ability } }, dealsDamage(row))
    const attackers = [...boosts.attackers]

    attackers[resultIndex] = { ...current, boost, ...reaction.attacker }

    return { defender: nextDefensiveBoosts(attacker, defender, result.move, field, reaction.defender), attackers }
  }

  private attackerWith(attacker: Pokemon, state: AttackerState): Pokemon {
    if (state.ability === attacker.ability) return attacker

    const next = attacker.clone()
    next.ability = state.ability

    return next
  }

  private afterUse(resultIndex: number, boosts: ProgressiveBoosts, rows: number[][]): ProgressiveBoosts {
    const attackers = [...boosts.attackers]
    const current = attackers[resultIndex]
    const restores = (current.boost < 0 || current.spe < 0) && this.inputs[resultIndex].attacker.hasItem("White Herb") && !current.whiteHerbUsed

    attackers[resultIndex] = restores ? { ...current, boost: 0, spe: Math.max(0, current.spe), whiteHerbUsed: true, uses: current.uses + 1 } : { ...current, uses: current.uses + 1 }

    const defender = withDefenderState(this.defender, boosts.defender)
    const fed = reactAfterMove(defender, this.results[resultIndex].move, boosts.defender, rows.some(dealsDamage))

    return { defender: afterMoveDefensiveBoosts(this.defender, fed), attackers }
  }

  private endTurn(boosts: ProgressiveBoosts): ProgressiveBoosts {
    if (this.turns > 1) return boosts

    return { defender: endTurnDefensiveBoosts(boosts.defender), attackers: boosts.attackers.map((state, idx) => ({ ...state, boost: this.initialAttacker(this.inputs[idx]).boost, uses: 0 })) }
  }

  private consumesTypeBerry(result: Result): boolean {
    const berryType = getBerryResistType(result.defender.item)

    if (berryType === undefined || !result.move.hasType(berryType)) return false

    const typeEffectiveness = rawTypeEffectiveness(result.attacker, result.defender, result.move, result.field)

    return typeEffectiveness > 1 || result.move.hasType("Normal")
  }

  private recomputeDamageAtBoosts(resultIndex: number, boosts: ProgressiveBoosts, typeBerryAvailable: boolean, atFullHp = false): number[][] {
    const input = this.inputs[resultIndex]
    const state = boosts.defender
    const attackerState = boosts.attackers[resultIndex]
    const def = clampBoost(state.def)
    const spd = clampBoost(state.spd)
    const usesWithMetronome = input.attacker.hasItem("Metronome") ? attackerState.uses : 0
    const holdsItem = typeBerryAvailable && !state.itemLost
    const cacheKey = [resultIndex, def, spd, state.spe, attackerState.boost, attackerState.spe, attackerState.ability, state.ability, state.terrain, state.weather, usesWithMetronome, state.damaged, holdsItem, atFullHp].join(":")
    const cached = this.recomputeDamageCache.get(cacheKey)

    if (cached) return cached

    const defender = input.defender.clone()
    defender.boosts.def = def
    defender.boosts.spd = spd
    defender.boosts.spe = state.spe
    defender.item = holdsItem ? this.defender.item : undefined
    defender.ability = state.ability ?? defender.ability

    if (atFullHp) {
      defender.originalCurrentHp = defender.maxHp()
    } else if (state.damaged) {
      defender.originalCurrentHp = Math.min(defender.originalCurrentHp, defender.maxHp() - 1)
    }

    const attacker = input.attacker.clone()
    attacker.boosts[input.move.selfStatChange?.stat ?? "atk"] = attackerState.boost
    attacker.boosts.spe = attackerState.spe
    attacker.ability = attackerState.ability

    const move = input.move.clone()
    move.timesUsedWithMetronome = usesWithMetronome

    const recomputed = calculateDamage(attacker, defender, move, this.fieldAt(input.field, state, atFullHp), true)

    const subArrays = new DamageDistribution(recomputed.damage).subArrays()
    this.recomputeDamageCache.set(cacheKey, subArrays)

    return subArrays
  }

  private fieldAt(field: Field, state: DefensiveBoosts, atFullHp: boolean): Field {
    const current = withFieldState(field, state)

    if (!atFullHp) return current

    const withoutHazards = current.clone()
    withoutHazards.defenderSide.isSR = false
    withoutHazards.defenderSide.spikes = 0

    return withoutHazards
  }
}
