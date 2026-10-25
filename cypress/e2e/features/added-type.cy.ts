import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const opponents = new Opponent()
const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Added type in One vs One", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["gourgeist-trick-or-treat"])
    rightPokemonBuild.importPokemon(poke["garchomp-special-wall"])
  })

  it("Should show the Trick-or-Treat check only for the Pokémon that has the move", () => {
    leftPokemonBuild.typeAddingMoveUsedIsVisible("Trick-or-Treat")
    leftPokemonBuild.typeAddingMoveUsedIsNotChecked()

    rightPokemonBuild.typeAddingMoveUsedIsNotVisible()
    rightPokemonBuild.hasNoAddedType()
  })

  it("Should add Ghost to the other Pokémon and double the Shadow Ball damage", () => {
    leftDamageResult.damageIs(0, 17.2, 20.9, 37, 45)

    leftPokemonBuild.typeAddingMoveUsed()

    rightPokemonBuild.typesAre("Dragon", "Ground")
    rightPokemonBuild.addedTypeIs("Ghost")
    leftPokemonBuild.hasNoAddedType()
    leftDamageResult.damageIs(0, 34.4, 41.8, 74, 90)
    leftDamageResult.descriptionContains("Garchomp (Dragon/Ground/Ghost)")
  })

  it("Should remove the Ghost type when the check is cleared", () => {
    leftPokemonBuild.typeAddingMoveUsed()

    leftPokemonBuild.typeAddingMoveUsed()

    rightPokemonBuild.hasNoAddedType()
    leftDamageResult.damageIs(0, 17.2, 20.9, 37, 45)
  })

  it("Should ignore the added type when the other Pokémon is terastallized", () => {
    leftPokemonBuild.typeAddingMoveUsed()

    rightPokemonBuild.terastalyze()

    rightPokemonBuild.hasNoAddedType()
    leftDamageResult.damageIs(0, 17.2, 20.9, 37, 45)
  })

  it("Should keep the added type after reloading the page", () => {
    leftPokemonBuild.typeAddingMoveUsed()

    cy.reload()

    leftPokemonBuild.typeAddingMoveUsedIsChecked()
    rightPokemonBuild.addedTypeIs("Ghost")
    leftDamageResult.damageIs(0, 34.4, 41.8, 74, 90)
  })
})

describe("Added type in Team vs Many", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
    opponents.deleteAll()
    opponents.importPokemon(poke["garchomp-special-wall"])
  })

  it("Should add Ghost to the opponents when a team member used Trick-or-Treat", () => {
    team.importPokemon(poke["gourgeist-trick-or-treat"])
    opponents.get("Garchomp").damageIs(17.2, 20.9)

    team.selectPokemon("Gourgeist").typeAddingMoveUsed()

    opponents.get("Garchomp").damageIs(34.4, 41.8).cause3HKO()
    opponents.selectDefender("Garchomp").addedTypeIs("Ghost")
  })

  it("Should offer Ghost to the teammates turned off until it is turned on", () => {
    team.importPokemon(poke["gourgeist-trick-or-treat"])
    team.importPokemon(poke["milotic-ice-beam"])
    team.selectPokemon("Gourgeist").typeAddingMoveUsed()

    const milotic = team.selectPokemon("Milotic")

    milotic.addedTypeIsOff("Ghost")
    milotic.toggleAddedType()
    milotic.addedTypeIs("Ghost")
    milotic.toggleAddedType()
    milotic.addedTypeIsOff("Ghost")
  })

  it("Should make Ice Beam 8x against a Garchomp that received Grass from Forest's Curse", () => {
    team.importPokemon(poke["trevenant-forests-curse"])
    team.importPokemon(poke["milotic-ice-beam"])
    team.selectPokemon("Milotic")
    opponents.get("Garchomp").damageIs(72.5, 85.5).cause2HKO()

    team.selectPokemon("Trevenant").typeAddingMoveUsed()
    team.selectPokemon("Milotic")

    opponents.get("Garchomp").damageIs(145.1, 171.1).causeOHKO()
  })

  it("Should add the type only to the team when an opponent used the move", () => {
    team.importPokemon(poke["milotic-ice-beam"])
    opponents.importPokemon(poke["gourgeist-trick-or-treat"])

    opponents.selectDefender("Gourgeist").typeAddingMoveUsed()
    team.closeTab()

    team.selectPokemon("Milotic").addedTypeIs("Ghost")
    opponents.selectDefender("Garchomp").hasNoAddedType()
  })

  it("Should keep a single type adding move used at a time", () => {
    team.importPokemon(poke["gourgeist-trick-or-treat"])
    team.importPokemon(poke["trevenant-forests-curse"])
    team.selectPokemon("Gourgeist").typeAddingMoveUsed()

    team.selectPokemon("Trevenant").typeAddingMoveUsed()

    team.selectPokemon("Gourgeist").typeAddingMoveUsedIsNotChecked()
    opponents.selectDefender("Garchomp").addedTypeIs("Grass")
  })
})
