import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const build = new PokemonBuildMobile()
const teamsWidget = new TeamsWidget()
const headerMobile = new HeaderMobile()
const bottomNav = new BottomNav()

describe("Defensive optimizer coverage on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    headerMobile.goToScreen("Many vs Team")
  })

  it("Should report the partial coverage when some attackers cannot be survived", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["dondozo"])
    bottomNav.goTo("Results")
    build.selectSurvivalThreshold("3HKO")

    build.optimizeBulk()

    build.optimizationVerdictIs("Survives 7 of 9 attackers")
  })

  it("Should break the worst attacker into its own line above the chance", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["dondozo"])
    bottomNav.goTo("Results")
    build.selectSurvivalThreshold("3HKO")

    build.optimizeBulk()

    build.pendingTargetIs("Worst case: Venusaur", "99.9% chance to 2HKO")
  })

  it("Should name the worst attacker of the strictest threshold", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["talonflame"])
    bottomNav.goTo("Results")

    build.optimizeBulk()

    build.optimizationVerdictIs("Survives 7 of 9 attackers")
    build.pendingTargetIs("Worst case: Blastoise", "99.9% chance to OHKO")
  })
})
