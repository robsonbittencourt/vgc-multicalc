import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"

export type TwoStatCombination = {
  hp: number
  secondary: number
}

export type ThreeStatCombination = {
  hp: number
  def: number
  spd: number
}

export class EvOptimizerUtils {
  generateOrderedTwoStatGrid(evIntervals: number[]): TwoStatCombination[] {
    const combinations: TwoStatCombination[] = []

    for (const hpEv of evIntervals) {
      for (const secondaryEv of evIntervals) {
        if (hpEv + secondaryEv > MAX_TOTAL_EVS) continue

        combinations.push({ hp: hpEv, secondary: secondaryEv })
      }
    }

    combinations.sort((a, b) => {
      const totalA = a.hp + a.secondary
      const totalB = b.hp + b.secondary

      if (totalA === totalB) {
        return b.hp - a.hp
      }

      return totalA - totalB
    })

    return combinations
  }

  generateOrderedThreeStatGrid(evIntervals: number[]): ThreeStatCombination[] {
    const combinations: ThreeStatCombination[] = []

    for (const hpEv of evIntervals) {
      for (const defEv of evIntervals) {
        if (hpEv + defEv > MAX_TOTAL_EVS) continue

        for (const spdEv of evIntervals) {
          if (hpEv + defEv + spdEv > MAX_TOTAL_EVS) continue

          combinations.push({ hp: hpEv, def: defEv, spd: spdEv })
        }
      }
    }

    combinations.sort((a, b) => {
      const totalA = a.hp + a.def + a.spd
      const totalB = b.hp + b.def + b.spd

      if (totalA === totalB) {
        return b.hp - a.hp
      }

      return totalA - totalB
    })

    return combinations
  }
}
