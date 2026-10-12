import { CommunityTeamSpecies, SubmittedTeam } from "@data/community-teams/community-team-data"

export type CommunityTeamSubmissionFields = {
  name: string
  player: string
  handle: string
  event: string
  replicaCode: string
  placement: string
}

const MAX_NAME_LENGTH = 60
const MAX_PLAYER_LENGTH = 40
const MAX_EVENT_LENGTH = 60
const HANDLE_PATTERN = /^[A-Za-z0-9_]{1,15}$/
const REPLICA_CODE_PATTERN = /^[A-Z0-9]{10}$/
const PLACEMENT_PATTERN = /^(champion|runner up|(top )?\d{1,4}(st|nd|rd|th)?)( \([a-z ]{1,20}\))?$/i

export const PLACEMENT_SUGGESTIONS = ["Champion", "Runner Up", "Top 4", "Top 8", "Top 16", "Top 32", "Top 64"]
const LINK_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.[a-z]{2,}\b/i

export type SubmittedTeamDraft = {
  pasteId: string
  regulation: string
  date: string
  name: string
  player: string
  handle?: string
  event?: string
  replicaCode?: string
  placement?: string
  showdown: string
  members: CommunityTeamSpecies[]
}

export function normalizeHandle(handle: string): string {
  return handle.trim().replace(/^@/, "")
}

export function normalizeReplicaCode(replicaCode: string): string {
  return replicaCode.replace(/\s/g, "").toUpperCase()
}

export function submissionError(fields: CommunityTeamSubmissionFields): string | undefined {
  const handle = normalizeHandle(fields.handle)
  const replicaCode = normalizeReplicaCode(fields.replicaCode)

  if (!fields.name.trim()) return "Add the team name."
  if (fields.name.trim().length > MAX_NAME_LENGTH) return `The team name has more than ${MAX_NAME_LENGTH} characters.`
  if (!fields.player.trim()) return "Add the creator."
  if (fields.player.trim().length > MAX_PLAYER_LENGTH) return `The creator has more than ${MAX_PLAYER_LENGTH} characters.`
  if (handle && !HANDLE_PATTERN.test(handle)) return "The Twitter handle has up to 15 letters, numbers or underscores."
  if (fields.event.trim().length > MAX_EVENT_LENGTH) return `The event has more than ${MAX_EVENT_LENGTH} characters.`
  if (replicaCode && !REPLICA_CODE_PATTERN.test(replicaCode)) return "The replica code has 10 letters and numbers."
  if (fields.placement.trim() && !PLACEMENT_PATTERN.test(fields.placement.trim())) return "Use a placement like Champion, Runner Up, Top 8 or 5th."
  if ([fields.name, fields.player, fields.event].some(text => LINK_PATTERN.test(text))) return "Links are not allowed."

  return undefined
}

export function submittedTeam(draft: SubmittedTeamDraft): SubmittedTeam {
  const team: SubmittedTeam = {
    id: draft.pasteId,
    pasteId: draft.pasteId,
    description: draft.name,
    player: draft.player,
    regulation: draft.regulation,
    date: draft.date,
    hasSps: /^\s*EVs:/im.test(draft.showdown),
    members: draft.members,
    source: "community"
  }

  if (draft.handle) team.handle = draft.handle
  if (draft.event) team.event = draft.event
  if (draft.replicaCode) team.replicaCode = draft.replicaCode
  if (draft.placement) team.placement = draft.placement

  return team
}
