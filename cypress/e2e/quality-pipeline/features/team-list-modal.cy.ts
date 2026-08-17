import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const teamsWidget = new TeamsWidget()

describe("Player data", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should open already filled with the name of the team", () => {
    teamsWidget.updateTeamName("Restricted")

    const modal = teamsWidget.openTeamList()

    modal.fieldIs("Battle Team Number / Name", "Restricted")
    modal.fieldIs("Player Name", "")
  })

  it("Should mask the date of birth according to the locale", () => {
    const modal = teamsWidget.openTeamList()

    modal.datePlaceholderIs("MM/DD/YYYY")

    modal.typeDateOfBirth("15062001")

    modal.dateOfBirthIs("15/06/2001")
  })

  it("Should persist the player data when it is exported", () => {
    const modal = teamsWidget.openTeamList()
    modal.fillField("Player Name", "Robson")
    modal.fillField("Player ID", "1234567")
    modal.typeDateOfBirth("15062001")

    modal.export()

    modal.isClosed()

    const reopened = teamsWidget.openTeamList()

    reopened.fieldIs("Player Name", "Robson")
    reopened.fieldIs("Player ID", "1234567")
    reopened.dateOfBirthIs("15/06/2001")
  })

  it("Should not persist the player data when it is cancelled", () => {
    const modal = teamsWidget.openTeamList()
    modal.fillField("Player Name", "Discarded")

    modal.cancel()

    modal.isClosed()

    const reopened = teamsWidget.openTeamList()

    reopened.fieldIs("Player Name", "")
  })

  it("Should disable the button when the team is empty", () => {
    teamsWidget.teamListIsEnabled()

    teamsWidget.deleteActiveTeam()

    teamsWidget.teamListIsDisabled()

    teamsWidget.importPokepaste(poke["default-team"])

    teamsWidget.teamListIsEnabled()
  })
})
