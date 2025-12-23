import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { PercentageFormatService } from "./percentage-format.service"

describe("PercentageFormatService", () => {
  let service: PercentageFormatService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PercentageFormatService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(PercentageFormatService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("formatPercentage", () => {
    it("should format percentages >= 1 with one decimal place", () => {
      const result1 = service.formatPercentage(0.5)
      const result2 = service.formatPercentage(0.75)
      const result3 = service.formatPercentage(1.0)

      expect(result1).toBe("50")
      expect(result2).toBe("75")
      expect(result3).toBe("100")
    })

    it("should format percentages < 1 with appropriate precision", () => {
      const result1 = service.formatPercentage(0.01)
      const result2 = service.formatPercentage(0.001)
      const result3 = service.formatPercentage(0.0001)

      expect(result1).toBe("1.0")
      expect(result2).toBe("0.10")
      expect(result3).toBe("0.010")
    })

    it("should handle very small percentages", () => {
      const result = service.formatPercentage(0.00001)

      expect(result).toContain(".")
      expect(parseFloat(result)).toBeGreaterThan(0)
    })

    it("should handle zero", () => {
      const result = service.formatPercentage(0)

      expect(result).toBe("0")
    })

    it("should handle one", () => {
      const result = service.formatPercentage(1)

      expect(result).toBe("100")
    })

    it("should format percentages between 0.1 and 1 using >= 1 logic", () => {
      const result1 = service.formatPercentage(0.05)
      const result2 = service.formatPercentage(0.123)
      const result3 = service.formatPercentage(0.999)

      expect(result1).toBe("5")
      expect(result2).toBe("12.3")
      expect(result3).toBe("99.9")
    })

    it("should format percentages between 0.01 and 0.1 with precision 3", () => {
      const result1 = service.formatPercentage(0.005)
      const result2 = service.formatPercentage(0.0123)
      const result3 = service.formatPercentage(0.00999)

      expect(result1).toBe("0.5")
      expect(result2).toBe("1.2")
      expect(result3).toBe("1.0")
    })

    it("should format percentages less than 0.01 with precision 4", () => {
      const result1 = service.formatPercentage(0.0005)
      const result2 = service.formatPercentage(0.0002)
      const result3 = service.formatPercentage(0.0003)

      expect(result1).toBe("0.05")
      expect(result2).toBe("0.02")
      expect(result3).toBe("0.03")
    })

    it("should handle values that result in whole numbers after formatting", () => {
      const result1 = service.formatPercentage(0.1)
      const result2 = service.formatPercentage(0.2)

      expect(result1).toBe("10")
      expect(result2).toBe("20")
    })

    it("should handle values in the precision 2 range (0.1 to 1)", () => {
      const result1 = service.formatPercentage(0.15)
      const result2 = service.formatPercentage(0.25)
      const result3 = service.formatPercentage(0.99)

      expect(result1).toBe("15")
      expect(result2).toBe("25")
      expect(result3).toBe("99")
    })

    it("should handle values in the precision 3 range (0.01 to 0.1)", () => {
      const result1 = service.formatPercentage(0.015)
      const result2 = service.formatPercentage(0.025)
      const result3 = service.formatPercentage(0.099)

      expect(result1).toBe("1.5")
      expect(result2).toBe("2.5")
      expect(result3).toBe("9.9")
    })

    it("should handle values in the precision 4 range (< 0.01)", () => {
      const result1 = service.formatPercentage(0.0015)
      const result2 = service.formatPercentage(0.0025)
      const result3 = service.formatPercentage(0.0005)

      expect(result1).toBe("0.15")
      expect(result2).toBe("0.25")
      expect(result3).toBe("0.05")
    })

    it("should set precision to 4 for values less than 0.01 (line 37)", () => {
      // A linha 37 executa quando percent < 0.01
      // Para valores positivos < 0.0001, são capturados pela verificação especial
      // Mas valores negativos não são capturados e podem executar a linha 37
      const result1 = service.formatPercentage(-0.0002)
      const result2 = service.formatPercentage(-0.0003)
      const result3 = service.formatPercentage(-0.0005)

      // Valores negativos com percent < 0.01 devem usar precision 4
      expect(result1).toBe("-0.02")
      expect(result2).toBe("-0.03")
      expect(result3).toBe("-0.05")
    })
  })
})
