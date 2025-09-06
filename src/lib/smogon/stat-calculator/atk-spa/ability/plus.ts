import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Plus implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return !isAttack && attacker.abilityOn && attacker.hasAbility("Plus")
  }

  getModifier(): number {
    return 6144
  }
}
