import { Injectable } from "@angular/core"
import { DamageCalc, DamageResult } from "@multicalc/damage-calc"
import { DefensiveSpOptimizer, KoThreshold, OffensiveSpOptimizer, SurvivalThreshold } from "@multicalc/sp-optimizer"
import { Field, Pokemon, Target } from "@multicalc/model"

@Injectable({
  providedIn: "root"
})
export class SimpleCalcService {
  private damageCalc = new DamageCalc()
  private defensiveSpOptimizer = new DefensiveSpOptimizer()
  private offensiveSpOptimizer = new OffensiveSpOptimizer()

  damageAllAttacks(attacker: Pokemon, target: Pokemon, field: Field, rightIsDefender: boolean, useSpsMode: boolean): DamageResult[] {
    return this.damageCalc.calcDamageAllAttacks(attacker, target, field, rightIsDefender, useSpsMode)
  }

  damage(attacker: Pokemon, target: Pokemon, field: Field, useSpsMode: boolean, rightIsDefender = true): DamageResult {
    return this.damageCalc.calcDamage(attacker, target, field, rightIsDefender, useSpsMode)
  }

  optimizeDefensiveSps(defender: Pokemon, attacker: Pokemon, field: Field, updateNature: boolean, keepOffensiveSps: boolean, survivalThreshold: SurvivalThreshold, rollIndex: number, rightIsDefender = true) {
    return this.defensiveSpOptimizer.optimize(defender, [new Target(attacker)], field, updateNature, keepOffensiveSps, survivalThreshold, rollIndex, rightIsDefender)
  }

  optimizeOffensiveSps(attacker: Pokemon, defender: Pokemon, field: Field, koThreshold: KoThreshold, rollIndex: number, rightIsDefender = true, keepOtherSps = false, updateNature = false) {
    return this.offensiveSpOptimizer.optimize(attacker, [new Target(defender)], field, koThreshold, { rollIndex, rightIsDefender, keepOtherSps, updateNature })
  }
}
