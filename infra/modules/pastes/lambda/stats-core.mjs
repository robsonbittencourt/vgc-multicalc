import { isPasteId } from "./core.mjs"

export const USE_EVENT_PATH = "/api/events/use.json"
export const RANKING_SIZE = 20
export const RANKING_DAYS = 7
export const STATS_HOUR_UTC = 3
export const REFRESH_MARGIN_MINUTES = 10

const DAY_MS = 86400000
const COUNTED_STATUSES = ["200", "304"]

export const DAILY_STATS_PREFIX = "stats/daily/"

export function dailyStatsKey(day) {
  return `${DAILY_STATS_PREFIX}${day}.json`
}

export function totalsKey() {
  return "stats/totals.json"
}

export function rankingKey() {
  return "api/teams/most-viewed.json"
}

export function logPrefix(distributionId, day) {
  return `${distributionId}.${day}-`
}

export function previousDay(now) {
  return new Date(now.getTime() - DAY_MS).toISOString().slice(0, 10)
}

export function lastDays(day, count) {
  const end = Date.parse(`${day}T00:00:00.000Z`)

  return Array.from({ length: count }, (_, index) => new Date(end - index * DAY_MS).toISOString().slice(0, 10))
}

export function usedPasteIds(logText) {
  const lines = logText.split("\n")
  const header = lines.find(line => line.startsWith("#Fields:"))

  if (!header) return []

  const fields = header.replace("#Fields:", "").trim().split(/\s+/)
  const stem = fields.indexOf("cs-uri-stem")
  const status = fields.indexOf("sc-status")
  const query = fields.indexOf("cs-uri-query")

  return lines
    .filter(line => line && !line.startsWith("#"))
    .map(line => line.split("\t"))
    .filter(columns => columns[stem] === USE_EVENT_PATH && COUNTED_STATUSES.includes(columns[status]))
    .map(columns => new URLSearchParams(columns[query]).get("paste"))
    .filter(isPasteId)
}

export function countUses(pasteIds) {
  const counts = {}

  pasteIds.forEach(pasteId => {
    counts[pasteId] = (counts[pasteId] ?? 0) + 1
  })

  return counts
}

export function sumCounts(counts) {
  const sums = {}

  counts.forEach(count => Object.entries(count).forEach(([pasteId, uses]) => (sums[pasteId] = (sums[pasteId] ?? 0) + uses)))

  return sums
}

export function ranking(counts) {
  return Object.entries(counts)
    .sort(([firstId, firstUses], [secondId, secondUses]) => secondUses - firstUses || firstId.localeCompare(secondId))
    .slice(0, RANKING_SIZE)
    .map(([pasteId, uses]) => ({ pasteId, uses }))
}

export function nextRefresh(now) {
  const refresh = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), STATS_HOUR_UTC, REFRESH_MARGIN_MINUTES))

  if (refresh <= now) refresh.setUTCDate(refresh.getUTCDate() + 1)

  return refresh
}
