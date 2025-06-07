import { Pokemon } from "@lib/model/pokemon"
export class Target {
  pokemon: Pokemon
  secondPokemon?: Pokemon

  constructor(pokemon: Pokemon, secondPokemon?: Pokemon) {
    this.pokemon = pokemon
    this.secondPokemon = secondPokemon
  }
}
