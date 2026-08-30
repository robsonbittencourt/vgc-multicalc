import { poke } from "@cy-support/e2e"
import { setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { DamageResult } from "@page-object/damage-result"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"

const header = new Header()
const opponents = new Opponent()

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

function openTeamVsMany() {
  header.openTeamVsMany()
  opponents.isShowingDefenders()
}

function openManyVsTeam() {
  header.openManyVsTeam()
  opponents.isShowingAttackers()
}

describe("Per side in One vs One", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])

    leftPokemonBuild.selectAttackTwo()
    rightPokemonBuild.selectAttackTwo()
  })

  it("Should highlight the roll of the active roll level", () => {
    leftDamageResult.withLowRoll()
    leftDamageResult.highlightedRollIs(1)

    leftDamageResult.withMediumRoll()
    leftDamageResult.highlightedRollIs(8)

    leftDamageResult.withHighRoll()
    leftDamageResult.highlightedRollIs(16)
  })

  it("Should change the opponent remaining hp when the roll level changes", () => {
    leftDamageResult.withHighRoll()
    rightDamageResult.surviveWithThisHpAmmount(159)

    leftDamageResult.withLowRoll()
    rightDamageResult.surviveWithThisHpAmmount(163)
  })

  it("Should keep each side roll level independent", () => {
    leftDamageResult.withLowRoll()
    rightDamageResult.withMediumRoll()

    leftDamageResult.rollLevelIs("low")
    rightDamageResult.rollLevelIs("medium")
  })
})

describe("On the opponent side of the multi calc", () => {
  beforeEach(() => {
    openTeamVsMany()
    setUpDefaultTeamOnCurrentScreen()
    opponents.deleteAll()
    opponents.add("Tyranitar")
  })

  it("Should change the selected roll level", () => {
    opponents.selectRollLevel("high")

    opponents.rollLevelIs("high")

    opponents.selectRollLevel("low")

    opponents.rollLevelIs("low")

    opponents.selectRollLevel("medium")

    opponents.rollLevelIs("medium")
  })

  it("Should keep the roll level of Team vs Many independent from Many vs Team", () => {
    opponents.selectRollLevel("low")
    opponents.rollLevelIs("low")

    openManyVsTeam()

    opponents.selectRollLevel("high")
    opponents.rollLevelIs("high")

    openTeamVsMany()

    opponents.rollLevelIs("low")

    openManyVsTeam()

    opponents.rollLevelIs("high")
  })

  it("Should persist each mode roll level after a reload", () => {
    opponents.selectRollLevel("low")

    openManyVsTeam()

    opponents.selectRollLevel("high")

    cy.reload()

    openTeamVsMany()

    opponents.rollLevelIs("low")

    openManyVsTeam()

    opponents.rollLevelIs("high")
  })
})
