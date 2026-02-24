import { poke } from "@cy-support/e2e"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { DamageResult } from "@page-object/damage-result"

describe("EV Optimizer", () => {
  const leftBuild = new PokemonBuild("left-pokemon")
  const rightBuild = new PokemonBuild("right-pokemon")

  const rightDamageResult = new DamageResult("right-damage-result")

  it("should optimize EVs for survival (Basic Optimization)", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])

    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(140, 0, 236, 0, 0, 0)
  })

  it("should preserve offensive EVs when 'Keep Offensive EVs' is checked", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()
    leftBuild.spaEvs(12)

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])

    leftBuild.toggleKeepOffensiveEvs()
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(140, 0, 236, 12, 0, 0)
  })

  it("should update nature if option is selected", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()
    leftBuild.spaEvs(12)

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])

    leftBuild.toggleUpdateNature()
    leftBuild.toggleKeepOffensiveEvs()
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(68, 0, 204, 12, 0, 0)
  })

  it("should discard optimization", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()
    leftBuild.atkEvs(12)

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])

    leftBuild.optimizeBulk()
    leftBuild.discardOptimization()

    leftBuild.evsIs(0, 12, 0, 0, 0, 0)
  })

  it("should optimize EVs for different survival thresholds (2HKO, 3HKO, 4HKO)", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])
    rightBuild.selectAttackThree()

    leftBuild.optimizeBulk()
    leftBuild.okNoSolution()

    leftBuild.evsIs(0, 0, 0, 0, 0, 0)

    leftBuild.clearEvs()
    leftBuild.selectSurvivalThreshold("3HKO")
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(0, 0, 68, 0, 0, 0)

    leftBuild.clearEvs()
    leftBuild.selectSurvivalThreshold("4HKO")
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(212, 0, 228, 0, 0, 0)
  })

  it.only("should optimize EVs for different rolls", () => {
    leftBuild.importPokemon(poke["flutter-mane"])
    leftBuild.clearEvs()

    rightBuild.importPokemon(poke["urshifu-rapid-strike"])

    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(140, 0, 236, 0, 0, 0)

    leftBuild.clearEvs()
    rightDamageResult.withMediumRoll()
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(68, 0, 204, 0, 0, 0)

    leftBuild.clearEvs()
    rightDamageResult.withLowRoll()
    leftBuild.optimizeBulk()
    leftBuild.applyOptimization()

    leftBuild.evsIs(68, 0, 132, 0, 0, 0)
  })
})

describe("Multi Calc EV Optimizer", () => {
  const team = new Team()
  const opponents = new Opponent()

  it("should optimize EVs against multiple opponents (Many vs Team)", () => {
    cy.get('[data-cy="many-vs-team"]').click({ force: true })
    opponents.deleteAll()

    team.importPokepaste(poke["flutter-mane"])
    const pokemon = team.selectPokemon("Flutter Mane")
    pokemon.clearEvs()

    opponents.importPokemon(poke["urshifu-rapid-strike"])

    pokemon.optimizeBulk()
    pokemon.applyOptimization()

    pokemon.evsIs(140, 0, 236, 0, 0, 0)
  })
})
