import { PokemonBuild } from "@page-object/pokemon-build"
import { poke } from "../support/e2e"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

describe("Reset configurations when change the Pokémon", () => {
  it("Reset boosts", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    leftPokemonBuild.activateCommander()

    leftPokemonBuild.selectPokemon("Tyranitar")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Reset Commander", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    leftPokemonBuild.activateCommander()

    leftPokemonBuild.selectPokemon("Tyranitar")
    leftPokemonBuild.selectPokemon("Dondozo")

    leftPokemonBuild.commanderNotActivated()
  })

  it("Reset HP percentage", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    leftPokemonBuild.hpPercentage(50)

    leftPokemonBuild.selectPokemon("Tyranitar")

    leftPokemonBuild.hpPercentageIs(100)
  })
})
