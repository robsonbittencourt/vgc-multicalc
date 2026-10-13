import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TeamUsageService } from "@app/services/team-usage.service"

const USES_KEY = "communityTeamUses"
const NOW = new Date("2026-10-12T15:00:00.000Z")

function createService(platformId = "browser"): TeamUsageService {
  TestBed.configureTestingModule({ providers: [TeamUsageService, provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: platformId }] })

  return TestBed.inject(TeamUsageService)
}

describe("TeamUsageService", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe("recordUse", () => {
    it("should send one use signal per paste per day", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response)
      const service = createService()

      service.recordUse("uZ5ATN1fRy")
      service.recordUse("uZ5ATN1fRy")
      service.recordUse("kR2kYIhDtY")

      expect(fetchSpy.mock.calls).toEqual([
        ["/api/events/use.json?paste=uZ5ATN1fRy", { cache: "no-store", keepalive: true }],
        ["/api/events/use.json?paste=kR2kYIhDtY", { cache: "no-store", keepalive: true }]
      ])
      expect(JSON.parse(localStorage.getItem(USES_KEY)!)).toEqual({ day: "2026-10-12", pastes: ["uZ5ATN1fRy", "kR2kYIhDtY"] })
    })

    it("should count a paste again on the next day", () => {
      localStorage.setItem(USES_KEY, JSON.stringify({ day: "2026-10-11", pastes: ["uZ5ATN1fRy", "kR2kYIhDtY"] }))
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response)

      createService().recordUse("uZ5ATN1fRy")

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(JSON.parse(localStorage.getItem(USES_KEY)!)).toEqual({ day: "2026-10-12", pastes: ["uZ5ATN1fRy"] })
    })

    it.each([["not json"], ['{"day":7}'], ['{"day":"2026-10-12","pastes":"uZ5ATN1fRy"}']])("should start over from the stored uses %s", stored => {
      localStorage.setItem(USES_KEY, stored)
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true } as Response)

      createService().recordUse("uZ5ATN1fRy")

      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })

    it("should send the signal when the browser storage refuses it and ignore a failed signal", async () => {
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new DOMException("QuotaExceededError")
      })
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"))

      createService().recordUse("uZ5ATN1fRy")
      await Promise.resolve()

      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })

    it("should send nothing outside the browser", () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch")

      createService("server").recordUse("uZ5ATN1fRy")

      expect(fetchSpy).not.toHaveBeenCalled()
    })
  })

  describe("mostViewed", () => {
    it("should read the ranking of the week", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => [{ pasteId: "uZ5ATN1fRy", uses: 9 }] } as Response)

      expect(await createService().mostViewed()).toEqual([{ pasteId: "uZ5ATN1fRy", uses: 9 }])
      expect(fetchSpy).toHaveBeenCalledWith("/api/teams/most-viewed.json")
    })

    it("should answer no uses when the ranking is missing, malformed or unreachable", async () => {
      const service = createService()

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      const missing = await service.mostViewed()

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({ ok: true, json: async () => ({ uses: [] }) } as Response)
      const malformed = await service.mostViewed()

      vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new TypeError("Failed to fetch"))
      const unreachable = await service.mostViewed()

      expect([missing, malformed, unreachable]).toEqual([[], [], []])
    })
  })
})
