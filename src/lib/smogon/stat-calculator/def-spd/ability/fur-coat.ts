import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class FurCoat implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, _field: Field): boolean {
    return isDefense && pokemon.hasAbility("Fur Coat")
  }

  getModifier(): number {
    return 8192
  }
}
