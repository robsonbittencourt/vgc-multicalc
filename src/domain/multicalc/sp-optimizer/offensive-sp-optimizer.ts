import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { Stats } from "@multicalc/types"
import { MAX_SPS, MAX_SPS_PER_STAT } from "@multicalc/utils"
import { KoThreshold, OffensiveOptimizationOptions, OffensiveOptimizationResult, OffensiveSpProposal, OffensiveStat, SecondAttacker } from "./internal/offensive-sp-optimizer-types"
import { respondsToDamage } from "./internal/damage-response"

type Candidate = { sp: number; nature: string | null }

type BestEffort = { koChance: number; attacker: Candidate; partner: Candidate }

type Reach = { covered: number; koChance: number; sp: number; nature: string | null; bestTargetName: string | null }

const BOOSTING_NATURE: Record<OffensiveStat, string> = { atk: "Adamant", spa: "Modest" }

const EMPTY_SPS: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

export class OffensiveSpOptimizer {
  private damageCalc = new DamageCalc()

  optimize(attacker: Pokemon, targets: Target[], field: Field, threshold: KoThreshold = 1, options: OffensiveOptimizationOptions = {}): OffensiveOptimizationResult {
    const rollIndex = options.rollIndex ?? RollLevelConfig.HIGH_ROLL_INDEX
    const rightIsDefender = options.rightIsDefender ?? true
    const keepOtherSps = options.keepOtherSps ?? false
    const updateNature = options.updateNature ?? false

    const stat = this.offensiveStatOf(attacker)

    if (targets.length === 0) {
      return { proposals: [this.proposalFor(attacker, stat, attacker.sps[stat], null, keepOtherSps)], status: "not-needed", coverage: { covered: 0, total: 0, outOfReach: 0, bestTargetName: null } }
    }

    const budget = this.budgetFor(attacker, stat, keepOtherSps)
    const secondAttacker = options.secondAttacker

    if (secondAttacker) {
      return this.optimizeCombined(attacker, secondAttacker, targets[0].pokemon, field, threshold, rollIndex, rightIsDefender, stat, budget, keepOtherSps, updateNature)
    }

    return this.optimizeSingle(attacker, targets, field, threshold, rollIndex, rightIsDefender, stat, budget, keepOtherSps, updateNature)
  }

  private offensiveStatOf(attacker: Pokemon): OffensiveStat {
    return attacker.moveSet.activeMove.category === "Special" ? "spa" : "atk"
  }

  private proposalFor(pokemon: Pokemon, stat: OffensiveStat, sp: number, nature: string | null, keepOtherSps: boolean): OffensiveSpProposal {
    return { pokemonId: pokemon.id, stat, sps: this.spreadFor(pokemon, stat, sp, keepOtherSps), nature }
  }

  private spreadFor(pokemon: Pokemon, stat: OffensiveStat, sp: number, keepOtherSps: boolean): Stats {
    const base = keepOtherSps ? pokemon.sps : EMPTY_SPS

    return { ...base, [stat]: sp }
  }

  private budgetFor(attacker: Pokemon, stat: OffensiveStat, keepOtherSps: boolean): number {
    if (!keepOtherSps) {
      return MAX_SPS_PER_STAT
    }

    const committed = attacker.totalSps - attacker.sps[stat]

    return Math.max(0, Math.min(MAX_SPS_PER_STAT, MAX_SPS - committed))
  }

  private natureCandidates(pokemon: Pokemon, stat: OffensiveStat, updateNature: boolean): (string | null)[] {
    if (!updateNature) {
      return [null]
    }

    const boosting = BOOSTING_NATURE[stat]

    if (pokemon.nature === boosting) {
      return [null]
    }

    return [null, boosting]
  }

  private optimizeSingle(
    attacker: Pokemon,
    targets: Target[],
    field: Field,
    threshold: KoThreshold,
    rollIndex: number,
    rightIsDefender: boolean,
    stat: OffensiveStat,
    budget: number,
    keepOtherSps: boolean,
    updateNature: boolean
  ): OffensiveOptimizationResult {
    const total = targets.length
    const defenders = this.reachableDefenders(attacker, targets, field, rightIsDefender, stat, budget, keepOtherSps)

    if (defenders.length === 0) {
      return { proposals: [], status: "impossible", coverage: { covered: 0, total, outOfReach: total, bestTargetName: null } }
    }

    const natures = this.natureCandidates(attacker, stat, updateNature)

    if (this.ceilingMisses(attacker, defenders, field, threshold, rollIndex, rightIsDefender, stat, budget, keepOtherSps, natures)) {
      return { proposals: [], status: "impossible", coverage: { covered: 0, total, outOfReach: total, bestTargetName: null } }
    }

    let best: Reach = { covered: 0, koChance: 0, sp: 0, nature: null, bestTargetName: null }
    let bestOutOfReach = total

    for (const nature of natures) {
      const base = nature ? attacker.clone({ nature }) : attacker
      const probe = base.clone()

      for (let sp = 0; sp <= budget; sp++) {
        this.applySp(probe, base, stat, sp, keepOtherSps)

        const chances = defenders.map(defender => this.koChanceAgainst(probe, defender, field, threshold, rollIndex, rightIsDefender))
        const covered = chances.filter(chance => chance === 1).length

        if (covered === total) {
          return {
            proposals: [this.proposalFor(attacker, stat, sp, nature, keepOtherSps)],
            status: sp === 0 && nature === null ? "not-needed" : "success",
            coverage: { covered, total, outOfReach: 0, bestTargetName: null }
          }
        }

        if (covered === defenders.length) {
          return {
            proposals: [this.proposalFor(attacker, stat, sp, nature, keepOtherSps)],
            status: "best-effort",
            koChance: 0,
            coverage: { covered, total, outOfReach: total - covered, bestTargetName: null }
          }
        }

        const pendingIndex = this.mostPromisingPendingIndex(chances)
        const candidate: Reach = { covered, koChance: chances[pendingIndex], sp, nature, bestTargetName: defenders[pendingIndex].name }

        if (this.reachesFurther(candidate, best)) {
          best = candidate
          bestOutOfReach = total - chances.filter(chance => chance > 0).length
        }
      }
    }

    if (best.covered === 0 && best.koChance === 0) {
      return { proposals: [], status: "impossible", coverage: { covered: 0, total, outOfReach: total, bestTargetName: null } }
    }

    return {
      proposals: [this.proposalFor(attacker, stat, best.sp, best.nature, keepOtherSps)],
      status: "best-effort",
      koChance: best.koChance,
      coverage: { covered: best.covered, total, outOfReach: bestOutOfReach, bestTargetName: best.bestTargetName }
    }
  }

  private mostPromisingPendingIndex(chances: number[]): number {
    const pending = chances.map(chance => (chance === 1 ? -1 : chance))

    return pending.indexOf(Math.max(...pending))
  }

  private reachesFurther(candidate: Reach, current: Reach): boolean {
    if (candidate.covered !== current.covered) return candidate.covered > current.covered

    return candidate.koChance > current.koChance
  }

  private optimizeCombined(
    attacker: Pokemon,
    secondAttacker: SecondAttacker,
    defender: Pokemon,
    field: Field,
    threshold: KoThreshold,
    rollIndex: number,
    rightIsDefender: boolean,
    stat: OffensiveStat,
    budget: number,
    keepOtherSps: boolean,
    updateNature: boolean
  ): OffensiveOptimizationResult {
    const partner = secondAttacker.pokemon
    const partnerKeepOtherSps = secondAttacker.keepOtherSps ?? false
    const partnerUpdateNature = secondAttacker.updateNature ?? false
    const partnerStat = this.offensiveStatOf(partner)
    const partnerBudget = this.budgetFor(partner, partnerStat, partnerKeepOtherSps)
    const natures = this.natureCandidates(attacker, stat, updateNature)
    const partnerNatures = this.natureCandidates(partner, partnerStat, partnerUpdateNature)

    if (this.combinedCeilingMisses(attacker, partner, defender, field, threshold, rollIndex, rightIsDefender, stat, partnerStat, budget, partnerBudget, keepOtherSps, partnerKeepOtherSps, natures, partnerNatures)) {
      return { proposals: [], status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: null } }
    }

    let best: BestEffort = { koChance: 0, attacker: { sp: 0, nature: null }, partner: { sp: 0, nature: null } }

    for (const nature of natures) {
      for (const partnerNature of partnerNatures) {
        const base = nature ? attacker.clone({ nature }) : attacker
        const partnerBase = partnerNature ? partner.clone({ nature: partnerNature }) : partner
        const probe = base.clone()
        const partnerProbe = partnerBase.clone()

        for (let total = 0; total <= budget + partnerBudget; total++) {
          for (let sp = 0; sp <= Math.min(total, budget); sp++) {
            const partnerSp = total - sp

            if (partnerSp > partnerBudget) continue

            this.applySp(probe, base, stat, sp, keepOtherSps)
            this.applySp(partnerProbe, partnerBase, partnerStat, partnerSp, partnerKeepOtherSps)

            const koChance = this.koChanceTogether(probe, partnerProbe, defender, field, threshold, rollIndex, rightIsDefender)

            if (koChance === 1) {
              const untouched = total === 0 && nature === null && partnerNature === null

              return {
                proposals: [this.proposalFor(attacker, stat, sp, nature, keepOtherSps), this.proposalFor(partner, partnerStat, partnerSp, partnerNature, partnerKeepOtherSps)],
                status: untouched ? "not-needed" : "success",
                coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null }
              }
            }

            if (koChance > best.koChance) {
              best = { koChance, attacker: { sp, nature }, partner: { sp: partnerSp, nature: partnerNature } }
            }
          }
        }
      }
    }

    return {
      proposals: [this.proposalFor(attacker, stat, best.attacker.sp, best.attacker.nature, keepOtherSps), this.proposalFor(partner, partnerStat, best.partner.sp, best.partner.nature, partnerKeepOtherSps)],
      status: "best-effort",
      koChance: best.koChance,
      coverage: { covered: 0, total: 1, outOfReach: 0, bestTargetName: null }
    }
  }

  private ceilingMisses(attacker: Pokemon, defenders: Pokemon[], field: Field, threshold: KoThreshold, rollIndex: number, rightIsDefender: boolean, stat: OffensiveStat, budget: number, keepOtherSps: boolean, natures: (string | null)[]): boolean {
    if (defenders.some(defender => respondsToDamage(defender, attacker, field))) {
      return false
    }

    const probe = this.atCeiling(attacker, natures, stat, budget, keepOtherSps)

    return defenders.every(defender => this.koChanceAgainst(probe, defender, field, threshold, rollIndex, rightIsDefender) === 0)
  }

  private atCeiling(pokemon: Pokemon, natures: (string | null)[], stat: OffensiveStat, budget: number, keepOtherSps: boolean): Pokemon {
    const strongest = natures[natures.length - 1]
    const base = strongest ? pokemon.clone({ nature: strongest }) : pokemon
    const probe = base.clone()

    this.applySp(probe, base, stat, budget, keepOtherSps)

    return probe
  }

  private combinedCeilingMisses(
    attacker: Pokemon,
    partner: Pokemon,
    defender: Pokemon,
    field: Field,
    threshold: KoThreshold,
    rollIndex: number,
    rightIsDefender: boolean,
    stat: OffensiveStat,
    partnerStat: OffensiveStat,
    budget: number,
    partnerBudget: number,
    keepOtherSps: boolean,
    partnerKeepOtherSps: boolean,
    natures: (string | null)[],
    partnerNatures: (string | null)[]
  ): boolean {
    if (respondsToDamage(defender, attacker, field) || respondsToDamage(defender, partner, field)) {
      return false
    }

    const probe = this.atCeiling(attacker, natures, stat, budget, keepOtherSps)
    const partnerProbe = this.atCeiling(partner, partnerNatures, partnerStat, partnerBudget, partnerKeepOtherSps)

    return this.koChanceTogether(probe, partnerProbe, defender, field, threshold, rollIndex, rightIsDefender) === 0
  }

  private reachableDefenders(attacker: Pokemon, targets: Target[], field: Field, rightIsDefender: boolean, stat: OffensiveStat, budget: number, keepOtherSps: boolean): Pokemon[] {
    const probe = attacker.clone()
    this.applySp(probe, attacker, stat, budget, keepOtherSps)

    return targets.map(target => target.pokemon).filter(defender => !this.damageCalc.dealsNoDamage(this.damageCalc.calculateResult(probe, defender, probe.move, field, rightIsDefender)))
  }

  private applySp(probe: Pokemon, base: Pokemon, stat: OffensiveStat, sp: number, keepOtherSps: boolean): void {
    probe.setSps(this.spreadFor(base, stat, sp, keepOtherSps))
  }

  private koChanceAgainst(attacker: Pokemon, defender: Pokemon, field: Field, threshold: KoThreshold, rollIndex: number, rightIsDefender: boolean): number {
    const result = this.damageCalc.calculateResult(attacker, defender, attacker.move, field, rightIsDefender)

    return result.koChanceWithin(threshold, rollIndex)
  }

  private koChanceTogether(attacker: Pokemon, partner: Pokemon, defender: Pokemon, field: Field, threshold: KoThreshold, rollIndex: number, rightIsDefender: boolean): number {
    const multiResult = this.damageCalc.calcDamageValueForTwoAttackers(attacker, partner, defender, field, rightIsDefender)

    return multiResult.koChanceWithin(threshold, rollIndex)
  }
}
