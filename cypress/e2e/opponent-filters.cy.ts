import { CustomSet } from "@page-object/custom-set"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { Header } from "@page-object/header"

const header = new Header()
const team = new Team()
const opponents = new Opponent()
const customSet = new CustomSet()

beforeEach(() => {
  header.selectChampions()
  cy.get('[data-cy="team-vs-many"]').click({ force: true })
  team.delete("Team 1")
})

describe("Opponent Set filter", () => {
  it("Filter opponents by custom set, showing only the matching card", () => {
    team.add("Archaludon")
    customSet.saveSet()
    customSet.renameSet("Bulky")
    customSet.exitEditMode()

    opponents.deleteAll()
    opponents.add("Archaludon")
    opponents.add("Aerodactyl")

    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")

    opponents.filterBySet("Archaludon - Bulky")

    opponents.exists("Archaludon")
    opponents.doesNotExists("Aerodactyl")

    opponents.clearSetFilter()

    opponents.exists("Archaludon")
    opponents.exists("Aerodactyl")
  })

  it("Filter opponents by set substring, showing every Pokémon sharing the tag", () => {
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

describe("Opponent Team filter", () => {
  it("Show only the selected saved team as opponents, then restore on clear", () => {
    team.add("Archaludon")
    team.add("Aerodactyl")
    team.updateTeamName("My Team")

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

  it("Only lists teams that have at least one Pokémon", () => {
    team.add("Archaludon")
    team.updateTeamName("Filled Team")

    opponents.deleteAll()
    opponents.add("Tyranitar")

    opponents.teamFilterOptions().should("contain", "Filled Team")
  })
})
