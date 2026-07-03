import { Pokemon } from "@lib/model/pokemon"
import { getPokemonData } from "@data/pokemon-data"
import { DefensiveItemStrategy } from "./defensive-item-strategy"

export class Eviolite implements DefensiveItemStrategy {
  shouldApply(_isDefense: boolean, pokemon: Pokemon): boolean {
    return pokemon.hasItem("Eviolite") && getPokemonData(pokemon.name)?.notFullyEvolved == true
  }

  getModifier(): number {
    return 6144
  }
}
