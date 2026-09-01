import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { setUpDefaultTeam } from "@cy-support/setup"
import { CustomSet } from "@page-object/custom-set"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const team = new Team()
const teamsWidget = new TeamsWidget()
const opponents = new Opponent()
const customSet = new CustomSet()
const header = new Header()
const pokemonBuild = new PokemonBuild("your-team")

describe("State across a reload", () => {
  beforeEach(() => {
    setUpDefaultTeam()
  })

  smoke("Should keep the active team and its name", () => {
    teamsWidget.updateTeamName("Persisted Team")
    pokemonBuild.nameIs("Miraidon")

    cy.reload()
    header.openTeamVsMany()

    teamsWidget.activeTeamNameIs("Persisted Team")
    pokemonBuild.nameIs("Miraidon")
  })

  it("Should keep every team, not only the active one", () => {
    teamsWidget.updateTeamName("First Team")

    teamsWidget.selectTeam("Team 2")
    team.add("Archaludon")
    teamsWidget.updateTeamName("Second Team")

    cy.reload()
    header.openTeamVsMany()

    teamsWidget.teamBoxExists("First Team")
    teamsWidget.teamBoxExists("Second Team")
    teamsWidget.activeTeamNameIs("First Team")
  })

  it("Should keep the opponents", () => {
    opponents.deleteAll()
    opponents.add("Tyranitar")
    opponents.add("Pikachu")

    cy.reload()
    header.openTeamVsMany()

    opponents.exists("Tyranitar")
    opponents.exists("Pikachu")
  })

  it("Should keep an edited opponent with its calculated damage", () => {
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])
    opponents.selectDefender("Tyranitar").selectStatsModifier("spd", "+3")
    opponents.get("Tyranitar").damageIs(50, 58.6)

    cy.reload()
    header.openTeamVsMany()

    opponents.get("Tyranitar").damageIs(50, 58.6)
  })

  it("Should keep the custom sets", () => {
    team.add("Archaludon")
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    cy.reload()
    header.openTeamVsMany()

    opponents.deleteAll()
    opponents.add("Archaludon")
    opponents.filterBySet("Archaludon - Bulky")

    opponents.exists("Archaludon")
  })

  it("Should keep the Order by Damage preference", () => {
    opponents.deleteAll()
    opponents.add("Blissey")
    opponents.add("Pikachu")
    opponents.toggleOrderByDamage()
    opponents.cardOrderIs(["Pikachu", "Blissey"])

    cy.reload()
    header.openTeamVsMany()

    opponents.cardOrderIs(["Pikachu", "Blissey"])
  })

  it("Should keep the Best Move preference", () => {
    opponents.deleteAll()
    opponents.add("Hatterene")
    opponents.get("Hatterene").descriptionContains("Draco Meteor")
    opponents.toggleBestMove()
    opponents.get("Hatterene").descriptionContains("Electro Drift")

    cy.reload()
    header.openTeamVsMany()

    opponents.get("Hatterene").descriptionContains("Electro Drift")
  })

  it("Should keep the roll level", () => {
    opponents.deleteAll()
    opponents.add("Tyranitar")

    opponents.selectRollLevel("low")
    opponents.rollLevelIs("low")

    cy.reload()
    header.openTeamVsMany()

    opponents.rollLevelIs("low")
  })

  it("Should keep the SP toggle turned off", () => {
    pokemonBuild.evLabelIs("SPs")

    pokemonBuild.toggleSpsMode()

    pokemonBuild.evLabelIs("EVs")

    cy.reload()
    header.openTeamVsMany()

    new PokemonBuild("your-team").evLabelIs("EVs")
  })
})

describe("Theme across a reload", () => {
  it("Should keep the selected theme and color", () => {
    header.openThemeMenu()
    header.selectTheme("Dark")
    header.openThemeMenu()
    header.selectColor("Blue")

    header.bodyHasColorTheme("blue")

    cy.reload()

    header.bodyHasColorTheme("blue")
  })
})
