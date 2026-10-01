import { isSharedTeam, SharedTeam } from "@store/paste/shared-team"

export const KDF_ITERATIONS = 600000
export const MIN_PASSWORD_LENGTH = 4

export type PasteKdf = {
  salt: string
  iterations: number
}

export type ProtectedPasteStub = {
  kind: "team"
  version: 1
  protected: true
  kdf: PasteKdf
  createdAt?: string
}

export type EncryptedTeam = {
  iv: string
  ciphertext: string
}

export type ProtectedPasteRequest = EncryptedTeam & {
  kind: "team"
  version: 1
  protected: true
  kdf: PasteKdf
  verifier: string
}

export type PasteKeys = {
  encryptionKey: CryptoKey
  verifier: string
}

const SALT_BYTES = 16
const IV_BYTES = 12
const KEY_BITS = 256

export async function encryptTeam(team: SharedTeam, password: string, iterations = KDF_ITERATIONS): Promise<ProtectedPasteRequest> {
  const kdf = { salt: toBase64(crypto.getRandomValues(new Uint8Array(SALT_BYTES))), iterations }
  const keys = await derivePasteKeys(password, kdf)
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES))
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, keys.encryptionKey, new TextEncoder().encode(JSON.stringify(team)))

  return { kind: "team", version: 1, protected: true, kdf, iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(ciphertext)), verifier: keys.verifier }
}

export async function derivePasteKeys(password: string, kdf: PasteKdf): Promise<PasteKeys> {
  const passwordKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
  const masterBits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: fromBase64(kdf.salt), iterations: kdf.iterations, hash: "SHA-256" }, passwordKey, KEY_BITS)
  const masterKey = await crypto.subtle.importKey("raw", masterBits, "HKDF", false, ["deriveKey", "deriveBits"])
  const encryptionKey = await crypto.subtle.deriveKey(hkdf("paste-encryption"), masterKey, { name: "AES-GCM", length: KEY_BITS }, false, ["encrypt", "decrypt"])
  const verifier = await crypto.subtle.deriveBits(hkdf("paste-verifier"), masterKey, KEY_BITS)

  return { encryptionKey, verifier: toBase64(new Uint8Array(verifier)) }
}

function hkdf(info: string): HkdfParams {
  return { name: "HKDF", hash: "SHA-256", salt: new Uint8Array(0), info: new TextEncoder().encode(info) }
}

export async function decryptTeam(encryptionKey: CryptoKey, encrypted: EncryptedTeam): Promise<SharedTeam | null> {
  try {
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(encrypted.iv) }, encryptionKey, fromBase64(encrypted.ciphertext))
    const team = JSON.parse(new TextDecoder().decode(plain))

    return isSharedTeam(team) ? team : null
  } catch {
    return null
  }
}

export function isProtectedPasteStub(value: unknown): value is ProtectedPasteStub {
  if (!value || typeof value !== "object") return false

  const stub = value as Record<string, unknown>
  const kdf = stub["kdf"] as Record<string, unknown> | undefined

  return stub["kind"] === "team" && stub["version"] === 1 && stub["protected"] === true && typeof kdf?.["salt"] === "string" && typeof kdf["iterations"] === "number"
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
}

function fromBase64(text: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(text), char => char.charCodeAt(0))
}
