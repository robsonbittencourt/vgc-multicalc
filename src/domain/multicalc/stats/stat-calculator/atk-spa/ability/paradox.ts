import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { isQPActive } from "@multicalc/stats/stat-utils"
import { Move } from "@multicalc/model/move"
import { OffensiveAbilityStrategy } from "./offensive-ability-strategy"

export class Paradox implements OffensiveAbilityStrategy {
  shouldApply(isAttack: boolean, pokemon: Pokemon, _move: Move, field: Field): boolean {
    const boostAtk = isAttack && pokemon.higherStat === "atk"
    const boostSpa = !isAttack && pokemon.higherStat === "spa"

    return isQPActive(pokemon, field) && (boostAtk || boostSpa)
  }

  getModifier(): number {
    return 5325
  }
}
