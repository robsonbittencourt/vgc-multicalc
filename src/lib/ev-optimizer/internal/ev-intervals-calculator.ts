import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class EvIntervalsCalculator {
  getEvIntervals(): number[] {
    const evIntervals = [0, 4]
    let current = 4

    while (current < 252) {
      current += 8

      if (current <= 252) {
        evIntervals.push(current)
      }
    }

    return evIntervals
  }
}
