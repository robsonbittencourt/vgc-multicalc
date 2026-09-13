import { InvalidSpsError, resolveImportedSps } from "@multicalc/serialization"

describe("resolveImportedSps", () => {
  describe("when SP mode is on", () => {
    it("should return the raw SPs untouched", () => {
      const sps = resolveImportedSps({ hp: 32, atk: 0, def: 1, spa: 0, spd: 32, spe: 0 }, true)

      expect(sps).toEqual({ hp: 32, atk: 0, def: 1, spa: 0, spd: 32, spe: 0 })
    })

    it("should default every missing stat to zero", () => {
      const sps = resolveImportedSps({ spa: 32 }, true)

      expect(sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 0 })
    })

    it("should default every stat to zero when there are no SPs at all", () => {
      const sps = resolveImportedSps(undefined, true)

      expect(sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should accept a spread that spends exactly the whole SP budget", () => {
      const sps = resolveImportedSps({ hp: 2, def: 32, spa: 32 }, true)

      expect(sps).toEqual({ hp: 2, atk: 0, def: 32, spa: 32, spd: 0, spe: 0 })
    })

    it("should reject a spread whose SPs go over the total budget", () => {
      expect(() => resolveImportedSps({ hp: 32, def: 32, spa: 3 }, true)).toThrow(InvalidSpsError)
    })

    it("should reject a single stat that goes over the per stat budget", () => {
      expect(() => resolveImportedSps({ atk: 33 }, true)).toThrow(InvalidSpsError)
    })
  })

  describe("when SP mode is off", () => {
    it("should convert every EV to its SP value", () => {
      const sps = resolveImportedSps({ hp: 4, atk: 0, def: 252, spa: 252, spd: 4, spe: 0 }, false)

      expect(sps).toEqual({ hp: 1, atk: 0, def: 32, spa: 32, spd: 1, spe: 0 })
    })

    it("should convert a stat that spends the whole per stat budget", () => {
      const sps = resolveImportedSps({ spa: 252 }, false)

      expect(sps.spa).toBe(32)
    })

    it("should keep a stat with no EVs at zero", () => {
      const sps = resolveImportedSps({ spa: 252 }, false)

      expect(sps.atk).toBe(0)
    })

    it("should default every stat to zero when there are no EVs at all", () => {
      const sps = resolveImportedSps(undefined, false)

      expect(sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should reject an EV spread whose SPs go over the total budget", () => {
      expect(() => resolveImportedSps({ hp: 252, atk: 252, def: 252, spa: 252, spd: 252, spe: 252 }, false)).toThrow(InvalidSpsError)
    })
  })
})
