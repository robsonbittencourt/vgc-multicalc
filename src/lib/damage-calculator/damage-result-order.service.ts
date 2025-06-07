import { inject } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"

export class DamageResultOrderService {
  private store = inject(CalculatorStore)
  private menuStore = inject(MenuStore)

  targetsWithSpecificCalc: number
  actualOrder: string[]

  constructor() {
    this.targetsWithSpecificCalc = this.countTargetsWithSpecificCalc()
    this.actualOrder = []
  }

  order(results: DamageResult[]): DamageResult[] {
    const actualTargetWithSpecificCalc = this.countTargetsWithSpecificCalc()

    if (actualTargetWithSpecificCalc != this.targetsWithSpecificCalc) {
      this.applyActualOrder(results)
      this.targetsWithSpecificCalc = actualTargetWithSpecificCalc
    } else {
      this.applyOrderByDamage(results)
    }

    this.actualOrder = results.map(result => this.pokemonIdToOrder(result))

    return results
  }

  private countTargetsWithSpecificCalc(): number {
    const withTera = this.store.targets().filter(t => t.pokemon.teraTypeActive).length
    const withCommander = this.store.targets().filter(t => t.pokemon.commanderActive).length

    return withTera + withCommander
  }

  private applyActualOrder(results: DamageResult[]) {
    results.sort((a, b) => {
      const indexA = this.actualOrder.indexOf(this.pokemonIdToOrder(a))
      const indexB = this.actualOrder.indexOf(this.pokemonIdToOrder(b))
      return indexA - indexB
    })
  }

  private applyOrderByDamage(results: DamageResult[]) {
    results.sort((a, b) => {
      if (this.menuStore.oneVsManyActivated()) {
        if (a.defender.isDefault && !b.defender.isDefault) return 1
        if (!a.defender.isDefault && b.defender.isDefault) return -1
      }

      if (this.menuStore.manyVsOneActivated()) {
        if (a.attacker.isDefault && !b.attacker.isDefault) return 1
        if (!a.attacker.isDefault && b.attacker.isDefault) return -1
      }

      return b.damage - a.damage
    })
  }

  private pokemonIdToOrder(result: DamageResult): string {
    return this.menuStore.oneVsManyActivated() ? result.defender.id : result.attacker.id
  }
}
