import { MainPage } from "cypress/page-object/main-page"

describe('Test calcs with stats modifiers in attacker', () => {
  it('Validate the damage Miraidon +1 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+1')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(443.4, 522.2).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(44.1, 51.7).haveChanceOfToCause2HKO(14.1)
  })

  it('Validate the damage Miraidon +2 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+2')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(590.8, 697.1).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(58.8, 69.5).cause2HKO()
  })

  it('Validate the damage Miraidon +3 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+3')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(737.1, 868.5).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(73, 86.8).cause2HKO()
  })

  it('Validate the damage Miraidon +4 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+4')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(885.7, 1043.4).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(88.3, 104).haveChanceOfToCauseOHKO(31.3)
  })

  it('Validate the damage Miraidon +5 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+5')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(1033.1, 1217.1).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(103, 121.3).causeOHKO()
  })
  it('Validate the damage Miraidon +6 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").selectStatsModifier('spa', '+6')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(1182.8, 1392).causeOHKO()
    mainPage.getOpponent("Rillaboom").damageIs(117.7, 138.5).causeOHKO()
  })

  it('Validate the damage Koraidon +1 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+1')
    
    mainPage.getOpponent("Rillaboom").damageIs(124.8, 147.2).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(53.2, 62.7).cause2HKO()
  })

  it('Validate the damage Koraidon +2 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+2')
    
    mainPage.getOpponent("Rillaboom").damageIs(166.4, 195.9).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(70.9, 83.5).cause2HKO()
  })

  it('Validate the damage Koraidon +3 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+3')
    
    mainPage.getOpponent("Rillaboom").damageIs(207.1, 243.6).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(88.3, 103.8).haveChanceOfToCauseOHKO(25)
  })

  it('Validate the damage Koraidon +4 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+4')
    
    mainPage.getOpponent("Rillaboom").damageIs(247.7, 292.3).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(105.6, 124.6).causeOHKO()
  })

  it('Validate the damage Koraidon +5 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+5')
    
    mainPage.getOpponent("Rillaboom").damageIs(289.3, 341.1).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(123.3, 145.4).causeOHKO()
  })
  it('Validate the damage Koraidon +6 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Koraidon").selectAttackThree().selectStatsModifier('atk', '+6')
    
    mainPage.getOpponent("Rillaboom").damageIs(330.9, 389.8).causeOHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(141.1, 166.2).causeOHKO()
  })
})
