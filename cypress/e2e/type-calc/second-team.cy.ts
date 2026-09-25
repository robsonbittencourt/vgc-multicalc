import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const teamsWidget = new TeamsWidget()

describe("Selection", () => {
  beforeEach(() => {
    header.openTypeCalc()
    teamsWidget.importPokepaste(poke["default-team"])
  })

  it("Should highlight the second team in its own box with Ctrl+Click", () => {
    teamsWidget.hasNoSecondTeam()

    teamsWidget.selectSecondTeam("Team 1")

    teamsWidget.secondTeamNameIs("Team 1")
    teamsWidget.pairPositionIs("Team 1", "2nd")
    teamsWidget.activeTeamPairPositionIs("1st")
    teamsWidget.hasNoStackedSecondTeam()
  })

  it("Should clear the second team when another team is activated", () => {
    teamsWidget.selectSecondTeam("Team 1")
    teamsWidget.secondTeamNameIs("Team 1")

    teamsWidget.selectTeam("Team 3")

    teamsWidget.hasNoSecondTeam()
  })
})

describe("Selection across pages", () => {
  beforeEach(() => {
    header.openTypeCalc()
    teamsWidget.importPokepaste(poke["default-team"])
    teamsWidget.importPokepaste(poke["pokepaste"])
    teamsWidget.importPokepaste(poke["pokepaste-cts"])
    teamsWidget.importPokepaste(poke["pokepaste-forms-1"])
  })

  it("Should keep one team selected on each page", () => {
    teamsWidget.goToLeftPage()
    teamsWidget.selectTeam("Team 4")

    teamsWidget.goToRightPage()
    teamsWidget.selectSecondTeam("Team 5")

    teamsWidget.secondTeamNameIs("Team 5")
    teamsWidget.teamNameIs("Team 4")

    teamsWidget.goToLeftPage()

    teamsWidget.activeTeamNameIs("Team 4")
    teamsWidget.activeTeamPairPositionIs("1st")
    teamsWidget.secondTeamIsNotOnPage()

    teamsWidget.goToRightPage()

    teamsWidget.secondTeamNameIs("Team 5")
  })
})

describe("Help text", () => {
  it("Should show the help only in the Type Calc", () => {
    header.openTypeCalc()

    teamsWidget.secondTeamHelpIsVisible()

    header.openTeamVsMany()

    teamsWidget.secondTeamHelpIsHidden()

    header.openManyVsTeam()

    teamsWidget.secondTeamHelpIsHidden()
  })
})
