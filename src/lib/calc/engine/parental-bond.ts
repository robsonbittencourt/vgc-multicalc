import { getBerryResistType } from "@lib/calc/model/items"
import { AbilityName, ItemName } from "@lib/calc/model/types"
import { calculateDamage } from "@lib/calc/engine/calculate"
import { checkMultihitBoost } from "@lib/calc/engine/pre-damage-effects"
import { HitContext } from "@lib/calc/engine/hit-damage"

export function computeParentalBondChildDamage(ctx: HitContext, typeEffectiveness: number): number[] {
  const { attacker, defender, move, field, description } = ctx

  const child = attacker.clone()
  child.ability = "Parental Bond (Child)" as AbilityName
  checkMultihitBoost(child, defender, move, field, description)

  const berryWasConsumed = getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.hasType("Normal")) && !field.isUnnerve && !attacker.hasAbility("Unnerve", "As One (Glastrier)", "As One (Spectrier)")
  const defenderForChild = berryWasConsumed ? defender.clone() : defender
  if (berryWasConsumed) defenderForChild.item = "" as ItemName

  const childDamage = calculateDamage(child, defenderForChild, move, field).damage as number[]
  description.attackerAbility = attacker.ability

  return childDamage
}
