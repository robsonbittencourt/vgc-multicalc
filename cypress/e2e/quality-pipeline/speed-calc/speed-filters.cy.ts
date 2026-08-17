import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { SpeedCalc } from "@page-object/speed-calc"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const speedCalc = new SpeedCalc()

describe("Top Usage filter", () => {
  beforeEach(() => {
    header.openSpeedCalc()
    speedCalc.topUsage("60")
    speedCalc.mode("Stats and Meta")
  })

  it("Should hide the Top Usage when the filter is not a regulation", () => {
    speedCalc.topUsageIsVisible()

    speedCalc.filter("Opponents")

    speedCalc.topUsageIsHidden()
  })

  it("Should change which Pokémon reach the scale when the Top Usage changes", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.topUsage("30")
    speedCalc.scaleSettles()

    let narrowNames: string[] = []

    speedCalc.distinctPokemonInScale().then(names => {
      narrowNames = names
    })

    speedCalc.topUsage("All")
    speedCalc.scaleSettles()

    speedCalc.distinctPokemonInScale().then(wideNames => {
      expect(wideNames).to.not.deep.eq(narrowNames)
    })

    speedCalc.topUsage("30")
    speedCalc.scaleSettles()

    speedCalc.distinctPokemonInScale().then(backNames => {
      expect(backNames).to.deep.eq(narrowNames)
    })
  })
})

describe("Fed by the opponent side", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.importPokemon(poke["default-opponents"])

    header.openSpeedCalc()
    speedCalc.filter("Opponents")
  })

  it("Should list the opponents with the Opponent description", () => {
    speedCalc.pokemonBoxHasDescription("Urshifu-Rapid-Strike", "Opponent")
    speedCalc.pokemonBoxHasDescription("Calyrex-Shadow", "Opponent")
    speedCalc.pokemonBoxHasDescription("Incineroar", "Opponent")
  })

  it("Should not describe any tier as Actual while the Opponents filter is on", () => {
    speedCalc.pokemonBoxHasNoDescription("Chien-Pao", "Actual")
  })
})

describe("Fed by another team", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.importPokepaste(poke["default-team"])

    header.openSpeedCalc()
    speedCalc.filter("Team 1")
  })

  it("Should list the members of that team as opponents and keep mine as yours", () => {
    speedCalc.pokemonBoxHasDescription("Incineroar", "Opponent")
    speedCalc.pokemonBoxHasDescription("Dragonite", "Opponent")

    speedCalc.pokemonBoxHasDescription("Koraidon", "Yours")
    speedCalc.pokemonBoxHasDescription("Miraidon", "Yours")
  })

  it("Should not describe any tier as Actual while a team filter is on", () => {
    speedCalc.pokemonBoxHasNoDescription("Miraidon", "Actual")
  })
})
