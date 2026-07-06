import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Status } from "@multicalc/model/status"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Guts implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return isAttack && pokemon.hasAbility("Guts") && pokemon.status != Status.HEALTHY
  }

  getModifier(): number {
    return 6144
  }
}
