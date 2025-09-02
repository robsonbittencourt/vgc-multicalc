import { SETDEX_SV } from "@data/movesets"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Ability } from "@lib/model/ability"
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

function toPokemon(key: string): Pokemon {
  return new Pokemon(key, {
    ability: new Ability(SETDEX_SV[key].ability),
    nature: SETDEX_SV[key].nature,
    item: SETDEX_SV[key].items[0],
    teraType: SETDEX_SV[key].teraType,
    evs: SETDEX_SV[key].evs,
    moveSet: new MoveSet(SETDEX_SV[key].moves[0], SETDEX_SV[key].moves[1], SETDEX_SV[key].moves[2], SETDEX_SV[key].moves[3])
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
  I: ["Mew", "Jirachi", "Deoxys", "Phione", "Manaphy", "Darkrai", "Shaymin", "Arceus", "Keldeo", "Meloetta", "Diancie", "Hoopa", "Hoopa", "Volcanion", "Magearna", "Zarude", "Pecharunt"],
  J: []
}
