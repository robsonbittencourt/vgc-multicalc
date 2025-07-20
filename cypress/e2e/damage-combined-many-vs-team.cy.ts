import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const team = new Team()
const opponents = new Opponent()

beforeEach(() => {
  cy.get('[data-cy="many-vs-team"]').click({ force: true })

  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
})

describe("Test calcs with opponent combined damage", () => {
  beforeEach(() => {
    team.delete("Team 1")
    team.importPokepaste(poke["default-team"])
  })

  it("Calculate damage with two opponent Pokémon", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")
    opponents.combine("Rillaboom", "Incineroar")

    opponents.get("Dragonite").damageIs(87.5, 104.5).haveChanceOfToCauseOHKO(17.2)
    opponents.get("Incineroar").damageIs(66.4, 79.5).cause2HKO()
  })

  it("Calculate damage after separate two opponent Pokémon", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")
    opponents.separate("Dragonite")

    opponents.get("Urshifu Rapid Strike").damageIs(58.5, 69.8).cause2HKO()
    opponents.get("Dragonite").damageIs(28.9, 34.6).haveChanceOfToCause3HKO(6.5)
  })

  it("Do not allow combine when target already combined", () => {
    opponents.combine("Urshifu Rapid Strike", "Dragonite")
    opponents.combine("Rillaboom", "Dragonite")

    opponents.get("Dragonite").damageIs(87.5, 104.5).haveChanceOfToCauseOHKO(17.2)
    opponents.get("Rillaboom").damageIs(30.6, 36.9).haveChanceOfToCause3HKO(72.3)
  })
})
