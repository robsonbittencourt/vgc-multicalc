import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"
import { isTargetStat } from "./target-stat-verifier"

export class WaterBubble implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, _field: Field): boolean {
    return pokemon.hasAbility("Water Bubble") && move.hasType("Water") && isTargetStat(isAttack, move)
  }

  getModifier(): number {
    return 8192
  }
}
