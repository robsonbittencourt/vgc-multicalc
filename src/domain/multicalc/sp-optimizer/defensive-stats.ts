import { Stats } from "@multicalc/types"

export const DEFENSIVE_STATS: (keyof Stats)[] = ["hp", "def", "spd"]

export const OFFENSIVE_STATS: (keyof Stats)[] = ["atk", "spa"]

export const OPTIMIZABLE_STATS: (keyof Stats)[] = [...DEFENSIVE_STATS, ...OFFENSIVE_STATS]
