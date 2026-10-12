import { CommunityTeamSpecies, CommunityTeamSummary, SubmittedTeam } from "@data/community-teams/community-team-data"
import { getBaseName } from "@multicalc/model"

export type CommunityTeamPlacement = "all" | "top8" | "winners"

export type CommunityTeamOrigin = "all" | "vgcpastes" | "community"

export type CommunityTeamUse = {
  pasteId: string
  uses: number
}

export type CommunityTeamFilter = {
  team: string
  creator: string
  origin: CommunityTeamOrigin
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
      (startsAnyWord(candidate.player, creator) || startsAnyWord(candidate.handle ?? "", creator)) &&
      matchesOrigin(candidate, filter.origin) &&
      (!filter.event || eventKey(candidate.event ?? "") === eventKey(filter.event)) &&
      matchesPlacement(candidate.placement, filter.placement) &&
      (!filter.withReplicaCode || !!candidate.replicaCode) &&
      (!filter.withSps || candidate.hasSps) &&
      filter.pokemon.every(name => candidate.members.some(member => isPokemon(member, name)))
  )
}

export function isSubmittedTeam(team: CommunityTeamSummary): team is SubmittedTeam {
  return team.source === "community"
}

function matchesOrigin(team: CommunityTeamSummary, origin: CommunityTeamOrigin): boolean {
  if (origin === "all") return true

  return isSubmittedTeam(team) === (origin === "community")
}

function eventKey(event: string): string {
  return searchable(event).replace(/\s+/g, " ")
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
  const events = new Map<string, string>()

  teams.forEach(team => {
    if (team.event && !events.has(eventKey(team.event))) events.set(eventKey(team.event), team.event.trim())
  })

  return [...events.values()]
}

export function mergeCommunityTeams(vgcPastesTeams: CommunityTeamSummary[], submittedTeams: SubmittedTeam[]): CommunityTeamSummary[] {
  return [...vgcPastesTeams, ...[...submittedTeams].sort((first, second) => second.date.localeCompare(first.date))]
}

export function communityTeamPokemon(teams: CommunityTeamSummary[]): string[] {
  const uses = new Map<string, number>()

  teams.forEach(team => new Set(team.members.map(member => member.name)).forEach(name => uses.set(name, (uses.get(name) ?? 0) + 1)))

  return [...uses.entries()].sort(([nameA, usesA], [nameB, usesB]) => usesB - usesA || nameA.localeCompare(nameB)).map(([name]) => name)
}

export function mostUsedTeams(uses: CommunityTeamUse[], teams: CommunityTeamSummary[], limit: number): CommunityTeamSummary[] {
  const byPaste = new Map(teams.map(team => [team.pasteId, team]))

  return uses
    .map(use => byPaste.get(use.pasteId))
    .filter((team): team is CommunityTeamSummary => !!team)
    .slice(0, limit)
}
