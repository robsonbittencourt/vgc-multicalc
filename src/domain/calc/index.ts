import { calculateDamage } from "./engine/calculate"
import { calculateMultiDamage } from "./engine/multi-target"
import { Field } from "./model/field"
import { Move } from "./model/move"
import { MultiResult } from "./model/multi-result"
import { Pokemon } from "./model/pokemon"
import { Result } from "./model/result"

export { Field, Side } from "./model/field"
export { Move } from "./model/move"
export { Pokemon } from "./model/pokemon"
export { MultiResult } from "./model/multi-result"
export { Result } from "./model/result"

export function calculate(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): Result {
  return calculateDamage(attacker, defender, move, field)
}

export function calculateMulti(attackers: Pokemon[], defender: Pokemon, moves: Move[], field: Field): MultiResult {
  return calculateMultiDamage(attackers, defender, moves, field)
}
