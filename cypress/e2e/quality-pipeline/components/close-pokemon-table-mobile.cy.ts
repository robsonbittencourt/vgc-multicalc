import { goToProbabilityCalcMobile, goToSpeedCalcMobile, goToTeamVsManyMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuildMobile()
const shell = new MobileCalcShell()

function createTeamOpeningThePokemonTable() {
  bottomNav.goTo("Teams")
  teamsWidget.createTeam()

  build.pokemonTableIsVisible()
}

describe("Pokemon table header while creating a team", () => {
  it("Should show the search input and the close button on Team vs Many", () => {
    goToTeamVsManyMobile()
    createTeamOpeningThePokemonTable()

    build.pokemonSearchInputIsVisible()
    build.closeButtonIsVisible()
  })

  it("Should show the search input and the close button on Probability Calc", () => {
    goToProbabilityCalcMobile()
    createTeamOpeningThePokemonTable()

    build.pokemonSearchInputIsVisible()
    build.closeButtonIsVisible()
  })

  it("Should show the search input and the close button on Type Calc", () => {
    goToTypeCalcMobile()
    createTeamOpeningThePokemonTable()

    build.pokemonSearchInputIsVisible()
    build.closeButtonIsVisible()
  })

  it("Should show the search input and the close button on Speed Calc", () => {
    goToSpeedCalcMobile()
    createTeamOpeningThePokemonTable()

    build.pokemonSearchInputIsVisible()
    build.closeButtonIsVisible()
  })
})

describe("Closing the Pokemon table of a new team", () => {
  it("Should go back to Teams on Team vs Many", () => {
    goToTeamVsManyMobile()
    createTeamOpeningThePokemonTable()

    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })

  it("Should go back to Teams on Probability Calc", () => {
    goToProbabilityCalcMobile()
    createTeamOpeningThePokemonTable()

    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })

  it("Should go back to Teams on Type Calc", () => {
    goToTypeCalcMobile()
    createTeamOpeningThePokemonTable()

    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })

  it("Should go back to Teams on Speed Calc", () => {
    goToSpeedCalcMobile()
    createTeamOpeningThePokemonTable()

    shell.closePokemonTable()

    bottomNav.onlyActiveTabIs("Teams")
    build.pokemonTableIsHidden()
  })
})
