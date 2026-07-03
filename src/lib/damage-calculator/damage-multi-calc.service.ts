import { inject } from "@angular/core"
import { CalculatorStore } from "@store/calculator-store"
import { MenuStore } from "@store/menu-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { MovePosition } from "@lib/types"

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
    const bestMove = this.menuStore.oneVsManyBestMoveActivated()

    if (secondAttacker && attacker != secondAttacker) {
      const firstAttacker = bestMove ? this.withBestMove(attacker, target.pokemon, field) : attacker
      const secondAttackerWithMove = bestMove ? this.withBestMove(secondAttacker, target.pokemon, field) : secondAttacker

      return this.damageCalculator.calcDamageForTwoAttackers(firstAttacker, secondAttackerWithMove, target.pokemon, field, true)
    } else {
      const finalAttacker = bestMove ? this.withBestMove(attacker, target.pokemon, field) : attacker

      return this.damageCalculator.calcDamage(finalAttacker, target.pokemon, field, true)
    }
  }

  private withBestMove(attacker: Pokemon, target: Pokemon, field: Field): Pokemon {
    const bestIndex = this.bestMoveIndex(attacker, target, field)

    return attacker.clone({ id: attacker.id, moveSet: attacker.moveSet.cloneActivating((bestIndex + 1) as MovePosition) })
  }

  activateBestMoveForTarget(target: Pokemon, attacker: Pokemon, field: Field) {
    const bestIndex = this.bestMoveIndex(target, attacker, field)
    this.store.activateMove(target.id, bestIndex)
  }

  private bestMoveIndex(attacker: Pokemon, defender: Pokemon, field: Field): number {
    const allResults = this.damageCalculator.calcDamageAllAttacks(attacker, defender, field, true)

    return allResults.reduce((bestIdx: number, current: DamageResult, idx: number, arr: DamageResult[]) => (current.damage > arr[bestIdx].damage ? idx : bestIdx), 0)
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, field: Field): DamageResult {
    if (target.secondPokemon) {
      return this.damageCalculator.calcDamageForTwoAttackers(target.pokemon, target.secondPokemon, activeTeamMember, field, true)
    } else {
      return this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field, true)
    }
  }
}
