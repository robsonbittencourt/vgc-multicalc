import { acceptsRisk, formatSuccessChance, formatSurvivalChance, parseSuccessChance } from "@features/pokemon-build/utils/success-chance"

describe("success chance", () => {
  describe("parseSuccessChance", () => {
    it("should read a suggested percentage", () => {
      const chance = parseSuccessChance("85%")

      expect(chance).toBe(0.85)
    })

    it("should read a typed value without the percent sign and with a decimal comma", () => {
      const chance = parseSuccessChance(" 93,7 ")

      expect(chance).toBe(0.937)
    })

    it("should cap values above 100%", () => {
      const chance = parseSuccessChance("140")

      expect(chance).toBe(1)
    })

    it("should raise tiny values to the minimum percentage", () => {
      const chance = parseSuccessChance("0.01")

      expect(chance).toBe(0.001)
    })

    it("should guarantee the success for zero, negative or invalid values", () => {
      const chances = ["0", "-20", "abc", ""].map(parseSuccessChance)

      expect(chances).toEqual([1, 1, 1, 1])
    })
  })

  describe("acceptsRisk", () => {
    it("should accept a risk below 100%", () => {
      const accepted = acceptsRisk("90%")

      expect(accepted).toBe(true)
    })

    it("should not accept a risk at 100%", () => {
      const accepted = acceptsRisk("100%")

      expect(accepted).toBe(false)
    })
  })

  describe("formatSuccessChance", () => {
    it("should round to one decimal", () => {
      const label = formatSuccessChance(0.8125)

      expect(label).toBe("81.3%")
    })

    it("should show a guaranteed chance as 100%", () => {
      const label = formatSuccessChance(1)

      expect(label).toBe("100%")
    })

    it("should never round a chance below 100% up to 100%", () => {
      const label = formatSuccessChance(0.9999)

      expect(label).toBe("99.9%")
    })
  })

  describe("formatSurvivalChance", () => {
    it("should complement the KO chance rounded as in the damage description", () => {
      const label = formatSurvivalChance(0.8125)

      expect(label).toBe("81.2%")
    })

    it("should show one roll out of sixteen as the complement of a 6.3% KO", () => {
      const label = formatSurvivalChance(0.9375)

      expect(label).toBe("93.7%")
    })

    it("should show a guaranteed survival as 100%", () => {
      const label = formatSurvivalChance(1)

      expect(label).toBe("100%")
    })

    it("should never round a survival below 100% up to 100%", () => {
      const label = formatSurvivalChance(0.9999)

      expect(label).toBe("99.9%")
    })
  })
})
