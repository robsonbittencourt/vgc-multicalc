import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Pokemon as SmogonPokemon, StatID } from "@robsonbittencourt/calc"
import { StatIDExceptHP } from "@robsonbittencourt/calc/src/data/interface"

export function getModifiedStat(stat: number, mod: number): number {
  const numerator = 0
  const denominator = 1
  const modernGenBoostTable = [
    [2, 8],
    [2, 7],
    [2, 6],
    [2, 5],
    [2, 4],
    [2, 3],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2]
  ]
  stat = OF16(stat * modernGenBoostTable[6 + mod][numerator])
  stat = Math.floor(stat / modernGenBoostTable[6 + mod][denominator])

  return stat
}

export function higherStat(smogonPokemon: SmogonPokemon): StatIDExceptHP {
  let bestStat: StatID = "atk"

  for (const stat of ["def", "spa", "spd", "spe"] as StatIDExceptHP[]) {
    const actual = getModifiedStat(smogonPokemon.rawStats[stat], smogonPokemon.boosts[stat])
    const best = getModifiedStat(smogonPokemon.rawStats[bestStat], smogonPokemon.boosts[bestStat])

    if (actual > best) {
      bestStat = stat
    }
  }

  return bestStat
}

export function isQPActive(pokemon: Pokemon, field: Field) {
  const weather = field.weather || ""
  const terrain = field.terrain

  return (pokemon.ability.protosynthesis && (weather.includes("Sun") || pokemon.ability.on)) || (pokemon.ability.quarkDrive && (terrain === "Electric" || pokemon.ability.on))
}

export function OF16(n: number): number {
  return n > 65535 ? n % 65536 : n
}

export function OF32(n: number) {
  return n > 4294967295 ? n % 4294967296 : n
}

export function pokeRound(num: number) {
  return Math.floor(num)
}

export function chainMods(mods: number[], lowerBound: number, upperBound: number) {
  let M = 4096

  for (const mod of mods) {
    if (mod !== 4096) {
      M = (M * mod + 2048) >> 12
    }
  }

  return Math.max(Math.min(M, upperBound), lowerBound)
}
