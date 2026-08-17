import { ExportModal } from "./export-modal"
import { PokemonBuild } from "./pokemon-build"
import { TeamMember } from "./team-member"

export class Team {
  selectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.select()

    return teamMember
  }

  ctrlSelectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.ctrlSelect()

    return teamMember
  }

  selectPokemon(pokemonName: string): PokemonBuild {
    return this.selectTeamMember(pokemonName).pokemon()
  }

  tabHasDuplicateItemWarning(pokemonName: string) {
    this.tabOf(pokemonName).find('[data-cy="duplicate-item-warning"]').should("exist")
  }

  tabHasNoDuplicateItemWarning(pokemonName: string) {
    this.tabOf(pokemonName).find('[data-cy="duplicate-item-warning"]').should("not.exist")
  }

  private tabOf(pokemonName: string) {
    return cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`).first()
  }

  clickOnAdd(): PokemonBuild {
    cy.get('[data-cy="add-team-member-tab"]').click({ force: true })
    return new PokemonBuild("your-team")
  }

  add(pokemonName: string): PokemonBuild {
    cy.get('[data-cy="add-team-member-tab"]').click({ force: true })
    const pokemonBuild = new PokemonBuild("your-team")
    pokemonBuild.selectPokemon(pokemonName)

    return pokemonBuild
  }

  addWithFilter(nameFilter: string, pokemonName: string): PokemonBuild {
    const pokemonBuild = new PokemonBuild("your-team")
    pokemonBuild.selectPokemonByFilter(nameFilter, pokemonName)

    return pokemonBuild
  }

  addPokemonAvailable() {
    cy.get('[data-cy="add-team-member-tab"]').should("have.length", 1)
  }

  addPokemonUnavailable() {
    cy.get('[data-cy="add-team-member-tab"]').should("have.length", 0)
  }

  teamSizeIs(size: number) {
    cy.get('[data-cy="team-member-tab"]').not(':has([data-cy="add-team-member-tab"])').should("have.length", size)
  }

  tabIsActive(pokemonName: string) {
    this.tabOf(pokemonName).should("have.class", "active-tab")
  }

  addTabIsActive() {
    cy.get('[data-cy="add-team-member-tab"]').parent().should("have.class", "active-tab")
  }

  pokemonTabsCountIs(pokemonName: string, count: number) {
    cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`).should("have.length", count)
  }

  duplicatePokemon() {
    cy.get('[data-cy="duplicate-pokemon-button"]').click({ force: true })
  }

  duplicateIsVisible() {
    cy.get('[data-cy="duplicate-pokemon-button"]').should("be.visible")
  }

  duplicateIsHidden() {
    cy.get('[data-cy="duplicate-pokemon-button"]').should("not.exist")
  }

  deletePokemonIsHidden() {
    cy.get('[data-cy="delete-from-team-button"]').should("not.exist")
  }

  teamIs(pokemonNames: string[]) {
    pokemonNames.forEach(pokemon => {
      this.verifyIfExists(pokemon)
    })
  }

  verifyIfExists(pokemonName: string) {
    cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`)
  }

  isEmpty() {
    cy.get('[data-cy="team-member-tab"]').should("have.length", 1)
  }

  activeTabsAre(pokemonNames: string[]) {
    cy.get('[data-cy="team-member-tab"].active-tab').should($tabs => {
      const active = [...$tabs].map(tab => tab.textContent!.trim())

      expect(active).to.have.length(pokemonNames.length)
      pokemonNames.forEach(name => expect(active.join(" | ")).to.contain(name))
    })
  }

  importPokemon(pokemonData: string, useEvs = true): PokemonBuild {
    cy.get("body").then($body => {
      if ($body.find('[data-cy="add-team-member-tab"]').length > 0) {
        cy.get('[data-cy="add-team-member-tab"]').click({ force: true })
      }
    })

    new PokemonBuild("your-team").importPokemon(pokemonData, useEvs)

    const pokemonName = this.extractPokemonName(pokemonData)

    cy.get('[data-cy="team-member-tab"]').contains(pokemonName).should("be.visible")
    this.selectPokemon(pokemonName)

    return new PokemonBuild("your-team")
  }

  export(): ExportModal {
    cy.get('[data-cy="export-pokemon-from-team"]').contains("Export").click({ force: true })
    return new ExportModal()
  }

  exportPokemon(pokemon: string): ExportModal {
    this.selectPokemon(pokemon)
    return this.export()
  }

  closeTab() {
    cy.get('[data-cy="close-tab"]').click({ force: true })
  }

  private extractPokemonName(pokemonData: string): string {
    const pokemonName = pokemonData.substring(0, pokemonData.indexOf(" @"))

    if (pokemonName.includes("-")) {
      return pokemonData.substring(0, pokemonData.indexOf("-"))
    }

    return pokemonName
  }
}
