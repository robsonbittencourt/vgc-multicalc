import { PokemonCard } from "./pokemon-card"

export class Team {
  
  getTeamMember(pokemonName: string): PokemonCard {
    const card = cy.get('.team').get('.mat-mdc-card-title').filter(`:contains(${pokemonName})`)
    return new PokemonCard(card)
  }

  selectTeamMember(pokemonName: string): PokemonCard {
    const pokemon = this.getTeamMember(pokemonName)
    pokemon.select()

    return pokemon
  }

}