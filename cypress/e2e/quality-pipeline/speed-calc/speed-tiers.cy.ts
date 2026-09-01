import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { openSpeedCalcWithMetaScale } from "@cy-support/setup"
import { SpeedCalc } from "@page-object/speed-calc"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const team = new Team()
const speedCalc = new SpeedCalc()

describe("The scale", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
  })

  it("Should list the tiers sorted by speed", () => {
    speedCalc.speedInOrder()
  })

  smoke("Should place my Pokémon on the scale with the Actual description", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.actualSpeedIs("Tyranitar", 99)
    speedCalc.speedInOrder()
  })
})

describe("The build changes the position on the scale", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
  })

  it("Should raise the speed when the nature becomes Jolly", () => {
    const pokemon = team.importPokemon(poke["tyranitar"])

    speedCalc.actualSpeedIs("Tyranitar", 99)

    pokemon.selectNature("Jolly")

    speedCalc.actualSpeedIs("Tyranitar", 108)
    speedCalc.speedInOrder()
  })

  it("Should raise the speed when more EVs are put into Spe", () => {
    const pokemon = team.importPokemon(poke["tyranitar"])

    pokemon.speedEvs(156)

    speedCalc.actualSpeedIs("Tyranitar", 101)
    speedCalc.speedInOrder()
  })

  it("Should halve the speed when the Pokémon is paralyzed", () => {
    const pokemon = team.importPokemon(poke["tyranitar"])

    pokemon.paralyzed()

    speedCalc.actualSpeedIs("Tyranitar", 49)
  })

  it("Should raise the speed by half with Choice Scarf", () => {
    const pokemon = team.importPokemon(poke["tyranitar"])

    pokemon.selectItem("Choice Scarf")

    speedCalc.actualSpeedIs("Tyranitar", 148)
  })

  it("Should halve the speed with Iron Ball", () => {
    const pokemon = team.importPokemon(poke["tyranitar"])

    pokemon.selectItem("Iron Ball")

    speedCalc.actualSpeedIs("Tyranitar", 49)
  })

  it("Should double the speed when Unburden is activated", () => {
    const pokemon = team.importPokemon(poke["sneasler"])

    pokemon.selectAbility("Unburden")
    pokemon.activateAbility()

    speedCalc.actualSpeedIs("Sneasler", 378)
    speedCalc.speedInOrder()
  })
})

describe("My Whole Team toggle", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
  })

  it("Should list my team members and remove them when the toggle is turned off", () => {
    team.importPokemon(poke["tyranitar"])
    team.importPokemon(poke["incineroar"])
    team.selectPokemon("Tyranitar")

    speedCalc.scaleSettles()

    speedCalc.pokemonBoxHasDescription("Incineroar", "Your")

    speedCalc.toggleMyWholeTeam()

    speedCalc.pokemonBoxHasNoDescription("Incineroar", "Your")
  })

  it("Should keep the Pokémon being edited marked as mine when the toggle is turned off", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.pokemonBoxHasDescription("Tyranitar", "Your")

    speedCalc.toggleMyWholeTeam()

    speedCalc.pokemonBoxHasDescription("Tyranitar", "Your")
  })

  it("Should keep the tier of the Pokémon being edited highlighted when the toggle is turned off", () => {
    team.importPokemon(poke["tyranitar"])

    speedCalc.yourTeamBoxIsHighlighted("Tyranitar")

    speedCalc.toggleMyWholeTeam()

    speedCalc.yourTeamBoxIsHighlighted("Tyranitar")
  })

  it("Should highlight the tier of a team member while the toggle is on", () => {
    teamsWidget.importPokepaste(poke["default-team"])

    speedCalc.scaleSettles()

    speedCalc.yourTeamBoxIsHighlighted("Koraidon")
  })
})

describe("Opponent side options", () => {
  beforeEach(() => {
    openSpeedCalcWithMetaScale()
    team.importPokemon(poke["tyranitar"])
  })

  it("Should put the speed modifier at minus one when Icy Wind is turned on", () => {
    speedCalc.speedModifierIs("--")

    speedCalc.icyWind()

    speedCalc.speedModifierIs("-1")

    speedCalc.icyWind()

    speedCalc.speedModifierIs("--")
  })

  it("Should raise the opponents speed when the modifier is chosen by hand", () => {
    speedCalc.speedModifierIs("--")

    speedCalc.speedModifier("+2")

    speedCalc.speedModifierIs("+2")
    speedCalc.speedInOrder()
  })

  it("Should lower the opponents speed when a negative modifier is chosen by hand", () => {
    speedCalc.speedModifier("-2")

    speedCalc.speedModifierIs("-2")
    speedCalc.speedInOrder()
  })

  it("Should keep the scale sorted with every opponent option turned on", () => {
    speedCalc.icyWind()
    speedCalc.paralyzed()
    speedCalc.speedModifier("+2")

    speedCalc.speedInOrder()
  })
})
