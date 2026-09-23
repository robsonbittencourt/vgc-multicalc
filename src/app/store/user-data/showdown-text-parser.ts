import { Stats } from "@multicalc/types"

export type ShowdownSet = {
  species: string
  item?: string
  ability?: string
  nature?: string
  teraType?: string
  evs?: Partial<Stats>
  moves: string[]
}

export type ShowdownTeam = {
  name: string
  pokemon: ShowdownSet[]
}

const MAX_MOVES = 4
const TEAM_HEADER = /^===\s*(?:\[[^\]]*\])?\s*(.*?)\s*===$/
const SEPARATOR = /^[- ]+$/
const MOVE = /^[-~]\s*(.*)$/
const NATURE = /^(.*)\s+Nature$/
const DETAIL = /^([^:]+):\s*(.*)$/
const EV_ENTRY = /^(\d+)\s+(hp|atk|def|spa|spd|spe)$/i
const GENDER = /\s*\([MF]\)/i
const SPECIES_IN_PARENTHESES = /\(([^()]+)\)\s*$/

export function parseShowdownText(text: string): ShowdownTeam {
  const team: ShowdownTeam = { name: "", pokemon: [] }
  let current: ShowdownSet | undefined
  let started = false

  for (const line of text.split(/\r\n|\r|\n/).map(l => l.replace(/\t/g, " ").trim())) {
    const header = TEAM_HEADER.exec(line)

    if (header) {
      if (started) break

      team.name = header[1].substring(header[1].lastIndexOf("/") + 1).trim()
      started = true
      continue
    }

    if (line === "" || SEPARATOR.test(line)) {
      current = undefined
      continue
    }

    if (!current) {
      current = parseHeaderLine(line)
      team.pokemon.push(current)
      started = true
      continue
    }

    parseDetailLine(line, current)
  }

  return team
}

function parseHeaderLine(line: string): ShowdownSet {
  const at = line.indexOf("@")
  const identity = (at >= 0 ? line.substring(0, at) : line).replace(GENDER, "").trim()
  const item = at >= 0 ? line.substring(at + 1).trim() : ""
  const species = SPECIES_IN_PARENTHESES.exec(identity)?.[1].trim() ?? identity
  const set: ShowdownSet = { species, moves: [] }

  if (item && item.toLowerCase() !== "no item") set.item = item

  return set
}

function parseDetailLine(line: string, set: ShowdownSet) {
  const move = MOVE.exec(line)

  if (move) {
    if (set.moves.length < MAX_MOVES) set.moves.push(move[1].trim())

    return
  }

  const nature = NATURE.exec(line)

  if (nature) {
    set.nature = nature[1].trim()

    return
  }

  const detail = DETAIL.exec(line)

  if (!detail) return

  const key = detail[1].trim().toLowerCase()
  const value = detail[2].trim()

  if (key === "ability" || key === "trait") set.ability = value
  if (key === "tera type") set.teraType = value
  if (key === "evs") set.evs = parseEvs(value)
}

function parseEvs(value: string): Partial<Stats> {
  const evs: Partial<Stats> = {}

  for (const entry of value.split("/")) {
    const match = EV_ENTRY.exec(entry.trim())

    if (match) evs[match[2].toLowerCase() as keyof Stats] = Number(match[1])
  }

  return evs
}
