import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SlowStart implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, _field: Field): boolean {
    return pokemon.hasAbility("Slow Start") && pokemon.ability.on
  }

  getModifier(): number {
    return 2048
  }
}
