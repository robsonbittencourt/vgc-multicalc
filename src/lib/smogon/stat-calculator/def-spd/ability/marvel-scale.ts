import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class MarvelScale implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Marvel Scale") && pokemon.status != Status.HEALTHY && isDefense
  }

  getModifier(): number {
    return 6144
  }
}
