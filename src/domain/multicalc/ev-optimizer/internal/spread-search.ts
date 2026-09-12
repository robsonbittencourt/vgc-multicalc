import { EV_INTERVALS, MAX_SINGLE_STAT_EVS, MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonIds } from "./pokemon-ids"
import { Stats } from "@multicalc/types"
import { DefensiveStat, SurvivalContext, Threat } from "./threat"

type Candidate = Stats & { totalEvs: number }

type RankedCandidate = Candidate & { koChance: number }

export type BestEffortSpread = { spread: Stats; koChance: number }

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

  bestAgainst(threat: Threat, current: BestEffortSpread | null): BestEffortSpread {
    if (this.koChanceLowerBoundAt(threat, MAX_SINGLE_STAT_EVS, MAX_SINGLE_STAT_EVS, MAX_SINGLE_STAT_EVS) === 1) {
      return current && current.koChance <= 1 ? current : this.zeroSpread(1)
    }

    const defValues = this.valuesFor(threat, "def")
    const spdValues = [...this.valuesFor(threat, "spd")].reverse()

    let best = this.rankedFrom(current)

    for (const hp of EV_INTERVALS) {
      if (hp > this.budget) break
      if (this.cannotBeat(this.koChanceLowerBoundAt(threat, hp, this.highestWithin(this.budget - hp), this.highestWithin(this.budget - hp)), hp, best)) continue

      for (const def of defValues) {
        if (hp + def > this.budget) break
        if (this.cannotBeat(this.koChanceLowerBoundAt(threat, hp, def, this.highestWithin(this.budget - hp - def)), hp + def, best)) continue

        for (const spd of spdValues) {
          const totalEvs = hp + def + spd

          if (totalEvs > this.budget) continue

          this.applyEvs(hp, def, spd)

          const koChance = threat.koChanceAgainst(this.probe, this.ctx)

          if (this.ranksAbove(koChance, totalEvs, hp, best)) {
            best = { hp, atk: 0, def, spa: 0, spd, spe: 0, totalEvs, koChance }
          } else if (koChance > best!.koChance && (!this.scansLinearly || this.koChanceLowerBoundAt(threat, hp, def, spd) > best!.koChance)) {
            break
          }
        }
      }
    }

    const winner = best!

    return { spread: { hp: winner.hp, atk: 0, def: winner.def, spa: 0, spd: winner.spd, spe: 0 }, koChance: winner.koChance }
  }

  private rankedFrom(current: BestEffortSpread | null): RankedCandidate | null {
    if (!current) return null

    const { hp, def, spd } = current.spread

    return { ...current.spread, totalEvs: hp + def + spd, koChance: current.koChance }
  }

  private zeroSpread(koChance: number): BestEffortSpread {
    return { spread: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, koChance }
  }

  private koChanceLowerBoundAt(threat: Threat, hp: number, def: number, spd: number): number {
    this.applyEvs(hp, def, spd)

    if (!this.scansLinearly || !threat.partner) {
      return threat.koChanceAgainst(this.probe, this.ctx)
    }

    return threat.koChanceLowerBoundAgainst(this.probe, this.ctx)
  }

  private highestWithin(room: number): number {
    return EV_INTERVALS[this.highestIndexWithin(0, Math.min(MAX_SINGLE_STAT_EVS, room))]
  }

  private cannotBeat(lowerBound: number, minimumEvs: number, best: RankedCandidate | null): boolean {
    if (!best) return false

    return lowerBound > best.koChance || (lowerBound >= best.koChance && minimumEvs > best.totalEvs)
  }

  private valuesFor(threat: Threat, stat: DefensiveStat): readonly number[] {
    return threat.dependsOn(stat) ? EV_INTERVALS : [0]
  }

  private ranksAbove(koChance: number, totalEvs: number, hp: number, best: RankedCandidate | null): boolean {
    if (!best) return true
    if (koChance !== best.koChance) return koChance < best.koChance
    if (totalEvs !== best.totalEvs) return totalEvs < best.totalEvs

    return hp > best.hp
  }

  survivesAll(threats: Threat[], spread: Stats): boolean {
    this.applyEvs(spread.hp, spread.def, spread.spd)

    return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
  }

  private applyEvs(hp: number, def: number, spd: number): void {
    this.probe.setEvs({ hp, atk: 0, def, spa: 0, spd, spe: 0 })
  }
}
