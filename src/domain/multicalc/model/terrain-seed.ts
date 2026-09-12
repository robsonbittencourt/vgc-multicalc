import { StatIDExceptHP } from "@data/types"
import { Terrain } from "@multicalc/types"

const TERRAIN_SEEDS: Record<string, { terrain: Terrain; stat: StatIDExceptHP }> = {
  "Electric Seed": { terrain: "Electric", stat: "def" },
  "Grassy Seed": { terrain: "Grassy", stat: "def" },
  "Misty Seed": { terrain: "Misty", stat: "spd" },
  "Psychic Seed": { terrain: "Psychic", stat: "spd" }
}

export function isTerrainSeed(item: string): boolean {
  return item in TERRAIN_SEEDS
}

export function seedBoostedStat(item: string, terrain: Terrain): StatIDExceptHP | undefined {
  const seed = TERRAIN_SEEDS[item]

  if (!seed) return undefined
  if (seed.terrain !== terrain) return undefined

  return seed.stat
}
