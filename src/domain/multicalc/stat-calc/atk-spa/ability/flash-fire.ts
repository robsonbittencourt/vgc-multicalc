import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"
import { isTargetStat } from "./target-stat-verifier"

export class FlashFire implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, _field: Field): boolean {
    return pokemon.hasAbility("Flash Fire") && pokemon.abilityOn && move.hasType("Fire") && isTargetStat(isAttack, move)
  }

  getModifier(): number {
    return 6144
  }
}
