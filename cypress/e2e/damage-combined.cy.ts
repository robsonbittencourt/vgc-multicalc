import { MainPage } from "cypress/page-object/main-page"

describe('Test calcs with combined damage', () => {
  it('Calculate damage with two Pokémon', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Koraidon").combineDamage()
    mainPage.selectTeamMember("Miraidon")

    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()
  })

  it('Chamge second Pokémon in combined damage', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Tornadus")

    mainPage.selectTeamMember("Koraidon").combineDamage()
    mainPage.selectTeamMember("Miraidon")
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()

    mainPage.selectTeamMember("Koraidon").disableCombineDamage()
    mainPage.selectTeamMember("Tornadus").combineDamage()
    mainPage.selectTeamMember("Miraidon")
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(349.1, 412).causeOHKO()
  })

  it('Create new Pokémon and use it with combined damage', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Tornadus")
    mainPage.selectTeamMember("Tornadus").combineDamage()
    mainPage.selectTeamMember("Miraidon")

    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(349.1, 412).causeOHKO()
  })

  it('Remove second Pokémon from calculation when it is deleted', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Koraidon").combineDamage()
    mainPage.selectTeamMember("Miraidon").delete()

    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(9.1, 10.8)
  })
})