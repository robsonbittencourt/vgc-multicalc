import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class ChoiceBand implements OffensiveItemStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon): boolean {
    return isAttack && pokemon.hasItem("Choice Band")
  }

  getModifier(): number {
    return 6144
  }
}
