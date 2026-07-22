import { Injectable } from "@angular/core"
import { DamageCalc, DamageResult } from "@multicalc/damage-calc"
import { DefensiveEvOptimizer, SurvivalThreshold } from "@multicalc/ev-optimizer"
import { Field, Pokemon, Target } from "@multicalc/model"

@Injectable({
  providedIn: "root"
})
export class SimpleCalcService {
  private damageCalc = new DamageCalc()
  private defensiveEvOptimizer = new DefensiveEvOptimizer()

  damageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean, useSpsMode: boolean): DamageResult[] {
    return this.damageCalc.calcDamageAllAttacks(attacker, target, field, rightIsDefender, useSpsMode)
  }

  damage(attacker: Pokemon, target: Pokemon, field: Field, useSpsMode: boolean): DamageResult {
    return this.damageCalc.calcDamage(attacker, target, field, true, useSpsMode)
  }

  optimizeDefensiveEvs(defender: Pokemon, attacker: Pokemon, field: Field, updateNature: boolean, keepOffensiveEvs: boolean, survivalThreshold: SurvivalThreshold, rollIndex: number, rightIsDefender = true) {
    return this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, updateNature, keepOffensiveEvs, survivalThreshold, rollIndex, rightIsDefender)
  }
}
