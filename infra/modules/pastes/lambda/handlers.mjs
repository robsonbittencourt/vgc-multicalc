import { clientKey, isPasteId, isValidStamp, isVerifierMatch, lockedSecondsLeft, lockSeconds, newPasteId, parseSpecies, renderPastePage, validatePaste, validateUnlock } from "./core.mjs"

const MAX_ID_ATTEMPTS = 3
const JSON_HEADERS = { "content-type": "application/json", "cache-control": "no-store" }
const HTML_HEADERS = { "content-type": "text/html; charset=utf-8" }
const PAGE_CACHE_CONTROL = "public, max-age=0, must-revalidate, s-maxage=31536000"
const IMAGE_CACHE_CONTROL = "public, max-age=86400, s-maxage=31536000"
const NOT_FOUND_CACHE_CONTROL = "public, max-age=0, s-maxage=300"
const OG_IMAGE_PATH = /^\/paste\/([^/]+)\/og\.png$/
const UNLOCK_PATH = /^\/api\/pastes\/([^/]+)\/unlock$/
const MAX_UNLOCK_WRITES = 3

export function pasteApiHandler({ createPaste, unlockPaste }) {
  return request => (UNLOCK_PATH.test(request.path) ? unlockPaste(request) : createPaste(request))
}

export function createPasteHandler({ store, now, randomIndex, allowRequest }) {
  return async request => {
    if (request.method !== "POST") return json(405, { error: "Method not allowed" })

    const requestTime = now()

    if (!allowRequest(clientKey(request.headers["cloudfront-viewer-address"]), requestTime)) return json(429, { error: "Too many requests" })

    const validation = validatePaste(request.body)

    if (!validation.ok) return json(400, { error: validation.error })
    if (!isValidStamp(request.headers["x-paste-stamp"], request.body, requestTime)) return json(400, { error: "Invalid request" })

    const paste = { ...validation.paste, createdAt: requestTime.toISOString() }

    for (let attempt = 0; attempt < MAX_ID_ATTEMPTS; attempt++) {
      const id = newPasteId(randomIndex)

      if (validation.secret && !(await store.putSecretIfAbsent(id, validation.secret))) continue
      if (await store.putIfAbsent(id, paste)) return json(201, { id })
    }

    return json(503, { error: "Could not allocate an id" })
  }
}

export function unlockPasteHandler({ store, now, allowRequest }) {
  return async request => {
    if (request.method !== "POST") return json(405, { error: "Method not allowed" })

    const requestTime = now()

    if (!allowRequest(clientKey(request.headers["cloudfront-viewer-address"]), requestTime)) return json(429, { error: "Too many requests" })

    const validation = validateUnlock(request.body)

    if (!validation.ok) return json(400, { error: validation.error })
    if (!isValidStamp(request.headers["x-paste-stamp"], request.body, requestTime)) return json(400, { error: "Invalid request" })

    const id = UNLOCK_PATH.exec(request.path)[1]

    if (!isPasteId(id)) return json(404, { error: "Not found" })

    for (let attempt = 0; attempt < MAX_UNLOCK_WRITES; attempt++) {
      const found = await store.getSecret(id)

      if (!found) return json(404, { error: "Not found" })

      const { secret, version } = found
      const secondsLeft = lockedSecondsLeft(secret, requestTime)

      if (secondsLeft > 0) return json(423, { error: "Locked", retryAfter: secondsLeft })

      const failedAttempts = secret.failedAttempts + 1
      const lock = lockSeconds(failedAttempts)
      const lockedUntil = lock > 0 ? new Date(requestTime.getTime() + lock * 1000).toISOString() : null
      const countedVersion = await store.replaceSecret(id, { ...secret, failedAttempts, lockedUntil }, version)

      if (!countedVersion) continue

      if (isVerifierMatch(secret, validation.verifierHash)) {
        await store.replaceSecret(id, { ...secret, failedAttempts: 0, lockedUntil: null }, countedVersion)

        return json(200, { iv: secret.iv, ciphertext: secret.ciphertext })
      }

      return json(401, lock > 0 ? { error: "Wrong password", retryAfter: lock } : { error: "Wrong password" })
    }

    return json(429, { error: "Too many requests" })
  }
}

export function pastePageHandler({ store, loadBaseHtml, publicOrigin, renderImage, isKnownSpecies }) {
  return async request => {
    if (request.method !== "GET" && request.method !== "HEAD") return json(405, { error: "Method not allowed" })

    const image = OG_IMAGE_PATH.exec(request.path)

    if (image) return pasteImage(await previewablePaste(store, image[1], isKnownSpecies), renderImage)

    const baseHtml = await loadBaseHtml()
    const id = request.path.replace(/^\/paste\//, "").replace(/\/$/, "")
    const paste = await previewablePaste(store, id, isKnownSpecies)

    if (!paste) return { statusCode: 404, headers: { ...HTML_HEADERS, "cache-control": NOT_FOUND_CACHE_CONTROL }, body: baseHtml }

    return { statusCode: 200, headers: { ...HTML_HEADERS, "cache-control": PAGE_CACHE_CONTROL }, body: renderPastePage(baseHtml, paste, `${publicOrigin}/paste/${id}/og.png`) }
  }
}

async function previewablePaste(store, id, isKnownSpecies) {
  const paste = isPasteId(id) ? await store.get(id) : null

  if (!paste || paste.protected) return paste

  return parseSpecies(paste.showdown).every(isKnownSpecies) ? paste : null
}

function pasteImage(paste, renderImage) {
  if (!paste || paste.protected) return { statusCode: 404, headers: { "content-type": "text/plain", "cache-control": NOT_FOUND_CACHE_CONTROL }, body: "Not found" }

  return { statusCode: 200, headers: { "content-type": "image/png", "cache-control": IMAGE_CACHE_CONTROL }, body: renderImage(paste).toString("base64"), isBase64Encoded: true }
}

export function withRejectionLog(handler, log) {
  return async request => {
    const response = await handler(request)

    if (response.statusCode >= 400) log(JSON.stringify({ status: response.statusCode, reason: rejectionReason(response), method: request.method, path: request.path, client: clientKey(request.headers["cloudfront-viewer-address"]) }))

    return response
  }
}

function rejectionReason(response) {
  if (response.headers["content-type"] === JSON_HEADERS["content-type"]) return JSON.parse(response.body).error

  return "Not found"
}

export function fromFunctionUrlEvent(event) {
  const rawBody = event.body ?? ""
  const body = event.isBase64Encoded ? Buffer.from(rawBody, "base64").toString("utf8") : rawBody

  return { method: event.requestContext.http.method, path: event.rawPath, headers: event.headers ?? {}, body }
}

function json(statusCode, value) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(value) }
}
