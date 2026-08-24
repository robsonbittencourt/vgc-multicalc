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

  it("Should only list teams that have Pokemon", () => {
    bottomNav.goTo("Teams")

    teamsWidget.visibleTeamsCountIs(1)
    teamsWidget.activeTeamNameIs("Team 1")
  })

  it("Should keep a single team listed when a new empty team is created", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()

    teamsWidget.visibleTeamsCountIs(1)
  })

  it("Should show the empty message and disable the delete when the last team is deleted", () => {
    bottomNav.goTo("Teams")
    teamsWidget.deleteIsEnabled()

    teamsWidget.deleteActiveTeam()

    teamsWidget.visibleTeamsCountIs(0)
    teamsWidget.noTeamsMessageIsVisible()
    teamsWidget.deleteIsDisabled()
  })
})

describe("Activate and rename", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
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

    teamsWidget.visibleTeamsCountIs(1)

    teamsWidget.importPokepaste(poke["pokepaste"])

    teamsWidget.visibleTeamsCountIs(2)
    teamsWidget.activeTeamNameIs("Team 5")
  })
})
