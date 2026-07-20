import { EV_INTERVALS, MAX_TOTAL_EVS } from "./ev-optimizer-constants"

export type TwoStatCombination = {
  hp: number
  secondary: number
}

export type ThreeStatCombination = {
  hp: number
  def: number
  spd: number
}

export function minIndexSurviving(lowIndex: number, survivesAt: (ev: number) => boolean): number {
  const highIndex = EV_INTERVALS.length - 1

  if (!survivesAt(EV_INTERVALS[highIndex])) {
    return -1
  }

  let low = lowIndex
  let high = highIndex
  let result = -1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    if (survivesAt(EV_INTERVALS[mid])) {
      result = mid
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return result
}

let twoStatGrid: readonly TwoStatCombination[] | null = null
let threeStatGrid: readonly ThreeStatCombination[] | null = null

export function orderedTwoStatGrid(): readonly TwoStatCombination[] {
  if (!twoStatGrid) {
    twoStatGrid = buildOrderedTwoStatGrid()
  }

  return twoStatGrid
}

export function orderedThreeStatGrid(): readonly ThreeStatCombination[] {
  if (!threeStatGrid) {
    threeStatGrid = buildOrderedThreeStatGrid()
  }

  return threeStatGrid
}

function buildOrderedTwoStatGrid(): TwoStatCombination[] {
  const combinations: TwoStatCombination[] = []

  for (const hpEv of EV_INTERVALS) {
    for (const secondaryEv of EV_INTERVALS) {
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

function buildOrderedThreeStatGrid(): ThreeStatCombination[] {
  const combinations: ThreeStatCombination[] = []

  for (const hpEv of EV_INTERVALS) {
    for (const defEv of EV_INTERVALS) {
      if (hpEv + defEv > MAX_TOTAL_EVS) continue

      for (const spdEv of EV_INTERVALS) {
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
