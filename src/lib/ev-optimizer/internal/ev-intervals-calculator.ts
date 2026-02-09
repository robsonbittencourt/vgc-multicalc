import { Injectable } from "@angular/core"
import { MAX_SINGLE_STAT_EVS } from "./ev-optimizer-constants"

@Injectable({
  providedIn: "root"
})
export class EvIntervalsCalculator {
  getEvIntervals(): number[] {
    const evIntervals = [0, 4]
    let current = 4

    while (current < MAX_SINGLE_STAT_EVS) {
      current += 8

      if (current <= MAX_SINGLE_STAT_EVS) {
        evIntervals.push(current)
      }
    }

    return evIntervals
  }
}
