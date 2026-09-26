import { poke, visitApp } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Stamina", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["incineroar-close-combat"])
    rightPokemonBuild.importPokemon(poke["archaludon-stamina"])
  })

  it("Should raise the defender Defense after every hit by default", () => {
    rightPokemonBuild.abilityCheckIsVisible()
    rightPokemonBuild.abilityIsActivated()

    leftDamageResult.damageIs(0, 41.6, 49.7, 82, 98)
    leftDamageResult.descriptionContains("Archaludon (Stamina considered): 82-98")
    leftDamageResult.descriptionContains("43.2% chance to 3HKO")
  })

  it("Should repeat the same damage on every hit when Stamina is turned off", () => {
    rightPokemonBuild.activateAbility()

    rightPokemonBuild.abilityIsNotActivated()
    leftDamageResult.damageIs(0, 41.6, 49.7, 82, 98)
    leftDamageResult.descriptionNotContains("Stamina considered")
    leftDamageResult.descriptionContains("guaranteed 3HKO")
  })

  it("Should raise the defender Defense again when Stamina is turned back on", () => {
    rightPokemonBuild.activateAbility()

    rightPokemonBuild.abilityIsActivated()
    leftDamageResult.descriptionContains("(Stamina considered)")
    leftDamageResult.descriptionContains("43.2% chance to 3HKO")
  })
})
