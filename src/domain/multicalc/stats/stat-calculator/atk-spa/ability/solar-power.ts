import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class SolarPower implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    return !isAttack && pokemon.hasAbility("Solar Power") && field.weather == "Sun"
  }

  getModifier(): number {
    return 6144
  }
}
