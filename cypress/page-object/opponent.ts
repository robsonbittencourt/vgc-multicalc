import { ExportModal } from "./export-modal"
import { ImportModal } from "./import-modal"
import { OpponentPokemon } from "./opponent-pokemon"
import { PokemonBuild } from "./pokemon-build"

export class Opponent {
  get(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`)
    return new OpponentPokemon(card)
  }

  selectPokemon(pokemonName: string): PokemonBuild {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  add(pokemonName: string): PokemonBuild {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, { force: true }).type("{downArrow}").type("{enter}")
    return new PokemonBuild("your-team")
  }

  clickOnAdd() {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
  }

  addIsVisible() {
    cy.get('[data-cy="add-opponent-pokemon"]').should("exist")
  }

  exists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should("exist")
  }

  doesNotExists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should("not.exist")
  }

  empty() {
    cy.get(`[data-cy^="pokemon-card"]`).should("not.exist")
  }

  deleteAll() {
    cy.get('[data-cy="delete-opponent-pokemon-button"]').click({ force: true })
  }

  importPokemon(pokemonData: string) {
    cy.get('[data-cy="import-pokemon-to-opponent"]').click({ force: true })
    new ImportModal().import(pokemonData)
  }

  importPokepaste(pokepaste: string) {
    cy.get('[data-cy="import-pokepaste-to-team"]').click({ force: true })
    new ImportModal().import(pokepaste)
  }

  export(): ExportModal {
    cy.get('[data-cy="export-opponent-pokemon-button"]').click({ force: true })
    return new ExportModal()
  }
}
