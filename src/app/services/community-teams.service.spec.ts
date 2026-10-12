import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SubmittedTeam } from "@data/community-teams/community-team-data"
import { CommunityTeamsService, TeamSubmission, TeamSubmissionRejectedError } from "@app/services/community-teams.service"
import { TooManyPastesError } from "@app/services/paste.service"

const TOKENS_KEY = "communityTeamTokens"

const SUBMISSION: TeamSubmission = { kind: "team", version: 1, useSpsMode: true, showdown: "Pelipper @ Damp Rock", name: "Rain", player: "Eric Rios", handle: "Eric_Rios", event: "Recife Regional 2027" }

const SUBMITTED: SubmittedTeam = {
  id: "uZ5ATN1fRy",
  pasteId: "uZ5ATN1fRy",
  description: "Rain",
  player: "Eric Rios",
  regulation: "M-C",
  date: "2026-10-12T15:22:34.523Z",
  hasSps: true,
  members: [{ name: "Pelipper", item: "Damp Rock" }],
  source: "community"
}

function createService(platformId = "browser"): CommunityTeamsService {
  TestBed.configureTestingModule({ providers: [CommunityTeamsService, provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: platformId }] })

  return TestBed.inject(CommunityTeamsService)
}

describe("CommunityTeamsService", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("submittedTeams", () => {
    it("should read the index of the regulation", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => [SUBMITTED] } as Response)

      const teams = await createService().submittedTeams("M-C")

      expect(teams).toEqual([SUBMITTED])
      expect(fetchSpy).toHaveBeenCalledWith("/api/teams/index/m-c.json")
    })

    it("should answer no teams when the index is missing, malformed or unreachable", async () => {
      const service = createService()

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      const missing = await service.submittedTeams("M-C")

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({ ok: true, json: async () => ({ teams: [] }) } as Response)
      const malformed = await service.submittedTeams("M-C")

      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new TypeError("Failed to fetch"))
      const unreachable = await service.submittedTeams("M-C")

      expect([missing, malformed, unreachable]).toEqual([[], [], []])
    })
  })

  describe("submit", () => {
    it("should post the team with a stamp, keep the token and answer with the paste id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 201, json: async () => ({ pasteId: "uZ5ATN1fRy", token: "secret-token" }) } as Response)
      const service = createService()

      const pasteId = await service.submit(SUBMISSION)

      expect(pasteId).toBe("uZ5ATN1fRy")
      expect(fetchSpy).toHaveBeenCalledWith("/api/teams", expect.objectContaining({ method: "POST", body: JSON.stringify(SUBMISSION), headers: expect.objectContaining({ "x-paste-stamp": expect.stringMatching(/^\d+\.\d+$/) }) }))
      expect(service.canDelete("uZ5ATN1fRy")).toBe(true)
      expect(JSON.parse(localStorage.getItem(TOKENS_KEY)!)).toEqual({ uZ5ATN1fRy: "secret-token" })
    })

    it("should tell when too many teams are being submitted", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 429 } as Response)

      await expect(createService().submit(SUBMISSION)).rejects.toBeInstanceOf(TooManyPastesError)
    })

    it("should give the reason of a rejected team", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 400, json: async () => ({ error: "Invalid player" }) } as Response)

      const error = await createService()
        .submit(SUBMISSION)
        .catch(caught => caught)

      expect(error).toBeInstanceOf(TeamSubmissionRejectedError)
      expect(error.reason).toBe("Invalid player")
    })

    it("should fail with the status when the server cannot save the team", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 503, json: async () => ({ error: "Could not save the team" }) } as Response)

      await expect(createService().submit(SUBMISSION)).rejects.toThrow("Team not submitted (503: Could not save the team)")
    })

    it("should keep the token in memory when the browser storage refuses it", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 201, json: async () => ({ pasteId: "uZ5ATN1fRy", token: "secret-token" }) } as Response)
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new DOMException("QuotaExceededError")
      })
      const service = createService()

      await service.submit(SUBMISSION)

      expect(service.canDelete("uZ5ATN1fRy")).toBe(true)
    })
  })

  describe("tokens", () => {
    it("should read the tokens kept by an earlier visit", () => {
      localStorage.setItem(TOKENS_KEY, JSON.stringify({ uZ5ATN1fRy: "secret-token" }))

      const service = createService()

      expect(service.canDelete("uZ5ATN1fRy")).toBe(true)
      expect(service.canDelete("otherPaste")).toBe(false)
    })

    it.each([["not json"], ["[]"], ["null"]])("should ignore the stored tokens %s", stored => {
      localStorage.setItem(TOKENS_KEY, stored)

      expect(createService().canDelete("0")).toBe(false)
    })

    it("should not read the browser storage outside the browser", () => {
      localStorage.setItem(TOKENS_KEY, JSON.stringify({ uZ5ATN1fRy: "secret-token" }))

      expect(createService("server").canDelete("uZ5ATN1fRy")).toBe(false)
    })
  })

  describe("delete", () => {
    beforeEach(() => {
      localStorage.setItem(TOKENS_KEY, JSON.stringify({ uZ5ATN1fRy: "secret-token", other0000: "other-token" }))
    })

    it("should send the token of the team and forget it once removed", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 204 } as Response)
      const service = createService()

      await service.delete("uZ5ATN1fRy")

      expect(fetchSpy).toHaveBeenCalledWith("/api/teams/uZ5ATN1fRy", { method: "DELETE", headers: { "x-team-token": "secret-token" } })
      expect(service.canDelete("uZ5ATN1fRy")).toBe(false)
      expect(JSON.parse(localStorage.getItem(TOKENS_KEY)!)).toEqual({ other0000: "other-token" })
    })

    it("should forget the token of a team that no longer exists", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 404 } as Response)
      const service = createService()

      await service.delete("uZ5ATN1fRy")

      expect(service.canDelete("uZ5ATN1fRy")).toBe(false)
    })

    it("should send an empty token for a team without one", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 401 } as Response)

      await expect(createService().delete("unknown000")).rejects.toThrow("Team not removed (401)")
      expect(fetchSpy).toHaveBeenCalledWith("/api/teams/unknown000", { method: "DELETE", headers: { "x-team-token": "" } })
    })

    it("should tell when too many requests are being made and keep the token", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 429 } as Response)
      const service = createService()

      await expect(service.delete("uZ5ATN1fRy")).rejects.toBeInstanceOf(TooManyPastesError)
      expect(service.canDelete("uZ5ATN1fRy")).toBe(true)
    })
  })
})
