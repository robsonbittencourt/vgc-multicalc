import { Field, Move, Pokemon } from "@calc"
import { calculateDamage } from "@lib/calc/engine/calculate"
import { calculateMultiDamage } from "@lib/calc/engine/multi-target"

describe("Internal Result/MultiResult/desc (gen 0)", () => {
  describe("Result smoke tests", () => {
    it("produces damage and description for a simple physical hit", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Choice Band" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const result = calculateDamage(attacker, defender, new Move("Flare Blitz"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
      expect((result.damage as number[]).length).toBe(16)
      expect(result.description()).toContain("Incineroar")
      expect(result.description()).toContain("Snorlax")
    })

    it("returns zero damage for immune matchup", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })
      const defender = new Pokemon("Corviknight", { evs: { hp: 252 } })
      const result = calculateDamage(attacker, defender, new Move("Earthquake"), new Field())

      expect(result.damage).toBeFalsy()
      expect(result.moveDesc()).toContain("0%")
      expect(() => result.description()).toThrow()
    })

    it("produces damage for Tera STAB hit", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", teraType: "Fairy" })
      const defender = new Pokemon("Dragonite", { evs: { hp: 252 } })
      const result = calculateDamage(attacker, defender, new Move("Moonblast"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
      expect((result.damage as number[]).every(d => d > 0)).toBe(true)
    })

    it("produces damage for a multihit move", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Garchomp", { evs: { hp: 252 } })
      const result = calculateDamage(attacker, defender, new Move("Triple Axel"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
    })

    it("produces damage for Parental Bond", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 } })
      const result = calculateDamage(attacker, defender, new Move("Body Slam"), new Field())

      expect(Array.isArray(result.damage)).toBe(true)
    })

    it("applies spread modifier in doubles", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Tyranitar", { evs: { hp: 252 } })
      const singles = calculateDamage(attacker, defender, new Move("Earthquake"), new Field())
      const doubles = calculateDamage(attacker, defender, new Move("Earthquake"), new Field({ gameType: "Doubles" }))

      expect((singles.damage as number[])[15]).toBeGreaterThan((doubles.damage as number[])[15])
    })
  })

  describe("MultiResult smoke tests", () => {
    it("produces combined result for two attackers", () => {
      const firstAttacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const secondAttacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Relaxed" })
      const firstMove = new Move("Flare Blitz")
      const secondMove = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculateMultiDamage([firstAttacker, secondAttacker], defender, [firstMove, secondMove], field)

      expect(result.resultString()).toBeTruthy()
      expect(result.getHKO()).toBeTruthy()
      expect(result.rangePercentage().max).toBeGreaterThan(0)
    })

    it("accounts for berry recovery between hits", () => {
      const firstAttacker = new Pokemon("Tyranitar", { evs: { atk: 252 }, nature: "Adamant" })
      const secondAttacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, item: "Sitrus Berry" })
      const firstMove = new Move("Rock Slide")
      const secondMove = new Move("Earthquake")
      const field = new Field({ gameType: "Doubles" })

      const result = calculateMultiDamage([firstAttacker, secondAttacker], defender, [firstMove, secondMove], field)

      expect(result.resultString()).toBeTruthy()
    })
  })
})
