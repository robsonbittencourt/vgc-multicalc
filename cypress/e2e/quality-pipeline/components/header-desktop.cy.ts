import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const opponents = new Opponent()

describe("Navigate between the screens", () => {
  it("Should go to the route of each menu item marking it as the active one", () => {
    header.onlyActiveMenuOptionIs("one-vs-one")

    header.openTeamVsMany()

    header.urlIs("/team-vs-many")
    header.onlyActiveMenuOptionIs("team-vs-many")

    header.openManyVsTeam()

    header.urlIs("/many-vs-team")
    header.onlyActiveMenuOptionIs("many-vs-team")

    header.openSpeedCalc()

    header.urlIs("/speed-calc")
    header.onlyActiveMenuOptionIs("speed-calc")

    header.openProbabilityCalc()

    header.urlIs("/probability-calc")
    header.onlyActiveMenuOptionIs("probability-calc")

    header.openTypeCalc()

    header.urlIs("/type-calc")
    header.onlyActiveMenuOptionIs("type-calc")

    header.openOneVsOne()

    header.urlIs("/one-vs-one")
    header.onlyActiveMenuOptionIs("one-vs-one")
  })

  it("Should clear the second attacker when One vs One is opened", () => {
    header.openTeamVsMany()
    team.importPokepaste(poke["default-team"])
    opponents.deleteAll()
    opponents.importPokemon(poke["chi-yu"])

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")

    opponents.get("Chi-Yu").descriptionContains("AND")

    header.openOneVsOne()
    header.openTeamVsMany()

    opponents.get("Chi-Yu").descriptionDoesNotContain("AND")
  })

  it("Should keep the team and the opponents when the screen changes", () => {
    header.openTeamVsMany()
    team.importPokepaste(poke["default-team"])
    opponents.deleteAll()
    opponents.importPokemon(poke["chi-yu"])

    header.openManyVsTeam()
    header.openTeamVsMany()

    team.teamSizeIs(2)
    team.verifyIfExists("Miraidon")
    team.verifyIfExists("Koraidon")
    opponents.exists("Chi-Yu")
  })
})

describe("Unknown route", () => {
  it("Should show the not found page with a link back to the home", () => {
    cy.visit("http://localhost:4200/this-route-does-not-exist")

    cy.contains("Ops... This page does not exist").should("be.visible")

    cy.contains("Return to home").click()

    cy.contains("Ops... This page does not exist").should("not.exist")
    header.onlyActiveMenuOptionIs("one-vs-one")
  })
})

describe("Theme and color", () => {
  it("Should change the color scheme and the icon of the menu", () => {
    header.openThemeMenu()
    header.selectTheme("Dark")

    header.colorSchemeIs("dark")
    header.themeIconIs("dark_mode")

    header.openThemeMenu()
    header.selectTheme("Light")

    header.colorSchemeIs("light")
    header.themeIconIs("light_mode")
  })

  it("Should change the class of the body when a color is chosen", () => {
    header.openThemeMenu()
    header.selectColor("Green")

    header.bodyHasColorTheme("green")

    header.openThemeMenu()
    header.selectColor("Red")

    header.bodyHasColorTheme("red")
  })

  it("Should keep the choice after a reload", () => {
    header.openThemeMenu()
    header.selectTheme("Dark")
    header.openThemeMenu()
    header.selectColor("Blue")

    cy.reload()

    header.colorSchemeIs("dark")
    header.themeIconIs("dark_mode")
    header.bodyHasColorTheme("blue")
  })
})
