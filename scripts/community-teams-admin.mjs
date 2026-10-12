import { execFile } from "node:child_process"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { promisify } from "node:util"
import { pasteKey, TEAM_SOURCE, teamEntryKey, teamIndexEntry, teamIndexKey } from "../infra/modules/pastes/lambda/core.mjs"

const ENVIRONMENTS = {
  dev: { bucket: "vgcmulticalc-dev-pastes", origin: "https://daxlgsrbxnzt9.cloudfront.net" },
  prod: { bucket: "vgcmulticalc-pastes", origin: "https://vgcmulticalc.com" }
}

const ENTRIES_PREFIX = "teams/entries/"
const PASTES_PREFIX = "api/pastes/"
const INDEX_CACHE_CONTROL = "public, max-age=60"
const MAX_INDEX_WRITES = 5
const READ_CONCURRENCY = 8
const DEFAULT_DAYS = 7
const DAY_MS = 86400000

const USAGE = `Usage: node scripts/community-teams-admin.mjs <dev|prod> <command>

Commands:
  list [--days N]            Submitted teams of the last N days (default ${DEFAULT_DAYS})
  hide <pasteId>             Take a team out of the list, keeping its paste
  unhide <pasteId>           Put a hidden team back in the list
  delete <pasteId>           Delete the team and its paste
  rebuild-index <regulation> Rebuild the public list of a regulation from the records
  orphans [--days N] [--delete]
                             Team pastes of the last N days without a record`

const run = promisify(execFile)
const workDir = mkdtempSync(join(tmpdir(), "community-teams-admin-"))
let fileCount = 0

const [environmentName, command, ...args] = process.argv.slice(2)
const environment = ENVIRONMENTS[environmentName]

async function aws(...awsArgs) {
  const { stdout } = await run("aws", awsArgs, { maxBuffer: 64 * 1024 * 1024 })

  return stdout
}

function workFile() {
  fileCount++

  return join(workDir, `object-${fileCount}.json`)
}

async function readJson(key) {
  const file = workFile()

  try {
    const meta = JSON.parse(await aws("s3api", "get-object", "--bucket", environment.bucket, "--key", key, file))

    return { value: JSON.parse(readFileSync(file, "utf8")), etag: meta.ETag }
  } catch (error) {
    if (/NoSuchKey|Not Found|404/.test(error.stderr ?? "")) return null

    throw error
  }
}

async function putJson(key, value, { cacheControl, ifMatch, ifNoneMatch } = {}) {
  const file = workFile()

  writeFileSync(file, JSON.stringify(value))

  try {
    await aws(
      "s3api",
      "put-object",
      "--bucket",
      environment.bucket,
      "--key",
      key,
      "--body",
      file,
      "--content-type",
      "application/json",
      ...(cacheControl ? ["--cache-control", cacheControl] : []),
      ...(ifMatch ? ["--if-match", ifMatch] : []),
      ...(ifNoneMatch ? ["--if-none-match", ifNoneMatch] : [])
    )

    return true
  } catch (error) {
    if (/PreconditionFailed|ConditionalRequestConflict|412|409/.test(error.stderr ?? "")) return false

    throw error
  }
}

async function deleteKey(key) {
  await aws("s3api", "delete-object", "--bucket", environment.bucket, "--key", key)
}

async function listObjects(prefix) {
  const objects = JSON.parse(await aws("s3api", "list-objects-v2", "--bucket", environment.bucket, "--prefix", prefix, "--query", "Contents[].{key: Key, modified: LastModified}", "--output", "json"))

  return objects ?? []
}

async function inBatches(items, read) {
  const results = []

  for (let start = 0; start < items.length; start += READ_CONCURRENCY) {
    results.push(...(await Promise.all(items.slice(start, start + READ_CONCURRENCY).map(read))))
  }

  return results
}

async function records() {
  const objects = await listObjects(ENTRIES_PREFIX)
  const found = await inBatches(objects, async object => (await readJson(object.key))?.value)

  return found.filter(Boolean)
}

function option(name, fallback) {
  const index = args.indexOf(name)

  return index >= 0 ? Number(args[index + 1]) : fallback
}

function since(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString()
}

function pasteLink(pasteId) {
  return `${environment.origin}/paste/${pasteId}`
}

function describe(record) {
  const details = [record.handle ? `${record.player} (@${record.handle})` : record.player, record.event, record.placement, record.replicaCode].filter(Boolean).join(", ")

  return `${record.createdAt.slice(0, 16).replace("T", " ")}  ${record.pasteId}  ${record.regulation}  ${record.hidden ? "[hidden] " : ""}${record.name}\n    ${details}\n    ${pasteLink(record.pasteId)}`
}

async function list() {
  const days = option("--days", DEFAULT_DAYS)
  const recent = (await records()).filter(record => record.createdAt >= since(days)).sort((first, second) => second.createdAt.localeCompare(first.createdAt))

  console.log(recent.length ? recent.map(describe).join("\n\n") : `No teams submitted in the last ${days} days.`)
}

async function rebuildIndex(regulation) {
  for (let attempt = 0; attempt < MAX_INDEX_WRITES; attempt++) {
    const current = await readJson(teamIndexKey(regulation))
    const index = (await records())
      .filter(record => record.regulation === regulation && !record.hidden)
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt))
      .map(teamIndexEntry)

    if (await putJson(teamIndexKey(regulation), index, { cacheControl: INDEX_CACHE_CONTROL, ...(current ? { ifMatch: current.etag } : { ifNoneMatch: "*" }) })) {
      console.log(`${regulation}: ${index.length} teams in the public list.`)
      return
    }
  }

  throw new Error(`The ${regulation} list kept changing; run rebuild-index again.`)
}

async function requiredRecord(pasteId) {
  const found = await readJson(teamEntryKey(pasteId))

  if (!found) throw new Error(`No submitted team with paste ${pasteId}.`)

  return found
}

async function setHidden(pasteId, hidden) {
  const { value: record, etag } = await requiredRecord(pasteId)

  if (record.hidden === hidden) {
    console.log(`${record.name} is already ${hidden ? "hidden" : "visible"}.`)
    return
  }

  if (!(await putJson(teamEntryKey(pasteId), { ...record, hidden }, { ifMatch: etag }))) throw new Error("The team changed meanwhile; try again.")

  console.log(`${record.name} is now ${hidden ? "hidden" : "visible"}.`)
  await rebuildIndex(record.regulation)
}

async function remove(pasteId) {
  const found = await readJson(teamEntryKey(pasteId))
  const paste = await readJson(pasteKey(pasteId))

  if (!found && paste?.value.source !== TEAM_SOURCE) throw new Error(`No submitted team with paste ${pasteId}.`)

  if (found) {
    await deleteKey(teamEntryKey(pasteId))
    await rebuildIndex(found.value.regulation)
  }

  if (paste) await deleteKey(pasteKey(pasteId))

  console.log(`Deleted ${found?.value.name ?? pasteId}. Cached copies of the paste expire within 1 day.`)
}

async function orphans() {
  const days = option("--days", DEFAULT_DAYS)
  const recentPastes = (await listObjects(PASTES_PREFIX)).filter(object => object.modified >= since(days))
  const pasteIds = recentPastes.map(object => object.key.slice(PASTES_PREFIX.length))
  const checked = await inBatches(pasteIds, async pasteId => {
    const paste = await readJson(pasteKey(pasteId))

    return paste?.value.source === TEAM_SOURCE && !(await readJson(teamEntryKey(pasteId))) ? pasteId : null
  })
  const found = checked.filter(Boolean)

  if (!found.length) {
    console.log(`No team pastes without a record in the last ${days} days.`)
    return
  }

  for (const pasteId of found) {
    if (args.includes("--delete")) await deleteKey(pasteKey(pasteId))

    console.log(`${args.includes("--delete") ? "Deleted" : "Orphan"}  ${pasteLink(pasteId)}`)
  }
}

const COMMANDS = {
  list: () => list(),
  hide: () => setHidden(args[0], true),
  unhide: () => setHidden(args[0], false),
  delete: () => remove(args[0]),
  "rebuild-index": () => rebuildIndex(args[0]),
  orphans: () => orphans()
}

const NEEDS_ARGUMENT = ["hide", "unhide", "delete", "rebuild-index"]

try {
  if (!environment || !COMMANDS[command] || (NEEDS_ARGUMENT.includes(command) && !args[0])) {
    console.error(USAGE)
    process.exitCode = 1
  } else {
    await COMMANDS[command]()
  }
} catch (error) {
  console.error(error.stderr?.trim() || error.message)
  process.exitCode = 1
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
