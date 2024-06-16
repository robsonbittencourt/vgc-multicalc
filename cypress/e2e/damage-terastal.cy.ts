import { MainPage } from "cypress/page-object/main-page"

describe('Test calcs with Terastal', () => {
  it('Validate the damage with Koraidon Terastallized using Flame Charge', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Koraidon").terastalyze()

    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(16.5, 19.4).possible6HKO()
    mainPage.getOpponent("Calyrex Shadow").damageIs(39.4, 46.8).cause3HKO()
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(30.4, 35.8).haveChanceOfToCause3HKO(38.1)
    mainPage.getOpponent("Incineroar").possible7HKO()
    mainPage.getOpponent("Raging Bolt").damageIs(26.4, 31.6).cause4HKO()
    mainPage.getOpponent("Zamazenta Crowned").damageIs(25, 29.1).cause4HKO()
    mainPage.getOpponent("Calyrex Ice").damageIs(40.5, 47.3).cause3HKO()
    mainPage.getOpponent("Amoonguss").damageIs(47.4, 57.5).haveChanceOfToCause2HKO(85.9)
    mainPage.getOpponent("Terapagos Terastal").damageIs(10.8, 13.3)
    mainPage.getOpponent("Rillaboom").damageIs(61.9, 74.1).cause2HKO()
  })

  it('Validate the damage with Miraidon using Electro Drift in Terastallyzed Ogerpon', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Miraidon")

    mainPage.getOpponent("Ogerpon Wellspring").terastalyze()
    
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(126.2, 148.6).causeOHKO()
  })
})