import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")
const sharedTeamsDir = resolve(root, "tmp")
const publishedPastesFile = resolve(root, "scripts/community-team-pastes.dev.json")

const DEV_PASTES_API = "https://daxlgsrbxnzt9.cloudfront.net/api/pastes"
const STAMP_BITS = 12
const DAY_MS = 86400000
const REQUEST_INTERVAL_MS = 2400
const RATE_LIMIT_WAIT_MS = 60000
const MAX_ATTEMPTS = 5
const PROGRESS_EVERY = 25

const sleep = ms => new Promise(done => setTimeout(done, ms))

function sha256(text) {
  return createHash("sha256").update(text, "utf8")
}

function leadingZeroBits(bytes) {
  let bits = 0

  for (const byte of bytes) {
    if (byte !== 0) return bits + Math.clz32(byte) - 24

    bits += 8
  }

  return bits
}

function createStamp(bodyHash, date) {
  const day = Math.floor(date.getTime() / DAY_MS)

  for (let nonce = 0; ; nonce++) {
    if (leadingZeroBits(sha256(`${day}.${nonce}.${bodyHash}`).digest()) >= STAMP_BITS) return `${day}.${nonce}`
  }
}

async function publish(team) {
  const body = JSON.stringify(team)
  const bodyHash = sha256(body).digest("hex")

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const response = await fetch(DEV_PASTES_API, {
      method: "POST",
      headers: { "content-type": "application/json", "x-amz-content-sha256": bodyHash, "x-paste-stamp": createStamp(bodyHash, new Date()) },
      body
    }).catch(() => undefined)

    if (response?.ok) return (await response.json()).id

    if (response?.status === 429) {
      console.log(`rate limited, waiting ${RATE_LIMIT_WAIT_MS / 1000}s`)
      await sleep(RATE_LIMIT_WAIT_MS)
      continue
    }

    if (response && response.status < 500) throw new Error(`Paste rejected (${response.status}): ${await response.text()}`)

    await sleep(REQUEST_INTERVAL_MS * attempt)
  }

  throw new Error("Could not publish the paste")
}

const teams = Object.assign(
  {},
  ...readdirSync(sharedTeamsDir)
    .filter(file => /^community-teams-shared-[a-z0-9-]+\.json$/.test(file))
    .map(file => JSON.parse(readFileSync(resolve(sharedTeamsDir, file), "utf8")))
)
const published = existsSync(publishedPastesFile) ? JSON.parse(readFileSync(publishedPastesFile, "utf8")) : {}
const limitArg = process.argv.indexOf("--limit")
const limit = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : Infinity
const pending = Object.keys(teams)
  .filter(id => !published[id])
  .slice(0, limit)

console.log(`${Object.keys(published).length} already published, ${pending.length} to publish`)

for (const [index, id] of pending.entries()) {
  published[id] = await publish(teams[id])
  writeFileSync(publishedPastesFile, JSON.stringify(published, null, 2) + "\n")

  if ((index + 1) % PROGRESS_EVERY === 0) console.log(`published ${index + 1}/${pending.length}`)

  await sleep(REQUEST_INTERVAL_MS)
}

console.log(`done: ${Object.keys(published).length} pastes in ${publishedPastesFile}`)
