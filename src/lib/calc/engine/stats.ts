import { EV_ITEMS } from "@lib/calc/model/items"
import { chainMods, getModifiedStat, overflow32, pokeRound } from "@lib/calc/engine/math"
import { Field, Side } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { RawDesc, StatID } from "@lib/calc/model/types"

export function isGrounded(pokemon: Pokemon, field: Field): boolean {
  return field.isGravity || pokemon.hasItem("Iron Ball") || (!pokemon.hasType("Flying") && !pokemon.hasAbility("Levitate", "Eelevate") && !pokemon.hasItem("Air Balloon"))
}

export function computeFinalStats(attacker: Pokemon, defender: Pokemon, field: Field, ...stats: StatID[]): void {
  const sides: [Pokemon, Side][] = [
    [attacker, field.attackerSide],
    [defender, field.defenderSide]
  ]

  for (const [pokemon, side] of sides) {
    for (const stat of stats) {
      if (stat === "spe") {
        pokemon.stats.spe = getFinalSpeed(pokemon, field, side)
      } else {
        pokemon.stats[stat] = getModifiedStat(pokemon.rawStats[stat], pokemon.boosts[stat])
      }
    }
  }
}

export function getFinalSpeed(pokemon: Pokemon, field: Field, side: Side): number {
  const weather = field.weather || ""
  const terrain = field.terrain
  let speed = getModifiedStat(pokemon.rawStats.spe, pokemon.boosts.spe)
  const speedMods: number[] = []

  if (side.isTailwind) {
    speedMods.push(8192)
  }

  if (
    (pokemon.hasAbility("Unburden") && pokemon.abilityOn) ||
    (pokemon.hasAbility("Chlorophyll") && weather.includes("Sun")) ||
    (pokemon.hasAbility("Sand Rush") && weather === "Sand") ||
    (pokemon.hasAbility("Swift Swim") && weather.includes("Rain")) ||
    (pokemon.hasAbility("Slush Rush") && ["Hail", "Snow"].includes(weather)) ||
    (pokemon.hasAbility("Surge Surfer") && terrain === "Electric")
  ) {
    speedMods.push(8192)
  } else if (pokemon.hasAbility("Quick Feet") && pokemon.status) {
    speedMods.push(6144)
  } else if (pokemon.hasAbility("Slow Start") && pokemon.abilityOn) {
    speedMods.push(2048)
  } else if (isQPActive(pokemon, field) && getQPBoostedStat(pokemon) === "spe") {
    speedMods.push(6144)
  }

  if (!(pokemon.hasAbility("Unburden") && pokemon.abilityOn)) {
    if (pokemon.hasItem("Choice Scarf")) {
      speedMods.push(6144)
    } else if (pokemon.hasItem("Iron Ball", ...EV_ITEMS)) {
      speedMods.push(2048)
    } else if (pokemon.hasItem("Quick Powder") && pokemon.named("Ditto")) {
      speedMods.push(8192)
    }
  }

  speed = overflow32(pokeRound((speed * chainMods(speedMods, 410, 131172)) / 4096))

  if (pokemon.hasStatus("par") && !pokemon.hasAbility("Quick Feet")) {
    speed = Math.floor(overflow32(speed * 50) / 100)
  }

  speed = Math.min(10000, speed)

  return Math.max(0, speed)
}

export function getQPBoostedStat(pokemon: Pokemon): StatID {
  if (pokemon.boostedStat && pokemon.boostedStat !== "auto") {
    return pokemon.boostedStat
  }

  let bestStat: StatID = "atk"

  for (const stat of ["def", "spa", "spd", "spe"] as StatID[]) {
    if (getModifiedStat(pokemon.rawStats[stat], pokemon.boosts[stat]) > getModifiedStat(pokemon.rawStats[bestStat], pokemon.boosts[bestStat])) {
      bestStat = stat
    }
  }

  return bestStat
}

export function isQPActive(pokemon: Pokemon, field: Field): boolean {
  if (!pokemon.boostedStat) {
    return false
  }

  const weather = field.weather || ""
  const terrain = field.terrain

  return (
    (pokemon.hasAbility("Protosynthesis") && (weather.includes("Sun") || pokemon.hasItem("Booster Energy"))) || (pokemon.hasAbility("Quark Drive") && (terrain === "Electric" || pokemon.hasItem("Booster Energy"))) || pokemon.boostedStat !== "auto"
  )
}

export function getStabMod(pokemon: Pokemon, move: Move, description: RawDesc): number {
  let stabMod = 4096

  if (pokemon.hasOriginalType(move.type)) {
    stabMod += 2048
  } else if (pokemon.hasAbility("Protean", "Libero") && !pokemon.teraType) {
    stabMod += 2048
    description.attackerAbility = pokemon.ability
  }

  const teraType = pokemon.teraType

  if (teraType === move.type && teraType !== "Stellar") {
    stabMod += 2048
    description.attackerTera = teraType
  }

  if (pokemon.hasAbility("Adaptability") && pokemon.hasType(move.type)) {
    stabMod += teraType && pokemon.hasOriginalType(teraType) ? 1024 : 2048
    description.attackerAbility = pokemon.ability
  }

  return stabMod
}

export function countBoosts(boosts: Pokemon["boosts"]): number {
  let sum = 0

  for (const stat of ["atk", "def", "spa", "spd", "spe"] as StatID[]) {
    const boost = boosts[stat]

    if (boost && boost > 0) {
      sum += boost
    }
  }

  return sum
}

export function getWeight(pokemon: Pokemon, description: RawDesc, role: "defender" | "attacker"): number {
  let weightHG = pokemon.weightKg * 10
  const abilityFactor = pokemon.hasAbility("Heavy Metal") ? 2 : pokemon.hasAbility("Light Metal") ? 0.5 : 1

  if (abilityFactor !== 1) {
    weightHG = Math.max(Math.trunc(weightHG * abilityFactor), 1)
    description[`${role}Ability`] = pokemon.ability
  }

  if (pokemon.hasItem("Float Stone")) {
    weightHG = Math.max(Math.trunc(weightHG * 0.5), 1)
    description[`${role}Item`] = pokemon.item
  }

  return weightHG / 10
}
