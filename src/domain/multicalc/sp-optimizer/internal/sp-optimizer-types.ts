import { Stats } from "@multicalc/types"

export type SurvivalThreshold = 2 | 3 | 4

export type OptimizationStatus = "success" | "best-effort" | "not-needed"

export type OptimizationResult = { sps: Stats; nature: string | null; status: "success" | "not-needed" } | { sps: Stats; nature: string | null; status: "best-effort"; koChance: number }
