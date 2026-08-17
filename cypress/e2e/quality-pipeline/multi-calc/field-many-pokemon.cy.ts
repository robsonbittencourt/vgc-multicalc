import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const field = new Field()
const header = new Header()
const team = new Team()
const opponents = new Opponent()

describe("Ruins and weather", () => {
  it("Should apply the correct damage for the Ruins abilities, Sun, Rain, Sand and Snow", () => {
    header.openTeamVsMany()
    team.delete("Team 1")
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])

    team.importPokemon(poke["ogerpon"])
    field.tabletsOfRuin()
    opponents.get("Urshifu Rapid Strike").damageIs(72, 85.7)
    field.tabletsOfRuin()

    field.swordOfRuin()
    opponents.get("Urshifu Rapid Strike").damageIs(126.8, 150.8)
    field.swordOfRuin()

    team.selectPokemon("Ogerpon").importPokemon(poke["vaporeon"])
    field.vesselOfRuin()
    opponents.get("Urshifu Rapid Strike").damageIs(15.4, 18.8)
    field.vesselOfRuin()

    field.beadsOfRuin()
    opponents.get("Urshifu Rapid Strike").damageIs(27.4, 32.5)
    field.beadsOfRuin()

    team.selectPokemon("Vaporeon").importPokemon(poke["chi-yu"])
    field.sun()
    opponents.get("Urshifu Rapid Strike").damageIs(122.2, 144)
    field.sun()

    team.selectPokemon("Chi-Yu").importPokemon(poke["vaporeon"])
    field.rain()
    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1)
    field.rain()

    opponents.importPokemon(poke["tyranitar"])
    field.sand()
    opponents.get("Tyranitar").damageIs(35.4, 43)
    field.sand()

    team.selectPokemon("Vaporeon").importPokemon(poke["ogerpon"])
    opponents.importPokemon(poke["baxcalibur"])
    field.snow()
    opponents.get("Baxcalibur").damageIs(15.7, 18.9)
    field.snow()
  })
})

describe("Terrains and rooms", () => {
  it("Should apply the correct damage for Terrains, Gravity, Magic Room and Wonder Room", () => {
    header.openTeamVsMany()
    team.delete("Team 1")
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])

    team.importPokemon(poke["raichu-alola"])
    field.eletricTerrain()
    opponents.get("Urshifu Rapid Strike").damageIs(131.4, 155.4)
    field.eletricTerrain()

    team.selectPokemon("Raichu").importPokemon(poke["ogerpon"])
    field.grassyTerrain()
    opponents.get("Urshifu Rapid Strike").damageIs(123.4, 145.1)
    field.grassyTerrain()

    team.selectPokemon("Ogerpon").importPokemon(poke["hatterene"])
    field.psychicTerrain()
    opponents.get("Urshifu Rapid Strike").damageIs(86.8, 104)
    field.psychicTerrain()

    team.selectPokemon("Hatterene").importPokemon(poke["baxcalibur"]).selectAttackTwo()
    field.mistyTerrain()
    opponents.get("Urshifu Rapid Strike").damageIs(34.8, 41.7)
    field.mistyTerrain()

    team.selectPokemon("Baxcalibur").importPokemon(poke["ogerpon"]).selectItem("Choice Band")
    field.magicRoom()
    opponents.get("Urshifu Rapid Strike").damageIs(96, 113.1)
    field.magicRoom()

    team.selectPokemon("Ogerpon").importPokemon(poke["ogerpon"])
    field.wonderRoom()
    opponents.get("Urshifu Rapid Strike").damageIs(140.5, 165.7)
    field.wonderRoom()

    team.selectPokemon("Ogerpon").importPokemon(poke["tyranitar"]).selectAttackTwo()
    opponents.importPokemon(poke["talonflame"])
    field.gravity()
    opponents.get("Talonflame").damageIs(73.5, 86.4)
    field.gravity()
  })
})

describe("Targeting and support", () => {
  it("Should apply the correct damage for Single Target, Friend Guard, Helping Hand, Critical Hit, Battery, Power Spot and Tailwind", () => {
    header.openTeamVsMany()
    team.delete("Team 1")
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])

    team.importPokemon(poke["vaporeon"])
    field.helpingHandAttacker()
    opponents.get("Incineroar").damageIs(71.6, 84.5)
    field.helpingHandAttacker()

    field.criticalHitAttacker()
    opponents.get("Incineroar").damageIs(72.6, 86.5)
    field.criticalHitAttacker()

    field.batteryAttacker()
    opponents.get("Incineroar").damageIs(62.6, 74.6)
    field.batteryAttacker()

    team.selectPokemon("Vaporeon").importPokemon(poke["baxcalibur"])
    field.powerSpotAttacker()
    opponents.get("Incineroar").damageIs(37.3, 44.7)
    field.powerSpotAttacker()

    team.selectPokemon("Baxcalibur").importPokemon(poke["bronzong"]).selectAttackThree()
    field.tailwindAttacker()
    opponents.get("Incineroar").damageIs(2.4, 2.9)
    field.tailwindAttacker()

    team.selectPokemon("Bronzong").importPokemon(poke["ogerpon"])
    field.reflectDefender()
    opponents.get("Urshifu Rapid Strike").damageIs(64, 75.4)
    field.reflectDefender()

    team.selectPokemon("Ogerpon").importPokemon(poke["vaporeon"])
    field.lightScreenDefender()
    opponents.get("Incineroar").damageIs(32.3, 38.3)
    field.lightScreenDefender()

    team.selectPokemon("Vaporeon").importPokemon(poke["raichu-alola"])
    field.auroraVeilDefender()
    opponents.get("Incineroar").damageIs(19.4, 23.3)
    team.selectPokemon("Raichu").selectAttackThree()
    opponents.get("Incineroar").damageIs(4.9, 5.9)
    field.auroraVeilDefender()

    team.selectPokemon("Raichu").importPokemon(poke["vaporeon"]).selectAttackThree()
    field.singleTargetAttacker()
    opponents.get("Incineroar").damageIs(53.7, 63.6)
    field.singleTargetAttacker()

    field.friendGuardDefender()
    opponents.get("Incineroar").damageIs(29.8, 35.8)
    field.friendGuardDefender()

    field.protectedDefender()
    opponents.get("Incineroar").damageIs(0, 0)
    field.protectedDefender()

    team.selectPokemon("Vaporeon").importPokemon(poke["excadrill-mega"])
    field.protectedDefender()
    opponents.get("Incineroar").damageIs(4.4, 4.9)
    field.protectedDefender()

    team.selectPokemon("Excadrill").importPokemon(poke["bronzong"])
    team.selectPokemon("Bronzong").selectAttackThree()
    field.tailwindDefender()
    opponents.get("Incineroar").damageIs(9.9, 11.9)
    field.tailwindDefender()
  })
})

describe("Hazards and Neutralizing Gas", () => {
  it("Should apply the correct damage for Spikes, Stealth Rock, Leech Seed and Neutralizing Gas", () => {
    header.openTeamVsMany()
    team.delete("Team 1")
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])

    team.importPokemon(poke["vaporeon"])

    field.threeSpikesDefender()
    opponents.get("Incineroar").cause2HKO()
    field.threeSpikesDefender()

    field.twoSpikesDefender()
    team.selectPokemon("Vaporeon").selectStatsModifier("spa", "1")
    opponents.get("Incineroar").haveChanceOfToCauseOHKO(12.5)
    field.twoSpikesDefender()

    field.oneSpikesDefender()
    team.selectPokemon("Vaporeon").selectStatsModifier("spa", "2")
    opponents.get("Incineroar").causeOHKO()
    field.oneSpikesDefender()

    field.stealthRockDefender()
    opponents.get("Incineroar").causeOHKO()
    field.stealthRockDefender()

    field.leechSeedAttacker()
    opponents.get("Incineroar").causeOHKO()
    field.leechSeedAttacker()

    field.leechSeedDefender()
    opponents.get("Incineroar").causeOHKO()
    field.leechSeedDefender()

    team.selectPokemon("Vaporeon").importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu")
    field.beadsOfRuin()
    field.neutralizingGas()
    opponents.get("Incineroar").damageIs(35.3, 41.7)
    field.neutralizingGas()
    field.beadsOfRuin()

    team.selectPokemon("Chi-Yu").importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu").selectItem("Ability Shield")
    field.neutralizingGas()
    opponents.get("Incineroar").damageIs(31.3, 37.3)
    field.neutralizingGas()

    team.selectPokemon("Chi-Yu").importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu")
    field.beadsOfRuin()
    field.neutralizingGas()
    opponents.get("Calyrex Shadow").damageIs(82.2, 97.7)
    field.neutralizingGas()
    field.beadsOfRuin()
  })
})

describe("Automatic field with combined attackers", () => {
  it("Should apply the field of the two combined attackers", () => {
    header.openTeamVsMany()
    team.delete("Team 1")
    team.importPokemon(poke["rillaboom"])
    team.importPokemon(poke["kyogre"])

    team.selectTeamMember("Rillaboom").combineDamage()
    team.selectTeamMember("Kyogre")

    field.isActiveOption("grassy-terrain")
    field.isActiveOption("rain")
  })
})

describe("Neutralizing Gas of a team member", () => {
  it("Should nullify the ability of the opponent and restore it when the member changes the ability", () => {
    header.openTeamVsMany()
    team.importPokemon(poke["weezing-galar"])
    opponents.importPokemon(poke["dragonite"])
    opponents.selectDefender("Dragonite").selectAbilityByFilter("Multiscale", "Multiscale")

    field.isActiveOption("neutralizing-gas")
    opponents.get("Dragonite").descriptionContains("Strange Steam")
    opponents.get("Dragonite").descriptionDoesNotContain("Multiscale")

    team.closeTab()
    team.selectPokemon("Weezing").selectAbilityByFilter("Levitate", "Levitate")

    field.isNotActiveOption("neutralizing-gas")
    opponents.get("Dragonite").descriptionContains("Multiscale")
  })
})
