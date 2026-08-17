import { evToSp, spToEv, totalSpsFromEvs, remainingSps, MAX_SPS, maxEvForStat, evsExceedMaxSps, clampEvToRemainingSps } from "@multicalc/utils/ev-sp-converter"

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

  describe("totalSpsFromEvs", () => {
    it("sums SPs across all provided stats", () => {
      const total = totalSpsFromEvs({ hp: 252, atk: 252, spe: 4 })

      expect(total).toEqual(65)
    })

    it("treats missing stats as zero", () => {
      const total = totalSpsFromEvs({ atk: 252 })

      expect(total).toEqual(32)
    })
  })

  describe("remainingSps", () => {
    it("subtracts spent SPs from the maximum", () => {
      const remaining = remainingSps({ hp: 252, atk: 252 })

      expect(remaining).toEqual(MAX_SPS - 64)
    })
  })

  describe("maxEvForStat", () => {
    it("returns the EV that fills the SPs left after excluding the stat's current EV", () => {
      const max = maxEvForStat({ hp: 252, atk: 252, spe: 0 }, "spe")

      expect(max).toEqual(12)
    })

    it("counts the stat's own current EV as reclaimable room", () => {
      const max = maxEvForStat({ hp: 252, atk: 252, spe: 252 }, "spe")

      expect(max).toEqual(12)
    })

    it("treats an absent stat as zero EVs invested", () => {
      const max = maxEvForStat({ hp: 252, atk: 252 }, "spe")

      expect(max).toEqual(12)
    })

    it("never exceeds the per stat maximum when the SPs budget is untouched", () => {
      const max = maxEvForStat({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, "hp")

      expect(max).toEqual(252)
    })
  })

  describe("evsExceedMaxSps", () => {
    it("is true when the candidate EV pushes the total past the maximum", () => {
      const exceeds = evsExceedMaxSps({ hp: 252, atk: 252, spe: 0 }, "spe", 252)

      expect(exceeds).toBe(true)
    })

    it("is false when the candidate EV fits within the maximum", () => {
      const exceeds = evsExceedMaxSps({ hp: 252, atk: 252, spe: 0 }, "spe", 12)

      expect(exceeds).toBe(false)
    })
  })

  describe("clampEvToRemainingSps", () => {
    it("keeps the EV untouched when it fits", () => {
      const clamped = clampEvToRemainingSps({ hp: 252, atk: 252, spe: 0 }, "spe", 12)

      expect(clamped).toEqual(12)
    })

    it("clamps to the remaining SPs when the EV overflows", () => {
      const clamped = clampEvToRemainingSps({ hp: 252, atk: 252, spe: 0 }, "spe", 252)

      expect(clamped).toEqual(12)
    })

    it("clamps to the per stat maximum even when the SPs budget still has room", () => {
      const clamped = clampEvToRemainingSps({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, "hp", 300)

      expect(clamped).toEqual(252)
    })
  })
})
