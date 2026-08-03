import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { Stats } from "@multicalc/types"
import { AttackerPriorityResult, AttackerSelector } from "./attacker-selector"
import { CachedDamageCalc } from "./cached-damage-calc"
import { OptimizationResult, OptimizationStatus, SurvivalThreshold } from "./ev-optimizer-types"
import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { DEFENSIVE_STATS } from "@multicalc/ev-optimizer/defensive-stats"
import { PokemonIds } from "./pokemon-ids"
import { SpreadSearch } from "./spread-search"
import { SurvivalChecker } from "./survival-checker"
import { SurvivalMemo } from "./survival-memo"
import { SurvivalContext, Threat } from "./threat"

type ReservedEvs = { atk: number; spa: number; spe: number }

type Choice = {
  spread: Stats
  coverage: number
  cost: number
  plan: Threat[]
}

export class SpreadOptimizer {
  private damageCalc = new CachedDamageCalc()
  private memo = new SurvivalMemo()
  private survivalChecker = new SurvivalChecker(this.damageCalc)
  private attackerSelector = new AttackerSelector(this.survivalChecker, this.damageCalc)

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature = false, keepOffensiveEvs = false, threshold: SurvivalThreshold = 2, rollIndex = RollLevelConfig.HIGH_ROLL_INDEX, rightIsDefender = true): OptimizationResult {
    this.damageCalc.clear()
    this.memo.clear()

    const ctx: SurvivalContext = { field, threshold, rollIndex, rightIsDefender }
    const reservedEvs = keepOffensiveEvs ? { atk: defender.evs.atk, spa: defender.evs.spa, spe: defender.evs.spe } : undefined

    if (targets.length === 0) {
      return this.nothingToProtect(defender)
    }

    const singleAttackers = targets.filter(target => !target.secondPokemon).map(target => target.pokemon)
    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(singleAttackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(singleAttackers)
    const hasDoubleTarget = targets.some(target => target.secondPokemon)

    if (!hasDoubleTarget && physicalAttackers.length === 0 && specialAttackers.length === 0) {
      return this.nothingToProtect(defender)
    }

    const doubleTarget = hasDoubleTarget ? this.attackerSelector.findStrongestDoubleTarget(defender, targets, field, threshold, rollIndex, rightIsDefender) : null

    const priority = physicalAttackers.length > 0 || specialAttackers.length > 0 ? this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature, threshold, rollIndex, rightIsDefender) : null

    const nature = priority?.natureUsed ?? null
    const target = nature ? defender.clone({ nature }) : defender

    const pair = doubleTarget ? new Threat(this.damageCalc, doubleTarget.attacker1, doubleTarget.attacker2, this.memo) : null
    const possibleSingles = this.possibleSingleThreats(singleAttackers, priority)
    const possibleThreats = pair ? [...possibleSingles, pair] : possibleSingles

    const budget = reservedEvs ? MAX_TOTAL_EVS - reservedEvs.atk - reservedEvs.spa - reservedEvs.spe : MAX_TOTAL_EVS

    if (budget < 0) {
      return { evs: null, nature: null, status: "no-solution" }
    }

    const search = new SpreadSearch(target, ctx, budget)
    const choice = this.bestChoice(this.plans(priority, pair), search, possibleThreats)

    if (choice) {
      return this.withReservedEvs(choice.spread, reservedEvs, nature)
    }

    return this.withoutSpread(target, possibleSingles, reservedEvs, nature, ctx, budget === MAX_TOTAL_EVS ? search : new SpreadSearch(target, ctx))
  }

  private nothingToProtect(defender: Pokemon): OptimizationResult {
    return { evs: { ...defender.evs }, nature: null, status: this.statusFor(defender.evs) }
  }

  private statusFor(evs: Stats): OptimizationStatus {
    return DEFENSIVE_STATS.every(stat => evs[stat] === 0) ? "not-needed" : "success"
  }

  private possibleSingleThreats(singleAttackers: Pokemon[], priority: AttackerPriorityResult | null): Threat[] {
    const impossible = [...(priority?.physical.impossibleAttackers ?? []), ...(priority?.special.impossibleAttackers ?? [])]

    return singleAttackers.filter(attacker => !impossible.includes(attacker)).map(attacker => new Threat(this.damageCalc, attacker, null, this.memo))
  }

  private plans(priority: AttackerPriorityResult | null, pair: Threat | null): Threat[][] {
    const physicalStrongest = priority?.physical.strongestAttacker ?? null
    const specialStrongest = priority?.special.strongestAttacker ?? null

    const physicalList = this.threatsFor(physicalStrongest, priority?.physical.survivableAttackers ?? [])
    const specialList = this.threatsFor(specialStrongest, priority?.special.survivableAttackers ?? [])
    const physicalOnly = physicalStrongest ? [new Threat(this.damageCalc, physicalStrongest, null, this.memo)] : []
    const specialOnly = specialStrongest ? [new Threat(this.damageCalc, specialStrongest, null, this.memo)] : []
    const pairOnly = pair ? [pair] : []

    const candidates = [
      [...physicalList, ...specialList, ...pairOnly],
      [...physicalOnly, ...specialOnly, ...pairOnly],
      [...physicalList, ...specialList],
      [...physicalOnly, ...specialOnly],
      [...physicalOnly, ...pairOnly],
      [...specialOnly, ...pairOnly],
      [...pairOnly],
      [...physicalOnly],
      [...specialOnly]
    ]

    const seen = new Set<string>()
    const ids = new PokemonIds()

    return candidates.filter(plan => {
      if (plan.length === 0) return false

      const key = plan.map(threat => `${ids.idOf(threat.attacker)}|${threat.partner ? ids.idOf(threat.partner) : 0}`).join("//")

      if (seen.has(key)) return false

      seen.add(key)

      return true
    })
  }

  private threatsFor(strongest: Pokemon | null, survivable: Pokemon[]): Threat[] {
    const attackers = strongest ? [strongest, ...survivable.filter(attacker => attacker !== strongest)] : survivable

    return attackers.map(attacker => new Threat(this.damageCalc, attacker, null, this.memo))
  }

  private bestChoice(plans: Threat[][], search: SpreadSearch, possibleThreats: Threat[]): Choice | null {
    let best: Choice | null = null

    for (const plan of plans) {
      const candidate = this.evaluate(plan, search, possibleThreats)

      if (candidate && this.isBetter(candidate, best)) {
        best = candidate
      }

      if (best && best.coverage === possibleThreats.length) break
    }

    if (!best) {
      best = this.bestFeasibleSubset(search, possibleThreats)
    }

    if (!best || best.coverage === possibleThreats.length) {
      return best
    }

    return this.enrich(best, search, possibleThreats)
  }

  private bestFeasibleSubset(search: SpreadSearch, possibleThreats: Threat[]): Choice | null {
    let best: Choice | null = null

    for (const threat of possibleThreats) {
      const candidate = this.evaluate([threat], search, possibleThreats)

      if (candidate && this.isBetter(candidate, best)) {
        best = candidate
      }
    }

    return best
  }

  private evaluate(plan: Threat[], search: SpreadSearch, possibleThreats: Threat[]): Choice | null {
    const spread = search.minimalSpread(plan)

    if (!spread) {
      return null
    }

    const coverage = possibleThreats.filter(threat => search.survivesAll([threat], spread)).length

    return { spread, coverage, cost: spread.hp + spread.def + spread.spd, plan }
  }

  private enrich(best: Choice, search: SpreadSearch, possibleThreats: Threat[]): Choice {
    let current = best

    let rounds = 0

    while (rounds < possibleThreats.length) {
      rounds++

      const uncovered = possibleThreats.filter(threat => !search.survivesAll([threat], current.spread))

      if (uncovered.length === 0) break

      let improved: Choice | null = null

      for (const threat of uncovered) {
        const candidate = this.evaluate([...current.plan, threat], search, possibleThreats)

        if (candidate && this.isBetter(candidate, improved ?? current)) {
          improved = candidate
        }
      }

      if (!improved) break

      current = improved
    }

    return current
  }

  private isBetter(candidate: Choice, current: Choice | null): boolean {
    if (!current) return true
    if (candidate.coverage !== current.coverage) return candidate.coverage > current.coverage
    if (candidate.cost !== current.cost) return candidate.cost < current.cost

    return candidate.spread.hp > current.spread.hp
  }

  private withReservedEvs(spread: Stats, reservedEvs: ReservedEvs | undefined, nature: string | null): OptimizationResult {
    const status = this.statusFor(spread)

    if (!reservedEvs) {
      return { evs: spread, nature, status }
    }

    return { evs: { hp: spread.hp, atk: reservedEvs.atk, def: spread.def, spa: reservedEvs.spa, spd: spread.spd, spe: reservedEvs.spe }, nature, status }
  }

  private withoutSpread(defender: Pokemon, possibleThreats: Threat[], reservedEvs: ReservedEvs | undefined, nature: string | null, ctx: SurvivalContext, unboundedSearch: SpreadSearch): OptimizationResult {
    if (possibleThreats.length === 0) {
      return { evs: null, nature: null, status: "no-solution" }
    }

    const zeroed = defender.clone({ evs: { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe } })
    const unprotected = possibleThreats.filter(threat => !threat.survivedBy(zeroed, ctx))

    if (unprotected.some(threat => unboundedSearch.minimalSpread([threat]) !== null)) {
      return { evs: null, nature: null, status: "no-solution" }
    }

    const evs = reservedEvs ? { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe } : { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

    return { evs, nature, status: "not-needed" }
  }
}
