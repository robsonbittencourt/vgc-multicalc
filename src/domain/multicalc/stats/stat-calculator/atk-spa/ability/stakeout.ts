import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Stakeout implements OffensiveAbilityStrategy {
  shouldApply(_isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return pokemon.hasAbility("Stakeout") && pokemon.abilityOn
  }

  getModifier(): number {
    return 8192
  }
}
