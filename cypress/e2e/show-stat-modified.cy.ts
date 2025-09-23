import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")
const field = new Field()

describe("Show stat modified", () => {
  it("by increased stats", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    leftPokemonBuild.activateCommander()

    leftPokemonBuild.statModifiedIs("atk", "260")
    leftPokemonBuild.statModifiedIs("def", "272")
    leftPokemonBuild.statModifiedIs("spa", "152")
    leftPokemonBuild.statModifiedIs("spd", "214")
    leftPokemonBuild.statModifiedIs("spe", "190")
  })

  it("by decreased stats", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])

    leftPokemonBuild.selectStatsModifier("atk", "-1")
    leftPokemonBuild.statModifiedIs("atk", "86")

    leftPokemonBuild.selectStatsModifier("def", "-2")
    leftPokemonBuild.statModifiedIs("def", "68")

    leftPokemonBuild.selectStatsModifier("spa", "-3")
    leftPokemonBuild.statModifiedIs("spa", "30")

    leftPokemonBuild.selectStatsModifier("spd", "-4")
    leftPokemonBuild.statModifiedIs("spd", "35")

    leftPokemonBuild.selectStatsModifier("spe", "-5")
    leftPokemonBuild.statModifiedIs("spe", "27")
  })

  it("by Rock Pokémon on Sandstorm bonus", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    leftPokemonBuild.statModifiedIs("spd", "180")
  })

  it("by Ice Pokémon on Snow bonus", () => {
    leftPokemonBuild.importPokemon(poke["ninetales-alola"])
    rightPokemonBuild.importPokemon(poke["incineroar"])

    leftPokemonBuild.statModifiedIs("def", "142")
  })

  it("by item", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])

    leftPokemonBuild.statModifiedIs("spe", "195")
  })

  it("by Wonder Room", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])
    leftPokemonBuild.selectStatsModifier("def", "+1")
    leftPokemonBuild.selectStatsModifier("spd", "-1")

    field.wonderRoom()

    leftPokemonBuild.statModifiedIs("def", "243")
    leftPokemonBuild.statModifiedIs("spd", "85")
  })
})
