import { CommunityTeamOrigin, CommunityTeamPlacement } from "@multicalc/community-teams/community-team-filter"

export type CommunityTeamListState = {
  regulation: string
  team: string
  creator: string
  search: string
  origin: CommunityTeamOrigin
  event: string
  placement: CommunityTeamPlacement
  withReplicaCode: boolean
  withSps: boolean
  pokemon: string[]
}

export type CommunityTeamListParams = Record<string, string | null>

const ORIGINS: CommunityTeamOrigin[] = ["all", "vgcpastes", "community"]
const PLACEMENTS: CommunityTeamPlacement[] = ["all", "top8", "winners"]
const MAX_POKEMON = 6
const ENABLED = "1"

export function communityTeamListParams(state: CommunityTeamListState, currentRegulation: string): CommunityTeamListParams {
  const pokemon = state.pokemon.filter(Boolean)

  return {
    reg: state.regulation === currentRegulation ? null : state.regulation,
    team: text(state.team),
    creator: text(state.creator),
    q: text(state.search),
    source: state.origin === "all" ? null : state.origin,
    event: text(state.event),
    placement: state.placement === "all" ? null : state.placement,
    replica: state.withReplicaCode ? ENABLED : null,
    sps: state.withSps ? ENABLED : null,
    pokemon: pokemon.length ? pokemon.join(",") : null
  }
}

function text(value: string): string | null {
  return value.trim() || null
}

export function communityTeamListState(params: Record<string, string | undefined>, regulations: string[]): CommunityTeamListState {
  const pokemon = (params["pokemon"] ?? "")
    .split(",")
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, MAX_POKEMON)

  return {
    regulation: regulations.find(regulation => regulation === params["reg"]) ?? regulations[0],
    team: params["team"] ?? "",
    creator: params["creator"] ?? "",
    search: params["q"] ?? "",
    origin: ORIGINS.find(origin => origin === params["source"]) ?? "all",
    event: params["event"] ?? "",
    placement: PLACEMENTS.find(placement => placement === params["placement"]) ?? "all",
    withReplicaCode: params["replica"] === ENABLED,
    withSps: params["sps"] === ENABLED,
    pokemon: pokemon.length ? pokemon : [""]
  }
}
