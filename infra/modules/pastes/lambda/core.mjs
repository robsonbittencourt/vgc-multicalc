import { createHash, timingSafeEqual } from "node:crypto"

export const MAX_BODY_BYTES = 10240
export const MAX_MEMBERS = 6
export const MAX_NAME_LENGTH = 60
export const STAMP_BITS = 12
export const REQUESTS_PER_WINDOW = 30
export const WINDOW_MS = 60000
export const MIN_KDF_ITERATIONS = 100000
export const MAX_KDF_ITERATIONS = 10000000
export const FREE_ATTEMPTS = 5
export const MAX_LOCK_MINUTES = 60

const DAY_MS = 86400000
const MAX_TRACKED_KEYS = 10000

const ID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const ID_LENGTH = 10
const ID_PATTERN = /^[0-9A-Za-z]{10}$/
const LINK_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.[a-z]{2,}\b/i
const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/
const SALT_BYTES = 16
const IV_BYTES = 12
const VERIFIER_BYTES = 32
const MIN_CIPHERTEXT_BYTES = 17
const SITE_NAME = "VGC Multi Calc"
const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

export function newPasteId(randomIndex) {
  let id = ""

  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[randomIndex(ID_ALPHABET.length)]
  }

  return id
}

export function isPasteId(id) {
  return typeof id === "string" && ID_PATTERN.test(id)
}

export function pasteKey(id) {
  return `api/pastes/${id}`
}

export function secretKey(id) {
  return `protected/${id}`
}

export function parseSpecies(showdown) {
  return parseSets(showdown).map(set => set.species)
}

export function parseSets(showdown) {
  const sets = []
  let current = null

  for (const rawLine of showdown.split(/\r\n|\r|\n/)) {
    const line = rawLine.trim()

    if (line === "" || /^===.*===$/.test(line)) {
      current = null
      continue
    }

    if (current) {
      const move = /^[-~]\s*(.+)$/.exec(line)
      const ability = /^Ability:\s*(.+)$/i.exec(line)

      if (move && current.moves.length < 4) current.moves.push(move[1].trim())
      if (ability) current.ability = ability[1].trim()

      continue
    }

    const at = line.indexOf("@")
    const identity = (at >= 0 ? line.substring(0, at) : line).replace(/\s*\([MF]\)/i, "").trim()
    const nicknamed = /\(([^()]+)\)\s*$/.exec(identity)
    const item = at >= 0 ? line.substring(at + 1).trim() : ""

    current = { species: nicknamed ? nicknamed[1].trim() : identity, item, ability: "", moves: [] }
    sets.push(current)
  }

  return sets
}

export function validatePaste(rawBody) {
  if (typeof rawBody !== "string" || rawBody.length === 0) return invalid("Empty body")
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) return invalid("Body too large")

  let body

  try {
    body = JSON.parse(rawBody)
  } catch {
    return invalid("Body is not JSON")
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return invalid("Body must be an object")
  if (body.kind !== "team") return invalid("Unsupported kind")
  if (body.version !== 1) return invalid("Unsupported version")
  if (body.protected === true) return validateProtectedPaste(body)
  if (typeof body.useSpsMode !== "boolean") return invalid("useSpsMode must be a boolean")
  if (body.name !== undefined && (typeof body.name !== "string" || body.name.length > MAX_NAME_LENGTH || LINK_PATTERN.test(body.name))) return invalid("Invalid name")
  if (typeof body.showdown !== "string") return invalid("showdown must be a string")

  const members = parseSpecies(body.showdown).length

  if (members === 0) return invalid("Team has no Pokémon")
  if (members > MAX_MEMBERS) return invalid("Team has more than 6 Pokémon")

  const paste = { kind: "team", version: 1, useSpsMode: body.useSpsMode, showdown: body.showdown }

  if (body.name && body.name.trim()) paste.name = body.name.trim()

  return { ok: true, paste }
}

function validateProtectedPaste(body) {
  const kdf = body.kdf

  if (!kdf || typeof kdf !== "object" || !isBase64Of(kdf.salt, SALT_BYTES)) return invalid("Invalid salt")
  if (!Number.isInteger(kdf.iterations) || kdf.iterations < MIN_KDF_ITERATIONS || kdf.iterations > MAX_KDF_ITERATIONS) return invalid("Invalid iterations")
  if (!isBase64Of(body.iv, IV_BYTES)) return invalid("Invalid iv")
  if (!isBase64(body.ciphertext) || Buffer.from(body.ciphertext, "base64").length < MIN_CIPHERTEXT_BYTES) return invalid("Invalid ciphertext")
  if (!isBase64Of(body.verifier, VERIFIER_BYTES)) return invalid("Invalid verifier")

  return {
    ok: true,
    paste: { kind: "team", version: 1, protected: true, kdf: { salt: kdf.salt, iterations: kdf.iterations } },
    secret: { iv: body.iv, ciphertext: body.ciphertext, verifierHash: verifierHash(body.verifier), failedAttempts: 0, lockedUntil: null }
  }
}

function invalid(error) {
  return { ok: false, error }
}

function isBase64(value) {
  return typeof value === "string" && BASE64_PATTERN.test(value)
}

function isBase64Of(value, bytes) {
  return isBase64(value) && Buffer.from(value, "base64").length === bytes
}

function verifierHash(verifier) {
  return createHash("sha256").update(Buffer.from(verifier, "base64")).digest("hex")
}

export function validateUnlock(rawBody) {
  let body

  try {
    body = JSON.parse(rawBody)
  } catch {
    return invalid("Body is not JSON")
  }

  if (!body || !isBase64Of(body.verifier, VERIFIER_BYTES)) return invalid("Invalid verifier")

  return { ok: true, verifierHash: verifierHash(body.verifier) }
}

export function isVerifierMatch(secret, hash) {
  return timingSafeEqual(Buffer.from(secret.verifierHash, "hex"), Buffer.from(hash, "hex"))
}

export function lockSeconds(failedAttempts) {
  if (failedAttempts < FREE_ATTEMPTS) return 0

  return Math.min(2 ** (failedAttempts - FREE_ATTEMPTS), MAX_LOCK_MINUTES) * 60
}

export function lockedSecondsLeft(secret, now) {
  if (!secret.lockedUntil) return 0

  return Math.max(0, Math.ceil((Date.parse(secret.lockedUntil) - now.getTime()) / 1000))
}

export function renderPastePage(baseHtml, paste, ogImageUrl) {
  const title = paste.protected ? `Protected Paste — ${SITE_NAME}` : `${paste.name || "Pokémon team"} · Paste — ${SITE_NAME}`

  const withImage = !paste.protected
  const imageUrl = escapeHtml(ogImageUrl)

  const tags = [
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    ...(withImage
      ? [`<meta property="og:image" content="${imageUrl}">`, `<meta property="og:image:type" content="image/png">`, `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}">`, `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">`]
      : []),
    `<meta name="twitter:card" content="${withImage ? "summary_large_image" : "summary"}">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    ...(withImage ? [`<meta name="twitter:image" content="${imageUrl}">`] : [])
  ]

  const withoutSocialTags = baseHtml
    .replace(/<meta\s+(?:name|property)="(?:description|og:[^"]*|twitter:[^"]*)"[^>]*>/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/g, "")
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`)

  const withRobots = /<meta\s+name="robots"/.test(withoutSocialTags) ? withoutSocialTags : withoutSocialTags.replace("</head>", `<meta name="robots" content="noindex, follow"></head>`)

  return withRobots.replace("</head>", () => `${tags.join("")}</head>`)
}

export function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

export function stampDay(date) {
  return Math.floor(date.getTime() / DAY_MS)
}

export function sha256Hex(text) {
  return createHash("sha256").update(text, "utf8").digest("hex")
}

export function leadingZeroBits(bytes) {
  let bits = 0

  for (const byte of bytes) {
    if (byte === 0) {
      bits += 8
      continue
    }

    return bits + Math.clz32(byte) - 24
  }

  return bits
}

export function isValidStamp(stamp, body, now) {
  const match = /^(\d{1,6})\.(\d{1,10})$/.exec(stamp ?? "")

  if (!match) return false
  if (Math.abs(Number(match[1]) - stampDay(now)) > 1) return false

  const digest = createHash("sha256")
    .update(`${match[1]}.${match[2]}.${sha256Hex(body)}`, "utf8")
    .digest()

  return leadingZeroBits(digest) >= STAMP_BITS
}

export function clientKey(viewerAddress) {
  const portSeparator = (viewerAddress ?? "").lastIndexOf(":")

  if (portSeparator <= 0) return "unknown"

  const ip = viewerAddress.substring(0, portSeparator)

  if (!ip.includes(":")) return ip

  const [head, tail = ""] = ip.split("::")
  const headGroups = head ? head.split(":") : []
  const tailGroups = tail ? tail.split(":") : []
  const groups = [...headGroups, ...Array(Math.max(0, 8 - headGroups.length - tailGroups.length)).fill("0"), ...tailGroups]

  return `${groups
    .slice(0, 4)
    .map(group => parseInt(group, 16).toString(16))
    .join(":")}::/64`
}

export function requestLimiter(limit = REQUESTS_PER_WINDOW, windowMs = WINDOW_MS, maxKeys = MAX_TRACKED_KEYS) {
  const hits = new Map()

  return (key, now) => {
    const time = now.getTime()
    const entry = hits.get(key)

    if (entry && time - entry.start < windowMs) {
      entry.count++

      return entry.count <= limit
    }

    if (!entry && hits.size >= maxKeys) {
      for (const [trackedKey, tracked] of hits) {
        if (time - tracked.start >= windowMs) hits.delete(trackedKey)
      }
    }

    hits.set(key, { start: time, count: 1 })

    return true
  }
}
