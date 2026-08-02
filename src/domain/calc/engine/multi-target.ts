import { calculateDamage } from "@calc/engine/calculate"
import { getBerryRecovery, getEndOfTurn } from "@calc/engine/desc"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { getBerryResistType } from "@calc/model/items"
import { MultiResult } from "@calc/model/multi-result"
import { DEFAULT_ROLL_INDEX, Result } from "@calc/model/result"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

export function calculateMultiDamage(attacker1: Pokemon, attacker2: Pokemon, move1: Move, move2: Move, defender: Pokemon, originalField: Field): MultiResult {
  const results: Result[] = []
  const currentDefender = defender.clone()

  let berryConsumed = false

  for (const [attacker, move] of [
    [attacker1, move1],
    [attacker2, move2]
  ] as [Pokemon, Move][]) {
    const result = calculateDamage(attacker, currentDefender, move, originalField)
    results.push(result)

    if (result.rawDesc.defenderItem === currentDefender.item && getBerryResistType(currentDefender.item)) {
      currentDefender.item = undefined
    }

    const maxDamage = getMaxDamage(result)
    const berry = getBerryRecovery(attacker, defender, move)

    const currentHP = currentDefender.currentHp()
    const maxHP = currentDefender.maxHp()

    const consumesBerry = !berryConsumed && berry.recovery > 0 && currentHP - maxDamage <= berry.threshold

    if (consumesBerry) {
      berryConsumed = true
      currentDefender.item = undefined
      currentDefender.originalCurrentHp = scaleHP(currentDefender.maxHp(), Math.min(maxHP, currentHP - maxDamage + berry.recovery), maxHP)
    } else {
      currentDefender.originalCurrentHp = scaleHP(currentDefender.maxHp(), Math.max(0, currentHP - maxDamage), maxHP)
    }
  }

  const finalEot = getEndOfTurn(attacker1, defender, move1, originalField)

  return new MultiResult(defender, results, finalEot)
}

function getMaxDamage(result: Result): number {
  return new DamageDistribution(result.damage).totalAt(DEFAULT_ROLL_INDEX)
}

function scaleHP(newMaxHP: number, hp: number, originalMaxHP: number): number {
  return Math.round((newMaxHP * hp) / originalMaxHP)
}
