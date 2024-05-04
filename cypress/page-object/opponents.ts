import { PokemonCard } from "./pokemon-card"

export class Opponents {

  getOpponent(pokemonName: string): PokemonCard {
    const card = cy.get('.target-pokemon').get('.mat-mdc-card-title').filter(`:contains(${pokemonName})`)
    return new PokemonCard(card)
  }

}