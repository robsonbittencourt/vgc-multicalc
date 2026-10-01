import { buildSharedTeam, declaredTera, MAX_NAME_LENGTH, SharedTeam, SharedTeamOptions } from "@store/paste/shared-team"
import { InvalidSpsError, parsePokepasteText, UnknownPokemonError } from "@store/user-data/pokepaste-import"

const MAX_TEAM_MEMBERS = 6
const LINK_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.[a-z]{2,}\b/i

export type PasteTextOptions = Omit<SharedTeamOptions, "withTera">

export class InvalidPasteTextError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidPasteTextError"
  }
}

export async function buildSharedTeamFromText(name: string, text: string, options: PasteTextOptions): Promise<SharedTeam> {
  if (name.trim().length > MAX_NAME_LENGTH) throw new InvalidPasteTextError(`The team name has more than ${MAX_NAME_LENGTH} characters.`)
  if (LINK_PATTERN.test(name)) throw new InvalidPasteTextError("The team name cannot have links.")

  const pokemon = await parsePokemon(text, options.useSpsMode)

  if (pokemon.length === 0) throw new InvalidPasteTextError("Add at least one Pokémon in the Showdown format.")
  if (pokemon.length > MAX_TEAM_MEMBERS) throw new InvalidPasteTextError(`A paste has at most ${MAX_TEAM_MEMBERS} Pokémon.`)

  return buildSharedTeam(name, pokemon, { ...options, withTera: declaredTera(text) })
}

async function parsePokemon(text: string, useSpsMode: boolean) {
  try {
    const { pokemon } = await parsePokepasteText(text, useSpsMode)

    return pokemon
  } catch (error) {
    if (error instanceof InvalidSpsError) throw new InvalidPasteTextError(`Invalid ${useSpsMode ? "SPs" : "EVs"}. Check the spreads and the SP/EV option.`)
    if (error instanceof UnknownPokemonError) throw new InvalidPasteTextError(`${unknownPokemonList(error)}. Check the names.`)

    throw error
  }
}

export function unknownPokemonList(error: UnknownPokemonError): string {
  return `Unknown Pokémon: ${error.species.map(species => species.trim() || "(no name)").join(", ")}`
}
