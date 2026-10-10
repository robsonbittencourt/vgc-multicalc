import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")
const outputDir = resolve(root, "src/domain/data/community-teams")
const pasteCacheDir = resolve(root, "tmp/community-teams-pastes")
const sharedTeamsDir = resolve(root, "tmp")
const publishedPastesFile = resolve(root, "scripts/community-team-pastes.dev.json")

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1axlwmzPA49rYkqXh7zHvAtSP-TKbM0ijGYBPRflLSWw/export?format=csv&gid="
const REGULATION_SHEETS = { "M-A": "791705272", "M-B": "1458357160", "M-C": "2001945654" }
const SETS_BLOCK_SIZE = 20
const MOCK_PASTE_ID = "BOC3ZwOotx"
const SPECIES_ALIASES = { "Floette-Eternal-Mega": "Floette-Mega", Aegislash: "Aegislash-Shield" }
const SHOWDOWN_NAMES = { "Aegislash-Shield": "Aegislash", "Aegislash-Blade": "Aegislash" }
const MONTHS = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" }
const NO_ITEM = new Set(["no item", "no item info", "none", "(none)"])
const NOT_EVENTS = new Set(["video"])
const MEGA_BY_PASTE_SPECIES = { "Meowstic-Mega": { Meowstic: "Meowstic-M-Mega", "Meowstic-M": "Meowstic-M-Mega", "Meowstic-F": "Meowstic-F-Mega" } }
const MAX_EV_PER_STAT = 252
const MAX_EV_TOTAL = 510

const STAT_KEYS = { HP: "hp", Atk: "atk", Def: "def", SpA: "spa", SpD: "spd", Spe: "spe" }
const MAX_SP_PER_STAT = 32
const MAX_SP_TOTAL = 66
const MAX_PASTE_NAME_LENGTH = 60
const STAT_LABELS = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"]
const AUDIT = process.argv.includes("--audit")
const AUDIT_EXAMPLES = 8
const PASTE_CONCURRENCY = 3
const PASTE_RETRIES = 3

const COLUMNS = {
  id: 0,
  description: 1,
  player: 3,
  items: [7, 10, 13, 16, 19, 22],
  pokepaste: 24,
  replicaCode: 28,
  date: 29,
  event: 30,
  placement: 31,
  handle: 35,
  species: [37, 38, 39, 40, 41, 42]
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ""
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (char === '"') {
        quoted = false
      } else {
        field += char
      }
    } else if (char === '"') {
      quoted = true
    } else if (char === ",") {
      row.push(field)
      field = ""
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""))
      rows.push(row)
      row = []
      field = ""
    } else {
      field += char
    }
  }

  if (field || row.length) rows.push([...row, field])

  return rows
}

const problems = []

function problem(kind, message) {
  if (!AUDIT) throw new Error(message)

  problems.push({ kind, message })
}

function warning(kind, message) {
  problems.push({ kind, message })
}

function printAudit() {
  const byKind = Map.groupBy(problems, entry => entry.kind)

  if (!byKind.size) console.log("audit: no problems")

  byKind.forEach((entries, kind) => {
    console.log(`\n${kind}: ${entries.length}`)
    entries.slice(0, AUDIT_EXAMPLES).forEach(entry => console.log(`  ${entry.message}`))
  })
}

function knownNames(file, pattern) {
  const source = readFileSync(resolve(root, file), "utf8")

  return new Set([...source.matchAll(pattern)].map(match => match[1]))
}

function isoDate(value) {
  const match = value.trim().match(/^(\d{1,2})(?:st|nd|rd|th)? ([A-Za-z]+) (\d{4})$/)
  const month = match && MONTHS[match[2].slice(0, 3).toLowerCase()]

  if (!month) {
    problem("unexpected date", `Unexpected date: "${value}"`)
    return value
  }

  return `${match[3]}-${month}-${match[1].padStart(2, "0")}`
}

function present(value) {
  const trimmed = decodeEntities(value).trim()

  return trimmed && trimmed !== "-" && trimmed !== "None" ? trimmed : undefined
}

function eventOf(value) {
  const event = present(value)

  return event && !NOT_EVENTS.has(event.toLowerCase()) ? event : undefined
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
}

function nameKey(name) {
  return decodeEntities(name)
    .replace(/[\u2018\u2019]/g, "'")
    .trim()
    .toLowerCase()
}

function catalog(file, pattern) {
  const names = knownNames(file, pattern)

  return new Map([...names].map(name => [nameKey(name), name]))
}

function canonical(names, kind, name, where) {
  const known = names.get(nameKey(name))

  if (known) return known

  if (kind === "item") warning("item kept, unknown to the calc", `${where}: item "${name}"`)
  else problem("unknown to the calc", `${where}: ${kind} "${name}"`)

  return decodeEntities(name).trim()
}

function heldItem(names, name, where) {
  if (!name || NO_ITEM.has(nameKey(name))) return undefined

  return canonical(names, "item", name, where)
}

function regulationOf(rows) {
  const match = rows[0].join(" ").match(/\(Champions ([A-Z]-[A-Z])\)/)

  if (!match) throw new Error("Could not find the regulation in the sheet title")

  return match[1]
}

function parseSps(line, where) {
  const points = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

  for (const part of line.split("/")) {
    const match = part.trim().match(/^(\d+)\s+(\w+)$/)

    if (!match || !STAT_KEYS[match[2]]) {
      problem("unexpected EVs", `Unexpected EVs in ${where}: "${line}"`)
      return undefined
    }

    points[STAT_KEYS[match[2]]] = Number(match[1])
  }

  const values = Object.values(points)
  const max = Math.max(...values)
  const total = values.reduce((sum, value) => sum + value, 0)

  if (max <= MAX_SP_PER_STAT && total <= MAX_SP_TOTAL) return points

  if (max <= MAX_EV_PER_STAT && total <= MAX_EV_TOTAL) return Object.fromEntries(Object.entries(points).map(([stat, ev]) => [stat, evToSp(ev)]))

  problem("unexpected EVs", `Neither Stat Points nor EVs in ${where}: "${line}"`)

  return undefined
}

function evToSp(ev) {
  return ev < 4 ? 0 : Math.floor((ev - 4) / 8) + 1
}

function parseShowdown(text, where, names) {
  return text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
      const [header, ...lines] = block.split("\n").map(line => line.trim())
      const [, nameAndGender, item] = header.match(/^(.*?)(?:\s+@\s+(.*))?$/)
      const name = nameAndGender.replace(/\s+\((M|F)\)$/, "").trim()
      const pasteSpecies = name.match(/\(([^()]+)\)$/)?.[1] ?? name
      const species = canonical(names.species, "Pokémon", SPECIES_ALIASES[pasteSpecies] ?? pasteSpecies, where)
      const set = { species, item: heldItem(names.items, item, where), moves: [] }

      lines.forEach(line => {
        if (line.startsWith("Ability:")) set.ability = canonical(names.abilities, "ability", line.slice("Ability:".length), where)
        else if (line.startsWith("EVs:")) set.sps = parseSps(line.slice("EVs:".length).trim(), where)
        else if (line.endsWith(" Nature")) set.nature = line.slice(0, -" Nature".length).trim()
        else if (line.startsWith("-")) set.moves.push(canonical(names.moves, "move", line.slice(1), where))
      })

      return set
    })
}

function baseSpecies(name) {
  return name.replace(/-Mega(-[XYZ])?$/, "")
}

function sameSpecies(memberName, pasteSpecies) {
  const base = baseSpecies(memberName)

  return memberName === pasteSpecies || base === pasteSpecies || pasteSpecies.startsWith(`${base}-`) || base.startsWith(`${pasteSpecies}-`)
}

function showdownSet(set, item) {
  const species = SHOWDOWN_NAMES[set.species] ?? set.species
  const lines = [item ? `${species} @ ${item}` : species]

  if (set.ability) lines.push(`Ability: ${set.ability}`)

  lines.push("Level: 50")

  const points = set.sps ? STAT_LABELS.filter(label => set.sps[STAT_KEYS[label]] > 0).map(label => `${set.sps[STAT_KEYS[label]]} ${label}`) : []

  if (points.length) lines.push(`EVs: ${points.join(" / ")}`)
  if (set.nature) lines.push(`${set.nature} Nature`)

  set.moves.forEach(move => lines.push(`- ${move}`))

  return lines.join("\n") + "\n"
}

function pasteName(description) {
  if (description.length <= MAX_PASTE_NAME_LENGTH) return description

  const cut = description.slice(0, MAX_PASTE_NAME_LENGTH + 1)

  return cut.slice(0, cut.lastIndexOf(" ")).trim()
}

function linkSets(team, sets) {
  const free = [...sets]

  const linked = team.members.map(member => {
    const exact = free.findIndex(set => set.species === member.name)
    const index = exact >= 0 ? exact : free.findIndex(set => sameSpecies(member.name, set.species))

    return index < 0 ? undefined : { member, set: free.splice(index, 1)[0] }
  })

  const unmatched = linked.filter(pair => !pair).length

  if (unmatched === 1 && free.length === 1) {
    const index = linked.findIndex(pair => !pair)
    const [set] = free

    warning("paste and sheet differ in one Pokémon, used the paste", `${team.id}: sheet has ${team.members[index].name}, paste has ${set.species}`)

    linked[index] = { member: { name: set.species, ...(set.item ? { item: set.item } : {}) }, set }
  }

  if (linked.some(pair => !pair)) {
    const missing = team.members.filter((_, index) => !linked[index]).map(member => member.name)

    warning("paste does not match the sheet, kept the sheet species only", `${team.id}: sheet has ${missing.join(", ")}, paste has ${sets.map(set => set.species).join(", ")}`)

    return { members: team.members, showdown: team.members.map(member => showdownSet({ species: member.name, moves: [] }, member.item)).join("\n") }
  }

  const members = linked.map(({ member, set }) => {
    const item = set.item ?? member.item
    const name = MEGA_BY_PASTE_SPECIES[member.name]?.[set.species] ?? member.name

    return {
      name,
      ...(item ? { item } : {}),
      ...(set.ability ? { ability: set.ability } : {}),
      ...(set.nature ? { nature: set.nature } : {}),
      ...(set.sps ? { sps: set.sps } : {}),
      moves: set.moves
    }
  })

  return { members, showdown: linked.map(({ member, set }) => showdownSet(set, set.item ?? member.item)).join("\n") }
}

function publishedPastes() {
  return existsSync(publishedPastesFile) ? JSON.parse(readFileSync(publishedPastesFile, "utf8")) : {}
}

function toTeams(rows, pastes) {
  const published = publishedPastes()
  const regulation = regulationOf(rows)
  const names = {
    species: catalog("src/domain/data/pokemon-data.ts", /name: "([^"]+)"/g),
    items: catalog("src/domain/data/item-data.ts", /name: "([^"]+)",\n\s+description/g),
    moves: catalog("src/domain/data/move-data.ts", /name: "([^"]+)"/g),
    abilities: catalog("src/domain/data/ability-data.ts", /name: "([^"]+)"/g)
  }

  return rows
    .slice(3)
    .filter(row => row.length > COLUMNS.handle && row[COLUMNS.id].trim())
    .map(row => {
      const id = row[COLUMNS.id].trim()
      const members = COLUMNS.species.map((column, index) => {
        const sheetName = SPECIES_ALIASES[row[column].trim()] ?? row[column].trim()
        const name = MEGA_BY_PASTE_SPECIES[sheetName] ? sheetName : canonical(names.species, "Pokémon", sheetName, id)
        const item = heldItem(names.items, row[COLUMNS.items[index]], id)

        return item ? { name, item } : { name }
      })

      const team = {
        id,
        description: decodeEntities(row[COLUMNS.description]).trim(),
        player: decodeEntities(row[COLUMNS.player]).trim(),
        handle: row[COLUMNS.handle].trim(),
        regulation,
        event: eventOf(row[COLUMNS.event]),
        placement: present(row[COLUMNS.placement]),
        date: isoDate(row[COLUMNS.date]),
        replicaCode: present(row[COLUMNS.replicaCode]),
        pasteId: published[id] ?? MOCK_PASTE_ID,
        members
      }
      const paste = pastes.get(pokepasteId(row[COLUMNS.pokepaste]))
      const linked = paste ? linkSets(team, parseShowdown(paste.paste, id, names)) : linkSets(team, [])

      return { ...team, members: linked.members, shared: { kind: "team", version: 1, useSpsMode: true, name: pasteName(team.description), showdown: linked.showdown } }
    })
}

function regulationSlug(regulation) {
  return regulation.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

function setsBlockName(slug, index) {
  return `community-team-sets-${slug}-${String(index + 1).padStart(3, "0")}`
}

function typescriptValue(value) {
  return JSON.stringify(value, null, 2)
}

function writeRegulation(teams, regulation) {
  const slug = regulationSlug(regulation)
  const dir = resolve(outputDir, slug)

  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })

  const blocks = []

  for (let start = 0; start < teams.length; start += SETS_BLOCK_SIZE) blocks.push(teams.slice(start, start + SETS_BLOCK_SIZE))

  const summary = blocks.flatMap((block, setsBlock) => block.map(({ members, ...team }) => ({ ...team, hasSps: members.some(member => Boolean(member.sps)), setsBlock, members: members.map(({ name, item }) => (item ? { name, item } : { name })) })))

  writeFileSync(resolve(dir, `community-teams-${slug}.ts`), `import { CommunityTeamSummary } from "@data/community-teams/community-team-data"\n\nexport const COMMUNITY_TEAMS: CommunityTeamSummary[] = ${typescriptValue(summary)}\n`)

  blocks.forEach((block, index) => {
    const sets = Object.fromEntries(block.map(team => [team.id, team.members.map(({ name: _name, item: _item, ...set }) => ({ ...set, moves: set.moves ?? [] }))]))

    writeFileSync(resolve(dir, `${setsBlockName(slug, index)}.ts`), `import { CommunityTeamSets } from "@data/community-teams/community-team-data"\n\nexport const COMMUNITY_TEAM_SETS: CommunityTeamSets = ${typescriptValue(sets)}\n`)
  })

  return blocks.length
}

function writeIndex() {
  const regulations = readdirSync(outputDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
    .reverse()
    .map(slug => {
      const summaryFile = readFileSync(resolve(outputDir, slug, `community-teams-${slug}.ts`), "utf8")
      const id = summaryFile.match(/"?regulation"?: "([^"]+)"/)[1]
      const blockCount = readdirSync(resolve(outputDir, slug)).filter(file => file.startsWith(`community-team-sets-${slug}-`)).length
      const setsBlocks = Array.from({ length: blockCount }, (_, index) => `      () => import("@data/community-teams/${slug}/${setsBlockName(slug, index)}").then(m => m.COMMUNITY_TEAM_SETS)`).join(",\n")

      return `  {
    id: "${id}",
    teams: () => import("@data/community-teams/${slug}/community-teams-${slug}").then(m => m.COMMUNITY_TEAMS),
    setsBlocks: [
${setsBlocks}
    ]
  }`
    })

  writeFileSync(
    resolve(outputDir, "community-teams-index.ts"),
    `import { CommunityTeamsRegulation } from "@data/community-teams/community-team-data"\n\nexport const COMMUNITY_TEAM_REGULATIONS: CommunityTeamsRegulation[] = [\n${regulations.join(",\n")}\n]\n`
  )
}

function pokepasteId(url) {
  return url.trim().match(/pokepast\.es\/([0-9a-f]+)/i)?.[1]
}

const sleep = ms => new Promise(done => setTimeout(done, ms))

async function fetchPaste(id) {
  const cached = resolve(pasteCacheDir, `${id}.json`)

  if (existsSync(cached)) return JSON.parse(readFileSync(cached, "utf8"))

  for (let attempt = 1; attempt <= PASTE_RETRIES; attempt++) {
    const response = await fetch(`https://pokepast.es/${id}/json`).catch(() => undefined)

    if (response?.ok) {
      const paste = await response.json()
      writeFileSync(cached, JSON.stringify(paste))
      return paste
    }

    if (response?.status === 404) return undefined

    await sleep(1000 * attempt)
  }

  throw new Error(`Could not download the paste ${id}`)
}

async function fetchPastes(ids) {
  mkdirSync(pasteCacheDir, { recursive: true })

  const pastes = new Map()
  const queue = [...new Set(ids)]
  const total = queue.length
  let done = 0

  const worker = async () => {
    while (queue.length) {
      const id = queue.shift()
      pastes.set(id, await fetchPaste(id))
      done++

      if (done % 50 === 0) console.log(`pastes: ${done}/${total}`)
    }
  }

  await Promise.all(Array.from({ length: PASTE_CONCURRENCY }, worker))

  return pastes
}

async function readSheet(regulation, path) {
  if (path) return readFileSync(path, "utf8")

  const response = await fetch(`${SHEET_CSV_URL}${REGULATION_SHEETS[regulation]}`)

  if (!response.ok) throw new Error(`Could not download the ${regulation} sheet (${response.status})`)

  return response.text()
}

function cliOptions(args) {
  const csvIndex = args.indexOf("--csv")
  const csv = csvIndex >= 0 ? args[csvIndex + 1] : undefined
  const named = args.filter((arg, index) => !arg.startsWith("--") && (csvIndex < 0 || index !== csvIndex + 1))
  const regulations = named.length ? named : Object.keys(REGULATION_SHEETS)
  const unknown = regulations.filter(regulation => !REGULATION_SHEETS[regulation])

  if (unknown.length) throw new Error(`Unknown regulation: ${unknown.join(", ")}. Use ${Object.keys(REGULATION_SHEETS).join(", ")}`)
  if (csv && regulations.length !== 1) throw new Error("--csv needs exactly one regulation")

  return { regulations, csv, downloadOnly: args.includes("--download-only") }
}

async function generateRegulation(regulation, csv, downloadOnly) {
  const rows = parseCsv(await readSheet(regulation, csv))

  if (regulationOf(rows) !== regulation) throw new Error(`The ${regulation} sheet is titled ${regulationOf(rows)}`)

  const pastes = await fetchPastes(
    rows
      .slice(3)
      .map(row => pokepasteId(row[COLUMNS.pokepaste] ?? ""))
      .filter(Boolean)
  )

  console.log(`${regulation} pastes: ${[...pastes.values()].filter(Boolean).length} downloaded, ${[...pastes.values()].filter(paste => !paste).length} missing`)

  if (downloadOnly) return

  if (AUDIT) {
    toTeams(rows, pastes)
    return
  }

  const generated = toTeams(rows, pastes)
  const teams = generated.map(({ shared: _shared, ...team }) => team)
  const blockCount = writeRegulation(teams, regulation)
  const shared = Object.fromEntries(generated.filter(team => team.shared).map(team => [team.id, team.shared]))

  writeFileSync(resolve(sharedTeamsDir, `community-teams-shared-${regulationSlug(regulation)}.json`), JSON.stringify(shared, null, 2))

  console.log(`${regulation}: ${teams.length} teams written with ${blockCount} sets blocks`)
}

const options = cliOptions(process.argv.slice(2))

for (const regulation of options.regulations) await generateRegulation(regulation, options.csv, options.downloadOnly)

printAudit()

if (!options.downloadOnly && !AUDIT) {
  writeIndex()
  execFileSync("npx", ["prettier", "--write", outputDir], { cwd: root, stdio: "ignore" })
}
