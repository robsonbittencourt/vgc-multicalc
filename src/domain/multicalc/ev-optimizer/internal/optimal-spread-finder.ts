import { EV_INTERVALS, MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { minIndexSurviving } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

type SpreadContext = {
  tempDefender: Pokemon
  field: Field
  threshold: SurvivalThreshold
  rollIndex: number
  rightIsDefender: boolean
}

export class OptimalSpreadFinder {
  constructor(private survivalChecker: SurvivalChecker = new SurvivalChecker()) {}

  findOptimal(defender: Pokemon, physicalAttackers: Pokemon[], specialAttackers: Pokemon[], doublePair: [Pokemon, Pokemon] | null, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): Stats | null {
    if (physicalAttackers.length === 0 && specialAttackers.length === 0 && !doublePair) {
      return null
    }

    const ctx: SpreadContext = { tempDefender: defender.clone(), field, threshold, rollIndex, rightIsDefender }
    const evIntervals = EV_INTERVALS

    let best: (Stats & { totalEvs: number }) | null = null

    for (const hpEv of evIntervals) {
      if (best && hpEv > best.totalEvs) break

      const minDefIndex = this.findMinStatIndexForSingles(physicalAttackers, hpEv, "def", ctx)
      if (minDefIndex === -1) continue

      const minSpdIndex = this.findMinStatIndexForSingles(specialAttackers, hpEv, "spd", ctx)
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

        const spdForDoubleIndex = this.findMinSpdIndexForDouble(doublePair, hpEv, defEv, minSpdIndex, ctx)
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

  private findMinStatIndexForSingles(attackers: Pokemon[], hpEv: number, stat: "def" | "spd", ctx: SpreadContext): number {
    if (attackers.length === 0) {
      return 0
    }

    return minIndexSurviving(0, statEv => {
      ctx.tempDefender.setEvs({ hp: hpEv, atk: 0, def: stat === "def" ? statEv : 0, spa: 0, spd: stat === "spd" ? statEv : 0, spe: 0 })

      return attackers.every(attacker => this.survivalChecker.checkSurvival(attacker, ctx.tempDefender, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender))
    })
  }

  private findMinSpdIndexForDouble(doublePair: [Pokemon, Pokemon], hpEv: number, defEv: number, minSpdIndex: number, ctx: SpreadContext): number {
    return minIndexSurviving(minSpdIndex, spdEv => {
      ctx.tempDefender.setEvs({ hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0 })

      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(doublePair[0], doublePair[1], ctx.tempDefender, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender)
    })
  }

  private polish(solution: Stats, physicalAttackers: Pokemon[], specialAttackers: Pokemon[], doublePair: [Pokemon, Pokemon] | null, ctx: SpreadContext): Stats {
    const survivesAll = (evs: Stats): boolean => {
      ctx.tempDefender.setEvs({ hp: evs.hp, atk: 0, def: evs.def, spa: 0, spd: evs.spd, spe: 0 })

      const singlesSurvive = [...physicalAttackers, ...specialAttackers].every(attacker => this.survivalChecker.checkSurvival(attacker, ctx.tempDefender, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender))

      if (!singlesSurvive) {
        return false
      }

      if (doublePair) {
        return this.survivalChecker.checkSurvivalAgainstTwoAttackers(doublePair[0], doublePair[1], ctx.tempDefender, ctx.field, ctx.threshold, ctx.rollIndex, ctx.rightIsDefender)
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
