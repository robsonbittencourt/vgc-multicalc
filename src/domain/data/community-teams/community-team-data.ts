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

export type CommunityTeamSummary = {
  id: string
  description: string
  player: string
  handle: string
  regulation: string
  event?: string
  placement?: string
  date: string
  replicaCode?: string
  pasteId: string
  hasSps: boolean
  setsBlock: number
  members: CommunityTeamSpecies[]
}

export type CommunityTeamSets = Record<string, CommunityTeamSet[]>

export type CommunityTeamsRegulation = {
  id: string
  teams: () => Promise<CommunityTeamSummary[]>
  setsBlocks: (() => Promise<CommunityTeamSets>)[]
}
