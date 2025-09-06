import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class TabletsOfRuin implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return field.isTabletsOfRuin && !attacker.hasAbility("Tablets of Ruin") && isAttack
  }

  getModifier(): number {
    return 3072
  }
}
