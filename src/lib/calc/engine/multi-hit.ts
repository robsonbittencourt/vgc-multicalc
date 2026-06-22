import { getStabMod } from "@lib/calc/engine/stats"
import { checkMultihitBoost } from "@lib/calc/engine/pre-damage-effects"
import { HitContext, computeHitDamage } from "@lib/calc/engine/hit-damage"

export function computeMultiHitDamage(ctx: HitContext, firstHitDamage: number[], stabMod: number, hasAteAbilityTypeChange: boolean): number[][] {
  const { attacker, defender, move, field, description } = ctx

  const origDefBoost = description.defenseBoost
  const origAtkBoost = description.attackBoost

  const overTurns = (move.timesUsed ?? 0) > 1
  const numAttacks = overTurns ? move.timesUsed! : move.hits
  if (overTurns) description.moveTurns = `over ${move.timesUsed} turns`

  let usedItems = [false, false]
  const damageMatrix = [firstHitDamage]

  for (let times = 1; times < numAttacks; times++) {
    usedItems = checkMultihitBoost(attacker, defender, move, field, description, usedItems[0], usedItems[1])

    const ateStillActive = hasAteAbilityTypeChange && attacker.hasAbility("Aerilate", "Dragonize", "Pixilate", "Refrigerate")
    const newStabMod = overTurns ? getStabMod(attacker, move, description) : stabMod

    damageMatrix[times] = computeHitDamage(ctx, { hit: times + 1, hitCount: times, hasAteAbilityTypeChange: ateStillActive, stabMod: newStabMod })
  }

  description.defenseBoost = origDefBoost
  description.attackBoost = origAtkBoost

  return damageMatrix
}
