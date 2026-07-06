import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { MoveProbability } from "@multicalc/probability-calc/move-probability"

describe("MoveProbability", () => {
  let service: MoveProbability
  let attacker: Pokemon
  let field: Field

  beforeEach(() => {
    service = new MoveProbability()
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

      expect(result.hitAllTurns).toBe(0)
      expect(result.hitAtLeastOne).toBe(0)
      expect(result.missAllTurns).toBe(0)
      expect(result.missAtLeastOne).toBe(0)
      expect(result.secondaryAllTurns).toBe(0)
      expect(result.secondaryAtLeastOne).toBe(0)
    })

    it("should calculate probabilities correctly for single target move with 100% accuracy", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitAllTurns).toBe(1)
      expect(result.hitAtLeastOne).toBe(1)
      expect(result.missAllTurns).toBe(0)
      expect(result.missAtLeastOne).toBe(0)
    })

    it("should calculate probabilities correctly for single target move with less than 100% accuracy", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitAllTurns).toBe(0.75)
      expect(result.hitAtLeastOne).toBe(0.75)
      expect(result.missAllTurns).toBe(0.25)
      expect(result.missAtLeastOne).toBe(0.25)
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Iron Tail")

      const result = service.calculateSingleTargetProbabilities(move, 2, "normal", attacker, field)

      expect(result.hitAllTurns).toBe(0.5625)
      expect(result.hitAtLeastOne).toBe(0.9375)
      expect(result.missAllTurns).toBe(0.0625)
      expect(result.missAtLeastOne).toBe(0.4375)
    })

    it("should calculate secondary effect probabilities when present", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      const sec = 0.1
      expect(result.secondaryAllTurns).toBe(Math.pow(sec, 1))
      expect(result.secondaryAtLeastOne).toBe(1 - Math.pow(1 - sec, 1))
    })

    it("should return zero for secondary probabilities when not present", () => {
      const move = new Move("Earthquake")

      const result = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.secondaryAllTurns).toBe(0)
      expect(result.secondaryAtLeastOne).toBe(0)
    })

    it("should decrease hit probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal", attacker, field)

      expect(oneAttempt.hitAllTurns).toBe(0.75)
      expect(threeAttempts.hitAllTurns).toBe(0.421875)
      expect(threeAttempts.hitAllTurns).toBeLessThan(oneAttempt.hitAllTurns)
    })

    it("should increase hit at least once probability with more attempts", () => {
      const move = new Move("Iron Tail")

      const oneAttempt = service.calculateSingleTargetProbabilities(move, 1, "normal", attacker, field)
      const threeAttempts = service.calculateSingleTargetProbabilities(move, 3, "normal", attacker, field)

      expect(oneAttempt.hitAtLeastOne).toBe(0.75)
      expect(threeAttempts.hitAtLeastOne).toBe(0.984375)
      expect(threeAttempts.hitAtLeastOne).toBeGreaterThan(oneAttempt.hitAtLeastOne)
    })
  })

  describe("calculateSpreadTargetProbabilities", () => {
    it("should return zeros when target is not allAdjacentFoes", () => {
      const move = new Move("Thunderbolt")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "normal", attacker, field)

      expect(result.hitBoth).toBe(0)
      expect(result.hitAtLeastOne).toBe(0)
      expect(result.missBoth).toBe(0)
      expect(result.secondaryHitBoth).toBe(0)
      expect(result.secondaryHitAtLeastOne).toBe(0)
    })

    it("should calculate probabilities correctly for spread move with 100% accuracy", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.hitBoth).toBe(1)
      expect(result.hitAtLeastOne).toBe(1)
      expect(result.missBoth).toBe(0)
    })

    it("should calculate probabilities correctly for spread move with less than 100% accuracy", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      const acc = 0.9
      const miss = 1 - acc
      expect(result.hitBoth).toBe(acc * acc)
      expect(result.hitAtLeastOne).toBe(1 - miss * miss)
      expect(result.missBoth).toBe(1 - (1 - miss * miss))
    })

    it("should calculate probabilities for multiple attempts", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 2, "allAdjacentFoes", attacker, field)

      const acc = 0.9
      const miss = 1 - acc
      const missBothST = miss * miss
      expect(result.hitBoth).toBe(Math.pow(acc * acc, 2))
      expect(result.hitAtLeastOne).toBe(Math.pow(1 - missBothST, 2))
      expect(result.missBoth).toBe(1 - Math.pow(1 - missBothST, 2))
    })

    it("should calculate secondary effect probabilities when present for spread move", () => {
      const move = new Move("Heat Wave")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      const sec = 0.1
      const secMiss = 1 - sec
      expect(result.secondaryHitBoth).toBe(1 - (1 - sec * sec))
      expect(result.secondaryHitAtLeastOne).toBe(1 - (1 - (1 - secMiss * secMiss)))
    })

    it("should return zero for secondary probabilities when not present for spread move", () => {
      const move = new Move("Dazzling Gleam")

      const result = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)

      expect(result.secondaryHitBoth).toBe(0)
      expect(result.secondaryHitAtLeastOne).toBe(0)
    })

    it("should decrease hit both probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes", attacker, field)

      const hitBothST = 0.9 * 0.9
      expect(oneAttempt.hitBoth).toBe(hitBothST)
      expect(threeAttempts.hitBoth).toBe(Math.pow(hitBothST, 3))
      expect(threeAttempts.hitBoth).toBeLessThan(oneAttempt.hitBoth)
    })

    it("should increase miss both at least once probability with more attempts", () => {
      const move = new Move("Heat Wave")

      const oneAttempt = service.calculateSpreadTargetProbabilities(move, 1, "allAdjacentFoes", attacker, field)
      const threeAttempts = service.calculateSpreadTargetProbabilities(move, 3, "allAdjacentFoes", attacker, field)

      const missBothST = 0.1 * 0.1
      expect(oneAttempt.missBoth).toBe(1 - (1 - missBothST))
      expect(threeAttempts.missBoth).toBe(1 - Math.pow(1 - missBothST, 3))
      expect(threeAttempts.missBoth).toBeGreaterThan(oneAttempt.missBoth)
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

      expect(result).toBe(0.98)
    })

    it("should boost accuracy with Wide Lens", () => {
      const move = new Move("Play Rough")
      const wideLensAttacker = new Pokemon("Garchomp", { item: "Wide Lens" })

      const result = service.effectiveAccuracy(move, wideLensAttacker, field)

      expect(result).toBe(0.99)
    })

    it("should boost accuracy with Victory Star", () => {
      const move = new Move("Iron Tail")
      const victoryStarAttacker = new Pokemon("Victini", { ability: new Ability("Victory Star") })

      const result = service.effectiveAccuracy(move, victoryStarAttacker, field)

      expect(result).toBe(0.83)
    })

    it("should reduce accuracy with Hustle for Physical moves", () => {
      const move = new Move("Iron Tail")
      const hustleAttacker = new Pokemon("Togekiss", { ability: new Ability("Hustle") })

      const result = service.effectiveAccuracy(move, hustleAttacker, field)

      expect(result).toBe(0.6)
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

      expect(result).toBe(0.7)
    })

    it("should boost accuracy with Gravity", () => {
      const move = new Move("Iron Tail")
      const gravityField = new Field({ isGravity: true })

      const result = service.effectiveAccuracy(move, attacker, gravityField)

      expect(result).toBe(1)
    })

    it("should cap accuracy at 1 with Gravity", () => {
      const move = new Move("Thunderbolt")
      const gravityField = new Field({ isGravity: true })

      const result = service.effectiveAccuracy(move, attacker, gravityField)

      expect(result).toBe(1)
    })

    it("should boost accuracy with Gravity with other impacts", () => {
      const move = new Move("Hurricane")
      const sunField = new Field({ weather: "Sun", isGravity: true })

      const result = service.effectiveAccuracy(move, attacker, sunField)

      expect(result).toBe(0.83)
    })
  })
})
