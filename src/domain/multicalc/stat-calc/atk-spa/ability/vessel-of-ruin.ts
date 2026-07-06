import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class VesselOfRuin implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return !isAttack && field.isVesselOfRuin && !pokemon.hasAbility("Vessel of Ruin")
  }

  getModifier(): number {
    return 3072
  }
}
