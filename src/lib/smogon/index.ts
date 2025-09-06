import { Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { PokemonParameters } from "@lib/types"
import { Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"
import { StatIDExceptHP } from "@robsonbittencourt/calc/dist/data/interface"
import Commom from "./commom"
import SpeedStatCalculator from "./modified-spe"
import SmogonPokemonBuilder from "./smogon-pokemon-builder"

@Injectable({ providedIn: "root" })
export class SmogonFunctions {
  private speedCalc = new SpeedStatCalculator()
  private commom = new Commom()
  private builder = new SmogonPokemonBuilder()

  getFinalAttack(attacker: Pokemon, move: Move, field: Field): number {
    return 0
  }

  getFinalDefense(attacker: Pokemon, field: Field): number {
    return 0
  }

  getFinalSpecialAttack(attacker: Pokemon, move: Move, field: Field): number {
    return 0
  }

  getFinalSpecialDefense(attacker: Pokemon, field: Field): number {
    return 0
  }

  getFinalSpeed(pokemon: Pokemon, field: Field, isTailwind: boolean): number {
    return this.speedCalc.getFinalSpeed(pokemon, field, isTailwind)
  }

  higherStat(smogonPokemon: SmogonPokemon): StatIDExceptHP {
    return this.commom.higherStat(smogonPokemon)
  }

  fromExisting(pokemon: Pokemon): SmogonPokemon {
    return this.builder.fromExisting(pokemon)
  }

  fromScratch(pokemonName: string, options: PokemonParameters): SmogonPokemon {
    return this.builder.fromScratch(pokemonName, options)
  }
}
