import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

describe('Test calcs with Terastal', () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({force: true})
  })
  
  it('Validate the damage with Koraidon Terastallized using Flame Charge', () => {
    team.selectPokemon("Koraidon").selectAttackThree().terastalyze()

    opponents.get("Urshifu Rapid Strike").damageIs(16.5, 19.4).possible6HKO()
    opponents.get("Calyrex Shadow").damageIs(39.4, 46.8).cause3HKO()
    opponents.get("Ogerpon Wellspring").damageIs(30.4, 35.8).haveChanceOfToCause3HKO(38.1)
    opponents.get("Incineroar").possible7HKO()
    opponents.get("Raging Bolt").damageIs(26.4, 31.6).cause4HKO()
    opponents.get("Zamazenta Crowned").damageIs(25, 29.1).cause4HKO()
    opponents.get("Calyrex Ice").damageIs(40.5, 47.3).cause3HKO()
    opponents.get("Amoonguss").damageIs(47.4, 57.5).haveChanceOfToCause2HKO(85.9)
    opponents.get("Terapagos Terastal").damageIs(10.8, 13.3)
    opponents.get("Rillaboom").damageIs(61.9, 74.1).cause2HKO()
  })

  it('Validate the damage with Miraidon using Electro Drift in Terastallyzed Ogerpon', () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Ogerpon Wellspring").terastalyze()
    
    opponents.get("Ogerpon Wellspring").damageIs(126.2, 148.6).causeOHKO()
  })
})