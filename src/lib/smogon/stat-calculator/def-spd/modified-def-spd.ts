import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import Commom from "../../commom"
import { abilityStrategies } from "./ability/defensive-ability-strategy"
import { itemStrategies } from "./item/defensive-item-strategy"

export function getFinalDefense(pokemon: Pokemon, field: Field): number {
  return calculateDefensiveStat(true, pokemon, field)
}

export function getFinalSpecialDefense(pokemon: Pokemon, field: Field): number {
  return calculateDefensiveStat(false, pokemon, field)
}

const commom = new Commom()

function calculateDefensiveStat(isDefense: boolean, pokemon: Pokemon, field: Field) {
  let statValue: number

  const defenseStat = isDefense ? "def" : "spd"
  const boosts = pokemon.boosts[field.isWonderRoom ? (isDefense ? "spd" : "def") : defenseStat]!

  if (boosts === 0 || (field.defenderSide.isCriticalHit && boosts > 0)) {
    statValue = pokemon.rawStats[defenseStat]!
  } else {
    statValue = commom.getModifiedStat(pokemon.rawStats[defenseStat]!, boosts)
  }

  if (field.weather == "Sand" && pokemon.hasType("Rock") && !isDefense) {
    statValue = commom.pokeRound((statValue * 3) / 2)
  }
  if (field.weather == "Snow" && pokemon.hasType("Ice") && isDefense) {
    statValue = commom.pokeRound((statValue * 3) / 2)
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
  const commom = new Commom()
  return commom.OF16(Math.max(1, commom.pokeRound((statValue * commom.chainMods(modifiers, 410, 131072)) / 4096)))
}
