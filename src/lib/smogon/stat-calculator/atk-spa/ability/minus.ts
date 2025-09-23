import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Minus implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return !isAttack && pokemon.abilityOn && pokemon.hasAbility("Minus")
  }

  getModifier(): number {
    return 6144
  }
}
