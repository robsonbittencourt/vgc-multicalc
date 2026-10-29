import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { SurvivalThreshold } from "@multicalc/sp-optimizer/internal/sp-optimizer-types"
import { SurvivalMemo } from "@multicalc/sp-optimizer/internal/survival-memo"
import { Threat } from "@multicalc/sp-optimizer/internal/threat"

export class SurvivalChecker {
  private successChance = 1

  constructor(private damageCalc: DamageCalc) {}

  requireSuccessChance(successChance: number): void {
    this.successChance = successChance
  }

  checkSurvival(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex: number, rightIsDefender: boolean): boolean {
    const threat = new Threat(this.damageCalc, attacker, null, new SurvivalMemo())

    return threat.survivedBy(defender, { field, threshold, rollIndex, rightIsDefender, successChance: this.successChance })
  }

  checkSurvivalAgainstTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex: number, rightIsDefender: boolean): boolean {
    const threat = new Threat(this.damageCalc, attacker1, attacker2, new SurvivalMemo())

    return threat.survivedBy(defender, { field, threshold, rollIndex, rightIsDefender, successChance: this.successChance })
  }
}
