import { Field } from "cypress/page-object/field"
import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const field = new Field()
const opponents = new Opponent()

let vaporeonData: string
let tyranitarData: string
let baxcaliburData: string
let rillaboomData: string
let hattereneData: string
let talonflameData: string
let bronzongData: string

before(() => {
  cy.fixture("vaporeon-data").then((data) => { vaporeonData = data })
  cy.fixture("tyranitar-data").then((data) => { tyranitarData = data })
  cy.fixture("baxcalibur-data").then((data) => { baxcaliburData = data })
  cy.fixture("rillaboom-data").then((data) => { rillaboomData = data })
  cy.fixture("hatterene-data").then((data) => { hattereneData = data })
  cy.fixture("talonflame-data").then((data) => { talonflameData = data })
  cy.fixture("bronzong-data").then((data) => { bronzongData = data }) 
})

describe('Test the Field options', () => {
  it('With Tablets of Ruin active', () => {
    team.selectPokemon("Koraidon")

    field.tabletsOfRuin()
    
    opponents.get("Urshifu Rapid Strike").damageIs(6.8, 8)
  })

  it('With Sword of Ruin active', () => {
    team.selectPokemon("Koraidon")

    field.swordOfRuin()
    
    opponents.get("Urshifu Rapid Strike").damageIs(12, 14.2)
  })

  it('With Vessel of Ruin active', () => {
    team.selectPokemon("Miraidon")

    field.vesselOfRuin()
    
    opponents.get("Urshifu Rapid Strike").damageIs(222.8, 261.7)
  })

  it('With Beads of Ruin active', () => {
    team.selectPokemon("Miraidon")

    field.beadsOfRuin()
    
    opponents.get("Urshifu Rapid Strike").damageIs(392, 462.8)
  })

  it('With Sun active', () => {
    team.selectPokemon("Koraidon")

    field.sun()
    
    opponents.get("Urshifu Rapid Strike").damageIs(18.2, 21.7)
  })

  it('With Rain active', () => {
    team.importPokemon(vaporeonData)

    field.rain()
    
    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1)
  })

  it('With Sand active', () => {
    opponents.importPokemon(tyranitarData)
    team.selectPokemon("Miraidon")

    field.sand()
    
    opponents.get("Tyranitar").damageIs(47.3, 56.4)
  })

  it('With Snow active', () => {
    opponents.importPokemon(baxcaliburData)
    team.selectPokemon("Koraidon")

    field.snow()
    
    opponents.get("Baxcalibur").damageIs(12.1, 14.7)
  })

  it('With Eletric Terrain active', () => {
    team.selectPokemon("Miraidon")

    field.eletricTerrain()
    
    opponents.get("Urshifu Rapid Strike").damageIs(514.2, 604.5)
  })

  it('With Grassy Terrain active', () => {
    team.importPokemon(rillaboomData)

    field.grassyTerrain()
    
    opponents.get("Urshifu Rapid Strike").damageIs(68.5, 82.2)
  })

  it('With Psychic Terrain active', () => {
    team.importPokemon(hattereneData)
    
    field.psychicTerrain()
    
    opponents.get("Urshifu Rapid Strike").damageIs(43.4, 52)
  })

  it('With Misty Terrain active', () => {
    team.selectPokemon("Miraidon").selectAttackFour()

    field.mistyTerrain()
    
    opponents.get("Urshifu Rapid Strike").damageIs(72.5, 85.7)
  })

  it('With Magic Room active', () => {
    field.magicRoom()
    
    opponents.get("Urshifu Rapid Strike").damageIs(198.8, 234.2)
  })

  it('With Wonder Room active', () => {
    field.wonderRoom()
    
    opponents.get("Urshifu Rapid Strike").damageIs(200, 236.5)
  })

  it('With Gravity active', () => {
    team.importPokemon(tyranitarData).selectAttackFour()
    opponents.importPokemon(talonflameData)

    field.gravity()
    
    opponents.get("Talonflame").damageIs(73.5, 86.4)
  })

  it('With Helping Hand active', () => {
    field.helpingHand()
    
    opponents.get("Incineroar").damageIs(96, 113.4)
  })

  it('With Critical Hit active', () => {
    field.criticalHit()
    
    opponents.get("Incineroar").damageIs(97, 113.9)
  })

  it('With Battery active', () => {
    field.battery()
    
    opponents.get("Incineroar").damageIs(83.5, 98.5)
  })

  it('With Power Spot active', () => {
    field.powerSpot()
    
    opponents.get("Incineroar").damageIs(83.5, 98.5)
  })

  it('With Tailwind in attacker side active', () => {
    team.importPokemon(bronzongData)
    
    field.tailwindAttacker()
    
    opponents.get("Incineroar").damageIs(2.4, 2.9)
  })

  it('With Reflect active', () => {
    team.selectPokemon("Koraidon")
    
    field.reflect()
    
    opponents.get("Incineroar").damageIs(4.4, 5.4)
  })

  it('With Light Screen active', () => {
    field.lightScreen()
    
    opponents.get("Incineroar").damageIs(42.7, 50.7)
  })

  it('With Aurora Veil active', () => {
    field.auroraVeil()
    
    opponents.get("Incineroar").damageIs(42.7, 50.7)
  })

  it('With Single Target active', () => {
    team.selectPokemon("Miraidon").changeAttackOne("Discharge")
    
    field.singleTarget()
    
    opponents.get("Incineroar").damageIs(51.2, 61.1)
  })

  it('With Friend Guard active', () => {
    field.friendGuard()
    
    opponents.get("Incineroar").damageIs(48.2, 57.2)
  })

  it('With Tailwind in defender side active', () => {
    team.importPokemon(bronzongData)
    
    field.tailwindDefender()
    
    opponents.get("Incineroar").damageIs(9.9, 11.9)
  })

  it('With Three Spikes active', () => {
    field.threeSpikes()
    
    opponents.get("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it('With Two Spikes active', () => {
    field.twoSpikes()
    
    opponents.get("Rillaboom").cause3HKO()
  })

  it('With One Spikes active', () => {
    field.oneSpikes()
    
    opponents.get("Rillaboom").cause3HKO()
  })

  it('With Stealth Rock active', () => {
    field.stealthRock()
    
    opponents.get("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it('With Leech Seed active', () => {
    field.leechSeed()
    
    opponents.get("Rillaboom").cause3HKO()
  })

})
