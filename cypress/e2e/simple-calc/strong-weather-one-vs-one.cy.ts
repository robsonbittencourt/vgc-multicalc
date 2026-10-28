import { poke, visitApp } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

const field = new Field()

describe("Strong weathers in One vs One", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    rightPokemonBuild.importPokemon(poke["incineroar"])
  })

  it("Should keep the strong weathers hidden without a Primal in the field", () => {
    field.optionIsHidden("heavy-rain")
    field.optionIsHidden("harsh-sunshine")
    field.optionIsHidden("strong-winds")
  })

  it("Should turn Heavy Rain on when Kyogre-Primal enters the field", () => {
    leftPokemonBuild.importPokemon(poke["kyogre-primal"])

    field.isActiveOption("heavy-rain")
    leftDamageResult.descriptionContains("in Heavy Rain")
  })

  it("Should lock the Blue Orb of Kyogre-Primal", () => {
    leftPokemonBuild.itemIs("Blue Orb")
    leftPokemonBuild.itemIsDisabled()
  })

  it("Should make the Fire move of the opponent fail against Kyogre-Primal", () => {
    rightDamageResult.damageIs(0, 0, 0, 0, 0)
  })

  it("Should turn Heavy Rain off when the user toggles it off", () => {
    field.heavyRain()

    field.isNotActiveOption("heavy-rain")
    leftDamageResult.descriptionNotContains("in Heavy Rain")
  })

  it("Should turn Heavy Rain back on when the user toggles it on again", () => {
    field.heavyRain()

    field.isActiveOption("heavy-rain")
    leftDamageResult.descriptionContains("in Heavy Rain")
  })

  it("Should switch to Harsh Sunshine when Groudon-Primal replaces Kyogre-Primal", () => {
    leftPokemonBuild.importPokemon(poke["groudon-primal"])

    field.optionIsHidden("heavy-rain")
    field.isActiveOption("harsh-sunshine")
    leftPokemonBuild.itemIs("Red Orb")
    leftPokemonBuild.itemIsDisabled()
  })

  it("Should turn Strong Winds on when Rayquaza-Mega enters the field", () => {
    leftPokemonBuild.importPokemon(poke["rayquaza-mega"])

    field.optionIsHidden("harsh-sunshine")
    field.isActiveOption("strong-winds")
  })

  it("Should hide the strong weathers when no Pokémon sets them", () => {
    leftPokemonBuild.importPokemon(poke["vaporeon"])

    field.optionIsHidden("strong-winds")
  })
})
