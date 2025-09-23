import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { chainMods, getModifiedStat, OF32, pokeRound } from "@lib/smogon/commom"
import { abilityStrategies } from "./ability/speed-ability-strategy"
import { itemStrategies } from "./item/speed-item-strategy"

export function getFinalSpeed(pokemon: Pokemon, field: Field, isAttacker = false): number {
  let speed = getModifiedStat(pokemon.rawStats["spe"]!, pokemon.boosts["spe"]!)

  const speedMods = calculateModifiers(pokemon, field)
  const isTailwind = isAttacker ? field.attackerSide.isTailwind : field.defenderSide.isTailwind

  if (isTailwind) {
    speedMods.push(8192)
  }

  speed = calculateStatValueWithModifiers(speed, speedMods)

  if (pokemon.status == Status.PARALYSIS && pokemon.ability.isNot("Quick Feet")) {
    speed = Math.floor(OF32(speed * 50) / 100)
  }

  speed = Math.min(10000, speed)

  return Math.max(0, speed)
}

function calculateModifiers(pokemon: Pokemon, field: Field): number[] {
  let modifiers: number[] = []

  if (!(field.isNeutralizingGas && !pokemon.hasItem("Ability Shield"))) {
    modifiers = modifiers.concat(abilityStrategies.filter(s => s.shouldApply(pokemon, field)).map(s => s.getModifier()))
  }

  modifiers = modifiers.concat(itemStrategies.filter(s => s.shouldApply(pokemon)).map(s => s.getModifier()))

  return modifiers
}

function calculateStatValueWithModifiers(speed: number, modifiers: number[]) {
  return OF32(pokeRound((speed * chainMods(modifiers, 410, 131172)) / 4096))
}
