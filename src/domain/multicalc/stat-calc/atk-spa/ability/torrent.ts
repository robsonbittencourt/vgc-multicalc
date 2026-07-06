import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"
import { isTargetStat } from "./target-stat-verifier"

export class Torrent implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, move: Move, _field: Field): boolean {
    const hasLowHp = pokemon.actualHp <= pokemon.hp / 3

    return pokemon.hasAbility("Torrent") && hasLowHp && move.hasType("Water") && isTargetStat(isAttack, move)
  }

  getModifier(): number {
    return 6144
  }
}
