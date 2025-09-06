import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class FurCoat implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Fur Coat") && isDefense
  }

  getModifier(): number {
    return 8192
  }
}
