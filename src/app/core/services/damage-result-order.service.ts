import { Injectable, signal } from "@angular/core"
import { DamageResult } from "@multicalc/damage-calculator"
import { MultiCalcMode } from "@multicalc/types"

@Injectable()
export class DamageResultOrderService {
  private targetsWithSpecificCalc = signal(0)
  private actualOrder = signal<string[]>([])

  initialize(targetsWithSpecificCalc: number) {
    this.targetsWithSpecificCalc.set(targetsWithSpecificCalc)
    this.actualOrder.set([])
  }

  order(results: DamageResult[], targetsWithSpecificCalc: number, mode: MultiCalcMode): DamageResult[] {
    if (targetsWithSpecificCalc != this.targetsWithSpecificCalc()) {
      this.applyActualOrder(results, mode)
      this.targetsWithSpecificCalc.set(targetsWithSpecificCalc)
    } else {
      this.applyOrderByDamage(results, mode)
    }

    this.actualOrder.set(results.map(result => this.pokemonIdToOrder(result, mode)))

    return results
  }

  private applyActualOrder(results: DamageResult[], mode: MultiCalcMode) {
    results.sort((a, b) => {
      const indexA = this.actualOrder().indexOf(this.pokemonIdToOrder(a, mode))
      const indexB = this.actualOrder().indexOf(this.pokemonIdToOrder(b, mode))
      return indexA - indexB
    })
  }

  private applyOrderByDamage(results: DamageResult[], mode: MultiCalcMode) {
    results.sort((a, b) => {
      if (mode.oneVsManyActivated) {
        if (a.defender.isDefault && !b.defender.isDefault) return 1
        if (!a.defender.isDefault && b.defender.isDefault) return -1
      }

      if (mode.manyVsOneActivated) {
        if (a.attacker.isDefault && !b.attacker.isDefault) return 1
        if (!a.attacker.isDefault && b.attacker.isDefault) return -1
      }

      return b.damage - a.damage
    })
  }

  private pokemonIdToOrder(result: DamageResult, mode: MultiCalcMode): string {
    return mode.oneVsManyActivated ? result.defender.id : result.attacker.id
  }
}
