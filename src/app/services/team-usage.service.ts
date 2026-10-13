import { isPlatformBrowser } from "@angular/common"
import { inject, Injectable, PLATFORM_ID } from "@angular/core"
import { CommunityTeamUse } from "@multicalc/community-teams"

const USE_EVENT_URL = "/api/events/use.json"
const MOST_VIEWED_URL = "/api/teams/most-viewed.json"
const USES_KEY = "communityTeamUses"

type RecordedUses = {
  day: string
  pastes: string[]
}

@Injectable({ providedIn: "root" })
export class TeamUsageService {
  private platformId = inject(PLATFORM_ID)

  recordUse(pasteId: string) {
    if (!isPlatformBrowser(this.platformId)) return

    const today = new Date().toISOString().slice(0, 10)
    const recorded = this.recordedUses()
    const pastes = recorded.day === today ? recorded.pastes : []

    if (pastes.includes(pasteId)) return

    this.saveUses({ day: today, pastes: [...pastes, pasteId] })
    fetch(`${USE_EVENT_URL}?paste=${encodeURIComponent(pasteId)}`, { cache: "no-store", keepalive: true }).catch(() => undefined)
  }

  private recordedUses(): RecordedUses {
    try {
      const recorded = JSON.parse(localStorage.getItem(USES_KEY) ?? "null")

      return typeof recorded?.day === "string" && Array.isArray(recorded.pastes) ? recorded : { day: "", pastes: [] }
    } catch {
      return { day: "", pastes: [] }
    }
  }

  private saveUses(uses: RecordedUses) {
    try {
      localStorage.setItem(USES_KEY, JSON.stringify(uses))
    } catch {
      return
    }
  }

  async mostViewed(): Promise<CommunityTeamUse[]> {
    try {
      const response = await fetch(MOST_VIEWED_URL)

      if (!response.ok) return []

      const uses = await response.json()

      return Array.isArray(uses) ? uses : []
    } catch {
      return []
    }
  }
}
