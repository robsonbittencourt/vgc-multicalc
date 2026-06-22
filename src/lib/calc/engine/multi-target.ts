import { calculateDamage } from "@lib/calc/engine/calculate"
import { getBerryRecovery, getEndOfTurn } from "@lib/calc/engine/desc"
import { MultiResult } from "@lib/calc/model/multi-result"
import { Result } from "@lib/calc/model/result"
import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"

export function calculateMultiDamage(attackers: Pokemon[], defender: Pokemon, moves: Move[], originalField: Field): MultiResult {
  const results: Result[] = []
  const currentDefender = defender.clone()

  let berryConsumed = false

  for (let i = 0; i < attackers.length; i++) {
    const attacker = attackers[i]
    const move = moves[i]

    const result = calculateDamage(attacker, currentDefender, move, originalField)
    results.push(result)

    const maxDamage = getMaxDamage(result)
    const berry = getBerryRecovery(attacker, defender, move)

    const currentHP = currentDefender.currrentHp()
    const maxHP = currentDefender.maxHp()

    const consumesBerry = !berryConsumed && berry.recovery > 0 && currentHP - maxDamage <= berry.threshold

    if (consumesBerry) {
      berryConsumed = true
      currentDefender.item = undefined
      currentDefender.originalCurrrentHp = scaleHP(currentDefender.maxHp(), Math.min(maxHP, currentHP - maxDamage + berry.recovery), maxHP)
    } else {
      currentDefender.originalCurrrentHp = scaleHP(currentDefender.maxHp(), Math.max(0, currentHP - maxDamage), maxHP)
    }
  }

  const finalEot = getEndOfTurn(attackers[0], defender, moves[0], originalField)

  return new MultiResult(defender, results, finalEot)
}

function getMaxDamage(result: Result): number {
  const damage = result.damage

  if (typeof damage === "number") {
    return damage
  }

  if (Array.isArray(damage)) {
    if (damage.length > 0 && Array.isArray(damage[0])) {
      return (damage as number[][]).reduce((sum, rolls) => sum + rolls[15], 0)
    }

    return (damage as number[])[15]
  }

  return 0
}

function scaleHP(newMaxHP: number, hp: number, originalMaxHP: number): number {
  return Math.round((newMaxHP * hp) / originalMaxHP)
}
