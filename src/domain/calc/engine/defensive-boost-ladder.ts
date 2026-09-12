import { abilityBlocksMove, rawTypeEffectiveness } from "@calc/engine/guards"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

export type DefensiveBoosts = { def: number; spd: number; whiteHerbUsed: boolean }

export function initialDefensiveBoosts(defender: Pokemon): DefensiveBoosts {
  return { def: defender.boosts.def, spd: defender.boosts.spd, whiteHerbUsed: false }
}

export function blocksDefensiveDrop(defender: Pokemon): boolean {
  return defender.hasAbility("Clear Body", "White Smoke", "Full Metal Body", "Shield Dust") || defender.hasItem("Clear Amulet", "Covert Cloak")
}

export function landsTargetDefensiveDrop(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): boolean {
  if (move.targetDefensiveDrop === undefined || blocksDefensiveDrop(defender)) return false

  const typeEffectiveness = rawTypeEffectiveness(attacker, defender, move, field)

  if (typeEffectiveness === 0) return false

  return !abilityBlocksMove(defender, move, field, typeEffectiveness)
}

export function hasProgressiveDefensiveBoosts(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): boolean {
  return defender.hasAbility("Stamina") || landsTargetDefensiveDrop(attacker, defender, move, field)
}

export function defensiveDropStages(defender: Pokemon, stages: number): number {
  return stages * (defender.hasAbility("Simple") ? 2 : 1)
}

export function nextDefensiveBoosts(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, boosts: DefensiveBoosts): DefensiveBoosts {
  const next = { ...boosts }

  if (defender.hasAbility("Stamina")) {
    next.def = Math.min(next.def + 1, 6)
  }

  const drop = move.targetDefensiveDrop

  if (!drop || !landsTargetDefensiveDrop(attacker, defender, move, field)) return next

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
