import { Field, hasRainWeather } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SwiftSwim implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Swift Swim") && hasRainWeather(field)
  }

  getModifier(): number {
    return 8192
  }
}
