import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class TabletsOfRuin implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return isAttack && field.isTabletsOfRuin && !pokemon.hasAbility("Tablets of Ruin")
  }

  getModifier(): number {
    return 3072
  }
}
