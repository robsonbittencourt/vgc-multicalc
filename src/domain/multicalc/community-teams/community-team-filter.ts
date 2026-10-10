import { CommunityTeamSpecies, CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { getBaseName } from "@multicalc/model"

export type CommunityTeamPlacement = "all" | "top8" | "winners"

export type CommunityTeamFilter = {
  team: string
  creator: string
  event?: string
  placement: CommunityTeamPlacement
  withReplicaCode: boolean
  withSps: boolean
  pokemon: string[]
}

const TOP_PLACEMENT = 8
const WORD_SEPARATORS = [" ", "_", "-", "."]
const NAMED_PLACEMENTS: Record<string, number> = { champion: 1, "runner up": 2 }

export function filterCommunityTeams(teams: CommunityTeamSummary[], filter: CommunityTeamFilter): CommunityTeamSummary[] {
  const team = searchable(filter.team)
  const creator = searchable(filter.creator).replace(/^@/, "")

  return teams.filter(
    candidate =>
      searchable(candidate.description).includes(team) &&
      (startsAnyWord(candidate.player, creator) || startsAnyWord(candidate.handle, creator)) &&
      (!filter.event || candidate.event === filter.event) &&
      matchesPlacement(candidate.placement, filter.placement) &&
      (!filter.withReplicaCode || !!candidate.replicaCode) &&
      (!filter.withSps || candidate.hasSps) &&
      filter.pokemon.every(name => candidate.members.some(member => isPokemon(member, name)))
  )
}

function searchable(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
}

function isPokemon(member: CommunityTeamSpecies, name: string): boolean {
  return member.name === name || getBaseName(member.name) === name
}

function startsAnyWord(text: string, query: string): boolean {
  const words = searchable(text)

  return !query || words.startsWith(query) || WORD_SEPARATORS.some(separator => words.includes(`${separator}${query}`))
}

function matchesPlacement(placement: string | undefined, filter: CommunityTeamPlacement): boolean {
  if (filter === "all") return true

  const rank = placementRank(placement)

  if (rank === undefined) return false

  return filter === "winners" ? rank === 1 : rank <= TOP_PLACEMENT
}

export function placementRank(placement: string | undefined): number | undefined {
  const text = searchable(placement ?? "")
    .replace(/\(.*\)/, "")
    .trim()

  if (NAMED_PLACEMENTS[text]) return NAMED_PLACEMENTS[text]

  const match = text.match(/^(?:top )?(\d+)(?:st|nd|rd|th)?$/)

  return match ? Number(match[1]) : undefined
}

export function communityTeamEvents(teams: CommunityTeamSummary[]): string[] {
  return [...new Set(teams.map(team => team.event).filter((event): event is string => !!event))]
}

export function communityTeamPokemon(teams: CommunityTeamSummary[]): string[] {
  const uses = new Map<string, number>()

  teams.forEach(team => new Set(team.members.map(member => member.name)).forEach(name => uses.set(name, (uses.get(name) ?? 0) + 1)))

  return [...uses.entries()].sort(([nameA, usesA], [nameB, usesB]) => usesB - usesA || nameA.localeCompare(nameB)).map(([name]) => name)
}
