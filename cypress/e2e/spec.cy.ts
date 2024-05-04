import { MainPage } from "cypress/page-object/main-page"

describe('Test calcs with first team member Pokémon', () => {
  it('Validate the damage Flutter Mane', () => {
    const mainPage = new MainPage()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(106.2, 125.1).causeOHKO()
    mainPage.getOpponent("Landorus").damageIs(90.2, 106.7).haveChanceOfToCauseOHKO(37.5)
    mainPage.getOpponent("Gouging Fire").damageIs(73.4, 86.7).cause2OHKO()
    mainPage.getOpponent("Calyrex Shadow").damageIs(70.8, 84).cause2OHKO()
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(67.3, 79.1).cause2OHKO()
    mainPage.getOpponent("Raging Bolt").damageIs(58.4, 69.2).cause2OHKO()
    mainPage.getOpponent("Kyogre").damageIs(48.4, 57.8).haveChanceOfToCause2HKO(93.8)
    mainPage.getOpponent("Incineroar").damageIs(32.6, 38.6).haveChanceOfToCause3HKO(97.9)
  })
})

describe('Test calcs with second team member Pokémon', () => {
  it('Validate the damage with Groudon using Precipice Blades', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Groudon").selectAttackOne()

    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(53.1, 63.4).cause2OHKO()
    mainPage.getOpponent("Landorus").doesNotCauseAnyDamage()
    mainPage.getOpponent("Gouging Fire").damageIs(89.5, 106).haveChanceOfToCauseOHKO(31.3)
    mainPage.getOpponent("Calyrex Shadow").damageIs(64, 76).cause2OHKO()
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(24.5, 28.8).haveChanceOfToCause4HKO(99.7)
    mainPage.getOpponent("Raging Bolt").damageIs(44.1, 51.9).haveChanceOfToCause2HKO(12.1)
    mainPage.getOpponent("Kyogre").damageIs(48.4, 56.7).haveChanceOfToCause2HKO(89.5)
    mainPage.getOpponent("Incineroar").damageIs(100.9, 119.8).causeOHKO()
  })

  it('Validate the damage with Groudon using Heat Crash', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectAttackTwo()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(24, 28).haveChanceOfToCause4HKO(94.9)
    mainPage.getOpponent("Landorus").damageIs(55.4, 65.8).cause2OHKO()
    mainPage.getOpponent("Gouging Fire").damageIs(3.3, 3.8)
    mainPage.getOpponent("Calyrex Shadow").damageIs(57.7, 68).cause2OHKO()
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(43.8, 51.8).haveChanceOfToCause2HKO(14.1)
    mainPage.getOpponent("Raging Bolt").damageIs(13.4, 16).possible7HKO()
    mainPage.getOpponent("Kyogre").damageIs(10.9, 13).possible8HKO()
    mainPage.getOpponent("Incineroar").damageIs(22.2, 26.7).haveChanceOfToCause4HKO(23.9)
  })
})

describe('Test calcs with Terastal', () => {
  it('Validate the damage with Groudon Terastallized using Precipice Blades', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Groudon").selectAttackOne().terastalyze()


    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(70.8, 84.5).cause2OHKO()
    mainPage.getOpponent("Landorus").doesNotCauseAnyDamage()
    mainPage.getOpponent("Gouging Fire").damageIs(119.3, 141.4).causeOHKO()
    mainPage.getOpponent("Calyrex Shadow").damageIs(85.7, 101.7).haveChanceOfToCauseOHKO(12.5)
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(33.1, 39).haveChanceOfToCause3HKO(99.8)
    mainPage.getOpponent("Raging Bolt").damageIs(58.8, 69.2).cause2OHKO()
    mainPage.getOpponent("Kyogre").damageIs(64.5, 76).cause2OHKO()
    mainPage.getOpponent("Incineroar").damageIs(134.6, 160.3).causeOHKO()
  })

  it('Validate the damage with Groudon using Precipice Blades in Terastallyzed Ogerpon', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Groudon").selectAttackOne()

    mainPage.getOpponent("Ogerpon Wellspring").terastalyze()
    
    mainPage.getOpponent("Ogerpon Wellspring").damageIs(49.7, 58.2).haveChanceOfToCause2HKO(98.4)
  })
})

describe('Test calcs with stats modifiers in attacker', () => {
  it('Validate the damage Flutter Mane +1 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+1')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(158.2, 186.8)
    mainPage.getOpponent("Landorus").damageIs(135.3, 159.7)
  })

  it('Validate the damage Flutter Mane +2 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+2')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(211.4, 249.1)
    mainPage.getOpponent("Landorus").damageIs(181, 214)
  })

  it('Validate the damage Flutter Mane +3 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+3')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(264, 310.8)
    mainPage.getOpponent("Landorus").damageIs(225.6, 265.8)
  })

  it('Validate the damage Flutter Mane +4 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+4')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(316, 372.5)
    mainPage.getOpponent("Landorus").damageIs(271.3, 320.1)
  })

  it('Validate the damage Flutter Mane +5 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+5')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(369.1, 435.4)
    mainPage.getOpponent("Landorus").damageIs(315.2, 371.9)
  })
  it('Validate the damage Flutter Mane +6 spa', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Flutter Mane").selectStatsModifier('spa', '+6')
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(422.2, 497.7)
    mainPage.getOpponent("Landorus").damageIs(362.1, 426.2)
  })

  it('Validate the damage Groudon +1 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+1')
    
    mainPage.getOpponent("Incineroar").damageIs(151.4, 179.2)
    mainPage.getOpponent("Gouging Fire").damageIs(130.3, 155.8)
  })

  it('Validate the damage Groudon +2 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+2')
    
    mainPage.getOpponent("Incineroar").damageIs(201.9, 238.6)
    mainPage.getOpponent("Gouging Fire").damageIs(176.7, 208.8)
  })

  it('Validate the damage Groudon +3 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+3')
    
    mainPage.getOpponent("Incineroar").damageIs(252.4, 298)
    mainPage.getOpponent("Gouging Fire").damageIs(219.8, 259.6)
  })

  it('Validate the damage Groudon +4 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+4')
    
    mainPage.getOpponent("Incineroar").damageIs(302.9, 357.4)
    mainPage.getOpponent("Gouging Fire").damageIs(262.9, 311.6)
  })

  it('Validate the damage Groudon +5 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+5')
    
    mainPage.getOpponent("Incineroar").damageIs(353.4, 415.8)
    mainPage.getOpponent("Gouging Fire").damageIs(308.2, 362.4)
  })
  it('Validate the damage Groudon +6 atk', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Groudon").selectStatsModifier('atk', '+6')
    
    mainPage.getOpponent("Incineroar").damageIs(403.9, 476.2)
    mainPage.getOpponent("Gouging Fire").damageIs(351.3, 414.3)
  })
})
