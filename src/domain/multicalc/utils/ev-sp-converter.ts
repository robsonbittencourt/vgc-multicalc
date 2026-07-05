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
