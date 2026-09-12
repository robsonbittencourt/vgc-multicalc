import { isTerrainSeed, seedBoostedStat } from "@multicalc/model/terrain-seed"

describe("Terrain Seed", () => {
  describe("isTerrainSeed", () => {
    it("should identify Electric Seed as a terrain seed", () => {
      expect(isTerrainSeed("Electric Seed")).toBe(true)
    })

    it("should identify Grassy Seed as a terrain seed", () => {
      expect(isTerrainSeed("Grassy Seed")).toBe(true)
    })

    it("should identify Misty Seed as a terrain seed", () => {
      expect(isTerrainSeed("Misty Seed")).toBe(true)
    })

    it("should identify Psychic Seed as a terrain seed", () => {
      expect(isTerrainSeed("Psychic Seed")).toBe(true)
    })

    it("should not identify Miracle Seed as a terrain seed", () => {
      expect(isTerrainSeed("Miracle Seed")).toBe(false)
    })

    it("should not identify an empty item as a terrain seed", () => {
      expect(isTerrainSeed("")).toBe(false)
    })
  })

  describe("seedBoostedStat", () => {
    it("should boost Defense with Electric Seed on Electric Terrain", () => {
      expect(seedBoostedStat("Electric Seed", "Electric")).toBe("def")
    })

    it("should boost Defense with Grassy Seed on Grassy Terrain", () => {
      expect(seedBoostedStat("Grassy Seed", "Grassy")).toBe("def")
    })

    it("should boost Special Defense with Misty Seed on Misty Terrain", () => {
      expect(seedBoostedStat("Misty Seed", "Misty")).toBe("spd")
    })

    it("should boost Special Defense with Psychic Seed on Psychic Terrain", () => {
      expect(seedBoostedStat("Psychic Seed", "Psychic")).toBe("spd")
    })

    it("should not boost when the terrain does not match the seed", () => {
      expect(seedBoostedStat("Psychic Seed", "Electric")).toBeUndefined()
    })

    it("should not boost when there is no terrain", () => {
      expect(seedBoostedStat("Electric Seed", null)).toBeUndefined()
    })

    it("should not boost when the item is not a terrain seed", () => {
      expect(seedBoostedStat("Miracle Seed", "Grassy")).toBeUndefined()
    })
  })
})
