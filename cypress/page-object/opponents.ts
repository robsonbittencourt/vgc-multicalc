import { OpponentPokemon } from "./opponent-pokemon"

export class Opponents {

  getOpponent(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).filter(`:contains(${pokemonName})`)
    return new OpponentPokemon(pokemonName, card)
  }

}