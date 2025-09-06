import { Pokemon } from "@lib/model/pokemon"
import { DefensiveItemStrategy } from "./defensive-item-strategy"

export class AssaultVest implements DefensiveItemStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon): boolean {
    return !isDefense && pokemon.hasItem("Assault Vest")
  }

  getModifier(): number {
    return 6144
  }
}
