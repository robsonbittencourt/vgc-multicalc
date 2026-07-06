import { Injectable } from "@angular/core"
import { DamageResult, MultiCalcMode } from "@multicalc/damage-calc"

@Injectable()
export class DamageResultOrderService {
  private targetsWithSpecificCalc = 0
  private actualOrder: string[] = []

  initialize(targetsWithSpecificCalc: number) {
    this.targetsWithSpecificCalc = targetsWithSpecificCalc
    this.actualOrder = []
  }

  order(results: DamageResult[], targetsWithSpecificCalc: number, mode: MultiCalcMode): DamageResult[] {
    if (targetsWithSpecificCalc != this.targetsWithSpecificCalc) {
      this.applyActualOrder(results, mode)
      this.targetsWithSpecificCalc = targetsWithSpecificCalc
    } else {
      this.applyOrderByDamage(results)
    }

    this.actualOrder = results.map(result => this.pokemonIdToOrder(result, mode))

    return results
  }

  private applyActualOrder(results: DamageResult[], mode: MultiCalcMode) {
    results.sort((a, b) => {
      const indexA = this.actualOrder.indexOf(this.pokemonIdToOrder(a, mode))
      const indexB = this.actualOrder.indexOf(this.pokemonIdToOrder(b, mode))
      return indexA - indexB
    })
  }

  private applyOrderByDamage(results: DamageResult[]) {
    results.sort((a, b) => b.damage - a.damage)
  }

  private pokemonIdToOrder(result: DamageResult, mode: MultiCalcMode): string {
    return mode.oneVsManyActivated ? result.defender.id : result.attacker.id
  }
}
