import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Status } from "@multicalc/model/status"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class QuickFeet implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, _field: Field): boolean {
    return pokemon.hasAbility("Quick Feet") && pokemon.status != Status.HEALTHY
  }

  getModifier(): number {
    return 6144
  }
}
