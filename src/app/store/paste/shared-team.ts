import { getMoveset } from "@data/moveset-data"
import { Ability, getBaseName, getMegaFormName, isMega, isMegaStoneCompatible, Pokemon } from "@multicalc/model"
import { toPokepasteText } from "@store/user-data/pokepaste-export"
import { parseShowdownText } from "@store/user-data/showdown-text-parser"

export type SharedTeam = {
  kind: "team"
  version: 1
  name?: string
  useSpsMode: boolean
  createdAt?: string
  showdown: string
}

export type SharedTeamOptions = {
  useSpsMode: boolean
  withTera: boolean[]
  includePoints: boolean
}

export const MAX_NAME_LENGTH = 60

export async function buildSharedTeam(teamName: string, pokemon: Pokemon[], options: SharedTeamOptions): Promise<SharedTeam> {
  const showdown = await teamShowdownText(pokemon, options.useSpsMode, options.withTera, options.includePoints)
  const name = teamName.trim()
  const sharedTeam: SharedTeam = { kind: "team", version: 1, useSpsMode: options.useSpsMode, showdown }

  if (name) sharedTeam.name = name

  return sharedTeam
}

export async function teamShowdownText(pokemon: Pokemon[], useSpsMode: boolean, withTera: boolean[], includePoints = true): Promise<string> {
  const sets = await Promise.all(pokemon.map((p, index) => toPokepasteText(baseForm(p), useSpsMode, withTera[index], includePoints)))

  return sets.join("\n")
}

export function declaredTera(showdown: string): boolean[] {
  return parseShowdownText(showdown).pokemon.map(set => set.teraType !== undefined)
}

export function pasteTeamName(team: SharedTeam): string {
  return team.name || "Pokémon team"
}

export function isSharedTeam(value: unknown): value is SharedTeam {
  if (!value || typeof value !== "object") return false

  const team = value as Record<string, unknown>

  const name = team["name"]
  const validName = name === undefined || (typeof name === "string" && name.length <= MAX_NAME_LENGTH)

  return team["kind"] === "team" && team["version"] === 1 && typeof team["useSpsMode"] === "boolean" && typeof team["showdown"] === "string" && validName
}

export function baseForm(pokemon: Pokemon): Pokemon {
  if (!isMega(pokemon.name)) return pokemon

  const name = getBaseName(pokemon.name)

  return pokemon.clone({ name, ability: new Ability(pokemon.baseFormAbility ?? getMoveset(name)!.ability) })
}

export function megaForm(pokemon: Pokemon): Pokemon | undefined {
  if (!isMegaStoneCompatible(pokemon.name, pokemon.item)) return undefined

  const name = getMegaFormName(pokemon.name, pokemon.item)

  return pokemon.clone({ name, ability: new Ability(getMoveset(name)!.ability) })
}
