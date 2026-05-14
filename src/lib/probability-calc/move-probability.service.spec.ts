import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { MoveProbabilityService } from "./move-probability.service"
import { PercentageFormatService } from "./percentage-format.service"

describe("MoveProbabilityService", () => {
  let service: MoveProbabilityService
  let attacker: Pokemon
  let field: Field

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveProbabilityService, PercentageFormatService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(MoveProbabilityService)
    attacker = new Pokemon("Pikachu")
    field = new Field()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("calculateSingleTargetProbabilities", () => {
    it("should return zeros when target is allAdjacentFoes", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.hitAllTurns).toBe("0")
      expect(result.hitAtLeastOne).toBe("0")
      expect(result.missAllTurns).toBe("0")
      expect(result.missAtLeastOne).toBe("0")
      expect(result.secondaryAllTurns).toBe("0")
      expect(result.secondaryAtLeastOne).toBe("0")
    })

    it("should calculate probabilities correctly for single target move with 100% accuracy", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitAllTurns).toBe("100")
      expect(result.hitAtLeastOne).toBe("100")
      expect(parseFloat(result.missAllTurns)).toBe(0)
      expect(parseFloat(result.missAtLeastOne)).toBe(0)
    })

    it("should calculate probabilities correctly for single target move with less than 100% accuracy", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitAllTurns).toBe("75")
      expect(result.hitAtLeastOne).toBe("75")
      expect(parseFloat(result.missAllTurns)).toBe(25)
      expect(parseFloat(result.missAtLeastOne)).toBe(25)
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 2, "normal", attacker, field)

      expect(result.hitAllTurns).toBe("56.3")
      expect(result.hitAtLeastOne).toBe("93.8")
      expect(parseFloat(result.missAllTurns)).toBeCloseTo(6.25, 1)
      expect(parseFloat(result.missAtLeastOne)).toBeCloseTo(43.75, 1)
    })

    it("should calculate secondary effect probabilities when present", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.secondaryAllTurns).toBe("10")
      expect(result.secondaryAtLeastOne).toBe("10")
    })

    it("should return zero for secondary probabilities when not present", () => {
      const move = new Move("Earthquake")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(parseFloat(result.secondaryAllTurns)).toBe(0)
      expect(parseFloat(result.secondaryAtLeastOne)).toBe(0)
    })

    it("should decrease hit probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal", attacker, field)

      expect(oneAttempt.hitAllTurns).toBe("75")
      expect(threeAttempts.hitAllTurns).toBe("42.2")
      expect(parseFloat(threeAttempts.hitAllTurns)).toBeLessThan(parseFloat(oneAttempt.hitAllTurns))
    })

    it("should increase hit at least once probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal", attacker, field)

      expect(oneAttempt.hitAtLeastOne).toBe("75")
      expect(threeAttempts.hitAtLeastOne).toBe("98.4")
      expect(parseFloat(threeAttempts.hitAtLeastOne)).toBeGreaterThan(parseFloat(oneAttempt.hitAtLeastOne))
    })
  })

  describe("calculateSpreadTargetProbabilities", () => {
    it("should return zeros when target is not allAdjacentFoes", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitBoth).toBe("0")
      expect(result.hitAtLeastOne).toBe("0")
      expect(result.missBoth).toBe("0")
      expect(result.secondaryHitBoth).toBe("0")
      expect(result.secondaryHitAtLeastOne).toBe("0")
    })

    it("should calculate probabilities correctly for spread move with 100% accuracy", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.hitBoth).toBe("100")
      expect(result.hitAtLeastOne).toBe("100")
      expect(parseFloat(result.missBoth)).toBe(0)
    })

    it("should calculate probabilities correctly for spread move with less than 100% accuracy", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.hitBoth).toBe("81")
      expect(result.hitAtLeastOne).toBe("99")
      expect(result.missBoth).toBe("1.0")
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 2, "allAdjacentFoes", attacker, field)

      expect(result.hitBoth).toBe("65.6")
      expect(result.hitAtLeastOne).toBe("98")
      expect(result.missBoth).toBe("2")
    })

    it("should calculate secondary effect probabilities when present for spread move", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.secondaryHitBoth).toBe("1.0")
      expect(result.secondaryHitAtLeastOne).toBe("19")
    })

    it("should return zero for secondary probabilities when not present for spread move", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(parseFloat(result.secondaryHitBoth)).toBe(0)
      expect(parseFloat(result.secondaryHitAtLeastOne)).toBe(0)
    })

    it("should decrease hit both probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes", attacker, field)

      expect(oneAttempt.hitBoth).toBe("81")
      expect(threeAttempts.hitBoth).toBe("53.1")
      expect(parseFloat(threeAttempts.hitBoth)).toBeLessThan(parseFloat(oneAttempt.hitBoth))
    })

    it("should increase miss both at least once probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes", attacker, field)

      expect(oneAttempt.missBoth).toBe("1.0")
      expect(threeAttempts.missBoth).toBe("3")
      expect(parseFloat(threeAttempts.missBoth)).toBeGreaterThan(parseFloat(oneAttempt.missBoth))
    })
  })

  describe("effectiveAccuracy", () => {
    it("should return 1 for No Guard ability", () => {
      const move = new Move("Iron Tail")
      const noGuardAttacker = new Pokemon("Machamp", { ability: new Ability("No Guard") })

      const result = service.effectiveAccuracy(move, noGuardAttacker, field)

      expect(result).toBe(1)
    })

    it("should return 1 for Hurricane in Rain", () => {
      const move = new Move("Hurricane")
      const rainField = new Field({ weather: "Rain" })

      const result = service.effectiveAccuracy(move, attacker, rainField)

      expect(result).toBe(1)
    })

    it("should return 1 for Thunder in Rain", () => {
      const move = new Move("Thunder")
      const rainField = new Field({ weather: "Rain" })

      const result = service.effectiveAccuracy(move, attacker, rainField)

      expect(result).toBe(1)
    })

    it("should return 1 for Bleakwind Storm in Rain", () => {
      const move = new Move("Bleakwind Storm")
      const rainField = new Field({ weather: "Rain" })

      const result = service.effectiveAccuracy(move, attacker, rainField)

      expect(result).toBe(1)
    })

    it("should return 1 for Blizzard in Snow", () => {
      const move = new Move("Blizzard")
      const snowField = new Field({ weather: "Snow" })

      const result = service.effectiveAccuracy(move, attacker, snowField)

      expect(result).toBe(1)
    })

    it("should return 0.5 for Hurricane in Sun", () => {
      const move = new Move("Hurricane")
      const sunField = new Field({ weather: "Sun" })

      const result = service.effectiveAccuracy(move, attacker, sunField)

      expect(result).toBe(0.5)
    })

    it("should return 0.5 for Thunder in Sun", () => {
      const move = new Move("Thunder")
      const sunField = new Field({ weather: "Sun" })

      const result = service.effectiveAccuracy(move, attacker, sunField)

      expect(result).toBe(0.5)
    })

    it("should return 1 for Toxic used by Poison type", () => {
      const move = new Move("Toxic")
      const poisonAttacker = new Pokemon("Gengar")

      const result = service.effectiveAccuracy(move, poisonAttacker, field)

      expect(result).toBe(1)
    })

    it("should return base accuracy for Toxic used by non-Poison type", () => {
      const move = new Move("Toxic")

      const result = service.effectiveAccuracy(move, attacker, field)

      expect(result).toBeCloseTo(0.9, 5)
    })

    it("should boost accuracy with Compound Eyes", () => {
      const move = new Move("Iron Tail")
      const compoundEyesAttacker = new Pokemon("Butterfree", { ability: new Ability("Compound Eyes") })

      const result = service.effectiveAccuracy(move, compoundEyesAttacker, field)

      expect(result).toBeCloseTo(0.75 * (5325 / 4096), 5)
    })

    it("should boost accuracy with Victory Star", () => {
      const move = new Move("Iron Tail")
      const victoryStarAttacker = new Pokemon("Victini", { ability: new Ability("Victory Star") })

      const result = service.effectiveAccuracy(move, victoryStarAttacker, field)

      expect(result).toBeCloseTo(0.75 * (4506 / 4096), 5)
    })

    it("should reduce accuracy with Hustle for Physical moves", () => {
      const move = new Move("Iron Tail")
      const hustleAttacker = new Pokemon("Togekiss", { ability: new Ability("Hustle") })

      const result = service.effectiveAccuracy(move, hustleAttacker, field)

      expect(result).toBeCloseTo(0.75 * (3277 / 4096), 5)
    })

    it("should not reduce accuracy with Hustle for Special moves", () => {
      const move = new Move("Thunderbolt")
      const hustleAttacker = new Pokemon("Togekiss", { ability: new Ability("Hustle") })

      const result = service.effectiveAccuracy(move, hustleAttacker, field)

      expect(result).toBe(1)
    })

    it("should cap accuracy at 1", () => {
      const move = new Move("Iron Tail")
      const compoundEyesAttacker = new Pokemon("Butterfree", { ability: new Ability("Compound Eyes") })

      const result = service.effectiveAccuracy(move, compoundEyesAttacker, field)

      expect(result).toBeLessThanOrEqual(1)
    })

    it("should return base accuracy with no modifiers", () => {
      const move = new Move("Hurricane")

      const result = service.effectiveAccuracy(move, attacker, field)

      expect(result).toBeCloseTo(0.7, 5)
    })
  })
})
