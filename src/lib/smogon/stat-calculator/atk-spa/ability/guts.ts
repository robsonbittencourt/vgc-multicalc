import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Guts implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return isAttack && pokemon.hasAbility("Guts") && pokemon.status != Status.HEALTHY
  }

  getModifier(): number {
    return 6144
  }
}
