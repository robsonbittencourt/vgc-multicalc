import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { TargetCoverage } from "@multicalc/sp-optimizer/internal/coverage"

export type KoThreshold = 1 | 2 | 3 | 4

export type OffensiveStat = "atk" | "spa"

export type OffensiveOptimizationStatus = "success" | "not-needed" | "best-effort" | "impossible"

export type OffensiveSpProposal = { pokemonId: string; stat: OffensiveStat; sps: Stats; nature: string | null }

export type AttackerOptions = { keepOtherSps?: boolean; updateNature?: boolean }

export type SecondAttacker = { pokemon: Pokemon } & AttackerOptions

export type OffensiveOptimizationOptions = AttackerOptions & {
  rollIndex?: number
  rightIsDefender?: boolean
  secondAttacker?: SecondAttacker
}

export type OffensiveOptimizationResult =
  | { proposals: OffensiveSpProposal[]; status: "success" | "not-needed"; coverage: TargetCoverage }
  | { proposals: OffensiveSpProposal[]; status: "best-effort"; koChance: number; coverage: TargetCoverage }
  | { proposals: []; status: "impossible"; coverage: TargetCoverage }
