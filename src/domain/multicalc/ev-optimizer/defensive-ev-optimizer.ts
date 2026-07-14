import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { AttackerPriorityResult, AttackerSelector } from "./internal/attacker-selector"
import { CachedDamageCalc } from "./internal/cached-damage-calc"
import { DoubleAttackerOptimizer } from "./internal/double-attacker-optimizer"
import { OptimalSpreadFinder } from "./internal/optimal-spread-finder"
import { SingleAttackerOptimizer } from "./internal/single-attacker-optimizer"
import { SolutionCombiner } from "./internal/solution-combiner"
import { RefinementStage } from "./internal/refinement-stage"
import { SurvivalChecker } from "./internal/survival-checker"
import { OptimizationResult, OptimizationStatus } from "./internal/ev-optimizer-types"
import { DEFENSIVE_STATS } from "./defensive-stats"

type OptimizationSolution = {
  evs: Stats | null
  nature: string | null
}

export class DefensiveEvOptimizer {
  private damageCalc = new CachedDamageCalc()
  private survivalChecker = new SurvivalChecker(this.damageCalc)
  private optimalSpreadFinder = new OptimalSpreadFinder(this.survivalChecker)
  private attackerSelector = new AttackerSelector(this.survivalChecker, this.damageCalc)
  private singleAttackerOptimizer = new SingleAttackerOptimizer(this.survivalChecker)
  private doubleAttackerOptimizer = new DoubleAttackerOptimizer(this.survivalChecker)
  private solutionCombiner = new SolutionCombiner(this.survivalChecker, this.singleAttackerOptimizer, this.attackerSelector)
  private refinementStage = new RefinementStage(this.survivalChecker, this.damageCalc)

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature = false, keepOffensiveEvs = false, threshold: SurvivalThreshold = 2, rollIndex = RollLevelConfig.HIGH_ROLL_INDEX, rightIsDefender = true): OptimizationResult {
    this.damageCalc.clear()

    const solution = this.computeSolution(defender, targets, field, updateNature, keepOffensiveEvs, threshold, rollIndex, rightIsDefender)

    return { ...solution, status: this.deriveStatus(solution.evs) }
  }

  private deriveStatus(evs: Stats | null): OptimizationStatus {
    if (!evs) return "no-solution"

    if (DEFENSIVE_STATS.every(stat => evs[stat] === 0)) return "not-needed"

    return "success"
  }

  private computeSolution(
    defender: Pokemon,
    targets: Target[],
    field: Field,
    updateNature = false,
    keepOffensiveEvs = false,
    threshold: SurvivalThreshold = 2,
    rollIndex = RollLevelConfig.HIGH_ROLL_INDEX,
    rightIsDefender = true
  ): OptimizationSolution {
    if (targets.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const reservedEvs = keepOffensiveEvs ? { atk: defender.evs.atk, spa: defender.evs.spa, spe: defender.evs.spe } : undefined

    const targetsWithTwoAttackers = targets.filter(t => t.secondPokemon)
    const singleTargets = targets.filter(t => !t.secondPokemon)
    const attackers = singleTargets.map(t => t.pokemon)

    if (targetsWithTwoAttackers.length === 0) {
      return this.optimizeForSingleAttackers(defender, attackers, field, updateNature, reservedEvs, threshold, rollIndex, rightIsDefender)
    }

    const strongestDoubleTarget = this.attackerSelector.findStrongestDoubleTarget(defender, targets, field, threshold, rollIndex, rightIsDefender)

    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(attackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(attackers)

    let physicalStrongest: Pokemon | null = null
    let specialStrongest: Pokemon | null = null
    let physicalOptimized: Stats | null = null
    let specialOptimized: Stats | null = null

    let natureUsed: string | null = null
    let priority: AttackerPriorityResult | null = null

    if (physicalAttackers.length > 0 || specialAttackers.length > 0) {
      priority = this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature, threshold, rollIndex, rightIsDefender)
      physicalStrongest = priority.physical.strongestAttacker
      specialStrongest = priority.special.strongestAttacker
      natureUsed = priority.natureUsed
    }

    const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

    const physicalAttackersSurvivable = priority?.physical.survivableAttackers ?? []
    const specialAttackersSurvivable = priority?.special.survivableAttackers ?? []
    const doublePair: [Pokemon, Pokemon] | null = strongestDoubleTarget ? [strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2] : null

    let evs: Stats | null = this.optimalSpreadFinder.findOptimal(
      defenderWithNature,
      this.withStrongest(physicalStrongest, physicalAttackersSurvivable),
      this.withStrongest(specialStrongest, specialAttackersSurvivable),
      doublePair,
      field,
      threshold,
      rollIndex,
      rightIsDefender
    )

    if (!evs) {
      physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null
      specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null

      let doubleOptimized: Stats | null = null

      if (strongestDoubleTarget) {
        doubleOptimized = this.doubleAttackerOptimizer.optimizeForTwoAttackers(strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, defenderWithNature, field, threshold, rollIndex, rightIsDefender)
      }

      evs = this.solutionCombiner.combineThreeSolutions(
        { physicalSolution: physicalOptimized, specialSolution: specialOptimized, doubleSolution: doubleOptimized },
        { defender: defenderWithNature, field, threshold, rollIndex, rightIsDefender },
        { physicalAttacker: physicalStrongest, specialAttacker: specialStrongest, physicalAttackers: physicalAttackersSurvivable, specialAttackers: specialAttackersSurvivable },
        { attacker1: strongestDoubleTarget?.attacker1 ?? null, attacker2: strongestDoubleTarget?.attacker2 ?? null }
      )

      if (evs && strongestDoubleTarget) {
        const refinedEvs = this.refinementStage.refineForDoubleAttackers(evs, defenderWithNature, strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, field, threshold, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
        if (refinedEvs) {
          evs = refinedEvs
        } else {
          evs = this.solutionCombiner.combineSolutions(
            physicalOptimized,
            specialOptimized,
            priority?.prioritizePhysical ?? true,
            defenderWithNature,
            field,
            physicalStrongest,
            specialStrongest,
            physicalAttackersSurvivable,
            specialAttackersSurvivable,
            threshold,
            rollIndex,
            rightIsDefender
          )

          if (evs) {
            const strongestAttacker = physicalStrongest || specialStrongest
            if (strongestAttacker) {
              evs = this.refinementStage.refineForSingleAttacker(evs, defenderWithNature, strongestAttacker, field, threshold, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
            }
          }
        }
      }
    }

    if (!evs) {
      const defenderWithZeroDefensiveEvs = defenderWithNature.clone({ evs: { hp: 0, atk: defenderWithNature.evs.atk, def: 0, spa: defenderWithNature.evs.spa, spd: 0, spe: defenderWithNature.evs.spe } })

      const impossibleSingleAttackers = [...(priority?.physical.impossibleAttackers ?? []), ...(priority?.special.impossibleAttackers ?? [])]
      const possibleSingleAttackers = attackers.filter(attacker => !impossibleSingleAttackers.includes(attacker))
      const hasSurvivableDouble = strongestDoubleTarget !== null

      if (possibleSingleAttackers.length === 0 && !hasSurvivableDouble) {
        return { evs: null, nature: null }
      }

      const survivesSingle = possibleSingleAttackers.every(attacker => this.survivalChecker.checkSurvival(attacker, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender))
      const survivesDouble = strongestDoubleTarget
        ? this.survivalChecker.checkSurvivalAgainstTwoAttackers(strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender)
        : true

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
  ): OptimizationSolution {
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

    const physicalStrongest = priority.physical.strongestAttacker
    const specialStrongest = priority.special.strongestAttacker
    const physicalAttackersSurvivable = priority.physical.survivableAttackers
    const specialAttackersSurvivable = priority.special.survivableAttackers

    let evs: Stats | null = this.optimalSpreadFinder.findOptimal(
      defenderWithNature,
      this.withStrongest(physicalStrongest, physicalAttackersSurvivable),
      this.withStrongest(specialStrongest, specialAttackersSurvivable),
      null,
      field,
      threshold,
      rollIndex,
      rightIsDefender
    )

    if (!evs) {
      const physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null

      if (physicalStrongest && !physicalOptimized) {
        return { evs: null, nature: null }
      }

      const specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field, threshold, rollIndex, rightIsDefender) : null

      if (specialStrongest && !specialOptimized) {
        return { evs: null, nature: null }
      }

      evs = this.solutionCombiner.combineSolutions(
        physicalOptimized,
        specialOptimized,
        priority.prioritizePhysical,
        defenderWithNature,
        field,
        physicalStrongest,
        specialStrongest,
        physicalAttackersSurvivable,
        specialAttackersSurvivable,
        threshold,
        rollIndex,
        rightIsDefender
      )

      if (evs) {
        const strongestAttacker = physicalStrongest || specialStrongest

        if (strongestAttacker) {
          evs = this.refinementStage.refineForSingleAttacker(evs, defenderWithNature, strongestAttacker, field, threshold, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
        }
      }
    }

    if (!evs) {
      const impossibleAttackers = [...priority.physical.impossibleAttackers, ...priority.special.impossibleAttackers]
      const possibleAttackers = attackers.filter(attacker => !impossibleAttackers.includes(attacker))

      if (possibleAttackers.length === 0) {
        return { evs: null, nature: null }
      }

      const defenderWithZeroDefensiveEvs = defenderWithNature.clone({ evs: { hp: 0, atk: defenderWithNature.evs.atk, def: 0, spa: defenderWithNature.evs.spa, spd: 0, spe: defenderWithNature.evs.spe } })

      const alreadySurvivesAll = possibleAttackers.every(attacker => this.survivalChecker.checkSurvival(attacker, defenderWithZeroDefensiveEvs, field, threshold, rollIndex, rightIsDefender))

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

  private withStrongest(strongest: Pokemon | null, survivable: Pokemon[]): Pokemon[] {
    if (!strongest) {
      return survivable
    }

    return [strongest, ...survivable.filter(attacker => attacker !== strongest)]
  }
}
