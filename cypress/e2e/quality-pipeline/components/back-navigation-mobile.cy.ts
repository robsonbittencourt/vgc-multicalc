import { poke } from "@cy-support/e2e"
import { goToSpeedCalcMobile, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuildMobile()

describe("Android back button on Team vs Many", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should go back to Teams when the team creation is cancelled", () => {
    bottomNav.goTo("Teams")
    teamsWidget.deleteActiveTeam()
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })

  it("Should keep a team selected when the creation is cancelled", () => {
    bottomNav.goTo("Teams")
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.activeTeamCountIs(1)
    teamsWidget.activeTeamNameIs("Team 1")
  })

  it("Should select the first team when the creation is cancelled and there is no previous team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.deleteActiveTeam()
    teamsWidget.noTeamsMessageIsVisible()

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.visibleTeamsCountIs(0)
    teamsWidget.noTeamsMessageIsVisible()
  })

  it("Should keep a team selected when the creation is cancelled with several teams", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["pokepaste"])

    bottomNav.goTo("Teams")
    teamsWidget.visibleTeamsCountIs(2)
    teamsWidget.activeTeamNameIs("Team 5")

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.activeTeamNameIs("Team 5")
    teamsWidget.activeTeamCountIs(1)

    teamsWidget.selectTeamAt(0)
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()
    cy.go("back")

    teamsWidget.activeTeamNameIs("Team 1")
    teamsWidget.activeTeamCountIs(1)
  })

  it("Should keep the back button working after cancelling the creation several times", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()
    cy.go("back")
    bottomNav.onlyActiveTabIs("Teams")

    teamsWidget.createTeam()
    cy.go("back")
    bottomNav.onlyActiveTabIs("Teams")

    teamsWidget.createTeam()
    cy.go("back")
    bottomNav.onlyActiveTabIs("Teams")

    cy.go("back")
    bottomNav.onlyActiveTabIs("Results")

    bottomNav.tabsAre(["Results", "Teams", "Settings"])
  })

  it("Should go back to Results from the Teams tab", () => {
    bottomNav.goTo("Teams")

    cy.go("back")

    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should go back to Results from the Settings tab", () => {
    bottomNav.goTo("Settings")

    cy.go("back")

    bottomNav.onlyActiveTabIs("Results")
  })
})

describe("Android back button on Speed Calc", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should go back to Teams when the team creation is cancelled", () => {
    bottomNav.goTo("Teams")
    teamsWidget.deleteActiveTeam()
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    cy.go("back")

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })
})
