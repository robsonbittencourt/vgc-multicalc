import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()
const bottomNav = new BottomNav()

describe("Offensive optimizer coverage on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["chi-yu"])
    bottomNav.goTo("Results")
  })

  it("Should report the partial coverage and name the pending target", () => {
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.bestEffortLabelIs("Knocks out 3 of 9 targets")
    build.pendingTargetIs("Best result: Aerodactyl", "50% chance to OHKO")
  })

  it("Should break the pending target into its own line above the chance", () => {
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.pendingTargetIsOnTwoLines()
  })

  it("Should report the cost of the proposed spread", () => {
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.optimizationCostIs("Costs 31 SPs — SpA 31")
  })

  it("Should keep the proposed sps when the proposal is applied", () => {
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()
    build.applyOptimization()

    build.spValueIs("spa", 31)
    build.optimizationButtonsAreHidden()
  })

  it("Should restore the original sps when the proposal is discarded", () => {
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()
    build.discardOptimization()

    build.spValueIs("spa", 4)
    build.optimizationButtonsAreHidden()
  })

  it("Should report no investment needed when the coverage is already reached", () => {
    build.selectSurvivalThreshold("4HKO")

    build.optimizeBulk()

    build.noSolutionNeededIsVisible()
  })
})

describe("Offensive optimizer with a second attacker on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["pokepaste"])
    bottomNav.goTo("Results")
    teamTabs.activateTeamMember(0)
    teamTabs.longPressTeamMemberToCombine(1)
    build.perAttackerOptionsAreVisible()
  })

  it("Should restore the second attacker sps when the proposal is discarded", () => {
    build.selectSurvivalThreshold("OHKO")
    build.optimizeBulk()

    teamTabs.activateTeamMember(1)
    build.spValueIs("atk", 0)
    build.spValueIs("spa", 32)

    teamTabs.activateTeamMember(0)
    build.discardOptimization()

    teamTabs.activateTeamMember(1)
    build.spValueIs("atk", 20)
    build.spValueIs("spa", 0)
  })
})
