import { isEmpty } from "cypress/types/lodash"
import { TeamMember } from "./team-member"

export class Team {
  
  selectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.select()

    return teamMember
  }

  addNewTeamMember(pokemonName: string): TeamMember {
    cy.get('[data-cy="add-team-member-tab"]').click({force: true})
    cy.get('[data-cy="pokemon-select"] input').type(pokemonName, {force: true}).type("{downArrow}").type("{enter}")
    return new TeamMember(pokemonName)
  }

  verifyIfExists(pokemonName: string) {
    cy.get('[data-cy="team-member-tab"]').filter(`:contains(${pokemonName})`)
  }

  isEmpty() {
    cy.get('[data-cy="team-member-tab"]').should('have.length', 1)
  }

}