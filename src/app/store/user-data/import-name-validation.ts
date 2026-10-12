import { getAbilityData } from "@data/ability-data"
import { getItemData } from "@data/item-data"
import { getMoveData } from "@data/move-data"
import { MOVESETS } from "@data/moveset-data"
import { getNatureData } from "@data/nature-data"
import { TYPE_CHART } from "@data/type-chart-data"

export type InvalidName = { pokemon: string; field: "name" | "item" | "ability" | "nature" | "Tera type" | "move"; value: string }

export type NamedFields = { item?: string | null; ability?: string | null; nature?: string | null; teraType?: string | null; moves: (string | null)[] }

export class InvalidNamesError extends Error {
  constructor(readonly invalid: InvalidName[]) {
    super(`Unknown names — ${describeInvalidNames(invalid)}`)
    this.name = "InvalidNamesError"
  }
}

const SPECIES_NAMES = byComparableName(Object.keys(MOVESETS))
const TERA_TYPES = byComparableName([...Object.keys(TYPE_CHART), "Stellar"])

export function invalidNames(species: string, pokemonName: string, fields: NamedFields): InvalidName[] {
  const invalid: InvalidName[] = []
  const add = (field: InvalidName["field"], value: string) => invalid.push({ pokemon: species, field, value })

  if (!SPECIES_NAMES.has(comparable(pokemonName))) add("name", species)
  if (fields.item && !isExact(fields.item, getItemData(fields.item)?.name)) add("item", fields.item)
  if (fields.ability && !isExact(fields.ability, getAbilityData(fields.ability)?.name)) add("ability", fields.ability)
  if (fields.nature && !isExact(fields.nature, getNatureData(fields.nature)?.name)) add("nature", fields.nature)
  if (fields.teraType && !TERA_TYPES.has(comparable(fields.teraType))) add("Tera type", fields.teraType)

  for (const move of fields.moves) {
    if (move && !isExact(move, getMoveData(move)?.name)) add("move", move)
  }

  return invalid
}

export function canonicalNames<T extends NamedFields>(pokemonName: string, fields: T): { name: string; fields: T } {
  return {
    name: SPECIES_NAMES.get(comparable(pokemonName))!,
    fields: {
      ...fields,
      item: fields.item ? getItemData(fields.item)!.name : fields.item,
      ability: fields.ability ? getAbilityData(fields.ability)!.name : fields.ability,
      nature: fields.nature ? getNatureData(fields.nature)!.name : fields.nature,
      teraType: fields.teraType ? TERA_TYPES.get(comparable(fields.teraType)) : fields.teraType,
      moves: fields.moves.map(move => (move ? getMoveData(move)!.name : move))
    }
  }
}

function byComparableName(names: string[]): Map<string, string> {
  return new Map(names.map(name => [comparable(name), name]))
}

function isExact(value: string, knownName: string | undefined): boolean {
  return knownName !== undefined && comparable(value) === comparable(knownName)
}

function comparable(name: string): string {
  return name
    .normalize("NFC")
    .replace(/[’‘`´]/g, "'")
    .toLowerCase()
}

function describeInvalidNames(invalid: InvalidName[]): string {
  const byPokemon = new Map<string, string[]>()

  for (const { pokemon, field, value } of invalid) {
    byPokemon.set(pokemon, [...(byPokemon.get(pokemon) ?? []), `${field} "${value}"`])
  }

  return [...byPokemon.entries()].map(([pokemon, entries]) => `${pokemon}: ${entries.join(", ")}`).join("; ")
}
