import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"

const header = new Header()
const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")
const leftDamageResult = new DamageResult("left-damage-result")

describe("Optimize damage", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["flutter-mane"])
    leftPokemonBuild.ensureEvMode()
  })

  it("Should start in Bulk mode", () => {
    leftPokemonBuild.optimizeModeIs("Bulk")
  })

  it("Should propose the minimum Special Attack that guarantees the OHKO", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.optimizedStats(["spa"])
    leftPokemonBuild.spValueIs("spa", 100)
  })

  it("Should restore the original EVs when the proposal is discarded", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.spValueIs("spa", 100)

    leftPokemonBuild.discardOptimization()

    leftPokemonBuild.spValueIs("spa", 28)
    leftPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should keep the proposed EVs when the proposal is applied", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.applyOptimization()

    leftPokemonBuild.spValueIs("spa", 100)
    leftPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should state that no spread reaches the KO when it is impossible", () => {
    rightPokemonBuild.importPokemon(poke["incineroar"])

    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.optimizationImpossibleIsVisible()

    leftPokemonBuild.okOptimizationImpossible()

    leftPokemonBuild.optimizationButtonsAreHidden()
    leftPokemonBuild.spValueIs("spa", 28)
  })

  it("Should propose a cheaper spread for a 2HKO than the OHKO needs", () => {
    rightPokemonBuild.importPokemon(poke["incineroar"])

    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("2HKO")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.optimizedStats(["spa"])
    leftPokemonBuild.spValueIs("spa", 84)
  })

  it("Should report no investment needed when the KO already happens", () => {
    rightPokemonBuild.importPokemon(poke["sneasler"])

    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.noSolutionNeededIsVisible()
    leftPokemonBuild.okNotNeeded()
    leftPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should propose the best reachable chance when the KO is not guaranteed", () => {
    leftPokemonBuild.importPokemon(poke["annihilape"])
    rightPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])

    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.bestEffortLabelIs("Best effort: 81.3% chance to OHKO")
    leftPokemonBuild.optimizedStats(["atk"])
    leftPokemonBuild.spValueIs("atk", 228)
  })

  it("Should restore the original EVs when a best effort proposal is discarded", () => {
    leftPokemonBuild.importPokemon(poke["annihilape"])
    rightPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])

    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.spValueIs("atk", 228)

    leftPokemonBuild.discardOptimization()

    leftPokemonBuild.spValueIs("atk", 252)
    leftPokemonBuild.optimizationButtonsAreHidden()
  })

  it("Should offer the Update Nature option in Damage mode", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")

    leftPokemonBuild.updateNatureCheckboxIsVisible()
  })

  it("Should switch back to Bulk and propose a defensive spread again", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")

    leftPokemonBuild.selectOptimizeMode("Bulk")

    leftPokemonBuild.optimizeModeIs("Bulk")

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.noSolutionNeededIsVisible()
  })
})

describe("Optimize damage using the roll level of the attacking side", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["baxcalibur"])
    rightPokemonBuild.importPokemon(poke["rhyperior"])
    leftPokemonBuild.ensureEvMode()
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")
  })

  it("Should reach the KO on the attacker high roll", () => {
    leftDamageResult.withHighRoll()

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.bestEffortLabelIs("Best effort: 99.9% chance to OHKO")
  })

  it("Should not reach the KO on the attacker low roll", () => {
    leftDamageResult.withLowRoll()

    leftPokemonBuild.optimizeBulk()

    leftPokemonBuild.optimizationImpossibleIsVisible()
  })
})

describe("Optimize damage keeping the SPs", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["chi-yu-keep"], false)
    rightPokemonBuild.importPokemon(poke["flutter-mane"])
  })

  it("Should lower the Special Attack to what the OHKO needs and keep the other SPs", () => {
    leftPokemonBuild.selectOptimizeMode("Damage")
    leftPokemonBuild.selectSurvivalThreshold("OHKO")
    leftPokemonBuild.toggleKeepOffensiveSps()

    leftPokemonBuild.optimizeBulk()
    leftPokemonBuild.applyOptimization()

    leftPokemonBuild.spValueIs("hp", 4)
    leftPokemonBuild.spValueIs("atk", 6)
    leftPokemonBuild.spValueIs("def", 2)
    leftPokemonBuild.spValueIs("spa", 13)
    leftPokemonBuild.spValueIs("spd", 5)
    leftPokemonBuild.spValueIs("spe", 12)
  })
})
