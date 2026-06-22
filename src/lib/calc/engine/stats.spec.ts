import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { getStatDescriptionText } from "@lib/calc/engine/desc"
import { computeFinalStats, countBoosts, getFinalSpeed, getStabMod, isGrounded } from "@lib/calc/engine/stats"
import { RawDesc } from "@lib/calc/model/types"

describe("Internal stats/effectiveness (gen 0)", () => {
  describe("computeFinalStats", () => {
    it("applies boosts to atk and spa", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", boosts: { atk: 2 } })
      const defender = new Pokemon("Pelipper", { evs: { spa: 252 } })
      const rawAtk = attacker.rawStats.atk

      computeFinalStats(attacker, defender, new Field(), "atk", "spa")

      expect(attacker.stats.atk).toEqual(Math.floor((rawAtk * 4) / 2))
    })

    it("applies negative defensive boosts with the modern boost table", () => {
      const attacker = new Pokemon("Garchomp")
      const defender = new Pokemon("Pelipper", { evs: { def: 252 }, nature: "Bold", boosts: { def: -1 } })

      computeFinalStats(attacker, defender, new Field(), "def", "spd")

      expect(defender.stats.def).toEqual(Math.floor((defender.rawStats.def * 2) / 3))
      expect(defender.stats.spd).toEqual(defender.rawStats.spd)
    })
  })

  describe("getFinalSpeed", () => {
    it("matches base speed", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      expect(getFinalSpeed(p, new Field(), new Field().attackerSide)).toBeGreaterThan(0)
    })

    it("doubles speed under Tailwind", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const tailwind = getFinalSpeed(p, new Field(), new Field({ attackerSide: { isTailwind: true } }).attackerSide)
      expect(tailwind).toEqual(base * 2)
    })

    it("boosts speed 1.5x with Choice Scarf", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", item: "Choice Scarf" })
      const noScarf = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      const scarfSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(noScarf, new Field(), new Field().attackerSide)
      expect(scarfSpeed).toEqual(Math.floor(baseSpeed * 1.5))
    })

    it("halves speed with paralysis", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", status: "par" })
      const healthy = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      const parSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(healthy, new Field(), new Field().attackerSide)
      expect(parSpeed).toEqual(Math.floor(baseSpeed / 2))
    })

    it("doubles speed with Chlorophyll in Sun", () => {
      const p = new Pokemon("Venusaur", { evs: { spe: 252 }, nature: "Timid", ability: "Chlorophyll" })
      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const sunSpeed = getFinalSpeed(p, new Field({ weather: "Sun" }), new Field().attackerSide)
      expect(sunSpeed).toEqual(base * 2)
    })

    it("applies positive speed boosts", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", boosts: { spe: 2 } })
      const base = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      const boostedSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(base, new Field(), new Field().attackerSide)
      expect(boostedSpeed).toEqual(Math.floor((baseSpeed * 4) / 2))
    })
  })

  describe("getStabMod", () => {
    it("returns 6144 for STAB", () => {
      const p = new Pokemon("Garchomp", {})
      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc
      expect(getStabMod(p, m, description)).toBe(6144)
    })

    it("returns 4096 for no STAB", () => {
      const p = new Pokemon("Garchomp", {})
      const m = new Move("Ice Fang")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Ice Fang" } as RawDesc
      expect(getStabMod(p, m, description)).toBe(4096)
    })

    it("returns 8192 for Adaptability STAB", () => {
      const p = new Pokemon("Dragapult", { ability: "Adaptability" })
      const m = new Move("Dragon Darts")
      const description = { attackerName: "Dragapult", defenderName: "", moveName: "Dragon Darts" } as RawDesc
      expect(getStabMod(p, m, description)).toBe(8192)
    })

    it("returns 8192 for Tera boosting original-type STAB", () => {
      const p = new Pokemon("Garchomp", { teraType: "Ground" })
      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc
      expect(getStabMod(p, m, description)).toBe(8192)
    })

    it("returns 6144 for Tera on a non-original type but original STAB move", () => {
      const p = new Pokemon("Garchomp", { teraType: "Fire" })
      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc
      expect(getStabMod(p, m, description)).toBe(6144)
    })
  })

  describe("countBoosts", () => {
    it("sums only positive boosts", () => {
      const boosts = { hp: 0, atk: 2, def: -1, spa: 1, spd: 0, spe: 3 }
      expect(countBoosts(boosts as never)).toBe(6)
    })
  })

  describe("getStatDescriptionText", () => {
    it("returns correct text for plus-nature attack stat", () => {
      const p = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      expect(getStatDescriptionText(p, "atk")).toBe("252+ Atk")
    })

    it("returns correct text for minus-nature stat", () => {
      const p = new Pokemon("Garchomp", { evs: { spe: 252 }, nature: "Adamant" })
      expect(getStatDescriptionText(p, "spa")).toBe("0- SpA")
    })

    it("returns correct text for HP EVs", () => {
      const p = new Pokemon("Pelipper", { evs: { hp: 252 } })
      expect(getStatDescriptionText(p, "hp")).toBe("252 HP")
    })
  })

  describe("isGrounded", () => {
    it("grounds a non-Flying Pokemon", () => {
      expect(isGrounded(new Pokemon("Garchomp"), new Field())).toBe(true)
    })

    it("does not ground a Flying type", () => {
      expect(isGrounded(new Pokemon("Corviknight"), new Field())).toBe(false)
    })

    it("grounds a Flying type under Gravity", () => {
      expect(isGrounded(new Pokemon("Corviknight"), new Field({ isGravity: true }))).toBe(true)
    })

    it("does not ground a Levitate Pokemon", () => {
      expect(isGrounded(new Pokemon("Hydreigon", { ability: "Levitate" }), new Field())).toBe(false)
    })
  })
})
