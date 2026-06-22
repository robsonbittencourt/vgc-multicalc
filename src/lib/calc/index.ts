import { calculateDamage } from "./engine/calculate"
import { calculateMultiDamage } from "./engine/multi-target"
import { Field } from "./model/field"
import { Move } from "./model/move"
import { MultiResult } from "./model/multi-result"
import { Pokemon } from "./model/pokemon"
import { Result } from "./model/result"
import { TypeName } from "./model/types"
import { TYPES } from "./data/types"
export { Field, Side } from "./model/field"
export { Move } from "./model/move"
export { Pokemon } from "./model/pokemon"
export { toID } from "./engine/data-util"
export { MultiResult } from "./model/multi-result"
export { Result } from "./model/result"
export { getSpecies, getType } from "./data/stores"
export { EV_ITEMS, getBerryResistType } from "./model/items"
export type { AbilityName, ItemName, NatureName, StatID, StatIDExceptHP, StatusName, Terrain, TypeName, Weather, GameType, Gender, SpeciesName, MoveName } from "./model/types"

export const TERA_TYPES: TypeName[] = (Object.keys(Object.values(TYPES)[0].effectiveness) as TypeName[]).filter(type => type !== "???")

export function calculate(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): Result {
  return calculateDamage(attacker, defender, move, field)
}

export function calculateMulti(attackers: Pokemon[], defender: Pokemon, moves: Move[], field: Field): MultiResult {
  return calculateMultiDamage(attackers, defender, moves, field)
}
