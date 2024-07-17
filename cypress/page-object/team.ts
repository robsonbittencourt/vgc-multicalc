import { TeamMember } from "./team-member"
import { ActivePokemon } from "./active-pokemon"

export class Team {
  
  selectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.select()

    return teamMember
  }

  selectPokemon(pokemonName: string): ActivePokemon {
    return this.selectTeamMember(pokemonName).pokemon()
  }

  add(pokemonName: string): ActivePokemon {
    cy.get('[data-cy="add-team-member-tab"]').click({force: true})
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, {force: true}).type("{downArrow}").type("{enter}")
    return new ActivePokemon()
  }

  teamIs(pokemonNames: string[]) {
    pokemonNames.forEach((pokemon) => {
      this.verifyIfExists(pokemon)  
    })   
  }

  verifyIfExists(pokemonName: string) {
    cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`)
  }

  isEmpty() {
    cy.get('[data-cy="team-member-tab"]').should('have.length', 1)
  }

  selectTeam(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).click({force: true})
    return new Team()
  }

  delete(teamName: string) {
    this.selectTeam(teamName)
    cy.get('[data-cy="delete-team-button"]').click({force: true})
  }

  pokemonOnEditIs(pokemonName: string) {
    cy.get('[data-cy="pokemon-select"] input').should('have.value', pokemonName)
  }

}