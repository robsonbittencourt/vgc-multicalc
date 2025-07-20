import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

let defaultTeamData: string
let tyranitarData: string
let flutterManeData: string

before(() => {
  cy.fixture("default-team-data").then(data => {
    defaultTeamData = data
  })

  cy.fixture("tyranitar-data").then(data => {
    tyranitarData = data
  })

  cy.fixture("flutter-mane-data").then(data => {
    flutterManeData = data
  })
})

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  team.delete("Team 1")
  team.importPokepaste(defaultTeamData)
})

describe("Edit Opponent Pokémon", () => {
  it("In Team vs Many", () => {
    opponents.deleteAll()
    opponents.importPokemon(tyranitarData)

    opponents.selectDefender("Tyranitar").selectStatsModifier("spd", "+3")

    opponents.get("Tyranitar").damageIs(37, 44).cause3HKO()
  })

  it("In Many vs Team with one attacker", () => {
    cy.get('[data-cy="many-vs-team"]').click({ force: true })
    opponents.deleteAll()
    opponents.importPokemon(tyranitarData)

    opponents.selectAttacker("Tyranitar").selectStatsModifier("atk", "+3")

    opponents.get("Tyranitar").damageIs(203.4, 240.3).causeOHKO()
  })

  it("In Many vs Team with two attackers edit the first", () => {
    cy.get('[data-cy="many-vs-team"]').click({ force: true })
    opponents.deleteAll()
    opponents.importPokemon(tyranitarData)
    opponents.importPokemon(flutterManeData)
    opponents.combine("Tyranitar", "Flutter Mane")

    opponents.selectAttacker("Flutter Mane").selectStatsModifier("spa", "+3")

    opponents.get("Flutter Mane").damageIs(204.5, 242).causeOHKO()
  })

  it("In Many vs Team with two attackers edit the second", () => {
    cy.get('[data-cy="many-vs-team"]').click({ force: true })
    opponents.deleteAll()
    opponents.importPokemon(tyranitarData)
    opponents.importPokemon(flutterManeData)
    opponents.combine("Tyranitar", "Flutter Mane")

    opponents.selectSecondAttacker("Tyranitar").selectStatsModifier("atk", "+1")

    opponents.get("Flutter Mane").damageIs(172.1, 203.4).causeOHKO()
  })
})

describe("Add Pokémon to the Opponent side", () => {
  it("Add three Pokémon to the opponent side", () => {
    opponents.add("Pikachu")
    opponents.add("Tyranitar")
    opponents.add("Lugia")

    opponents.exists("Pikachu")
    opponents.exists("Tyranitar")
    opponents.exists("Lugia")
  })

  it("Delete Pokémon from the opponent side", () => {
    opponents.add("Pikachu")

    opponents.get("Pikachu").delete()

    opponents.doesNotExists("Pikachu")
  })

  it("When delete Pokémon from the opponent side select first Pokémon from the team to edit", () => {
    opponents.add("Pikachu")

    opponents.get("Pikachu").delete()

    team.pokemonOnEditNameIs("Miraidon")
  })

  it("Delete all Pokémon from opponent side", () => {
    opponents.deleteAll()

    opponents.empty()
  })
})
