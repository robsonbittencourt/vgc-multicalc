import { inject, Injectable } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"

@Injectable({ providedIn: "root" })
export class SpriteService {
  private store = inject(CalculatorStore)

  path(name: string): string {
    const folder = this.store.isChampions() ? "pokemon-champions" : "pokemon-sv"
    return `assets/sprites/${folder}/${name}.png`
  }
}
