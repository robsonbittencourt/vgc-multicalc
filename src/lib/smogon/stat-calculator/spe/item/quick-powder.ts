import { Pokemon } from "@lib/model/pokemon"
import { SpeedItemStrategy } from "./speed-item-strategy"

export class QuickPowder implements SpeedItemStrategy {
  shouldApply(pokemon: Pokemon): boolean {
    return pokemon.item == "Quick Powder" && pokemon.name === "Ditto"
  }

  getModifier(): number {
    return 8192
  }
}
