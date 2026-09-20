export type TargetCoverage = { covered: number; total: number; outOfReach: number; bestTargetName: string | null; bestTargetKoChance?: number }

export const EMPTY_COVERAGE: TargetCoverage = { covered: 0, total: 0, outOfReach: 0, bestTargetName: null }
