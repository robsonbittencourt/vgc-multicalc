import { abilityBlocksMove, rawTypeEffectiveness } from "@calc/engine/guards"
import { clampBoost } from "@calc/engine/math"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { AbilityName, Terrain, Weather } from "@data/types"

export type DefensiveBoosts = {
  def: number
  spd: number
  spe: number
  whiteHerbUsed: boolean
  revertAtTurnEnd: { def: number; spd: number }
  damaged: boolean
  itemLost: boolean
  ability?: AbilityName
  terrain?: Terrain
  weather?: Weather
}

export function initialDefensiveBoosts(defender: Pokemon): DefensiveBoosts {
  return { def: defender.boosts.def, spd: defender.boosts.spd, spe: defender.boosts.spe, whiteHerbUsed: false, revertAtTurnEnd: { def: 0, spd: 0 }, damaged: false, itemLost: false }
}

export function blocksDefensiveDrop(defender: Pokemon): boolean {
  return defender.hasAbility("Clear Body", "White Smoke", "Full Metal Body", "Shield Dust", "Mirror Armor") || defender.hasItem("Clear Amulet", "Covert Cloak")
}

export function landsTargetDefensiveDrop(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): boolean {
  if (move.targetDefensiveDrop === undefined || blocksDefensiveDrop(defender) || attacker.hasAbility("Sheer Force")) return false

  const typeEffectiveness = rawTypeEffectiveness(attacker, defender, move, field)

  if (typeEffectiveness === 0) return false

  return !abilityBlocksMove(defender, move, field, typeEffectiveness)
}

export function readsDefensiveStage(attacker: Pokemon, move: Move, stat: "def" | "spd"): boolean {
  return !attacker.hasAbility("Unaware") && (move.hitsPhysical() ? "def" : "spd") === stat
}

export function isStaminaActive(defender: Pokemon): boolean {
  return defender.hasAbility("Stamina") && defender.abilityOn
}

export function dropTargetStat(defender: Pokemon, stages: number, boost: number): number {
  const change = stages * (defender.hasAbility("Simple") ? 2 : 1)

  return clampBoost(defender.hasAbility("Contrary") ? boost + change : boost - change)
}

export function afterMoveDefensiveBoosts(defender: Pokemon, boosts: DefensiveBoosts): DefensiveBoosts {
  const lowered = boosts.def < 0 || boosts.spd < 0 || boosts.spe < 0

  if (!lowered || !defender.hasItem("White Herb") || boosts.whiteHerbUsed || boosts.itemLost) return boosts

  return {
    ...boosts,
    def: Math.max(0, boosts.def),
    spd: Math.max(0, boosts.spd),
    spe: Math.max(0, boosts.spe),
    revertAtTurnEnd: { def: boosts.def < 0 ? 0 : boosts.revertAtTurnEnd.def, spd: boosts.spd < 0 ? 0 : boosts.revertAtTurnEnd.spd },
    whiteHerbUsed: true,
    itemLost: true
  }
}

export function nextDefensiveBoosts(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, boosts: DefensiveBoosts): DefensiveBoosts {
  const next = { ...boosts, revertAtTurnEnd: { ...boosts.revertAtTurnEnd } }

  if (isStaminaActive(defender)) {
    next.def = Math.min(next.def + 1, 6)
  }

  const drop = move.targetDefensiveDrop

  if (!drop || !landsTargetDefensiveDrop(attacker, defender, move, field)) return next

  const before = next[drop.stat]

  next[drop.stat] = dropTargetStat(defender, drop.stages, before)
  next.revertAtTurnEnd[drop.stat] += next[drop.stat] - before

  return next
}

export function endTurnDefensiveBoosts(boosts: DefensiveBoosts): DefensiveBoosts {
  return {
    ...boosts,
    def: clampBoost(boosts.def - boosts.revertAtTurnEnd.def),
    spd: clampBoost(boosts.spd - boosts.revertAtTurnEnd.spd),
    revertAtTurnEnd: { def: 0, spd: 0 }
  }
}
