import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Ability } from "@multicalc/model/ability"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Regulation } from "@multicalc/types"
import { spToEv } from "@multicalc/utils"

export function pokemonByRegulation(regulation: Regulation, quantity: number | undefined, setdex: Record<string, any>, includeAllPokemon: boolean): Pokemon[] {
  const regulationList = topUsageByRegulation[regulation]

  let result = Object.keys(setdex)
    .map(key => toPokemon(key, setdex))
    .filter(pokemon => filterBannedByRegulation(pokemon, regulation))

  if (!includeAllPokemon) {
    const usageOrder = regulationList ?? []

    result = result.filter(pokemon => usageOrder.includes(pokemon.name)).sort((a, b) => sortByRegulationOrder(a, b, usageOrder))
  } else {
    result = result.sort((a, b) => a.displayNameWithoutSuffix.localeCompare(b.displayNameWithoutSuffix))
  }

  return result.slice(0, quantity)
}

export function toPokemon(key: string, setdex: Record<string, any>): Pokemon {
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

function sortByRegulationOrder(pokemonA: Pokemon, pokemonB: Pokemon, regulationList: string[]): number {
  return regulationList.indexOf(pokemonA.name) - regulationList.indexOf(pokemonB.name)
}

const bannedByRegulation: Partial<Record<Regulation, string[]>> = {}
