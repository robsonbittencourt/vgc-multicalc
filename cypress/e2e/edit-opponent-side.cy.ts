import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

describe('Add Pokémon to the Opponent side', () => {
  it('Add three Pokémon to the opponent side', () => {
    opponents.add("Pikachu")
    opponents.add("Tyranitar")
    opponents.add("Lugia")

    opponents.exists("Pikachu")
    opponents.exists("Tyranitar")
    opponents.exists("Lugia")
  })
  
  it('Delete Pokémon from the opponent side', () => {
    opponents.add("Pikachu")

    opponents.get("Pikachu").delete()

    opponents.doesNotExists("Pikachu")
  })

  it('When delete Pokémon from the opponent side select first Pokémon from the team to edit', () => {
    opponents.add("Pikachu")
    
    opponents.get("Pikachu").delete()
    
    team.pokemonOnEditIs("Miraidon")
  })

  it('Delete all Pokémon from opponent side', () => {
    opponents.deleteAll()
    
    opponents.empty()
  })
})