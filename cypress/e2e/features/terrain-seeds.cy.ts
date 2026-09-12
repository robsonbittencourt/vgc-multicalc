import { poke, visitApp } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")

const field = new Field()

describe("Terrain Seeds", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["hatterene"])
  })

  it("Should apply a Defense boost with Electric Seed when the Electric Terrain is active", () => {
    leftPokemonBuild.selectItem("Electric Seed")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    field.eletricTerrain()

    leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)

    field.eletricTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Should apply a Defense boost with Grassy Seed when the Grassy Terrain is active", () => {
    leftPokemonBuild.selectItem("Grassy Seed")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    field.grassyTerrain()

    leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)

    field.grassyTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Should apply a Special Defense boost with Psychic Seed when the Psychic Terrain is active", () => {
    leftPokemonBuild.selectItem("Psychic Seed")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    field.psychicTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 1, 0)

    field.psychicTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Should apply a Special Defense boost with Misty Seed when the Misty Terrain is active", () => {
    leftPokemonBuild.selectItem("Misty Seed")

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    field.mistyTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 1, 0)

    field.mistyTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
  })

  it("Should not apply a boost when the terrain does not match the seed", () => {
    leftPokemonBuild.selectItem("Psychic Seed")

    field.eletricTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    field.eletricTerrain()
  })

  it("Should apply the boost when the seed is equipped while the terrain is already active", () => {
    leftPokemonBuild.selectItem("Leftovers")

    field.grassyTerrain()

    leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)

    leftPokemonBuild.selectItem("Grassy Seed")

    leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)

    field.grassyTerrain()
  })
})
