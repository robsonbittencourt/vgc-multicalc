import { inject } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
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
  private store = inject(CalculatorStore)

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
      return this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field, true)
    } else {
      return this.damageCalculator.calcDamage(attacker, target.pokemon, field, true)
    }
  }

  activateBestMoveForTarget(target: Pokemon, attacker: Pokemon, field: Field) {
    const allResults = this.damageCalculator.calcDamageAllAttacks(target, attacker, field, true)
    const bestIndex = allResults.reduce((bestIdx: number, current: DamageResult, idx: number, arr: DamageResult[]) => (current.damage > arr[bestIdx].damage ? idx : bestIdx), 0)
    this.store.activateMove(target.id, bestIndex)
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, field: Field): DamageResult {
    if (target.secondPokemon) {
      return this.damageCalculator.calcDamageForTwoAttackers(target.pokemon, target.secondPokemon, activeTeamMember, field, true)
    } else {
      return this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field, true)
    }
  }
}
