import { OpponentPokemon } from "./opponent-pokemon"
import { ActivePokemon } from "./active-pokemon"

export class Opponent {

  get(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).filter(`:contains(${pokemonName})`)
    return new OpponentPokemon(card)
  }

  add(pokemonName: string): ActivePokemon {
    cy.get('[data-cy="add-opponent-pokemon"]').click({force: true})
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, {force: true}).type("{downArrow}").type("{enter}")
    return new ActivePokemon()
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

  deleteAll() {
    cy.get('[data-cy="delete-opponent-pokemon-button"]').click({force: true})
  }

}