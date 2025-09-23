import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { isQPActive } from "@lib/smogon/commom"
import { DefensiveAbilityStrategy } from "./defensive-ability-strategy"

export class Paradox implements DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean {
    const boostDef = isDefense && pokemon.higherStat === "def"
    const boostSpd = !isDefense && pokemon.higherStat === "spd"

    return isQPActive(pokemon, field) && (boostDef || boostSpd)
  }

  getModifier(): number {
    return 5325
  }
}
