import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const teamsWidget = new TeamsWidget()

describe("Offensive optimizer coverage on desktop", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["chi-yu"])
  })

  it("Should report the full coverage when every target is knocked out", () => {
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["flutter-mane-high-spd"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("OHKO")

    chiYu.optimizeBulk()

    chiYu.bestEffortLabelIsHidden()
    chiYu.outOfReachLabelIsHidden()
    chiYu.optimizationCostIs("Costs 13 SPs — SpA 13")
    chiYu.optimizedStats(["spa"])
  })

  it("Should report the partial coverage when only some targets are knocked out", () => {
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["incineroar"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("OHKO")

    chiYu.optimizeBulk()

    chiYu.bestEffortLabelIs("Knocks out 1 of 2 targets")
    chiYu.optimizationCostIs("Costs 13 SPs — SpA 13")
  })

  it("Should name the pending target and its chance when the coverage is partial", () => {
    teamsWidget.importPokepaste(poke["dragonite-dragon-claw"])
    opponents.importPokemon(poke["indeedee-f"])
    opponents.importPokemon(poke["kingambit-life-orb"])

    const dragonite = team.selectPokemon("Dragonite")
    dragonite.selectStatsModifier("atk", "+6")
    dragonite.selectSurvivalThreshold("OHKO")

    dragonite.optimizeBulk()

    dragonite.bestEffortLabelIs("Knocks out 1 of 2 targets")
    dragonite.outOfReachLabelIs("Best result: Kingambit — 87.5% chance to OHKO")
  })

  it("Should state that no spread reaches the KO when every target survives", () => {
    opponents.importPokemon(poke["incineroar"])
    opponents.importPokemon(poke["dondozo"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("OHKO")

    chiYu.optimizeBulk()

    chiYu.optimizationImpossibleIsVisible()

    chiYu.okOptimizationImpossible()

    chiYu.optimizationButtonsAreHidden()
  })

  it("Should report no investment needed when the coverage is already reached", () => {
    opponents.importPokemon(poke["ting-lu"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("2HKO")

    chiYu.optimizeBulk()

    chiYu.noSolutionNeededIsVisible()
    chiYu.okNotNeeded()
    chiYu.optimizationButtonsAreHidden()
  })

  it("Should keep the proposed sps when a partial proposal is applied", () => {
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["incineroar"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("OHKO")

    chiYu.optimizeBulk()
    chiYu.applyOptimization()

    chiYu.spValueIs("spa", 13)
    chiYu.optimizationButtonsAreHidden()
  })

  it("Should restore the original sps when a partial proposal is discarded", () => {
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["incineroar"])

    const chiYu = team.selectPokemon("Chi-Yu")
    chiYu.selectSurvivalThreshold("OHKO")

    chiYu.optimizeBulk()
    chiYu.discardOptimization()

    chiYu.spValueIs("spa", 4)
    chiYu.optimizationButtonsAreHidden()
  })
})
