import { ProbabilityPercentFormatter } from "./probability-percent-formatter"

describe("ProbabilityPercentFormatter", () => {
  let formatter: ProbabilityPercentFormatter

  beforeEach(() => {
    formatter = new ProbabilityPercentFormatter()
  })

  describe("format", () => {
    it("should return a plain zero for a zero probability", () => {
      expect(formatter.format(0)).toBe("0")
    })

    it("should format percentages >= 1 with one decimal place", () => {
      expect(formatter.format(0.5)).toBe("50")
      expect(formatter.format(0.75)).toBe("75")
      expect(formatter.format(1.0)).toBe("100")
    })

    it("should format percentages < 1 with appropriate precision", () => {
      expect(formatter.format(0.01)).toBe("1.0")
      expect(formatter.format(0.001)).toBe("0.10")
      expect(formatter.format(0.0001)).toBe("0.010")
    })

    it("should handle very small percentages", () => {
      expect(formatter.format(0.00001)).toBe("0.001")
    })

    it("should handle one", () => {
      expect(formatter.format(1)).toBe("100")
    })

    it("should format percentages between 0.1 and 1 using >= 1 logic", () => {
      expect(formatter.format(0.05)).toBe("5")
      expect(formatter.format(0.123)).toBe("12.3")
      expect(formatter.format(0.999)).toBe("99.9")
    })

    it("should format percentages between 0.01 and 0.1 with precision 3", () => {
      expect(formatter.format(0.005)).toBe("0.5")
      expect(formatter.format(0.0123)).toBe("1.2")
      expect(formatter.format(0.00999)).toBe("1.0")
    })

    it("should format percentages less than 0.01 with precision 4", () => {
      expect(formatter.format(0.0005)).toBe("0.05")
      expect(formatter.format(0.0002)).toBe("0.02")
      expect(formatter.format(0.0003)).toBe("0.03")
    })

    it("should handle values that result in whole numbers after formatting", () => {
      expect(formatter.format(0.1)).toBe("10")
      expect(formatter.format(0.2)).toBe("20")
    })

    it("should handle values in the precision 2 range (0.1 to 1)", () => {
      expect(formatter.format(0.15)).toBe("15")
      expect(formatter.format(0.25)).toBe("25")
      expect(formatter.format(0.99)).toBe("99")
    })

    it("should handle values in the precision 3 range (0.01 to 0.1)", () => {
      expect(formatter.format(0.015)).toBe("1.5")
      expect(formatter.format(0.025)).toBe("2.5")
      expect(formatter.format(0.099)).toBe("9.9")
    })

    it("should handle values in the precision 4 range (< 0.01)", () => {
      expect(formatter.format(0.0015)).toBe("0.15")
      expect(formatter.format(0.0025)).toBe("0.25")
      expect(formatter.format(0.0005)).toBe("0.05")
    })

    it("should set precision to 4 for negative values less than 0.01", () => {
      expect(formatter.format(-0.0002)).toBe("-0.02")
      expect(formatter.format(-0.0003)).toBe("-0.03")
      expect(formatter.format(-0.0005)).toBe("-0.05")
    })
  })
})
