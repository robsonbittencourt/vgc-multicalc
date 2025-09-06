import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import Commom from "@lib/smogon/commom"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class Paradox implements DefensiveAbilityStrategy {
  commom = new Commom()

  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    if (this.commom.isQPActive(pokemon, field)) {
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
