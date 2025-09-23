import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class ChoiceSpecs implements OffensiveItemStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon): boolean {
    return !isAttack && pokemon.hasItem("Choice Specs")
  }

  getModifier(): number {
    return 6144
  }
}
