import { DamageDistribution } from "@calc/model/damage-distribution"

describe("DamageDistribution", () => {
  describe("subArrays", () => {
    it("wraps a scalar damage into a single sub-array", () => {
      const distribution = new DamageDistribution(87)

      expect(distribution.subArrays()).toEqual([[87]])
    })

    it("wraps a roll list into a single sub-array", () => {
      const distribution = new DamageDistribution([12, 14, 16])

      expect(distribution.subArrays()).toEqual([[12, 14, 16]])
    })

    it("keeps a multi-hit matrix as-is", () => {
      const distribution = new DamageDistribution([
        [10, 12],
        [20, 24]
      ])

      expect(distribution.subArrays()).toEqual([
        [10, 12],
        [20, 24]
      ])
    })
  })

  describe("rollsAt", () => {
    it("picks the roll at the given index for each sub-array", () => {
      const distribution = new DamageDistribution([
        [10, 12, 14],
        [20, 22, 24]
      ])

      expect(distribution.rollsAt(1)).toEqual([12, 22])
    })

    it("clamps the index to the last available roll", () => {
      const distribution = new DamageDistribution([10, 12, 14])

      expect(distribution.rollsAt(99)).toEqual([14])
    })
  })

  describe("totalAt", () => {
    it("sums the rolls at the given index across sub-arrays", () => {
      const distribution = new DamageDistribution([
        [10, 12, 14],
        [20, 22, 24]
      ])

      expect(distribution.totalAt(2)).toBe(38)
    })
  })

  describe("range", () => {
    it("sums the min and max across sub-arrays", () => {
      const distribution = new DamageDistribution([
        [10, 12, 14],
        [20, 22, 24]
      ])

      expect(distribution.range()).toEqual([30, 38])
    })
  })

  describe("min and max", () => {
    it("exposes the min and max roll of a single-hit distribution", () => {
      const rolls = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
      const distribution = new DamageDistribution(rolls)

      expect(distribution.min()).toBe(100)
      expect(distribution.max()).toBe(115)
    })
  })
})
