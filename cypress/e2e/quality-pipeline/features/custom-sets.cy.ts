import { CustomSet } from "@page-object/custom-set"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"
import { Header } from "@page-object/header"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const customSet = new CustomSet()
const opponents = new Opponent()

describe("Save and name", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should create the set with the default name and open the set tab", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)

    customSet.saveSet()

    customSet.setNameInputIs("Archaludon #1")
    customSet.setTabIsOpen()

    customSet.exitEditMode()

    customSet.setTabIsClosed()
  })

  it("Should number the sets of the same Pokémon in sequence", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10)
    customSet.saveSet()
    customSet.exitEditMode()

    build.selectPokemon("Archaludon")
    build.clearEvs()
    build.atkEvs(20)
    customSet.saveSet()

    customSet.setNameInputIs("Archaludon #2")
  })

  it("Should show the child row under the Pokémon with the new name", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()

    customSet.renameSet("My Archaludon Bulk")
    customSet.setNameInputIs("My Archaludon Bulk")
    customSet.exitEditMode()

    build.openPokemonTable()

    customSet.firstRowNameIs("My Archaludon Bulk")
  })
})

describe("Use a set", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should apply the saved spread when the child row is selected", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.exitEditMode()

    team.add("Aerodactyl")
    team.selectPokemon("Archaludon")

    build.clearEvs()
    build.evsIs(0, 0, 0, 0, 0, 0)

    build.openPokemonTable()
    customSet.selectFirstRow()

    build.evsIs(10, 0, 0, 0, 0, 15)
  })

  it("Should show the name of the active set in the build", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.selectFirstRow()

    customSet.activeSetNameIsDisplayed()
  })

  it("Should describe the set on the child row", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.exitEditMode()

    build.openPokemonTable()

    customSet.firstRowContains("Archaludon #1")
  })
})

describe("Edit, duplicate and delete", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should save the changes made while the set is in edit mode", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.editRowAt(0)

    build.clearEvs()
    build.hpEvs(5).atkEvs(10)
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.selectFirstRow()

    build.evsIs(5, 10, 0, 0, 0, 0)
  })

  it("Should duplicate a set keeping the original", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10)
    customSet.saveSet()
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.rowsCountIs(1)

    customSet.duplicateRowAt(0)

    customSet.rowsCountIs(2)
  })

  it("Should delete only the chosen set", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10)
    customSet.saveSet()
    customSet.exitEditMode()

    build.selectPokemon("Archaludon")
    build.clearEvs()
    build.atkEvs(20)
    customSet.saveSet()
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.rowsCountIs(2)

    customSet.deleteRowAt(1)

    customSet.rowsCountIs(1)
  })
})

describe("Change the Pokémon of a slot with an active set", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should clear the active set and offer Save set again", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.exitEditMode()

    build.openPokemonTable()
    customSet.selectFirstRow()

    customSet.activeSetNameIsDisplayed()

    build.selectPokemon("Aerodactyl")

    customSet.noActiveSetNameIsDisplayed()
    customSet.saveSetButtonIsVisible()
    customSet.updateButtonIsHidden()
  })
})

describe("Name on the opponent card", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should name the set on the card when the opponent build matches a saved set", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    team.add("Tyranitar")

    opponents.deleteAll()
    const opponentBuild = opponents.add("Archaludon")
    opponentBuild.openPokemonTable()
    customSet.selectFirstRow()

    opponents.get("Archaludon").setLabelIs("Bulky")
  })

  it("Should not name any set when the opponent build does not match", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    team.add("Tyranitar")

    opponents.deleteAll()
    opponents.add("Archaludon")

    opponents.get("Archaludon").hasNoSetLabel()
  })
})
