import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"
import { isTargetStat } from "./target-stat-verifier"

export class DragonsMaw implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, _field: Field): boolean {
    return pokemon.hasAbility("Dragon's Maw") && move.hasType("Dragon") && isTargetStat(isAttack, move)
  }

  getModifier(): number {
    return 6144
  }
}
