import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class BeadsOfRuin implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    return !isDefense && field.isBeadsOfRuin && !pokemon.hasAbility("Beads of Ruin")
  }

  getModifier(): number {
    return 3072
  }
}
