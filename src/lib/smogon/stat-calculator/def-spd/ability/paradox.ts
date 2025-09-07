import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { isQPActive } from "@lib/smogon/commom"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class Paradox implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    if (isQPActive(pokemon, field)) {
      if ((isDefense && pokemon.higherStat === "def") || (!isDefense && pokemon.higherStat === "spd")) {
        return true
      }
    }

    return false
  }

  getModifier(): number {
    return 5325
  }
}
