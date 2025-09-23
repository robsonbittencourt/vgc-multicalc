import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { chainMods, getModifiedStat, OF16, pokeRound } from "@lib/smogon/commom"
import { Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import { abilityStrategies } from "./ability/offensive-ability-strategy"
import { itemStrategies } from "./item/offensive-item-strategy"

export function getFinalAttack(attacker: Pokemon, move: Move, field: Field, isAttacker = false): number {
  return calculateOffensiveStat(true, attacker, move, field, isAttacker)
}

export function getFinalSpecialAttack(attacker: Pokemon, move: Move, field: Field, isAttacker = false): number {
  return calculateOffensiveStat(false, attacker, move, field, isAttacker)
}

function calculateOffensiveStat(isAttack: boolean, attacker: Pokemon, move: Move, field: Field, isAttacker: boolean): number {
  let statValue: number
  const attackStat = isAttack ? "atk" : "spa"
  const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
  const causedCriticalHit = isAttacker ? field.attackerSide.isCriticalHit : field.defenderSide.isCriticalHit

  if (attacker.boosts[attackStat] === 0 || (causedCriticalHit && attacker.boosts[attackStat]! < 0)) {
    statValue = attacker.rawStats[attackStat]!
  } else {
    statValue = getModifiedStat(attacker.rawStats[attackStat]!, attacker.boosts[attackStat]!)
  }

  if (attacker.hasAbility("Hustle") && isAttack) {
    statValue = pokeRound((statValue * 3) / 2)
  }

  const modifiers = calculateModifiers(isAttack, attacker, moveSmogon, field)
  statValue = calculateStatValueWithModifiers(statValue, modifiers)

  return statValue
}

function calculateModifiers(isAttack: boolean, attacker: Pokemon, moveSmogon: MoveSmogon, field: Field): number[] {
  let modifiers: number[] = []

  if (!(field.isNeutralizingGas && !attacker.hasItem("Ability Shield"))) {
    modifiers = modifiers.concat(abilityStrategies.filter(s => s.shouldApply(isAttack, attacker, moveSmogon, field)).map(s => s.getModifier()))
  }

  modifiers = modifiers.concat(itemStrategies.filter(s => s.shouldApply(isAttack, attacker)).map(s => s.getModifier()))

  return modifiers
}

function calculateStatValueWithModifiers(statValue: number, modifiers: number[]) {
  return OF16(Math.max(1, pokeRound((statValue * chainMods(modifiers, 410, 131072)) / 4096)))
}
