import { Pokemon } from "@lib/model/pokemon"
import { OffensiveItemStrategy } from "./offensive-item-strategy"

export class LightBall implements OffensiveItemStrategy {
  shouldApply(isAttack: boolean, attacker: Pokemon): boolean {
    return attacker.hasItem("Light Ball") && attacker.name.includes("Pikachu")
  }

  getModifier(): number {
    return 8192
  }
}
