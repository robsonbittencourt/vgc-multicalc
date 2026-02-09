import { inject, Injectable } from "@angular/core"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"

@Injectable({
  providedIn: "root"
})
export class SurvivalChecker {
  private damageCalculator = inject(DamageCalculatorService)

  calculateMaxDamage(attacker: Pokemon, defender: Pokemon, field: Field): number {
    return this.damageCalculator.calcDamageValue(attacker, defender, field)
  }

  checkSurvival(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, hasResidual = false): boolean {
    if (hasResidual) {
      const koChance = this.damageCalculator.koChanceForOneAttacker(attacker, defender, field)
      return this.checkSurvivalByText(koChance, threshold)
    }

    const maxDamage = this.calculateMaxDamage(attacker, defender, field)

    return maxDamage * (threshold - 1) < defender.hp
  }

  calculateMaxCombinedDamage(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): number {
    return this.damageCalculator.calcDamageValueForTwoAttackers(attacker1, attacker2, defender, field)
  }

  checkSurvivalAgainstTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, hasResidual = false): boolean {
    if (hasResidual) {
      const koChance = this.damageCalculator.koChanceForTwoAttackers(attacker1, attacker2, defender, field)
      return this.checkSurvivalByText(koChance, threshold)
    }

    const maxCombinedDamage = this.calculateMaxCombinedDamage(attacker1, attacker2, defender, field)

    return maxCombinedDamage * (threshold - 1) < defender.hp
  }

  checkSurvivalWithEvs(attacker: Pokemon, defender: Pokemon, evs: Partial<Stats>, field: Field, threshold: SurvivalThreshold, hasResidual = false): boolean {
    const testDefender = defender.clone({ evs })
    return this.checkSurvival(attacker, testDefender, field, threshold, hasResidual)
  }

  checkSurvivalAgainstTwoAttackersWithEvs(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, evs: Partial<Stats>, field: Field, threshold: SurvivalThreshold, hasResidual = false): boolean {
    const testDefender = defender.clone({ evs })
    return this.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, testDefender, field, threshold, hasResidual)
  }

  private checkSurvivalByText(text: string, threshold?: SurvivalThreshold): boolean {
    if (text.includes("Does not cause any damage") || text.includes("possibly the worst move ever")) {
      return true
    }

    if (!threshold) {
      return true
    }

    let hits = 999

    if (text.includes("OHKO")) {
      hits = 1
    } else {
      const match = text.match(/(\d+)HKO/)
      if (match) {
        hits = parseInt(match[1], 10)
      }
    }

    return hits >= threshold
  }
}
