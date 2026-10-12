import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createHash } from "node:crypto"
import {
  addToIndex,
  declaresSps,
  isTeamTokenMatch,
  leadingZeroBits,
  newTeamToken,
  removeFromIndex,
  sha256Hex,
  STAMP_BITS,
  stampDay,
  teamEntryKey,
  teamIndexEntry,
  teamIndexKey,
  teamMembers,
  teamTokenHash,
  validateTeamSubmission
} from "../lambda/core.mjs"
import { createTeamHandler, deleteTeamHandler, pasteApiHandler } from "../lambda/handlers.mjs"

const SHOWDOWN = "Pelipper @ Damp Rock\nAbility: Drizzle\nEVs: 2 HP / 32 SpA\n- Hurricane\n\nArchaludon\n- Electro Shot"
const NOW = new Date("2026-10-12T15:00:00.000Z")
const TOKEN_BYTES = Buffer.alloc(32, 7)
const TOKEN = TOKEN_BYTES.toString("base64url")
const FORM = { kind: "team", version: 1, useSpsMode: true, showdown: SHOWDOWN, name: "Rain Archaludon", player: "Eric Rios", handle: "Eric_Rios", event: "Recife Regional 2027", replicaCode: "A4RBRNN9YE", placement: "Top 8" }

function submission(fields = {}) {
  return JSON.stringify({ ...FORM, ...fields })
}

function mintStamp(body, date) {
  const day = stampDay(date)
  const bodyHash = sha256Hex(body)

  for (let nonce = 0; ; nonce++) {
    if (leadingZeroBits(createHash("sha256").update(`${day}.${nonce}.${bodyHash}`).digest()) >= STAMP_BITS) return `${day}.${nonce}`
  }
}

function teamStore({ takenIds = [], takenEntries = [], indexConflicts = 0, index = [] } = {}) {
  const pastes = new Map()
  const entries = new Map()
  const indexes = new Map(index.length ? [["M-C", { index, version: "e1" }]] : [])
  const deleted = []
  let conflicts = indexConflicts
  let writes = 0

  return {
    pastes,
    entries,
    indexes,
    deleted,
    async putIfAbsent(id, paste, cacheControl) {
      if (takenIds.includes(id) || pastes.has(id)) return false

      pastes.set(id, { paste, cacheControl })

      return true
    },
    async deletePaste(id) {
      deleted.push(`paste:${id}`)
      pastes.delete(id)
    },
    async getEntry(id) {
      return entries.get(id) ?? null
    },
    async putEntryIfAbsent(id, entry) {
      if (takenEntries.includes(id) || entries.has(id)) return false

      entries.set(id, entry)

      return true
    },
    async deleteEntry(id) {
      deleted.push(`entry:${id}`)
      entries.delete(id)
    },
    async getIndex(regulation) {
      return indexes.get(regulation) ?? { index: [], version: null }
    },
    async replaceIndex(regulation, nextIndex, version) {
      if (conflicts > 0) {
        conflicts--

        return false
      }

      if ((indexes.get(regulation)?.version ?? null) !== version) return false

      writes++
      indexes.set(regulation, { index: nextIndex, version: `e${writes + 1}` })

      return true
    }
  }
}

function sequentialIndexes() {
  let call = 0

  return () => call++ % 10
}

const allowAll = () => true
const VIEWER = { "cloudfront-viewer-address": "203.0.113.7:51234" }

function createHandler(store, allowRequest = allowAll) {
  return createTeamHandler({ store, now: () => NOW, randomIndex: sequentialIndexes(), randomBytes: () => TOKEN_BYTES, allowRequest, regulation: "M-C" })
}

function post(body) {
  return { method: "POST", path: "/api/teams", headers: { ...VIEWER, "x-paste-stamp": mintStamp(body, NOW) }, body }
}

describe("validateTeamSubmission", () => {
  it("accepts a team with the optional fields and marks the paste as a community team", () => {
    assert.deepEqual(validateTeamSubmission(submission({ name: " Rain Archaludon ", player: " Eric Rios ", event: " Recife Regional 2027 " })), {
      ok: true,
      paste: { kind: "team", version: 1, useSpsMode: true, showdown: SHOWDOWN, name: "Rain Archaludon", source: "community-team" },
      team: { name: "Rain Archaludon", player: "Eric Rios", handle: "Eric_Rios", event: "Recife Regional 2027", replicaCode: "A4RBRNN9YE", placement: "Top 8" }
    })
  })

  it("leaves out an empty or missing handle, event and replica code", () => {
    assert.deepEqual(validateTeamSubmission(submission({ handle: "", event: "", replicaCode: "", placement: "" })).team, { name: "Rain Archaludon", player: "Eric Rios" })
    assert.deepEqual(validateTeamSubmission(submission({ handle: undefined, event: undefined, replicaCode: undefined, placement: undefined })).team, { name: "Rain Archaludon", player: "Eric Rios" })
  })

  it("accepts only placements like the VGCPastes ones", () => {
    for (const placement of ["Champion", "Runner Up", "Top 32", "5th", "21st", "Top 32 (Seniors)"]) assert.equal(validateTeamSubmission(submission({ placement })).ok, true)
    for (const placement of ["First", "Top", "Peak 1st", "1st place https://x.co", 8]) assert.deepEqual(validateTeamSubmission(submission({ placement })), { ok: false, error: "Invalid placement" })
  })

  it("accepts only a replica code of 10 capital letters and digits", () => {
    assert.deepEqual(validateTeamSubmission(submission({ replicaCode: "a4rbrnn9ye" })), { ok: false, error: "Invalid replica code" })
    assert.deepEqual(validateTeamSubmission(submission({ replicaCode: "A4RBRNN9Y" })), { ok: false, error: "Invalid replica code" })
    assert.deepEqual(validateTeamSubmission(submission({ replicaCode: 42 })), { ok: false, error: "Invalid replica code" })
  })

  it("keeps the paste errors", () => {
    assert.deepEqual(validateTeamSubmission(submission({ showdown: "" })), { ok: false, error: "Team has no Pokémon" })
  })

  it("refuses a protected team", () => {
    const body = JSON.stringify({
      kind: "team",
      version: 1,
      protected: true,
      kdf: { salt: Buffer.alloc(16).toString("base64"), iterations: 100000 },
      iv: Buffer.alloc(12).toString("base64"),
      ciphertext: Buffer.alloc(17).toString("base64"),
      verifier: Buffer.alloc(32).toString("base64")
    })

    assert.deepEqual(validateTeamSubmission(body), { ok: false, error: "Protected teams cannot be submitted" })
  })

  it("requires a team name", () => {
    assert.deepEqual(validateTeamSubmission(submission({ name: undefined })), { ok: false, error: "Invalid name" })
    assert.deepEqual(validateTeamSubmission(submission({ name: "   " })), { ok: false, error: "Invalid name" })
  })

  it("requires a player of up to 40 characters without links", () => {
    assert.deepEqual(validateTeamSubmission(submission({ player: undefined })), { ok: false, error: "Invalid player" })
    assert.deepEqual(validateTeamSubmission(submission({ player: "  " })), { ok: false, error: "Invalid player" })
    assert.deepEqual(validateTeamSubmission(submission({ player: "a".repeat(41) })), { ok: false, error: "Invalid player" })
    assert.deepEqual(validateTeamSubmission(submission({ player: "visit my.site" })), { ok: false, error: "Invalid player" })
    assert.equal(validateTeamSubmission(submission({ player: "a".repeat(40) })).ok, true)
  })

  it("accepts only a Twitter handle of up to 15 letters, digits and underscores", () => {
    assert.deepEqual(validateTeamSubmission(submission({ handle: "@EricRios" })), { ok: false, error: "Invalid handle" })
    assert.deepEqual(validateTeamSubmission(submission({ handle: "a".repeat(16) })), { ok: false, error: "Invalid handle" })
    assert.deepEqual(validateTeamSubmission(submission({ handle: 42 })), { ok: false, error: "Invalid handle" })
    assert.equal(validateTeamSubmission(submission({ handle: "a".repeat(15) })).ok, true)
  })

  it("accepts an event of up to 60 characters without links", () => {
    assert.deepEqual(validateTeamSubmission(submission({ event: "a".repeat(61) })), { ok: false, error: "Invalid event" })
    assert.deepEqual(validateTeamSubmission(submission({ event: "https://example.com" })), { ok: false, error: "Invalid event" })
    assert.deepEqual(validateTeamSubmission(submission({ event: "   " })), { ok: false, error: "Invalid event" })
    assert.equal(validateTeamSubmission(submission({ event: "a".repeat(60) })).ok, true)
  })
})

describe("team members and SPs", () => {
  it("reads species and item of each member, leaving out a missing item", () => {
    assert.deepEqual(teamMembers(SHOWDOWN), [{ name: "Pelipper", item: "Damp Rock" }, { name: "Archaludon" }])
  })

  it("declares SPs when any member has an EVs line", () => {
    assert.equal(declaresSps(SHOWDOWN), true)
    assert.equal(declaresSps("Pelipper @ Damp Rock\n- Hurricane"), false)
  })
})

describe("team token", () => {
  it("draws 32 random bytes as base64url", () => {
    const sizes = []

    assert.equal(
      newTeamToken(size => sizes.push(size) && TOKEN_BYTES),
      TOKEN
    )
    assert.deepEqual(sizes, [32])
  })

  it("matches only the token that produced the hash", () => {
    const hash = teamTokenHash(TOKEN)

    assert.equal(hash, sha256Hex(TOKEN))
    assert.equal(isTeamTokenMatch(hash, TOKEN), true)
    assert.equal(isTeamTokenMatch(hash, "other"), false)
    assert.equal(isTeamTokenMatch(hash, ""), false)
    assert.equal(isTeamTokenMatch(hash, undefined), false)
  })
})

describe("team index", () => {
  const record = { pasteId: "a1B2c3D4e5", regulation: "M-C", name: "Rain", player: "Eric Rios", members: [{ name: "Pelipper" }], hasSps: false, createdAt: "2026-10-12T15:00:00.000Z", tokenHash: "hash", hidden: false }

  it("keeps the entry and index keys apart from the public pastes", () => {
    assert.equal(teamEntryKey("a1B2c3D4e5"), "teams/entries/a1B2c3D4e5.json")
    assert.equal(teamIndexKey("M-C"), "api/teams/index/m-c.json")
  })

  it("publishes only the public fields of a record", () => {
    assert.deepEqual(teamIndexEntry(record), {
      id: "a1B2c3D4e5",
      pasteId: "a1B2c3D4e5",
      description: "Rain",
      player: "Eric Rios",
      regulation: "M-C",
      date: "2026-10-12T15:00:00.000Z",
      hasSps: false,
      members: [{ name: "Pelipper" }],
      source: "community"
    })
    assert.deepEqual(teamIndexEntry({ ...record, handle: "EricRios", event: "Recife", replicaCode: "A4RBRNN9YE", placement: "5th" }), {
      ...teamIndexEntry(record),
      handle: "EricRios",
      event: "Recife",
      replicaCode: "A4RBRNN9YE",
      placement: "5th"
    })
  })

  it("adds an entry at the end, replacing an older one of the same paste", () => {
    const first = { pasteId: "first00000" }
    const second = { pasteId: "second0000" }

    assert.deepEqual(addToIndex([first, second], { pasteId: "first00000", updated: true }), [second, { pasteId: "first00000", updated: true }])
    assert.deepEqual(removeFromIndex([first, second], "first00000"), [second])
  })
})

describe("createTeamHandler", () => {
  it("saves the paste for 1 day, the private record and the public index entry, and answers with the paste id and token", async () => {
    const store = teamStore()

    const response = await createHandler(store)(post(submission()))

    assert.deepEqual(response, { statusCode: 201, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: JSON.stringify({ pasteId: "0123456789", token: TOKEN }) })
    assert.deepEqual(store.pastes.get("0123456789"), {
      paste: { kind: "team", version: 1, useSpsMode: true, showdown: SHOWDOWN, name: "Rain Archaludon", source: "community-team", createdAt: "2026-10-12T15:00:00.000Z" },
      cacheControl: "public, max-age=86400"
    })
    assert.deepEqual(store.entries.get("0123456789"), {
      name: "Rain Archaludon",
      player: "Eric Rios",
      handle: "Eric_Rios",
      event: "Recife Regional 2027",
      replicaCode: "A4RBRNN9YE",
      placement: "Top 8",
      pasteId: "0123456789",
      regulation: "M-C",
      members: [{ name: "Pelipper", item: "Damp Rock" }, { name: "Archaludon" }],
      hasSps: true,
      createdAt: "2026-10-12T15:00:00.000Z",
      tokenHash: sha256Hex(TOKEN),
      hidden: false
    })
    assert.deepEqual(store.indexes.get("M-C").index, [teamIndexEntry(store.entries.get("0123456789"))])
  })

  it("appends to an existing index", async () => {
    const existing = { pasteId: "zzzzzzzzzz" }
    const store = teamStore({ index: [existing] })

    await createHandler(store)(post(submission()))

    assert.deepEqual(
      store.indexes.get("M-C").index.map(entry => entry.pasteId),
      ["zzzzzzzzzz", "0123456789"]
    )
  })

  it("reads the index again after a concurrent change", async () => {
    const store = teamStore({ indexConflicts: 4 })

    const response = await createHandler(store)(post(submission()))

    assert.equal(response.statusCode, 201)
    assert.equal(store.indexes.get("M-C").index.length, 1)
  })

  it("answers 503 after five concurrent changes of the index", async () => {
    const store = teamStore({ indexConflicts: 5 })

    const response = await createHandler(store)(post(submission()))

    assert.deepEqual(response.statusCode, 503)
    assert.equal(JSON.parse(response.body).error, "Could not save the team")
  })

  it("draws a new id when the first one is taken and gives up after three", async () => {
    let call = 0
    const retried = teamStore({ takenIds: ["0123456789"] })
    const exhausted = teamStore({ takenIds: ["AAAAAAAAAA"] })

    const retriedResponse = await createTeamHandler({ store: retried, now: () => NOW, randomIndex: () => call++, randomBytes: () => TOKEN_BYTES, allowRequest: allowAll, regulation: "M-C" })(post(submission()))
    const exhaustedResponse = await createTeamHandler({ store: exhausted, now: () => NOW, randomIndex: () => 10, randomBytes: () => TOKEN_BYTES, allowRequest: allowAll, regulation: "M-C" })(post(submission()))

    assert.equal(JSON.parse(retriedResponse.body).pasteId, "ABCDEFGHIJ")
    assert.equal(exhaustedResponse.statusCode, 503)
    assert.equal(JSON.parse(exhaustedResponse.body).error, "Could not allocate an id")
    assert.equal(exhausted.entries.size, 0)
  })

  it("answers 503 without touching the index when the record cannot be saved", async () => {
    const store = teamStore({ takenEntries: ["0123456789"] })

    const response = await createHandler(store)(post(submission()))

    assert.equal(response.statusCode, 503)
    assert.equal(store.indexes.size, 0)
  })

  it("rejects an invalid team and a missing stamp", async () => {
    const store = teamStore()

    const invalid = await createHandler(store)(post(submission({ player: "" })))
    const unstamped = await createHandler(store)({ method: "POST", path: "/api/teams", headers: VIEWER, body: submission() })

    assert.deepEqual(JSON.parse(invalid.body), { error: "Invalid player" })
    assert.deepEqual([invalid.statusCode, unstamped.statusCode], [400, 400])
    assert.deepEqual(JSON.parse(unstamped.body), { error: "Invalid request" })
    assert.equal(store.pastes.size, 0)
  })

  it("answers 429 when the client is over the limit and rejects methods other than POST", async () => {
    const store = teamStore()

    const limited = await createHandler(store, () => false)(post(submission()))
    const wrongMethod = await createHandler(store)({ method: "GET", path: "/api/teams", headers: VIEWER, body: "" })

    assert.deepEqual([limited.statusCode, wrongMethod.statusCode], [429, 405])
    assert.equal(store.pastes.size, 0)
  })
})

describe("deleteTeamHandler", () => {
  async function storeWithTeam(options) {
    const store = teamStore(options)

    await createHandler(store)(post(submission()))

    return store
  }

  function remove(store, headers = { "x-team-token": TOKEN }, allowRequest = allowAll, path = "/api/teams/0123456789") {
    return deleteTeamHandler({ store, now: () => NOW, allowRequest })({ method: "DELETE", path, headers: { ...VIEWER, ...headers }, body: "" })
  }

  it("removes the index entry, the record and the paste with the right token", async () => {
    const store = await storeWithTeam()

    const response = await remove(store)

    assert.deepEqual(response, { statusCode: 204, headers: { "content-type": "application/json", "cache-control": "no-store" }, body: "" })
    assert.deepEqual(store.indexes.get("M-C").index, [])
    assert.deepEqual(store.deleted, ["entry:0123456789", "paste:0123456789"])
  })

  it("refuses a wrong or missing token without removing anything", async () => {
    const store = await storeWithTeam()

    const wrong = await remove(store, { "x-team-token": "other" })
    const missing = await remove(store, {})

    assert.deepEqual([wrong.statusCode, missing.statusCode], [401, 401])
    assert.deepEqual(JSON.parse(wrong.body), { error: "Wrong token" })
    assert.equal(store.indexes.get("M-C").index.length, 1)
    assert.deepEqual(store.deleted, [])
  })

  it("answers 404 for a missing or malformed team", async () => {
    const store = teamStore()

    const missing = await remove(store)
    const malformed = await remove(store, { "x-team-token": TOKEN }, allowAll, "/api/teams/bad")

    assert.deepEqual([missing.statusCode, malformed.statusCode], [404, 404])
  })

  it("answers 503 and keeps the record when the index keeps changing", async () => {
    const store = await storeWithTeam()
    const conflicting = { ...store, replaceIndex: async () => false }

    const response = await remove(conflicting)

    assert.equal(response.statusCode, 503)
    assert.deepEqual(store.deleted, [])
  })

  it("answers 429 when the client is over the limit and rejects methods other than DELETE", async () => {
    const store = await storeWithTeam()

    const limited = await remove(store, { "x-team-token": TOKEN }, () => false)
    const wrongMethod = await deleteTeamHandler({ store, now: () => NOW, allowRequest: allowAll })({ method: "POST", path: "/api/teams/0123456789", headers: VIEWER, body: "" })

    assert.deepEqual([limited.statusCode, wrongMethod.statusCode], [429, 405])
    assert.deepEqual(store.deleted, [])
  })
})

describe("pasteApiHandler with teams", () => {
  const handler = pasteApiHandler({ createPaste: async () => "create", unlockPaste: async () => "unlock", createTeam: async () => "create team", deleteTeam: async () => "delete team" })

  it("sends the team collection to the create team handler and a team path to the delete team handler", async () => {
    assert.equal(await handler({ path: "/api/teams" }), "create team")
    assert.equal(await handler({ path: "/api/teams/" }), "create team")
    assert.equal(await handler({ path: "/api/teams/a1B2c3D4e5" }), "delete team")
  })
})
