import { SETDEX_SV } from "@data/movesets"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Regulation } from "@lib/types"

export function pokemonByRegulation(regulation: Regulation, quantity?: number): Pokemon[] {
  return Object.keys(SETDEX_SV)
    .map(toPokemon)
    .filter(pokemon => filterBannedByRegulation(pokemon, regulation))
    .sort((a, b) => sortByRegulationOrder(a, b, regulation))
    .slice(0, quantity)
}

export function toPokemon(key: string): Pokemon {
  const poke = SETDEX_SV[key]

  return new Pokemon(key, {
    ability: new Ability(poke.ability),
    nature: poke.nature,
    item: poke.items[0],
    teraType: poke.teraType,
    evs: poke.evs,
    moveSet: new MoveSet(new Move(poke.moves[0]), new Move(poke.moves[1]), new Move(poke.moves[2]), new Move(poke.moves[3]))
  })
}

function filterBannedByRegulation(pokemon: Pokemon, regulation: Regulation): boolean {
  return !bannedByRegulation[regulation].includes(pokemon.displayNameWithoutSuffix)
}

function sortByRegulationOrder(pokemonA: Pokemon, pokemonB: Pokemon, regulation: Regulation): number {
  const order = topUsageByRegulation[regulation]
  const indexA = order.indexOf(pokemonA.name)
  const indexB = order.indexOf(pokemonB.name)

  const safeIndexA = indexA === -1 ? Infinity : indexA
  const safeIndexB = indexB === -1 ? Infinity : indexB

  return safeIndexA - safeIndexB
}

const bannedByRegulation: Record<Regulation, string[]> = {
  I: ["Mew", "Jirachi", "Deoxys", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Keldeo", "Meloetta", "Diancie", "Hoopa", "Hoopa", "Volcanion", "Magearna", "Zarude", "Pecharunt"]
}
