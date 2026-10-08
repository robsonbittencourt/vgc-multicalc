import { landsTargetDefensiveDrop, readsDefensiveStage } from "@calc/engine/defensive-boost-ladder"
import { clampBoost } from "@calc/engine/math"
import { Field } from "@calc/model/field"
import { Move, SelfStatChange } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

export function effectiveSelfStatChange(attacker: Pokemon, move: Move): SelfStatChange | undefined {
  const change = move.selfStatChange

  if (change?.fromSecondary && attacker.hasAbility("Sheer Force")) return undefined

  return change
}

export function initialSelfBoost(attacker: Pokemon, move: Move): number {
  return attacker.boosts[move.selfStatChange?.stat ?? "atk"]
}

export function nextSelfBoost(attacker: Pokemon, change: SelfStatChange, boost: number): number {
  const stages = change.stages * (attacker.hasAbility("Simple") ? 2 : 1) * (attacker.hasAbility("Contrary") ? -1 : 1)

  return clampBoost(boost + stages)
}

export function statsChangeBetweenUses(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): boolean {
  const drop = move.targetDefensiveDrop

  if (drop && landsTargetDefensiveDrop(attacker, defender, move, field) && readsDefensiveStage(attacker, move, drop.stat)) return true

  return effectiveSelfStatChange(attacker, move) !== undefined && !defender.hasAbility("Unaware")
}
