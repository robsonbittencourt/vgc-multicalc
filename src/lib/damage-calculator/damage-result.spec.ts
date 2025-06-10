import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Pokemon } from "@lib/model/pokemon"
import { RollLevelConfig } from "./roll-level-config"

describe("DamageResult", () => {
  it("should remove residual damage info from Damage Result", () => {
    const result = "21.7 - 26% (7.7 - 9.3% recoil damage)"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, "", [])

    expect(damageResult.result).toEqual("21.7 - 26% ")
  })

  it("should not change result when does not have residual damage", () => {
    const result = "21.7 - 26%"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, "", [])

    expect(damageResult.result).toEqual(result)
  })

  it("should add residual damage info to description", () => {
    const result = "21.7 - 26% (7.7 - 9.3% recoil damage)"
    const description = "244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description, [])

    expect(damageResult.description).toEqual("244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO - (7.7 - 9.3% recoil damage)")
  })

  it("should not add residual damage info to description when is combined damage", () => {
    const result = "90.9 - 107.9% (28 - 28% recoil damage)"
    const description = "116+ Atk Rillaboom Wood Hammer AND +1 156+ Def Zamazenta-Crowned Body Press vs. 4 HP / 4 Def Miraidon: 160-190 (90.9 - 107.9%) -- 43.8% chance to OHKO"

    const damageResult = new DamageResult(new Pokemon("Rillaboom"), new Pokemon("Miraidon"), "Wood Hammer", result, "", 1, description, [], new Pokemon("Zamazenta-Crowned"))

    expect(damageResult.description).toEqual("116+ Atk Rillaboom Wood Hammer AND +1 156+ Def Zamazenta-Crowned Body Press vs. 4 HP / 4 Def Miraidon: 160-190 (90.9 - 107.9%) -- 43.8% chance to OHKO")
  })

  it("should not change description when does not have residual damage", () => {
    const result = "21.7 - 26%"
    const description = "244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description, [])

    expect(damageResult.description).toEqual("244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO")
  })

  it("should return correct high roll when have one attacker", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)
    const highRoll = damageResult.damageByRollConfig(RollLevelConfig.high())

    expect(highRoll).toEqual(69)
  })

  it("should return correct high roll when have two attackers", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]
    const secondAttackerRolls = [60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls, new Pokemon("Tyranitar"), secondAttackerRolls)
    const highRoll = damageResult.damageByRollConfig(RollLevelConfig.high())

    expect(highRoll).toEqual(141)
  })

  it("should return correct medium roll when have one attacker", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)
    const mediumRoll = damageResult.damageByRollConfig(RollLevelConfig.medium())

    expect(mediumRoll).toEqual(63)
  })

  it("should return correct medium roll when have two attackers", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]
    const secondAttackerRolls = [60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls, new Pokemon("Tyranitar"), secondAttackerRolls)
    const mediumRoll = damageResult.damageByRollConfig(RollLevelConfig.medium())

    expect(mediumRoll).toEqual(129)
  })

  it("should return correct low roll when have one attacker", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)
    const lowRoll = damageResult.damageByRollConfig(RollLevelConfig.low())

    expect(lowRoll).toEqual(58)
  })

  it("should return correct low roll when have two attackers", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69]
    const secondAttackerRolls = [60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls, new Pokemon("Tyranitar"), secondAttackerRolls)
    const lowRoll = damageResult.damageByRollConfig(RollLevelConfig.low())

    expect(lowRoll).toEqual(118)
  })
})
