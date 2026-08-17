import { poke } from "@cy-support/e2e"
import { openSpeedCalcWithMetaScale } from "@cy-support/setup"
import { Field } from "@page-object/field"
import { SpeedCalc } from "@page-object/speed-calc"
import { Team } from "@page-object/team"

const team = new Team()
const field = new Field()
const speedCalc = new SpeedCalc()

describe("Options that change speed", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
  })

  it("Should double my speed with Tailwind on my side", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.actualSpeedIs("Tyranitar", 99)

    field.tailwindAttacker()

    speedCalc.actualSpeedIs("Tyranitar", 198)
    speedCalc.speedInOrder()
  })

  it("Should keep my speed when the Tailwind is on the other side", () => {
    team.importPokemon(poke["tyranitar"])

    field.tailwindDefender()

    speedCalc.actualSpeedIs("Tyranitar", 99)
    speedCalc.speedInOrder()
  })

  it("Should reverse the scale under Trick Room", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.speedInOrder()

    field.trickRoom()

    speedCalc.speedInRerverseOrder()
    speedCalc.actualSpeedIs("Tyranitar", 99)
  })

  it("Should double the speed of a Chlorophyll Pokémon under Sun", () => {
    team.importPokemon(poke["jumpluff"])

    speedCalc.actualSpeedIs("Jumpluff", 178)

    field.sun()

    speedCalc.actualSpeedIs("Jumpluff", 356)
  })
})

describe("Options that are hidden", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
    team.importPokemon(poke["tyranitar"])
  })

  it("Should offer the options that change speed", () => {
    field.optionIsAvailable("sun")
    field.optionIsAvailable("rain")
    field.optionIsAvailable("sand")
    field.optionIsAvailable("snow")
    field.optionIsAvailable("eletric-terrain")
    field.optionIsAvailable("tailwind-attacker")
    field.optionIsAvailable("tailwind-defender")
    field.optionIsAvailable("trick-room")
  })

  it("Should hide the terrains that do not change speed", () => {
    field.optionIsNotAvailable("grassy-terrain")
    field.optionIsNotAvailable("psychic-terrain")
    field.optionIsNotAvailable("misty-terrain")
  })

  it("Should hide the rooms and the damage only options", () => {
    field.optionIsNotAvailable("magic-room")
    field.optionIsNotAvailable("wonder-room")
    field.optionIsNotAvailable("gravity")
    field.optionIsNotAvailable("helping-hand-attacker")
    field.optionIsNotAvailable("critical-hit-attacker")
    field.optionIsNotAvailable("reflect-attacker")
    field.optionIsNotAvailable("light-screen-defender")
  })

  it("Should hide the Ruin abilities", () => {
    field.optionIsNotAvailable("tablets-of-ruin")
    field.optionIsNotAvailable("sword-of-ruin")
    field.optionIsNotAvailable("vessel-of-ruin")
    field.optionIsNotAvailable("beads-of-ruin")
  })
})
