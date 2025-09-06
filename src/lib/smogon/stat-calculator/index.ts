import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { OffensiveStatCalculator } from "./modified-atk-spa"

export function getFinalAttack(attacker: Pokemon, move: Move, field: Field): number {
  return new OffensiveStatCalculator().getFinalAttack(attacker, move, field)
}

export function getFinalSpecialAttack(attacker: Pokemon, move: Move, field: Field): number {
  return new OffensiveStatCalculator().getFinalSpecialAttack(attacker, move, field)
}
