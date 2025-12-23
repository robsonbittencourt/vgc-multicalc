import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { Move } from "@lib/model/move"
import { MoveProbabilityService } from "./move-probability.service"
import { PercentageFormatService } from "./percentage-format.service"

describe("MoveProbabilityService", () => {
  let service: MoveProbabilityService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveProbabilityService, PercentageFormatService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(MoveProbabilityService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("calculateSingleTargetProbabilities", () => {
    it("should return zeros when target is allAdjacentFoes", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "allAdjacentFoes")

      expect(result.hitAllTurns).toBe("0")
      expect(result.hitAtLeastOne).toBe("0")
      expect(result.missAllTurns).toBe("0")
      expect(result.missAtLeastOne).toBe("0")
      expect(result.secondaryAllTurns).toBe("0")
      expect(result.secondaryAtLeastOne).toBe("0")
    })

    it("should calculate probabilities correctly for single target move with 100% accuracy", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal")

      expect(result.hitAllTurns).toBe("100")
      expect(result.hitAtLeastOne).toBe("100")
      expect(parseFloat(result.missAllTurns)).toBe(0)
      expect(parseFloat(result.missAtLeastOne)).toBe(0)
    })

    it("should calculate probabilities correctly for single target move with less than 100% accuracy", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal")

      expect(result.hitAllTurns).toBe("75")
      expect(result.hitAtLeastOne).toBe("75")
      expect(parseFloat(result.missAllTurns)).toBe(25)
      expect(parseFloat(result.missAtLeastOne)).toBe(25)
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 2, "normal")

      expect(result.hitAllTurns).toBe("56.3")
      expect(result.hitAtLeastOne).toBe("93.8")
      expect(parseFloat(result.missAllTurns)).toBeCloseTo(6.25, 1)
      expect(parseFloat(result.missAtLeastOne)).toBeCloseTo(43.75, 1)
    })

    it("should calculate secondary effect probabilities when present", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal")

      expect(result.secondaryAllTurns).toBe("10")
      expect(result.secondaryAtLeastOne).toBe("10")
    })

    it("should return zero for secondary probabilities when not present", () => {
      const move = new Move("Earthquake")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal")

      expect(parseFloat(result.secondaryAllTurns)).toBe(0)
      expect(parseFloat(result.secondaryAtLeastOne)).toBe(0)
    })

    it("should decrease hit probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal")
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal")

      expect(oneAttempt.hitAllTurns).toBe("75")
      expect(threeAttempts.hitAllTurns).toBe("42.2")
      expect(parseFloat(threeAttempts.hitAllTurns)).toBeLessThan(parseFloat(oneAttempt.hitAllTurns))
    })

    it("should increase hit at least once probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal")
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal")

      expect(oneAttempt.hitAtLeastOne).toBe("75")
      expect(threeAttempts.hitAtLeastOne).toBe("98.4")
      expect(parseFloat(threeAttempts.hitAtLeastOne)).toBeGreaterThan(parseFloat(oneAttempt.hitAtLeastOne))
    })
  })

  describe("calculateSpreadTargetProbabilities", () => {
    it("should return zeros when target is not allAdjacentFoes", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "normal")

      expect(result.hitBoth).toBe("0")
      expect(result.hitAtLeastOne).toBe("0")
      expect(result.missBoth).toBe("0")
      expect(result.secondaryHitBoth).toBe("0")
      expect(result.secondaryHitAtLeastOne).toBe("0")
    })

    it("should calculate probabilities correctly for spread move with 100% accuracy", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")

      expect(result.hitBoth).toBe("100")
      expect(result.hitAtLeastOne).toBe("100")
      expect(parseFloat(result.missBoth)).toBe(0)
    })

    it("should calculate probabilities correctly for spread move with less than 100% accuracy", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")

      expect(result.hitBoth).toBe("81")
      expect(result.hitAtLeastOne).toBe("99")
      expect(result.missBoth).toBe("1.0")
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 2, "allAdjacentFoes")

      expect(result.hitBoth).toBe("65.6")
      expect(result.hitAtLeastOne).toBe("98")
      expect(result.missBoth).toBe("2")
    })

    it("should calculate secondary effect probabilities when present for spread move", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")

      expect(result.secondaryHitBoth).toBe("1.0")
      expect(result.secondaryHitAtLeastOne).toBe("19")
    })

    it("should return zero for secondary probabilities when not present for spread move", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")

      expect(parseFloat(result.secondaryHitBoth)).toBe(0)
      expect(parseFloat(result.secondaryHitAtLeastOne)).toBe(0)
    })

    it("should decrease hit both probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes")

      expect(oneAttempt.hitBoth).toBe("81")
      expect(threeAttempts.hitBoth).toBe("53.1")
      expect(parseFloat(threeAttempts.hitBoth)).toBeLessThan(parseFloat(oneAttempt.hitBoth))
    })

    it("should increase miss both at least once probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes")
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes")

      expect(oneAttempt.missBoth).toBe("1.0")
      expect(threeAttempts.missBoth).toBe("3")
      expect(parseFloat(threeAttempts.missBoth)).toBeGreaterThan(parseFloat(oneAttempt.missBoth))
    })
  })
})
