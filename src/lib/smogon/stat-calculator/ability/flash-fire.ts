import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class FlashFire implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return attacker.hasAbility("Flash Fire") && attacker.abilityOn && move.hasType("Fire") && ((isAttack && move.category == "Physical") || (!isAttack && move.category == "Special"))
  }

  getModifier(): number {
    return 6144
  }
}
