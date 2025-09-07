import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { chainMods, getModifiedStat, OF16, pokeRound } from "@lib/smogon/commom"
import { abilityStrategies } from "./ability/defensive-ability-strategy"
import { itemStrategies } from "./item/defensive-item-strategy"

export function getFinalDefense(pokemon: Pokemon, field: Field): number {
  return calculateDefensiveStat(true, pokemon, field)
}

export function getFinalSpecialDefense(pokemon: Pokemon, field: Field): number {
  return calculateDefensiveStat(false, pokemon, field)
}

function calculateDefensiveStat(isDefense: boolean, pokemon: Pokemon, field: Field) {
  let statValue: number

  const defenseStat = isDefense ? "def" : "spd"
  const boosts = pokemon.boosts[field.isWonderRoom ? (isDefense ? "spd" : "def") : defenseStat]!

  if (boosts === 0 || (field.defenderSide.isCriticalHit && boosts > 0)) {
    statValue = pokemon.rawStats[defenseStat]!
  } else {
    statValue = getModifiedStat(pokemon.rawStats[defenseStat]!, boosts)
  }

  if (field.weather == "Sand" && pokemon.hasType("Rock") && !isDefense) {
    statValue = pokeRound((statValue * 3) / 2)
  }
  if (field.weather == "Snow" && pokemon.hasType("Ice") && isDefense) {
    statValue = pokeRound((statValue * 3) / 2)
  }

  const modifiers = calculateModifiers(isDefense, pokemon, field)
  statValue = calculateStatValueWithModifiers(statValue, modifiers)

  return statValue
}

function calculateModifiers(isDefense: boolean, pokemon: Pokemon, field: Field): number[] {
  let modifiers: number[] = []

  if (!(field.isNeutralizingGas && !pokemon.hasItem("Ability Shield"))) {
    modifiers = modifiers.concat(abilityStrategies.filter(s => s.shouldApply(isDefense, pokemon, field)).map(s => s.getModifier()))
  }

  modifiers = modifiers.concat(itemStrategies.filter(s => s.shouldApply(isDefense, pokemon)).map(s => s.getModifier()))

  return modifiers
}

function calculateStatValueWithModifiers(statValue: number, modifiers: number[]) {
  return OF16(Math.max(1, pokeRound((statValue * chainMods(modifiers, 410, 131072)) / 4096)))
}
