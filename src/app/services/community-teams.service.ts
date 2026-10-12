import { isPlatformBrowser } from "@angular/common"
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core"
import { SubmittedTeam } from "@data/community-teams/community-team-data"
import { postJson, serverReason, TooManyPastesError } from "@app/services/paste.service"
import { SharedTeam } from "@store/paste/shared-team"

const TEAMS_API = "/api/teams"
const TOKENS_KEY = "communityTeamTokens"

export type TeamSubmission = SharedTeam & {
  name: string
  player: string
  handle?: string
  event?: string
  replicaCode?: string
  placement?: string
}

export class TeamSubmissionRejectedError extends Error {
  constructor(readonly reason: string) {
    super(`Team rejected: ${reason}`)
    this.name = "TeamSubmissionRejectedError"
  }
}

@Injectable({ providedIn: "root" })
export class CommunityTeamsService {
  private platformId = inject(PLATFORM_ID)

  private tokens = signal<Record<string, string>>(this.readTokens())

  async submittedTeams(regulation: string): Promise<SubmittedTeam[]> {
    try {
      const response = await fetch(`${TEAMS_API}/index/${regulation.toLowerCase()}.json`)

      if (!response.ok) return []

      const index = await response.json()

      return Array.isArray(index) ? index : []
    } catch {
      return []
    }
  }

  async submit(team: TeamSubmission): Promise<string> {
    const response = await postJson(TEAMS_API, team)

    if (response.status === 429) throw new TooManyPastesError()
    if (response.status === 400) throw new TeamSubmissionRejectedError((await response.json()).error)
    if (!response.ok) throw new Error(`Team not submitted (${response.status}${await serverReason(response)})`)

    const { pasteId, token } = await response.json()

    this.writeTokens({ ...this.tokens(), [pasteId]: token })

    return pasteId
  }

  canDelete(pasteId: string): boolean {
    return pasteId in this.tokens()
  }

  async delete(pasteId: string): Promise<void> {
    const response = await fetch(`${TEAMS_API}/${encodeURIComponent(pasteId)}`, { method: "DELETE", headers: { "x-team-token": this.tokens()[pasteId] ?? "" } })

    if (response.status === 429) throw new TooManyPastesError()
    if (!response.ok && response.status !== 404) throw new Error(`Team not removed (${response.status})`)

    this.writeTokens(Object.fromEntries(Object.entries(this.tokens()).filter(([id]) => id !== pasteId)))
  }

  private readTokens(): Record<string, string> {
    if (!isPlatformBrowser(this.platformId)) return {}

    try {
      const tokens = JSON.parse(localStorage.getItem(TOKENS_KEY) ?? "{}")

      return tokens && typeof tokens === "object" && !Array.isArray(tokens) ? tokens : {}
    } catch {
      return {}
    }
  }

  private writeTokens(tokens: Record<string, string>) {
    this.tokens.set(tokens)

    try {
      localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens))
    } catch {
      return
    }
  }
}
