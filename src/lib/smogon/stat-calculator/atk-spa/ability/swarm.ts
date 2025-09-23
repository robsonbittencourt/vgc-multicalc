import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Move } from "@robsonbittencourt/calc"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"
import { isTargetStat } from "./target-stat-verifier"

export class Swarm implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, _field: Field): boolean {
    const hasLowHp = pokemon.actualHp <= pokemon.hp / 3

    return pokemon.hasAbility("Swarm") && hasLowHp && move.hasType("Bug") && isTargetStat(isAttack, move)
  }

  getModifier(): number {
    return 6144
  }
}
