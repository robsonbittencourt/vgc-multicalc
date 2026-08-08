import { calculate, Field, Move, Pokemon } from "@calc"
import { extractDamageSubArrays, rollsAtIndex } from "@calc/model/result"

describe("Result", () => {
  describe("range", () => {
    it("returns the min and max damage across the roll", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.range()).toEqual([363, 427])
    })
  })

  describe("maxDamage", () => {
    it("returns the highest damage roll", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.maxDamage()).toBe(427)
    })
  })

  describe("survivesHits", () => {
    it("survives four hits of a weak move at the default roll index", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(4)).toBe(true)
    })

    it("does not survive a single hit that always exceeds the remaining HP", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.survivesHits(1)).toBe(false)
    })

    it("falls back to the KO chance for a hit count below the supported range", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(0)).toBe(true)
    })

    it("falls back to the KO chance for a hit count above the supported range", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(5)).toBe(true)
    })

    it("truncates the rolls when given the best-case roll index", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(2, 0)).toBe(true)
    })

    it("survives a low toxic counter over two hits", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold", status: "tox", toxicCounter: 1 })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(2)).toBe(true)
    })

    it("faints over four hits once the toxic counter has ramped up", () => {
      const attacker = new Pokemon("Pikachu")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold", status: "tox", toxicCounter: 8 })
      const result = calculate(attacker, defender, new Move("Quick Attack"), new Field())

      expect(result.survivesHits(4)).toBe(false)
    })

    it("handles a multi-hit move whose damage comes as a matrix", () => {
      const attacker = new Pokemon("Breloom")
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const result = calculate(attacker, defender, new Move("Bullet Seed", { hits: 5 }), new Field())

      expect(result.survivesHits(1)).toBe(true)
    })
  })

  describe("recovery", () => {
    it("describes the attacker's recovery from a draining move", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Giga Drain"), new Field())

      expect(result.recovery().text).toEqual("4.9 - 6% recovered")
    })
  })

  describe("koChance", () => {
    it("describes the KO chance for the calculated damage", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.koChance().text).toEqual("guaranteed OHKO")
    })
  })

  describe("afterTurn", () => {
    it("tracks HP across turns for a non-KO damage roll with no end-of-turn effects", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      const afterTurn = result.afterTurn()

      expect(afterTurn.afterTurnData.map(t => t.hp)).toEqual([148, 0])
    })

    it("accumulates residual damage across turns from a burn", () => {
      const attacker = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "brn" })
      const result = calculate(attacker, defender, new Move("Tackle"), new Field())

      const afterTurn = result.afterTurn()

      expect({
        total: afterTurn.totalResidualHpUntilKO(),
        turn1: afterTurn.residualHpInTurn(1),
        remaining1: afterTurn.remainingHpUntilTurn(1)
      }).toEqual({ total: -220, turn1: -22, remaining1: 331 })
    })

    it("returns an empty turn list when the move deals no damage", () => {
      const attacker = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 } })
      const result = calculate(attacker, defender, new Move("Splash"), new Field())

      const afterTurn = result.afterTurn()

      expect(afterTurn.afterTurnData).toEqual([])
      expect(afterTurn.residualHpInTurn(1)).toBe(0)
      expect(afterTurn.remainingHpUntilTurn(1)).toBe(0)
    })
  })

  describe("afterTurn memoization", () => {
    it("reuses the end-of-turn damage when called twice on the same result", () => {
      const attacker = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "brn" })
      const result = calculate(attacker, defender, new Move("Tackle"), new Field())

      const first = result.afterTurn()
      const second = result.afterTurn()

      expect(second.afterTurnData).toEqual(first.afterTurnData)
      expect(second.totalResidualHpUntilKO()).toEqual(-220)
    })
  })

  describe("damageWithRemainingUntilTurn", () => {
    it("returns the current HP minus the remaining HP at the given turn", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.damageWithRemainingUntilTurn(1)).toBe(214)
    })
  })

  describe("afterTurn recovery caps", () => {
    it("caps the end of turn recovery at the defender max HP", () => {
      const attacker = new Pokemon("Pikachu", { evs: { atk: 0 }, nature: "Bold" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, item: "Leftovers", curHP: 360 })
      const result = calculate(attacker, defender, new Move("Tackle"), new Field())

      const afterTurn = result.afterTurn()

      expect(afterTurn.afterTurnData.slice(0, 3)).toEqual([
        { turn: 1, residualDelta: 22, hp: 361 },
        { turn: 2, residualDelta: 22, hp: 362 },
        { turn: 3, residualDelta: 22, hp: 362 }
      ])
    })

    it("caps the berry recovery at the defender max HP", () => {
      const attacker = new Pokemon("Pikachu", { evs: { atk: 0 }, nature: "Bold" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, item: "Sitrus Berry", curHP: 190 })
      const result = calculate(attacker, defender, new Move("Tackle"), new Field())

      const afterTurn = result.afterTurn()

      expect(afterTurn.afterTurnData.slice(0, 3)).toEqual([
        { turn: 1, residualDelta: 90, hp: 259 },
        { turn: 2, residualDelta: 0, hp: 238 },
        { turn: 3, residualDelta: 0, hp: 217 }
      ])
    })
  })
})

describe("extractDamageSubArrays", () => {
  it("wraps a scalar damage into a single roll", () => {
    expect(extractDamageSubArrays(42)).toEqual([[42]])
  })

  it("wraps a flat roll list into a single sub array", () => {
    expect(extractDamageSubArrays([10, 20, 30])).toEqual([[10, 20, 30]])
  })

  it("keeps a multi hit damage matrix as it is", () => {
    expect(
      extractDamageSubArrays([
        [1, 2],
        [3, 4]
      ])
    ).toEqual([
      [1, 2],
      [3, 4]
    ])
  })

  it("returns no sub arrays for an empty damage list", () => {
    expect(extractDamageSubArrays([])).toEqual([])
  })

  it("returns no sub arrays when the damage is missing", () => {
    expect(extractDamageSubArrays(undefined as never)).toEqual([])
  })
})

describe("rollsAtIndex", () => {
  it("reads the roll at the requested index of a flat list", () => {
    expect(rollsAtIndex([10, 20, 30], 1)).toEqual([20])
  })

  it("reads the roll at the requested index of every hit", () => {
    expect(
      rollsAtIndex(
        [
          [1, 2],
          [3, 4]
        ],
        1
      )
    ).toEqual([2, 4])
  })

  it("clamps the index to the last available roll", () => {
    expect(rollsAtIndex([10, 20, 30], 99)).toEqual([30])
  })

  it("returns no rolls when the damage is empty", () => {
    expect(rollsAtIndex([], 1)).toEqual([])
  })
})
