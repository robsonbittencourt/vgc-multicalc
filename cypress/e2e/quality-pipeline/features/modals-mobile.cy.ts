import { poke } from "@cy-support/e2e"
import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { ExportModal } from "@page-object/export-modal"
import { MobileShell } from "@page-object/mobile-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const build = new PokemonBuildMobile()
const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()

describe("Import modal", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should import a Pokémon from the build header", () => {
    bottomNav.goTo("Teams")
    bottomNav.goTo("Results")

    build.importPokemon(poke["tyranitar"])

    build.nameIs("Tyranitar")
  })

  it("Should import a whole team from the Teams tab", () => {
    bottomNav.goTo("Teams")

    teamsWidget.openImportModal().import(poke["pokepaste"])

    bottomNav.goTo("Results")

    teamTabs.teamSizeIs(6)
  })

  it("Should close the modal when the import is cancelled", () => {
    bottomNav.goTo("Teams")

    const importModal = teamsWidget.openImportModal()
    importModal.isOpen()

    importModal.cancel()

    importModal.isClosed()
  })

  it("Should keep the modal inside the narrow screen", () => {
    bottomNav.goTo("Teams")

    teamsWidget.openImportModal().isOpen()

    shell.pageDoesNotOverflowHorizontally()
  })
})

describe("Export modal", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should export the active team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.openImportModal().import(poke["pokepaste"])

    cy.get('[data-cy="export-team-button"]').click({ force: true })

    new ExportModal().pokemonCountIs(6)
  })
})

describe("Team list modal", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should open the team list from the Teams tab", () => {
    bottomNav.goTo("Teams")
    teamsWidget.openImportModal().import(poke["pokepaste"])

    teamsWidget.openTeamList()

    cy.get(".mat-mdc-dialog-container").filter(":visible").should("exist")
  })
})
