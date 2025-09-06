import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class ChoiceSpecs implements OffensiveItemStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon): boolean {
    return attacker.hasItem("Choice Specs") && !isAttack
  }

  getModifier(): number {
    return 6144
  }
}
