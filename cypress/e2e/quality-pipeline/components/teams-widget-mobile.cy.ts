import { goToTeamVsManyMobile } from "@cy-support/setup"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()

describe("Create and delete", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should activate the last empty team when a new team is created", () => {
    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.createTeam()

    teamsWidget.teamsCountIs(4)
    teamsWidget.activeTeamNameIs("Team 4")
    teamsWidget.teamNameIs("Team 4")
  })

  it("Should reuse the last empty team instead of adding another one", () => {
    teamsWidget.createTeam()
    teamsWidget.activeTeamNameIs("Team 4")

    teamsWidget.createTeam()

    teamsWidget.teamsCountIs(4)
    teamsWidget.activeTeamNameIs("Team 4")
  })

  it("Should disable the delete when the only remaining team is empty", () => {
    teamsWidget.deleteIsEnabled()

    teamsWidget.deleteActiveTeam()
    teamsWidget.deleteActiveTeam()
    teamsWidget.deleteActiveTeam()

    teamsWidget.teamsCountIs(1)
    teamsWidget.teamBoxIsEmpty("Team 4")
    teamsWidget.deleteIsDisabled()
  })
})
