import { inject, Injectable } from "@angular/core"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"
import { SurvivalChecker } from "./survival-checker"

@Injectable({
  providedIn: "root"
})
export class RefinementStage {
  private damageCalculator = inject(DamageCalculatorService)
  private survivalChecker = inject(SurvivalChecker)

  refineForSingleAttacker(solution: Stats, defender: Pokemon, attacker: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15): Stats | null {
    const koChanceText = this.damageCalculator.koChanceForOneAttacker(attacker, defender, field)
    const shouldRefine = this.needsRefinement(koChanceText, threshold)

    if (!shouldRefine) {
      return solution
    }

    const tempDefender = defender.clone({ evs: solution })
    const survives = this.survivalChecker.checkSurvival(attacker, tempDefender, field, threshold, rollIndex)

    if (survives) {
      const reducedSolution = this.reduceEvs(solution, tempDefender, field, threshold, attacker, null, rollIndex)
      return this.prioritizeHp(reducedSolution, tempDefender, field, threshold, attacker, null, rollIndex)
    }

    if (!survives && /after .+ damage/i.test(koChanceText)) {
      const increasedSolution = this.increaseEvs(solution, tempDefender, field, threshold, attacker, null, rollIndex)

      if (increasedSolution) {
        const reducedSolution = this.reduceEvs(increasedSolution, tempDefender, field, threshold, attacker, null, rollIndex)
        return this.prioritizeHp(reducedSolution, tempDefender, field, threshold, attacker, null, rollIndex)
      }

      return null
    }

    return this.prioritizeHp(solution, tempDefender, field, threshold, attacker, null, rollIndex)
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
    specialStrongest: Pokemon | null = null
  ): Stats | null {
    const koChanceText = this.damageCalculator.koChanceForTwoAttackers(attacker1, attacker2, defender, field)
    const shouldRefine = this.needsRefinement(koChanceText, threshold)

    if (!shouldRefine) {
      return solution
    }

    const tempDefender = defender.clone({ evs: solution })
    const survives = this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)

    if (survives) {
      const reducedSolution = this.reduceEvs(solution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
      return this.prioritizeHp(reducedSolution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
    }

    if (!survives && /after .+ damage/i.test(koChanceText)) {
      const increasedSolution = this.increaseEvs(solution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)

      if (increasedSolution) {
        const reducedSolution = this.reduceEvs(increasedSolution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
        return this.prioritizeHp(reducedSolution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
      }

      return null
    }

    if (!survives) {
      return null
    }

    return this.prioritizeHp(solution, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
  }

  private needsRefinement(koChanceText: string, threshold: SurvivalThreshold): boolean {
    const hasResidualDamage = /after .+ damage/i.test(koChanceText)
    const hasResidualRecovery = /after .+ recovery/i.test(koChanceText)

    if ((threshold as number) === 1) {
      return hasResidualDamage
    }

    return hasResidualDamage || hasResidualRecovery
  }

  private increaseEvs(
    solution: Stats,
    tempDefender: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    attacker1: Pokemon,
    attacker2: Pokemon | null,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null
  ): Stats | null {
    const currentSolution = { ...solution }
    const needDef = attacker1.move.category === "Physical" || attacker2?.move.category === "Physical" || physicalStrongest !== null
    const needSpd = attacker1.move.category === "Special" || attacker2?.move.category === "Special" || specialStrongest !== null

    let step = 0

    while (true) {
      let increased = false
      let attempts = 0

      while (attempts < 3 && !increased) {
        if (step === 0) {
          if (currentSolution.hp + 4 <= 252) {
            const testSolution = { ...currentSolution, hp: currentSolution.hp + 4 }
            tempDefender.setEvs(testSolution)
            if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
              return testSolution
            }

            currentSolution.hp += 4
            increased = true
          }
        } else if (step === 1) {
          if (needDef && currentSolution.def + 4 <= 252) {
            const testSolution = { ...currentSolution, def: currentSolution.def + 4 }
            tempDefender.setEvs(testSolution)
            if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
              return testSolution
            }

            currentSolution.def += 4
            increased = true
          }
        } else if (step === 2) {
          if (needSpd && currentSolution.spd + 4 <= 252) {
            const testSolution = { ...currentSolution, spd: currentSolution.spd + 4 }
            tempDefender.setEvs(testSolution)
            if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
              return testSolution
            }

            currentSolution.spd += 4
            increased = true
          }
        }

        step = (step + 1) % 3
        attempts++
      }

      if (!increased) {
        break
      }
    }

    return null
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
    specialStrongest: Pokemon | null = null
  ): Stats {
    let currentSolution = { ...solution }
    let improved = true

    while (improved) {
      improved = false

      if (currentSolution.hp >= 4) {
        const testSolution = { ...currentSolution, hp: currentSolution.hp - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }

      if (currentSolution.def >= 4) {
        const testSolution = { ...currentSolution, def: currentSolution.def - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }

      if (currentSolution.spd >= 4) {
        const testSolution = { ...currentSolution, spd: currentSolution.spd - 4 }
        tempDefender.setEvs(testSolution)
        if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
          currentSolution = testSolution
          improved = true
          continue
        }
      }
    }

    return currentSolution
  }

  private prioritizeHp(
    solution: Stats,
    tempDefender: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    attacker1: Pokemon,
    attacker2: Pokemon | null,
    rollIndex = 15,
    physicalStrongest: Pokemon | null = null,
    specialStrongest: Pokemon | null = null
  ): Stats {
    const isPhysical1 = attacker1.move.category === "Physical"
    const isSpecial1 = attacker1.move.category === "Special"

    let isPhysical2 = false
    let isSpecial2 = false

    if (attacker2) {
      isPhysical2 = attacker2.move.category === "Physical"
      isSpecial2 = attacker2.move.category === "Special"
    } else {
      if (isPhysical1) isPhysical2 = true
      if (isSpecial1) isSpecial2 = true
    }

    const allPhysical = isPhysical1 && isPhysical2 && !specialStrongest
    const allSpecial = isSpecial1 && isSpecial2 && !physicalStrongest

    if (!allPhysical && !allSpecial) {
      return solution
    }

    const defensiveStat = allPhysical ? "def" : "spd"
    const totalEvs = solution.hp + solution[defensiveStat]

    let candidateHp = 252
    if (totalEvs - candidateHp < 4) {
      candidateHp = totalEvs - 4
    }

    for (let hp = candidateHp; hp >= solution.hp; hp -= 4) {
      const statValue = totalEvs - hp

      if (statValue > 252) continue
      if (statValue < 4) continue

      const candidateEvs = { ...solution, hp: hp, [defensiveStat]: statValue }
      tempDefender.setEvs(candidateEvs)

      if (this.checkSurvival(tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)) {
        return this.reduceEvs(candidateEvs, tempDefender, field, threshold, attacker1, attacker2, rollIndex, physicalStrongest, specialStrongest)
      }
    }

    return solution
  }

  private checkSurvival(tempDefender: Pokemon, field: Field, threshold: SurvivalThreshold, attacker1: Pokemon, attacker2: Pokemon | null, rollIndex = 15, physicalStrongest: Pokemon | null = null, specialStrongest: Pokemon | null = null): boolean {
    let survives = false
    if (attacker2) {
      survives = this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex)
    } else {
      survives = this.survivalChecker.checkSurvival(attacker1, tempDefender, field, threshold, rollIndex)
    }

    if (!survives) {
      return false
    }

    if (physicalStrongest) {
      if (!this.survivalChecker.checkSurvival(physicalStrongest, tempDefender, field, threshold, rollIndex)) {
        return false
      }
    }

    if (specialStrongest) {
      if (!this.survivalChecker.checkSurvival(specialStrongest, tempDefender, field, threshold, rollIndex)) {
        return false
      }
    }

    return true
  }
}
