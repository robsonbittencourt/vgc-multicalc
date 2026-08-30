import { poke } from "@cy-support/e2e"
import { CustomSet } from "@page-object/custom-set"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Snackbar } from "@page-object/snackbar"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuild("your-team")
const snackbar = new Snackbar()
const opponents = new Opponent()
const customSet = new CustomSet()

function addPokemon(pokemonName: string) {
  team.clickOnAdd().selectPokemonByFilter(pokemonName, pokemonName)
}

describe("Add a Pokémon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.teamSizeIs(4)
  })

  it("Should enter the add mode and focus the selector when the add tab is clicked", () => {
    team.clickOnAdd()

    team.addTabIsActive()
    build.pokemonSelectorIsFocused()
    team.teamSizeIs(4)
  })

  it("Should create the tab and activate it when a Pokémon is chosen", () => {
    team.clickOnAdd()

    build.selectPokemonByFilter("Pikachu", "Pikachu")

    team.teamSizeIs(5)
    team.tabIsActive("Pikachu")
    build.nameIs("Pikachu")
  })

  it("Should hide the add tab when the team has 6 Pokémon", () => {
    team.addPokemonAvailable()

    addPokemon("Pikachu")
    addPokemon("Marowak")

    team.teamSizeIs(6)
    team.addPokemonUnavailable()
  })
})

describe("Remove a Pokémon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.teamSizeIs(4)
  })

  it("Should remove the Pokémon and activate the next tab", () => {
    team.tabIsActive("Charizard")

    team.selectTeamMember("Charizard").delete()

    team.teamSizeIs(3)
    team.tabIsActive("Dragonite")
    snackbar.messageIs("Pokemon deleted")
  })

  it("Should go back to the add mode when the last Pokémon is removed", () => {
    team.selectTeamMember("Charizard").delete()
    team.selectTeamMember("Dragonite").delete()
    team.selectTeamMember("Venusaur").delete()
    team.selectTeamMember("Incineroar").delete()

    team.isEmpty()
    team.addTabIsActive()
    team.deletePokemonIsHidden()
  })
})

describe("Duplicate a Pokémon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.teamSizeIs(4)
  })

  it("Should create a copy of the Pokémon and show the snackbar", () => {
    team.selectTeamMember("Charizard")

    team.duplicatePokemon()

    team.teamSizeIs(5)
    team.pokemonTabsCountIs("Charizard", 2)
    snackbar.messageIs("Pokemon duplicated")
  })

  it("Should hide the duplicate action when the team is full", () => {
    team.selectTeamMember("Charizard")

    team.duplicateIsVisible()

    addPokemon("Pikachu")
    addPokemon("Marowak")

    team.teamSizeIs(6)
    team.selectTeamMember("Charizard")

    team.duplicateIsHidden()
  })
})

describe("Reset when the Pokémon changes", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should clear the boosts, the Commander and the hp percentage on the screen", () => {
    const dondozo = team.add("Dondozo")
    dondozo.boostsIs(0, 0, 0, 0, 0)

    dondozo.selectStatsModifier("atk", "+2")
    dondozo.hpPercentage(50)
    dondozo.activateCommander()

    dondozo.boostsIs(2, 2, 2, 2, 2)
    dondozo.hpPercentageIs(50)
    dondozo.commanderIsActivated()

    dondozo.selectPokemonByFilter("Pikachu", "Pikachu")

    dondozo.nameIs("Pikachu")
    dondozo.boostsIs(0, 0, 0, 0, 0)
    dondozo.hpPercentageIs(100)
  })
})

describe("Change the active Pokémon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])
  })

  it("Should change the build and recalculate the result when another tab is clicked", () => {
    team.selectTeamMember("Miraidon")

    build.nameIs("Miraidon")
    build.attackIs(1, "Draco Meteor")
    opponents.get("Tyranitar").damageIs(123.1, 145.1).causeOHKO()

    team.selectTeamMember("Koraidon")

    build.nameIs("Koraidon")
    build.attackIs(1, "Flare Blitz")
    opponents.get("Tyranitar").damageIs(37.6, 44).cause3HKO()
  })

  it("Should clear the active custom set when another tab is clicked", () => {
    const miraidon = team.selectPokemon("Miraidon")
    miraidon.clearEvs()
    miraidon.hpEvs(20)
    customSet.saveSet()
    customSet.exitEditMode()

    team.selectPokemon("Miraidon").openPokemonTable()
    customSet.getFirstCustomSetId("Miraidon").then(setId => {
      customSet.selectCustomSetRow(setId)
    })

    customSet.activeSetNameIsDisplayed()

    team.selectTeamMember("Koraidon")

    customSet.noActiveSetNameIsDisplayed()
    customSet.saveSetButtonIsVisible()
  })
})
