import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SandRush implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Sand Rush") && field.weather == "Sand"
  }

  getModifier(): number {
    return 8192
  }
}
