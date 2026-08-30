import { poke } from "@cy-support/e2e"
import { Opponent } from "@page-object/opponent"
import { Header } from "@page-object/header"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const header = new Header()
const opponents = new Opponent()

describe("Status icons row", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
    opponents.deleteAll()
  })

  it("Should show the status icons row with the Commander button for Dondozo", () => {
    opponents.importPokemon(poke["dondozo"])

    opponents.get("Dondozo").hasStatusIconsRow()

    opponents.get("Dondozo").activateCommander()

    opponents.get("Dondozo").commanderIsActivated()
  })

  it("Should not show the status icons row for a regular Pokémon", () => {
    opponents.importPokemon(poke["tyranitar"])

    opponents.get("Tyranitar").hasNoStatusIconsRow()
  })
})

describe("Mega icon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
    opponents.deleteAll()
  })

  it("Should toggle the mega form when the mega icon of the card is clicked", () => {
    opponents.importPokemon(poke["excadrill-mega"])

    opponents.get("Excadrill Mega").megaIconIsVisible()
    opponents.get("Excadrill Mega").megaIsActive()

    opponents.get("Excadrill Mega").toggleMega()

    opponents.exists("Excadrill")
    opponents.get("Excadrill").megaIsNotActive()

    opponents.get("Excadrill").toggleMega()

    opponents.exists("Excadrill Mega")
    opponents.get("Excadrill Mega").megaIsActive()
  })
})
