import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Test calcs from moves with some mechanic", () => {
  describe("Knock off", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["tyranitar"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])
    })

    it("with item", () => {
      leftPokemonBuild.selectAttackFour()

      leftDamageResult.damageIs(3, 72.9, 85.9, 151, 178)
      rightDamageResult.surviveWithThisHpAmmount(29)
    })

    it("without item", () => {
      rightPokemonBuild.selectItem("(none)")
      leftPokemonBuild.selectAttackFour()

      leftDamageResult.damageIs(3, 49.2, 57.9, 102, 120)
      rightDamageResult.surviveWithThisHpAmmount(87)
    })
  })

  describe("Unburden", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["bronzong"])
      rightPokemonBuild.importPokemon(poke["sneasler"])
    })

    it("without Unburden actived", () => {
      leftPokemonBuild.selectAttackThree()

      leftDamageResult.damageIs(2, 44.2, 52.5, 69, 82)
      rightDamageResult.surviveWithThisHpAmmount(74)
    })

    it("with Unburden actived", () => {
      rightPokemonBuild.activateAbility()
      leftPokemonBuild.selectAttackThree()

      leftDamageResult.damageIs(2, 73.7, 87.1, 115, 136)
      rightDamageResult.surviveWithThisHpAmmount(20)
    })
  })

  describe("Analytic", () => {
    it("when Pokémon is faster Analytic was not activated", () => {
      leftPokemonBuild.importPokemon(poke["porygon2"])
      rightPokemonBuild.importPokemon(poke["ting-lu"])

      leftDamageResult.damageIs(0, 24.4, 29.5, 58, 70)
      rightDamageResult.surviveWithThisHpAmmount(167)
    })

    it("when Pokémon is slower Analytic was activated", () => {
      leftPokemonBuild.importPokemon(poke["porygon2"])
      rightPokemonBuild.importPokemon(poke["ting-lu-speed"])

      leftDamageResult.damageIs(0, 32, 37.9, 76, 90)
      rightDamageResult.surviveWithThisHpAmmount(147)
    })
  })

  describe("Water Spout", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["kyogre"])
      rightPokemonBuild.importPokemon(poke["tyranitar"])
    })

    it("with 100% hp", () => {
      leftPokemonBuild.hpPercentage(100)

      leftDamageResult.damageIs(0, 110.7, 132.2, 206, 246)
      rightDamageResult.isFainted()
    })

    it("with 75% hp", () => {
      leftPokemonBuild.hpPercentage(75)

      leftDamageResult.damageIs(0, 81.7, 97.8, 152, 182)
      rightDamageResult.surviveWithThisHpAmmount(4)
    })

    it("with 10% hp", () => {
      leftPokemonBuild.hpPercentage(10)

      leftDamageResult.damageIs(0, 10.7, 13.9, 20, 26)
      rightDamageResult.surviveWithThisHpAmmount(160)
    })
  })

  describe("Blaze", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["blaziken"])
      rightPokemonBuild.importPokemon(poke["tyranitar"])
    })

    it("with 100% hp", () => {
      leftPokemonBuild.hpPercentage(100)

      leftDamageResult.damageIs(0, 26.3, 31.1, 49, 58)
      rightDamageResult.surviveWithThisHpAmmount(128)
    })

    it("with 34% hp", () => {
      leftPokemonBuild.hpPercentage(34)

      leftDamageResult.damageIs(0, 26.3, 31.1, 49, 58)
      rightDamageResult.surviveWithThisHpAmmount(128)
    })

    it("with 33% hp", () => {
      leftPokemonBuild.hpPercentage(33)

      leftDamageResult.damageIs(0, 39.2, 46.7, 73, 87)
      rightDamageResult.surviveWithThisHpAmmount(99)
    })

    it("with 1% hp", () => {
      leftPokemonBuild.hpPercentage(1)

      leftDamageResult.damageIs(0, 39.2, 46.7, 73, 87)
      rightDamageResult.surviveWithThisHpAmmount(99)
    })
  })

  describe("Last Respects", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["basculegion"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])
    })

    it("with 0 ally fainted", () => {
      leftDamageResult.damageIs(0, 33.3, 39.6, 69, 82)
    })

    it("with 1 ally fainted", () => {
      leftPokemonBuild.allieFainted(1)

      leftDamageResult.damageIs(0, 66.6, 78.7, 138, 163)
    })

    it("with 2 allie fainted", () => {
      leftPokemonBuild.allieFainted(2)

      leftDamageResult.damageIs(0, 99, 117.3, 205, 243)
    })

    it("with 3 allie fainted", () => {
      leftPokemonBuild.allieFainted(3)

      leftDamageResult.damageIs(0, 132.3, 156.5, 274, 324)
    })

    it("with 4 allie fainted", () => {
      leftPokemonBuild.allieFainted(4)

      leftDamageResult.damageIs(0, 165.2, 194.6, 342, 403)
    })

    it("with 5 allie fainted", () => {
      leftPokemonBuild.allieFainted(5)

      leftDamageResult.damageIs(0, 198.5, 233.8, 411, 484)
    })

    it("with 6 allie fainted", () => {
      leftPokemonBuild.allieFainted(6)

      leftDamageResult.damageIs(0, 230.9, 272.4, 478, 564)
    })

    it("with 7 allie fainted", () => {
      leftPokemonBuild.allieFainted(7)

      leftDamageResult.damageIs(0, 264.2, 311.5, 547, 645)
    })
  })

  describe("Rage Fist", () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(poke["annihilape"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])
    })

    it("with 0 hit taken", () => {
      leftDamageResult.damageIs(0, 20.7, 25.1, 43, 52)
    })

    it("with 1 hit taken", () => {
      leftPokemonBuild.hitsTaken(1)

      leftDamageResult.damageIs(0, 41, 49.2, 85, 102)
    })

    it("with 2 hits taken", () => {
      leftPokemonBuild.hitsTaken(2)

      leftDamageResult.damageIs(0, 61.3, 72.9, 127, 151)
    })

    it("with 3 hits taken", () => {
      leftPokemonBuild.hitsTaken(3)

      leftDamageResult.damageIs(0, 81.6, 97.1, 169, 201)
    })

    it("with 4 hits taken", () => {
      leftPokemonBuild.hitsTaken(4)

      leftDamageResult.damageIs(0, 101.9, 120.7, 211, 250)
    })

    it("with 5 hits taken", () => {
      leftPokemonBuild.hitsTaken(5)

      leftDamageResult.damageIs(0, 123.1, 144.9, 255, 300)
    })

    it("with 6 hits taken", () => {
      leftPokemonBuild.hitsTaken(6)

      leftDamageResult.damageIs(0, 143.4, 168.5, 297, 349)
    })
  })

  describe("Zacian and Zamazenta boost", () => {
    it("Zacian should have +1 in attack", () => {
      leftPokemonBuild.importPokemon(poke["zacian"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftPokemonBuild.boostsIs(1, 0, 0, 0, 0)
      leftDamageResult.damageIs(0, 85.9, 101.4, 178, 210)
    })

    it("Zacian Crowned should have +1 in attack", () => {
      leftPokemonBuild.importPokemon(poke["zacian-crowned"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftPokemonBuild.boostsIs(1, 0, 0, 0, 0)
      leftDamageResult.damageIs(0, 69.5, 81.6, 144, 169)
    })

    it("Zacian should have +1 in attack when it is defender", () => {
      leftPokemonBuild.importPokemon(poke["farigiraf"])
      rightPokemonBuild.importPokemon(poke["zacian"])

      rightPokemonBuild.boostsIs(1, 0, 0, 0, 0)
      leftDamageResult.damageIs(0, 20.3, 23.9, 34, 40)
    })

    it("Zacian Crowned should have +1 in attack when it is defender", () => {
      leftPokemonBuild.importPokemon(poke["farigiraf"])
      rightPokemonBuild.importPokemon(poke["zacian-crowned"])

      rightPokemonBuild.boostsIs(1, 0, 0, 0, 0)
      leftDamageResult.damageIs(0, 19.3, 23, 37, 44)
    })

    it("Zamazenta should have +1 in defense when it is attacker", () => {
      leftPokemonBuild.importPokemon(poke["zamazenta"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)
      leftDamageResult.damageIs(0, 43.4, 51.2, 90, 106)
    })

    it("Zamazenta Crowned should have +1 in defense when it is attacker", () => {
      leftPokemonBuild.importPokemon(poke["zamazenta-crowned"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftPokemonBuild.boostsIs(0, 1, 0, 0, 0)
      leftDamageResult.damageIs(0, 57, 67.1, 118, 139)
    })

    it("Zamazenta should have +1 in defense when it is defender", () => {
      leftPokemonBuild.importPokemon(poke["zacian"])
      rightPokemonBuild.importPokemon(poke["zamazenta"])

      rightPokemonBuild.boostsIs(0, 1, 0, 0, 0)
      leftDamageResult.damageIs(0, 90.4, 106.5, 180, 212)
    })

    it("Zamazenta Crowned should have +1 in defense when it is defender", () => {
      leftPokemonBuild.importPokemon(poke["zacian"])
      rightPokemonBuild.importPokemon(poke["zamazenta-crowned"])

      rightPokemonBuild.boostsIs(0, 1, 0, 0, 0)
      leftDamageResult.damageIs(0, 38.1, 45.3, 69, 82)
    })

    it("Should not change boosts with another Pokémon", () => {
      leftPokemonBuild.importPokemon(poke["annihilape"])
      rightPokemonBuild.importPokemon(poke["rillaboom"])

      leftPokemonBuild.boostsIs(0, 0, 0, 0, 0)
      rightPokemonBuild.boostsIs(0, 0, 0, 0, 0)
    })
  })

  describe("Ogerpon boost", () => {
    it("Ogerpon Teal should receive +1 in speed when terastalyze", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon"])
      rightPokemonBuild.importPokemon(poke["bronzong"]).selectAttackThree()

      rightDamageResult.damageIs(2, 25.4, 30.9, 42, 51)

      leftPokemonBuild.terastalyze()
      rightDamageResult.damageIs(2, 38.1, 45.4, 63, 75)
    })

    it("Ogerpon Cornerstone should receive +1 in defense when terastalyze", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon-cornerstone"])
      rightPokemonBuild.importPokemon(poke["basculegion"])

      rightDamageResult.damageIs(0, 48, 56.4, 75, 88)

      leftPokemonBuild.terastalyze()
      rightDamageResult.damageIs(0, 32.6, 38.4, 51, 60)
    })

    it("Ogerpon Hearthflame should receive +1 in attack when terastalyze", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon-hearthflame"])
      rightPokemonBuild.importPokemon(poke["basculegion"])

      leftDamageResult.damageIs(0, 38.2, 44.8, 75, 88)

      leftPokemonBuild.terastalyze()
      leftDamageResult.damageIs(0, 76.5, 90.3, 150, 177)
    })

    it("Ogerpon Wellspring should receive +1 in special defense when terastalyze", () => {
      leftPokemonBuild.importPokemon(poke["ogerpon-wellspring"])
      rightPokemonBuild.importPokemon(poke["farigiraf"]).selectAttackTwo()

      rightDamageResult.damageIs(1, 23.2, 28.1, 43, 52)

      leftPokemonBuild.terastalyze()
      rightDamageResult.damageIs(1, 16.2, 19.4, 30, 36)
    })
  })
})
