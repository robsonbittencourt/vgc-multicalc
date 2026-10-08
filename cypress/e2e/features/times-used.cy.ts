import { poke, visitApp } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Times used in a row", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["dragapult-draco-meteor"])
    rightPokemonBuild.importPokemon(poke["incineroar"])
  })

  it("Should show the times used for a move that changes stats over the uses", () => {
    leftPokemonBuild.timesUsedIsVisible()
    leftDamageResult.damageIs(0, 69.1, 82, 139, 165)
    leftDamageResult.descriptionContains("guaranteed 2HKO")
  })

  it("Should add up every use with the Sp. Atk lowered after each one", () => {
    leftPokemonBuild.timesUsed(3)

    leftDamageResult.damageIs(0, 126.8, 151.2, 139, 165)
    leftDamageResult.rollsHaveUses(3)
    leftDamageResult.descriptionContains("Draco Meteor over 3 turns")
    leftDamageResult.descriptionContains("guaranteed KO in 3 turns")
  })

  it("Should go back to a single use", () => {
    leftPokemonBuild.timesUsed(1)

    leftDamageResult.damageIs(0, 69.1, 82, 139, 165)
    leftDamageResult.descriptionNotContains("over 3 turns")
  })

  it("Should hide the times used for a move that does not change stats", () => {
    leftPokemonBuild.selectAttackTwo()

    leftPokemonBuild.timesUsedIsNotVisible()
  })
})
