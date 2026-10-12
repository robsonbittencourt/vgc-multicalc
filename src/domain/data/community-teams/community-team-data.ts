import { StatsTable } from "@data/types"

export type CommunityTeamSpecies = {
  name: string
  item?: string
}

export type CommunityTeamSet = {
  ability?: string
  nature?: string
  sps?: StatsTable
  moves: string[]
}

export type CommunityTeamMember = CommunityTeamSpecies & Partial<CommunityTeamSet>

type CommunityTeamFields = {
  id: string
  description: string
  player: string
  regulation: string
  event?: string
  placement?: string
  date: string
  replicaCode?: string
  pasteId: string
  hasSps: boolean
  members: CommunityTeamSpecies[]
}

export type VgcPastesTeam = CommunityTeamFields & {
  source?: undefined
  handle: string
  setsBlock: number
}

export type SubmittedTeam = CommunityTeamFields & {
  source: "community"
  handle?: string
}

export type CommunityTeamSummary = VgcPastesTeam | SubmittedTeam

export type CommunityTeamSets = Record<string, CommunityTeamSet[]>

export type CommunityTeamsRegulation = {
  id: string
  teams: () => Promise<VgcPastesTeam[]>
  setsBlocks: (() => Promise<CommunityTeamSets>)[]
}
