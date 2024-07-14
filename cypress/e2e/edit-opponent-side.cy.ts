import { MainPage } from "cypress/page-object/main-page"

describe('Add Pokémon to the Opponent side', () => {
  it('Add three Pokémon to the opponent side', () => {
    const mainPage = new MainPage()
    
    mainPage.addNewPokemonToOpponent("Pikachu")
    mainPage.addNewPokemonToOpponent("Tyranitar")
    mainPage.addNewPokemonToOpponent("Lugia")

    mainPage.opponentExists("Pikachu")
    mainPage.opponentExists("Tyranitar")
    mainPage.opponentExists("Lugia")
  })
  
  it('Delete Pokémon from the opponent side', () => {
    const mainPage = new MainPage()
    
    mainPage.addNewPokemonToOpponent("Pikachu")    
    mainPage.getOpponent("Pikachu").delete()

    mainPage.opponentDoesNotExists("Pikachu")
  })

  it('When delete Pokémon from the opponent side select first Pokémon from the team to edit', () => {
    const mainPage = new MainPage()
    
    mainPage.addNewPokemonToOpponent("Pikachu")    
    mainPage.getOpponent("Pikachu").delete()
    
    mainPage.pokemonOnEditIs("Miraidon")
  })

  it('Delete all Pokémon from opponent side', () => {
    const mainPage = new MainPage()
    
    mainPage.deleteAllPokemonFromOpponent()
    
    mainPage.opponentSideIsEmpty()
  })
})