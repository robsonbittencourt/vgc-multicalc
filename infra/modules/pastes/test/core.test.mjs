import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createHash } from "node:crypto"
import {
  clientKey,
  escapeHtml,
  isPasteId,
  isValidStamp,
  isVerifierMatch,
  leadingZeroBits,
  lockedSecondsLeft,
  lockSeconds,
  newPasteId,
  parseSpecies,
  pasteKey,
  renderPastePage,
  requestLimiter,
  secretKey,
  sha256Hex,
  STAMP_BITS,
  stampDay,
  validatePaste,
  validateUnlock
} from "../lambda/core.mjs"

const SHOWDOWN = `Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 4 Def / 30 SpD
Careful Nature
- Fake Out
- Knock Off

Kingambit (M) @ Black Glasses
Ability: Defiant
- Kowtow Cleave

Gambit (Kingambit) @ Leftovers
- Protect
`

const SALT = Buffer.alloc(16, 1).toString("base64")
const IV = Buffer.alloc(12, 2).toString("base64")
const VERIFIER = Buffer.alloc(32, 3).toString("base64")
const CIPHERTEXT = Buffer.alloc(20, 4).toString("base64")
const VERIFIER_HASH = createHash("sha256").update(Buffer.alloc(32, 3)).digest("hex")

const protectedBody = overrides => JSON.stringify({ kind: "team", version: 1, protected: true, kdf: { salt: SALT, iterations: 600000 }, iv: IV, ciphertext: CIPHERTEXT, verifier: VERIFIER, ...overrides })

const validBody = overrides => JSON.stringify({ kind: "team", version: 1, name: "Sun Balance", useSpsMode: true, showdown: SHOWDOWN, ...overrides })

describe("newPasteId", () => {
  it("builds a 10 character id from the random indexes", () => {
    const indexes = [0, 1, 10, 35, 36, 61, 2, 3, 4, 5]
    let call = 0

    const id = newPasteId(() => indexes[call++])

    assert.equal(id, "01AZaz2345")
  })
})

describe("isPasteId", () => {
  it("accepts a 10 character alphanumeric id", () => {
    assert.equal(isPasteId("a1B2c3D4e5"), true)
  })

  it("rejects ids with other lengths or characters", () => {
    assert.equal(isPasteId("a1B2c3D4e"), false)
    assert.equal(isPasteId("a1B2c3D4e5f"), false)
    assert.equal(isPasteId("a1B2c3D4e/"), false)
    assert.equal(isPasteId(undefined), false)
  })
})

describe("pasteKey", () => {
  it("mirrors the served path", () => {
    assert.equal(pasteKey("a1B2c3D4e5"), "api/pastes/a1B2c3D4e5")
  })
})

describe("secretKey", () => {
  it("lives outside the served path", () => {
    assert.equal(secretKey("a1B2c3D4e5"), "protected/a1B2c3D4e5")
  })
})

describe("parseSpecies", () => {
  it("lists the species of each set, ignoring gender and nicknames", () => {
    assert.deepEqual(parseSpecies(SHOWDOWN), ["Incineroar", "Kingambit", "Kingambit"])
  })

  it("ignores team headers and supports sets without item", () => {
    assert.deepEqual(parseSpecies("=== [gen9] Sun ===\n\nFlutter Mane\nAbility: Protosynthesis\n\r\nAmoonguss @ Rocky Helmet"), ["Flutter Mane", "Amoonguss"])
  })
})

describe("validatePaste", () => {
  it("keeps only the known fields of a valid team", () => {
    const result = validatePaste(validBody({ createdAt: "2000-01-01T00:00:00Z", mode: "champions", extra: "x" }))

    assert.deepEqual(result, { ok: true, paste: { kind: "team", version: 1, useSpsMode: true, showdown: SHOWDOWN, name: "Sun Balance" } })
  })

  it("accepts a name with dots that is not a link", () => {
    const result = validatePaste(validBody({ name: "Mr. Mime Trick Room v1.2" }))

    assert.equal(result.paste.name, "Mr. Mime Trick Room v1.2")
  })

  it("omits a blank name", () => {
    const result = validatePaste(validBody({ name: "  " }))

    assert.equal(result.ok, true)
    assert.equal("name" in result.paste, false)
  })

  it("accepts a team without name in EVs", () => {
    const result = validatePaste(validBody({ name: undefined, useSpsMode: false }))

    assert.deepEqual(result, { ok: true, paste: { kind: "team", version: 1, useSpsMode: false, showdown: SHOWDOWN } })
  })

  const invalidCases = [
    ["an empty body", "", "Empty body"],
    ["a body that is not a string", undefined, "Empty body"],
    ["a body over 10 KB", validBody({ showdown: "Incineroar\n" + "x".repeat(10240) }), "Body too large"],
    ["a body that is not JSON", "{", "Body is not JSON"],
    ["a JSON array", "[]", "Body must be an object"],
    ["a JSON null", "null", "Body must be an object"],
    ["another kind", validBody({ kind: "calc" }), "Unsupported kind"],
    ["another version", validBody({ version: 2 }), "Unsupported version"],
    ["a non boolean useSpsMode", validBody({ useSpsMode: "true" }), "useSpsMode must be a boolean"],
    ["a non string name", validBody({ name: 42 }), "Invalid name"],
    ["a name over 60 characters", validBody({ name: "x".repeat(61) }), "Invalid name"],
    ["a name with a link", validBody({ name: "Free stuff at https://example.com" }), "Invalid name"],
    ["a name with a www address", validBody({ name: "Rain www.example" }), "Invalid name"],
    ["a name with a domain", validBody({ name: "join discord.gg/abc" }), "Invalid name"],
    ["a non string showdown", validBody({ showdown: ["Incineroar"] }), "showdown must be a string"],
    ["a team without Pokémon", validBody({ showdown: "\n\n" }), "Team has no Pokémon"],
    ["a team with 7 Pokémon", validBody({ showdown: Array.from({ length: 7 }, () => "Pikachu").join("\n\n") }), "Team has more than 6 Pokémon"]
  ]

  for (const [description, body, error] of invalidCases) {
    it(`rejects ${description}`, () => {
      assert.deepEqual(validatePaste(body), { ok: false, error })
    })
  }
})

describe("validatePaste of a protected team", () => {
  it("splits the public stub from the secret, keeping only the hash of the verifier", () => {
    const result = validatePaste(protectedBody({ name: "leak", showdown: "leak" }))

    assert.deepEqual(result, {
      ok: true,
      paste: { kind: "team", version: 1, protected: true, kdf: { salt: SALT, iterations: 600000 } },
      secret: { iv: IV, ciphertext: CIPHERTEXT, verifierHash: VERIFIER_HASH, failedAttempts: 0, lockedUntil: null }
    })
  })

  const invalidCases = [
    ["a missing kdf", protectedBody({ kdf: undefined }), "Invalid salt"],
    ["a salt that is not base64", protectedBody({ kdf: { salt: "not base64!", iterations: 600000 } }), "Invalid salt"],
    ["a salt of another size", protectedBody({ kdf: { salt: IV, iterations: 600000 } }), "Invalid salt"],
    ["non integer iterations", protectedBody({ kdf: { salt: SALT, iterations: 600000.5 } }), "Invalid iterations"],
    ["iterations below 100000", protectedBody({ kdf: { salt: SALT, iterations: 99999 } }), "Invalid iterations"],
    ["iterations above 10000000", protectedBody({ kdf: { salt: SALT, iterations: 10000001 } }), "Invalid iterations"],
    ["an iv of another size", protectedBody({ iv: SALT }), "Invalid iv"],
    ["a ciphertext that is not a string", protectedBody({ ciphertext: 42 }), "Invalid ciphertext"],
    ["a ciphertext shorter than the auth tag plus one byte", protectedBody({ ciphertext: Buffer.alloc(16).toString("base64") }), "Invalid ciphertext"],
    ["a verifier of another size", protectedBody({ verifier: SALT }), "Invalid verifier"]
  ]

  for (const [description, body, error] of invalidCases) {
    it(`rejects ${description}`, () => {
      assert.deepEqual(validatePaste(body), { ok: false, error })
    })
  }
})

describe("validateUnlock", () => {
  it("answers with the hash of the verifier", () => {
    assert.deepEqual(validateUnlock(JSON.stringify({ verifier: VERIFIER })), { ok: true, verifierHash: VERIFIER_HASH })
  })

  it("rejects a body that is not JSON", () => {
    assert.deepEqual(validateUnlock("{"), { ok: false, error: "Body is not JSON" })
  })

  it("rejects a null body and a verifier of another size", () => {
    assert.deepEqual(validateUnlock("null"), { ok: false, error: "Invalid verifier" })
    assert.deepEqual(validateUnlock(JSON.stringify({ verifier: SALT })), { ok: false, error: "Invalid verifier" })
  })
})

describe("isVerifierMatch", () => {
  it("compares the stored hash with the hash of the attempt", () => {
    const otherHash = createHash("sha256").update("other").digest("hex")

    assert.equal(isVerifierMatch({ verifierHash: VERIFIER_HASH }, VERIFIER_HASH), true)
    assert.equal(isVerifierMatch({ verifierHash: VERIFIER_HASH }, otherHash), false)
  })
})

describe("lockSeconds", () => {
  it("allows 5 free attempts, then doubles the lock from 1 minute up to 60 minutes", () => {
    assert.deepEqual([1, 4, 5, 6, 7, 10, 11, 20].map(lockSeconds), [0, 0, 60, 120, 240, 1920, 3600, 3600])
  })
})

describe("lockedSecondsLeft", () => {
  const now = new Date("2026-09-29T12:00:00.000Z")

  it("is zero without a lock or after it expires", () => {
    assert.equal(lockedSecondsLeft({ lockedUntil: null }, now), 0)
    assert.equal(lockedSecondsLeft({ lockedUntil: "2026-09-29T11:59:00.000Z" }, now), 0)
  })

  it("rounds the remaining time up to whole seconds", () => {
    assert.equal(lockedSecondsLeft({ lockedUntil: "2026-09-29T12:01:30.200Z" }, now), 91)
  })
})

describe("renderPastePage", () => {
  const baseHtml =
    '<html><head><title>Page Not Found - VGC Multi Calc</title><meta name="description" content="old"><meta property="og:title" content="old"><meta property="og:url" content="https://vgcmulticalc.com/"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="https://vgcmulticalc.com/"><meta name="robots" content="noindex, follow"></head><body><app-root></app-root></body></html>'

  it("replaces the title and the social tags with the ones of the team", () => {
    const html = renderPastePage(baseHtml, { name: "Sun <Balance>", showdown: SHOWDOWN }, "https://vgcmulticalc.com/assets/icons/calc-512x512.png")

    assert.equal(
      html,
      '<html><head><title>Sun &lt;Balance&gt; · Paste — VGC Multi Calc</title><meta name="robots" content="noindex, follow">' +
        '<meta property="og:title" content="Sun &lt;Balance&gt; · Paste — VGC Multi Calc">' +
        '<meta property="og:type" content="website">' +
        '<meta property="og:site_name" content="VGC Multi Calc">' +
        '<meta property="og:image" content="https://vgcmulticalc.com/assets/icons/calc-512x512.png">' +
        '<meta property="og:image:type" content="image/png">' +
        '<meta property="og:image:width" content="1200">' +
        '<meta property="og:image:height" content="630">' +
        '<meta name="twitter:card" content="summary_large_image">' +
        '<meta name="twitter:title" content="Sun &lt;Balance&gt; · Paste — VGC Multi Calc">' +
        '<meta name="twitter:image" content="https://vgcmulticalc.com/assets/icons/calc-512x512.png">' +
        "</head><body><app-root></app-root></body></html>"
    )
  })

  it("uses a generic title for a team without name, adds noindex when missing and leaves the description out", () => {
    const html = renderPastePage("<html><head><title>x</title></head></html>", { showdown: "Pikachu" }, "img")

    assert.equal(
      html,
      '<html><head><title>Pokémon team · Paste — VGC Multi Calc</title><meta name="robots" content="noindex, follow">' +
        '<meta property="og:title" content="Pokémon team · Paste — VGC Multi Calc">' +
        '<meta property="og:type" content="website">' +
        '<meta property="og:site_name" content="VGC Multi Calc">' +
        '<meta property="og:image" content="img">' +
        '<meta property="og:image:type" content="image/png">' +
        '<meta property="og:image:width" content="1200">' +
        '<meta property="og:image:height" content="630">' +
        '<meta name="twitter:card" content="summary_large_image">' +
        '<meta name="twitter:title" content="Pokémon team · Paste — VGC Multi Calc">' +
        '<meta name="twitter:image" content="img">' +
        "</head></html>"
    )
  })
})

describe("renderPastePage with replacement patterns in the name", () => {
  it("keeps the name literal", () => {
    const html = renderPastePage("<html><head><title>x</title></head><body></body></html>", { name: "Rain $' $` $&", showdown: "Pikachu" }, "img")

    assert.match(html, /<title>Rain \$&#39; \$` \$&amp; · Paste — VGC Multi Calc<\/title>/)
    assert.match(html, /<meta name="twitter:title" content="Rain \$&#39; \$` \$&amp; · Paste — VGC Multi Calc"><meta name="twitter:image" content="img"><\/head><body><\/body><\/html>$/)
  })
})

describe("renderPastePage of a protected team", () => {
  it("reveals neither the team nor an image", () => {
    const html = renderPastePage("<html><head><title>x</title></head></html>", { kind: "team", version: 1, protected: true }, "img")

    assert.equal(
      html,
      '<html><head><title>Protected Paste — VGC Multi Calc</title><meta name="robots" content="noindex, follow">' +
        '<meta property="og:title" content="Protected Paste — VGC Multi Calc">' +
        '<meta property="og:type" content="website">' +
        '<meta property="og:site_name" content="VGC Multi Calc">' +
        '<meta name="twitter:card" content="summary">' +
        '<meta name="twitter:title" content="Protected Paste — VGC Multi Calc">' +
        "</head></html>"
    )
  })
})

describe("escapeHtml", () => {
  it("escapes the html special characters", () => {
    assert.equal(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`), "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;")
  })
})

describe("stampDay", () => {
  it("counts whole UTC days since the epoch", () => {
    assert.equal(stampDay(new Date("2026-09-28T00:00:00.000Z")), 20724)
    assert.equal(stampDay(new Date("2026-09-28T23:59:59.999Z")), 20724)
  })
})

describe("sha256Hex", () => {
  it("hashes the utf8 text", () => {
    assert.equal(sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
  })
})

describe("leadingZeroBits", () => {
  it("counts the zero bits before the first set bit", () => {
    assert.equal(leadingZeroBits(Uint8Array.from([0x80])), 0)
    assert.equal(leadingZeroBits(Uint8Array.from([0x0f, 0xff])), 4)
    assert.equal(leadingZeroBits(Uint8Array.from([0x00, 0x00, 0x01])), 23)
  })

  it("counts every bit of an all zero input", () => {
    assert.equal(leadingZeroBits(Uint8Array.from([0, 0])), 16)
  })
})

describe("isValidStamp", () => {
  const body = '{"kind":"team"}'
  const now = new Date("2026-09-28T12:00:00.000Z")

  function stampFor(day, text = body, wanted = bits => bits >= STAMP_BITS) {
    for (let nonce = 0; ; nonce++) {
      if (
        wanted(
          leadingZeroBits(
            createHash("sha256")
              .update(`${day}.${nonce}.${sha256Hex(text)}`)
              .digest()
          )
        )
      )
        return `${day}.${nonce}`
    }
  }

  it("accepts a stamp of today, yesterday or tomorrow", () => {
    assert.equal(isValidStamp(stampFor(20724), body, now), true)
    assert.equal(isValidStamp(stampFor(20723), body, now), true)
    assert.equal(isValidStamp(stampFor(20725), body, now), true)
  })

  it("rejects a stamp of another day", () => {
    assert.equal(isValidStamp(stampFor(20722), body, now), false)
    assert.equal(isValidStamp(stampFor(20726), body, now), false)
  })

  it("rejects a stamp made for another body", () => {
    assert.equal(isValidStamp(stampFor(20724, '{"kind":"other"}'), body, now), false)
  })

  it("rejects a stamp without enough zero bits", () => {
    assert.equal(
      isValidStamp(
        stampFor(20724, body, bits => bits < STAMP_BITS),
        body,
        now
      ),
      false
    )
  })

  it("rejects a missing or malformed stamp", () => {
    assert.equal(isValidStamp(undefined, body, now), false)
    assert.equal(isValidStamp("20724", body, now), false)
    assert.equal(isValidStamp("20724.x", body, now), false)
    assert.equal(isValidStamp("20724.12345678901", body, now), false)
  })
})

describe("clientKey", () => {
  it("uses the IPv4 address without the port", () => {
    assert.equal(clientKey("203.0.113.7:51234"), "203.0.113.7")
  })

  it("groups IPv6 addresses by their /64 prefix", () => {
    assert.equal(clientKey("2001:db8:85a3:0042:1000:8a2e:370:7334:443"), "2001:db8:85a3:42::/64")
    assert.equal(clientKey("2001:db8:85a3:42::9:51234"), "2001:db8:85a3:42::/64")
    assert.equal(clientKey("2001:db8::1:51234"), "2001:db8:0:0::/64")
    assert.equal(clientKey("::1:51234"), "0:0:0:0::/64")
  })

  it("falls back to a shared key without an address", () => {
    assert.equal(clientKey(undefined), "unknown")
    assert.equal(clientKey("203.0.113.7"), "unknown")
    assert.equal(clientKey(":80"), "unknown")
  })
})

describe("requestLimiter", () => {
  const start = new Date("2026-09-28T12:00:00.000Z")
  const at = ms => new Date(start.getTime() + ms)

  it("allows up to the limit inside the window and blocks the rest", () => {
    const allow = requestLimiter(3, 60000)

    const results = [0, 1000, 2000, 3000, 59999].map(ms => allow("a", at(ms)))

    assert.deepEqual(results, [true, true, true, false, false])
  })

  it("starts a new window after it expires", () => {
    const allow = requestLimiter(1, 60000)

    assert.equal(allow("a", at(0)), true)
    assert.equal(allow("a", at(1)), false)
    assert.equal(allow("a", at(60000)), true)
  })

  it("counts each client apart", () => {
    const allow = requestLimiter(1, 60000)

    assert.equal(allow("a", at(0)), true)
    assert.equal(allow("b", at(0)), true)
    assert.equal(allow("a", at(1)), false)
  })

  it("forgets expired clients when too many are tracked", () => {
    const allow = requestLimiter(1, 60000, 2)

    allow("a", at(0))
    allow("b", at(30000))
    allow("c", at(61000))

    assert.equal(allow("a", at(61001)), true)
    assert.equal(allow("b", at(61002)), false)
  })

  it("uses 30 requests per minute by default", () => {
    const allow = requestLimiter()

    const allowed = Array.from({ length: 31 }, (_, i) => allow("a", at(i))).filter(Boolean).length

    assert.equal(allowed, 30)
  })
})
