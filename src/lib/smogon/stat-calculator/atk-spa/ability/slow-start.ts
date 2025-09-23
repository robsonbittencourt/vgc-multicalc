import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class SlowStart implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, _field: Field): boolean {
    return isAttack && pokemon.hasAbility("Slow Start") && pokemon.abilityOn
  }

  getModifier(): number {
    return 2048
  }
}
