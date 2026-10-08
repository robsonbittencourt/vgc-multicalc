import { HitContext, computeHitDamage, isSpreadMove } from "@calc/engine/hit-damage"
import { computeParentalBondChildDamage } from "@calc/engine/parental-bond"
import { computeMultiHitDamage } from "@calc/engine/multi-hit"

export function resolveDamage(hitCtx: HitContext, hasAteAbilityTypeChange: boolean, stabMod: number, fullHpRows: (number[] | undefined)[]): number | number[] | number[][] {
  const { attacker, move, field, typeEffectiveness } = hitCtx

  const damage = computeHitDamage(hitCtx, { hit: 1, hitCount: 0, hasAteAbilityTypeChange, stabMod })

  const isSpread = isSpreadMove(move, field)

  const hitsTwice = attacker.hasAbility("Parental Bond") && move.hits === 1 && !isSpread && !move.isParentalBondChild

  if (move.timesUsed > 1 || move.hits > 1) {
    return computeMultiHitDamage(hitCtx, damage, stabMod, hasAteAbilityTypeChange, hitsTwice, fullHpRows)
  }

  return hitsTwice ? [damage, computeParentalBondChildDamage(hitCtx, typeEffectiveness)] : damage
}
