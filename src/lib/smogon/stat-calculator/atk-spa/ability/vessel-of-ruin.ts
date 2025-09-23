import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class VesselOfRuin implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return !isAttack && field.isVesselOfRuin && !pokemon.hasAbility("Vessel of Ruin")
  }

  getModifier(): number {
    return 3072
  }
}
