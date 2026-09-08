import { poke, visitApp } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const field = new Field()
const header = new Header()
const team = new Team()
const opponents = new Opponent()

function openTeamVsManyWithDefaultOpponents() {
  header.openTeamVsMany()
  teamsWidget.delete("Team 1")
  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
}

describe("Ruins", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["ogerpon"])
  })

  it("Should reduce the physical damage with Tablets of Ruin", () => {
    field.tabletsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(72, 85.7)

    field.tabletsOfRuin()
  })

  it("Should increase the physical damage with Sword of Ruin", () => {
    field.swordOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(126.8, 150.8)

    field.swordOfRuin()
  })

  it("Should reduce the special damage with Vessel of Ruin", () => {
    team.selectPokemon("Ogerpon").importPokemon(poke["vaporeon"])
    field.vesselOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(15.4, 18.8)

    field.vesselOfRuin()
  })

  it("Should increase the special damage with Beads of Ruin", () => {
    field.beadsOfRuin()

    opponents.get("Urshifu Rapid Strike").damageIs(27.4, 32.5)

    field.beadsOfRuin()
  })
})

describe("Weather", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["chi-yu"])
  })

  it("Should apply the correct damage under the Sun", () => {
    field.sun()

    opponents.get("Urshifu Rapid Strike").damageIs(122.2, 144)

    field.sun()
  })

  it("Should apply the correct damage under the Rain", () => {
    team.selectPokemon("Chi-Yu").importPokemon(poke["vaporeon"])
    field.rain()

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1)

    field.rain()
  })

  it("Should apply the correct damage under the Sand", () => {
    opponents.importPokemon(poke["tyranitar"])
    field.sand()

    opponents.get("Tyranitar").damageIs(35.4, 43)

    field.sand()
  })

  it("Should apply the correct damage under the Snow", () => {
    team.selectPokemon("Vaporeon").importPokemon(poke["ogerpon"])
    opponents.importPokemon(poke["baxcalibur"])
    field.snow()

    opponents.get("Baxcalibur").damageIs(15.7, 18.9)

    field.snow()
  })
})

describe("Terrains", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["raichu-alola"])
  })

  it("Should apply the correct damage under the Electric Terrain", () => {
    field.eletricTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(131.4, 155.4)

    field.eletricTerrain()
  })

  it("Should apply the correct damage under the Grassy Terrain", () => {
    team.selectPokemon("Raichu").importPokemon(poke["ogerpon"])
    field.grassyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(123.4, 145.1)

    field.grassyTerrain()
  })

  it("Should apply the correct damage under the Psychic Terrain", () => {
    team.selectPokemon("Ogerpon").importPokemon(poke["hatterene"])
    field.psychicTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(86.8, 104)

    field.psychicTerrain()
  })

  it("Should apply the correct damage under the Misty Terrain", () => {
    team.selectPokemon("Hatterene").importPokemon(poke["baxcalibur"]).selectAttackTwo()
    field.mistyTerrain()

    opponents.get("Urshifu Rapid Strike").damageIs(34.8, 41.7)

    field.mistyTerrain()
  })
})

describe("Rooms and Gravity", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["ogerpon"])
    team.selectPokemon("Ogerpon").selectItem("Choice Band")
  })

  it("Should ignore the items under the Magic Room", () => {
    field.magicRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(96, 113.1)

    field.magicRoom()
  })

  it("Should swap the defensive stats under the Wonder Room", () => {
    team.selectPokemon("Ogerpon").importPokemon(poke["ogerpon"])
    field.wonderRoom()

    opponents.get("Urshifu Rapid Strike").damageIs(140.5, 165.7)

    field.wonderRoom()
  })

  it("Should apply the correct damage under Gravity", () => {
    team.selectPokemon("Ogerpon").importPokemon(poke["tyranitar"]).selectAttackTwo()
    opponents.importPokemon(poke["talonflame"])
    field.gravity()

    opponents.get("Talonflame").damageIs(73.5, 86.4)

    field.gravity()
  })
})

describe("Support on the attacker side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["vaporeon"])
  })

  it("Should increase the damage with Helping Hand", () => {
    field.helpingHandAttacker()

    opponents.get("Incineroar").damageIs(71.6, 84.5)

    field.helpingHandAttacker()
  })

  it("Should increase the damage with a critical hit", () => {
    field.criticalHitAttacker()

    opponents.get("Incineroar").damageIs(72.6, 86.5)

    field.criticalHitAttacker()
  })

  it("Should increase the special damage with Battery", () => {
    field.batteryAttacker()

    opponents.get("Incineroar").damageIs(62.6, 74.6)

    field.batteryAttacker()
  })

  it("Should increase the physical damage with Power Spot", () => {
    team.selectPokemon("Vaporeon").importPokemon(poke["baxcalibur"])
    field.powerSpotAttacker()

    opponents.get("Incineroar").damageIs(37.3, 44.7)

    field.powerSpotAttacker()
  })

  it("Should reduce the damage of a speed based move with Tailwind", () => {
    team.selectPokemon("Baxcalibur").importPokemon(poke["bronzong"]).selectAttackThree()
    field.tailwindAttacker()

    opponents.get("Incineroar").damageIs(2.4, 2.9)

    field.tailwindAttacker()
  })

  it("Should increase the damage of a spread move against a single target", () => {
    team.selectPokemon("Bronzong").importPokemon(poke["vaporeon"]).selectAttackThree()
    field.singleTargetAttacker()

    opponents.get("Incineroar").damageIs(53.7, 63.6)

    field.singleTargetAttacker()
  })
})

describe("Screens and protection on the defender side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["ogerpon"])
  })

  it("Should reduce the physical damage with Reflect", () => {
    field.reflectDefender()

    opponents.get("Urshifu Rapid Strike").damageIs(64, 75.4)

    field.reflectDefender()
  })

  it("Should reduce the special damage with Light Screen", () => {
    team.selectPokemon("Ogerpon").importPokemon(poke["vaporeon"])
    field.lightScreenDefender()

    opponents.get("Incineroar").damageIs(32.3, 38.3)

    field.lightScreenDefender()
  })

  it("Should reduce the damage of both categories with Aurora Veil", () => {
    team.selectPokemon("Vaporeon").importPokemon(poke["raichu-alola"])
    field.auroraVeilDefender()

    opponents.get("Incineroar").damageIs(19.4, 23.3)

    team.selectPokemon("Raichu").selectAttackThree()

    opponents.get("Incineroar").damageIs(4.9, 5.9)

    field.auroraVeilDefender()
  })

  it("Should reduce the damage with Friend Guard", () => {
    team.selectPokemon("Raichu").importPokemon(poke["vaporeon"]).selectAttackThree()
    field.friendGuardDefender()

    opponents.get("Incineroar").damageIs(29.8, 35.8)

    field.friendGuardDefender()
  })

  it("Should nullify the damage when the defender is protected", () => {
    field.protectedDefender()

    opponents.get("Incineroar").damageIs(0, 0)

    field.protectedDefender()
  })

  it("Should keep the chip damage of a move that breaks the protection", () => {
    team.selectPokemon("Vaporeon").importPokemon(poke["excadrill-mega"])
    field.protectedDefender()

    opponents.get("Incineroar").damageIs(4.4, 4.9)

    field.protectedDefender()
  })

  it("Should reduce the damage of a speed based move with Tailwind", () => {
    team.selectPokemon("Excadrill").importPokemon(poke["bronzong"])
    team.selectPokemon("Bronzong").selectAttackThree()
    field.tailwindDefender()

    opponents.get("Incineroar").damageIs(9.9, 11.9)

    field.tailwindDefender()
  })
})

describe("Hazards", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["vaporeon"])
  })

  it("Should add the chip damage of three layers of Spikes", () => {
    field.threeSpikesDefender()

    opponents.get("Incineroar").cause2HKO()

    field.threeSpikesDefender()
  })

  it("Should add the chip damage of two layers of Spikes", () => {
    field.twoSpikesDefender()
    team.selectPokemon("Vaporeon").selectStatsModifier("spa", "1")

    opponents.get("Incineroar").haveChanceOfToCauseOHKO(12.5)

    field.twoSpikesDefender()
  })

  it("Should add the chip damage of one layer of Spikes", () => {
    field.oneSpikesDefender()
    team.selectPokemon("Vaporeon").selectStatsModifier("spa", "2")

    opponents.get("Incineroar").causeOHKO()

    field.oneSpikesDefender()
  })

  it("Should add the chip damage of Stealth Rock", () => {
    field.stealthRockDefender()

    opponents.get("Incineroar").causeOHKO()

    field.stealthRockDefender()
  })

  it("Should add the chip damage of Leech Seed on the attacker side", () => {
    field.leechSeedAttacker()

    opponents.get("Incineroar").causeOHKO()

    field.leechSeedAttacker()
  })

  it("Should add the chip damage of Leech Seed on the defender side", () => {
    field.leechSeedDefender()

    opponents.get("Incineroar").causeOHKO()

    field.leechSeedDefender()
  })
})

describe("Neutralizing Gas", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    openTeamVsManyWithDefaultOpponents()
    team.importPokemon(poke["chi-yu"])
  })

  it("Should nullify the ability of the attacker", () => {
    team.selectPokemon("Chi-Yu")
    field.beadsOfRuin()
    field.neutralizingGas()

    opponents.get("Incineroar").damageIs(35.3, 41.7)

    field.neutralizingGas()
    field.beadsOfRuin()
  })

  it("Should protect the ability with an Ability Shield", () => {
    team.selectPokemon("Chi-Yu").importPokemon(poke["chi-yu"])
    team.selectPokemon("Chi-Yu").selectItem("Ability Shield")
    field.neutralizingGas()

    opponents.get("Incineroar").damageIs(31.3, 37.3)

    field.neutralizingGas()
  })

  it("Should nullify the ability of the opponent", () => {
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
    teamsWidget.delete("Team 1")
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
