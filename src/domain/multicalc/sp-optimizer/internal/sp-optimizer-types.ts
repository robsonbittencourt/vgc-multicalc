import { Stats } from "@multicalc/types"
import { TargetCoverage } from "@multicalc/sp-optimizer/internal/coverage"

export type SurvivalThreshold = 2 | 3 | 4

export type OptimizationStatus = "success" | "best-effort" | "not-needed" | "impossible"

export type OptimizationResult =
  | { sps: Stats; nature: string | null; status: "success" | "not-needed"; coverage: TargetCoverage }
  | { sps: Stats; nature: string | null; status: "best-effort"; koChance: number; coverage: TargetCoverage }
  | { sps: Stats; nature: string | null; status: "impossible"; coverage: TargetCoverage }
