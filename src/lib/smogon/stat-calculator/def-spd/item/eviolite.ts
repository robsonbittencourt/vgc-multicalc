import { Pokemon } from "@lib/model/pokemon"
import { getSpecies } from "@calc"
import { DefensiveItemStrategy } from "./defensive-item-strategy"

export class Eviolite implements DefensiveItemStrategy {
  shouldApply(_isDefense: boolean, pokemon: Pokemon): boolean {
    return pokemon.hasItem("Eviolite") && getSpecies(pokemon.name)?.notFullyEvolved == true
  }

  getModifier(): number {
    return 6144
  }
}
