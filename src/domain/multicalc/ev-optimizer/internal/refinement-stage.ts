import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { SurvivalChecker } from "./survival-checker"

export class RefinementStage {
  constructor(
    private survivalChecker: SurvivalChecker = new SurvivalChecker(),
    private damageCalc: DamageCalc = new DamageCalc()
  ) {}

  refineForSingleAttacker(
    solution: Stats,
    defender: Pokemon,
    attacker: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null,
    rightIsDefender = true
  ): Stats | null {
    const koChanceText = this.damageCalc.koChanceForOneAttacker(attacker, defender, field, rightIsDefender)
    const shouldRefine = this.needsRefinement(koChanceText)

    if (!shouldRefine) {
      return solution
    }

    const tempDefender = defender.clone({ evs: solution })

    return this.reduceEvs(solution, tempDefender, field, threshold, attacker, null, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
  }

  refineForDoubleAttackers(
    solution: Stats,
    defender: Pokemon,
    attacker1: Pokemon,
    attacker2: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null,
    rightIsDefender = true
  ): Stats | null {
    const koChanceText = this.damageCalc.koChanceForTwoAttackers(attacker1, attacker2, defender, field, rightIsDefender)
    const shouldRefine = this.needsRefinement(koChanceText)

    if (!shouldRefine) {
      return solution
    }

    const tempDefender = defender.clone({ evs: solution })
    const survives = this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)

    if (survives) {
      return this.reduceEvs(solution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)
    }

    return null
  }

  private needsRefinement(koChanceText: string): boolean {
    const hasResidualDamage = /after .+ damage/i.test(koChanceText)
    const hasResidualRecovery = /after .+ recovery/i.test(koChanceText)

    return hasResidualDamage || hasResidualRecovery
  }

  private reduceEvs(
    solution: Stats,
    tempDefender: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    attacker1: Pokemon,
    attacker2: Pokemon | null,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null,
    rightIsDefender = true
  ): Stats {
    let currentSolution = { ...solution }
    let improved = true

    while (improved) {
      improved = false

      if (currentSolution.hp >= 4) {
        const testSolution = { ...currentSolution, hp: currentSolution.hp - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }

      if (currentSolution.def >= 4) {
        const testSolution = { ...currentSolution, def: currentSolution.def - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }

      if (currentSolution.spd >= 4) {
        const testSolution = { ...currentSolution, spd: currentSolution.spd - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest, rightIsDefender)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }
    }

    return currentSolution
  }

  private checkSurvival(
    tempDefender: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    attacker1: Pokemon,
    attacker2: Pokemon | null,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null,
    rightIsDefender = true
  ): boolean {
    let survives: boolean
    if (attacker2) {
      survives = this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex, rightIsDefender)
    } else {
      survives = this.survivalChecker.checkSurvival(attacker1, tempDefender, field, threshold, rollIndex, rightIsDefender)
    }

    if (!survives) {
      return false
    }

    if (physicalStrongest) {
      if (!this.survivalChecker.checkSurvival(physicalStrongest, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return false
      }
    }

    if (specialStrongest) {
      if (!this.survivalChecker.checkSurvival(specialStrongest, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return false
      }
    }

    return true
  }
}
