import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Snackbar } from "@page-object/snackbar"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuild("your-team")
const snackbar = new Snackbar()

describe("Activate and rename", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
  })

  it("Should activate the clicked team switching the tabs, the build and the result", () => {
    teamsWidget.updateTeamName("Restricted")

    teamsWidget.selectTeam("Team 1")

    teamsWidget.activeTeamNameIs("Team 1")
    teamsWidget.teamNameIs("Team 1")
    team.tabIsActive("Charizard")
    build.nameIs("Charizard")

    teamsWidget.selectTeam("Restricted")

    teamsWidget.activeTeamNameIs("Restricted")
    teamsWidget.teamNameIs("Restricted")
    team.tabIsActive("Miraidon")
    build.nameIs("Miraidon")
  })

  it("Should rename the team updating the box and keeping it after a reload", () => {
    teamsWidget.updateTeamName("My Sun Team")

    teamsWidget.activeTeamNameIs("My Sun Team")

    cy.reload()
    header.openTeamVsMany()

    teamsWidget.teamBoxExists("My Sun Team")

    teamsWidget.selectTeam("My Sun Team")

    teamsWidget.teamNameIs("My Sun Team")
    teamsWidget.activeTeamNameIs("My Sun Team")
  })
})

describe("Create and delete", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should replace the deleted team by an empty one keeping a team always active", () => {
    teamsWidget.importPokepaste(poke["default-team"])
    teamsWidget.updateTeamName("Restricted")
    teamsWidget.teamBoxExists("Restricted")

    teamsWidget.deleteActiveTeam()

    teamsWidget.teamBoxDoesNotExist("Restricted")
    snackbar.messageIs("Team deleted")
    teamsWidget.teamsCountIs(4)
    teamsWidget.activeTeamCountIs(1)
  })
})

describe("Pagination", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
    teamsWidget.importPokepaste(poke["pokepaste"])
    teamsWidget.importPokepaste(poke["pokepaste-cts"])
  })

  it("Should create another page of four slots when less than two remain empty", () => {
    teamsWidget.nextPageIsAvailable()

    teamsWidget.goToRightPage()

    teamsWidget.teamBoxesAre(["Team 5", "Team 6", "Team 7", "Team 8"])
  })

  it("Should activate the first team of the page when it is paginated", () => {
    teamsWidget.activeTeamNameIs("Team 4")

    teamsWidget.goToRightPage()

    teamsWidget.teamBoxesAre(["Team 5", "Team 6", "Team 7", "Team 8"])
    teamsWidget.activeTeamNameIs("Team 5")

    teamsWidget.goToLeftPage()

    teamsWidget.teamBoxesAre(["Team 1", "Team 2", "Team 3", "Team 4"])
    teamsWidget.activeTeamNameIs("Team 1")
  })

  it("Should hide the arrows on the edges", () => {
    teamsWidget.previousPageIsUnavailable()
    teamsWidget.nextPageIsAvailable()

    teamsWidget.goToRightPage()

    teamsWidget.previousPageIsAvailable()
    teamsWidget.nextPageIsUnavailable()
  })

  it("Should import into the empty slot in the middle activating the imported team", () => {
    teamsWidget.selectTeam("Team 2")
    teamsWidget.deleteActiveTeam()
    teamsWidget.teamBoxIsEmpty("Team 2")

    teamsWidget.importPokepaste(poke["pokepaste-forms-1"])

    teamsWidget.activeTeamNameIs("Team 2")
    teamsWidget.teamBoxExists("Team 3")
    teamsWidget.teamBoxesAre(["Team 1", "Team 2", "Team 3", "Team 4"])
  })

  it("Should drop the fully empty page after a reload keeping the remaining teams", () => {
    teamsWidget.nextPageIsAvailable()

    teamsWidget.selectTeam("Team 2")
    teamsWidget.deleteActiveTeam()
    teamsWidget.selectTeam("Team 3")
    teamsWidget.deleteActiveTeam()

    cy.reload()
    header.openTeamVsMany()

    teamsWidget.nextPageIsUnavailable()
    teamsWidget.teamsCountIs(4)
    teamsWidget.teamBoxExists("Team 4")

    teamsWidget.selectTeam("Team 1")

    team.tabIsActive("Charizard")
  })

  it("Should keep the second page after deleting a team of the first one", () => {
    teamsWidget.selectTeam("Team 2")

    teamsWidget.deleteActiveTeam()

    teamsWidget.teamBoxesAre(["Team 1", "Team 2", "Team 3", "Team 4"])
    teamsWidget.teamBoxIsEmpty("Team 2")
    teamsWidget.nextPageIsAvailable()
  })
})
