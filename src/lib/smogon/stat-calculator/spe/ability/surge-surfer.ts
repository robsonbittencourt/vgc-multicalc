import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedAbilityStrategy } from "./speed-ability-strategy"

export class SurgeSurfer implements SpeedAbilityStrategy {
  shouldApply(pokemon: Pokemon, field: Field): boolean {
    return pokemon.hasAbility("Surge Surfer") && field.terrain == "Electric"
  }

  getModifier(): number {
    return 8192
  }
}
