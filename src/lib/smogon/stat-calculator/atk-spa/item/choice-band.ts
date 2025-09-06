import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class ChoiceBand implements OffensiveItemStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon): boolean {
    return attacker.hasItem("Choice Band") && isAttack
  }

  getModifier(): number {
    return 6144
  }
}
