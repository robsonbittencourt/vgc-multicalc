import { poke } from "@cy-support/e2e"
import { openSpeedCalcWithEmptyTeam } from "@cy-support/setup"
import { PokemonBuild } from "@page-object/pokemon-build"
import { SpeedCalc } from "@page-object/speed-calc"
import { SpeedInsights } from "@page-object/speed-insights"
import { Team } from "@page-object/team"

const team = new Team()
const speedCalc = new SpeedCalc()
const speedInsights = new SpeedInsights()

describe("Selecting a Pokémon on the scale", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()

    team.importPokemon(poke["incineroar"])

    speedCalc.scaleSettles()
  })

  it("Should offer the button only after a Pokémon is selected", () => {
    speedCalc.outspeedButtonIsHidden()

    speedCalc.selectTier("Tyranitar")

    speedCalc.outspeedButtonIs("Tyranitar")
  })

  it("Should show the selected Pokémon on insights", () => {
    speedCalc.selectTier("Tyranitar")

    speedInsights.nameIs("Tyranitar")
  })

  it("Should show the team Pokémon on insights while nothing is selected", () => {
    speedInsights.nameIs("Incineroar")

    speedCalc.outspeedButtonIsHidden()
  })

  it("Should go back to the team Pokémon on insights after changing the Speed", () => {
    speedCalc.selectTier("Tyranitar")

    speedInsights.nameIs("Tyranitar")

    team.selectPokemon("Incineroar").speedEvs(100)

    speedCalc.scaleSettles()

    speedInsights.nameIs("Incineroar")
    speedCalc.outspeedButtonIsHidden()
  })

  it("Should drop the selection when the Speed changes", () => {
    speedCalc.selectTier("Tyranitar")

    speedCalc.outspeedButtonIs("Tyranitar")

    team.selectPokemon("Incineroar").speedEvs(100)

    speedCalc.scaleSettles()

    speedCalc.outspeedButtonIsHidden()
  })

  it("Should keep the spread untouched while the button is not pressed", () => {
    const incineroar = new PokemonBuild("your-team")

    incineroar.evsIs(244, 0, 188, 0, 76, 0)

    speedCalc.selectTier("Tyranitar")

    speedCalc.outspeedButtonIs("Tyranitar")
    incineroar.evsIs(244, 0, 188, 0, 76, 0)
  })
})
