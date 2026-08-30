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

  it("Should stack the two teams in the same box with Ctrl+Click", () => {
    teamsWidget.hasNoStackedSecondTeam()

    teamsWidget.selectSecondTeam("Team 1")

    teamsWidget.hasStackedSecondTeam()
  })

  it("Should clear the second team when another team is activated", () => {
    teamsWidget.selectSecondTeam("Team 1")
    teamsWidget.hasStackedSecondTeam()

    teamsWidget.selectTeam("Team 3")

    teamsWidget.hasNoStackedSecondTeam()
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
