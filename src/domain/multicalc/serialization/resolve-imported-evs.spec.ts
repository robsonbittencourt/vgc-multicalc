import { InvalidSpsError, resolveImportedEvs } from "@multicalc/serialization"

describe("resolveImportedEvs", () => {
  describe("when SP mode is off", () => {
    it("should return the raw EVs untouched", () => {
      const evs = resolveImportedEvs({ hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 }, false)

      expect(evs).toEqual({ hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 })
    })

    it("should default every missing stat to zero", () => {
      const evs = resolveImportedEvs({ spa: 252 }, false)

      expect(evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 })
    })

    it("should default every stat to zero when there are no EVs at all", () => {
      const evs = resolveImportedEvs(undefined, false)

      expect(evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should not reject values that would be invalid as SPs", () => {
      const evs = resolveImportedEvs({ hp: 252, atk: 252, def: 252, spa: 252, spd: 252, spe: 252 }, false)

      expect(evs.hp).toBe(252)
    })
  })

  describe("when SP mode is on", () => {
    it("should convert every SP to its EV value", () => {
      const evs = resolveImportedEvs({ hp: 1, atk: 0, def: 32, spa: 32, spd: 1, spe: 0 }, true)

      expect(evs).toEqual({ hp: 4, atk: 0, def: 252, spa: 252, spd: 4, spe: 0 })
    })

    it("should convert a stat that spends the whole per stat budget", () => {
      const evs = resolveImportedEvs({ spa: 32 }, true)

      expect(evs.spa).toBe(252)
    })

    it("should keep a stat with no SPs at zero", () => {
      const evs = resolveImportedEvs({ spa: 32 }, true)

      expect(evs.atk).toBe(0)
    })

    it("should accept a spread that spends exactly the whole SP budget", () => {
      const evs = resolveImportedEvs({ hp: 2, def: 32, spa: 32 }, true)

      expect(evs).toEqual({ hp: 12, atk: 0, def: 252, spa: 252, spd: 0, spe: 0 })
    })

    it("should default every stat to zero when there are no EVs at all", () => {
      const evs = resolveImportedEvs(undefined, true)

      expect(evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should reject a spread whose SPs go over the total budget", () => {
      expect(() => resolveImportedEvs({ hp: 32, def: 32, spa: 3 }, true)).toThrow(InvalidSpsError)
    })

    it("should reject a single stat that goes over the per stat budget", () => {
      expect(() => resolveImportedEvs({ atk: 33 }, true)).toThrow(InvalidSpsError)
    })

    it("should reject EV sized values that were meant to be SPs", () => {
      expect(() => resolveImportedEvs({ hp: 252, def: 4, spd: 252 }, true)).toThrow(InvalidSpsError)
    })
  })
})
