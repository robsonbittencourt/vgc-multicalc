import { Team } from "cypress/page-object/team"

const team = new Team()

describe('Add Pokémon', () => {
  it('Palafin-Hero', () => {
    team.add("Palafin-Hero")

    team.pokemonOnEditIs("Palafin-Hero", "Zero to Hero", "Water", "Mystic Water", "Adamant")
  })
})