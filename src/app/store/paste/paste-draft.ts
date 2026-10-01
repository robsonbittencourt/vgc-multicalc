import { Pokemon } from "@multicalc/model"
import { teamShowdownText } from "@store/paste/shared-team"

export type PasteDraft = {
  source: string
  name: string
  showdown: string
  useSpsMode: boolean
}

export async function buildPasteDraft(teamName: string, pokemon: Pokemon[], useSpsMode: boolean, includeTeraType: boolean): Promise<PasteDraft> {
  return {
    source: teamName,
    name: teamName,
    showdown: await teamShowdownText(
      pokemon,
      useSpsMode,
      pokemon.map(() => includeTeraType)
    ),
    useSpsMode
  }
}

export function isPasteDraft(value: unknown): value is PasteDraft {
  if (!value || typeof value !== "object") return false

  const draft = value as Record<string, unknown>

  return typeof draft["source"] === "string" && typeof draft["name"] === "string" && typeof draft["showdown"] === "string" && typeof draft["useSpsMode"] === "boolean"
}
