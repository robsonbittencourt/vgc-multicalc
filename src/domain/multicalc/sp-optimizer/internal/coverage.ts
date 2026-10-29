export type TargetSuccessChance = { name: string; chance: number }

export type TargetCoverage = { covered: number; total: number; outOfReach: number; bestTargetName: string | null; bestTargetKoChance?: number; successChances?: TargetSuccessChance[] }

export const EMPTY_COVERAGE: TargetCoverage = { covered: 0, total: 0, outOfReach: 0, bestTargetName: null }
