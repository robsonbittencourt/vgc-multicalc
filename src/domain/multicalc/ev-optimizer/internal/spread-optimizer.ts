import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { Stats } from "@multicalc/types"
import { MAX_SPS } from "@multicalc/utils"
import { AttackerPriorityResult, AttackerSelector } from "./attacker-selector"
import { CachedDamageCalc } from "./cached-damage-calc"
import { OptimizationResult, OptimizationStatus, SurvivalThreshold } from "./ev-optimizer-types"
import { DEFENSIVE_STATS } from "@multicalc/ev-optimizer/defensive-stats"
import { PokemonIds } from "./pokemon-ids"
import { BestEffortSpread, SpreadSearch } from "./spread-search"
import { SurvivalChecker } from "./survival-checker"
import { SurvivalMemo } from "./survival-memo"
import { SurvivalContext, Threat } from "./threat"

type ReservedSps = { atk: number; spa: number; spe: number }

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

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature: boolean, keepOffensiveEvs: boolean, threshold: SurvivalThreshold, rollIndex: number, rightIsDefender: boolean): OptimizationResult {
    this.damageCalc.clear()
    this.memo.clear()

    const ctx: SurvivalContext = { field, threshold, rollIndex, rightIsDefender }
    const reservedSps = keepOffensiveEvs ? { atk: defender.sps.atk, spa: defender.sps.spa, spe: defender.sps.spe } : undefined

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

    const budget = reservedSps ? MAX_SPS - reservedSps.atk - reservedSps.spa - reservedSps.spe : MAX_SPS

    if (budget >= 0) {
      const search = new SpreadSearch(target, ctx, budget)
      const choice = this.bestChoice(this.plans(priority, pair), search, possibleThreats)

      if (choice) {
        return { sps: this.withReservedSps(choice.spread, reservedSps), nature, status: this.statusFor(choice.spread) }
      }
    }

    return this.bestEffort(defender, targets, [...physicalAttackers, ...specialAttackers], ctx, budget, reservedSps, updateNature)
  }

  private bestEffort(defender: Pokemon, targets: Target[], singleAttackers: Pokemon[], ctx: SurvivalContext, budget: number, reservedSps: ReservedSps | undefined, updateNature: boolean): OptimizationResult {
    const singles = singleAttackers.map(attacker => new Threat(this.damageCalc, attacker, null, this.memo))
    const pairs = targets.filter(target => target.secondPokemon).map(target => new Threat(this.damageCalc, target.pokemon, target.secondPokemon!, this.memo))
    const threats = [...singles, ...pairs]

    let best: BestEffortSpread | null = null
    let chosenNature: string | null = null

    for (const nature of this.natureCandidates(defender, updateNature)) {
      const search = new SpreadSearch(nature ? defender.clone({ nature }) : defender, ctx, budget)

      for (const threat of threats) {
        const candidate = search.bestAgainst(threat, best)

        if (candidate !== best) {
          best = candidate
          chosenNature = nature
        }
      }
    }

    const winner = best!
    const sps = this.withReservedSps(winner.spread, reservedSps)

    if (winner.koChance === 0) {
      return { sps, nature: chosenNature, status: this.statusFor(winner.spread) }
    }

    return { sps, nature: chosenNature, status: "best-effort", koChance: winner.koChance }
  }

  private natureCandidates(defender: Pokemon, updateNature: boolean): (string | null)[] {
    if (!updateNature) {
      return [null]
    }

    const { defNature, spdNature } = this.attackerSelector.defensiveNatures(defender)

    return [null, defNature, spdNature]
  }

  private nothingToProtect(defender: Pokemon): OptimizationResult {
    return { sps: { ...defender.sps }, nature: null, status: this.statusFor(defender.sps) }
  }

  private statusFor(sps: Stats): Exclude<OptimizationStatus, "best-effort"> {
    return DEFENSIVE_STATS.every(stat => sps[stat] === 0) ? "not-needed" : "success"
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

  private withReservedSps(spread: Stats, reservedSps: ReservedSps | undefined): Stats {
    if (!reservedSps) {
      return spread
    }

    return { hp: spread.hp, atk: reservedSps.atk, def: spread.def, spa: reservedSps.spa, spd: spread.spd, spe: reservedSps.spe }
  }
}
