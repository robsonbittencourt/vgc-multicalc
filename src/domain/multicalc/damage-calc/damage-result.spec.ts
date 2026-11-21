import { DamageResult } from "@multicalc/damage-calc/damage-result"
import { Pokemon } from "@multicalc/model/pokemon"
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
    const description = "31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description, [])

    expect(damageResult.description).toEqual("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO - (7.7 - 9.3% recoil damage)")
  })

  it("should not add residual damage info to description when is combined damage", () => {
    const result = "90.9 - 107.9% (28 - 28% recoil damage)"
    const description = "15+ Atk Rillaboom Wood Hammer AND +1 20+ Def Zamazenta-Crowned Body Press vs. 1 HP / 1 Def Miraidon: 160-190 (90.9 - 107.9%) -- 43.8% chance to OHKO"

    const damageResult = new DamageResult(new Pokemon("Rillaboom"), new Pokemon("Miraidon"), "Wood Hammer", result, "", 1, description, [], new Pokemon("Zamazenta-Crowned"))

    expect(damageResult.description).toEqual("15+ Atk Rillaboom Wood Hammer AND +1 20+ Def Zamazenta-Crowned Body Press vs. 1 HP / 1 Def Miraidon: 160-190 (90.9 - 107.9%) -- 43.8% chance to OHKO")
  })

  it("should not change description when does not have residual damage", () => {
    const result = "21.7 - 26%"
    const description = "31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description, [])

    expect(damageResult.description).toEqual("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO")
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

  it("should return the damage as a percentage of the defender max HP using the roll level", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 122]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)
    const percentage = damageResult.damagePercentage(RollLevelConfig.high())

    expect(percentage).toBeCloseTo(66.67, 2)
  })

  it("should discount the berry HP from the damage percentage", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 122]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls, undefined, undefined, 61)
    const percentage = damageResult.damagePercentage(RollLevelConfig.high())

    expect(percentage).toBeCloseTo(33.33, 2)
  })

  it("should need one hit to KO when the roll equals the defender HP", () => {
    const attackerRolls = [150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 180, 183]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)

    expect(damageResult.hitsToKo(RollLevelConfig.high())).toEqual(1)
  })

  it("should round up the hits to KO using the selected roll level", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 92]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 1, "", attackerRolls)

    expect(damageResult.hitsToKo(RollLevelConfig.high())).toEqual(2)
    expect(damageResult.hitsToKo(RollLevelConfig.low())).toEqual(4)
  })

  it("should count the hits to KO from the defender current HP", () => {
    const attackerRolls = [58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 92]

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp", { hpPercentage: 50 }), "", "", "", 1, "", attackerRolls)

    expect(damageResult.hitsToKo(RollLevelConfig.high())).toEqual(1)
  })

  it("should never KO when the attack deals no damage", () => {
    const attackerRolls = new Array(16).fill(0)

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "", "", "", 0, "", attackerRolls)

    expect(damageResult.hitsToKo(RollLevelConfig.high())).toEqual(Infinity)
  })

  describe("describe", () => {
    const description = "31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    it("should keep the English description in English or without a describer", () => {
      const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", "21.7 - 26%", "", 1, description, [])

      expect([damageResult.describe("en"), damageResult.describe("es")]).toEqual([description, description])
    })

    it("should describe in the language once and add its residual damage", () => {
      const describer = vi.fn(() => ({ result: "21.7 - 26% (7.7 - 9.3% de daño de retroceso)", description: "31 Atq Incineroar Envite Ígneo vs. 1 PS / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- 4HKO garantizado" }))
      const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", "21.7 - 26%", "", 1, description, []).withDescriber(describer)

      const first = damageResult.describe("es")
      const second = damageResult.describe("es")

      expect(first).toBe("31 Atq Incineroar Envite Ígneo vs. 1 PS / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- 4HKO garantizado - (7.7 - 9.3% de daño de retroceso)")
      expect(second).toBe(first)
      expect(describer).toHaveBeenCalledTimes(1)
    })

    it("should not add the residual damage to a combined description in Spanish", () => {
      const combined = "Kingambit Genufendiente Y Incineroar Envite Ígneo vs. Amoonguss: 352-414 (159.2 - 187.3%) -- OHKO garantizado"
      const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", "21.7 - 26%", "", 1, description, []).withDescriber(() => ({
        result: "159.2 - 187.3% (7.7 - 9.3% de daño de retroceso)",
        description: combined
      }))

      expect(damageResult.describe("es")).toBe(combined)
    })
  })

  describe("cardDescription", () => {
    const cardOf = (description: string) => new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", "21.7 - 26%", "", 1, description, [])

    it("should keep only the damage and the KO chance", () => {
      const card = cardOf("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO").cardDescription("en")

      expect(card).toBe("49-58 (26.6 - 31.5%) -- guaranteed 4HKO")
    })

    it("should drop the end of turn effects and the residual damage after the KO chance", () => {
      const cards = [
        cardOf("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- 37.5% chance to 3HKO after Stealth Rock").cardDescription("en"),
        cardOf("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO - (7.7 - 9.3% recoil damage)").cardDescription("en"),
        cardOf("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 3HKO after Stealth Rock - (7.7 - 9.3% recoil damage)").cardDescription("en")
      ]

      expect(cards).toEqual(["49-58 (26.6 - 31.5%) -- 37.5% chance to 3HKO", "49-58 (26.6 - 31.5%) -- guaranteed 4HKO", "49-58 (26.6 - 31.5%) -- guaranteed 3HKO"])
    })

    it("should drop the end of turn effects with the word of the language", () => {
      const damageResult = cardOf("31 Atk Incineroar Flare Blitz vs. 1 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 3HKO").withDescriber(() => ({
        result: "21.7 - 26%",
        description: "31 Atq Incineroar Envite Ígneo vs. 1 PS / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- 37.5% de probabilidad de 3HKO tras Trampa Rocas"
      }))

      expect(damageResult.cardDescription("es")).toBe("49-58 (26.6 - 31.5%) -- 37.5% de probabilidad de 3HKO")
    })

    it("should keep a description without KO chance or without stats", () => {
      const cards = [cardOf("Incineroar Will-O-Wisp vs. Garchomp: 0-0 (0 - 0%)").cardDescription("en"), cardOf("possibly the worst move ever").cardDescription("en")]

      expect(cards).toEqual(["0-0 (0 - 0%)", "possibly the worst move ever"])
    })
  })
})
