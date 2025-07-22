import { ExportModal } from "./export-modal"
import { ImportModal } from "./import-modal"
import { OpponentPokemon } from "./opponent-pokemon"
import { PokemonBuild } from "./pokemon-build"

export class Opponent {
  get(pokemonName: string): OpponentPokemon {
    const card = cy.get(`[data-cy="pokemon-card-${pokemonName}"]`)
    return new OpponentPokemon(card)
  }

  selectAttacker(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-attacker-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  selectSecondAttacker(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-second-attacker-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  selectDefender(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-defender-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  add(pokemonName: string): PokemonBuild {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
    cy.get('[data-cy="card-pokemon-select"] input').clear().type(pokemonName, { force: true }).type("{downArrow}").type("{enter}")
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
    cy.get('[data-cy="opponent-widget"]').find('[data-cy="import-pokemon"]').click()
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

  combine(sourcePokemonName: string, targetPokemonName: string) {
    cy.get(`[data-cy="move-card-${sourcePokemonName}"]`).realMouseDown({ button: "left", position: "center" }).realMouseMove(0, 10, { position: "center" })
    cy.get(`[data-cy="pokemon-card-${targetPokemonName}"]`).realMouseMove(0, 0, { position: "center" }).realHover().realMouseUp().wait(600)
  }

  separate(targetPokemonName: string) {
    cy.get(`[data-cy="separate-opponent-${targetPokemonName}"]`).click()
  }
}
