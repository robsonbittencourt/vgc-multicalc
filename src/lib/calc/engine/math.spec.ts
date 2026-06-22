import { chainMods, getBaseDamage, getFinalDamage, getModifiedStat, overflow16, overflow32, pokeRound } from "@lib/calc/engine/math"

describe("Damage calc pure math", () => {
  describe("pokeRound", () => {
    it("rounds down on exactly .5", () => {
      expect(pokeRound(2.5)).toBe(2)
    })

    it("rounds up above .5", () => {
      expect(pokeRound(2.6)).toBe(3)
    })

    it("rounds down below .5", () => {
      expect(pokeRound(2.4)).toBe(2)
    })

    it("leaves integers untouched", () => {
      expect(pokeRound(7)).toBe(7)
    })
  })

  describe("overflow16", () => {
    it("wraps values above 16-bit max", () => {
      expect(overflow16(65536)).toBe(0)
    })

    it("keeps values within range", () => {
      expect(overflow16(65535)).toBe(65535)
    })
  })

  describe("overflow32", () => {
    it("wraps values above 32-bit max", () => {
      expect(overflow32(4294967296)).toBe(0)
    })

    it("keeps values within range", () => {
      expect(overflow32(4294967295)).toBe(4294967295)
    })
  })

  describe("chainMods", () => {
    it("returns 4096 when there are no mods", () => {
      expect(chainMods([], 0, 4294967296)).toBe(4096)
    })

    it("ignores neutral 4096 mods", () => {
      expect(chainMods([4096, 4096], 0, 4294967296)).toBe(4096)
    })

    it("chains a single modifier with rounding", () => {
      expect(chainMods([6144], 0, 4294967296)).toBe(6144)
    })

    it("chains multiple modifiers", () => {
      expect(chainMods([6144, 5325], 0, 4294967296)).toBe(7988)
    })

    it("clamps to the lower bound", () => {
      expect(chainMods([1], 410, 131172)).toBe(410)
    })

    it("clamps to the upper bound", () => {
      expect(chainMods([8192, 8192], 410, 6144)).toBe(6144)
    })
  })

  describe("getModifiedStat", () => {
    it("returns the raw stat with no boost", () => {
      expect(getModifiedStat(200, 0)).toBe(200)
    })

    it("applies a positive boost", () => {
      expect(getModifiedStat(200, 2)).toBe(400)
    })

    it("applies a negative boost", () => {
      expect(getModifiedStat(200, -2)).toBe(100)
    })

    it("applies the single-stage drop as a two-thirds fraction", () => {
      expect(getModifiedStat(409, -1)).toBe(272)
    })

    it("does not clamp high boosted stats", () => {
      expect(getModifiedStat(500, 6)).toBe(2000)
    })

    it("applies the max positive boost", () => {
      expect(getModifiedStat(100, 6)).toBe(400)
    })

    it("applies the max negative boost", () => {
      expect(getModifiedStat(100, -6)).toBe(25)
    })
  })

  describe("getBaseDamage", () => {
    it("computes base damage at level 50", () => {
      expect(getBaseDamage(50, 90, 200, 100)).toBe(81)
    })

    it("computes base damage at level 100", () => {
      expect(getBaseDamage(100, 120, 300, 150)).toBe(203)
    })
  })

  describe("getFinalDamage", () => {
    it("computes min roll with neutral effectiveness", () => {
      expect(getFinalDamage(80, 0, 1, false, 4096, 4096)).toBe(68)
    })

    it("computes max roll with neutral effectiveness", () => {
      expect(getFinalDamage(80, 15, 1, false, 4096, 4096)).toBe(80)
    })

    it("applies STAB", () => {
      expect(getFinalDamage(80, 0, 1, false, 6144, 4096)).toBe(102)
    })

    it("applies super-effective multiplier", () => {
      expect(getFinalDamage(80, 0, 2, false, 4096, 4096)).toBe(136)
    })

    it("halves damage when burned", () => {
      expect(getFinalDamage(80, 0, 1, true, 4096, 4096)).toBe(34)
    })

    it("reduces damage when protected", () => {
      expect(getFinalDamage(80, 0, 1, false, 4096, 4096, true)).toBe(17)
    })

    it("never drops below 1", () => {
      expect(getFinalDamage(0, 0, 1, false, 4096, 4096)).toBe(1)
    })
  })
})
