import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const teamsWidget = new TeamsWidget()
const field = new Field()

describe("Success chance of the defensive optimizer on desktop", () => {
  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["amoonguss-success-chance"])
    opponents.importPokemon(poke["chien-pao-success-chance"])
    opponents.importPokemon(poke["chi-yu-success-chance"])
  })

  it("Should start guaranteeing the survival with the roll level unlocked", () => {
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.successChanceIs("100%")
    opponents.rollLevelIsUnlocked()
  })

  it("Should suggest round chances", () => {
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.successChanceOptionsAre(["100%", "90%", "85%", "80%", "75%", "50%"])
  })

  it("Should protect only one attacker when the survival is guaranteed", () => {
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.optimizeBulk()

    amoonguss.optimizationVerdictIs("Survives 1 of 2 attackers")
    amoonguss.optimizationCostIs("Costs 40 SPs — HP 10, Def 30")
    amoonguss.successChancesLabelIsHidden()
  })

  it("Should protect both attackers and show the chance of each one when 90% is accepted", () => {
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("90%")

    amoonguss.optimizeBulk()

    amoonguss.optimizationVerdictIs("Survives all 2 attackers")
    amoonguss.optimizationCostIs("Costs 65 SPs — HP 24, Def 20, SpD 21")
    amoonguss.successChancesLabelIs("Chien-Pao 93.7%, Chi-Yu 93.7% of the time")
  })

  it("Should spend fewer SPs when a lower chance is accepted", () => {
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("50%")

    amoonguss.optimizeBulk()

    amoonguss.optimizationCostIs("Costs 46 SPs — HP 18, Def 15, SpD 13")
    amoonguss.successChancesLabelIs("Chien-Pao 50%, Chi-Yu 50% of the time")
  })

  it("Should apply the spread found with the accepted risk", () => {
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("90%")
    amoonguss.optimizeBulk()

    amoonguss.applyOptimization()

    amoonguss.spValueIs("hp", 24)
    amoonguss.spValueIs("def", 20)
    amoonguss.spValueIs("spd", 21)
  })

  it("Should lock the roll level on high when a risk is accepted", () => {
    opponents.selectRollLevel("low")
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.selectSuccessChance("90%")

    opponents.rollLevelIs("high")
    opponents.rollLevelIsLocked()
  })

  it("Should unlock the roll level and keep it on high when the survival is guaranteed again", () => {
    opponents.selectRollLevel("low")
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("90%")

    amoonguss.selectSuccessChance("100%")

    opponents.rollLevelIsUnlocked()
    opponents.rollLevelIs("high")
  })

  it("Should accept a typed chance with a decimal comma", () => {
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.typeSuccessChance("93,7")
    amoonguss.optimizeBulk()

    opponents.rollLevelIsLocked()
    amoonguss.optimizationVerdictIs("Survives all 2 attackers")
    amoonguss.successChancesLabelIs("Chien-Pao 93.7%, Chi-Yu 93.7% of the time")
  })

  it("Should guarantee the survival when the typed chance is not a number", () => {
    const amoonguss = team.selectPokemon("Amoonguss")

    amoonguss.typeSuccessChance("abc")
    amoonguss.optimizeBulk()

    opponents.rollLevelIsUnlocked()
    amoonguss.optimizationVerdictIs("Survives 1 of 2 attackers")
  })

  it("Should keep the accepted chance after the proposal is discarded", () => {
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("90%")
    amoonguss.optimizeBulk()

    amoonguss.discardOptimization()

    amoonguss.successChanceIs("90%")
    opponents.rollLevelIsLocked()
  })
})

describe("Success chance of the defensive optimizer with attackers of different strength on desktop", () => {
  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["amoonguss-success-chance"])
    opponents.importPokemon(poke["chien-pao-weak-success-chance"])
    opponents.importPokemon(poke["chi-yu-weak-success-chance"])
  })

  it("Should show a different chance for each attacker", () => {
    const amoonguss = team.selectPokemon("Amoonguss")
    amoonguss.selectSuccessChance("80%")

    amoonguss.optimizeBulk()

    amoonguss.optimizationVerdictIs("Survives all 2 attackers")
    amoonguss.successChancesLabelIs("Chien-Pao 87.5%, Chi-Yu 81.2% of the time")
  })
})

describe("Success chance of the defensive optimizer when no investment is needed on desktop", () => {
  it("Should state how often the attack is already survived", () => {
    header.openManyVsTeam()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["iron-hands-success-chance"])
    opponents.importPokemon(poke["landorus-success-chance"])
    const ironHands = team.selectPokemon("Iron Hands")
    ironHands.selectSurvivalThreshold("3HKO")
    ironHands.selectSuccessChance("50%")

    ironHands.optimizeBulk()

    ironHands.solutionNotNeededLabelIs("Already survives the 2HKO 54.7% of the time with no SPs")
  })
})

describe("Success chance of the defensive optimizer against a combined attack on desktop", () => {
  beforeEach(() => {
    header.openManyVsTeam()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["grimmsnarl-success-chance"])
    opponents.importPokemon(poke["charizard-success-chance"])
    opponents.importPokemon(poke["garchomp-success-chance"])
    field.sun()
    opponents.combine("Charizard Mega Y", "Garchomp")
  })

  it("Should stay a best effort when the pair knocks out more often than accepted", () => {
    const grimmsnarl = team.selectPokemon("Grimmsnarl")
    grimmsnarl.selectSuccessChance("50%")

    grimmsnarl.optimizeBulk()

    grimmsnarl.bestEffortLabelIs("Best effort: 87.5% chance to OHKO")
  })

  it("Should survive the pair when a typed 10% is accepted", () => {
    const grimmsnarl = team.selectPokemon("Grimmsnarl")
    grimmsnarl.typeSuccessChance("10")

    grimmsnarl.optimizeBulk()

    grimmsnarl.optimizationVerdictIs("Survives the OHKO 12.5% of the time")
  })
})

describe("Success chance of the offensive optimizer on desktop", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    teamsWidget.importPokepaste(poke["chien-pao-no-atk-success-chance"])
    opponents.importPokemon(poke["rillaboom-success-chance"])
  })

  it("Should stay a best effort when the KO must be guaranteed", () => {
    const chienPao = team.selectPokemon("Chien-Pao")
    chienPao.selectSurvivalThreshold("OHKO")

    chienPao.optimizeBulk()

    chienPao.bestEffortLabelIs("Best effort: 81.3% chance to OHKO")
  })

  it("Should reach the KO with the fewest SPs when 50% is accepted", () => {
    const chienPao = team.selectPokemon("Chien-Pao")
    chienPao.selectSurvivalThreshold("OHKO")
    chienPao.selectSuccessChance("50%")

    chienPao.optimizeBulk()

    chienPao.optimizationVerdictIs("Reaches the OHKO 50% of the time")
    chienPao.optimizationCostIs("Costs 23 SPs — Atk 23")
  })

  it("Should lock the roll level of the targets on high when a risk is accepted", () => {
    opponents.selectRollLevel("medium")
    const chienPao = team.selectPokemon("Chien-Pao")

    chienPao.selectSuccessChance("75%")

    opponents.rollLevelIs("high")
    opponents.rollLevelIsLocked()
  })
})

describe("Success chance of the offensive optimizer with a second attacker on desktop", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    teamsWidget.importPokepaste(`${poke["charizard-success-chance"]}\n\n${poke["garchomp-success-chance"]}`)
    opponents.importPokemon(poke["grimmsnarl-success-chance"])
    team.selectTeamMember("Charizard")
    team.ctrlSelectTeamMember("Garchomp")
  })

  it("Should stay a best effort when the pair must guarantee the KO", () => {
    const charizard = new PokemonBuild("your-team")
    charizard.selectSurvivalThreshold("OHKO")

    charizard.optimizeBulk()

    charizard.bestEffortLabelIs("Best effort: 87.5% chance to OHKO")
  })

  it("Should reach the combined KO when 85% is accepted", () => {
    const charizard = new PokemonBuild("your-team")
    charizard.selectSurvivalThreshold("OHKO")
    charizard.selectSuccessChance("85%")

    charizard.optimizeBulk()

    charizard.optimizationVerdictIs("Reaches the OHKO 87.5% of the time")
    charizard.combinedCostsAreVisible()
  })
})

describe("Success chance on the one vs one screen on desktop", () => {
  const leftPokemonBuild = new PokemonBuild("left-pokemon")
  const rightPokemonBuild = new PokemonBuild("right-pokemon")
  const leftDamageResult = new DamageResult("left-damage-result")
  const rightDamageResult = new DamageResult("right-damage-result")

  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["amoonguss-success-chance"])
    rightPokemonBuild.importPokemon(poke["chien-pao-success-chance"])
  })

  it("Should lock both roll levels on high when a risk is accepted", () => {
    leftDamageResult.withLowRoll()
    rightDamageResult.withMediumRoll()

    leftPokemonBuild.selectSuccessChance("90%")

    leftDamageResult.rollLevelIs("high")
    rightDamageResult.rollLevelIs("high")
    leftDamageResult.rollLevelIsLocked()
    rightDamageResult.rollLevelIsLocked()
  })

  it("Should unlock both roll levels when the survival is guaranteed again", () => {
    leftPokemonBuild.selectSuccessChance("90%")

    leftPokemonBuild.selectSuccessChance("100%")

    leftDamageResult.rollLevelIsUnlocked()
    rightDamageResult.rollLevelIsUnlocked()
  })
})
