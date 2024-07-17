import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

describe('Test calcs with combined damage', () => {
  it('Calculate damage with two Pokémon', () => {
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")

    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()
  })

  it('Change second Pokémon in combined damage', () => {
    team.add("Tornadus")

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")
    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()

    team.selectTeamMember("Koraidon").disableCombineDamage()
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    opponents.get("Urshifu Rapid Strike").damageIs(349.1, 412).causeOHKO()
  })

  it('Create new Pokémon and use it with combined damage', () => {
    team.add("Tornadus")
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")

    opponents.get("Urshifu Rapid Strike").damageIs(349.1, 412).causeOHKO()
  })

  it('Remove second Pokémon from calculation when it is deleted', () => {
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon").delete()

    opponents.get("Urshifu Rapid Strike").damageIs(9.1, 10.8)
  })
})