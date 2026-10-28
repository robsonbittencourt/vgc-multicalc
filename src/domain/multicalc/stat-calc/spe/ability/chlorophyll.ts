import { Field, hasSunWeather } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class Chlorophyll implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Chlorophyll") && hasSunWeather(field)
  }

  getModifier(): number {
    return 8192
  }
}
