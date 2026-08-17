import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"
import { PokemonProbability } from "@page-object/pokemon-probability"
import { ProbabilityCard } from "@page-object/probability-card"
import { ProbabilityField } from "@page-object/probability-field"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const probabilityField = new ProbabilityField()
const pokemonProbability = new PokemonProbability()
const pokemonBuild = new PokemonBuild("your-team")

const singleTargetCard = new ProbabilityCard("single-target")
const spreadTargetCard = new ProbabilityCard("spread-target")

describe("Single target moves", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should compound the accuracy of Overheat over the five turns", () => {
    team.importPokemon(poke["chi-yu"])
    pokemonBuild.nameIs("Chi-Yu")

    team.selectPokemon("Chi-Yu").selectAttackOne()

    pokemonProbability.accuracyIs("90")

    singleTargetCard.singleTargetTurnIs(1, "90", "90", "10", "10")
    singleTargetCard.singleTargetTurnIs(2, "81", "99", "1.0", "19")
    singleTargetCard.singleTargetTurnIs(3, "72.9", "99.9", "0.10", "27.1")
    singleTargetCard.singleTargetTurnIs(4, "65.6", "100", "0.010", "34.4")
    singleTargetCard.singleTargetTurnIs(5, "59", "100", "0.001", "41")
  })

  it("Should show the effect columns for a move with a secondary effect", () => {
    team.importPokemon(poke["chi-yu"])
    pokemonBuild.nameIs("Chi-Yu")

    team.selectPokemon("Chi-Yu").selectAttackThree()

    pokemonProbability.accuracyIs("100")

    singleTargetCard.effectAtLeastOnceIs(1, "20")
    singleTargetCard.effectAtLeastOnceIs(3, "48.8")
    singleTargetCard.effectAtLeastOnceIs(5, "67.2")
    singleTargetCard.effectAllTurnsIs(1, "20")
    singleTargetCard.effectAllTurnsIs(3, "0.8")
    singleTargetCard.effectAllTurnsIs(5, "0.032")
  })
})

describe("Spread moves", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should split Heat Wave into hit both, hit one or more and miss both", () => {
    team.importPokemon(poke["chi-yu"])
    pokemonBuild.nameIs("Chi-Yu")

    team.selectPokemon("Chi-Yu").selectAttackTwo()

    pokemonProbability.accuracyIs("90")

    spreadTargetCard.spreadTargetTurnIs(1, "81", "99", "1.0")
    spreadTargetCard.spreadTargetTurnIs(2, "65.6", "98", "2")
    spreadTargetCard.spreadTargetTurnIs(5, "34.9", "95.1", "4.9")
  })

  it("Should show the effect columns of a spread move with a secondary effect", () => {
    team.importPokemon(poke["chi-yu"])
    pokemonBuild.nameIs("Chi-Yu")

    team.selectPokemon("Chi-Yu").selectAttackTwo()

    pokemonProbability.accuracyIs("90")

    spreadTargetCard.effectOnePlusIs(1, "19")
    spreadTargetCard.effectOnePlusIs(5, "65.1")
    spreadTargetCard.effectBothIs(1, "1.0")
    spreadTargetCard.effectBothIs(5, "4.9")
  })
})

describe("Multi hit moves", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
    teamsWidget.delete("Team 1")
  })

  it("Should list the chance per number of hits for a multi hit move", () => {
    const weavile = team.add("Weavile")

    weavile.selectAttackThree()

    pokemonProbability.multiHitIsVisible()
    pokemonProbability.multiHitListsHits(2)
    pokemonProbability.multiHitListsHits(3)
  })

  it("Should not show the multi hit block for a single hit move", () => {
    const weavile = team.add("Weavile")

    weavile.selectAttackOne()

    pokemonProbability.multiHitIsHidden()
  })
})

describe("Field changing the accuracy", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should raise Bleakwind Storm to always hit under Rain and restore it when turned off", () => {
    team.importPokemon(poke["tornadus"])
    pokemonBuild.nameIs("Tornadus")

    team.selectPokemon("Tornadus").selectAttackOne()

    pokemonProbability.accuracyIs("80")

    spreadTargetCard.spreadTargetTurnIs(1, "64", "96", "4")

    probabilityField.toggleRain()

    pokemonProbability.accuracyIs("100")
    spreadTargetCard.spreadTargetTurnIs(1, "100", "100", "0")

    probabilityField.toggleRain()

    pokemonProbability.accuracyIs("80")
    spreadTargetCard.spreadTargetTurnIs(1, "64", "96", "4")
  })

  it("Should drop Thunder to fifty percent under Sun", () => {
    team.importPokemon(poke["kyogre"])
    pokemonBuild.nameIs("Kyogre")

    team.selectPokemon("Kyogre").selectAttackFour()

    pokemonProbability.accuracyIs("70")

    probabilityField.toggleSun()

    pokemonProbability.accuracyIs("50")

    singleTargetCard.singleTargetTurnIs(1, "50", "50", "50", "50")
  })

  it("Should raise Sleep Powder to always hit under Gravity", () => {
    team.importPokemon(poke["jumpluff"])
    pokemonBuild.nameIs("Jumpluff")

    team.selectPokemon("Jumpluff").selectAttackOne()

    pokemonProbability.accuracyIs("75")

    probabilityField.toggleGravity()

    pokemonProbability.accuracyIs("100")

    singleTargetCard.singleTargetTurnIs(1, "100", "100", "0", "0")
  })

  it("Should make Blizzard always hit under Snow", () => {
    team.importPokemon(poke["ninetales-alola"])
    pokemonBuild.nameIs("Ninetales-Alola")

    team.selectPokemon("Ninetales").selectAttackOne()

    pokemonProbability.accuracyIs("70")

    probabilityField.toggleSnow()

    pokemonProbability.accuracyIs("100")

    spreadTargetCard.spreadTargetTurnIs(1, "100", "100", "0")
  })
})

describe("Without a Pokémon being edited", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should ask to select a Pokémon while none is being edited", () => {
    team.clickOnAdd()

    pokemonProbability.emptyMessageIsVisible()
  })
})
