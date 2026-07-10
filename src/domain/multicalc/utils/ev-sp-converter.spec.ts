import { evToSp, spToEv, totalSpsFromEvs, remainingSps, MAX_SPS } from "@multicalc/utils/ev-sp-converter"

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
})
