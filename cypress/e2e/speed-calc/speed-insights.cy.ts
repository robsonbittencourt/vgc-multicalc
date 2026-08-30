import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { openSpeedCalcWithEmptyTeam } from "@cy-support/setup"
import { PokemonBuild } from "@page-object/pokemon-build"
import { SpeedCalc } from "@page-object/speed-calc"
import { SpeedInsights } from "@page-object/speed-insights"
import { Team } from "@page-object/team"

const team = new Team()
const speedCalc = new SpeedCalc()
const insights = new SpeedInsights()

describe("Of the selected Pokémon", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
    team.importPokemon(poke["incineroar"])
    speedCalc.scaleSettles()
  })

  smoke("Should describe the speed range of the Pokémon being edited", () => {
    insights.cardIsVisible()
    insights.nameIs("Incineroar")

    insights.baseIs(60)
  })

  it("Should keep the neutral range and the nature variants consistent", () => {
    insights.neutralRangeIsConsistent()
    insights.positiveNatureBeatsNeutralMax()
    insights.negativeNatureIsBelowNeutralMin()
  })

  it("Should list what the metagame uses for that Pokémon", () => {
    insights.usageListIsVisible()
  })
})

describe("Labels following the SP toggle", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
  })

  it("Should switch the labels between EVs and SPs with the toggle", () => {
    team.importPokemon(poke["incineroar"])
    speedCalc.scaleSettles()

    insights.positiveLabelIs("SP 32")
    insights.negativeLabelIs("SP 0")

    new PokemonBuild("your-team").toggleSpsMode()

    insights.positiveLabelIs("EV 252")
    insights.negativeLabelIs("EV 0")
  })
})

describe("Highlighting the most used spread", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
  })

  it("Should point the most common speed only once", () => {
    team.add("Garchomp")
    speedCalc.scaleSettles()

    insights.usageListIsVisible()
    insights.mostCommonSpeedIsHighlighted()
    insights.mostCommonSpeedIsHighlightedOnce()
  })
})

describe("Item modifications", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
  })

  it("Should describe the Choice Scarf speed of a Pokémon that uses it", () => {
    team.add("Garchomp")
    speedCalc.scaleSettles()

    insights.baseIs(102)
    insights.scarfInsightIsVisible("Garchomp")
  })

  it("Should say the Choice Scarf is the most used item only when it is", () => {
    team.add("Hydreigon")
    speedCalc.scaleSettles()

    insights.scarfInsightIsVisible("Hydreigon")
    insights.scarfIsTheMostUsedItem()
  })

  it("Should not claim the Choice Scarf is the most used item when it is not", () => {
    team.add("Garchomp")
    speedCalc.scaleSettles()

    insights.scarfInsightIsVisible("Garchomp")
    insights.scarfIsNotTheMostUsedItem()
  })

  it("Should not show any Choice Scarf line for a Pokémon that does not use it", () => {
    team.importPokemon(poke["incineroar"])
    speedCalc.scaleSettles()

    insights.usageListIsVisible()
    insights.scarfInsightIsHidden()
  })
})

describe("Without statistics", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
  })

  it("Should not break when the Pokémon has no metagame statistics", () => {
    team.add("Zangoose")
    speedCalc.scaleSettles()

    insights.cardIsHidden()
    insights.usageListIsHidden()

    speedCalc.speedInOrder()
  })
})
