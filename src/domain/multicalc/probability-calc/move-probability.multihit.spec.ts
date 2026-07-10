import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { MoveProbability } from "@multicalc/probability-calc/move-probability"

describe("MoveProbability — calculateMultiHitProbabilities", () => {
  let service: MoveProbability
  let attacker: Pokemon
  let field: Field

  beforeEach(() => {
    service = new MoveProbability()
    attacker = new Pokemon("Pikachu")
    field = new Field()
  })

  it("should return empty for a move without multiaccuracy", () => {
    const move = new Move("Thunderbolt")

    const result = service.calculateMultiHitProbabilities(move, attacker, field)

    expect(result).toEqual([])
  })

  it("should return distinct min, middle and max hit probabilities for Triple Axel", () => {
    const move = new Move("Triple Axel")

    const result = service.calculateMultiHitProbabilities(move, attacker, field)

    expect(result).toEqual([
      { hits: 1, chance: 0.9 },
      { hits: 2, chance: 0.81 },
      { hits: 3, chance: 0.7290000000000001 }
    ])
  })

  it("should return distinct hit counts collapsing to min, middle and max for Population Bomb", () => {
    const move = new Move("Population Bomb")

    const result = service.calculateMultiHitProbabilities(move, attacker, field)

    expect(result).toEqual([
      { hits: 1, chance: 0.9 },
      { hits: 5, chance: 0.5904900000000001 },
      { hits: 10, chance: 0.3486784401000001 }
    ])
  })

  it("should return chance 1 for every hit count with Loaded Dice", () => {
    const move = new Move("Triple Axel")
    const loadedDice = new Pokemon("Pikachu", { item: "Loaded Dice" })

    const result = service.calculateMultiHitProbabilities(move, loadedDice, field)

    expect(result).toEqual([
      { hits: 1, chance: 1 },
      { hits: 2, chance: 1 },
      { hits: 3, chance: 1 }
    ])
  })

  it("should return chance 1 for every hit count with Skill Link", () => {
    const move = new Move("Triple Axel")
    const skillLink = new Pokemon("Cloyster", { ability: new Ability("Skill Link") })

    const result = service.calculateMultiHitProbabilities(move, skillLink, field)

    expect(result).toEqual([
      { hits: 1, chance: 1 },
      { hits: 2, chance: 1 },
      { hits: 3, chance: 1 }
    ])
  })

  it("should return empty when effective accuracy reaches 100 percent via No Guard", () => {
    const move = new Move("Triple Axel")
    const noGuard = new Pokemon("Pikachu", { ability: new Ability("No Guard") })

    const result = service.calculateMultiHitProbabilities(move, noGuard, field)

    expect(result).toEqual([])
  })

  it("should return empty for a move resolving to a single possible hit count", () => {
    const move = new Move("Triple Kick")

    const result = service.calculateMultiHitProbabilities(move, attacker, field)

    expect(result).toEqual([])
  })
})
