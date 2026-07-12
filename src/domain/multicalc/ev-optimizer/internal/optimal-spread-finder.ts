import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { EvIntervalsCalc } from "./ev-intervals-calc"
import { SurvivalChecker } from "./survival-checker"

type SpreadContext = {
  defender: Pokemon
  field: Field
  threshold: SurvivalThreshold
  rollIndex: number
  rightIsDefender: boolean
}

export class OptimalSpreadFinder {
  private evIntervalsCalc = new EvIntervalsCalc()

  constructor(private survivalChecker: SurvivalChecker = new SurvivalChecker()) {}

  findOptimal(defender: Pokemon, physicalAttackers: Pokemon[], specialAttackers: Pokemon[], doublePair: [Pokemon, Pokemon] | null, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): Stats | null {
    if (physicalAttackers.length === 0 && specialAttackers.length === 0 && !doublePair) {
      return null
    }

    const ctx: SpreadContext = { defender, field, threshold, rollIndex, rightIsDefender }
    const evIntervals = this.evIntervalsCalc.getEvIntervals()

    let best: (Stats & { totalEvs: number }) | null = null

    for (const hpEv of evIntervals) {
      if (best && hpEv > best.totalEvs) break

      const minDefIndex = this.findMinStatIndexForSingles(physicalAttackers, hpEv, "def", evIntervals, ctx)
      if (minDefIndex === -1) continue

      const minSpdIndex = this.findMinStatIndexForSingles(specialAttackers, hpEv, "spd", evIntervals, ctx)
      if (minSpdIndex === -1) continue

      const minSpdEv = evIntervals[minSpdIndex]

      if (!doublePair) {
        const defEv = evIntervals[minDefIndex]
        const totalEvs = hpEv + defEv + minSpdEv

        if (totalEvs <= MAX_TOTAL_EVS) {
          best = this.pickBest(best, { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: minSpdEv, spe: 0, totalEvs })
        }

        continue
      }

      for (let defIndex = minDefIndex; defIndex < evIntervals.length; defIndex++) {
        const defEv = evIntervals[defIndex]

        if (hpEv + defEv + minSpdEv > MAX_TOTAL_EVS) break
        if (best && hpEv + defEv + minSpdEv > best.totalEvs) break

        const spdForDoubleIndex = this.findMinSpdIndexForDouble(doublePair, hpEv, defEv, minSpdIndex, evIntervals, ctx)
        if (spdForDoubleIndex === -1) continue

        const spdEv = evIntervals[spdForDoubleIndex]
        const totalEvs = hpEv + defEv + spdEv

        if (totalEvs <= MAX_TOTAL_EVS) {
          best = this.pickBest(best, { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs })
        }
      }
    }

    if (!best) {
      return null
    }

    const polished = this.polish({ hp: best.hp, atk: 0, def: best.def, spa: 0, spd: best.spd, spe: 0 }, physicalAttackers, specialAttackers, doublePair, ctx)

    return polished
  }

  private pickBest(current: (Stats & { totalEvs: number }) | null, candidate: Stats & { totalEvs: number }): Stats & { totalEvs: number } {
    if (!current || candidate.totalEvs < current.totalEvs || (candidate.totalEvs === current.totalEvs && candidate.hp > current.hp)) {
      return candidate
    }

    return current
  }

  private findMinStatIndexForSingles(attackers: Pokemon[], hpEv: number, stat: "def" | "spd", evIntervals: number[], ctx: SpreadContext): number {
    if (attackers.length === 0) {
      return 0
    }

    const survivesAllAt = (statEv: number): boolean => {
      const evs = { hp: hpEv, def: stat === "def" ? statEv : 0, spd: stat === "spd" ? statEv : 0 }

      return attackers.every(attacker => this.survivalChecker.checkSurvivalWithEvs(attacker, ctx.defender, evs, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender))
    }

    if (!survivesAllAt(evIntervals[evIntervals.length - 1])) {
      return -1
    }

    let low = 0
    let high = evIntervals.length - 1
    let result = -1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      if (survivesAllAt(evIntervals[mid])) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  private findMinSpdIndexForDouble(doublePair: [Pokemon, Pokemon], hpEv: number, defEv: number, minSpdIndex: number, evIntervals: number[], ctx: SpreadContext): number {
    const survivesDoubleAt = (spdEv: number): boolean => {
      const evs = { hp: hpEv, def: defEv, spd: spdEv }

      return this.survivalChecker.checkSurvivalAgainstTwoAttackersWithEvs(doublePair[0], doublePair[1], ctx.defender, evs, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender)
    }

    if (!survivesDoubleAt(evIntervals[evIntervals.length - 1])) {
      return -1
    }

    let low = minSpdIndex
    let high = evIntervals.length - 1
    let result = -1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      if (survivesDoubleAt(evIntervals[mid])) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  private polish(solution: Stats, physicalAttackers: Pokemon[], specialAttackers: Pokemon[], doublePair: [Pokemon, Pokemon] | null, ctx: SpreadContext): Stats {
    const survivesAll = (evs: Stats): boolean => {
      const spread = { hp: evs.hp, def: evs.def, spd: evs.spd }

      const singlesSurvive = [...physicalAttackers, ...specialAttackers].every(attacker => this.survivalChecker.checkSurvivalWithEvs(attacker, ctx.defender, spread, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender))

      if (!singlesSurvive) {
        return false
      }

      if (doublePair) {
        return this.survivalChecker.checkSurvivalAgainstTwoAttackersWithEvs(doublePair[0], doublePair[1], ctx.defender, spread, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender)
      }

      return true
    }

    let current = { ...solution }
    let improved = true

    while (improved) {
      improved = false

      for (const stat of ["hp", "def", "spd"] as const) {
        if (current[stat] >= 4) {
          const test = { ...current, [stat]: current[stat] - 4 }

          if (survivesAll(test)) {
            current = test
            improved = true
            break
          }
        }
      }
    }

    return current
  }
}
