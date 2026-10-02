import { DOCUMENT } from "@angular/common"
import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { createStamp, PasteLockedError, PasteService, PasteUnavailableError, TooManyPastesError, WrongPasswordError } from "@app/services/paste.service"
import { SharedTeam } from "@store/paste/shared-team"

describe("PasteService", () => {
  let service: PasteService

  const team: SharedTeam = { kind: "team", version: 1, name: "Rain", useSpsMode: true, showdown: "Pelipper @ Damp Rock" }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasteService, provideZonelessChangeDetection(), { provide: DOCUMENT, useValue: { location: { origin: "https://daxlgsrbxnzt9.cloudfront.net", hostname: "daxlgsrbxnzt9.cloudfront.net" } } }]
    })

    service = TestBed.inject(PasteService)
  })

  describe("create", () => {
    it("should post the team with the SHA-256 of the body and answer with the new id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => ({ id: "T9jOlTcMNH" }) } as Response)
      const body = JSON.stringify(team)
      const expectedHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body))), b => b.toString(16).padStart(2, "0")).join("")

      const id = await service.create(team)

      expect(id).toBe("T9jOlTcMNH")
      expect(fetchSpy).toHaveBeenCalledWith("/api/pastes", {
        method: "POST",
        headers: { "content-type": "application/json", "x-amz-content-sha256": expectedHash, "x-paste-stamp": expect.stringMatching(/^\d+\.\d+$/) },
        body
      })
      expect(expectedHash).toMatch(/^[0-9a-f]{64}$/)
    })

    it("should tell when too many pastes are being created", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 429 } as Response)

      await expect(service.create(team)).rejects.toBeInstanceOf(TooManyPastesError)
    })

    it("should fail with the reason answered by the server when the paste is not created", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 400, json: async () => ({ error: "Invalid request" }) } as Response)

      await expect(service.create(team)).rejects.toThrow("Paste not created (400: Invalid request)")
    })

    it("should fail with the status alone when the server gives no reason", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 502, json: async () => ({ message: "Internal Server Error" }) } as Response)

      await expect(service.create(team)).rejects.toThrow("Paste not created (502)")
    })
  })

  describe("get", () => {
    it("should read the paste by its id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => team } as Response)

      const result = await service.get("T9jOlTcMNH")

      expect(result).toEqual(team)
      expect(fetchSpy).toHaveBeenCalledWith("/api/pastes/T9jOlTcMNH")
    })

    it("should return null when the paste does not exist", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 404 } as Response)

      expect(await service.get("AAAAAAAAAA")).toBeNull()
    })

    it("should read the public stub of a protected paste", async () => {
      const stub = { kind: "team", version: 1, protected: true, kdf: { salt: "AQEBAQEBAQEBAQEBAQEBAQ==", iterations: 600000 } }
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => stub } as Response)

      expect(await service.get("T9jOlTcMNH")).toEqual(stub)
    })

    it("should return null when the response is not a team", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, json: async () => ({ kind: "calc" }) } as Response)

      expect(await service.get("T9jOlTcMNH")).toBeNull()
    })

    it("should return null when the response is not JSON", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, json: async () => JSON.parse("<html>") } as Response)

      expect(await service.get("T9jOlTcMNH")).toBeNull()
    })

    it("should tell that the paste is unavailable when the request fails", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"))

      const error = await service.get("T9jOlTcMNH").catch(e => e)

      expect(error).toBeInstanceOf(PasteUnavailableError)
      expect(error.message).toBe("Paste unavailable (TypeError: Failed to fetch)")
    })

    it("should tell that the paste is unavailable on an answer other than 404", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 503 } as Response)

      const error = await service.get("T9jOlTcMNH").catch(e => e)

      expect(error).toBeInstanceOf(PasteUnavailableError)
      expect(error.message).toBe("Paste unavailable (503)")
    })
  })

  describe("unlock", () => {
    const verifier = "WQezA8g6VTvOR7p6TdjJHuOUCmAsA40C7ddLSdT+ro4="

    it("should post the verifier with a stamp and answer with the encrypted team", async () => {
      const encrypted = { iv: "AgICAgICAgICAgIC", ciphertext: "BAQEBAQEBAQEBAQEBAQEBAQEBAQ=" }
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, json: async () => encrypted } as Response)

      const result = await service.unlock("T9jOlTcMNH", verifier)

      expect(result).toEqual(encrypted)
      expect(fetchSpy).toHaveBeenCalledWith("/api/pastes/T9jOlTcMNH/unlock", {
        method: "POST",
        headers: { "content-type": "application/json", "x-amz-content-sha256": expect.stringMatching(/^[0-9a-f]{64}$/), "x-paste-stamp": expect.stringMatching(/^\d+\.\d+$/) },
        body: JSON.stringify({ verifier })
      })
    })

    it("should tell a wrong password with the lock that it started", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 401, json: async () => ({ error: "Wrong password", retryAfter: 60 }) } as Response)

      const error = await service.unlock("T9jOlTcMNH", verifier).catch(e => e)

      expect(error).toBeInstanceOf(WrongPasswordError)
      expect(error.retryAfter).toBe(60)
    })

    it("should tell when the paste is locked", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 423, json: async () => ({ error: "Locked", retryAfter: 240 }) } as Response)

      const error = await service.unlock("T9jOlTcMNH", verifier).catch(e => e)

      expect(error).toBeInstanceOf(PasteLockedError)
      expect(error.retryAfter).toBe(240)
    })

    it("should tell when there are too many requests", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 429 } as Response)

      await expect(service.unlock("T9jOlTcMNH", verifier)).rejects.toBeInstanceOf(TooManyPastesError)
    })

    it("should fail on any other answer, even when its body is not JSON", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false, status: 404, json: () => Promise.reject(new SyntaxError("Unexpected token <")) } as Response)

      await expect(service.unlock("T9jOlTcMNH", verifier)).rejects.toThrow("Paste not unlocked (404)")
    })
  })

  describe("link", () => {
    it("should build the page link on the current origin", () => {
      expect(service.link("T9jOlTcMNH")).toBe("https://daxlgsrbxnzt9.cloudfront.net/paste/T9jOlTcMNH")
    })
  })

  describe("createStamp", () => {
    it("should find a nonce whose hash with the day and the body hash starts with 12 zero bits", async () => {
      const bodyHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"

      const stamp = await createStamp(bodyHash, new Date("2026-09-28T15:00:00.000Z"))

      const [day, nonce] = stamp.split(".")
      const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${day}.${nonce}.${bodyHash}`)))
      expect(day).toBe("20724")
      expect(digest[0]).toBe(0)
      expect(digest[1]).toBeLessThan(16)
    })
  })
})
