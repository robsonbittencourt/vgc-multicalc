import { EV_INTERVALS, MAX_SINGLE_STAT_EVS, MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonIds } from "./pokemon-ids"
import { Stats } from "@multicalc/types"
import { DefensiveStat, SurvivalContext, Threat } from "./threat"

type Candidate = Stats & { totalEvs: number }

export class SpreadSearch {
  private readonly probe: Pokemon
  private readonly scansLinearly: boolean
  private readonly budget: number
  private readonly spreadCache = new Map<string, Stats | null>()
  private readonly threatIds = new PokemonIds()

  constructor(
    defender: Pokemon,
    private readonly ctx: SurvivalContext,
    budget = MAX_TOTAL_EVS
  ) {
    this.probe = defender.clone()
    this.scansLinearly = defender.item.includes("Berry")
    this.budget = Math.max(0, Math.min(budget, MAX_TOTAL_EVS))
  }

  minimalSpread(threats: Threat[]): Stats | null {
    if (threats.length === 0) {
      return null
    }

    const key = this.cacheKey(threats)
    const cached = this.spreadCache.get(key)

    if (cached !== undefined) {
      return cached
    }

    const spread = this.search(threats)
    this.spreadCache.set(key, spread)

    return spread
  }

  private cacheKey(threats: Threat[]): string {
    return threats
      .map(threat => `${this.idOf(threat.attacker)}${threat.partner ? `+${this.idOf(threat.partner)}` : ""}`)
      .sort()
      .join(",")
  }

  private idOf(pokemon: Pokemon): number {
    return this.threatIds.idOf(pokemon)
  }

  private search(threats: Threat[]): Stats | null {
    const spdOnly = threats.filter(threat => threat.dependsOn("spd") && !threat.dependsOn("def"))
    const coupled = threats.filter(threat => threat.isCoupled)
    const defOnly = threats.filter(threat => !threat.dependsOn("spd"))

    let best: Candidate | null = null

    for (const hpEv of EV_INTERVALS) {
      if (hpEv > this.budget) break
      if (best && hpEv > best.totalEvs) break

      const minDefIndex = this.minIndexFor(defOnly, hpEv, "def", 0)
      if (minDefIndex === -1) continue

      const minSpdIndex = this.minIndexFor(spdOnly, hpEv, "spd", 0)
      if (minSpdIndex === -1) continue

      const minSpdEv = EV_INTERVALS[minSpdIndex]

      if (coupled.length === 0) {
        const defEv = EV_INTERVALS[minDefIndex]
        const totalEvs = hpEv + defEv + minSpdEv
        const candidate = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: minSpdEv, spe: 0, totalEvs }

        if (totalEvs <= this.budget && this.survivesAll(threats, candidate)) {
          best = this.pickBest(best, candidate)
        }

        continue
      }

      for (let defIndex = minDefIndex; defIndex < EV_INTERVALS.length; defIndex++) {
        const defEv = EV_INTERVALS[defIndex]

        if (hpEv + defEv + minSpdEv > this.budget) break
        if (best && hpEv + defEv + minSpdEv > best.totalEvs) break

        const spdBudget = (best ? best.totalEvs : this.budget) - hpEv - defEv
        const spdIndex = this.minCoupledSpdIndex(coupled, hpEv, defEv, minSpdIndex, spdBudget)
        if (spdIndex === -1) continue

        const spdEv = EV_INTERVALS[spdIndex]
        const totalEvs = hpEv + defEv + spdEv
        const candidate = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }

        if (this.survivesAll(threats, candidate)) {
          best = this.pickBest(best, candidate)
        }
      }
    }

    if (!best) {
      return null
    }

    return { hp: best.hp, atk: 0, def: best.def, spa: 0, spd: best.spd, spe: 0 }
  }

  private minIndexFor(threats: Threat[], hpEv: number, stat: DefensiveStat, fromIndex: number): number {
    if (threats.length === 0) {
      return fromIndex
    }

    return this.minIndexSurviving(fromIndex, Math.min(MAX_SINGLE_STAT_EVS, this.budget - hpEv), statEv => {
      this.applyEvs(hpEv, stat === "def" ? statEv : 0, stat === "spd" ? statEv : 0)

      return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
    })
  }

  private minCoupledSpdIndex(threats: Threat[], hpEv: number, defEv: number, fromIndex: number, maxEv: number): number {
    const highIndex = this.highestIndexWithin(fromIndex, maxEv)

    if (this.certainlyKOedAt(threats, hpEv, defEv, EV_INTERVALS[highIndex])) {
      return -1
    }

    return this.minIndexSurviving(fromIndex, maxEv, spdEv => {
      this.applyEvs(hpEv, defEv, spdEv)

      return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
    })
  }

  private certainlyKOedAt(threats: Threat[], hpEv: number, defEv: number, spdEv: number): boolean {
    this.applyEvs(hpEv, defEv, spdEv)

    return threats.some(threat => threat.certainlyKOs(this.probe, this.ctx))
  }

  private highestIndexWithin(fromIndex: number, maxEv: number): number {
    let highIndex = EV_INTERVALS.length - 1

    while (highIndex >= fromIndex && EV_INTERVALS[highIndex] > maxEv) {
      highIndex--
    }

    return highIndex
  }

  private minIndexSurviving(fromIndex: number, maxEv: number, survivesAt: (ev: number) => boolean): number {
    const highIndex = this.highestIndexWithin(fromIndex, maxEv)

    if (this.scansLinearly) {
      for (let index = fromIndex; index <= highIndex; index++) {
        if (survivesAt(EV_INTERVALS[index])) return index
      }

      return -1
    }

    if (!survivesAt(EV_INTERVALS[highIndex])) {
      return -1
    }

    let low = fromIndex
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

  private pickBest(current: Candidate | null, candidate: Candidate): Candidate {
    if (!current || candidate.totalEvs < current.totalEvs || (candidate.totalEvs === current.totalEvs && candidate.hp > current.hp)) {
      return candidate
    }

    return current
  }

  survivesAll(threats: Threat[], spread: Stats): boolean {
    this.applyEvs(spread.hp, spread.def, spread.spd)

    return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
  }

  private applyEvs(hp: number, def: number, spd: number): void {
    this.probe.setEvs({ hp, atk: 0, def, spa: 0, spd, spe: 0 })
  }
}
