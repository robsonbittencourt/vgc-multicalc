import { getBerryResistType } from "@calc/model/items"
import { ItemName } from "@data/types"
import { calculateDamage } from "@calc/engine/calculate"
import { checkMultihitBoost } from "@calc/engine/pre-damage-effects"
import { HitContext } from "@calc/engine/hit-damage"

export function computeParentalBondChildDamage(ctx: HitContext, typeEffectiveness: number): number[] {
  const { attacker, defender, move, field, description } = ctx

  const child = attacker.clone()
  checkMultihitBoost(child, defender, move, field, description)

  const berryWasConsumed = getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.hasType("Normal")) && !field.isUnnerve
  const defenderForChild = berryWasConsumed ? defender.clone() : defender
  if (berryWasConsumed) defenderForChild.item = "" as ItemName

  const childMove = move.clone()
  childMove.isParentalBondChild = true

  const childDamage = calculateDamage(child, defenderForChild, childMove, field).damage as number[]
  description.attackerAbility = attacker.ability

  return childDamage
}
