import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"

export class SurvivalChecker {
  private damageCalc = new DamageCalc()

  checkSurvival(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const result = this.damageCalc.calculateResult(attacker, defender, attacker.move, field, rightIsDefender)

    const damage = result.damageWithRemainingUntilTurn(threshold - 1, rollIndex)

    return damage < defender.hp
  }

  checkSurvivalAgainstTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    const multiResult = this.damageCalc.calcDamageValueForTwoAttackers(attacker1, attacker2, defender, field, rightIsDefender)
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
