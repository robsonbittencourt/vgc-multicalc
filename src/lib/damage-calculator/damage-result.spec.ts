import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Pokemon } from "@lib/model/pokemon"

describe("DamageMultiCalcService", () => {
  it("should remove residual damage info from Damage Result", () => {
    const result = "21.7 - 26% (7.7 - 9.3% recoil damage)"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, "")

    expect(damageResult.result).toEqual("21.7 - 26% ")
  })

  it("should not change result when does not have residual damage", () => {
    const result = "21.7 - 26%"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, "")

    expect(damageResult.result).toEqual(result)
  })

  it("should add residual damage info to description", () => {
    const result = "21.7 - 26% (7.7 - 9.3% recoil damage)"
    const description = "244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description)

    expect(damageResult.description).toEqual("244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO - (7.7 - 9.3% recoil damage)")
  })

  it("should not change description when does not have residual damage", () => {
    const result = "21.7 - 26%"
    const description = "244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO"

    const damageResult = new DamageResult(new Pokemon("Incineroar"), new Pokemon("Garchomp"), "Flare Blitz", result, "", 1, description)

    expect(damageResult.description).toEqual("244 Atk Incineroar Flare Blitz vs. 4 HP / 0 Def Garchomp: 49-58 (26.6 - 31.5%) -- guaranteed 4HKO")
  })
})
