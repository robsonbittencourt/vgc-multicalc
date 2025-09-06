import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class DragonsMaw implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return attacker.hasAbility("Dragon's Maw") && move.hasType("Dragon") && ((move.category === "Physical" && isAttack) || (move.category === "Special" && !isAttack))
  }

  getModifier(): number {
    return 6144
  }
}
