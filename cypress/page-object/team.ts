import { ExportModal } from "./export-modal"
import { ImportModal } from "./import-modal"
import { PokemonBuild } from "./pokemon-build"
import { TeamMember } from "./team-member"

export class Team {
  selectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.select()

    return teamMember
  }

  selectPokemon(pokemonName: string): PokemonBuild {
    return this.selectTeamMember(pokemonName).pokemon()
  }

  add(pokemonName: string): PokemonBuild {
    cy.get('[data-cy="add-team-member-tab"]').click({ force: true })
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, { force: true }).type("{downArrow}").type("{enter}")
    return new PokemonBuild("your-team")
  }

  addPokemonAvailable() {
    cy.get('[data-cy="add-team-member-tab"]').should("have.length", 1)
  }

  addPokemonUnavailable() {
    cy.get('[data-cy="add-team-member-tab"]').should("have.length", 0)
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

  selectTeam(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).click({ force: true })
    return new Team()
  }

  delete(teamName: string) {
    this.selectTeam(teamName)
    cy.get('[data-cy="delete-team-button"]').click({ force: true })
  }

  pokemonOnEditNameIs(pokemonName: string) {
    cy.get('[data-cy="pokemon-select"] input').should("have.value", pokemonName)
  }

  pokemonOnEditIs(pokemonName: string, ability: string, teraType: string, item: string, nature: string) {
    this.pokemonOnEditNameIs(pokemonName)
    cy.get('[data-cy="ability"] input').should("have.value", ability)
    cy.get('[data-cy="tera-type"] input').should("have.value", teraType)
    cy.get('[data-cy="item"] input').should("have.value", item)
    cy.get('[data-cy="nature"] input').should("have.value", nature)
  }

  pokemonOnEditAttacksIs(attackOne: string, attackTwo: string, attackThree: string, attackFour: string) {
    cy.get('[data-cy="pokemon-attack-1"] input').should("have.value", attackOne)
    cy.get('[data-cy="pokemon-attack-2"] input').should("have.value", attackTwo)
    cy.get('[data-cy="pokemon-attack-3"] input').should("have.value", attackThree)
    cy.get('[data-cy="pokemon-attack-4"] input').should("have.value", attackFour)
  }

  pokemonOnEditEvsIs(hp: number, atk: number, def: number, spa: number, spd: number, spe: number) {
    cy.get(`[data-cy="stat-hp"]`).find('[data-cy="ev-value"]').should("have.value", hp)
    cy.get(`[data-cy="stat-atk"]`).find('[data-cy="ev-value"]').should("have.value", atk)
    cy.get(`[data-cy="stat-def"]`).find('[data-cy="ev-value"]').should("have.value", def)
    cy.get(`[data-cy="stat-spa"]`).find('[data-cy="ev-value"]').should("have.value", spa)
    cy.get(`[data-cy="stat-spd"]`).find('[data-cy="ev-value"]').should("have.value", spd)
    cy.get(`[data-cy="stat-spe"]`).find('[data-cy="ev-value"]').should("have.value", spe)
  }

  pokemonOnEditIvsIs(hp: number, atk: number, def: number, spa: number, spd: number, spe: number) {
    cy.get(`[data-cy="stat-hp"]`).find('[data-cy="iv-value"]').should("have.value", hp)
    cy.get(`[data-cy="stat-atk"]`).find('[data-cy="iv-value"]').should("have.value", atk)
    cy.get(`[data-cy="stat-def"]`).find('[data-cy="iv-value"]').should("have.value", def)
    cy.get(`[data-cy="stat-spa"]`).find('[data-cy="iv-value"]').should("have.value", spa)
    cy.get(`[data-cy="stat-spd"]`).find('[data-cy="iv-value"]').should("have.value", spd)
    cy.get(`[data-cy="stat-spe"]`).find('[data-cy="iv-value"]').should("have.value", spe)
  }

  importPokemon(pokemonData: string): PokemonBuild {
    cy.get('[data-cy="import-pokemon-to-team"]').contains("Import").click({ force: true })
    new ImportModal().import(pokemonData)
    return new PokemonBuild("your-team")
  }

  importPokepaste(pokepaste: string) {
    cy.get('[data-cy="import-pokepaste-to-team"]').click({ force: true })
    new ImportModal().import(pokepaste)
  }

  exportPokemon(pokemon: string): ExportModal {
    this.selectPokemon(pokemon)
    cy.get('[data-cy="export-pokemon-from-team"]').contains("Export").click({ force: true })
    return new ExportModal()
  }

  export(team: string): ExportModal {
    this.selectTeam(team)
    cy.get('[data-cy="export-team-button"]').click({ force: true })
    return new ExportModal()
  }
}
