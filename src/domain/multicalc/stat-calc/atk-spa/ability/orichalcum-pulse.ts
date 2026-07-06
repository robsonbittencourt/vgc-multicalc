import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class OrichalcumPulse implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return isAttack && pokemon.hasAbility("Orichalcum Pulse") && field.weather == "Sun" && !pokemon.hasItem("Utility Umbrella")
  }

  getModifier(): number {
    return 5461
  }
}
