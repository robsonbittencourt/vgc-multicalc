import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Swarm implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    if (attacker.actualHp <= attacker.hp / 3 && ((isAttack && move.category == "Physical") || (!isAttack && move.category == "Special"))) {
      if (attacker.hasAbility("Swarm") && move.hasType("Bug")) {
        return true
      }
    }

    return false
  }

  getModifier(): number {
    return 6144
  }
}
