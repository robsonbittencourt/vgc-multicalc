import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { isQPActive } from "@lib/smogon/commom"
import { Move } from "@robsonbittencourt/calc"
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
