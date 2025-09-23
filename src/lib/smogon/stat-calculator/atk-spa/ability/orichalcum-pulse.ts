import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class OrichalcumPulse implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return isAttack && pokemon.hasAbility("Orichalcum Pulse") && field.weather == "Sun" && !pokemon.hasItem("Utility Umbrella")
  }

  getModifier(): number {
    return 5461
  }
}
