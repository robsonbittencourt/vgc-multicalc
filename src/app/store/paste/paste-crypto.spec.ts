import { decryptTeam, derivePasteKeys, encryptTeam, isProtectedPasteStub, KDF_ITERATIONS } from "@store/paste/paste-crypto"
import { SharedTeam } from "@store/paste/shared-team"

describe("paste-crypto", () => {
  const team: SharedTeam = { kind: "team", version: 1, name: "Rain", useSpsMode: true, showdown: "Pelipper @ Damp Rock" }
  const salt = "AQEBAQEBAQEBAQEBAQEBAQ=="

  describe("derivePasteKeys", () => {
    it("should derive the verifier of the password with PBKDF2 and HKDF", async () => {
      const keys = await derivePasteKeys("pika", { salt, iterations: 1000 })

      expect(keys.verifier).toBe("WQezA8g6VTvOR7p6TdjJHuOUCmAsA40C7ddLSdT+ro4=")
      expect(keys.encryptionKey.algorithm).toEqual({ name: "AES-GCM", length: 256 })
    })
  })

  describe("encryptTeam", () => {
    it("should encrypt the team so the same password decrypts it", async () => {
      const request = await encryptTeam(team, "pika", 1000)

      const keys = await derivePasteKeys("pika", request.kdf)

      expect(request.kind).toBe("team")
      expect(request.version).toBe(1)
      expect(request.protected).toBe(true)
      expect(request.kdf.iterations).toBe(1000)
      expect(atob(request.kdf.salt)).toHaveLength(16)
      expect(atob(request.iv)).toHaveLength(12)
      expect(request.ciphertext).not.toContain("Pelipper")
      expect(keys.verifier).toBe(request.verifier)
      expect(await decryptTeam(keys.encryptionKey, request)).toEqual(team)
    })

    it("should use 600000 iterations by default", async () => {
      const request = await encryptTeam(team, "pika")

      expect(request.kdf.iterations).toBe(KDF_ITERATIONS)
      expect(KDF_ITERATIONS).toBe(600000)
    })
  })

  describe("decryptTeam", () => {
    it("should return null for a wrong password", async () => {
      const request = await encryptTeam(team, "pika", 1000)

      const keys = await derivePasteKeys("chu!", request.kdf)

      expect(keys.verifier).not.toBe(request.verifier)
      expect(await decryptTeam(keys.encryptionKey, request)).toBeNull()
    })

    it("should return null when the decrypted content is not a team", async () => {
      const request = await encryptTeam({ kind: "calc" } as unknown as SharedTeam, "pika", 1000)

      const keys = await derivePasteKeys("pika", request.kdf)

      expect(await decryptTeam(keys.encryptionKey, request)).toBeNull()
    })
  })

  describe("isProtectedPasteStub", () => {
    it("should accept the public stub of a protected paste", () => {
      expect(isProtectedPasteStub({ kind: "team", version: 1, protected: true, kdf: { salt, iterations: 600000 } })).toBe(true)
    })

    it("should reject values that are not a protected stub", () => {
      expect(isProtectedPasteStub(null)).toBe(false)
      expect(isProtectedPasteStub("team")).toBe(false)
      expect(isProtectedPasteStub(team)).toBe(false)
      expect(isProtectedPasteStub({ kind: "calc", version: 1, protected: true, kdf: { salt, iterations: 600000 } })).toBe(false)
      expect(isProtectedPasteStub({ kind: "team", version: 2, protected: true, kdf: { salt, iterations: 600000 } })).toBe(false)
      expect(isProtectedPasteStub({ kind: "team", version: 1, protected: true })).toBe(false)
      expect(isProtectedPasteStub({ kind: "team", version: 1, protected: true, kdf: { salt: 1, iterations: 600000 } })).toBe(false)
      expect(isProtectedPasteStub({ kind: "team", version: 1, protected: true, kdf: { salt, iterations: "600000" } })).toBe(false)
    })
  })
})
