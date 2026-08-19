import { poke } from "@cy-support/e2e"
import { goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { DefensiveCoverageMobile } from "@page-object/defensive-coverage-mobile"
import { OffensiveCoverageMobile } from "@page-object/offensive-coverage-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const teamsWidget = new TeamsWidget()
const offensiveCoverage = new OffensiveCoverageMobile()
const defensiveCoverage = new DefensiveCoverageMobile()

function importTwoTeams() {
  bottomNav.goTo("Teams")
  teamsWidget.openImportModal().import(poke["pokepaste"])
}

describe("Selection by drag", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    importTwoTeams()
  })

  it("Should ask to drag a team onto another", () => {
    cy.get(".second-team-tip").should("contain.text", "Drag a team onto another")
  })

  it("Should stack the two teams when one is dragged onto the other", () => {
    teamsWidget.hasNoStackedSecondTeam()

    teamsWidget.dragTeamOntoActive("Team 1")

    teamsWidget.hasStackedSecondTeam()
  })

  it("Should separate the teams again", () => {
    teamsWidget.dragTeamOntoActive("Team 1")
    teamsWidget.hasStackedSecondTeam()

    teamsWidget.separateSecondTeam()

    teamsWidget.hasNoStackedSecondTeam()
  })
})

describe("Coverage against the second team", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    importTwoTeams()
    teamsWidget.dragTeamOntoActive("Team 1")
    bottomNav.goTo("Coverage")
  })

  it("Should offer the tera type toggle of the offensive coverage", () => {
    offensiveCoverage.teraTypeToggleIsVisible()
  })

  it("Should transpose the offensive table to my attackers by their targets", () => {
    offensiveCoverage.attackerRowsAre(["Tatsugiri", "Dondozo", "Smeargle", "Chi-Yu", "Whimsicott", "Flutter Mane"])
  })

  it("Should list the opposing Pokémon as the rows of the defensive table", () => {
    defensiveCoverage.targetRowsAre(["Charizard", "Dragonite", "Venusaur", "Incineroar"])
  })

  it("Should go back to the per type tables when the second team is cleared", () => {
    defensiveCoverage.targetRowsAre(["Charizard", "Dragonite", "Venusaur", "Incineroar"])

    bottomNav.goTo("Teams")
    teamsWidget.separateSecondTeam()
    bottomNav.goTo("Coverage")

    defensiveCoverage.rowsCountIs(18)
  })
})
