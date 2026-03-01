import { inject, Injectable } from "@angular/core"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats, SurvivalThreshold } from "@lib/types"
import { AttackerSelector } from "./internal/attacker-selector"
import { DoubleAttackerOptimizer } from "./internal/double-attacker-optimizer"
import { SingleAttackerOptimizer } from "./internal/single-attacker-optimizer"
import { SolutionCombiner } from "./internal/solution-combiner"
import { RefinementStage } from "./internal/refinement-stage"
import { SurvivalChecker } from "./internal/survival-checker"
import { OptimizationResult } from "./internal/ev-optimizer-types"

@Injectable({
  providedIn: "root"
})
export class DefensiveEvOptimizerService {
  private attackerSelector = inject(AttackerSelector)
  private singleAttackerOptimizer = inject(SingleAttackerOptimizer)
  private doubleAttackerOptimizer = inject(DoubleAttackerOptimizer)
  private solutionCombiner = inject(SolutionCombiner)
  private refinementStage = inject(RefinementStage)
  private survivalChecker = inject(SurvivalChecker)

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature = false, keepOffensiveEvs = false, threshold: SurvivalThreshold = 2, rollIndex = RollLevelConfig.HIGH_ROLL_INDEX, rightIsDefender = true): OptimizationResult {
    if (targets.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const reservedEvs = keepOffensiveEvs ? { atk: defender.evs.atk, spa: defender.evs.spa, spe: defender.evs.spe } : undefined

    const targetsWithTwoAttackers = targets.filter(t => t.secondPokemon && !t.secondPokemon.isDefault && !t.pokemon.isDefault)
    const singleTargets = targets.filter(t => !t.secondPokemon || t.secondPokemon.isDefault || t.pokemon.isDefault)
    const attackers = singleTargets.map(t => t.pokemon).filter(p => !p.isDefault)

    if (targetsWithTwoAttackers.length === 0) {
      return this.optimizeForSingleAttackers(defender, attackers, field, updateNature, reservedEvs, threshold, rollIndex, rightIsDefender)
    }

    const strongestDoubleTarget = this.attackerSelector.findStrongestDoubleTarget(defender, targets, field, rollIndex, rightIsDefender)

    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(attackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(attackers)

    let physicalStrongest: Pokemon | null = null
    let specialStrongest: Pokemon | null = null
    let physicalOptimized: Stats | null = null
    let specialOptimized: Stats | null = null

    let natureUsed: string | null = null
    let priority: {
      physicalStrongestAttacker: Pokemon | null
      specialStrongestAttacker: Pokemon | null
      natureUsed: string | null
      prioritizePhysical: boolean
    } | null = null

    if (physicalAttackers.length > 0 || specialAttackers.length > 0) {
      priority = this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature, threshold, rollIndex, rightIsDefender)
      physicalStrongest = priority.physicalStrongestAttacker
      specialStrongest = priority.specialStrongestAttacker
      natureUsed = priority.natureUsed

      const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

      physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null
      specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null
    }

    const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

    let doubleOptimized: Stats | null = null
    if (strongestDoubleTarget) {
      doubleOptimized = this.doubleAttackerOptimizer.optimizeForTwoAttackers(strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, defenderWithNature, field, threshold, rollIndex, rightIsDefender)
    }

    let evs: Stats | null = this.solutionCombiner.combineThreeSolutions(
      { physicalSolution: physicalOptimized, specialSolution: specialOptimized, doubleSolution: doubleOptimized },
      { defender: defenderWithNature, field, threshold, rollIndex, rightIsDefender },
      { physicalAttacker: physicalStrongest, specialAttacker: specialStrongest, physicalAttackers, specialAttackers },
      { attacker1: strongestDoubleTarget?.attacker1 ?? null, attacker2: strongestDoubleTarget?.attacker2 ?? null }
    )

    if (evs && strongestDoubleTarget) {
      const refinedEvs = this.refinementStage.refineForDoubleAttackers(evs, defenderWithNature, strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, field, threshold, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
      if (refinedEvs) {
        evs = refinedEvs
      } else {
        evs = this.solutionCombiner.combineSolutions(physicalOptimized, specialOptimized, priority?.prioritizePhysical ?? true, defenderWithNature, field, physicalStrongest, specialStrongest, physicalAttackers, specialAttackers, threshold, rollIndex, rightIsDefender)

        if (evs) {
          const strongestAttacker = physicalStrongest || specialStrongest
          if (strongestAttacker) {
            evs = this.refinementStage.refineForSingleAttacker(evs, defenderWithNature, strongestAttacker, field, threshold, rollIndex, rightIsDefender)
          }
        }
      }
    }

    if (!evs) {
      const defenderWithZeroDefensiveEvs = defenderWithNature.clone({ evs: { hp: 0, atk: defenderWithNature.evs.atk, def: 0, spa: defenderWithNature.evs.spa, spd: 0, spe: defenderWithNature.evs.spe } })
      const survivesSingle = attackers.every(attacker => this.survivalChecker.checkSurvival(attacker, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender))
      const survivesDouble = targetsWithTwoAttackers.every(target => this.survivalChecker.checkSurvivalAgainstTwoAttackers(target.pokemon, target.secondPokemon!, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender))

      if (survivesSingle && survivesDouble) {
        if (reservedEvs) {
          return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: natureUsed }
        }
        return { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: natureUsed }
      }

      return { evs: null, nature: null }
    }

    if (reservedEvs) {
      const totalEvs = evs.hp + evs.def + evs.spd + reservedEvs.atk + reservedEvs.spa + reservedEvs.spe
      if (totalEvs > 508) {
        return { evs: null, nature: null }
      }
      return { evs: { hp: evs.hp, atk: reservedEvs.atk, def: evs.def, spa: reservedEvs.spa, spd: evs.spd, spe: reservedEvs.spe }, nature: natureUsed }
    }

    return { evs, nature: natureUsed }
  }

  private optimizeForSingleAttackers(
    defender: Pokemon,
    attackers: Pokemon[],
    field: Field,
    updateNature = false,
    reservedEvs?: { atk: number; spa: number; spe: number },
    threshold: SurvivalThreshold = 2,
    rollIndex = RollLevelConfig.HIGH_ROLL_INDEX,
    rightIsDefender = true
  ): OptimizationResult {
    if (attackers.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(attackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(attackers)

    if (physicalAttackers.length === 0 && specialAttackers.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const priority = this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature, threshold, rollIndex, rightIsDefender)

    const natureUsed = priority.natureUsed
    const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

    const physicalStrongest = priority.physicalStrongestAttacker
    const physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null

    if (physicalStrongest && !physicalOptimized) {
      return { evs: null, nature: null }
    }

    const specialStrongest = priority.specialStrongestAttacker
    const specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null

    if (specialStrongest && !specialOptimized) {
      return { evs: null, nature: null }
    }

    let evs: Stats | null = this.solutionCombiner.combineSolutions(physicalOptimized, specialOptimized, priority.prioritizePhysical, defenderWithNature, field, physicalStrongest, specialStrongest, physicalAttackers, specialAttackers, threshold, rollIndex, rightIsDefender)

    if (evs) {
      const strongestAttacker = physicalStrongest || specialStrongest

      if (strongestAttacker) {
        evs = this.refinementStage.refineForSingleAttacker(evs, defenderWithNature, strongestAttacker, field, threshold, rollIndex, rightIsDefender)
      }
    }

    if (!evs) {
      const defenderWithZeroDefensiveEvs = defenderWithNature.clone({ evs: { hp: 0, atk: defenderWithNature.evs.atk, def: 0, spa: defenderWithNature.evs.spa, spd: 0, spe: defenderWithNature.evs.spe } })
      const alreadySurvivesAll = attackers.every(attacker => this.survivalChecker.checkSurvival(attacker, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender))

      if (alreadySurvivesAll) {
        if (reservedEvs) {
          return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: natureUsed }
        }
        return { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: natureUsed }
      }

      return { evs: null, nature: null }
    }

    if (reservedEvs) {
      const totalEvs = evs.hp + evs.def + evs.spd + reservedEvs.atk + reservedEvs.spa + reservedEvs.spe
      if (totalEvs > 508) {
        return { evs: null, nature: null }
      }
      return { evs: { hp: evs.hp, atk: reservedEvs.atk, def: evs.def, spa: reservedEvs.spa, spd: evs.spd, spe: reservedEvs.spe }, nature: natureUsed }
    }

    return { evs, nature: natureUsed }
  }
}
