import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

let tornadusData: string
let defaultTeamData: string
let defaultOpponentsData: string

before(() => {
  cy.fixture("tornadus-data").then((data) => { tornadusData = data })
  cy.fixture("default-team-data").then((data) => { defaultTeamData = data })
  cy.fixture("default-opponents-data").then((data) => { defaultOpponentsData = data })
})

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({force: true})

  team.delete("Team 1")
  team.importPokepaste(defaultTeamData)
  
  opponents.deleteAll()
  opponents.importPokemon(defaultOpponentsData)
})

describe('Test calcs with combined damage', () => {
  it('Calculate damage with two Pokémon', () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()
  })

  it('Change second Pokémon in combined damage', () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.importPokemon(tornadusData)

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()
    
    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()

    team.selectTeamMember("Koraidon").disableCombineDamage()
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    opponents.get("Urshifu Rapid Strike").damageIs(402.2, 474.2).causeOHKO()
  })

  it('Create new Pokémon and use it with combined damage', () => {
    team.importPokemon(tornadusData)
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(402.2, 474.2).causeOHKO()
  })

  it('Remove second Pokémon from calculation when it is deleted', () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon").delete()

    opponents.get("Urshifu Rapid Strike").damageIs(9.1, 10.8)
  })
})