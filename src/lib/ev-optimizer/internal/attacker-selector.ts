import { MAX_SINGLE_STAT_EVS } from "./ev-optimizer-constants"
import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Category, SurvivalThreshold } from "@lib/types"
import { SurvivalChecker } from "./survival-checker"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"

export type AttackerPriorityResult = {
  prioritizePhysical: boolean
  natureUsed: string | null
  physical: SurvivalAnalysis
  special: SurvivalAnalysis
}

type SurvivalAnalysis = {
  survivableAttackers: Pokemon[]
  strongestAttacker: Pokemon | null
  maxDamage: number
}

type NatureScenario = {
  nature: string | null
  physical: SurvivalAnalysis
  special: SurvivalAnalysis
}

@Injectable({
  providedIn: "root"
})
export class AttackerSelector {
  private survivalChecker = inject(SurvivalChecker)
  private damageCalculator = inject(DamageCalculatorService)

  getPhysicalAttackers(attackers: Pokemon[]): Pokemon[] {
    return this.getAttackersByCategory(attackers, "Physical")
  }

  getSpecialAttackers(attackers: Pokemon[]): Pokemon[] {
    return this.getAttackersByCategory(attackers, "Special")
  }

  private getAttackersByCategory(attackers: Pokemon[], category: Category): Pokemon[] {
    return attackers.filter(attacker => {
      if (attacker.isDefault) return false

      return attacker.moveSet.activeMove.category === category
    })
  }

  determinePriority(physicalAttackers: Pokemon[], specialAttackers: Pokemon[], defender: Pokemon, field: Field, updateNature = false, threshold: SurvivalThreshold = 2, rollIndex = 15, rightIsDefender = true): AttackerPriorityResult {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    const defenderWithMaxPhysical = defender.clone({ evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
    const defenderWithMaxSpecial = defender.clone({ evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

    const physicalAnalysis = this.analyzeSurvival(physicalAttackers, defenderWithNoEv, defenderWithMaxPhysical, field, true, threshold, rollIndex, rightIsDefender)
    const specialAnalysis = this.analyzeSurvival(specialAttackers, defenderWithNoEv, defenderWithMaxSpecial, field, true, threshold, rollIndex, rightIsDefender)

    let bestScenario: NatureScenario = {
      nature: null,
      physical: physicalAnalysis,
      special: specialAnalysis
    }

    if (updateNature) {
      const { defNature, spdNature } = this.getDefensiveNatures(defender)

      const defenderDefMaxPhysical = defender.clone({ nature: defNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
      const defenderDefMaxSpecial = defender.clone({ nature: defNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

      const defNaturePhysicalAnalysis = this.analyzeSurvival(physicalAttackers, null, defenderDefMaxPhysical, field, false, threshold, rollIndex, rightIsDefender)
      const defNatureSpecialAnalysis = this.analyzeSurvival(specialAttackers, null, defenderDefMaxSpecial, field, false, threshold, rollIndex, rightIsDefender)

      const defScenario: NatureScenario = {
        nature: defNature,
        physical: defNaturePhysicalAnalysis,
        special: defNatureSpecialAnalysis
      }

      const defenderSpdMaxPhysical = defender.clone({ nature: spdNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
      const defenderSpdMaxSpecial = defender.clone({ nature: spdNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

      const spdNaturePhysicalAnalysis = this.analyzeSurvival(physicalAttackers, null, defenderSpdMaxPhysical, field, false, threshold, rollIndex, rightIsDefender)
      const spdNatureSpecialAnalysis = this.analyzeSurvival(specialAttackers, null, defenderSpdMaxSpecial, field, false, threshold, rollIndex, rightIsDefender)

      const spdScenario: NatureScenario = {
        nature: spdNature,
        physical: spdNaturePhysicalAnalysis,
        special: spdNatureSpecialAnalysis
      }

      bestScenario = this.selectBestScenario(bestScenario, defScenario, spdScenario, physicalAttackers.length, specialAttackers.length, defender.nature)
    }

    return {
      prioritizePhysical: bestScenario.physical.survivableAttackers.length >= bestScenario.special.survivableAttackers.length,
      natureUsed: bestScenario.nature,
      physical: bestScenario.physical,
      special: bestScenario.special
    }
  }

  private analyzeSurvival(attackers: Pokemon[], defenderMin: Pokemon | null, defenderMax: Pokemon, field: Field, checkMin: boolean, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): SurvivalAnalysis {
    let strongestAttacker: Pokemon | null = null
    let maxDamage = 0
    const survivableAttackers: Pokemon[] = []

    for (const attacker of attackers) {
      let survives: boolean

      if (checkMin && defenderMin) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderMin, field, threshold, rollIndex, rightIsDefender)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderMax, field, threshold, rollIndex, rightIsDefender)
        survives = !survivesWithMin && survivesWithMax
      } else {
        survives = this.survivalChecker.checkSurvival(attacker, defenderMax, field, threshold, rollIndex, rightIsDefender)
      }

      if (survives) {
        survivableAttackers.push(attacker)
      }

      const damage = this.damageCalculator.calculateResult(attacker, defenderMax, attacker.move, field, rightIsDefender).damageWithRemainingUntilTurn(1, rollIndex)

      if (damage < defenderMax.hp && damage > maxDamage) {
        maxDamage = damage
        strongestAttacker = attacker
      }
    }

    return { strongestAttacker, maxDamage, survivableAttackers }
  }

  private selectBestScenario(current: NatureScenario, def: NatureScenario, spd: NatureScenario, physicalCount: number, specialCount: number, currentNature: string): NatureScenario {
    const currentTotal = this.getTotalSurviving(current)
    const defTotal = this.getTotalSurviving(def)
    const spdTotal = this.getTotalSurviving(spd)
    const maxSurviving = Math.max(currentTotal, defTotal, spdTotal)

    if (maxSurviving === 0) {
      return { ...current, nature: currentNature }
    }

    if (defTotal === maxSurviving && spdTotal === maxSurviving) {
      const defMaxDamage = Math.max(def.physical.maxDamage, def.special.maxDamage)
      const spdMaxDamage = Math.max(spd.physical.maxDamage, spd.special.maxDamage)

      if (spdMaxDamage < defMaxDamage) {
        return spd
      } else if (defMaxDamage < spdMaxDamage) {
        return def
      } else {
        const hasPhysicalAttackers = physicalCount > 0
        const hasSpecialAttackers = specialCount > 0

        if (!hasPhysicalAttackers && hasSpecialAttackers) {
          return spd
        } else if (hasPhysicalAttackers && !hasSpecialAttackers) {
          return def
        }

        return spd.special.survivableAttackers.length > def.physical.survivableAttackers.length ? spd : def
      }
    } else if (defTotal === maxSurviving && defTotal >= currentTotal) {
      return def
    } else if (spdTotal === maxSurviving && spdTotal >= currentTotal) {
      return spd
    }

    return current
  }

  private getTotalSurviving(scenario: NatureScenario): number {
    return scenario.physical.survivableAttackers.length + scenario.special.survivableAttackers.length
  }

  private getDefensiveNatures(defender: Pokemon): { defNature: string; spdNature: string } {
    const moves = [defender.moveSet.move1, defender.moveSet.move2, defender.moveSet.move3, defender.moveSet.move4]

    const physicalMoves = moves.filter(move => move.category === "Physical" && move.name !== "Struggle").length
    const specialMoves = moves.filter(move => move.category === "Special").length

    const hasMorePhysicalMoves = physicalMoves > specialMoves

    return {
      defNature: hasMorePhysicalMoves ? "Impish" : "Bold",
      spdNature: hasMorePhysicalMoves ? "Careful" : "Calm"
    }
  }

  findSecondStrongestAttacker(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean, rollIndex = 15, rightIsDefender = true): Pokemon | null {
    if (!strongestAttacker || attackers.length <= 1) {
      return null
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    let secondStrongestAttacker: Pokemon | null = null
    let secondMaxDamage = 0

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.damageCalculator.calculateResult(attacker, defenderWithMax, attacker.move, field, rightIsDefender).damageWithRemainingUntilTurn(1, rollIndex)

      if (damage < defenderWithMax.hp && damage > secondMaxDamage) {
        secondMaxDamage = damage
        secondStrongestAttacker = attacker
      }
    }

    return secondStrongestAttacker
  }

  findAllAttackersOrderedByStrength(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean, rollIndex = 15, rightIsDefender = true): Pokemon[] {
    if (!strongestAttacker || attackers.length <= 1) {
      return []
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    const attackersWithDamage: { attacker: Pokemon; damage: number }[] = []

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.damageCalculator.calculateResult(attacker, defenderWithMax, attacker.move, field, rightIsDefender).damageWithRemainingUntilTurn(1, rollIndex)

      if (damage < defenderWithMax.hp) {
        attackersWithDamage.push({ attacker, damage })
      }
    }

    attackersWithDamage.sort((a, b) => b.damage - a.damage)

    return attackersWithDamage.map(item => item.attacker)
  }

  findStrongestDoubleTarget(defender: Pokemon, targets: Target[], field: Field, threshold: SurvivalThreshold = 2, rollIndex = 15, rightIsDefender = true): { attacker1: Pokemon; attacker2: Pokemon; maxDamage: number } | null {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    const defenderWithMax = defender.clone({ evs: { hp: 252, def: 252, spd: 252 } })
    let strongestAttacker1: Pokemon | null = null
    let strongestAttacker2: Pokemon | null = null
    let maxDamage = 0

    for (const target of targets) {
      if (target.pokemon.isDefault) continue

      if (target.secondPokemon && !target.secondPokemon.isDefault) {
        const survivesWithMax = this.survivalChecker.checkSurvivalAgainstTwoAttackers(target.pokemon, target.secondPokemon, defenderWithMax, field, threshold, rollIndex, rightIsDefender)
        if (!survivesWithMax) continue

        const multiResult = this.damageCalculator.calcDamageValueForTwoAttackers(target.pokemon, target.secondPokemon, defenderWithNoEv, field, rightIsDefender)
        const combinedDamage = multiResult.damageWithRemainingUntilTurn(1, rollIndex)

        if (combinedDamage > maxDamage) {
          maxDamage = combinedDamage
          strongestAttacker1 = target.pokemon
          strongestAttacker2 = target.secondPokemon
        }
      }
    }

    if (!strongestAttacker1 || !strongestAttacker2) return null

    return {
      attacker1: strongestAttacker1,
      attacker2: strongestAttacker2,
      maxDamage
    }
  }
}
