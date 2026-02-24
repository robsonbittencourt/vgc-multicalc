import { MAX_SINGLE_STAT_EVS } from "./ev-optimizer-constants"
import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Category } from "@lib/types"
import { SurvivalChecker } from "./survival-checker"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"

export type AttackerPriorityResult = {
  prioritizePhysical: boolean
  physicalStrongestAttacker: Pokemon | null
  specialStrongestAttacker: Pokemon | null
  natureUsed: string | null
}

type SurvivalAnalysis = {
  survivingCount: number
  strongestAttacker: Pokemon | null
  maxDamage: number
}

type NatureScenario = {
  nature: string | null
  physicalSurviving: number
  specialSurviving: number
  physicalStrongest: Pokemon | null
  specialStrongest: Pokemon | null
  physicalMaxDamage: number
  specialMaxDamage: number
  totalSurviving: number
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

  determinePriority(physicalAttackers: Pokemon[], specialAttackers: Pokemon[], defender: Pokemon, field: Field, updateNature = false): AttackerPriorityResult {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    const defenderWithMaxPhysical = defender.clone({ evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
    const defenderWithMaxSpecial = defender.clone({ evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

    const physicalAnalysis = this.analyzeSurvival(physicalAttackers, defenderWithNoEv, defenderWithMaxPhysical, field, true)
    const specialAnalysis = this.analyzeSurvival(specialAttackers, defenderWithNoEv, defenderWithMaxSpecial, field, true)

    let bestScenario: NatureScenario = {
      nature: null,
      physicalSurviving: physicalAnalysis.survivingCount,
      specialSurviving: specialAnalysis.survivingCount,
      physicalStrongest: physicalAnalysis.strongestAttacker,
      specialStrongest: specialAnalysis.strongestAttacker,
      physicalMaxDamage: physicalAnalysis.maxDamage,
      specialMaxDamage: specialAnalysis.maxDamage,
      totalSurviving: physicalAnalysis.survivingCount + specialAnalysis.survivingCount
    }

    if (updateNature) {
      const { defNature, spdNature } = this.getDefensiveNatures(defender)

      const defenderDefMaxPhysical = defender.clone({ nature: defNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
      const defenderDefMaxSpecial = defender.clone({ nature: defNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

      const defNaturePhysicalAnalysis = this.analyzeSurvival(physicalAttackers, null, defenderDefMaxPhysical, field, false)
      const defNatureSpecialAnalysis = this.analyzeSurvival(specialAttackers, null, defenderDefMaxSpecial, field, false)

      const defScenario: NatureScenario = {
        nature: defNature,
        physicalSurviving: defNaturePhysicalAnalysis.survivingCount,
        specialSurviving: defNatureSpecialAnalysis.survivingCount,
        physicalStrongest: defNaturePhysicalAnalysis.strongestAttacker,
        specialStrongest: defNatureSpecialAnalysis.strongestAttacker,
        physicalMaxDamage: defNaturePhysicalAnalysis.maxDamage,
        specialMaxDamage: defNatureSpecialAnalysis.maxDamage,
        totalSurviving: defNaturePhysicalAnalysis.survivingCount + defNatureSpecialAnalysis.survivingCount
      }

      const defenderSpdMaxPhysical = defender.clone({ nature: spdNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: MAX_SINGLE_STAT_EVS, spd: 0 } })
      const defenderSpdMaxSpecial = defender.clone({ nature: spdNature, evs: { hp: MAX_SINGLE_STAT_EVS, def: 0, spd: MAX_SINGLE_STAT_EVS } })

      const spdNaturePhysicalAnalysis = this.analyzeSurvival(physicalAttackers, null, defenderSpdMaxPhysical, field, false)
      const spdNatureSpecialAnalysis = this.analyzeSurvival(specialAttackers, null, defenderSpdMaxSpecial, field, false)

      const spdScenario: NatureScenario = {
        nature: spdNature,
        physicalSurviving: spdNaturePhysicalAnalysis.survivingCount,
        specialSurviving: spdNatureSpecialAnalysis.survivingCount,
        physicalStrongest: spdNaturePhysicalAnalysis.strongestAttacker,
        specialStrongest: spdNatureSpecialAnalysis.strongestAttacker,
        physicalMaxDamage: spdNaturePhysicalAnalysis.maxDamage,
        specialMaxDamage: spdNatureSpecialAnalysis.maxDamage,
        totalSurviving: spdNaturePhysicalAnalysis.survivingCount + spdNatureSpecialAnalysis.survivingCount
      }

      bestScenario = this.selectBestScenario(bestScenario, defScenario, spdScenario, physicalAttackers.length, specialAttackers.length, defender.nature)
    }

    return {
      prioritizePhysical: bestScenario.physicalSurviving >= bestScenario.specialSurviving,
      physicalStrongestAttacker: bestScenario.physicalStrongest,
      specialStrongestAttacker: bestScenario.specialStrongest,
      natureUsed: bestScenario.nature
    }
  }

  private analyzeSurvival(attackers: Pokemon[], defenderMin: Pokemon | null, defenderMax: Pokemon, field: Field, checkMin: boolean): SurvivalAnalysis {
    let survivingCount = 0
    let strongestAttacker: Pokemon | null = null
    let maxDamage = 0

    for (const attacker of attackers) {
      let survives = false

      if (checkMin && defenderMin) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderMin, field, 2)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderMax, field, 2)
        survives = !survivesWithMin && survivesWithMax
      } else {
        survives = this.survivalChecker.checkSurvival(attacker, defenderMax, field, 2)
      }

      if (survives) {
        survivingCount++
      }

      const damage = this.damageCalculator.calculateResult(attacker, defenderMax, attacker.move, field, true).maxDamageWithRemainingUntilTurn(1)

      if (damage < defenderMax.hp && damage > maxDamage) {
        maxDamage = damage
        strongestAttacker = attacker
      }
    }

    return { survivingCount, strongestAttacker, maxDamage }
  }

  private selectBestScenario(current: NatureScenario, def: NatureScenario, spd: NatureScenario, physicalCount: number, specialCount: number, currentNature: string): NatureScenario {
    const maxSurviving = Math.max(current.totalSurviving, def.totalSurviving, spd.totalSurviving)

    if (maxSurviving === 0) {
      return { ...current, nature: currentNature }
    }

    if (def.totalSurviving === maxSurviving && spd.totalSurviving === maxSurviving) {
      const defMaxDamage = Math.max(def.physicalMaxDamage, def.specialMaxDamage)
      const spdMaxDamage = Math.max(spd.physicalMaxDamage, spd.specialMaxDamage)

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

        return spd.specialSurviving > def.physicalSurviving ? spd : def
      }
    } else if (def.totalSurviving === maxSurviving && def.totalSurviving >= current.totalSurviving) {
      return def
    } else if (spd.totalSurviving === maxSurviving && spd.totalSurviving >= current.totalSurviving) {
      return spd
    }

    return current
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

  findSecondStrongestAttacker(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean): Pokemon | null {
    if (!strongestAttacker || attackers.length <= 1) {
      return null
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    let secondStrongestAttacker: Pokemon | null = null
    let secondMaxDamage = 0

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.damageCalculator.calculateResult(attacker, defenderWithMax, attacker.move, field, true).maxDamageWithRemainingUntilTurn(1)

      if (damage < defenderWithMax.hp && damage > secondMaxDamage) {
        secondMaxDamage = damage
        secondStrongestAttacker = attacker
      }
    }

    return secondStrongestAttacker
  }

  findAllAttackersOrderedByStrength(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean): Pokemon[] {
    if (!strongestAttacker || attackers.length <= 1) {
      return []
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    const attackersWithDamage: { attacker: Pokemon; damage: number }[] = []

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.damageCalculator.calculateResult(attacker, defenderWithMax, attacker.move, field, true).maxDamageWithRemainingUntilTurn(1)

      if (damage < defenderWithMax.hp) {
        attackersWithDamage.push({ attacker, damage })
      }
    }

    attackersWithDamage.sort((a, b) => b.damage - a.damage)

    return attackersWithDamage.map(item => item.attacker)
  }

  findStrongestDoubleTarget(defender: Pokemon, targets: Target[], field: Field): { attacker1: Pokemon; attacker2: Pokemon; maxDamage: number } | null {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    let strongestAttacker1: Pokemon | null = null
    let strongestAttacker2: Pokemon | null = null
    let maxDamage = 0

    for (const target of targets) {
      if (target.pokemon.isDefault) continue

      if (target.secondPokemon && !target.secondPokemon.isDefault) {
        const multiResult = this.damageCalculator.calcDamageValueForTwoAttackers(target.pokemon, target.secondPokemon, defenderWithNoEv, field)
        const combinedDamage = multiResult.maxDamageWithRemainingUntilTurn(1)

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
