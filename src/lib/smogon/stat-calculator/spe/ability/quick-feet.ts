import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class QuickFeet implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, _field: Field): boolean {
    return pokemon.hasAbility("Quick Feet") && pokemon.status != Status.HEALTHY
  }

  getModifier(): number {
    return 6144
  }
}
