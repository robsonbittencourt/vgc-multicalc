import type { PokemonState } from "@store/calc-store"

export function setsMatch(saved: PokemonState, current: PokemonState): boolean {
  if (saved.nature !== current.nature) return false
  if (saved.item !== current.item) return false
  if (saved.ability !== current.ability) return false
  if (saved.teraType !== current.teraType) return false

  const statKeys = ["hp", "atk", "def", "spa", "spd", "spe"] as const

  for (const key of statKeys) {
    if ((saved.evs[key] ?? 0) !== (current.evs[key] ?? 0)) return false
    if ((saved.ivs[key] ?? 31) !== (current.ivs[key] ?? 31)) return false
  }

  for (let i = 0; i < 4; i++) {
    if ((saved.moveSet[i]?.name ?? "") !== (current.moveSet[i]?.name ?? "")) return false
  }

  return true
}
