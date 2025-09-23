import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class Unburden implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, _field: Field): boolean {
    return pokemon.hasAbility("Unburden") && pokemon.ability.on
  }

  getModifier(): number {
    return 8192
  }
}
