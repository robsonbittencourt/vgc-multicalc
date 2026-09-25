import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE } from "@cy-support/setup"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()
const shell = new MobileCalcShell()

describe("Optimize damage on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    shell.isReady()
    build.activateRightPokemon()
    build.importPokemon(poke["flutter-mane"])
    build.activateLeftPokemon()
    build.importPokemon(poke["chi-yu"])
    build.ensureEvMode()
    build.selectHighRoll()
  })

  it("Should offer the optimizer to the attacking Pokémon", () => {
    build.optimizeBulkIsVisible()
  })

  it("Should propose the minimum Special Attack that guarantees the OHKO", () => {
    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.optimizedStats(["spa"])
    build.spValueIs("spa", 100)
  })

  it("Should restore the original sps when the proposal is discarded", () => {
    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()
    build.spValueIs("spa", 100)

    build.discardOptimization()

    build.spValueIs("spa", 28)
    build.optimizationButtonsAreHidden()
  })

  it("Should keep the proposed sps when the proposal is applied", () => {
    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()
    build.applyOptimization()

    build.spValueIs("spa", 100)
    build.optimizationButtonsAreHidden()
  })

  it("Should state that no spread reaches the KO when it is impossible", () => {
    build.activateRightPokemon()
    build.importPokemon(poke["incineroar"])
    build.activateLeftPokemon()

    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.optimizationImpossibleIsVisible()

    build.okOptimizationImpossible()

    build.optimizationButtonsAreHidden()
  })

  it("Should propose the best reachable chance when the KO is not guaranteed", () => {
    build.activateRightPokemon()
    build.importPokemon(poke["flutter-mane-high-spa"])
    build.activateLeftPokemon()
    build.importPokemon(poke["annihilape"])

    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")

    build.optimizeBulk()

    build.optimizedStats(["atk"])
    build.spValueIs("atk", 228)
  })
})

describe("Optimize damage keeping the SPs on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    shell.isReady()
    build.activateRightPokemon()
    build.importPokemon(poke["flutter-mane"])
    build.activateLeftPokemon()
    build.importPokemon(poke["chi-yu-keep"], false)
    build.selectHighRoll()
  })

  it("Should lower the Special Attack to what the OHKO needs and keep the other SPs", () => {
    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("OHKO")
    build.toggleKeepOffensiveSps()

    build.optimizeBulk()
    build.applyOptimization()

    build.spValueIs("hp", 4)
    build.spValueIs("atk", 6)
    build.spValueIs("def", 2)
    build.spValueIs("spa", 13)
    build.spValueIs("spd", 5)
    build.spValueIs("spe", 12)
  })
})
