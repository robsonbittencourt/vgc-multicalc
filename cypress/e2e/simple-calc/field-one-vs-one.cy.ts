import { smoke } from "@cy-support/smoke"
import { poke, visitApp } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Field } from "@page-object/field"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

const field = new Field()

describe("Screens on the defender side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["baxcalibur"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should apply the correct damage without any screen", () => {
    leftDamageResult.damageIs(0, 25.3, 31.6, 12, 15)
  })

  it("Should reduce the damage with Reflect", () => {
    field.reflectDefender()

    leftDamageResult.damageIs(0, 16.8, 21, 8, 10)

    field.reflectDefender()
  })

  it("Should nullify the damage when the defender is protected", () => {
    field.protectedDefender()

    leftDamageResult.damageIs(0, 0, 0, 0, 0)

    field.protectedDefender()
  })

  it("Should keep the chip damage of a move that breaks the protection", () => {
    leftPokemonBuild.importPokemon(poke["excadrill-mega"])
    field.protectedDefender()

    leftDamageResult.damageIs(0, 3.7, 4.6, 9, 11)

    field.protectedDefender()
  })

  it("Should reduce the special damage with Light Screen", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    leftDamageResult.damageIs(0, 42.1, 49.7, 100, 118)

    field.lightScreenDefender()

    leftDamageResult.damageIs(0, 28.2, 33.3, 67, 79)

    field.lightScreenDefender()
  })

  it("Should reduce the special damage with Aurora Veil", () => {
    field.auroraVeilDefender()

    leftDamageResult.damageIs(0, 28.2, 33.3, 67, 79)

    field.auroraVeilDefender()
  })
})

describe("Screens on the attacker side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    rightPokemonBuild.importPokemon(poke["baxcalibur"])
    leftPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should apply the correct damage without any screen", () => {
    rightDamageResult.damageIs(0, 25.3, 31.6, 12, 15)
  })

  it("Should reduce the damage with Reflect", () => {
    field.reflectAttacker()

    rightDamageResult.damageIs(0, 16.8, 21, 8, 10)

    field.reflectAttacker()
  })

  it("Should nullify the damage when the attacker is protected", () => {
    field.protectedAttacker()

    rightDamageResult.damageIs(0, 0, 0, 0, 0)

    field.protectedAttacker()
  })

  it("Should keep the chip damage of a move that breaks the protection", () => {
    rightPokemonBuild.importPokemon(poke["excadrill-mega"])
    field.protectedAttacker()

    rightDamageResult.damageIs(0, 3.7, 4.6, 9, 11)

    field.protectedAttacker()
  })

  it("Should reduce the special damage with Light Screen", () => {
    rightPokemonBuild.importPokemon(poke["chi-yu"])
    rightDamageResult.damageIs(0, 42.1, 49.7, 100, 118)

    field.lightScreenAttacker()

    rightDamageResult.damageIs(0, 28.2, 33.3, 67, 79)

    field.lightScreenAttacker()
  })

  it("Should reduce the special damage with Aurora Veil", () => {
    field.auroraVeilAttacker()

    rightDamageResult.damageIs(0, 28.2, 33.3, 67, 79)

    field.auroraVeilAttacker()
  })
})

describe("Targeting and support on the attacker side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()
    rightPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should apply the correct damage without any support", () => {
    leftDamageResult.damageIs(1, 22.7, 27.4, 54, 65)
  })

  it("Should increase the damage of a spread move against a single target", () => {
    field.singleTargetAttacker()

    leftDamageResult.damageIs(1, 30.8, 36.7, 73, 87)

    field.singleTargetAttacker()
  })

  it("Should increase the damage with Helping Hand", () => {
    field.helpingHandAttacker()

    leftDamageResult.damageIs(1, 34.1, 40.5, 81, 96)

    field.helpingHandAttacker()
  })

  it("Should increase the damage with a critical hit", () => {
    field.criticalHitAttacker()

    leftDamageResult.damageIs(1, 34.5, 40.9, 82, 97)

    field.criticalHitAttacker()
  })

  it("Should increase the special damage with Battery", () => {
    field.batteryAttacker()

    leftDamageResult.damageIs(1, 30.3, 35.4, 72, 84)

    field.batteryAttacker()
  })

  it("Should increase the damage with Power Spot", () => {
    field.powerSpotAttacker()

    leftDamageResult.damageIs(1, 30.3, 35.4, 72, 84)

    field.powerSpotAttacker()
  })

  it("Should reduce the damage of a speed based move with Tailwind", () => {
    leftPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()
    leftDamageResult.damageIs(2, 4.2, 5, 10, 12)

    field.tailwindAttacker()

    leftDamageResult.damageIs(2, 2.5, 2.9, 6, 7)

    field.tailwindAttacker()
  })

  it("Should reduce the damage with Friend Guard", () => {
    leftPokemonBuild.importPokemon(poke["vaporeon"])
    rightPokemonBuild.importPokemon(poke["baxcalibur"])
    rightDamageResult.damageIs(0, 25.3, 31.6, 12, 15)

    field.friendGuardAttacker()

    rightDamageResult.damageIs(0, 18.9, 23.2, 9, 11)

    field.friendGuardAttacker()
  })
})

describe("Targeting and support on the defender side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    rightPokemonBuild.importPokemon(poke["vaporeon"])
    leftPokemonBuild.importPokemon(poke["raichu-alola"])
  })

  it("Should apply the correct damage without any support", () => {
    rightDamageResult.damageIs(0, 42.2, 49.6, 57, 67)
  })

  it("Should increase the damage with Helping Hand", () => {
    field.helpingHandDefender()

    rightDamageResult.damageIs(0, 62.2, 73.3, 84, 99)

    field.helpingHandDefender()
  })

  it("Should increase the damage with a critical hit", () => {
    field.criticalHitDefender()

    rightDamageResult.damageIs(0, 62.2, 74, 84, 100)

    field.criticalHitDefender()
  })

  it("Should increase the special damage with Battery", () => {
    field.batteryDefender()

    rightDamageResult.damageIs(0, 54, 64.4, 73, 87)

    field.batteryDefender()
  })

  it("Should increase the damage with Power Spot", () => {
    field.powerSpotDefender()

    rightDamageResult.damageIs(0, 54, 64.4, 73, 87)

    field.powerSpotDefender()
  })

  it("Should reduce the damage of a speed based move with Tailwind", () => {
    rightPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()
    rightDamageResult.damageIs(2, 20, 24.4, 27, 33)

    field.tailwindDefender()

    rightDamageResult.damageIs(2, 10.3, 12.5, 14, 17)

    field.tailwindDefender()
  })

  it("Should increase the damage of a spread move against a single target", () => {
    rightPokemonBuild.importPokemon(poke["chi-yu"]).selectAttackTwo()
    leftPokemonBuild.importPokemon(poke["raichu-alola"])
    rightDamageResult.damageIs(1, 88.8, 105.1, 120, 142)

    field.singleTargetDefender()

    rightDamageResult.damageIs(1, 118.5, 140.7, 160, 190)

    field.singleTargetDefender()
  })
})

describe("Hazards on the attacker side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["vaporeon"])
    rightPokemonBuild.importPokemon(poke["baxcalibur"])
  })

  it("Should add the chip damage of one layer of Spikes", () => {
    field.oneSpikesAttacker()

    rightDamageResult.haveChanceOfToCause4HKO(99.9)
  })

  it("Should add the chip damage of two layers of Spikes", () => {
    field.twoSpikesAttacker()

    rightDamageResult.cause4HKO()
  })

  it("Should add the chip damage of three layers of Spikes", () => {
    field.threeSpikesAttacker()

    rightDamageResult.haveChanceOfToCause3HKO(76.7)
  })

  it("Should add the chip damage of Stealth Rock", () => {
    field.stealthRockAttacker()

    rightDamageResult.cause3HKO()

    field.stealthRockAttacker()
  })

  it("Should add the chip damage of Leech Seed", () => {
    field.leechSeedAttacker()

    rightDamageResult.haveChanceOfToCause2HKO(0.1)

    field.leechSeedAttacker()
  })
})

describe("Hazards on the defender side", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["raichu-alola"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should add the chip damage of one layer of Spikes", () => {
    field.oneSpikesDefender()

    leftDamageResult.cause2HKO()
  })

  it("Should add the chip damage of two layers of Spikes", () => {
    field.twoSpikesDefender()
    leftPokemonBuild.selectStatsModifier("spa", "1")

    leftDamageResult.haveChanceOfToCauseOHKO(62.5)

    leftPokemonBuild.importPokemon(poke["raichu-alola"])
  })

  it("Should add the chip damage of three layers of Spikes", () => {
    leftPokemonBuild.importPokemon(poke["baxcalibur"])
    field.threeSpikesDefender()

    leftDamageResult.haveChanceOfToCause3HKO(76.7)
  })

  it("Should add the chip damage of Stealth Rock", () => {
    field.stealthRockDefender()

    leftDamageResult.cause3HKO()

    field.stealthRockDefender()
  })

  it("Should recover the attacker with Leech Seed on the defender side", () => {
    leftPokemonBuild.importPokemon(poke["raichu-alola"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])
    field.leechSeedAttacker()

    leftDamageResult.cause2HKO().afterLeechSeedRecovery()

    field.leechSeedAttacker()
  })

  it("Should damage the defender with Leech Seed on its own side", () => {
    field.leechSeedDefender()

    leftDamageResult.cause2HKO().afterLeechSeedDamage()

    field.leechSeedDefender()
  })
})

describe("Ruins and Fairy Aura", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["baxcalibur"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should apply the correct damage without any Ruin ability", () => {
    leftDamageResult.damageIs(0, 25.3, 31.6, 12, 15)
  })

  it("Should reduce the physical damage with Tablets of Ruin", () => {
    field.tabletsOfRuin()

    leftDamageResult.damageIs(0, 18.9, 25.3, 9, 12)

    field.tabletsOfRuin()
  })

  it("Should increase the physical damage with Sword of Ruin", () => {
    field.swordOfRuin()

    leftDamageResult.damageIs(0, 33.7, 42.1, 16, 20)

    field.swordOfRuin()
  })

  it("Should reduce the special damage with Vessel of Ruin", () => {
    leftPokemonBuild.importPokemon(poke["hatterene"]).selectAttackTwo()
    leftDamageResult.damageIs(1, 16.4, 19.4, 39, 46)

    field.vesselOfRuin()

    leftDamageResult.damageIs(1, 12.6, 15.1, 30, 36)

    field.vesselOfRuin()
  })

  it("Should increase the special damage with Beads of Ruin", () => {
    field.beadsOfRuin()

    leftDamageResult.damageIs(1, 21.5, 25.7, 51, 61)

    field.beadsOfRuin()
  })

  it("Should increase the fairy damage with Fairy Aura", () => {
    rightPokemonBuild.importPokemon(poke["dragonite"])
    leftDamageResult.damageIs(1, 37.5, 45.6, 74, 90)

    field.fairyAura()

    leftDamageResult.damageIs(1, 51.7, 60.9, 102, 120)

    field.fairyAura()
  })
})

describe("Weather", { testIsolation: false }, () => {
  before(() => {
    visitApp()
  })

  smoke("Should apply the correct damage under the Sun", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])

    field.sun()

    leftDamageResult.damageIs(0, 63.2, 74.6, 150, 177)
    rightDamageResult.damageIs(0, 26.4, 32.3, 36, 44)

    field.sun()
  })

  it("Should apply the correct damage under the Rain", () => {
    leftPokemonBuild.importPokemon(poke["dondozo"])
    rightPokemonBuild.importPokemon(poke["rhyperior"])

    field.rain()

    leftDamageResult.damageIs(0, 166, 198.1, 352, 420)
    rightDamageResult.damageIs(0, 4.8, 6.1, 11, 14)

    field.rain()
  })

  it("Should apply the correct damage under the Sand", () => {
    leftPokemonBuild.importPokemon(poke["hatterene"]).selectAttackTwo().terastalyze()
    rightPokemonBuild.importPokemon(poke["rhyperior"])

    field.sand()

    leftDamageResult.damageIs(1, 12.7, 15.5, 27, 33)
    rightDamageResult.damageIs(0, 12.1, 14.6, 20, 24)

    field.sand()
  })

  it("Should apply the correct damage under the Snow", () => {
    leftPokemonBuild.importPokemon(poke["baxcalibur"])
    rightPokemonBuild.importPokemon(poke["talonflame"]).selectAttackFour().terastalyze()

    field.snow()

    leftDamageResult.damageIs(0, 21.6, 27, 8, 10)
    rightDamageResult.damageIs(3, 19.4, 23.6, 37, 45)

    field.snow()
  })
})

describe("Terrains", { testIsolation: false }, () => {
  before(() => {
    visitApp()
  })

  it("Should apply the correct damage under the Electric Terrain", () => {
    leftPokemonBuild.importPokemon(poke["raichu-alola"])
    rightPokemonBuild.importPokemon(poke["kyogre"]).selectAttackFour()

    field.eletricTerrain()

    leftDamageResult.damageIs(0, 60.4, 71.8, 116, 138)
    rightDamageResult.damageIs(3, 37, 43.7, 50, 59)

    field.eletricTerrain()
  })

  it("Should apply the correct damage under the Grassy Terrain", () => {
    leftPokemonBuild.importPokemon(poke["ogerpon"])
    rightPokemonBuild.importPokemon(poke["kyogre"])

    field.grassyTerrain()

    leftDamageResult.damageIs(0, 106.2, 125, 204, 240)
    rightDamageResult.damageIs(0, 47.2, 55.7, 78, 92)

    field.grassyTerrain()
  })

  it("Should apply the correct damage under the Psychic Terrain", () => {
    leftPokemonBuild.importPokemon(poke["hatterene"])
    rightPokemonBuild.importPokemon(poke["hatterene"])

    field.psychicTerrain()

    leftDamageResult.damageIs(0, 18.2, 21.9, 30, 36)
    rightDamageResult.damageIs(0, 18.2, 21.9, 30, 36)

    field.psychicTerrain()
  })

  it("Should apply the correct damage under the Misty Terrain", () => {
    rightPokemonBuild.importPokemon(poke["baxcalibur"])

    field.mistyTerrain()

    leftDamageResult.damageIs(0, 33.6, 40, 64, 76)
    rightDamageResult.damageIs(0, 64, 76.2, 21, 25)

    field.mistyTerrain()
  })
})

describe("Rooms and Gravity", { testIsolation: false }, () => {
  before(() => {
    visitApp()
  })

  it("Should apply the correct damage under Gravity", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"]).selectAttackTwo().terastalyze()
    rightPokemonBuild.importPokemon(poke["dragonite"])

    field.gravity()

    leftDamageResult.damageIs(1, 37.5, 44.6, 74, 88)
    rightDamageResult.damageIs(0, 36, 42.4, 67, 79)

    field.gravity()
  })

  it("Should ignore the items under the Magic Room", () => {
    leftPokemonBuild.importPokemon(poke["ogerpon"]).selectItem("Choice Band")
    rightPokemonBuild.importPokemon(poke["vaporeon"]).selectItem("Choice Specs")

    field.magicRoom()

    leftDamageResult.damageIs(0, 68.3, 81, 162, 192)
    rightDamageResult.damageIs(0, 15.1, 18.1, 25, 30)

    field.magicRoom()
  })

  it("Should swap the defensive stats under the Wonder Room", () => {
    leftPokemonBuild.importPokemon(poke["ogerpon"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])

    field.wonderRoom()

    leftDamageResult.damageIs(0, 71.7, 86, 170, 204)
    rightDamageResult.damageIs(0, 16.3, 19.3, 27, 32)

    field.wonderRoom()
  })
})

describe("Abilities", { testIsolation: false }, () => {
  before(() => {
    visitApp()
    leftPokemonBuild.importPokemon(poke["chi-yu"])
    rightPokemonBuild.importPokemon(poke["vaporeon"])
  })

  it("Should apply the correct damage without Neutralizing Gas", () => {
    leftDamageResult.damageIs(0, 42.1, 49.7, 100, 118)
  })

  it("Should nullify the ability of the attacker with Neutralizing Gas", () => {
    field.neutralizingGas()

    leftDamageResult.damageIs(0, 31.6, 37.5, 75, 89)

    field.neutralizingGas()
  })

  it("Should protect the ability with an Ability Shield under Neutralizing Gas", () => {
    leftPokemonBuild.importPokemon(poke["chi-yu"]).selectItem("Ability Shield")
    field.neutralizingGas()

    leftDamageResult.damageIs(0, 28.2, 33.3, 67, 79)

    field.neutralizingGas()
  })

  it("Should nullify the berry of the defender with Unnerve", () => {
    leftPokemonBuild.importPokemon(poke["tyranitar"]).selectAttackFour()
    rightPokemonBuild.importPokemon(poke["farigiraf-colbur-berry"])
    leftDamageResult.descriptionContains("Colbur Berry")

    field.unnerve()

    leftDamageResult.descriptionNotContains("Colbur Berry")

    field.unnerve()
  })
})

describe("Automatic field by ability", () => {
  it("Should activate the Sun with Drought and clear it when the Pokémon changes", () => {
    leftPokemonBuild.importPokemon(poke["groudon"])

    field.isActiveOption("sun")

    leftPokemonBuild.importPokemon(poke["dragonite"])

    field.isNotActiveOption("sun")
  })

  it("Should activate the weather of the Pokémon of the right side", () => {
    rightPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")
  })

  it("Should keep the weather of the side that changed last", () => {
    leftPokemonBuild.importPokemon(poke["groudon"])
    rightPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")
    field.isNotActiveOption("sun")
  })

  it("Should not activate the weather again when the user turned it off and the other side changes", () => {
    leftPokemonBuild.importPokemon(poke["kyogre"])

    field.isActiveOption("rain")

    field.rain()

    field.isNotActiveOption("rain")

    rightPokemonBuild.importPokemon(poke["rillaboom"])

    field.isNotActiveOption("rain")
  })
})

describe("Paradox ability activated by the field", () => {
  it("Should activate Protosynthesis on both Pokémon when the Sun is turned on", () => {
    leftPokemonBuild.importPokemon(poke["great-tusk-high-atk"])
    rightPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])

    leftPokemonBuild.abilityIsNotActivated()
    rightPokemonBuild.abilityIsNotActivated()

    field.sun()

    leftPokemonBuild.abilityIsActivated()
    rightPokemonBuild.abilityIsActivated()

    field.sun()

    leftPokemonBuild.abilityIsNotActivated()
    rightPokemonBuild.abilityIsNotActivated()
  })

  it("Should activate Quark Drive on both Pokémon when the Electric Terrain is turned on", () => {
    leftPokemonBuild.importPokemon(poke["iron-treads-high-atk"])
    rightPokemonBuild.importPokemon(poke["iron-moth-high-spa"])

    leftPokemonBuild.abilityIsNotActivated()
    rightPokemonBuild.abilityIsNotActivated()

    field.eletricTerrain()

    leftPokemonBuild.abilityIsActivated()
    rightPokemonBuild.abilityIsActivated()

    field.eletricTerrain()

    leftPokemonBuild.abilityIsNotActivated()
    rightPokemonBuild.abilityIsNotActivated()
  })

  it("Should keep the ability activated by the user when the weather is turned off", () => {
    leftPokemonBuild.importPokemon(poke["great-tusk-high-atk"])
    rightPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])

    leftPokemonBuild.activateAbility()
    leftPokemonBuild.abilityIsActivated()

    field.sun()
    field.sun()

    leftPokemonBuild.abilityIsActivated()
    rightPokemonBuild.abilityIsNotActivated()
  })

  it("Should disable the ability check when the field already activates it", () => {
    leftPokemonBuild.importPokemon(poke["great-tusk-high-atk"])
    rightPokemonBuild.importPokemon(poke["flutter-mane-high-spa"])

    leftPokemonBuild.abilityCheckIsEnabled()

    field.sun()

    leftPokemonBuild.abilityCheckIsDisabled()
    rightPokemonBuild.abilityCheckIsDisabled()

    field.sun()

    leftPokemonBuild.abilityCheckIsEnabled()
  })
})
