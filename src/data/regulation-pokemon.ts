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
  F: [
    "Mewtwo",
    "Mew",
    "Lugia",
    "Ho-Oh",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Dialga",
    "Dialga",
    "Palkia",
    "Palkia",
    "Giratina",
    "Giratina",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Reshiram",
    "Zekrom",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Greninja",
    "Diancie",
    "Hoopa",
    "Hoopa",
    "Volcanion",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Necrozma",
    "Magearna",
    "Zacian",
    "Zacian",
    "Zamazenta",
    "Zamazenta",
    "Eternatus",
    "Zarude",
    "Calyrex",
    "Calyrex",
    "Calyrex",
    "Koraidon",
    "Miraidon",
    "Terapagos",
    "Pecharunt"
  ],
  H: [
    "Articuno",
    "Zapdos",
    "Moltres",
    "Mewtwo",
    "Mew",
    "Raikou",
    "Entei",
    "Suicune",
    "Lugia",
    "Ho-Oh",
    "Regirock",
    "Regice",
    "Registeel",
    "Latias",
    "Latios",
    "Kyogre",
    "Groudon",
    "Rayquaza",
    "Jirachi",
    "Deoxys",
    "Uxie",
    "Mesprit",
    "Azelf",
    "Dialga",
    "Palkia",
    "Heatran",
    "Regigigas",
    "Giratina",
    "Cresselia",
    "Phione",
    "Manaphy",
    "Darkrai",
    "Shaymin",
    "Arceus",
    "Cobalion",
    "Terrakion",
    "Virizion",
    "Tornadus",
    "Thundurus",
    "Reshiram",
    "Zekrom",
    "Landorus",
    "Kyurem",
    "Keldeo",
    "Meloetta",
    "Diancie",
    "Hoopa",
    "Volcanion",
    "Cosmog",
    "Cosmoem",
    "Solgaleo",
    "Lunala",
    "Necrozma",
    "Magearna",
    "Zacian",
    "Zamazenta",
    "Eternatus",
    "Kubfu",
    "Urshifu",
    "Zarude",
    "Regieleki",
    "Regidrago",
    "Glastrier",
    "Spectrier",
    "Calyrex",
    "Enamorus",
    "Great Tusk",
    "Scream Tail",
    "Brute Bonnet",
    "Flutter Mane",
    "Slither Wing",
    "Sandy Shocks",
    "Iron Treads",
    "Iron Bundle",
    "Iron Hands",
    "Iron Jugulis",
    "Iron Moth",
    "Iron Thorns",
    "Wo-Chien",
    "Chien-Pao",
    "Ting-Lu",
    "Chi-Yu",
    "Roaring Moon",
    "Iron Valiant",
    "Koraidon",
    "Miraidon",
    "Walking Wake",
    "Iron Leaves",
    "Okidogi",
    "Munkidori",
    "Fezandipiti",
    "Ogerpon",
    "Gouging Fire",
    "Raging Bolt",
    "Iron Boulder",
    "Iron Crown",
    "Terapagos",
    "Pecharunt"
  ],
  J: []
}
