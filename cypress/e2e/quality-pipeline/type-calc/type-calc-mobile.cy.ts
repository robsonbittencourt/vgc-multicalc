import { poke } from "@cy-support/e2e"
import { buildSingleMemberTeamMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { MobileShell } from "@page-object/mobile-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const build = new PokemonBuildMobile()

describe("Bottom nav tabs", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
  })

  it("Should offer Coverage, Insights, Build and Teams", () => {
    bottomNav.tabsAre(["Coverage", "Insights", "Build", "Teams"])
    bottomNav.onlyActiveTabIs("Coverage")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("Insights")
    bottomNav.onlyActiveTabIs("Insights")

    bottomNav.goTo("Build")
    bottomNav.onlyActiveTabIs("Build")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Coverage")
    bottomNav.onlyActiveTabIs("Coverage")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(150)
    shell.contentScrollIs(150)

    bottomNav.goTo("Insights")

    shell.contentScrollIs(0)

    bottomNav.goTo("Coverage")

    shell.contentScrollIs(150)
  })
})

describe("Coverage tables on a narrow screen", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
  })

  it("Should scroll the tables horizontally without overflowing the page", () => {
    shell.pageDoesNotOverflowHorizontally()
  })

  it("Should show both coverage tables on the Coverage tab", () => {
    cy.get("app-offensive-coverage-mobile").should("exist")
    cy.get("app-defensive-coverage-mobile").should("exist")
  })
})

describe("Table overlay", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
  })

  it("Should open and close the Pokémon table from the Build tab", () => {
    build.openPokemonTable()

    shell.tableOverlayIsOpen()

    shell.closePokemonTable()

    shell.tableOverlayIsClosed()
  })

  it("Should apply the Pokémon selected on the table to the coverage", () => {
    build.selectPokemonFromTable("Hatterene")

    bottomNav.goTo("Coverage")

    cy.get('app-defensive-coverage-mobile [data-cy="pokemon-header"] img').should("have.attr", "alt", "Hatterene")
  })
})
