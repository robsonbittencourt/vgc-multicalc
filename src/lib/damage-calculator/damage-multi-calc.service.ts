import { inject } from "@angular/core"
import { MenuStore } from "@data/store/menu-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"

export class DamageMultiCalcService {
  private menuStore = inject(MenuStore)
  private damageCalculator = inject(DamageCalculatorService)
  private damageOrder = inject(DamageResultOrderService)

  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, order: boolean, secondAttacker?: Pokemon): DamageResult[] {
    const results = targets.flatMap(target => {
      if (this.menuStore.oneVsManyActivated()) {
        return this.calculateDamageOneVsMany(attacker, target, field, secondAttacker)
      } else {
        return this.calculateDamageManyVsOne(attacker, target, field)
      }
    })

    return order ? this.damageOrder.order(results) : results
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, secondAttacker?: Pokemon): DamageResult {
    if (secondAttacker && attacker != secondAttacker) {
      return this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)
    } else {
      return this.damageCalculator.calcDamage(attacker, target.pokemon, field)
    }
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, field: Field): DamageResult {
    if (target.secondPokemon) {
      return this.damageCalculator.calcDamageForTwoAttackers(target.pokemon, target.secondPokemon, activeTeamMember, field)
    } else {
      return this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field)
    }
  }
}
