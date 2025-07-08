import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

let dondozoData: string

before(() => {
  cy.fixture("dondozo-data").then(data => {
    dondozoData = data
  })
})

describe("Reset configurations when change the Pokémon", () => {
  it("Reset boosts", () => {
    leftPokemonBuild.importPokemon(dondozoData)
    leftPokemonBuild.activateCommander()

    leftPokemonBuild.selectPokemon("Tyranitar")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Reset Commander", () => {
    leftPokemonBuild.importPokemon(dondozoData)
    leftPokemonBuild.activateCommander()

    leftPokemonBuild.selectPokemon("Tyranitar")
    leftPokemonBuild.selectPokemon("Dondozo")

    leftPokemonBuild.commanderNotActivated()
  })

  it("Reset HP percentage", () => {
    leftPokemonBuild.importPokemon(dondozoData)
    leftPokemonBuild.hpPercentage(50)

    leftPokemonBuild.selectPokemon("Tyranitar")

    leftPokemonBuild.hpPercentageIs(100)
  })
})
