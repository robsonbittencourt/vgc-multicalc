import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const teamsWidget = new TeamsWidget()

describe("Defensive optimizer coverage on desktop", () => {
  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
  })

  it("Should report the full coverage without naming a pending attacker", () => {
    teamsWidget.importPokepaste(poke["incineroar"])
    opponents.importPokemon(poke["miraidon"])
    opponents.importPokemon(poke["talonflame"])

    const incineroar = team.selectPokemon("Incineroar")

    incineroar.optimizeBulk()

    incineroar.optimizationVerdictIs("Survives all 2 attackers")
    incineroar.optimizationCostIs("Costs 34 SPs — HP 3, SpD 31")
    incineroar.outOfReachLabelIsHidden()
  })

  it("Should report the partial coverage when some attackers cannot be survived", () => {
    teamsWidget.importPokepaste(poke["dondozo"])
    opponents.importPokemon(poke["miraidon"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["chien-pao"])

    const dondozo = team.selectPokemon("Dondozo")
    dondozo.selectSurvivalThreshold("3HKO")

    dondozo.optimizeBulk()

    dondozo.optimizationVerdictIs("Survives 2 of 3 attackers")
    dondozo.optimizationCostIs("Costs 32 SPs — HP 2, SpD 30")
  })

  it("Should name the worst remaining attacker when the coverage is partial", () => {
    teamsWidget.importPokepaste(poke["dondozo"])
    opponents.importPokemon(poke["miraidon"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["chien-pao"])

    const dondozo = team.selectPokemon("Dondozo")
    dondozo.selectSurvivalThreshold("3HKO")

    dondozo.optimizeBulk()

    dondozo.outOfReachLabelIs("Worst case: Miraidon — 99.9% chance to 2HKO")
  })

  it("Should report the partial coverage when no investment is needed at all", () => {
    teamsWidget.importPokepaste(poke["dondozo"])
    opponents.importPokemon(poke["miraidon"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["chien-pao"])

    const dondozo = team.selectPokemon("Dondozo")

    dondozo.optimizeBulk()

    dondozo.noSolutionNeededIsVisible()
    dondozo.okNotNeeded()
    dondozo.optimizationButtonsAreHidden()
  })

  it("Should state that no spread survives the attack when nothing can be protected", () => {
    teamsWidget.importPokepaste(poke["talonflame"])
    opponents.importPokemon(poke["miraidon"])

    const talonflame = team.selectPokemon("Talonflame")

    talonflame.optimizeBulk()

    talonflame.optimizationImpossibleIsVisible()
    talonflame.optimizationImpossibleLabelIs("No spread survives this attack")
    talonflame.optimizationButtonsAreHidden()
  })

  it("Should leave the sps untouched when no spread survives the attack", () => {
    teamsWidget.importPokepaste(poke["talonflame"])
    opponents.importPokemon(poke["miraidon"])

    const talonflame = team.selectPokemon("Talonflame")

    talonflame.optimizeBulk()
    talonflame.okOptimizationImpossible()

    talonflame.spValueIs("hp", 32)
    talonflame.spValueIs("def", 26)
  })

  it("Should keep the partial proposal when it is applied", () => {
    teamsWidget.importPokepaste(poke["dondozo"])
    opponents.importPokemon(poke["miraidon"])
    opponents.importPokemon(poke["flutter-mane"])
    opponents.importPokemon(poke["chien-pao"])

    const dondozo = team.selectPokemon("Dondozo")
    dondozo.selectSurvivalThreshold("3HKO")

    dondozo.optimizeBulk()
    dondozo.applyOptimization()

    dondozo.optimizationButtonsAreHidden()
  })
})
