import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createHash } from "node:crypto"
import { leadingZeroBits, sha256Hex, STAMP_BITS, stampDay } from "../lambda/core.mjs"
import { createPasteHandler, fromFunctionUrlEvent, pasteApiHandler, pastePageHandler, unlockPasteHandler, withRejectionLog } from "../lambda/handlers.mjs"

const BODY = JSON.stringify({ kind: "team", version: 1, name: "Rain", useSpsMode: true, showdown: "Pelipper @ Damp Rock\n- Hurricane" })
const NOW = new Date("2026-09-27T12:34:56.000Z")

function memoryStore(taken = [], takenSecrets = []) {
  const saved = new Map()
  const secrets = new Map()
  const writes = []

  return {
    saved,
    secrets,
    writes,
    async get(id) {
      return saved.get(id) ?? null
    },
    async putIfAbsent(id, paste) {
      if (taken.includes(id) || saved.has(id)) return false

      saved.set(id, paste)

      return true
    },
    async getSecret(id) {
      return secrets.get(id) ?? null
    },
    async putSecretIfAbsent(id, secret) {
      if (takenSecrets.includes(id) || secrets.has(id)) return false

      secrets.set(id, { secret, version: "v1" })

      return true
    },
    async replaceSecret(id, secret, version) {
      writes.push({ id, secret, version })

      if (secrets.get(id).version !== version) return null

      const newVersion = `v${writes.length + 1}`
      secrets.set(id, { secret, version: newVersion })

      return newVersion
    }
  }
}

function sequentialIndexes() {
  let call = 0

  return () => call++ % 10
}

function mintStamp(body, date) {
  const day = stampDay(date)
  const bodyHash = sha256Hex(body)

  for (let nonce = 0; ; nonce++) {
    if (leadingZeroBits(createHash("sha256").update(`${day}.${nonce}.${bodyHash}`).digest()) >= STAMP_BITS) return `${day}.${nonce}`
  }
}

const STAMP = mintStamp(BODY, NOW)
const HEADERS = { "x-paste-stamp": STAMP, "cloudfront-viewer-address": "203.0.113.7:51234" }
const allowAll = () => true

describe("createPasteHandler", () => {
  it("saves the validated team with the creation date and answers with the new id", async () => {
    const store = memoryStore()
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: HEADERS, body: BODY })

    assert.deepEqual(response, { statusCode: 201, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"id":"0123456789"}' })
    assert.deepEqual(store.saved.get("0123456789"), { kind: "team", version: 1, useSpsMode: true, showdown: "Pelipper @ Damp Rock\n- Hurricane", name: "Rain", createdAt: "2026-09-27T12:34:56.000Z" })
  })

  it("draws a new id when the first one is taken", async () => {
    let call = 0
    const store = memoryStore(["0123456789"])
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: () => call++, allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: HEADERS, body: BODY })

    assert.equal(response.statusCode, 201)
    assert.equal(response.body, '{"id":"ABCDEFGHIJ"}')
    assert.deepEqual([...store.saved.keys()], ["ABCDEFGHIJ"])
  })

  it("gives up after three taken ids", async () => {
    const store = memoryStore(["AAAAAAAAAA"])
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: () => 10, allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: HEADERS, body: BODY })

    assert.deepEqual(response, { statusCode: 503, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Could not allocate an id"}' })
  })

  it("rejects an invalid team", async () => {
    const handler = createPasteHandler({ store: memoryStore(), now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: HEADERS, body: "{}" })

    assert.deepEqual(response, { statusCode: 400, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Unsupported kind"}' })
  })

  it("rejects a team without a valid stamp", async () => {
    const store = memoryStore()
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: allowAll })

    const withoutStamp = await handler({ method: "POST", headers: {}, body: BODY })
    const otherBody = await handler({ method: "POST", headers: HEADERS, body: BODY.replace("Rain", "Sun") })

    assert.deepEqual(withoutStamp, { statusCode: 400, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Invalid request"}' })
    assert.equal(otherBody.statusCode, 400)
    assert.equal(store.saved.size, 0)
  })

  it("answers 429 without saving when the client is over the limit", async () => {
    const store = memoryStore()
    const keys = []
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: key => keys.push(key) && false })

    const response = await handler({ method: "POST", headers: HEADERS, body: BODY })

    assert.deepEqual(response, { statusCode: 429, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Too many requests"}' })
    assert.deepEqual(keys, ["203.0.113.7"])
    assert.equal(store.saved.size, 0)
  })

  it("rejects methods other than POST", async () => {
    const handler = createPasteHandler({ store: memoryStore(), now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: allowAll })

    const response = await handler({ method: "GET", headers: {}, body: "" })

    assert.equal(response.statusCode, 405)
  })
})

const SALT = Buffer.alloc(16, 1).toString("base64")
const IV = Buffer.alloc(12, 2).toString("base64")
const VERIFIER = Buffer.alloc(32, 3).toString("base64")
const CIPHERTEXT = Buffer.alloc(20, 4).toString("base64")
const VERIFIER_HASH = createHash("sha256").update(Buffer.alloc(32, 3)).digest("hex")
const PROTECTED_BODY = JSON.stringify({ kind: "team", version: 1, protected: true, kdf: { salt: SALT, iterations: 600000 }, iv: IV, ciphertext: CIPHERTEXT, verifier: VERIFIER })
const PROTECTED_HEADERS = { ...HEADERS, "x-paste-stamp": mintStamp(PROTECTED_BODY, NOW) }
const STORED_SECRET = { iv: IV, ciphertext: CIPHERTEXT, verifierHash: VERIFIER_HASH, failedAttempts: 0, lockedUntil: null }

describe("createPasteHandler with a protected team", () => {
  it("saves the secret apart from the public stub", async () => {
    const store = memoryStore()
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: sequentialIndexes(), allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: PROTECTED_HEADERS, body: PROTECTED_BODY })

    assert.equal(response.body, '{"id":"0123456789"}')
    assert.deepEqual(store.saved.get("0123456789"), { kind: "team", version: 1, protected: true, kdf: { salt: SALT, iterations: 600000 }, createdAt: "2026-09-27T12:34:56.000Z" })
    assert.deepEqual(store.secrets.get("0123456789"), { secret: STORED_SECRET, version: "v1" })
  })

  it("draws a new id when the secret of the first one is taken", async () => {
    let call = 0
    const store = memoryStore([], ["0123456789"])
    const handler = createPasteHandler({ store, now: () => NOW, randomIndex: () => call++, allowRequest: allowAll })

    const response = await handler({ method: "POST", headers: PROTECTED_HEADERS, body: PROTECTED_BODY })

    assert.equal(response.body, '{"id":"ABCDEFGHIJ"}')
    assert.deepEqual([...store.saved.keys()], ["ABCDEFGHIJ"])
  })
})

describe("unlockPasteHandler", () => {
  const ID = "a1B2c3D4e5"
  const PATH = `/api/pastes/${ID}/unlock`
  const RIGHT = JSON.stringify({ verifier: VERIFIER })
  const WRONG = JSON.stringify({ verifier: Buffer.alloc(32, 9).toString("base64") })
  const stampFor = body => ({ ...HEADERS, "x-paste-stamp": mintStamp(body, NOW) })

  function storeWith(secret) {
    const store = memoryStore()
    store.secrets.set(ID, { secret: { ...STORED_SECRET, ...secret }, version: "v1" })

    return store
  }

  function unlock(store, body = RIGHT, overrides = {}) {
    const handler = unlockPasteHandler({ store, now: () => NOW, allowRequest: allowAll, ...overrides })

    return handler({ method: "POST", path: PATH, headers: stampFor(body), body })
  }

  it("answers with the encrypted team when the verifier is right", async () => {
    const store = storeWith()

    const response = await unlock(store)

    assert.deepEqual(response, { statusCode: 200, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: JSON.stringify({ iv: IV, ciphertext: CIPHERTEXT }) })
  })

  it("counts the attempt before comparing and resets it after a right verifier", async () => {
    const store = storeWith({ failedAttempts: 4 })

    await unlock(store)

    assert.deepEqual(store.writes, [
      { id: ID, secret: { ...STORED_SECRET, failedAttempts: 5, lockedUntil: "2026-09-27T12:35:56.000Z" }, version: "v1" },
      { id: ID, secret: STORED_SECRET, version: "v2" }
    ])
    assert.deepEqual(store.secrets.get(ID).secret, STORED_SECRET)
  })

  it("never compares a verifier whose attempt could not be counted", async () => {
    const store = storeWith()
    store.replaceSecret = async () => null

    const response = await unlock(store)

    assert.deepEqual(response, { statusCode: 429, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Too many requests"}' })
  })

  it("counts a wrong verifier without locking during the free attempts", async () => {
    const store = storeWith({ failedAttempts: 3 })

    const response = await unlock(store, WRONG)

    assert.deepEqual(response, { statusCode: 401, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Wrong password"}' })
    assert.deepEqual(store.secrets.get(ID).secret, { ...STORED_SECRET, failedAttempts: 4 })
  })

  it("locks for 1 minute on the fifth wrong verifier", async () => {
    const store = storeWith({ failedAttempts: 4 })

    const response = await unlock(store, WRONG)

    assert.equal(response.statusCode, 401)
    assert.equal(response.body, '{"error":"Wrong password","retryAfter":60}')
    assert.deepEqual(store.secrets.get(ID).secret, { ...STORED_SECRET, failedAttempts: 5, lockedUntil: "2026-09-27T12:35:56.000Z" })
  })

  it("refuses any verifier while locked, without counting it", async () => {
    const store = storeWith({ failedAttempts: 5, lockedUntil: "2026-09-27T12:35:56.000Z" })

    const response = await unlock(store)

    assert.deepEqual(response, { statusCode: 423, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Locked","retryAfter":60}' })
    assert.deepEqual(store.writes, [])
  })

  it("accepts attempts again once the lock expires", async () => {
    const store = storeWith({ failedAttempts: 5, lockedUntil: "2026-09-27T12:34:56.000Z" })

    const response = await unlock(store)

    assert.equal(response.statusCode, 200)
  })

  it("reads the secret again when a concurrent attempt changed it", async () => {
    const store = storeWith({ failedAttempts: 1 })
    const read = store.getSecret
    let reads = 0
    store.getSecret = async id => (reads++ === 0 ? { ...(await read(id)), version: "stale" } : read(id))

    const response = await unlock(store, WRONG)

    assert.equal(response.statusCode, 401)
    assert.deepEqual(
      store.writes.map(write => write.version),
      ["stale", "v1"]
    )
    assert.equal(store.secrets.get(ID).secret.failedAttempts, 2)
  })

  it("gives up after three concurrent changes", async () => {
    const store = storeWith()
    store.replaceSecret = async () => null

    const response = await unlock(store, WRONG)

    assert.deepEqual(response, { statusCode: 429, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Too many requests"}' })
  })

  it("answers 404 for a missing or malformed paste", async () => {
    const missing = await unlock(memoryStore())
    const malformed = await unlockPasteHandler({ store: memoryStore(), now: () => NOW, allowRequest: allowAll })({ method: "POST", path: "/api/pastes/bad/unlock", headers: stampFor(RIGHT), body: RIGHT })

    assert.deepEqual(missing, { statusCode: 404, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Not found"}' })
    assert.equal(malformed.statusCode, 404)
  })

  it("rejects an invalid verifier and a missing stamp", async () => {
    const handler = unlockPasteHandler({ store: storeWith(), now: () => NOW, allowRequest: allowAll })

    const invalid = await handler({ method: "POST", path: PATH, headers: stampFor("{}"), body: "{}" })
    const withoutStamp = await handler({ method: "POST", path: PATH, headers: {}, body: RIGHT })

    assert.equal(invalid.body, '{"error":"Invalid verifier"}')
    assert.deepEqual(withoutStamp, { statusCode: 400, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Invalid request"}' })
  })

  it("answers 429 when the client is over the limit", async () => {
    const keys = []

    const response = await unlock(storeWith(), RIGHT, { allowRequest: key => keys.push(key) && false })

    assert.equal(response.statusCode, 429)
    assert.deepEqual(keys, ["203.0.113.7"])
  })

  it("rejects methods other than POST", async () => {
    const response = await unlockPasteHandler({ store: storeWith(), now: () => NOW, allowRequest: allowAll })({ method: "GET", path: PATH, headers: {}, body: "" })

    assert.equal(response.statusCode, 405)
  })
})

describe("pasteApiHandler", () => {
  const handler = pasteApiHandler({ createPaste: async () => "create", unlockPaste: async () => "unlock" })

  it("sends unlock paths to the unlock handler and the rest to the create handler", async () => {
    assert.equal(await handler({ path: "/api/pastes/a1B2c3D4e5/unlock" }), "unlock")
    assert.equal(await handler({ path: "/api/pastes" }), "create")
  })
})

describe("pastePageHandler", () => {
  const baseHtml = "<html><head><title>Page Not Found - VGC Multi Calc</title></head><body></body></html>"
  const paste = { kind: "team", version: 1, name: "Rain", useSpsMode: true, showdown: "Pelipper @ Damp Rock" }

  function handlerWith(store, renderImage = () => assert.fail("image must not be rendered"), isKnownSpecies = () => true) {
    return pastePageHandler({ store, loadBaseHtml: async () => baseHtml, publicOrigin: "https://daxlgsrbxnzt9.cloudfront.net", renderImage, isKnownSpecies })
  }

  it("serves the app html with the tags of the team, cached at the edge", async () => {
    const store = memoryStore()
    store.saved.set("a1B2c3D4e5", paste)

    const response = await handlerWith(store)({ method: "GET", path: "/paste/a1B2c3D4e5" })

    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.headers, { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate, s-maxage=31536000" })
    assert.match(response.body, /<title>Rain · Paste — VGC Multi Calc<\/title>/)
    assert.match(response.body, /<meta property="og:image" content="https:\/\/daxlgsrbxnzt9\.cloudfront\.net\/paste\/a1B2c3D4e5\/og\.png">/)
    assert.doesNotMatch(response.body, /description/)
  })

  it("renders the preview image of the team as a png cached at the edge", async () => {
    const store = memoryStore()
    const rendered = []
    store.saved.set("a1B2c3D4e5", paste)

    const response = await handlerWith(store, team => rendered.push(team) && Buffer.from("png-bytes"))({ method: "GET", path: "/paste/a1B2c3D4e5/og.png" })

    assert.deepEqual(response, {
      statusCode: 200,
      headers: { "content-type": "image/png", "cache-control": "public, max-age=86400, s-maxage=31536000" },
      body: Buffer.from("png-bytes").toString("base64"),
      isBase64Encoded: true
    })
    assert.deepEqual(rendered, [paste])
  })

  it("answers 404 for the image of a missing or malformed paste without rendering, cached at the edge for 5 minutes", async () => {
    const store = memoryStore()

    const missing = await handlerWith(store)({ method: "GET", path: "/paste/a1B2c3D4e5/og.png" })
    const malformed = await handlerWith(store)({ method: "GET", path: "/paste/bad/og.png" })

    assert.deepEqual(missing, { statusCode: 404, headers: { "content-type": "text/plain", "cache-control": "public, max-age=0, s-maxage=300" }, body: "Not found" })
    assert.equal(malformed.statusCode, 404)
  })

  it("serves a protected team page without its image", async () => {
    const store = memoryStore()
    store.saved.set("a1B2c3D4e5", { kind: "team", version: 1, protected: true, kdf: { salt: SALT, iterations: 600000 } })

    const page = await handlerWith(store)({ method: "GET", path: "/paste/a1B2c3D4e5" })
    const image = await handlerWith(store)({ method: "GET", path: "/paste/a1B2c3D4e5/og.png" })

    assert.match(page.body, /<title>Protected Paste — VGC Multi Calc<\/title>/)
    assert.doesNotMatch(page.body, /og:image/)
    assert.equal(image.statusCode, 404)
  })

  it("treats a team with an unknown species as missing, without tags or image", async () => {
    const store = memoryStore()
    const checked = []
    store.saved.set("a1B2c3D4e5", { ...paste, showdown: "Pelipper @ Damp Rock\n\nBuy Cheap Coins @ Spam Site" })
    const isKnownSpecies = species => checked.push(species) && species === "Pelipper"

    const page = await handlerWith(store, undefined, isKnownSpecies)({ method: "GET", path: "/paste/a1B2c3D4e5" })
    const image = await handlerWith(store, undefined, isKnownSpecies)({ method: "GET", path: "/paste/a1B2c3D4e5/og.png" })

    assert.deepEqual(page, { statusCode: 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=300" }, body: baseHtml })
    assert.equal(image.statusCode, 404)
    assert.deepEqual(checked, ["Pelipper", "Buy Cheap Coins", "Pelipper", "Buy Cheap Coins"])
  })

  it("accepts a trailing slash and HEAD requests", async () => {
    const store = memoryStore()
    store.saved.set("a1B2c3D4e5", paste)

    const response = await handlerWith(store)({ method: "HEAD", path: "/paste/a1B2c3D4e5/" })

    assert.equal(response.statusCode, 200)
  })

  it("serves the plain app html with 404, cached at the edge for 5 minutes, when the paste does not exist", async () => {
    const response = await handlerWith(memoryStore())({ method: "GET", path: "/paste/a1B2c3D4e5" })

    assert.deepEqual(response, { statusCode: 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=300" }, body: baseHtml })
  })

  it("does not look up malformed ids", async () => {
    const store = memoryStore()
    store.get = async () => assert.fail("store must not be read")

    const response = await handlerWith(store)({ method: "GET", path: "/paste/../secret" })

    assert.equal(response.statusCode, 404)
  })

  it("rejects methods other than GET and HEAD", async () => {
    const response = await handlerWith(memoryStore())({ method: "POST", path: "/paste/a1B2c3D4e5" })

    assert.equal(response.statusCode, 405)
  })
})

describe("withRejectionLog", () => {
  const request = { method: "POST", path: "/api/pastes", headers: { "cloudfront-viewer-address": "198.51.100.7:443" }, body: BODY }

  async function logged(response) {
    const lines = []
    const answer = await withRejectionLog(
      async () => response,
      line => lines.push(line)
    )(request)

    assert.equal(answer, response)

    return lines.map(line => JSON.parse(line))
  }

  it("logs a rejection with the reason answered to the client, without the body", async () => {
    const lines = await logged({ statusCode: 400, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: '{"error":"Invalid request"}' })

    assert.deepEqual(lines, [{ status: 400, reason: "Invalid request", method: "POST", path: "/api/pastes", client: "198.51.100.7" }])
  })

  it("logs a missing page or image as not found", async () => {
    const lines = await logged({ statusCode: 404, headers: { "content-type": "text/html; charset=utf-8" }, body: "<html></html>" })

    assert.equal(lines[0].reason, "Not found")
  })

  it("does not log answers that succeeded", async () => {
    assert.deepEqual(await logged({ statusCode: 201, headers: { "content-type": "application/json" }, body: '{"id":"0123456789"}' }), [])
  })
})

describe("fromFunctionUrlEvent", () => {
  it("reads method, path and plain body", () => {
    const request = fromFunctionUrlEvent({ requestContext: { http: { method: "POST" } }, rawPath: "/api/pastes", headers: {}, body: "{}", isBase64Encoded: false })

    assert.deepEqual(request, { method: "POST", path: "/api/pastes", headers: {}, body: "{}" })
  })

  it("decodes a base64 body", () => {
    const request = fromFunctionUrlEvent({ requestContext: { http: { method: "POST" } }, rawPath: "/api/pastes", body: Buffer.from('{"a":"é"}').toString("base64"), isBase64Encoded: true })

    assert.equal(request.body, '{"a":"é"}')
  })

  it("treats a missing body and missing headers as empty", () => {
    const request = fromFunctionUrlEvent({ requestContext: { http: { method: "GET" } }, rawPath: "/paste/x" })

    assert.equal(request.body, "")
    assert.deepEqual(request.headers, {})
  })

  it("keeps the request headers", () => {
    const request = fromFunctionUrlEvent({ requestContext: { http: { method: "POST" } }, rawPath: "/api/pastes", headers: { "x-paste-stamp": "1.2" }, body: "" })

    assert.deepEqual(request.headers, { "x-paste-stamp": "1.2" })
  })
})
