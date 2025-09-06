import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import Commom from "@lib/smogon/commom"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Paradox implements OffensiveAbilityStrategy {
  commom = new Commom()

  shouldApply(isAttack: boolean, attacker: Pokemon, move: Move, field: Field): boolean {
    if (this.commom.isQPActive(attacker, field)) {
      if ((isAttack && attacker.higherStat === "atk") || (!isAttack && attacker.higherStat === "spa")) {
        return true
      }
    }

    return false
  }

  getModifier(): number {
    return 5325
  }
}
