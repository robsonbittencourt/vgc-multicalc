import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SandRush implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Sand Rush") && field.weather == "Sand"
  }

  getModifier(): number {
    return 8192
  }
}
