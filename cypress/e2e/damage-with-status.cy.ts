import { Opponent } from "cypress/page-object/opponent"
import { Team } from "cypress/page-object/team"

const team = new Team()
const opponents = new Opponent()

describe('Test calcs with status', () => {
  it('Validate the damage with Koraidon burned', () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    opponents.get("Rillaboom").damageIs(83.2, 98.4).cause2HKO()

    team.selectPokemon("Koraidon").burned()

    opponents.get("Rillaboom").damageIs(41.6, 49.2).cause3HKO()
  })

  it('Validate the damage using Gyro Ball against paralyzed Pokémon', () => {
    team.add("Bronzong").changeAttackOne("Gyro Ball")
    opponents.get("Calyrex Shadow").damageIs(37.7, 44.5).cause3HKO()

    opponents.get("Calyrex Shadow").edit().paralyzed()

    opponents.get("Calyrex Shadow").damageIs(18.8, 22.8).possible5HKO()    
  })

  it('Validate the damage using burned Guts Ursaluna with Facade', () => {
    const ursaluna = team.add("Ursaluna").selectAttackTwo()
    opponents.get("Urshifu Rapid Strike").damageIs(40, 48).cause3HKO() 

    ursaluna.burned()

    opponents.get("Urshifu Rapid Strike").damageIs(118.8, 140.5).causeOHKO() 
  })

  it('Validate the damage using burned Guts Ursaluna with Headlong Rush', () => {
    const ursaluna = team.add("Ursaluna").selectAttackThree()
    opponents.get("Urshifu Rapid Strike").damageIs(67.4, 80.5).cause2HKO() 

    ursaluna.burned()

    opponents.get("Urshifu Rapid Strike").damageIs(101.7, 120.5).causeOHKO() 
  })

  it('Validate the damage using poisoned Toxic Boost Zangoose with Facade', () => {
    const zangoose = team.add("Zangoose")
    opponents.get("Urshifu Rapid Strike").damageIs(31.4, 37.7).haveChanceOfToCause3HKO(85.4)

    zangoose.poisoned()

    opponents.get("Urshifu Rapid Strike").damageIs(94.2, 111.4).haveChanceOfToCauseOHKO(68.8)
  })

  it('Validate the damage using poisoned Toxic Boost Zangoose with Quick Attack', () => {
    const zangoose = team.add("Zangoose").selectAttackTwo()
    opponents.get("Urshifu Rapid Strike").damageIs(18.8, 22.2).possible5HKO()

    zangoose.poisoned()

    opponents.get("Urshifu Rapid Strike").damageIs(27.4, 32.5).cause4HKO()
  })

  it('Validate the damage using Hex against poisoned Pokémon', () => {
    team.add("Flutter Mane").changeAttackOne("Hex")
    opponents.get("Calyrex Shadow").damageIs(178.2, 212.5).causeOHKO()

    opponents.get("Calyrex Shadow").edit().poisoned()
    
    opponents.get("Calyrex Shadow").damageIs(356.5, 420.5).causeOHKO()
  })

})

