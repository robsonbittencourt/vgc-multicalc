import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

const team = new Team()
const field = new Field()
const opponents = new Opponent()

describe("Test the Field options on options with One vs One", () => {
  beforeEach(() => {
    cy.get('[data-cy="one-vs-one"]').click({ force: true })
  })

  describe("Left side", () => {
    it("With Reflect active", () => {
      field.reflectAttacker()

      rightDamageResult.damageIs(0, 13.8, 16, 25, 29)
    })

    it("With Light Screen active", () => {
      rightPokemonBuild.importPokemon(poke["chi-yu"])

      field.lightScreenAttacker()

      rightDamageResult.damageIs(0, 30.9, 36.4, 56, 66)
    })

    it("With Aurora Veil active", () => {
      field.auroraVeilAttacker()

      rightDamageResult.damageIs(0, 13.8, 16, 25, 29)
    })

    it("With Single Target active", () => {
      leftPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()

      field.singleTargetAttacker()

      leftDamageResult.damageIs(1, 33.6, 40, 69, 82)
    })

    it("With Friend Guard active", () => {
      field.friendGuardAttacker()

      rightDamageResult.damageIs(0, 15.4, 18.2, 28, 33)
    })

    it("With One Spikes active", () => {
      field.oneSpikesAttacker()

      rightDamageResult.haveChanceOfToCause4HKO(71.6)
    })

    it("With Two Spikes active", () => {
      field.twoSpikesAttacker()

      rightDamageResult.haveChanceOfToCause4HKO(99.6)
    })

    it("With Three Spikes active", () => {
      field.threeSpikesAttacker()

      rightDamageResult.cause4HKO()
    })

    it("With Stealth Rock active", () => {
      field.stealthRockAttacker()

      rightDamageResult.haveChanceOfToCause4HKO(71.6)
    })

    it("With Leech Seed active", () => {
      field.leechSeedAttacker()

      rightDamageResult.haveChanceOfToCause3HKO(95.8)
    })

    it("With Helping Hand active", () => {
      field.helpingHandAttacker()

      leftDamageResult.damageIs(0, 270.2, 319, 554, 654)
    })

    it("With Critical active", () => {
      field.criticalHitAttacker()

      leftDamageResult.damageIs(0, 272.1, 320, 558, 656)
    })

    it("With Battery active", () => {
      field.batteryAttacker()

      leftDamageResult.damageIs(0, 235.1, 278, 482, 570)
    })

    it("With Power Spot active", () => {
      field.powerSpotAttacker()

      leftDamageResult.damageIs(0, 235.1, 278, 482, 570)
    })

    it("With Tailwind active", () => {
      leftPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()

      field.tailwindAttacker()

      leftDamageResult.damageIs(2, 8.7, 10.7, 18, 22)
    })
  })

  describe("Both sides", () => {
    it("With Tablets of Ruin active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])

      field.tabletsOfRuin()

      leftDamageResult.damageIs(0, 87.8, 107.3, 36, 44)
      rightDamageResult.damageIs(0, 31.5, 37.3, 60, 71)
    })

    it("With Sword of Ruin active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])

      field.swordOfRuin()

      leftDamageResult.damageIs(0, 151.2, 180.4, 62, 74)
      rightDamageResult.damageIs(0, 56.3, 66.3, 107, 126)
    })

    it("With Vessel of Ruin active", () => {
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.vesselOfRuin()

      leftDamageResult.damageIs(0, 60.7, 72.1, 144, 171)
      rightDamageResult.damageIs(0, 8.8, 10.4, 16, 19)
    })

    it("With Beads of Ruin active", () => {
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.beadsOfRuin()

      leftDamageResult.damageIs(0, 108.8, 128.2, 258, 304)
      rightDamageResult.damageIs(0, 16, 18.7, 29, 34)
    })

    it("With Sun active", () => {
      leftPokemonBuild.importPokemon(poke["chi-yu"])

      field.sun()

      leftDamageResult.damageIs(0, 69.7, 81.9, 143, 168)
      rightDamageResult.damageIs(0, 65.4, 77.2, 89, 105)
    })

    it("With Rain active", () => {
      leftPokemonBuild.importPokemon(poke["dondozo"])
      rightPokemonBuild.importPokemon(poke["rhyperior"])

      field.rain()

      leftDamageResult.damageIs(0, 166, 198.1, 352, 420)
      rightDamageResult.damageIs(0, 4.8, 6.1, 11, 14)
    })

    it("With Sand active", () => {
      leftPokemonBuild.importPokemon(poke["hatterene"]).selectAttackTwo().terastalyze()
      rightPokemonBuild.importPokemon(poke["rhyperior"])

      field.sand()

      leftDamageResult.damageIs(1, 12.7, 15.5, 27, 33)
      rightDamageResult.damageIs(0, 12.1, 14.6, 20, 24)
    })

    it("With Snow active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])
      rightPokemonBuild.importPokemon(poke["talonflame"]).selectAttackFour().terastalyze()

      field.snow()

      leftDamageResult.damageIs(0, 21.6, 27, 8, 10)
      rightDamageResult.damageIs(3, 19.4, 23.6, 37, 45)
    })

    it("With Eletric Terrain active", () => {
      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.importPokemon(poke["kyogre"]).selectAttackFour()

      field.eletricTerrain()

      leftDamageResult.damageIs(1, 256.2, 301, 492, 578)
      rightDamageResult.damageIs(3, 10.4, 12.7, 19, 23)
    })

    it("With Grassy Terrain active", () => {
      leftPokemonBuild.importPokemon(poke["rillaboom"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      field.grassyTerrain()

      leftDamageResult.damageIs(0, 33.3, 39.6, 69, 82)
      rightDamageResult.damageIs(0, 33.3, 39.6, 69, 82)
    })

    it("With Psychic Terrain active", () => {
      leftPokemonBuild.importPokemon(poke["hatterene"])
      rightPokemonBuild.importPokemon(poke["hatterene"])

      field.psychicTerrain()

      leftDamageResult.damageIs(0, 18.2, 21.9, 30, 36)
      rightDamageResult.damageIs(0, 18.2, 21.9, 30, 36)
    })

    it("With Misty Terrain active", () => {
      rightPokemonBuild.importPokemon(poke["baxcalibur"]).selectAttackTwo()

      field.mistyTerrain()

      leftDamageResult.damageIs(0, 110.5, 130.5, 210, 248)
      rightDamageResult.damageIs(1, 67.4, 80.6, 122, 146)
    })

    it("With Gravity active", () => {
      leftPokemonBuild.importPokemon(poke["tyranitar"]).selectAttackTwo().terastalyze()
      rightPokemonBuild.importPokemon(poke["dragonite"])

      field.gravity()

      leftDamageResult.damageIs(1, 37.5, 44.6, 74, 88)
      rightDamageResult.damageIs(0, 36, 42.4, 67, 79)
    })

    it("With Magic Room active", () => {
      leftPokemonBuild.importPokemon(poke["tyranitar"]).selectItem("Choice Band")
      rightPokemonBuild.importPokemon(poke["rillaboom"]).selectItem("Choice Band")

      field.magicRoom()

      leftDamageResult.damageIs(0, 49.7, 59.4, 103, 123)
      rightDamageResult.damageIs(0, 100, 117.2, 186, 218)
    })

    it("With Wonder Room active", () => {
      field.wonderRoom()

      leftDamageResult.damageIs(0, 160.9, 190.2, 330, 390)
      rightDamageResult.damageIs(0, 18.2, 21.5, 33, 39)
    })

    it("With Neutralizing Gas active", () => {
      field.eletricTerrain()
      field.sun()

      field.neutralizingGas()

      leftDamageResult.damageIs(0, 181.4, 213.6, 372, 438)
      rightDamageResult.damageIs(0, 30.9, 36.4, 56, 66)
    })

    it("With Neutralizing Gas active and Ability Shield", () => {
      leftPokemonBuild.selectItem("Ability Shield")
      rightPokemonBuild.selectItem("Ability Shield")

      field.eletricTerrain()
      field.sun()

      field.neutralizingGas()

      leftDamageResult.damageIs(0, 160.9, 190.2, 330, 390)
      rightDamageResult.damageIs(0, 40.8, 48, 74, 87)
    })
  })

  describe("Right side", () => {
    it("With Reflect active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])

      field.reflectDefender()

      leftDamageResult.damageIs(0, 78, 90.2, 32, 37)
    })

    it("With Light Screen active", () => {
      field.lightScreenDefender()

      leftDamageResult.damageIs(0, 120.9, 142.4, 248, 292)
    })

    it("With Aurora Veil active", () => {
      field.auroraVeilDefender()

      leftDamageResult.damageIs(0, 120.9, 142.4, 248, 292)
    })

    it("With Single Target active", () => {
      rightPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()

      field.singleTargetDefender()

      rightDamageResult.damageIs(1, 34.2, 40.3, 62, 73)
    })

    it("With Friend Guard active", () => {
      field.friendGuardDefender()

      leftDamageResult.damageIs(0, 136, 160, 279, 328)
    })

    it("With One Spikes active", () => {
      leftPokemonBuild.selectAttackFour()

      field.oneSpikesDefender()

      leftDamageResult.cause4HKO()
    })

    it("With Two Spikes active", () => {
      leftPokemonBuild.selectAttackFour()

      field.twoSpikesDefender()

      leftDamageResult.haveChanceOfToCause3HKO(4.8)
    })

    it("With Three Spikes active", () => {
      leftPokemonBuild.selectAttackFour()

      field.threeSpikesDefender()

      leftDamageResult.haveChanceOfToCause3HKO(97)
    })

    it("With Stealth Rock active", () => {
      leftPokemonBuild.selectAttackFour()

      field.stealthRockDefender()

      leftDamageResult.cause4HKO()
    })

    it("With Leech Seed active", () => {
      leftPokemonBuild.selectAttackFour()

      field.leechSeedDefender()

      leftDamageResult.cause3HKO()
    })

    it("With Helping Hand active", () => {
      field.helpingHandDefender()

      rightDamageResult.damageIs(0, 30.3, 35.9, 55, 65)
    })

    it("With Critical active", () => {
      field.criticalHitDefender()

      rightDamageResult.damageIs(0, 30.9, 36.4, 56, 66)
    })

    it("With Battery active", () => {
      rightPokemonBuild.importPokemon(poke["chi-yu"])

      field.batteryDefender()

      rightDamageResult.damageIs(0, 60.7, 71.2, 110, 129)
    })

    it("With Power Spot active", () => {
      field.powerSpotDefender()

      rightDamageResult.damageIs(0, 26.5, 31.4, 48, 57)
    })

    it("With Tailwind active", () => {
      rightPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()

      field.tailwindDefender()

      rightDamageResult.damageIs(2, 6.6, 7.7, 12, 14)
    })
  })
})

describe("Test the Field options on options with Many Pokémon", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })

    team.delete("Team 1")
    team.importPokepaste(poke["default-team"])

    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
  })

  it("With Tablets of Ruin active", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    field.tabletsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(6.8, 8)
  })

  it("With Sword of Ruin active", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    field.swordOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(12, 14.2)
  })

  it("With Vessel of Ruin active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.vesselOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(222.8, 261.7)
  })

  it("With Beads of Ruin active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.beadsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(392, 462.8)
  })

  it("With Sun active", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    field.sun()

    opponents.get("Urshifu Rapid Strike").damageIs(18.2, 21.7)
  })

  it("With Rain active", () => {
    team.importPokemon(poke["vaporeon"])
    team.selectPokemon("Vaporeon")

    field.rain()

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1)
  })

  it("With Sand active", () => {
    opponents.importPokemon(poke["tyranitar"])
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.sand()

    opponents.get("Tyranitar").damageIs(47.3, 56.4)
  })

  it("With Snow active", () => {
    opponents.importPokemon(poke["baxcalibur"])
    team.selectPokemon("Koraidon").selectAttackThree()

    field.snow()

    opponents.get("Baxcalibur").damageIs(12.1, 14.7)
  })

  it("With Eletric Terrain active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.eletricTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(514.2, 604.5)
  })

  it("With Grassy Terrain active", () => {
    team.importPokemon(poke["rillaboom"])
    team.selectPokemon("Rillaboom").selectAttackThree()

    field.grassyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(68.5, 82.2)
  })

  it("With Psychic Terrain active", () => {
    team.importPokemon(poke["hatterene"])
    team.selectPokemon("Hatterene")

    field.psychicTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(86.8, 104)
  })

  it("With Misty Terrain active", () => {
    team.selectPokemon("Miraidon")

    field.mistyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(72.5, 85.7)
  })

  it("With Magic Room active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.magicRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(198.8, 234.2)
  })

  it("With Wonder Room active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.wonderRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(200, 236.5)
  })

  it("With Gravity active", () => {
    team.importPokemon(poke["tyranitar"])
    team.selectPokemon("Tyranitar").selectAttackTwo()

    opponents.importPokemon(poke["talonflame"])

    field.gravity()

    opponents.get("Talonflame").damageIs(73.5, 86.4)
  })

  it("With Helping Hand active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.helpingHandAttacker()

    opponents.get("Incineroar").damageIs(96, 113.4)
  })

  it("With Critical Hit active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.criticalHitAttacker()

    opponents.get("Incineroar").damageIs(97, 113.9)
  })

  it("With Battery active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.batteryAttacker()

    opponents.get("Incineroar").damageIs(83.5, 98.5)
  })

  it("With Power Spot active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.powerSpotAttacker()

    opponents.get("Incineroar").damageIs(83.5, 98.5)
  })

  it("With Tailwind in attacker side active", () => {
    team.importPokemon(poke["bronzong"])
    team.selectPokemon("Bronzong").selectAttackThree()

    field.tailwindAttacker()

    opponents.get("Incineroar").damageIs(2.4, 2.9)
  })

  it("With Reflect active", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    field.reflectDefender()

    opponents.get("Incineroar").damageIs(4.4, 5.4)
  })

  it("With Light Screen active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.lightScreenDefender()

    opponents.get("Incineroar").damageIs(42.7, 50.7)
  })

  it("With Aurora Veil active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.auroraVeilDefender()

    opponents.get("Incineroar").damageIs(42.7, 50.7)
  })

  it("With Single Target active", () => {
    team.selectPokemon("Miraidon").changeAttackOne("Discharge").selectAttackOne()

    field.singleTargetAttacker()

    opponents.get("Incineroar").damageIs(51.2, 61.1)
  })

  it("With Friend Guard active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.friendGuardDefender()

    opponents.get("Incineroar").damageIs(48.2, 57.2)
  })

  it("With Tailwind in defender side active", () => {
    team.importPokemon(poke["bronzong"])
    team.selectPokemon("Bronzong").selectAttackThree()

    field.tailwindDefender()

    opponents.get("Incineroar").damageIs(9.9, 11.9)
  })

  it("With Three Spikes active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.threeSpikesDefender()

    opponents.get("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it("With Two Spikes active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.twoSpikesDefender()

    opponents.get("Rillaboom").cause3HKO()
  })

  it("With One Spikes active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.oneSpikesDefender()

    opponents.get("Rillaboom").cause3HKO()
  })

  it("With Stealth Rock active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.stealthRockDefender()

    opponents.get("Incineroar").haveChanceOfToCauseOHKO(6.3)
  })

  it("With Leech Seed active", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    field.leechSeedDefender()

    opponents.get("Rillaboom").cause3HKO()
  })

  it("With Neutralizing Gas active", () => {
    team.importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu")

    field.neutralizingGas()

    opponents.get("Incineroar").damageIs(35.3, 41.7)
  })

  it("With Neutralizing Gas active and Ability Shield", () => {
    team.importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu").selectItem("Ability Shield")

    field.neutralizingGas()

    opponents.get("Incineroar").damageIs(31.3, 37.3)
  })

  it("With Neutralizing Gas active but not affected ability", () => {
    team.importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu")

    field.neutralizingGas()

    opponents.get("Calyrex Shadow").damageIs(82.2, 97.7)
  })
})
