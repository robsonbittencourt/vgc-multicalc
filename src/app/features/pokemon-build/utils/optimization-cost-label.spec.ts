import { formatCostOf, formatKeptStatsLabel } from "@features/pokemon-build/utils/optimization-cost-label"
import { Stats } from "@multicalc/types"

describe("formatCostOf", () => {
  const empty: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

  describe("without the keep mode", () => {
    it("should report the whole spread with no sign", () => {
      const optimized: Stats = { ...empty, hp: 8, def: 12 }

      const label = formatCostOf(optimized, empty, "SPs", true, false)

      expect(label).toEqual("20 SPs — HP 8, Def 12")
    })

    it("should ignore the original spread entirely", () => {
      const original: Stats = { ...empty, spa: 32, spd: 20 }
      const optimized: Stats = { ...empty, hp: 8, def: 12 }

      const label = formatCostOf(optimized, original, "SPs", true, false)

      expect(label).toEqual("20 SPs — HP 8, Def 12")
    })

    it("should report the spread even when every stat only lost points", () => {
      const original: Stats = { ...empty, atk: 12, spd: 8 }
      const optimized: Stats = { ...empty, atk: 4 }

      const label = formatCostOf(optimized, original, "SPs", true, false)

      expect(label).toEqual("4 SPs — Atk 4")
    })

    it("should convert each stat on its own when the SPs mode is off", () => {
      const optimized: Stats = { ...empty, hp: 8, def: 4 }

      const label = formatCostOf(optimized, empty, "EVs", false, false)

      expect(label).toEqual("88 EVs — HP 60, Def 28")
    })

    it("should convert two maxed stats to the EVs the spread really costs", () => {
      const optimized: Stats = { ...empty, hp: 32, atk: 32 }

      const label = formatCostOf(optimized, empty, "EVs", false, false)

      expect(label).toEqual("504 EVs — HP 252, Atk 252")
    })

    it("should say nothing when the spread is empty", () => {
      const label = formatCostOf(empty, empty, "SPs", true, false)

      expect(label).toEqual("")
    })

    it("should leave the Speed out because the optimizer never invests in it", () => {
      const optimized: Stats = { ...empty, spe: 20 }

      const label = formatCostOf(optimized, empty, "SPs", true, false)

      expect(label).toEqual("")
    })
  })

  describe("with the keep mode", () => {
    it("should sign the stats that gained points", () => {
      const original: Stats = { ...empty, hp: 8 }
      const optimized: Stats = { ...empty, hp: 8, def: 20 }

      const label = formatCostOf(optimized, original, "SPs", true, true)

      expect(label).toEqual("20 SPs — Def +20")
    })

    it("should sign the stats that lost points", () => {
      const original: Stats = { ...empty, spa: 12 }

      const label = formatCostOf(empty, original, "SPs", true, true)

      expect(label).toEqual("-12 SPs — SpA −12")
    })

    it("should net the additions against the removals", () => {
      const original: Stats = { ...empty, spa: 12 }
      const optimized: Stats = { ...empty, spa: 4, def: 20 }

      const label = formatCostOf(optimized, original, "SPs", true, true)

      expect(label).toEqual("12 SPs — Def +20, SpA −8")
    })

    it("should report a zero net cost on a pure reallocation", () => {
      const original: Stats = { ...empty, spa: 8 }
      const optimized: Stats = { ...empty, hp: 8 }

      const label = formatCostOf(optimized, original, "SPs", true, true)

      expect(label).toEqual("0 SPs — HP +8, SpA −8")
    })

    it("should convert the changes to EVs when the SPs mode is off", () => {
      const original: Stats = { ...empty, spa: 8 }
      const optimized: Stats = { ...empty, spa: 4, hp: 8 }

      const label = formatCostOf(optimized, original, "EVs", false, true)

      expect(label).toEqual("32 EVs — HP +60, SpA −28")
    })

    it("should say nothing when no stat changed", () => {
      const original: Stats = { ...empty, hp: 8, spd: 12 }

      const label = formatCostOf({ ...original }, original, "SPs", true, true)

      expect(label).toEqual("")
    })

    it("should leave the Speed out because the optimizer never invests in it", () => {
      const original: Stats = { ...empty, spe: 8 }
      const optimized: Stats = { ...empty, spe: 20 }

      const label = formatCostOf(optimized, original, "SPs", true, true)

      expect(label).toEqual("")
    })
  })
})

describe("formatKeptStatsLabel", () => {
  const empty: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

  it("should name the stats that kept their original investment", () => {
    const original: Stats = { ...empty, hp: 8, spd: 12 }
    const optimized: Stats = { ...empty, hp: 8, spd: 12, atk: 20 }

    const label = formatKeptStatsLabel(original, optimized)

    expect(label).toEqual("HP 8, SpD 12")
  })

  it("should say nothing when the original spread was empty", () => {
    const optimized: Stats = { ...empty, atk: 20 }

    const label = formatKeptStatsLabel(empty, optimized)

    expect(label).toEqual("")
  })

  it("should say nothing when every invested stat was changed", () => {
    const original: Stats = { ...empty, hp: 8 }
    const optimized: Stats = { ...empty, hp: 16 }

    const label = formatKeptStatsLabel(original, optimized)

    expect(label).toEqual("")
  })
})
