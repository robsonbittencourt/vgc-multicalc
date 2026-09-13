import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonIds } from "./pokemon-ids"
import { Stats } from "@multicalc/types"
import { MAX_SPS, MAX_SPS_PER_STAT } from "@multicalc/utils"
import { DefensiveStat, SurvivalContext, Threat } from "./threat"

const SP_VALUES: readonly number[] = Object.freeze(Array.from({ length: MAX_SPS_PER_STAT + 1 }, (_, sp) => sp))

type Candidate = Stats & { totalSps: number }

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
    budget = MAX_SPS
  ) {
    this.probe = defender.clone()
    this.scansLinearly = defender.item.includes("Berry")
    this.budget = Math.max(0, Math.min(budget, MAX_SPS))
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

    for (const hpSp of SP_VALUES) {
      if (hpSp > this.budget) break
      if (best && hpSp > best.totalSps) break

      const minDefSp = this.minSpFor(defOnly, hpSp, "def", 0)
      if (minDefSp === -1) continue

      const minSpdSp = this.minSpFor(spdOnly, hpSp, "spd", 0)
      if (minSpdSp === -1) continue

      if (coupled.length === 0) {
        const totalSps = hpSp + minDefSp + minSpdSp
        const candidate = { hp: hpSp, atk: 0, def: minDefSp, spa: 0, spd: minSpdSp, spe: 0, totalSps }

        if (totalSps <= this.budget && this.survivesAll(threats, candidate)) {
          best = this.pickBest(best, candidate)
        }

        continue
      }

      for (let defSp = minDefSp; defSp <= MAX_SPS_PER_STAT; defSp++) {
        if (hpSp + defSp + minSpdSp > this.budget) break
        if (best && hpSp + defSp + minSpdSp > best.totalSps) break

        const spdBudget = (best ? best.totalSps : this.budget) - hpSp - defSp
        const spdSp = this.minCoupledSpdSp(coupled, hpSp, defSp, minSpdSp, spdBudget)
        if (spdSp === -1) continue

        const totalSps = hpSp + defSp + spdSp
        const candidate = { hp: hpSp, atk: 0, def: defSp, spa: 0, spd: spdSp, spe: 0, totalSps }

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

  private minSpFor(threats: Threat[], hpSp: number, stat: DefensiveStat, fromSp: number): number {
    if (threats.length === 0) {
      return fromSp
    }

    return this.minSpSurviving(fromSp, Math.min(MAX_SPS_PER_STAT, this.budget - hpSp), statSp => {
      this.applySps(hpSp, stat === "def" ? statSp : 0, stat === "spd" ? statSp : 0)

      return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
    })
  }

  private minCoupledSpdSp(threats: Threat[], hpSp: number, defSp: number, fromSp: number, maxSp: number): number {
    const highSp = this.highestSpWithin(fromSp, maxSp)

    if (this.certainlyKOedAt(threats, hpSp, defSp, highSp)) {
      return -1
    }

    return this.minSpSurviving(fromSp, maxSp, spdSp => {
      this.applySps(hpSp, defSp, spdSp)

      return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
    })
  }

  private certainlyKOedAt(threats: Threat[], hpSp: number, defSp: number, spdSp: number): boolean {
    this.applySps(hpSp, defSp, spdSp)

    return threats.some(threat => threat.certainlyKOs(this.probe, this.ctx))
  }

  private highestSpWithin(fromSp: number, maxSp: number): number {
    let highSp = MAX_SPS_PER_STAT

    while (highSp >= fromSp && highSp > maxSp) {
      highSp--
    }

    return highSp
  }

  private minSpSurviving(fromSp: number, maxSp: number, survivesAt: (sp: number) => boolean): number {
    const highSp = this.highestSpWithin(fromSp, maxSp)

    if (this.scansLinearly) {
      for (let sp = fromSp; sp <= highSp; sp++) {
        if (survivesAt(sp)) return sp
      }

      return -1
    }

    if (!survivesAt(highSp)) {
      return -1
    }

    let low = fromSp
    let high = highSp
    let result = -1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      if (survivesAt(mid)) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  private pickBest(current: Candidate | null, candidate: Candidate): Candidate {
    if (!current || candidate.totalSps < current.totalSps || (candidate.totalSps === current.totalSps && candidate.hp > current.hp)) {
      return candidate
    }

    return current
  }

  bestAgainst(threat: Threat, current: BestEffortSpread | null): BestEffortSpread {
    if (this.koChanceLowerBoundAt(threat, MAX_SPS_PER_STAT, MAX_SPS_PER_STAT, MAX_SPS_PER_STAT) === 1) {
      return current && current.koChance <= 1 ? current : this.zeroSpread(1)
    }

    const defValues = this.valuesFor(threat, "def")
    const spdValues = [...this.valuesFor(threat, "spd")].reverse()

    let best = this.rankedFrom(current)

    for (const hp of SP_VALUES) {
      if (hp > this.budget) break
      if (this.cannotBeat(this.koChanceLowerBoundAt(threat, hp, this.highestWithin(this.budget - hp), this.highestWithin(this.budget - hp)), hp, best)) continue

      for (const def of defValues) {
        if (hp + def > this.budget) break
        if (this.cannotBeat(this.koChanceLowerBoundAt(threat, hp, def, this.highestWithin(this.budget - hp - def)), hp + def, best)) continue

        for (const spd of spdValues) {
          const totalSps = hp + def + spd

          if (totalSps > this.budget) continue

          this.applySps(hp, def, spd)

          const koChance = threat.koChanceAgainst(this.probe, this.ctx)

          if (this.ranksAbove(koChance, totalSps, hp, best)) {
            best = { hp, atk: 0, def, spa: 0, spd, spe: 0, totalSps, koChance }
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

    return { ...current.spread, totalSps: hp + def + spd, koChance: current.koChance }
  }

  private zeroSpread(koChance: number): BestEffortSpread {
    return { spread: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, koChance }
  }

  private koChanceLowerBoundAt(threat: Threat, hp: number, def: number, spd: number): number {
    this.applySps(hp, def, spd)

    if (!this.scansLinearly || !threat.partner) {
      return threat.koChanceAgainst(this.probe, this.ctx)
    }

    return threat.koChanceLowerBoundAgainst(this.probe, this.ctx)
  }

  private highestWithin(room: number): number {
    return this.highestSpWithin(0, Math.min(MAX_SPS_PER_STAT, room))
  }

  private cannotBeat(lowerBound: number, minimumSps: number, best: RankedCandidate | null): boolean {
    if (!best) return false

    return lowerBound > best.koChance || (lowerBound >= best.koChance && minimumSps > best.totalSps)
  }

  private valuesFor(threat: Threat, stat: DefensiveStat): readonly number[] {
    return threat.dependsOn(stat) ? SP_VALUES : [0]
  }

  private ranksAbove(koChance: number, totalSps: number, hp: number, best: RankedCandidate | null): boolean {
    if (!best) return true
    if (koChance !== best.koChance) return koChance < best.koChance
    if (totalSps !== best.totalSps) return totalSps < best.totalSps

    return hp > best.hp
  }

  survivesAll(threats: Threat[], spread: Stats): boolean {
    this.applySps(spread.hp, spread.def, spread.spd)

    return threats.every(threat => threat.survivedBy(this.probe, this.ctx))
  }

  private applySps(hp: number, def: number, spd: number): void {
    this.probe.setSps({ hp, atk: 0, def, spa: 0, spd, spe: 0 })
  }
}
