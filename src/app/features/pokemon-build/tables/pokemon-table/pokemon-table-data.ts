import { AVAILABLE_POKEMON } from "@configuration/available-pokemon"
import { getAbilityData } from "@data/ability-data"
import { Language, localizedName } from "@data/i18n/localized-names"
import { POKEMON_DATA } from "@data/pokemon-data"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { PokemonDataCore } from "@data/types"
import { Pokemon } from "@multicalc/model"
import { PokemonType } from "@multicalc/types"

export interface PokemonDetail {
  name: string
  label: string
  types: PokemonType[]
  abilities: string[]
  hp: number
  atk: number
  def: number
  spa: number
  spd: number
  spe: number
  bst: number
  group: string
}

export interface PokemonTableGroup {
  group: string
  data: PokemonDetail[]
}

const GROUP_ORDER = ["Meta", "Low usage", "Regular"]

export function pokemonTableData(allowAllPokes: boolean, language: Language): PokemonTableGroup[] {
  const topUsageOrder = topUsageByRegulation["MC"]
  const availableIds = new Set<string>(AVAILABLE_POKEMON)

  const allPokemon = Object.entries(POKEMON_DATA)
    .filter(([id]) => allowAllPokes || availableIds.has(id))
    .map(([, p]) => toPokemonDetail(p, language))

  const groupedData = groupByGroup(allPokemon)

  for (const groupName of Object.keys(groupedData)) {
    groupedData[groupName].sort((a, b) => compareByTopUsage(a, b, topUsageOrder))
  }

  return GROUP_ORDER.map(groupName => ({ group: groupName, data: groupedData[groupName] })).filter(group => group.data !== undefined)
}

function toPokemonDetail(p: PokemonDataCore, language: Language): PokemonDetail {
  const pokemon = new Pokemon(p.name)

  const abilities = p.abilities!.map(ability => localizedName("abilities", getAbilityData(ability)!.name, language))

  return {
    name: pokemon.name,
    label: localizedName("pokemon", pokemon.name, language),
    types: [pokemon.type1, pokemon.type2] as PokemonType[],
    abilities,
    hp: pokemon.baseHp,
    atk: pokemon.baseAtk,
    def: pokemon.baseDef,
    spa: pokemon.baseSpa,
    spd: pokemon.baseSpd,
    spe: pokemon.baseSpe,
    bst: pokemon.bst,
    group: p.group!
  }
}

function groupByGroup(pokemon: PokemonDetail[]): Record<string, PokemonDetail[]> {
  return pokemon.reduce(
    (acc, p) => {
      if (!acc[p.group]) {
        acc[p.group] = []
      }

      acc[p.group].push(p)

      return acc
    },
    {} as Record<string, PokemonDetail[]>
  )
}

function compareByTopUsage(a: PokemonDetail, b: PokemonDetail, topUsageOrder: string[]): number {
  const indexA = topUsageOrder.indexOf(a.name)
  const indexB = topUsageOrder.indexOf(b.name)

  if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name)

  return indexA - indexB
}
