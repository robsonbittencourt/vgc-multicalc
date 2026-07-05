import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { isQPActive } from "@multicalc/stats/stat-utils"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class Paradox implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return isQPActive(pokemon, field) && pokemon.higherStat === "spe"
  }

  getModifier(): number {
    return 6144
  }
}
