import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const team = new Team()
const opponents = new Opponent()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  team.delete("Team 1")
  team.importPokepaste(poke["default-team"])

  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
})

describe("Test calcs with first team member Pokémon", () => {
  it("Validate the damage Miraidon", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(296, 349.7).causeOHKO()
    opponents.get("Calyrex Shadow").damageIs(74.2, 88).cause2HKO()
    opponents.get("Ogerpon Wellspring").damageIs(70.5, 83.4).cause2HKO()
    opponents.get("Incineroar").damageIs(64.1, 76.1).cause2HKO()
    opponents.get("Raging Bolt").damageIs(15.1, 18.1).possible6HKO()
    opponents.get("Zamazenta Crowned").damageIs(52, 61.4).cause2HKO()
    opponents.get("Calyrex Ice").damageIs(50.7, 59.9).cause2HKO()
    opponents.get("Amoonguss").damageIs(34.2, 40.6).cause3HKO()
    opponents.get("Terapagos Terastal").damageIs(29.7, 35.6).cause4HKO().afterLeftoversRecovery()
    opponents.get("Rillaboom").damageIs(29.4, 35).haveChanceOfToCause3HKO(11.8)
  })
})

describe("Test calcs with second team member Pokémon", () => {
  it("Validate the damage with Koraidon using Collision Course", () => {
    team.selectPokemon("Koraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(53.7, 64).cause2HKO()
    opponents.get("Calyrex Shadow").doesNotCauseAnyDamage()
    opponents.get("Ogerpon Wellspring").damageIs(49.7, 58.2).haveChanceOfToCause2HKO(98.4)
    opponents.get("Incineroar").damageIs(114.4, 135.3).causeOHKO()
    opponents.get("Raging Bolt").damageIs(44.1, 52.3).haveChanceOfToCause2HKO(18.8)
    opponents.get("Zamazenta Crowned").damageIs(53.1, 63.5).cause2HKO()
    opponents.get("Calyrex Ice").damageIs(32.3, 39.1).haveChanceOfToCause3HKO(99)
    opponents.get("Amoonguss").damageIs(19.6, 23.2).possible5HKO()
    opponents.get("Terapagos Terastal").damageIs(24.2, 28.7).possible5HKO()
    opponents.get("Rillaboom").damageIs(51.7, 61.4).cause2HKO()
  })

  it("Validate the damage with Koraidon using Flame Charge", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    opponents.get("Urshifu Rapid Strike").damageIs(9.1, 10.8)
    opponents.get("Calyrex Shadow").damageIs(22.2, 26.2).haveChanceOfToCause4HKO(8.9)
    opponents.get("Ogerpon Wellspring").damageIs(16.5, 19.7).possible6HKO()
    opponents.get("Incineroar").damageIs(6.9, 8.4)
    opponents.get("Raging Bolt").damageIs(7.3, 8.6)
    opponents.get("Zamazenta Crowned").damageIs(13.5, 16.6).possible6HKO()
    opponents.get("Calyrex Ice").damageIs(22.2, 27).haveChanceOfToCause4HKO(26.5)
    opponents.get("Amoonguss").damageIs(26.4, 31.9).cause4HKO()
    opponents.get("Terapagos Terastal").damageIs(5.9, 7.4)
    opponents.get("Rillaboom").damageIs(34.5, 41.6).cause3HKO()
  })
})
