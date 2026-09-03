import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

export type DefensiveBoosts = { def: number; spd: number; whiteHerbUsed: boolean }

export function initialDefensiveBoosts(defender: Pokemon): DefensiveBoosts {
  return { def: defender.boosts.def, spd: defender.boosts.spd, whiteHerbUsed: false }
}

export function blocksDefensiveDrop(defender: Pokemon): boolean {
  return defender.hasAbility("Clear Body", "White Smoke", "Full Metal Body", "Shield Dust") || defender.hasItem("Clear Amulet", "Covert Cloak")
}

export function hasProgressiveDefensiveBoosts(defender: Pokemon, move: Move): boolean {
  return defender.hasAbility("Stamina") || (move.targetDefensiveDrop !== undefined && !blocksDefensiveDrop(defender))
}

export function defensiveDropStages(defender: Pokemon, stages: number): number {
  return stages * (defender.hasAbility("Simple") ? 2 : 1)
}

export function nextDefensiveBoosts(defender: Pokemon, move: Move, boosts: DefensiveBoosts): DefensiveBoosts {
  const next = { ...boosts }

  if (defender.hasAbility("Stamina")) {
    next.def = Math.min(next.def + 1, 6)
  }

  const drop = move.targetDefensiveDrop

  if (!drop || blocksDefensiveDrop(defender)) return next

  if (defender.hasItem("White Herb") && !next.whiteHerbUsed && next[drop.stat] === 0) {
    next.whiteHerbUsed = true

    return next
  }

  const stages = defensiveDropStages(defender, drop.stages)

  if (defender.hasAbility("Contrary")) {
    next[drop.stat] = Math.min(next[drop.stat] + stages, 6)

    return next
  }

  next[drop.stat] = Math.max(next[drop.stat] - stages, -6)

  return next
}
