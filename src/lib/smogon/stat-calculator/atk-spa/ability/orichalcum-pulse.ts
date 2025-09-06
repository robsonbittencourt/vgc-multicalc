import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class OrichalcumPulse implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    return attacker.hasAbility("Orichalcum Pulse") && field.weather == "Sun" && isAttack && !attacker.hasItem("Utility Umbrella")
  }

  getModifier(): number {
    return 5461
  }
}
