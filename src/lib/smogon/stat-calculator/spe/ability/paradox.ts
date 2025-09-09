import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { isQPActive } from "@lib/smogon/commom"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class Paradox implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return isQPActive(pokemon, field) && pokemon.higherStat === "spe"
  }

  getModifier(): number {
    return 6144
  }
}
