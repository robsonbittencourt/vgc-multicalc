import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

describe('Test calcs with Many vs Team activated', () => {
  beforeEach(() => {
    cy.get('[data-cy="many-vs-team"]').click({force: true})
  })
  
  it('against first team member Pokémon', () => {
    opponents.get("Calyrex Ice").damageIs(113.6, 134).causeOHKO()
    opponents.get("Zamazenta Crowned").damageIs(63.6, 75.5).cause2HKO()
    opponents.get("Calyrex Shadow").damageIs(46, 54.5).haveChanceOfToCause2HKO(50)
    opponents.get("Terapagos Terastal").damageIs(42.6, 50).haveChanceOfToCause2HKO(0.4)
    opponents.get("Urshifu Rapid Strike").damageIs(37.5, 46).approximately3HKO()
    opponents.get("Incineroar").damageIs(35.7, 42.6).cause3HKO()
    opponents.get("Ogerpon Wellspring").damageIs(26.1, 31.2).cause4HKO()
    opponents.get("Amoonguss").damageIs(15.3, 18.1).possible6HKO()
    opponents.get("Rillaboom").damageIs(14.2, 17).possible6HKO()
    opponents.get("Raging Bolt").damageIs(8.5, 10.2)
  })

  it('against second team member Pokémon', () => {
    team.selectPokemon("Koraidon")

    opponents.get("Calyrex Ice").damageIs(100, 117.7).causeOHKO()
    opponents.get("Zamazenta Crowned").damageIs(55.5, 65.5).cause2HKO()
    opponents.get("Calyrex Shadow").damageIs(51.6, 60.5).cause2HKO()
    opponents.get("Terapagos Terastal").damageIs(46.6, 55.5).haveChanceOfToCause2HKO(73.8)
    opponents.get("Urshifu Rapid Strike").damageIs(33.3, 40).approximately3HKO()
    opponents.get("Ogerpon Wellspring").damageIs(23.3, 27.2).haveChanceOfToCause4HKO(60.3)
    opponents.get("Raging Bolt").damageIs(18.8, 22.7).possible5HKO()
    opponents.get("Incineroar").damageIs(15.5, 18.3).possible6HKO()
    opponents.get("Rillaboom").damageIs(12.2, 15).possible7HKO()
    opponents.get("Amoonguss").damageIs(8.3, 10)
  })
})
