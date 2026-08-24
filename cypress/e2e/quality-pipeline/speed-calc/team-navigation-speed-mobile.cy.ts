import { goToSpeedCalcMobile } from "@cy-support/setup"
import { poke } from "@cy-support/e2e"
import { BottomNav } from "@page-object/bottom-nav"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()
const build = new PokemonBuildMobile()
const shell = new MobileCalcShell()

describe("Team creation journeys on Speed Calc", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should survive repeated creations cancelled by the back button", () => {
    bottomNav.goTo("Teams")
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    build.pokemonSearchInputIs("Select a Pokémon")
    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")
    build.pokemonTableIsHidden()

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")

    cy.go("back")

    bottomNav.onlyActiveTabIs("Speed")
    bottomNav.tabsAre(["Speed", "Insights", "Teams", "Settings"])
  })

  it("Should survive repeated creations cancelled by the close button", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    build.closeButtonIsVisible()
    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")
    build.pokemonTableIsHidden()

    cy.go("back")

    bottomNav.onlyActiveTabIs("Speed")
  })

  it("Should walk through the tabs before and after creating a team", () => {
    bottomNav.goTo("Settings")
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Speed")
    bottomNav.goTo("Settings")
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")
  })

  it("Should keep the previously selected team after cancelling with several teams", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["pokepaste"])

    bottomNav.goTo("Teams")
    teamsWidget.visibleTeamsCountIs(2)
    teamsWidget.activeTeamNameIs("Team 5")

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.activeTeamNameIs("Team 5")

    teamsWidget.selectTeamAt(0)
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    shell.closePokemonTable()

    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.activeTeamNameIs("Team 1")
    teamsWidget.visibleTeamsCountIs(2)
  })

  it("Should alternate between creating a team and adding a member from the tabs", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    bottomNav.goTo("Speed")

    teamTabs.visibleTeamSizeIs(4)
    teamTabs.addTeamMember()

    build.pokemonTableIsVisible()
    build.pokemonSearchInputIs("Select a Pokémon")
    shell.closePokemonTable()

    build.pokemonTableIsHidden()
    teamTabs.visibleTeamSizeIs(4)
    bottomNav.onlyActiveTabIs("Speed")
    build.buildIsVisible()

    bottomNav.goTo("Teams")
    teamsWidget.createTeam()
    build.pokemonTableIsVisible()
    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    teamsWidget.activeTeamNameIs("Team 1")
  })
})
