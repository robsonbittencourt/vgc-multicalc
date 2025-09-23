import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"

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

      rightDamageResult.damageIs(0, 27, 32, 49, 58)
    })

    it("With Light Screen active", () => {
      rightPokemonBuild.importPokemon(poke["chi-yu"])

      field.lightScreenAttacker()

      rightDamageResult.damageIs(0, 30.9, 36.4, 56, 66)
    })

    it("With Aurora Veil active", () => {
      field.auroraVeilAttacker()

      rightDamageResult.damageIs(0, 27, 32, 49, 58)
    })

    it("With Single Target active", () => {
      leftPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()

      field.singleTargetAttacker()

      leftDamageResult.damageIs(1, 51.2, 60, 105, 123)
    })

    it("With Friend Guard active", () => {
      field.friendGuardAttacker()

      rightDamageResult.damageIs(0, 30.3, 35.9, 55, 65)
    })

    it("With One Spikes active", () => {
      field.oneSpikesAttacker()

      rightDamageResult.haveChanceOfToCause2HKO(66.8)
    })

    it("With Two Spikes active", () => {
      field.twoSpikesAttacker()

      rightDamageResult.haveChanceOfToCause2HKO(97.7)
    })

    it("With Three Spikes active", () => {
      field.threeSpikesAttacker()

      rightDamageResult.cause2HKO()
    })

    it("With Stealth Rock active", () => {
      field.stealthRockAttacker()

      rightDamageResult.haveChanceOfToCause2HKO(66.8)
    })

    it("With Leech Seed active", () => {
      field.leechSeedAttacker()

      rightDamageResult.cause2HKO()
    })

    it("With Helping Hand active", () => {
      field.helpingHandAttacker()

      leftDamageResult.damageIs(0, 360.9, 425.3, 740, 872)
    })

    it("With Critical active", () => {
      field.criticalHitAttacker()

      leftDamageResult.damageIs(0, 360.9, 425.3, 740, 872)
    })

    it("With Battery active", () => {
      field.batteryAttacker()

      leftDamageResult.damageIs(0, 313.1, 368.7, 642, 756)
    })

    it("With Power Spot active", () => {
      field.powerSpotAttacker()

      leftDamageResult.damageIs(0, 313.1, 368.7, 642, 756)
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
      rightDamageResult.damageIs(0, 63.1, 74.7, 120, 142)
    })

    it("With Sword of Ruin active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])

      field.swordOfRuin()

      leftDamageResult.damageIs(0, 151.2, 180.4, 62, 74)
      rightDamageResult.damageIs(0, 11.5, 131.5, 212, 250)
    })

    it("With Vessel of Ruin active", () => {
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.vesselOfRuin()

      leftDamageResult.damageIs(0, 81.4, 96.2, 193, 228)
      rightDamageResult.damageIs(0, 8.8, 10.4, 16, 19)
    })

    it("With Beads of Ruin active", () => {
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.beadsOfRuin()

      leftDamageResult.damageIs(0, 144.7, 170.8, 343, 405)
      rightDamageResult.damageIs(0, 16, 18.7, 29, 34)
    })

    it("With Sun active", () => {
      leftPokemonBuild.importPokemon(poke["chi-yu"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.sun()

      leftDamageResult.damageIs(0, 62.8, 74.2, 149, 176)
      rightDamageResult.damageIs(0, 26.4, 32.3, 36, 44)
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
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["kyogre"]).selectAttackFour()

      field.eletricTerrain()

      leftDamageResult.damageIs(0, 60.4, 71.8, 116, 138)
      rightDamageResult.damageIs(3, 37, 43.7, 50, 59)
    })

    it("With Grassy Terrain active", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon"])
      rightPokemonBuild.importPokemon(poke["kyogre"])

      field.grassyTerrain()

      leftDamageResult.damageIs(0, 106.2, 125, 204, 240)
      rightDamageResult.damageIs(0, 47.2, 55.7, 78, 92)
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
      leftPokemonBuild.importPokemon(poke["ogerpon"]).selectItem("Choice Band")
      rightPokemonBuild.importPokemon(poke["vaporeon"]).selectItem("Choice Specs")

      field.magicRoom()

      leftDamageResult.damageIs(0, 68.3, 81, 162, 192)
      rightDamageResult.damageIs(0, 15.1, 18.1, 25, 30)
    })

    it("With Wonder Room active", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.wonderRoom()

      leftDamageResult.damageIs(0, 71.7, 86, 170, 204)
      rightDamageResult.damageIs(0, 16.3, 19.3, 27, 32)
    })

    it("With Neutralizing Gas active", () => {
      field.neutralizingGas()

      leftDamageResult.damageIs(0, 181.4, 213.6, 372, 438)
      rightDamageResult.damageIs(0, 30.9, 36.4, 56, 66)
    })

    it("With Neutralizing Gas active and Ability Shield", () => {
      leftPokemonBuild.selectItem("Ability Shield")
      rightPokemonBuild.selectItem("Ability Shield")

      field.neutralizingGas()

      leftDamageResult.damageIs(0, 160.9, 190.2, 330, 390)
      rightDamageResult.damageIs(0, 40.8, 48, 74, 87)
    })
  })

  describe("Right side", () => {
    it("With Reflect active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.reflectDefender()

      leftDamageResult.damageIs(0, 16.8, 21, 8, 10)
    })

    it("With Light Screen active", () => {
      leftPokemonBuild.importPokemon(poke["vaporeon"])
      rightPokemonBuild.importPokemon(poke["baxcalibur"])

      field.lightScreenDefender()

      leftDamageResult.damageIs(0, 9.4, 11.5, 18, 22)
    })

    it("With Aurora Veil active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["baxcalibur"])

      field.auroraVeilDefender()

      leftDamageResult.damageIs(0, 11.5, 14.2, 22, 27)

      leftPokemonBuild.selectAttackThree()
      leftDamageResult.damageIs(2, 25.2, 30, 48, 57)
    })

    it("With Single Target active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()

      field.singleTargetDefender()

      rightDamageResult.damageIs(1, 118.5, 140.7, 160, 190)
    })

    it("With Friend Guard active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.friendGuardDefender()

      leftDamageResult.damageIs(0, 38.3, 45.9, 91, 109)
    })

    it("With One Spikes active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.oneSpikesDefender()

      leftDamageResult.cause2HKO()
    })

    it("With Two Spikes active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"]).selectStatsModifier("spa", "1")
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.twoSpikesDefender()

      leftDamageResult.haveChanceOfToCauseOHKO(62.5)
    })

    it("With Three Spikes active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.threeSpikesDefender()

      leftDamageResult.haveChanceOfToCause3HKO(76.7)
    })

    it("With Stealth Rock active", () => {
      leftPokemonBuild.importPokemon(poke["baxcalibur"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.stealthRockDefender()

      leftDamageResult.haveChanceOfToCause4HKO(99.9)
    })

    it("With Leech Seed active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.leechSeedDefender()

      leftDamageResult.cause2HKO()
    })

    it("With Helping Hand active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.helpingHandDefender()

      rightDamageResult.damageIs(0, 62.2, 74, 84, 100)
    })

    it("With Critical active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.criticalHitDefender()

      rightDamageResult.damageIs(0, 62.2, 74, 84, 100)
    })

    it("With Battery active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.batteryDefender()

      rightDamageResult.damageIs(0, 54, 64.4, 73, 87)
    })

    it("With Power Spot active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["vaporeon"])

      field.powerSpotDefender()

      rightDamageResult.damageIs(0, 54, 64.4, 73, 87)
    })

    it("With Tailwind active", () => {
      leftPokemonBuild.importPokemon(poke["raichu-alola"])
      rightPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()

      field.tailwindDefender()

      rightDamageResult.damageIs(2, 10.3, 12.5, 14, 17)
    })
  })
})

describe("Test the Field options on options with Many Pokémon", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })

    team.delete("Team 1")

    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
  })

  it("With Tablets of Ruin active", () => {
    team.importPokemon(poke["ogerpon"])

    field.tabletsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(72, 85.7)
  })

  it("With Sword of Ruin active", () => {
    team.importPokemon(poke["ogerpon"])

    field.swordOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(126.8, 150.8)
  })

  it("With Vessel of Ruin active", () => {
    team.importPokemon(poke["vaporeon"])

    field.vesselOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(15.4, 18.8)
  })

  it("With Beads of Ruin active", () => {
    team.importPokemon(poke["vaporeon"])

    field.beadsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(27.4, 32.5)
  })

  it("With Sun active", () => {
    team.importPokemon(poke["chi-yu"])

    field.sun()

    opponents.get("Urshifu Rapid Strike").damageIs(121.7, 144)
  })

  it("With Rain active", () => {
    team.importPokemon(poke["vaporeon"])

    field.rain()

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1)
  })

  it("With Sand active", () => {
    team.importPokemon(poke["vaporeon"])
    opponents.importPokemon(poke["tyranitar"])

    field.sand()

    opponents.get("Tyranitar").damageIs(35.4, 43)
  })

  it("With Snow active", () => {
    team.importPokemon(poke["ogerpon"])
    opponents.importPokemon(poke["baxcalibur"])

    field.snow()

    opponents.get("Baxcalibur").damageIs(15.7, 18.9)
  })

  it("With Eletric Terrain active", () => {
    team.importPokemon(poke["raichu-alola"])

    field.eletricTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(131.4, 155.4)
  })

  it("With Grassy Terrain active", () => {
    team.importPokemon(poke["ogerpon"])

    field.grassyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(123.4, 145.1)
  })

  it("With Psychic Terrain active", () => {
    team.importPokemon(poke["hatterene"])

    field.psychicTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(86.8, 104)
  })

  it("With Misty Terrain active", () => {
    team.importPokemon(poke["baxcalibur"]).selectAttackTwo()

    field.mistyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(34.8, 41.7)
  })

  it("With Magic Room active", () => {
    team.importPokemon(poke["ogerpon"]).selectItem("Choice Band")

    field.magicRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(96, 113.1)
  })

  it("With Wonder Room active", () => {
    team.importPokemon(poke["ogerpon"])

    field.wonderRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(140.5, 165.7)
  })

  it("With Gravity active", () => {
    team.importPokemon(poke["tyranitar"]).selectAttackTwo()
    opponents.importPokemon(poke["talonflame"])

    field.gravity()

    opponents.get("Talonflame").damageIs(73.5, 86.4)
  })

  it("With Helping Hand active", () => {
    team.importPokemon(poke["vaporeon"])

    field.helpingHandAttacker()

    opponents.get("Incineroar").damageIs(71.6, 84.5)
  })

  it("With Critical Hit active", () => {
    team.importPokemon(poke["vaporeon"])

    field.criticalHitAttacker()

    opponents.get("Incineroar").damageIs(72.6, 86.5)
  })

  it("With Battery active", () => {
    team.importPokemon(poke["vaporeon"])

    field.batteryAttacker()

    opponents.get("Incineroar").damageIs(62.6, 74.6)
  })

  it("With Power Spot active", () => {
    team.importPokemon(poke["baxcalibur"])

    field.powerSpotAttacker()

    opponents.get("Incineroar").damageIs(37.3, 44.7)
  })

  it("With Tailwind in attacker side active", () => {
    team.importPokemon(poke["bronzong"]).selectAttackThree()

    field.tailwindAttacker()

    opponents.get("Incineroar").damageIs(2.4, 2.9)
  })

  it("With Reflect active", () => {
    team.importPokemon(poke["ogerpon"])

    field.reflectDefender()

    opponents.get("Urshifu Rapid Strike").damageIs(64, 75.4)
  })

  it("With Light Screen active", () => {
    team.importPokemon(poke["vaporeon"])

    field.lightScreenDefender()

    opponents.get("Incineroar").damageIs(32.3, 38.3)
  })

  it("With Aurora Veil active", () => {
    const buildPokemon = team.importPokemon(poke["raichu-alola"])

    field.auroraVeilDefender()

    opponents.get("Incineroar").damageIs(19.4, 23.3)

    buildPokemon.selectAttackThree()
    opponents.get("Incineroar").damageIs(4.9, 5.9)
  })

  it("With Single Target active", () => {
    team.importPokemon(poke["vaporeon"]).selectAttackThree()

    field.singleTargetAttacker()

    opponents.get("Incineroar").damageIs(53.7, 63.6)
  })

  it("With Friend Guard active", () => {
    team.importPokemon(poke["vaporeon"])

    field.friendGuardDefender()

    opponents.get("Incineroar").damageIs(36.3, 43.2)
  })

  it("With Tailwind in defender side active", () => {
    team.importPokemon(poke["bronzong"])
    team.selectPokemon("Bronzong").selectAttackThree()

    field.tailwindDefender()

    opponents.get("Incineroar").damageIs(9.9, 11.9)
  })

  it("With Three Spikes active", () => {
    team.importPokemon(poke["vaporeon"])

    field.threeSpikesDefender()

    opponents.get("Incineroar").cause2HKO()
  })

  it("With Two Spikes active", () => {
    team.importPokemon(poke["vaporeon"]).selectStatsModifier("spa", "1")

    field.twoSpikesDefender()

    opponents.get("Incineroar").haveChanceOfToCauseOHKO(12.5)
  })

  it("With One Spikes active", () => {
    team.importPokemon(poke["vaporeon"]).selectStatsModifier("spa", "2")

    field.oneSpikesDefender()

    opponents.get("Incineroar").causeOHKO()
  })

  it("With Stealth Rock active", () => {
    team.importPokemon(poke["vaporeon"])

    field.stealthRockDefender()

    opponents.get("Incineroar").cause2HKO()
  })

  it("With Leech Seed active", () => {
    team.importPokemon(poke["vaporeon"])

    field.leechSeedDefender()

    opponents.get("Incineroar").cause2HKO()
  })

  it("With Neutralizing Gas active", () => {
    team.importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu")

    field.beadsOfRuin()
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

    field.beadsOfRuin()
    field.neutralizingGas()

    opponents.get("Calyrex Shadow").damageIs(82.2, 97.7)
  })
})
