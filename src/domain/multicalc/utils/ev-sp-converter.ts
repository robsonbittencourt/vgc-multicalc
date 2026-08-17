import { Stats } from "@multicalc/types"

export function evToSp(ev: number): number {
  if (ev < 4) return 0
  return Math.floor((ev - 4) / 8) + 1
}

export function spToEv(sp: number): number {
  if (sp === 0) return 0
  return (sp - 1) * 8 + 4
}

export function totalSpsFromEvs(evs: Partial<Stats>): number {
  const stats: (keyof Stats)[] = ["hp", "atk", "def", "spa", "spd", "spe"]
  return stats.reduce((sum, stat) => sum + evToSp(evs[stat] ?? 0), 0)
}

export const MAX_SPS = 66

export const MAX_EVS_PER_STAT = 252

export function remainingSps(evs: Partial<Stats>): number {
  return MAX_SPS - totalSpsFromEvs(evs)
}

export function maxEvForStat(evs: Partial<Stats>, stat: keyof Stats): number {
  const spsWithoutStat = totalSpsFromEvs(evs) - evToSp(evs[stat] ?? 0)

  return Math.min(spToEv(MAX_SPS - spsWithoutStat), MAX_EVS_PER_STAT)
}

export function evsExceedMaxSps(evs: Partial<Stats>, stat: keyof Stats, newEv: number): boolean {
  return totalSpsFromEvs({ ...evs, [stat]: newEv }) > MAX_SPS
}

export function clampEvToRemainingSps(evs: Partial<Stats>, stat: keyof Stats, newEv: number): number {
  const withinStatCap = Math.min(newEv, MAX_EVS_PER_STAT)

  if (!evsExceedMaxSps(evs, stat, withinStatCap)) return withinStatCap

  return maxEvForStat(evs, stat)
}
