import { Team } from "cypress/page-object/team"

const team = new Team()

describe('Add Pokémon', () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({force: true})
  })
  
  it('Palafin-Hero', () => {
    team.add("Palafin-Hero")

    team.pokemonOnEditIs("Palafin-Hero", "Zero to Hero", "Water", "Mystic Water", "Adamant")
  })
})