import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats } from "@lib/types"
import { AttackerSelector } from "./internal/attacker-selector"
import { DoubleAttackerOptimizer } from "./internal/double-attacker-optimizer"
import { SingleAttackerOptimizer } from "./internal/single-attacker-optimizer"
import { SolutionCombiner } from "./internal/solution-combiner"

@Injectable({
  providedIn: "root"
})
export class DefensiveEvOptimizerService {
  private attackerSelector = inject(AttackerSelector)
  private singleAttackerOptimizer = inject(SingleAttackerOptimizer)
  private doubleAttackerOptimizer = inject(DoubleAttackerOptimizer)
  private solutionCombiner = inject(SolutionCombiner)

  optimize(defender: Pokemon, targets: Target[], field: Field, updateNature = false, keepOffensiveEvs = false): { evs: Stats; nature: string | null } {
    if (targets.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const reservedEvs = keepOffensiveEvs ? { atk: defender.evs.atk, spa: defender.evs.spa, spe: defender.evs.spe } : undefined

    const targetsWithTwoAttackers = targets.filter(t => t.secondPokemon && !t.secondPokemon.isDefault && !t.pokemon.isDefault)
    const singleTargets = targets.filter(t => !t.secondPokemon || t.secondPokemon.isDefault || t.pokemon.isDefault)
    const attackers = singleTargets.map(t => t.pokemon).filter(p => !p.isDefault)

    if (targetsWithTwoAttackers.length === 0) {
      return this.optimizeForSingleAttackers(defender, attackers, field, updateNature, reservedEvs)
    }

    const strongestDoubleTarget = this.attackerSelector.findStrongestDoubleTarget(defender, targets, field)

    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(attackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(attackers)

    let physicalStrongest: Pokemon | null = null
    let specialStrongest: Pokemon | null = null
    let physicalOptimized: Stats | null = null
    let specialOptimized: Stats | null = null

    let natureUsed: string | null = null
    if (physicalAttackers.length > 0 || specialAttackers.length > 0) {
      const priority = this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature)
      physicalStrongest = priority.physicalStrongestAttacker
      specialStrongest = priority.specialStrongestAttacker
      natureUsed = priority.natureUsed

      const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

      physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field) : null
      specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field) : null
    }

    const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

    let doubleOptimized: Stats | null = null
    if (strongestDoubleTarget) {
      doubleOptimized = this.doubleAttackerOptimizer.optimizeForTwoAttackers(strongestDoubleTarget.attacker1, strongestDoubleTarget.attacker2, defenderWithNature, field)
    }

    const evs = this.solutionCombiner.combineThreeSolutions(
      physicalOptimized,
      specialOptimized,
      doubleOptimized,
      defenderWithNature,
      field,
      physicalStrongest,
      specialStrongest,
      strongestDoubleTarget?.attacker1 ?? null,
      strongestDoubleTarget?.attacker2 ?? null,
      physicalAttackers,
      specialAttackers
    )

    if (!evs) {
      if (reservedEvs) {
        return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: null }
      }
      return { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null }
    }

    if (reservedEvs) {
      const totalEvs = evs.hp + evs.def + evs.spd + reservedEvs.atk + reservedEvs.spa + reservedEvs.spe
      if (totalEvs > 508) {
        return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: null }
      }
      return { evs: { hp: evs.hp, atk: reservedEvs.atk, def: evs.def, spa: reservedEvs.spa, spd: evs.spd, spe: reservedEvs.spe }, nature: natureUsed }
    }

    return { evs, nature: natureUsed }
  }

  private optimizeForSingleAttackers(defender: Pokemon, attackers: Pokemon[], field: Field, updateNature = false, reservedEvs?: { atk: number; spa: number; spe: number }): { evs: Stats; nature: string | null } {
    if (attackers.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const physicalAttackers = this.attackerSelector.getPhysicalAttackers(attackers)
    const specialAttackers = this.attackerSelector.getSpecialAttackers(attackers)

    if (physicalAttackers.length === 0 && specialAttackers.length === 0) {
      return { evs: { ...defender.evs }, nature: null }
    }

    const priority = this.attackerSelector.determinePriority(physicalAttackers, specialAttackers, defender, field, updateNature)

    const natureUsed = priority.natureUsed
    const defenderWithNature = natureUsed ? defender.clone({ nature: natureUsed }) : defender

    const physicalStrongest = priority.physicalStrongestAttacker
    const physicalOptimized = physicalStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(physicalStrongest, defenderWithNature, field) : null

    const specialStrongest = priority.specialStrongestAttacker
    const specialOptimized = specialStrongest ? this.singleAttackerOptimizer.optimizeForAttacker(specialStrongest, defenderWithNature, field) : null

    const evs = this.solutionCombiner.combineSolutions(physicalOptimized, specialOptimized, priority.prioritizePhysical, defenderWithNature, field, physicalStrongest, specialStrongest, physicalAttackers, specialAttackers)

    if (!evs) {
      if (reservedEvs) {
        return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: null }
      }
      return { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null }
    }

    if (reservedEvs) {
      const totalEvs = evs.hp + evs.def + evs.spd + reservedEvs.atk + reservedEvs.spa + reservedEvs.spe
      if (totalEvs > 508) {
        return { evs: { hp: 0, atk: reservedEvs.atk, def: 0, spa: reservedEvs.spa, spd: 0, spe: reservedEvs.spe }, nature: null }
      }
      return { evs: { hp: evs.hp, atk: reservedEvs.atk, def: evs.def, spa: reservedEvs.spa, spd: evs.spd, spe: reservedEvs.spe }, nature: natureUsed }
    }

    return { evs, nature: natureUsed }
  }
}
