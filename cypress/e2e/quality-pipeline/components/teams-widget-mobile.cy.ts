import { poke } from "@cy-support/e2e"
import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const bottomNav = new BottomNav()

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

describe("Activate and rename", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should activate the clicked team", () => {
    bottomNav.goTo("Teams")

    teamsWidget.activeTeamNameIs("Team 1")

    teamsWidget.selectTeamAt(1)

    teamsWidget.activeTeamNameIs("Team 2")
  })

  it("Should rename the team keeping it after a reload", () => {
    bottomNav.goTo("Teams")

    teamsWidget.updateTeamName("Rain Team")

    teamsWidget.teamNameIs("Rain Team")

    cy.reload()

    teamsWidget.teamNameIs("Rain Team")
  })
})

describe("Import into a team", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should import into a new team and activate it", () => {
    bottomNav.goTo("Teams")

    teamsWidget.teamsCountIs(4)

    teamsWidget.importPokepaste(poke["pokepaste"])

    teamsWidget.activeTeamNameIs("Team 5")
  })
})
