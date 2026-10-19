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
const OFFICIAL_EVENT = /\b(worlds?|international|regional|global challenge)\b/
const VR_CHALLENGE = /\bvr \w+ challenge\b/
const EVENT_TIERS = { official: 0, vrChallenge: 1, other: 2 }
const DIVISION = /\((seniors?|juniors?)\)/
const DIVISION_ORDER: Record<string, number> = { senior: 1, seniors: 1, junior: 2, juniors: 2 }
const DIVISION_SUFFIX = /\s*\((seniors?|juniors?)\)\s*$/i

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

export function matchesSearch(team: CommunityTeamSummary, query: string): boolean {
  const text = searchable(query)

  return [team.description, team.player, team.handle ?? "", team.event ?? ""].some(field => searchable(field).includes(text))
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
  return uniqueEvents(teams, team => eventKey(team.event!))
}

export function recentCommunityTeamEvents(teams: CommunityTeamSummary[], limit: number): string[] {
  return uniqueEvents(teams, eventGroup).slice(0, limit)
}

function uniqueEvents(teams: CommunityTeamSummary[], key: (team: CommunityTeamSummary) => string): string[] {
  const events = new Map<string, string>()

  teams.forEach(team => {
    if (team.event && !events.has(key(team))) events.set(key(team), team.event.trim())
  })

  return [...events.values()]
}

export function mergeCommunityTeams(vgcPastesTeams: CommunityTeamSummary[], submittedTeams: SubmittedTeam[]): CommunityTeamSummary[] {
  const teams = [...vgcPastesTeams, ...submittedTeams]
  const eventDates = eventDays(teams)

  return teams.sort(
    (first, second) =>
      eventWeight(first) - eventWeight(second) ||
      eventDates.get(eventGroup(second))!.localeCompare(eventDates.get(eventGroup(first))!) ||
      eventTier(first) - eventTier(second) ||
      eventGroup(first).localeCompare(eventGroup(second)) ||
      divisionWeight(first) - divisionWeight(second) ||
      sortRank(first) - sortRank(second) ||
      Number(isSubmittedTeam(first)) - Number(isSubmittedTeam(second)) ||
      second.date.localeCompare(first.date)
  )
}

function eventDays(teams: CommunityTeamSummary[]): Map<string, string> {
  const counts = new Map<string, Map<string, number>>()

  teams.forEach(team => {
    const days = counts.get(eventGroup(team)) ?? new Map<string, number>()
    const day = team.date.slice(0, 10)

    days.set(day, (days.get(day) ?? 0) + 1)
    counts.set(eventGroup(team), days)
  })

  return new Map([...counts].map(([group, days]) => [group, [...days].sort(([dayA, countA], [dayB, countB]) => countB - countA || dayB.localeCompare(dayA))[0][0]]))
}

function eventWeight(team: CommunityTeamSummary): number {
  return eventTier(team) === EVENT_TIERS.other ? 1 : 0
}

function eventTier(team: CommunityTeamSummary): number {
  const event = searchable(team.event ?? "")

  if (OFFICIAL_EVENT.test(event)) return EVENT_TIERS.official
  if (VR_CHALLENGE.test(event)) return EVENT_TIERS.vrChallenge

  return EVENT_TIERS.other
}

function eventGroup(team: CommunityTeamSummary): string {
  const event = eventKey((team.event ?? "").replace(DIVISION_SUFFIX, ""))

  return event ? `event:${event}` : `team:${team.id}`
}

function sortRank(team: CommunityTeamSummary): number {
  return placementRank(team.placement) ?? Infinity
}

function divisionWeight(team: CommunityTeamSummary): number {
  const division = searchable([team.event, team.placement].join(" ")).match(DIVISION)?.[1]

  return division ? DIVISION_ORDER[division] : 0
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
