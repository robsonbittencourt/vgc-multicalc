import { MAX_SINGLE_STAT_EVS } from "./ev-optimizer-constants"

export class EvIntervalsCalc {
  getEvIntervals(): number[] {
    const evIntervals = [0]

    for (let current = 4; current <= MAX_SINGLE_STAT_EVS; current += 8) {
      evIntervals.push(current)
    }

    return evIntervals
  }
}
