import { inject, Injectable } from "@angular/core"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"

@Injectable({
  providedIn: "root"
})
export class SurvivalChecker {
  private damageCalculator = inject(DamageCalculatorService)

  calculateMaxDamage(attacker: Pokemon, defender: Pokemon, field: Field): number {
    return this.damageCalculator.calcDamageValue(attacker, defender, field)
  }

  checkSurvival(attacker: Pokemon, defender: Pokemon, field: Field): boolean {
    const maxDamage = this.calculateMaxDamage(attacker, defender, field)
    return maxDamage < defender.hp
  }

  calculateMaxCombinedDamage(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): number {
    return this.damageCalculator.calcDamageValueForTwoAttackers(attacker1, attacker2, defender, field)
  }

  checkSurvivalAgainstTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): boolean {
    const maxCombinedDamage = this.calculateMaxCombinedDamage(attacker1, attacker2, defender, field)
    return maxCombinedDamage < defender.hp
  }
}
