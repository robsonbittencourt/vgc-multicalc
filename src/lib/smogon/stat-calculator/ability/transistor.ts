import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Transistor implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return attacker.hasAbility("Transistor") && move.hasType("Electric") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))
  }

  getModifier(): number {
    return 5325
  }
}
