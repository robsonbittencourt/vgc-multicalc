import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class LightBall implements OffensiveItemStrategy {
  shouldApply(_isAttack: boolean, pokemon: Pokemon): boolean {
    return pokemon.hasItem("Light Ball") && pokemon.name.includes("Pikachu")
  }

  getModifier(): number {
    return 8192
  }
}
