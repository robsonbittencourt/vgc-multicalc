import { Stats } from "@multicalc/types"

export function evToSp(ev: number): number {
  if (ev < 4) return 0
  return Math.floor((ev - 4) / 8) + 1
}

export function spToEv(sp: number): number {
  if (sp === 0) return 0
  return (sp - 1) * 8 + 4
}

export const MAX_SPS = 66

export const MAX_SPS_PER_STAT = 32

export function totalSps(sps: Partial<Stats>): number {
  const stats: (keyof Stats)[] = ["hp", "atk", "def", "spa", "spd", "spe"]

  return stats.reduce((sum, stat) => sum + (sps[stat] ?? 0), 0)
}

export function remainingSps(sps: Partial<Stats>): number {
  return MAX_SPS - totalSps(sps)
}

export function maxSpForStat(sps: Partial<Stats>, stat: keyof Stats): number {
  const spsWithoutStat = totalSps(sps) - (sps[stat] ?? 0)

  return Math.min(MAX_SPS - spsWithoutStat, MAX_SPS_PER_STAT)
}

export function spsExceedMax(sps: Partial<Stats>, stat: keyof Stats, newSp: number): boolean {
  return totalSps({ ...sps, [stat]: newSp }) > MAX_SPS
}

export function clampSpToRemaining(sps: Partial<Stats>, stat: keyof Stats, newSp: number): number {
  const withinStatCap = Math.min(newSp, MAX_SPS_PER_STAT)

  if (!spsExceedMax(sps, stat, withinStatCap)) return withinStatCap

  return maxSpForStat(sps, stat)
}

export function spsToEvs(sps: Partial<Stats>): Stats {
  return { hp: spToEv(sps.hp ?? 0), atk: spToEv(sps.atk ?? 0), def: spToEv(sps.def ?? 0), spa: spToEv(sps.spa ?? 0), spd: spToEv(sps.spd ?? 0), spe: spToEv(sps.spe ?? 0) }
}

export function evsToSps(evs: Partial<Stats>): Stats {
  return { hp: evToSp(evs.hp ?? 0), atk: evToSp(evs.atk ?? 0), def: evToSp(evs.def ?? 0), spa: evToSp(evs.spa ?? 0), spd: evToSp(evs.spd ?? 0), spe: evToSp(evs.spe ?? 0) }
}
