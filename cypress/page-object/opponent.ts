import { OpponentPokemon } from "./opponent-pokemon"
import { ActivePokemon } from "./active-pokemon"
import { ImportModal } from "./import-modal"

export class Opponent {

  get(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).filter(`:contains(${pokemonName})`)
    return new OpponentPokemon(card)
  }

  selectPokemon(pokemonName: string): ActivePokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).filter(`:contains(${pokemonName})`).click({force: true})
    return new ActivePokemon()
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

  importPokemon(pokemonData: string) {
    cy.get('[data-cy="import-pokemon-to-opponent"]').click({force: true})
    new ImportModal().import(pokemonData)
  }

  importPokepaste(pokepaste: string) {
    cy.get('[data-cy="import-pokepaste-to-team"]').click({force: true})
    new ImportModal().import(pokepaste)
  }

}