import { DOCUMENT } from "@angular/common"
import { inject, Injectable } from "@angular/core"
import { EncryptedTeam, isProtectedPasteStub, ProtectedPasteRequest, ProtectedPasteStub } from "@store/paste/paste-crypto"
import { isSharedTeam, SharedTeam } from "@store/paste/shared-team"

const PASTES_API = "/api/pastes"
const STAMP_BITS = 12
const DAY_MS = 86400000

export class TooManyPastesError extends Error {
  constructor() {
    super("Too many pastes")
    this.name = "TooManyPastesError"
  }
}

export class WrongPasswordError extends Error {
  constructor(readonly retryAfter?: number) {
    super("Wrong password")
    this.name = "WrongPasswordError"
  }
}

export class PasteUnavailableError extends Error {
  constructor(detail: string) {
    super(`Paste unavailable (${detail})`)
    this.name = "PasteUnavailableError"
  }
}

export class PasteLockedError extends Error {
  constructor(readonly retryAfter: number) {
    super("Paste locked")
    this.name = "PasteLockedError"
  }
}

@Injectable({ providedIn: "root" })
export class PasteService {
  private document = inject(DOCUMENT)

  async create(team: SharedTeam | ProtectedPasteRequest): Promise<string> {
    const response = await postJson(PASTES_API, team)

    if (response.status === 429) throw new TooManyPastesError()
    if (!response.ok) throw new Error(`Paste not created (${response.status}${await serverReason(response)})`)

    const { id } = await response.json()

    return id
  }

  async get(id: string): Promise<SharedTeam | ProtectedPasteStub | null> {
    const response = await fetch(`${PASTES_API}/${encodeURIComponent(id)}`).catch(error => {
      throw new PasteUnavailableError(String(error))
    })

    if (response.status === 404) return null
    if (!response.ok) throw new PasteUnavailableError(`${response.status}`)

    try {
      const paste = await response.json()

      return isSharedTeam(paste) || isProtectedPasteStub(paste) ? paste : null
    } catch {
      return null
    }
  }

  async unlock(id: string, verifier: string): Promise<EncryptedTeam> {
    const response = await postJson(`${PASTES_API}/${encodeURIComponent(id)}/unlock`, { verifier })

    if (response.ok) return response.json()
    if (response.status === 401) throw new WrongPasswordError((await response.json()).retryAfter)
    if (response.status === 423) throw new PasteLockedError((await response.json()).retryAfter)
    if (response.status === 429) throw new TooManyPastesError()

    throw new Error(`Paste not unlocked (${response.status}${await serverReason(response)})`)
  }

  link(id: string): string {
    return `${this.document.location.origin}/paste/${id}`
  }
}

async function serverReason(response: Response): Promise<string> {
  try {
    const { error } = await response.json()

    return typeof error === "string" ? `: ${error}` : ""
  } catch {
    return ""
  }
}

async function postJson(url: string, value: unknown): Promise<Response> {
  const body = JSON.stringify(value)
  const bodyHash = await sha256Hex(body)

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-amz-content-sha256": bodyHash, "x-paste-stamp": await createStamp(bodyHash, new Date()) },
    body
  })
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))

  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("")
}

export async function createStamp(bodyHash: string, date: Date): Promise<string> {
  const day = Math.floor(date.getTime() / DAY_MS)
  const encoder = new TextEncoder()

  for (let nonce = 0; ; nonce++) {
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(`${day}.${nonce}.${bodyHash}`)))

    if (leadingZeroBits(digest) >= STAMP_BITS) return `${day}.${nonce}`
  }
}

function leadingZeroBits(bytes: Uint8Array): number {
  const firstSetByte = bytes.findIndex(byte => byte !== 0)

  return firstSetByte * 8 + Math.clz32(bytes[firstSetByte]) - 24
}
