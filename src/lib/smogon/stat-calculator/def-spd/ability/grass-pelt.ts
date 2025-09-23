import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class GrassPelt implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    return isDefense && pokemon.hasAbility("Grass Pelt") && field.terrain == "Grassy"
  }

  getModifier(): number {
    return 6144
  }
}
