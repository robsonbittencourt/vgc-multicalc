import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Injectable } from "@angular/core"
import { Stats } from "@lib/types"

export type EvCombination = Stats & {
  product: number
  totalEvs: number
}

@Injectable({
  providedIn: "root"
})
export class EvOptimizerUtils {
  findMinimumEvViaBinarySearch(evIntervals: number[], validationFn: (evValue: number) => boolean): number {
    let minEvIntervalIndex = evIntervals.length - 1
    let left = 0
    let right = evIntervals.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const evValue = evIntervals[mid]

      if (validationFn(evValue)) {
        minEvIntervalIndex = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return minEvIntervalIndex
  }

  generateTwoStatCombinations(
    evIntervals: number[],
    hpValues: Map<number, number>,
    secondaryValues: Map<number, number>,
    minDamageProduct: number,
    damageProductFn: (hp: number, secondary: number) => number,
    secondaryStat: "def" | "spd"
  ): EvCombination[] {
    const combinations: EvCombination[] = []

    for (const hpEv of evIntervals) {
      const hp = hpValues.get(hpEv)!
      for (const secondaryEv of evIntervals) {
        if (hpEv + secondaryEv > MAX_TOTAL_EVS) continue

        const secondaryValue = secondaryValues.get(secondaryEv)!
        const damageProduct = damageProductFn(hp, secondaryValue)

        if (damageProduct >= minDamageProduct) {
          const totalEvs = hpEv + secondaryEv
          combinations.push({
            hp: hpEv,
            atk: 0,
            def: secondaryStat === "def" ? secondaryEv : 0,
            spa: 0,
            spd: secondaryStat === "spd" ? secondaryEv : 0,
            spe: 0,
            product: damageProduct,
            totalEvs
          })
        }
      }
    }

    combinations.sort((a, b) => {
      if (a.totalEvs === b.totalEvs) {
        return b.hp - a.hp
      }
      return a.totalEvs - b.totalEvs
    })

    return combinations
  }

  generateThreeStatCombinations(
    evIntervals: number[],
    hpValues: Map<number, number>,
    defValues: Map<number, number>,
    spdValues: Map<number, number>,
    minDamageProduct: number,
    maxTotalEvs = MAX_TOTAL_EVS,
    minDefEv = 0,
    minSpdEv = 0,
    initialHp = 0,
    initialDef = 0,
    initialSpd = 0
  ): EvCombination[] {
    const combinations: EvCombination[] = []

    for (const hpEv of evIntervals) {
      const hp = hpValues.get(hpEv)!
      for (const defEv of evIntervals) {
        if (defEv < minDefEv) continue

        const def = defValues.get(defEv)!
        for (const spdEv of evIntervals) {
          if (spdEv < minSpdEv) continue

          if (hpEv >= initialHp && defEv >= initialDef && spdEv >= initialSpd) continue

          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs > maxTotalEvs) continue
          if (totalEvs > MAX_TOTAL_EVS) continue

          const spd = spdValues.get(spdEv)!
          const damageProduct = hp * (def + spd)

          if (damageProduct >= minDamageProduct) {
            combinations.push({
              hp: hpEv,
              atk: 0,
              def: defEv,
              spa: 0,
              spd: spdEv,
              spe: 0,
              product: damageProduct,
              totalEvs
            })
          }
        }
      }
    }

    combinations.sort((a, b) => {
      if (a.totalEvs === b.totalEvs) {
        return b.hp - a.hp
      }
      return a.totalEvs - b.totalEvs
    })

    return combinations
  }

  findBestValidCombination(combinations: EvCombination[], validationFn: (combination: EvCombination) => boolean): EvCombination | null {
    for (const combination of combinations) {
      if (validationFn(combination)) {
        return combination
      }
    }

    return null
  }
}
