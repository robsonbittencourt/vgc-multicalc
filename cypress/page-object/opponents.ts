import { OpponentPokemon } from "./opponent-pokemon"
import { Pokemon } from "./pokemon"

export class Opponents {

  getOpponent(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).filter(`:contains(${pokemonName})`)
    return new OpponentPokemon(pokemonName, card)
  }

  selectOpponent(pokemonName: string) {
    return this.getOpponent(pokemonName).edit()
  }

  addNewPokemon(pokemonName: string): Pokemon {
    cy.get('[data-cy="add-opponent-pokemon"]').click({force: true})
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, {force: true}).type("{downArrow}").type("{enter}")
    return new Pokemon()
  }

  exists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should('exist')
  }

  doesNotExists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should('not.exist')
  }

  empty() {
    cy.get(`[data-cy^="pokemon-card"]`).should('not.exist')
  }

}