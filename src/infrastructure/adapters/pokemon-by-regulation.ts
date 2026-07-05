import { MOVESETS } from "@data/moveset-data"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Ability } from "@multicalc/model/ability"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Regulation } from "@multicalc/types"
import { spToEv } from "@multicalc/utils/ev-sp-converter"

export function pokemonByRegulation(regulation: Regulation, quantity?: number, setdex: Record<string, any> = MOVESETS, includeAllPokemon = false): Pokemon[] {
  const regulationList = topUsageByRegulation[regulation]

  let result = Object.keys(setdex)
    .map(key => toPokemon(key, setdex))
    .filter(pokemon => filterBannedByRegulation(pokemon, regulation))

  if (!includeAllPokemon) {
    result = result.filter(pokemon => (regulationList ?? []).includes(pokemon.name)).sort((a, b) => sortByRegulationOrder(a, b, regulation))
  } else {
    result = result.sort((a, b) => a.displayNameWithoutSuffix.localeCompare(b.displayNameWithoutSuffix))
  }

  return result.slice(0, quantity)
}

export function toPokemon(key: string, setdex: Record<string, any> = MOVESETS): Pokemon {
  const poke = setdex[key]
  const evs = { hp: spToEv(poke.evs.hp), atk: spToEv(poke.evs.atk), def: spToEv(poke.evs.def), spa: spToEv(poke.evs.spa), spd: spToEv(poke.evs.spd), spe: spToEv(poke.evs.spe) }

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
  return !(bannedByRegulation[regulation] ?? []).includes(pokemon.displayNameWithoutSuffix)
}

function sortByRegulationOrder(pokemonA: Pokemon, pokemonB: Pokemon, regulation: Regulation): number {
  const indexA = (topUsageByRegulation[regulation] ?? []).indexOf(pokemonA.name)
  const indexB = (topUsageByRegulation[regulation] ?? []).indexOf(pokemonB.name)

  const safeIndexA = indexA === -1 ? Infinity : indexA
  const safeIndexB = indexB === -1 ? Infinity : indexB

  return safeIndexA - safeIndexB
}

const bannedByRegulation: Partial<Record<Regulation, string[]>> = {}
