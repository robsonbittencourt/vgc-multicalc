import { Pokemon } from "@lib/model/pokemon"
import { SpeedItemStrategy } from "./speed-item-strategy"

export class ChoiceScarf implements SpeedItemStrategy {
  shouldApply(pokemon: Pokemon): boolean {
    return pokemon.hasItem("Choice Scarf")
  }

  getModifier(): number {
    return 6144
  }
}
