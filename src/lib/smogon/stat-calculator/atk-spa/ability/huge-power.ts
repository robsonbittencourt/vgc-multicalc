import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@lib/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class HugePower implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return isAttack && pokemon.hasAbility("Huge Power")
  }

  getModifier(): number {
    return 8192
  }
}
