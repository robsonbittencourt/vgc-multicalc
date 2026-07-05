import { ProbabilityPercentPipe } from "./probability-percent.pipe"

describe("ProbabilityPercentPipe", () => {
  let pipe: ProbabilityPercentPipe

  beforeEach(() => {
    pipe = new ProbabilityPercentPipe()
  })

  it("should be created", () => {
    expect(pipe).toBeTruthy()
  })

  describe("transform", () => {
    it("should format percentages >= 1 with one decimal place", () => {
      expect(pipe.transform(0.5)).toBe("50")
      expect(pipe.transform(0.75)).toBe("75")
      expect(pipe.transform(1.0)).toBe("100")
    })

    it("should format percentages < 1 with appropriate precision", () => {
      expect(pipe.transform(0.01)).toBe("1.0")
      expect(pipe.transform(0.001)).toBe("0.10")
      expect(pipe.transform(0.0001)).toBe("0.010")
    })

    it("should handle very small percentages", () => {
      const result = pipe.transform(0.00001)

      expect(result).toContain(".")
      expect(parseFloat(result)).toBeGreaterThan(0)
    })

    it("should handle zero", () => {
      expect(pipe.transform(0)).toBe("0")
    })

    it("should handle one", () => {
      expect(pipe.transform(1)).toBe("100")
    })

    it("should format percentages between 0.1 and 1 using >= 1 logic", () => {
      expect(pipe.transform(0.05)).toBe("5")
      expect(pipe.transform(0.123)).toBe("12.3")
      expect(pipe.transform(0.999)).toBe("99.9")
    })

    it("should format percentages between 0.01 and 0.1 with precision 3", () => {
      expect(pipe.transform(0.005)).toBe("0.5")
      expect(pipe.transform(0.0123)).toBe("1.2")
      expect(pipe.transform(0.00999)).toBe("1.0")
    })

    it("should format percentages less than 0.01 with precision 4", () => {
      expect(pipe.transform(0.0005)).toBe("0.05")
      expect(pipe.transform(0.0002)).toBe("0.02")
      expect(pipe.transform(0.0003)).toBe("0.03")
    })

    it("should handle values that result in whole numbers after formatting", () => {
      expect(pipe.transform(0.1)).toBe("10")
      expect(pipe.transform(0.2)).toBe("20")
    })

    it("should handle values in the precision 2 range (0.1 to 1)", () => {
      expect(pipe.transform(0.15)).toBe("15")
      expect(pipe.transform(0.25)).toBe("25")
      expect(pipe.transform(0.99)).toBe("99")
    })

    it("should handle values in the precision 3 range (0.01 to 0.1)", () => {
      expect(pipe.transform(0.015)).toBe("1.5")
      expect(pipe.transform(0.025)).toBe("2.5")
      expect(pipe.transform(0.099)).toBe("9.9")
    })

    it("should handle values in the precision 4 range (< 0.01)", () => {
      expect(pipe.transform(0.0015)).toBe("0.15")
      expect(pipe.transform(0.0025)).toBe("0.25")
      expect(pipe.transform(0.0005)).toBe("0.05")
    })

    it("should set precision to 4 for negative values less than 0.01", () => {
      expect(pipe.transform(-0.0002)).toBe("-0.02")
      expect(pipe.transform(-0.0003)).toBe("-0.03")
      expect(pipe.transform(-0.0005)).toBe("-0.05")
    })
  })
})
