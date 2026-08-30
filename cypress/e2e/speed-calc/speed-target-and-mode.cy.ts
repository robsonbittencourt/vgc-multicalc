import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { SpeedCalc } from "@page-object/speed-calc"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const speedCalc = new SpeedCalc()

const ALL_MODES = ["Stats and Meta", "Stats", "Meta", "Base"]
const STATS_ONLY_MODES = ["Stats", "Base"]

describe("Mode restricted by the filter", () => {
  beforeEach(() => {
    header.openSpeedCalc()
    team.importPokemon(poke["tyranitar"])
  })

  it("Should offer every mode while the filter is a regulation", () => {
    speedCalc.availableModesAre(ALL_MODES)
  })

  it("Should drop the modes that need statistics when the filter is Opponents", () => {
    speedCalc.filter("Opponents")

    speedCalc.availableModesAre(STATS_ONLY_MODES)
  })

  it("Should fall back to Stats when leaving a regulation with a meta mode selected", () => {
    speedCalc.mode("Stats and Meta")

    speedCalc.filter("Opponents")

    speedCalc.modeIs("Stats")
  })

  it("Should keep a stats-only mode untouched when leaving a regulation", () => {
    speedCalc.mode("Base")

    speedCalc.filter("Opponents")

    speedCalc.modeIs("Base")
  })
})

describe("Target Pokémon", () => {
  beforeEach(() => {
    header.openSpeedCalc()
    team.importPokemon(poke["tyranitar"])
    speedCalc.topUsage("All")
  })

  it("Should narrow the scale to the chosen target and restore it when cleared", () => {
    speedCalc.scaleSettles()

    let fullScale: string[] = []

    speedCalc.distinctPokemonInScale().then(names => {
      fullScale = names

      expect(names).to.have.length.above(2)
    })

    speedCalc.selectTarget("Zangoose")
    speedCalc.scaleSettles()

    speedCalc.scalePokemonAre(["Tyranitar", "Zangoose"])

    speedCalc.clearTarget()
    speedCalc.scaleSettles()

    speedCalc.distinctPokemonInScale().then(names => {
      expect(names).to.deep.eq(fullScale)
    })
  })

  it("Should keep the target out of the scale until it is chosen", () => {
    speedCalc.scaleSettles()

    speedCalc.distinctPokemonInScale().then(names => {
      expect(names).to.not.include("Zangoose")
    })

    speedCalc.selectTarget("Zangoose")
    speedCalc.scaleSettles()

    speedCalc.distinctPokemonInScale().then(names => {
      expect(names).to.include("Zangoose")
    })
  })
})

describe("Target cleared by any other filter", () => {
  beforeEach(() => {
    header.openSpeedCalc()
    team.importPokemon(poke["tyranitar"])
    speedCalc.topUsage("All")
  })

  it("Should clear the target when the Top Usage changes", () => {
    speedCalc.selectTarget("Zangoose")
    speedCalc.targetIs("Zangoose")

    speedCalc.topUsage("60")

    speedCalc.targetIs("")
  })

  it("Should clear the target when the Mode changes", () => {
    speedCalc.selectTarget("Zangoose")
    speedCalc.targetIs("Zangoose")

    speedCalc.mode("Base")

    speedCalc.targetIs("")
  })

  it("Should clear the target when the filter changes", () => {
    speedCalc.selectTarget("Zangoose")
    speedCalc.targetIs("Zangoose")

    speedCalc.filter("Opponents")

    speedCalc.targetIs("")
  })
})
