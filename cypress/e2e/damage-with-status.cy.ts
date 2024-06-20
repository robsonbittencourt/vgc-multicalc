import { MainPage } from "cypress/page-object/main-page"

describe('Test calcs with status', () => {
  it('Validate the damage with Koraidon burned', () => {
    const mainPage = new MainPage()
    mainPage.selectTeamMember("Koraidon").pokemon().selectAttackThree()
    mainPage.getOpponent("Rillaboom").damageIs(83.2, 98.4).cause2HKO()

    mainPage.selectPokemonFromTeam("Koraidon").burned()
    mainPage.getOpponent("Rillaboom").damageIs(41.6, 49.2).cause3HKO()
  })

  it('Validate the damage using Gyro Ball against paralyzed Pokémon', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Bronzong").changeAttackOne("Gyro Ball")
    mainPage.getOpponent("Calyrex Shadow").damageIs(37.7, 44.5).cause3HKO()

    mainPage.getOpponent("Calyrex Shadow").edit().paralyzed()
    mainPage.getOpponent("Calyrex Shadow").damageIs(18.8, 22.8).possible5HKO()    
  })

  it('Validate the damage using burned Guts Ursaluna with Facade', () => {
    const mainPage = new MainPage()
    const ursaluna = mainPage.addNewTeamMember("Ursaluna").selectAttackTwo()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(40, 48).cause3HKO() 

    ursaluna.burned()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(118.8, 140.5).causeOHKO() 
  })

  it('Validate the damage using burned Guts Ursaluna with Headlong Rush', () => {
    const mainPage = new MainPage()
    const ursaluna = mainPage.addNewTeamMember("Ursaluna").selectAttackThree()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(67.4, 80.5).cause2HKO() 

    ursaluna.burned()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(101.7, 120.5).causeOHKO() 
  })

  it('Validate the damage using poisoned Toxic Boost Zangoose with Facade', () => {
    const mainPage = new MainPage()
    const zangoose = mainPage.addNewTeamMember("Zangoose")
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(31.4, 37.7).haveChanceOfToCause3HKO(85.4)

    zangoose.poisoned()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(94.2, 111.4).haveChanceOfToCauseOHKO(68.8)
  })

  it('Validate the damage using poisoned Toxic Boost Zangoose with Quick Attack', () => {
    const mainPage = new MainPage()
    const zangoose = mainPage.addNewTeamMember("Zangoose").selectAttackTwo()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(18.8, 22.2).possible5HKO()

    zangoose.poisoned()
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(27.4, 32.5).cause4HKO()
  })

  it('Validate the damage using Hex against poisoned Pokémon', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Flutter Mane").changeAttackOne("Hex")
    mainPage.getOpponent("Calyrex Shadow").damageIs(178.2, 212.5).causeOHKO()

    mainPage.getOpponent("Calyrex Shadow").edit().poisoned()
    mainPage.getOpponent("Calyrex Shadow").damageIs(356.5, 420.5).causeOHKO()
  })

})

