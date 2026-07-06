import { poke } from "@cy-support/e2e"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

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

    opponents.get("Urshifu Rapid Strike").damageIs(514.2, 604.5).causeOHKO()
    opponents.get("Calyrex Shadow").damageIs(129.1, 152.5).causeOHKO()
    opponents.get("Ogerpon Wellspring").damageIs(122.4, 144.3).causeOHKO()
    opponents.get("Incineroar").damageIs(110.4, 130.3).causeOHKO()
    opponents.get("Raging Bolt").damageIs(26.4, 31.1).cause4HKO()
    opponents.get("Zamazenta Crowned").damageIs(89, 105.2).haveChanceOfToCauseOHKO(37.5)
    opponents.get("Calyrex Ice").damageIs(87.4, 103.3).haveChanceOfToCauseOHKO(25)
    opponents.get("Amoonguss").damageIs(59.3, 69.8).cause2HKO()
    opponents.get("Terapagos Terastal").damageIs(51.9, 61.3).haveChanceOfToCause2HKO(97.7)
    opponents.get("Rillaboom").damageIs(51.2, 60.4).cause2HKO()
  })
})

describe("Test calcs with second team member Pokémon", () => {
  it("Validate the damage with Koraidon using Collision Course", () => {
    team.selectPokemon("Koraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(72.5, 85.7).cause2HKO()
    opponents.get("Calyrex Shadow").doesNotCauseAnyDamage()
    opponents.get("Ogerpon Wellspring").damageIs(65.7, 77.5).cause2HKO()
    opponents.get("Incineroar").damageIs(152.2, 179.1).causeOHKO()
    opponents.get("Raging Bolt").damageIs(58.8, 70.1).cause2HKO()
    opponents.get("Zamazenta Crowned").damageIs(69.7, 84.3).cause2HKO()
    opponents.get("Calyrex Ice").damageIs(43.4, 51.2).haveChanceOfToCause2HKO(6.3)
    opponents.get("Amoonguss").damageIs(26, 31).cause4HKO()
    opponents.get("Terapagos Terastal").damageIs(32.6, 38.6).haveChanceOfToCause3HKO(3.1)
    opponents.get("Rillaboom").damageIs(69, 82.2).cause2HKO()
  })

  it("Validate the damage with Koraidon using Flame Charge", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    opponents.get("Urshifu Rapid Strike").damageIs(18.2, 21.7).possible5HKO()
    opponents.get("Calyrex Shadow").damageIs(43.4, 51.4).haveChanceOfToCause2HKO(8.2)
    opponents.get("Ogerpon Wellspring").damageIs(33.1, 39).haveChanceOfToCause3HKO(99.8)
    opponents.get("Incineroar").damageIs(14.4, 16.9).possible6HKO()
    opponents.get("Raging Bolt").damageIs(14.7, 17.7).possible6HKO()
    opponents.get("Zamazenta Crowned").damageIs(27, 32.2).cause4HKO()
    opponents.get("Calyrex Ice").damageIs(43.4, 52.1).haveChanceOfToCause2HKO(10.9)
    opponents.get("Amoonguss").damageIs(52.9, 63).cause2HKO()
    opponents.get("Terapagos Terastal").damageIs(12.3, 14.8)
    opponents.get("Rillaboom").damageIs(70, 83.2).cause2HKO()
  })
})
