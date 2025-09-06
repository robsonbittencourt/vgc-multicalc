import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Guts implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return attacker.hasAbility("Guts") && attacker.status != Status.HEALTHY && isAttack
  }

  getModifier(): number {
    return 6144
  }
}
