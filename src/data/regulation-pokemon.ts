import { SETDEX_SV } from "@data/movesets"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Regulation } from "@lib/types"
import { spToEv } from "@lib/utils/ev-sp-converter"

export function pokemonByRegulation(regulation: Regulation, quantity?: number, setdex: Record<string, any> = SETDEX_SV, includeAllPokemon = false, isChampions = false): Pokemon[] {
  const regulationList = topUsageByRegulation[regulation]

  let result = Object.keys(setdex)
    .map(key => toPokemon(key, setdex, isChampions))
    .filter(pokemon => filterBannedByRegulation(pokemon, regulation))

  if (!includeAllPokemon) {
    result = result.filter(pokemon => regulationList.includes(pokemon.name)).sort((a, b) => sortByRegulationOrder(a, b, regulation))

    if (quantity) {
      result = filterMegaPairs(result, quantity)
      return result
    }
  } else {
    result = result.sort((a, b) => a.displayNameWithoutSuffix.localeCompare(b.displayNameWithoutSuffix))
  }

  return result.slice(0, quantity)
}

export function toPokemon(key: string, setdex: Record<string, any> = SETDEX_SV, isChampions = false): Pokemon {
  const poke = setdex[key]
  const evs = isChampions ? { hp: spToEv(poke.evs.hp), atk: spToEv(poke.evs.atk), def: spToEv(poke.evs.def), spa: spToEv(poke.evs.spa), spd: spToEv(poke.evs.spd), spe: spToEv(poke.evs.spe) } : poke.evs

  return new Pokemon(key, {
    ability: new Ability(poke.ability),
    nature: poke.nature,
    item: poke.items[0],
    teraType: poke.teraType,
    evs,
    moveSet: new MoveSet(new Move(poke.moves[0]), new Move(poke.moves[1]), new Move(poke.moves[2]), new Move(poke.moves[3]))
  })
}

function filterBannedByRegulation(pokemon: Pokemon, regulation: Regulation): boolean {
  return !bannedByRegulation[regulation].includes(pokemon.displayNameWithoutSuffix)
}

function sortByRegulationOrder(pokemonA: Pokemon, pokemonB: Pokemon, regulation: Regulation): number {
  const indexA = topUsageByRegulation[regulation].indexOf(pokemonA.name)
  const indexB = topUsageByRegulation[regulation].indexOf(pokemonB.name)

  const safeIndexA = indexA === -1 ? Infinity : indexA
  const safeIndexB = indexB === -1 ? Infinity : indexB

  return safeIndexA - safeIndexB
}

function filterMegaPairs(pokemons: Pokemon[], quantity: number): Pokemon[] {
  const result: Pokemon[] = []
  let count = 0
  let i = 0

  while (count < quantity && i < pokemons.length) {
    const current = pokemons[i]
    const next = pokemons[i + 1]

    const currentBaseName = current.name.split("-Mega")[0]
    const nextBaseName = next?.name.split("-Mega")[0] ?? null
    const currentIsMega = current.name.includes("-Mega")

    if (currentIsMega) {
      const baseVersion = pokemons.find(p => p.name === currentBaseName)
      if (baseVersion && !result.some(p => p.name === currentBaseName)) {
        result.push(baseVersion)
        count += 1
      }
    }

    if (!result.some(p => p.name === current.name)) {
      result.push(current)
      count += 1
    }

    if (next && currentBaseName === nextBaseName) {
      if (!result.some(p => p.name === next.name)) {
        result.push(next)
        count += 1
      }
      i += 2
    } else {
      i += 1
    }
  }

  return result
}

const bannedByRegulation: Record<Regulation, string[]> = {
  MA: [],
  I: ["Mew", "Jirachi", "Deoxys", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Keldeo", "Meloetta", "Diancie", "Hoopa", "Hoopa", "Volcanion", "Magearna", "Zarude", "Pecharunt"]
}
