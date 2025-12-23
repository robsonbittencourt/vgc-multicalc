import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { ConsistencyScoreService } from "./consistency-score.service"

describe("ConsistencyScoreService", () => {
  let service: ConsistencyScoreService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsistencyScoreService, provideZonelessChangeDetection()]
    })

    service = TestBed.inject(ConsistencyScoreService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("consistencyScore", () => {
    it("should return null when moveSet contains only Struggle", () => {
      const moveSet = new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))

      const result = service.consistencyScore(moveSet)

      expect(result).toBeNull()
    })

    it("should return a score for moveSet with 100% accuracy moves", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect"))

      const result = service.consistencyScore(moveSet)

      expect(result).toBe(100)
    })

    it("should return a score for moveSet with mixed accuracy moves", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))

      const result = service.consistencyScore(moveSet)

      expect(result).toBe(57)
    })

    it("should return a lower score for moveSet with lower accuracy moves", () => {
      const highAccuracyMoveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect"))

      const lowAccuracyMoveSet = new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump"))

      const highScore = service.consistencyScore(highAccuracyMoveSet)
      const lowScore = service.consistencyScore(lowAccuracyMoveSet)

      expect(highScore).toBe(100)
      expect(lowScore).toBe(30)
      expect(highScore).toBeGreaterThan(lowScore!)
    })

    it("should apply logistic transformation correctly", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))

      const defaultScore = service.consistencyScore(moveSet)
      const steeperSlopeScore = service.consistencyScore(moveSet, 20, 0.85, 6, 0.16, 0.4)

      expect(defaultScore).toBe(57)
      expect(steeperSlopeScore).toBe(40)
      expect(steeperSlopeScore).not.toBe(defaultScore)
    })

    it("should apply low accuracy penalty correctly", () => {
      const moveSet = new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump"))

      const defaultScore = service.consistencyScore(moveSet)
      const higherPenaltyScore = service.consistencyScore(moveSet, 10, 0.85, 12, 0.16, 0.4)

      expect(defaultScore).toBe(30)
      expect(higherPenaltyScore).toBe(16)
      expect(higherPenaltyScore).toBeLessThan(defaultScore!)
    })

    it("should apply multi-imperfect penalty correctly", () => {
      const singleImperfectMoveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Iron Tail"))

      const multipleImperfectMoveSet = new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump"))

      const singleScore = service.consistencyScore(singleImperfectMoveSet)
      const multipleScore = service.consistencyScore(multipleImperfectMoveSet)

      expect(singleScore).toBe(57)
      expect(multipleScore).toBe(30)
      expect(multipleScore).toBeLessThan(singleScore!)
    })

    it("should apply scale exponent correctly", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))

      const defaultScore = service.consistencyScore(moveSet)
      const higherExponentScore = service.consistencyScore(moveSet, 10, 0.85, 6, 0.16, 0.8)

      expect(defaultScore).toBe(57)
      expect(higherExponentScore).toBe(32)
      expect(higherExponentScore).not.toBe(defaultScore)
    })

    it("should return rounded score with 4 decimal precision", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))

      const result = service.consistencyScore(moveSet)

      expect(result).toBe(57)
      expect(Number.isInteger(result)).toBeTrue()
    })

    it("should handle different logistic midpoints", () => {
      const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))

      const lowerMidpointScore = service.consistencyScore(moveSet, 10, 0.7, 6, 0.16, 0.4)
      const higherMidpointScore = service.consistencyScore(moveSet, 10, 0.9, 6, 0.16, 0.4)

      expect(lowerMidpointScore).toBe(70)
      expect(higherMidpointScore).toBe(52)
      expect(lowerMidpointScore).toBeGreaterThan(higherMidpointScore!)
    })
  })

  describe("teamConsistencyScore", () => {
    it("should return 0 for empty team", () => {
      const team = new Team("test-id", true, "Test Team", [])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(0)
    })

    it("should return 0 for team with only Struggle moves", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true)])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(0)
    })

    it("should calculate score for team with valid moves", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
      })
      const pokemon2 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Fire Blast"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true), new TeamMember(pokemon2, false)])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(64.8023)
    })

    it("should apply alpha weight correctly", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect"))
      })
      const pokemon2 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true), new TeamMember(pokemon2, false)])

      const arithmeticScore = service.teamConsistencyScore(team, 1.0)
      const geometricScore = service.teamConsistencyScore(team, 0.0)
      const blendedScore = service.teamConsistencyScore(team, 0.6)

      expect(arithmeticScore).toBe(65)
      expect(geometricScore).toBe(54.7723)
      expect(blendedScore).toBe(60.9089)
      expect(geometricScore).toBeLessThan(arithmeticScore)
      expect(blendedScore).toBeGreaterThan(geometricScore)
      expect(blendedScore).toBeLessThan(arithmeticScore)
    })

    it("should handle team with mixed valid and invalid moves", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
      })
      const pokemon2 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true), new TeamMember(pokemon2, false)])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(57)
    })

    it("should return rounded score with 4 decimal precision", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true)])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(57)
      const decimalPlaces = (result.toString().split(".")[1] || "").length
      expect(decimalPlaces).toBeLessThanOrEqual(4)
    })

    it("should handle team with multiple pokemon correctly", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect"))
      })
      const pokemon2 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Flamethrower"), new Move("Air Slash"), new Move("Dragon Claw"), new Move("Roost"))
      })
      const pokemon3 = new Pokemon("Blastoise", {
        moveSet: new MoveSet(new Move("Hydro Pump"), new Move("Ice Beam"), new Move("Scald"), new Move("Protect"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true), new TeamMember(pokemon2, false), new TeamMember(pokemon3, false)])

      const result = service.teamConsistencyScore(team)

      expect(result).toBe(87.547)
    })
  })
})
