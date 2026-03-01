import { inject, Injectable } from "@angular/core"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Field, FieldSide } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"

@Injectable({
  providedIn: "root"
})
export class SurvivalChecker {
  private damageCalculator = inject(DamageCalculatorService)

  checkSurvival(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const result = this.damageCalculator.calculateResult(attacker, defender, attacker.move, field, rightIsDefender)

    const damage = result.damageWithRemainingUntilTurn(threshold - 1, rollIndex)

    return damage < defender.hp
  }

  checkSurvivalAgainstTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const multiResult = this.damageCalculator.calcDamageValueForTwoAttackers(attacker1, attacker2, defender, field, rightIsDefender)
    const combinedDamage = multiResult.damageWithRemainingUntilTurn(threshold - 1, rollIndex)

    return combinedDamage < defender.hp
  }

  checkSurvivalWithEvs(attacker: Pokemon, defender: Pokemon, evs: Partial<Stats>, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const testDefender = defender.clone({ evs })
    return this.checkSurvival(attacker, testDefender, field, threshold, rollIndex, rightIsDefender)
  }

  checkSurvivalAgainstTwoAttackersWithEvs(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, evs: Partial<Stats>, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const testDefender = defender.clone({ evs })
    return this.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, testDefender, field, threshold, rollIndex, rightIsDefender)
  }
}
