import { inject } from "@angular/core";
import { MenuStore } from "src/data/store/menu-store";
import { Field } from "../field";
import { Pokemon } from "../pokemon";
import { Target } from "../target";
import { DamageCalculatorService } from "./damage-calculator.service";
import { DamageResult } from "./damage-result";
import { DamageResultOrderService } from "./damage-result-order.service";

export class DamageMultiCalcService {

  private menuStore = inject(MenuStore)
  private damageCalculator = inject(DamageCalculatorService)
  private damageOrder = inject(DamageResultOrderService)

  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, secondAttacker?: Pokemon): DamageResult[] {
    const results = targets.flatMap(target => {
      if(this.menuStore.oneVsManyActivated()) {
        return this.calculateDamageOneVsMany(attacker, target, field, secondAttacker)
      } else {
        return this.calculateDamageManyVsOne(attacker, target, targets, field)      
      }
    })

    const withoutDuplicates = this.removeDuplicatedResults(results)
      
    return this.damageOrder.order(withoutDuplicates)
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, secondAttacker?: Pokemon): DamageResult[] {
    if(secondAttacker && attacker != secondAttacker) {
      return this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)
    } else {
      return [this.damageCalculator.calcDamage(attacker, target.pokemon, field)]
    }
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, targets: Target[], field: Field): DamageResult[] {
    const activeTargets = targets.filter(t => t.active)
    
    if(activeTargets.length > 1 && target.active) {
      return this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, field)
    } else {
      return [this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field)]
    }
  }

  private removeDuplicatedResults(results: DamageResult[]) {
    if(this.menuStore.oneVsManyActivated()) {
      return results.filter((result, index) =>
        results.findIndex(other => result.defender.equals(other.defender)) === index
      )
    } else {
      return results.filter((result, index) =>
        results.findIndex(other => result.attacker.equals(other.attacker)) === index
      )
    }
  } 

}