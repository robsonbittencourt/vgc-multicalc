import { poke } from "@cy-support/e2e"
import { CustomSet } from "@page-object/custom-set"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"
import { Header } from "@page-object/header"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const opponents = new Opponent()
const customSet = new CustomSet()

describe("By Pokémon", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
    team.add("Tyranitar")
    opponents.deleteAll()
    opponents.add("Archaludon")
    opponents.add("Aerodactyl")
  })

  it("Should reduce the cards to the selected Pokémon and restore them when cleared", () => {
    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")

    opponents.filterByPokemon("Archaludon")

    opponents.exists("Archaludon")
    opponents.doesNotExists("Aerodactyl")

    opponents.clearPokemonFilter()

    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")
  })

  it("Should hide the add card while a filter is active", () => {
    opponents.addIsVisible()

    opponents.filterByPokemon("Archaludon")

    opponents.addIsHidden()

    opponents.clearPokemonFilter()

    opponents.addIsVisible()
  })

  it("Should disable the other two filters while one is active", () => {
    opponents.filterIsEnabled("pokemon")
    opponents.filterIsEnabled("set")
    opponents.filterIsEnabled("team")

    opponents.filterByPokemon("Archaludon")

    opponents.filterIsDisabled("set")
    opponents.filterIsDisabled("team")

    opponents.clearPokemonFilter()

    opponents.filterIsEnabled("set")
    opponents.filterIsEnabled("team")
  })
})

describe("By set", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should reduce the cards to the ones with that custom set", () => {
    team.add("Archaludon")
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    opponents.deleteAll()
    opponents.add("Archaludon")
    opponents.add("Aerodactyl")

    opponents.filterBySet("Archaludon - Bulky")

    opponents.exists("Archaludon")
    opponents.doesNotExists("Aerodactyl")

    opponents.clearSetFilter()

    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")
  })

  it("Should list only the sets that some card is really using", () => {
    team.add("Archaludon")
    customSet.saveSet()
    customSet.renameSet("Set In Use")
    customSet.exitEditMode()

    team.add("Tyranitar")
    customSet.saveSet()
    customSet.renameSet("Set Never Used")
    customSet.exitEditMode()

    opponents.deleteAll()
    const opponentBuild = opponents.add("Archaludon")
    opponentBuild.openPokemonTable()
    customSet.selectFirstRow()

    opponents.get("Archaludon").setLabelIs("Set In Use")

    opponents.setFilterOptions("Set").should($options => {
      const labels = [...$options].map(option => option.textContent!.trim())

      expect(labels).to.deep.eq(["Archaludon - Set In Use"])
    })
  })

  it("Should show every Pokémon sharing the typed set name", () => {
    team.add("Archaludon")
    customSet.saveSet()
    customSet.renameSet("Bulky Offense")
    customSet.exitEditMode()

    team.add("Tyranitar")
    customSet.saveSet()
    customSet.renameSet("Bulky Offense")
    customSet.exitEditMode()

    opponents.deleteAll()
    opponents.add("Archaludon")
    opponents.add("Tyranitar")
    opponents.add("Aerodactyl")

    opponents.typeSetFilter("Bulky Offense")

    opponents.exists("Archaludon")
    opponents.exists("Tyranitar")
    opponents.doesNotExists("Aerodactyl")
  })
})

describe("By team", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should replace the targets by the members of the selected team", () => {
    team.add("Archaludon")
    team.add("Aerodactyl")
    teamsWidget.updateTeamName("My Team")

    opponents.deleteAll()
    opponents.add("Tyranitar")

    opponents.exists("Tyranitar")
    opponents.doesNotExists("Archaludon")

    opponents.filterByTeam("My Team")

    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")
    opponents.doesNotExists("Tyranitar")

    opponents.clearTeamFilter()

    opponents.exists("Tyranitar")
    opponents.doesNotExists("Archaludon")
  })

  it("Should recalculate when a member of the filtered team is edited", () => {
    team.importPokemon(poke["tyranitar"])
    teamsWidget.updateTeamName("Attackers")

    teamsWidget.selectTeam("Team 2")
    team.importPokemon(poke["bronzong"])
    teamsWidget.updateTeamName("Defenders")

    teamsWidget.selectTeam("Attackers")

    opponents.deleteAll()
    opponents.add("Aerodactyl")

    opponents.filterByTeam("Defenders")

    opponents.get("Bronzong").damageIs(29.8, 35.6)

    teamsWidget.selectTeam("Defenders")
    team.selectPokemon("Bronzong").selectNature("Hasty")

    teamsWidget.selectTeam("Attackers")

    opponents.get("Bronzong").damageIs(36.2, 43.1)
  })

  it("Should list only the teams that have at least one Pokémon", () => {
    team.add("Archaludon")
    teamsWidget.updateTeamName("Filled Team")

    opponents.deleteAll()
    opponents.add("Tyranitar")

    opponents.teamFilterOptions().should("contain", "Filled Team")
  })
})
