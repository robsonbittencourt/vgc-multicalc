import { checkForecast, checkInfiltrator, checkIntimidate, checkItem, checkRawStatChanges } from "@calc/engine/pre-damage-effects"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { computeFinalStats } from "@calc/engine/stats"

export interface Combatants {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
}

export function prepareCombatants(originalAttacker: Pokemon, originalDefender: Pokemon, originalMove: Move, originalField: Field): Combatants {
  const attacker = originalAttacker.clone()
  const defender = originalDefender.clone()
  const move = originalMove.clone()
  const field = originalField.clone()

  checkForecast(attacker, field.weather)
  checkForecast(defender, field.weather)
  checkItem(attacker, field.isMagicRoom)
  checkItem(defender, field.isMagicRoom)
  checkRawStatChanges(attacker, field.attackerSide.isPowerTrick, field.isWonderRoom)
  checkRawStatChanges(defender, field.defenderSide.isPowerTrick, field.isWonderRoom)

  computeFinalStats(attacker, defender, field, "def", "spd", "spe")

  checkIntimidate(attacker, defender)
  checkIntimidate(defender, attacker)

  if (move.named("Meteor Beam", "Electro Shot")) {
    attacker.boosts.spa += attacker.hasAbility("Contrary") ? -1 : 1
    attacker.boosts.spa = Math.min(6, Math.max(-6, attacker.boosts.spa))
  }

  computeFinalStats(attacker, defender, field, "atk", "spa")

  checkInfiltrator(attacker, field.defenderSide)
  checkInfiltrator(defender, field.attackerSide)

  return { attacker, defender, move, field }
}
