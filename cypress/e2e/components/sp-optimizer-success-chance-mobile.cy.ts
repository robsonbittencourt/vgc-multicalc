import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToSimpleCalcMobile, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const build = new PokemonBuildMobile()
const teamsWidget = new TeamsWidget()
const headerMobile = new HeaderMobile()
const bottomNav = new BottomNav()
const shell = new MobileCalcShell()

describe("Success chance of the defensive optimizer on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    headerMobile.goToScreen("Many vs Team")
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["amoonguss-success-chance"])
    bottomNav.goTo("Results")
    shell.replaceOpponents(`${poke["chien-pao-success-chance"]}\n\n${poke["chi-yu-success-chance"]}`)
  })

  it("Should start guaranteeing the survival", () => {
    build.successChanceIs("100%")
    build.rollLevelIsUnlocked()
  })

  it("Should protect both attackers and show the chance of each one when 90% is accepted", () => {
    build.selectSuccessChance("90%")

    build.optimizeBulk()

    build.optimizationVerdictIs("Survives all 2 attackers")
    build.successChancesLabelIs("Chien-Pao 93.7%, Chi-Yu 93.7% of the time")
  })

  it("Should lock the roll level on high when a risk is accepted", () => {
    build.selectLowRoll()

    build.selectSuccessChance("90%")

    build.rollLevelIsLockedOnHigh()
  })

  it("Should unlock the roll level when the survival is guaranteed again", () => {
    build.selectSuccessChance("90%")

    build.selectSuccessChance("100%")

    build.rollLevelIsUnlocked()
  })

  it("Should accept a typed chance", () => {
    build.typeSuccessChance("93.7")

    build.optimizeBulk()

    build.rollLevelIsLockedOnHigh()
    build.successChancesLabelIs("Chien-Pao 93.7%, Chi-Yu 93.7% of the time")
  })
})

describe("Success chance on the one vs one screen on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["chien-pao-success-chance"])
    build.activateRightPokemon()
    build.importPokemon(poke["amoonguss-success-chance"])
    build.toggleRole("defender")
  })

  it("Should lock the roll level on high when a risk is accepted", () => {
    build.selectLowRoll()

    build.selectSuccessChance("90%")

    build.rollLevelIsLockedOnHigh()
  })

  it("Should report how often the attack is survived", () => {
    build.selectSuccessChance("90%")

    build.optimizeBulk()

    build.optimizationVerdictIs("Survives the OHKO 93.7% of the time")
  })
})
