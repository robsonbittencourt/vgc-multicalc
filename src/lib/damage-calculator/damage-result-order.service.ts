import { inject } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageResult } from "@lib/damage-calculator/damage-result"

export class DamageResultOrderService {
  private store = inject(CalculatorStore)
  private menuStore = inject(MenuStore)

  targetsWithSpecificCalc: number
  targetsIdsActive: string[]
  actualOrder: string[]

  constructor() {
    this.targetsWithSpecificCalc = this.countTargetsWithSpecificCalc()
    this.targetsIdsActive = []
    this.actualOrder = []
  }

  order(results: DamageResult[]): DamageResult[] {
    const actualTargetsActive = this.activeTargetsIds()
    const actualTargetWithSpecificCalc = this.countTargetsWithSpecificCalc()

    if (this.changeHappenedInTargets(actualTargetsActive, actualTargetWithSpecificCalc)) {
      this.applyActualOrder(results)
      this.targetsIdsActive = actualTargetsActive
      this.targetsWithSpecificCalc = actualTargetWithSpecificCalc
    } else {
      this.applyOrderByDamage(results)
    }

    this.actualOrder = results.map(result => this.pokemonIdToOrder(result))

    return results
  }

  private activeTargetsIds(): string[] {
    return this.store
      .targets()
      .filter(target => target.active)
      .map(target => target.pokemon.id)
  }

  private countTargetsWithSpecificCalc(): number {
    const withTera = this.store.targets().filter(t => t.pokemon.teraTypeActive).length
    const withCommander = this.store.targets().filter(t => t.pokemon.commanderActivated).length

    return withTera + withCommander
  }

  private changeHappenedInTargets(activeTargetsIds: string[], targetIdsWithSpecificCalc: number) {
    return activeTargetsIds[0] != this.targetsIdsActive[0] || activeTargetsIds[1] != this.targetsIdsActive[1] || targetIdsWithSpecificCalc != this.targetsWithSpecificCalc
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
      if (this.menuStore.oneVsManyActivated() && !a.defender.isDefault && b.defender.isDefault) return -1
      if (this.menuStore.manyVsOneActivated() && !a.attacker.isDefault && b.attacker.isDefault) return -1

      return b.damage - a.damage
    })
  }

  private pokemonIdToOrder(result: DamageResult): string {
    return this.menuStore.oneVsManyActivated() ? result.defender.id : result.attacker.id
  }
}
