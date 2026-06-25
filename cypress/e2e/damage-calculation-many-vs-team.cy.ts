import { poke } from "@cy-support/e2e"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

beforeEach(() => {
  cy.get('[data-cy="many-vs-team"]').click({ force: true })

  team.delete("Team 1")
  team.importPokepaste(poke["default-team"])

  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
})

describe("Test calcs with Many vs Team activated", () => {
  it("against first team member Pokémon", () => {
    opponents.get("Calyrex Ice").damageIs(113.6, 134).causeOHKO()
    opponents.get("Zamazenta Crowned").damageIs(63.6, 75.5).cause2HKO()
    opponents.get("Calyrex Shadow").damageIs(46, 54.5).haveChanceOfToCause2HKO(50)
    opponents.get("Terapagos Terastal").damageIs(43.1, 51.1).haveChanceOfToCause2HKO(5.1)
    opponents.get("Urshifu Rapid Strike").damageIs(58.5, 69.8).cause2HKO()
    opponents.get("Incineroar").damageIs(22.1, 26.1).haveChanceOfToCause4HKO(7.6)
    opponents.get("Ogerpon Wellspring").damageIs(26.1, 31.2).cause4HKO()
    opponents.get("Amoonguss").damageIs(15.3, 18.1).possible6HKO()
    opponents.get("Rillaboom").damageIs(30.6, 36.9).haveChanceOfToCause3HKO(72.3)
    opponents.get("Raging Bolt").damageIs(85.2, 100).haveChanceOfToCauseOHKO(6.3)
  })

  it("against second team member Pokémon", () => {
    team.selectPokemon("Koraidon")

    opponents.get("Calyrex Ice").damageIs(100, 117.7).causeOHKO()
    opponents.get("Zamazenta Crowned").damageIs(55.5, 65.5).cause2HKO()
    opponents.get("Calyrex Shadow").damageIs(91.1, 107.7).haveChanceOfToCauseOHKO(50)
    opponents.get("Terapagos Terastal").damageIs(46.6, 55.5).haveChanceOfToCause2HKO(73.8)
    opponents.get("Urshifu Rapid Strike").damageIs(51.6, 60.5).cause2HKO()
    opponents.get("Ogerpon Wellspring").damageIs(17.2, 20.5).possible5HKO()
    opponents.get("Raging Bolt").damageIs(93.3, 110).haveChanceOfToCauseOHKO(62.5)
    opponents.get("Incineroar").damageIs(28.3, 33.8).haveChanceOfToCause3HKO(1.1)
    opponents.get("Rillaboom").damageIs(26.6, 31.6).cause4HKO()
    opponents.get("Amoonguss").damageIs(8.3, 10)
  })
})
