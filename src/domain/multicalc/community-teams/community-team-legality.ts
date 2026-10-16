import { toID } from "@data/id"
import { getPokemonData } from "@data/pokemon-data"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { getBaseName, getMegaFormName, isMegaStoneCompatible } from "@multicalc/model"

export type CommunityTeamSet = {
  species: string
  item?: string
  ability?: string
  nature?: string
  moves: string[]
}

const TEAM_SIZE = 6
const MAX_MOVES = 4
const NO_ITEM = "none"
const SPECIES_ALIASES: Record<string, string> = { aegislash: "Aegislash-Shield" }
const DISTINCT_SPECIES = ["porygonz"]

export function teamLegalityError(sets: CommunityTeamSet[]): string | undefined {
  if (sets.length !== TEAM_SIZE) return `A team has ${TEAM_SIZE} Pokémon.`

  const repeatedSpecies = firstRepeated(sets.map(set => baseSpecies(set.species)))

  if (repeatedSpecies) return `${displayName(repeatedSpecies)} is repeated. A team has one of each Pokémon.`

  const repeatedItem = firstRepeated(sets.map(set => set.item).filter((item): item is string => !!item && toID(item) !== NO_ITEM))

  if (repeatedItem) return `${repeatedItem} is repeated. A team has one of each item.`

  return sets.map(setLegalityError).find(error => error !== undefined)
}

function setLegalityError(set: CommunityTeamSet): string | undefined {
  const name = displayName(set.species)
  const moves = set.moves.filter(move => move.trim() !== "")
  const learnset = getPokemonMoveset(speciesKey(set.species))!.learnset!.map(toID)
  const requiredMoves = Math.min(MAX_MOVES, learnset.length)

  if (!set.nature) return `${name}: add the nature.`
  if (set.ability && !abilities(set).includes(toID(set.ability))) return `${name}: ${set.ability} is not one of its abilities.`
  if (moves.length < requiredMoves) return `${name}: add ${requiredMoves} moves.`

  const repeatedMove = firstRepeated(moves)

  if (repeatedMove) return `${name}: ${repeatedMove} is repeated.`

  const unlearned = moves.find(move => !learnset.includes(toID(move)))

  if (unlearned) return `${name}: ${unlearned} is not learned.`

  return undefined
}

function abilities(set: CommunityTeamSet): string[] {
  const species = displayName(set.species)
  const megaForm = set.item && isMegaStoneCompatible(species, set.item) ? [getMegaFormName(species, set.item)] : []

  return [species, getBaseName(species), ...megaForm].flatMap(name => getPokemonData(speciesKey(name))!.abilities!).map(toID)
}

function baseSpecies(species: string): string {
  const name = getBaseName(displayName(species))

  if (DISTINCT_SPECIES.includes(toID(name))) return toID(name)

  const parts = name.split("-")
  const prefix = parts.map((_, index) => parts.slice(0, index + 1).join("-")).find(candidate => getPokemonData(candidate))

  return toID(prefix!)
}

function displayName(species: string): string {
  return getPokemonData(speciesKey(species))!.name
}

function speciesKey(species: string): string {
  return SPECIES_ALIASES[toID(species)] ?? species
}

function firstRepeated(values: string[]): string | undefined {
  const seen = new Set<string>()

  return values.find(value => {
    const id = toID(value)

    if (seen.has(id)) return true

    seen.add(id)

    return false
  })
}
