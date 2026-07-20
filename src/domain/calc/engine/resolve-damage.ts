import { HitContext, computeHitDamage, isSpreadMove } from "@calc/engine/hit-damage"
import { computeParentalBondChildDamage } from "@calc/engine/parental-bond"
import { computeMultiHitDamage } from "@calc/engine/multi-hit"

export function resolveDamage(hitCtx: HitContext, hasAteAbilityTypeChange: boolean, stabMod: number): number | number[] | number[][] {
  const { attacker, move, field, typeEffectiveness } = hitCtx

  const damage = computeHitDamage(hitCtx, { hit: 1, hitCount: 0, hasAteAbilityTypeChange, stabMod })

  const isSpread = isSpreadMove(move, field)

  let childDamage: number[] | undefined
  if (attacker.hasAbility("Parental Bond") && move.hits === 1 && !isSpread && !move.isParentalBondChild) {
    childDamage = computeParentalBondChildDamage(hitCtx, typeEffectiveness)
  }

  let resolved: number | number[] | number[][] = childDamage ? [damage, childDamage] : damage

  if (move.timesUsed > 1 || move.hits > 1) {
    resolved = computeMultiHitDamage(hitCtx, damage, stabMod, hasAteAbilityTypeChange)
  }

  return resolved
}
