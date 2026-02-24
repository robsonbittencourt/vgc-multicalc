import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()
const field = new Field()

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

describe("Neutralizing Gas", () => {
  beforeEach(() => {
    team.delete("Team 1")
    team.importPokemon(poke["weezing-galar"])
  })

  it("should disable Sword of Ruin when a team member has Neutralizing Gas ability", () => {
    opponents.selectAttacker("Urshifu Rapid Strike").selectAttackFour()
    opponents.combine("Urshifu Rapid Strike", "Chien-Pao")

    opponents.get("Chien-Pao").damageIs(100.6, 121).causeOHKO()
  })

  it("should NOT disable Sword of Ruin when a team member has an ability other than Neutralizing Gas", () => {
    team.selectPokemon("Weezing").selectAbility("Levitate")

    opponents.selectAttacker("Urshifu Rapid Strike").selectAttackFour()
    opponents.combine("Urshifu Rapid Strike", "Chien-Pao")

    opponents.get("Chien-Pao").damageIs(128.5, 155.1).causeOHKO()
  })

  it("should disable Sword of Ruin when Neutralizing Gas is enabled in the field", () => {
    team.selectPokemon("Weezing").selectAbility("Levitate")

    field.neutralizingGas()

    opponents.selectAttacker("Urshifu Rapid Strike").selectAttackFour()
    opponents.combine("Urshifu Rapid Strike", "Chien-Pao")

    opponents.get("Chien-Pao").damageIs(100.6, 121).causeOHKO()
  })
})
