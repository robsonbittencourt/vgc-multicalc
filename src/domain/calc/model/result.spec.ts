import { calculate, Field, Move, Pokemon } from "@calc"

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

  describe("recovery", () => {
    it("describes the attacker's recovery from a draining move", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Giga Drain"), new Field())

      expect(result.recovery().text).toEqual("4.9 - 6% recovered")
    })
  })

  describe("kochance", () => {
    it("describes the KO chance for the calculated damage", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.kochance().text).toEqual("guaranteed OHKO")
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

  describe("damageWithRemainingUntilTurn", () => {
    it("returns the current HP minus the remaining HP at the given turn", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 } })
      const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.damageWithRemainingUntilTurn(1)).toBe(214)
    })
  })
})
