import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SlushRush implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Slush Rush") && field.weather == "Snow"
  }

  getModifier(): number {
    return 8192
  }
}
