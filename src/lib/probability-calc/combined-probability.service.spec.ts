import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CombinedProbabilityService } from "./combined-probability.service"
import { PercentageFormatService } from "./percentage-format.service"

describe("CombinedProbabilityService", () => {
  let service: CombinedProbabilityService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombinedProbabilityService, PercentageFormatService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(CombinedProbabilityService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("calculateAtLeastOne", () => {
    it("should return 0 when probabilities array is empty", () => {
      const result = service.calculateAtLeastOne([])

      expect(result).toBe(0)
    })

    it("should return 0 when all probabilities are 0", () => {
      const result = service.calculateAtLeastOne([0, 0, 0, 0, 0])

      expect(result).toBe(0)
    })

    it("should return 1 when all probabilities are 100", () => {
      const result = service.calculateAtLeastOne([100, 100, 100, 100, 100])

      expect(result).toBe(1)
    })

    it("should calculate correctly with two probabilities", () => {
      const result = service.calculateAtLeastOne([50, 50])

      expect(result).toBeCloseTo(0.75, 4)
    })

    it("should calculate correctly with five probabilities", () => {
      const result = service.calculateAtLeastOne([20, 30, 40, 50, 60])

      const expected = 1 - 0.8 * 0.7 * 0.6 * 0.5 * 0.4
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should calculate correctly with random values", () => {
      const p1 = 23
      const p2 = 45
      const p3 = 67
      const p4 = 12
      const p5 = 89

      const result = service.calculateAtLeastOne([p1, p2, p3, p4, p5])

      const expected = 1 - (1 - p1 / 100) * (1 - p2 / 100) * (1 - p3 / 100) * (1 - p4 / 100) * (1 - p5 / 100)
      expect(result).toBeCloseTo(expected, 4)
    })
  })

  describe("calculateAll", () => {
    it("should return 0 when probabilities array is empty", () => {
      const result = service.calculateAll([])

      expect(result).toBe(0)
    })

    it("should return 0 when all probabilities are 0", () => {
      const result = service.calculateAll([0, 0, 0, 0, 0])

      expect(result).toBe(0)
    })

    it("should return 1 when all probabilities are 100", () => {
      const result = service.calculateAll([100, 100, 100, 100, 100])

      expect(result).toBe(1)
    })

    it("should calculate correctly with two probabilities", () => {
      const result = service.calculateAll([50, 50])

      expect(result).toBe(0.25)
    })

    it("should calculate correctly with five probabilities", () => {
      const result = service.calculateAll([20, 30, 40, 50, 60])

      const expected = 0.2 * 0.3 * 0.4 * 0.5 * 0.6
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should calculate correctly with random values", () => {
      const p1 = 25
      const p2 = 50
      const p3 = 75

      const result = service.calculateAll([p1, p2, p3])

      const expected = 0.25 * 0.5 * 0.75
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should ignore null values and calculate only with filled fields", () => {
      const result = service.calculateAll([30, 30, null, null, null])

      const expected = 0.3 * 0.3
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should return 0 when all values are null", () => {
      const result = service.calculateAll([null, null, null, null, null])

      expect(result).toBe(0)
    })
  })

  describe("calculateNone", () => {
    it("should return 1 when probabilities array is empty", () => {
      const result = service.calculateNone([])

      expect(result).toBe(1)
    })

    it("should return 1 when all probabilities are 0", () => {
      const result = service.calculateNone([0, 0, 0, 0, 0])

      expect(result).toBe(1)
    })

    it("should return 0 when all probabilities are 100", () => {
      const result = service.calculateNone([100, 100, 100, 100, 100])

      expect(result).toBe(0)
    })

    it("should calculate correctly with two probabilities", () => {
      const result = service.calculateNone([50, 50])

      expect(result).toBe(0.25)
    })

    it("should calculate correctly with five probabilities", () => {
      const result = service.calculateNone([20, 30, 40, 50, 60])

      const expected = 0.8 * 0.7 * 0.6 * 0.5 * 0.4
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should calculate correctly with random values", () => {
      const p1 = 25
      const p2 = 50
      const p3 = 75

      const result = service.calculateNone([p1, p2, p3])

      const expected = 0.75 * 0.5 * 0.25
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should ignore null values and calculate only with filled fields", () => {
      const result = service.calculateNone([30, 30, null, null, null])

      const expected = 0.7 * 0.7
      expect(result).toBeCloseTo(expected, 4)
    })

    it("should return 1 when all values are null", () => {
      const result = service.calculateNone([null, null, null, null, null])

      expect(result).toBe(1)
    })
  })

  describe("calculateCombinedProbability", () => {
    it("should default to at-least-one calculation", () => {
      const probabilities = [50, 50]
      const result = service.calculateCombinedProbability(probabilities)

      expect(result).toBeCloseTo(0.75, 4)
    })

    it("should calculate at-least-one when type is at-least-one", () => {
      const probabilities = [50, 50]
      const result = service.calculateCombinedProbability(probabilities, "at-least-one")

      expect(result).toBeCloseTo(0.75, 4)
    })

    it("should calculate all when type is all", () => {
      const probabilities = [50, 50]
      const result = service.calculateCombinedProbability(probabilities, "all")

      expect(result).toBe(0.25)
    })

    it("should calculate none when type is none", () => {
      const probabilities = [50, 50]
      const result = service.calculateCombinedProbability(probabilities, "none")

      expect(result).toBe(0.25)
    })

    it("should clamp values above 100 to 100", () => {
      const result = service.calculateCombinedProbability([150, 200, 300, 400, 500], "at-least-one")

      expect(result).toBe(1)
    })

    it("should clamp values below 0 to 0", () => {
      const result = service.calculateCombinedProbability([-10, -20, -30, -40, -50], "at-least-one")

      expect(result).toBe(0)
    })
  })

  describe("calculateAndFormatCombinedProbability", () => {
    it("should return formatted percentage string", () => {
      const result = service.calculateAndFormatCombinedProbability([50, 50, 50, 50, 50])

      expect(typeof result).toBe("string")
    })

    it("should format 0 probability correctly for at-least-one", () => {
      const result = service.calculateAndFormatCombinedProbability([0, 0, 0, 0, 0], "at-least-one")

      expect(result).toBe("0")
    })

    it("should format 100 probability correctly for at-least-one", () => {
      const result = service.calculateAndFormatCombinedProbability([100, 100, 100, 100, 100], "at-least-one")

      expect(result).toBe("100")
    })

    it("should format correctly for all type", () => {
      const probabilities = [50, 50]
      const result = service.calculateAndFormatCombinedProbability(probabilities, "all")

      const decimalResult = service.calculateAll(probabilities)
      const expectedPercent = decimalResult * 100
      expect(parseFloat(result)).toBeCloseTo(expectedPercent, 1)
    })

    it("should format correctly for none type", () => {
      const probabilities = [50, 50]
      const result = service.calculateAndFormatCombinedProbability(probabilities, "none")

      const decimalResult = service.calculateNone(probabilities)
      const expectedPercent = decimalResult * 100
      expect(parseFloat(result)).toBeCloseTo(expectedPercent, 1)
    })

    it("should format random probability correctly", () => {
      const p1 = 15
      const p2 = 25
      const p3 = 35
      const p4 = 45
      const p5 = 55

      const result = service.calculateAndFormatCombinedProbability([p1, p2, p3, p4, p5], "at-least-one")

      const decimalResult = service.calculateAtLeastOne([p1, p2, p3, p4, p5])
      const expectedPercent = decimalResult * 100
      expect(parseFloat(result)).toBeCloseTo(expectedPercent, 1)
    })
  })
})
