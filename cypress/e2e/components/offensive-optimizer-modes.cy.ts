import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const teamsWidget = new TeamsWidget()

describe("Optimizer modes per screen", () => {
  describe("Team vs Many", () => {
    beforeEach(() => {
      header.openTeamVsMany()
      opponents.deleteAll()
      teamsWidget.importPokepaste(poke["flutter-mane"])
      opponents.importPokemon(poke["urshifu-rapid-strike"])
    })

    it("Should offer only the damage optimizer", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.optimizeBulkIsVisible()
      flutterMane.optimizeModeToggleIsHidden()
    })

    it("Should offer the OHKO threshold", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.thresholdOptionsAre(["OHKO", "2HKO", "3HKO", "4HKO"])
    })

    it("Should offer the Update Nature option", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.updateNatureCheckboxIsVisible()
    })

    it("Should propose the best reachable chance against the opponent", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")
      flutterMane.ensureEvMode()
      flutterMane.selectSurvivalThreshold("OHKO")

      flutterMane.optimizeBulk()

      flutterMane.bestEffortLabelIs("Best effort: 37.5% chance to OHKO")
      flutterMane.optimizedStats(["spa"])
      flutterMane.spValueIs("spa", 252)
    })
  })

  describe("Many vs Team", () => {
    beforeEach(() => {
      header.openManyVsTeam()
      opponents.deleteAll()
      teamsWidget.importPokepaste(poke["flutter-mane"])
    })

    it("Should offer only the bulk optimizer", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.optimizeBulkIsVisible()
      flutterMane.optimizeModeToggleIsHidden()
    })

    it("Should not offer the OHKO threshold", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.thresholdOptionsAre(["2HKO", "3HKO", "4HKO"])
    })

    it("Should keep the Update Nature option", () => {
      const flutterMane = team.selectPokemon("Flutter Mane")

      flutterMane.toggleUpdateNature()
    })
  })
})
