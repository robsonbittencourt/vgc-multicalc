export const MAX_TOTAL_EVS = 508
export const MAX_SINGLE_STAT_EVS = 252
export const MIN_DAMAGE_PRODUCT_MULTIPLIER = 0.95

function buildEvIntervals(): number[] {
  const evIntervals = [0]

  for (let current = 4; current <= MAX_SINGLE_STAT_EVS; current += 8) {
    evIntervals.push(current)
  }

  return evIntervals
}

export const EV_INTERVALS: readonly number[] = Object.freeze(buildEvIntervals())
