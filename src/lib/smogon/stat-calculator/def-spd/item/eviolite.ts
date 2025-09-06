import { Pokemon } from "@lib/model/pokemon"
import Commom from "@lib/smogon/commom"
import { Generations } from "@robsonbittencourt/calc"
import { DefensiveItemStrategy } from "./defensive-item-strategy"

export class Eviolite implements DefensiveItemStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon): boolean {
    const gen = Generations.get(9)
    const commom = new Commom()
    return pokemon.hasItem("Eviolite") && gen.species.get(commom.toID(pokemon.name))?.nfe == true
  }

  getModifier(): number {
    return 6144
  }
}
