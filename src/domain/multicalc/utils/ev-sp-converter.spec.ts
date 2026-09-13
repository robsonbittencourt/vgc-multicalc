import { clampSpToRemaining, evsToSps, evToSp, maxSpForStat, MAX_SPS, remainingSps, spsExceedMax, spsToEvs, spToEv, totalSps } from "@multicalc/utils/ev-sp-converter"

describe("ev-sp-converter", () => {
  describe("evToSp", () => {
    it("returns 0 for EVs below the first threshold", () => {
      const sp = evToSp(3)

      expect(sp).toEqual(0)
    })

    it("returns 1 for exactly 4 EVs", () => {
      const sp = evToSp(4)

      expect(sp).toEqual(1)
    })

    it("discards the remainder of an EV value that falls between two SPs", () => {
      const sp = evToSp(8)

      expect(sp).toEqual(1)
    })

    it("returns 32 for 252 EVs", () => {
      const sp = evToSp(252)

      expect(sp).toEqual(32)
    })
  })

  describe("spToEv", () => {
    it("returns 0 for 0 SPs", () => {
      const ev = spToEv(0)

      expect(ev).toEqual(0)
    })

    it("returns 4 for 1 SP", () => {
      const ev = spToEv(1)

      expect(ev).toEqual(4)
    })

    it("returns 252 for 32 SPs", () => {
      const ev = spToEv(32)

      expect(ev).toEqual(252)
    })
  })

  describe("totalSps", () => {
    it("sums the SPs across all provided stats", () => {
      const total = totalSps({ hp: 32, atk: 32, spe: 1 })

      expect(total).toEqual(65)
    })

    it("treats missing stats as zero", () => {
      const total = totalSps({ atk: 32 })

      expect(total).toEqual(32)
    })
  })

  describe("remainingSps", () => {
    it("subtracts the spent SPs from the maximum", () => {
      const remaining = remainingSps({ hp: 32, atk: 32 })

      expect(remaining).toEqual(MAX_SPS - 64)
    })

    it("returns the whole budget when nothing was spent", () => {
      const remaining = remainingSps({})

      expect(remaining).toEqual(MAX_SPS)
    })
  })

  describe("maxSpForStat", () => {
    it("returns the SPs left after excluding the stat's own current SPs", () => {
      const max = maxSpForStat({ hp: 30, def: 20, spd: 10 }, "spd")

      expect(max).toEqual(MAX_SPS - 50)
    })

    it("counts the stat's own current SPs as reclaimable room", () => {
      const max = maxSpForStat({ hp: 34, spd: 32 }, "spd")

      expect(max).toEqual(MAX_SPS - 34)
    })

    it("treats an absent stat as zero SPs invested", () => {
      const max = maxSpForStat({ hp: 40 }, "spd")

      expect(max).toEqual(MAX_SPS - 40)
    })

    it("never exceeds the per stat maximum when the budget is untouched", () => {
      const max = maxSpForStat({}, "atk")

      expect(max).toEqual(32)
    })
  })

  describe("spsExceedMax", () => {
    it("is true when the candidate SP pushes the total past the maximum", () => {
      const exceeds = spsExceedMax({ hp: 32, def: 32 }, "spd", 5)

      expect(exceeds).toEqual(true)
    })

    it("is false when the candidate SP fits within the maximum", () => {
      const exceeds = spsExceedMax({ hp: 32, def: 32 }, "spd", 2)

      expect(exceeds).toEqual(false)
    })
  })

  describe("clampSpToRemaining", () => {
    it("keeps the SP untouched when it fits", () => {
      const clamped = clampSpToRemaining({ hp: 20, def: 10 }, "spd", 12)

      expect(clamped).toEqual(12)
    })

    it("clamps to the remaining SPs when the value overflows the budget", () => {
      const clamped = clampSpToRemaining({ hp: 32, def: 30 }, "spd", 20)

      expect(clamped).toEqual(MAX_SPS - 62)
    })

    it("clamps to the per stat maximum even when the budget still has room", () => {
      const clamped = clampSpToRemaining({}, "atk", 40)

      expect(clamped).toEqual(32)
    })
  })

  describe("spsToEvs", () => {
    it("converts every stat to its EV value", () => {
      const evs = spsToEvs({ hp: 1, atk: 0, def: 32, spa: 13, spd: 2, spe: 32 })

      expect(evs).toEqual({ hp: 4, atk: 0, def: 252, spa: 100, spd: 12, spe: 252 })
    })

    it("treats missing stats as zero", () => {
      const evs = spsToEvs({ spa: 32 })

      expect(evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 })
    })

    it("returns every stat at zero when no SPs are provided at all", () => {
      const evs = spsToEvs({})

      expect(evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })
  })

  describe("evsToSps", () => {
    it("converts every stat to its SP value", () => {
      const sps = evsToSps({ hp: 4, atk: 0, def: 252, spa: 100, spd: 12, spe: 252 })

      expect(sps).toEqual({ hp: 1, atk: 0, def: 32, spa: 13, spd: 2, spe: 32 })
    })

    it("treats missing stats as zero", () => {
      const sps = evsToSps({ spa: 252 })

      expect(sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 0 })
    })

    it("returns every stat at zero when no EVs are provided at all", () => {
      const sps = evsToSps({})

      expect(sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })
  })
})
