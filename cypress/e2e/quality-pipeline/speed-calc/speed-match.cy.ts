import { poke } from "@cy-support/e2e"
import { openSpeedCalcWithEmptyTeam } from "@cy-support/setup"
import { Snackbar } from "@page-object/snackbar"
import { SpeedCalc } from "@page-object/speed-calc"
import { Team } from "@page-object/team"

const team = new Team()
const speedCalc = new SpeedCalc()
const snackbar = new Snackbar()

describe("Matching a tier", () => {
  beforeEach(() => {
    openSpeedCalcWithEmptyTeam()
  })

  it("Should put enough points into Spe to outspeed the chosen tier", () => {
    const tingLu = team.importPokemon(poke["ting-lu"])
    tingLu.clearEvs()

    team.importPokemon(poke["porygon2"])
    team.selectPokemon("Ting-Lu")

    speedCalc.scaleSettles()

    let porygonSpeed = 0

    speedCalc.speedValueOf("Porygon2").then(speed => {
      porygonSpeed = speed
    })

    speedCalc.selectTier("Porygon2")

    snackbar.messageIs("Ting-Lu set to outspeed Porygon2")

    speedCalc.scaleSettles()

    speedCalc.speedValueOf("Ting-Lu").should(speed => {
      expect(speed).to.be.greaterThan(porygonSpeed)
    })
  })

  it("Should refuse when there are no free points left in the spread", () => {
    team.importPokemon(poke["ting-lu"])
    team.importPokemon(poke["porygon2"])
    team.selectPokemon("Ting-Lu")

    speedCalc.scaleSettles()

    speedCalc.selectTier("Porygon2")

    snackbar.messageIs("Not enough SP to outspeed Porygon2")
  })

  it("Should refuse when no legal spread can reach the tier", () => {
    team.importPokemon(poke["ting-lu"])
    team.importPokemon(poke["miraidon"])
    team.selectPokemon("Ting-Lu")

    speedCalc.filter("Team 1")
    speedCalc.scaleSettles()

    speedCalc.selectTier("Miraidon")

    snackbar.messageIs("Ting-Lu can't outspeed Miraidon with a legal spread")
  })

  it("Should keep the spread untouched when the match is refused", () => {
    const tingLu = team.importPokemon(poke["ting-lu"])

    tingLu.evsIs(56, 128, 68, 0, 252, 0)

    team.importPokemon(poke["miraidon"])
    team.selectPokemon("Ting-Lu")

    speedCalc.filter("Team 1")
    speedCalc.scaleSettles()

    speedCalc.selectTier("Miraidon")

    snackbar.messageIs("can't outspeed")

    team.selectPokemon("Ting-Lu").evsIs(56, 128, 68, 0, 252, 0)
  })
})
