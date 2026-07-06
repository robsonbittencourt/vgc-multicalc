import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { TeamMember } from "@multicalc/model/team-member"
import { ConsistencyScore } from "@multicalc/probability-calc/consistency-score"

describe("ConsistencyScore", () => {
  let service: ConsistencyScore
  let field: Field

  beforeEach(() => {
    service = new ConsistencyScore()
    field = new Field()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("consistencyScore", () => {
    it("should return null when moveSet contains only Struggle", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle")) })

      const result = service.consistencyScore(pokemon, field)

      expect(result).toBeNull()
    })

    it("should return a score for moveSet with 100% accuracy moves", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect")) })

      const result = service.consistencyScore(pokemon, field)

      expect(result).toBe(100)
    })

    it("should return a score for moveSet with mixed accuracy moves", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball")) })

      const result = service.consistencyScore(pokemon, field)

      expect(result).toBe(77)
    })

    it("should return a lower score for moveSet with lower accuracy moves", () => {
      const highAccuracyPokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect")) })
      const lowAccuracyPokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump")) })

      const highScore = service.consistencyScore(highAccuracyPokemon, field)
      const lowScore = service.consistencyScore(lowAccuracyPokemon, field)

      expect(highScore).toBe(100)
      expect(lowScore).toBe(33)
      expect(highScore).toBeGreaterThan(lowScore!)
    })

    it("should apply logistic transformation correctly", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball")) })

      const defaultScore = service.consistencyScore(pokemon, field)
      const steeperSlopeScore = service.consistencyScore(pokemon, field, 20, 0.85, 6, 0.16, 0.4)

      expect(defaultScore).toBe(77)
      expect(steeperSlopeScore).toBe(70)
      expect(steeperSlopeScore).not.toBe(defaultScore)
    })

    it("should apply low accuracy penalty correctly", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump")) })

      const defaultScore = service.consistencyScore(pokemon, field)
      const higherPenaltyScore = service.consistencyScore(pokemon, field, 10, 0.85, 12, 0.16, 0.4)

      expect(defaultScore).toBe(33)
      expect(higherPenaltyScore).toBe(19)
      expect(higherPenaltyScore).toBeLessThan(defaultScore!)
    })

    it("should apply multi-imperfect penalty correctly", () => {
      const singleImperfectPokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Iron Tail")) })
      const multipleImperfectPokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump")) })

      const singleScore = service.consistencyScore(singleImperfectPokemon, field)
      const multipleScore = service.consistencyScore(multipleImperfectPokemon, field)

      expect(singleScore).toBe(77)
      expect(multipleScore).toBe(33)
      expect(multipleScore).toBeLessThan(singleScore!)
    })

    it("should apply scale exponent correctly", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball")) })

      const defaultScore = service.consistencyScore(pokemon, field)
      const higherExponentScore = service.consistencyScore(pokemon, field, 10, 0.85, 6, 0.16, 0.8)

      expect(defaultScore).toBe(77)
      expect(higherExponentScore).toBe(59)
      expect(higherExponentScore).not.toBe(defaultScore)
    })

    it("should return rounded score with 4 decimal precision", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball")) })

      const result = service.consistencyScore(pokemon, field)

      expect(result).toBe(77)
      expect(Number.isInteger(result)).toBe(true)
    })

    it("should handle different logistic midpoints", () => {
      const pokemon = new Pokemon("Pikachu", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball")) })

      const lowerMidpointScore = service.consistencyScore(pokemon, field, 10, 0.7, 6, 0.16, 0.4)
      const higherMidpointScore = service.consistencyScore(pokemon, field, 10, 0.9, 6, 0.16, 0.4)

      expect(lowerMidpointScore).toBe(82)
      expect(higherMidpointScore).toBe(75)
      expect(lowerMidpointScore).toBeGreaterThan(higherMidpointScore!)
    })
  })

  describe("teamConsistencyScore", () => {
    it("should return 0 for empty team", () => {
      const team = new Team("test-id", true, "Test Team", [])

      const result = service.teamConsistencyScore(team, field)

      expect(result).toBe(0)
    })

    it("should return 0 for team with only Struggle moves", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Struggle"), new Move("Struggle"), new Move("Struggle"), new Move("Struggle"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true)])

      const result = service.teamConsistencyScore(team, field)

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

      const result = service.teamConsistencyScore(team, field)

      expect(result).toBe(77.4994)
    })

    it("should apply alpha weight correctly", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Volt Switch"), new Move("Protect"))
      })
      const pokemon2 = new Pokemon("Charizard", {
        moveSet: new MoveSet(new Move("Iron Tail"), new Move("Focus Blast"), new Move("Fire Blast"), new Move("Hydro Pump"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true), new TeamMember(pokemon2, false)])

      const arithmeticScore = service.teamConsistencyScore(team, field, 1.0)
      const geometricScore = service.teamConsistencyScore(team, field, 0.0)
      const blendedScore = service.teamConsistencyScore(team, field, 0.6)

      expect(arithmeticScore).toBe(66.5)
      expect(geometricScore).toBe(57.4456)
      expect(blendedScore).toBe(62.8783)
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

      const result = service.teamConsistencyScore(team, field)

      expect(result).toBe(77)
    })

    it("should return rounded score with 4 decimal precision", () => {
      const pokemon1 = new Pokemon("Pikachu", {
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"))
      })
      const team = new Team("test-id", true, "Test Team", [new TeamMember(pokemon1, true)])

      const result = service.teamConsistencyScore(team, field)

      expect(result).toBe(77)
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

      const result = service.teamConsistencyScore(team, field)

      expect(result).toBe(92.5336)
    })
  })
})
