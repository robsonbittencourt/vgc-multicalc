import { getAbilityData, AbilityName } from "@data/ability-data"
import { POKEMON_DATA } from "@data/pokemon-data"
import { topUsageByRegulation } from "@data/top-usage-regulation"
import { Pokemon } from "@multicalc/model/pokemon"
import { PokemonType } from "@multicalc/types"

export interface PokemonDetail {
  name: string
  types: PokemonType[]
  abilities: AbilityName[]
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

export function pokemonTableData(allowAllPokes: boolean): PokemonTableGroup[] {
  const topUsageOrder = topUsageByRegulation["MB"]
  const availableNames = new Set(topUsageOrder)

  const allPokemon = Object.values(POKEMON_DATA)
    .filter(p => allowAllPokes || availableNames.has(p.name))
    .map(p => toPokemonDetail(p))

  const groupedData = groupByGroup(allPokemon)

  for (const groupName of Object.keys(groupedData)) {
    groupedData[groupName].sort((a, b) => compareByTopUsage(a, b, topUsageOrder))
  }

  return GROUP_ORDER.map(groupName => ({ group: groupName, data: groupedData[groupName] })).filter(group => group.data !== undefined)
}

function toPokemonDetail(p: (typeof POKEMON_DATA)[keyof typeof POKEMON_DATA]): PokemonDetail {
  const pokemon = new Pokemon(p.name)

  const abilities: AbilityName[] = (p.abilities ?? []).map(ability => {
    const abilityDetail = getAbilityData(ability)

    if (!abilityDetail) {
      console.error(`Missing ability "${ability}" for pokemon "${p.name}"`)

      return "Unknown" as AbilityName
    }

    return abilityDetail.name as AbilityName
  })

  return {
    name: pokemon.name,
    types: [pokemon.type1, pokemon.type2] as PokemonType[],
    abilities,
    hp: pokemon.baseHp,
    atk: pokemon.baseAtk,
    def: pokemon.baseDef,
    spa: pokemon.baseSpa,
    spd: pokemon.baseSpd,
    spe: pokemon.baseSpe,
    bst: pokemon.bst,
    group: p.group ?? "Regular"
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
  if (indexA === -1) return 1
  if (indexB === -1) return -1

  return indexA - indexB
}
