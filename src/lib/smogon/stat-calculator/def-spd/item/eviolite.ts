import { Pokemon } from "@lib/model/pokemon"
import { Generations, toID } from "@robsonbittencourt/calc"
import { DefensiveItemStrategy } from "./defensive-item-strategy"

export class Eviolite implements DefensiveItemStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon): boolean {
    const gen = Generations.get(9)
    return pokemon.hasItem("Eviolite") && gen.species.get(toID(pokemon.name))?.nfe == true
  }

  getModifier(): number {
    return 6144
  }
}
