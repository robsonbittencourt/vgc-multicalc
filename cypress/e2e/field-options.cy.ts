import { MainPage } from "cypress/page-object/main-page"

describe('Test the Field options', () => {
  it('With Tablets of Ruin active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Koraidon")

    mainPage.field.tabletsOfRuin()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(6.8, 8)
  })

  it('With Sword of Ruin active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Koraidon")

    mainPage.field.swordOfRuin()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(12, 14.2)
  })

  it('With Vessel of Ruin active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Miraidon")

    mainPage.field.vesselOfRuin()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(222.8, 261.7)
  })

  it('With Beads of Ruin active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Miraidon")

    mainPage.field.beadsOfRuin()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(392, 462.8)
  })

  it('With Sun active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Koraidon")

    mainPage.field.sun()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(18.2, 21.7)
  })

  it('With Rain active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Vaporeon")

    mainPage.field.rain()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(30.8, 37.1)
  })

  it('With Sand active', () => {
    const mainPage = new MainPage()
    mainPage.addNewPokemonToOpponent("Tyranitar")
    mainPage.selectPokemonFromTeam("Miraidon")

    mainPage.field.sand()
    
    mainPage.getOpponent("Tyranitar").damageIs(47.3, 56.4)
  })

  it('With Snow active', () => {
    const mainPage = new MainPage()
    mainPage.addNewPokemonToOpponent("Baxcalibur")
    mainPage.selectPokemonFromTeam("Koraidon")

    mainPage.field.snow()
    
    mainPage.getOpponent("Baxcalibur").damageIs(12.1, 14.7)
  })

  it('With Eletric Terrain active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Miraidon")

    mainPage.field.eletricTerrain()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(514.2, 604.5)
  })

  it('With Grassy Terrain active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Rillaboom")

    mainPage.field.grassyTerrain()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(68.5, 82.2)
  })

  it('With Psychic Terrain active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Hatterene").changeAttackOne("Psyshock")

    mainPage.field.psychicTerrain()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(43.4, 52)
  })

  it('With Misty Terrain active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Miraidon")

    mainPage.field.mistyTerrain()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(66.8, 78.8)
  })

  it('With Magic Room active', () => {
    const mainPage = new MainPage()

    mainPage.field.magicRoom()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(198.8, 234.2)
  })

  it('With Wonder Room active', () => {
    const mainPage = new MainPage()

    mainPage.field.wonderRoom()
    
    mainPage.getOpponent("Urshifu Rapid Strike").damageIs(200, 236.5)
  })

  it('With Gravity active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Tyranitar").changeAttackOne("Earthquake")

    mainPage.addNewPokemonToOpponent("Talonflame")

    mainPage.field.gravity()
    
    mainPage.getOpponent("Talonflame").damageIs(73.5, 86.4)
  })

  it('With Helping Hand active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.helpingHand()
    
    mainPage.getOpponent("Incineroar").damageIs(96, 113.4)
  })

  it('With Critical Hit active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.criticalHit()
    
    mainPage.getOpponent("Incineroar").damageIs(97, 113.9)
  })

  it('With Battery active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.battery()
    
    mainPage.getOpponent("Incineroar").damageIs(83.5, 98.5)
  })

  it('With Power Spot active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.powerSpot()
    
    mainPage.getOpponent("Incineroar").damageIs(83.5, 98.5)
  })

  it('With Tailwind in attacker side active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Bronzong").changeAttackOne("Gyro Ball")
    
    mainPage.field.tailwindAttacker()
    
    mainPage.getOpponent("Incineroar").damageIs(2.4, 2.9)
  })

  it('With Reflect active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Koraidon")
    
    mainPage.field.reflect()
    
    mainPage.getOpponent("Incineroar").damageIs(4.4, 5.4)
  })

  it('With Light Screen active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.lightScreen()
    
    mainPage.getOpponent("Incineroar").damageIs(42.7, 50.7)
  })

  it('With Aurora Veil active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.auroraVeil()
    
    mainPage.getOpponent("Incineroar").damageIs(42.7, 50.7)
  })

  it('With Single Target active', () => {
    const mainPage = new MainPage()
    mainPage.selectPokemonFromTeam("Miraidon").changeAttackOne("Discharge")
    
    mainPage.field.singleTarget()
    
    mainPage.getOpponent("Incineroar").damageIs(51.2, 61.1)
  })

  it('With Friend Guard active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.friendGuard()
    
    mainPage.getOpponent("Incineroar").damageIs(48.2, 57.2)
  })

  it('With Tailwind in defender side active', () => {
    const mainPage = new MainPage()
    mainPage.addNewTeamMember("Bronzong").changeAttackOne("Gyro Ball")
    
    mainPage.field.tailwindDefender()
    
    mainPage.getOpponent("Incineroar").damageIs(9.9, 11.9)
  })

  it('With Three Spikes active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.threeSpikes()
    
    mainPage.getOpponent("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it('With Two Spikes active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.twoSpikes()
    
    mainPage.getOpponent("Rillaboom").cause3HKO()
  })

  it('With One Spikes active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.oneSpikes()
    
    mainPage.getOpponent("Rillaboom").cause3HKO()
  })

  it('With Stealth Rock active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.stealthRock()
    
    mainPage.getOpponent("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it('With Leech Seed active', () => {
    const mainPage = new MainPage()
    
    mainPage.field.leechSeed()
    
    mainPage.getOpponent("Rillaboom").cause3HKO()
  })

})
