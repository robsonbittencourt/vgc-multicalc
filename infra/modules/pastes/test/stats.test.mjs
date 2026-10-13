import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { countUses, dailyStatsKey, lastDays, logPrefix, nextRefresh, previousDay, ranking, rankingKey, sumCounts, totalsKey, usedPasteIds } from "../lambda/stats-core.mjs"
import { runTeamStats } from "../lambda/stats-job.mjs"

const HEADER = "#Version: 1.0\n#Fields: date time x-edge-location sc-bytes c-ip cs-method cs(Host) cs-uri-stem sc-status cs(Referer) cs(User-Agent) cs-uri-query"

function line(stem, status, query) {
  return ["2026-10-12", "15:00:00", "GRU3-P1", "120", "172.68.1.1", "GET", "d.cloudfront.net", stem, status, "-", "Mozilla/5.0", query].join("\t")
}

const NOW = new Date("2026-10-13T03:00:05.000Z")

const LOG = [HEADER, line("/api/events/use.json", "200", "paste=uZ5ATN1fRy"), line("/api/events/use.json", "304", "paste=uZ5ATN1fRy"), line("/api/events/use.json", "200", "paste=kR2kYIhDtY"), ""].join("\n")

describe("stats keys and days", () => {
  it("keeps the daily stats and totals private and the ranking public", () => {
    assert.equal(dailyStatsKey("2026-10-12"), "stats/daily/2026-10-12.json")
    assert.equal(totalsKey(), "stats/totals.json")
    assert.equal(rankingKey(), "api/teams/most-viewed.json")
  })

  it("lists the log files of a day by the CloudFront file name", () => {
    assert.equal(logPrefix("E1P9W3D5YSMZFY", "2026-10-12"), "E1P9W3D5YSMZFY.2026-10-12-")
  })

  it("expires the ranking at the next daily run, with a margin", () => {
    assert.equal(nextRefresh(new Date("2026-10-12T17:30:00.000Z")).toISOString(), "2026-10-13T03:10:00.000Z")
    assert.equal(nextRefresh(new Date("2026-10-13T02:59:59.000Z")).toISOString(), "2026-10-13T03:10:00.000Z")
    assert.equal(nextRefresh(new Date("2026-10-13T03:00:30.000Z")).toISOString(), "2026-10-14T03:10:00.000Z")
    assert.equal(nextRefresh(new Date("2026-10-13T03:10:00.000Z")).toISOString(), "2026-10-14T03:10:00.000Z")
  })

  it("processes the day before the run and goes back day by day", () => {
    assert.equal(previousDay(new Date("2026-10-13T03:00:00.000Z")), "2026-10-12")
    assert.deepEqual(lastDays("2026-10-02", 3), ["2026-10-02", "2026-10-01", "2026-09-30"])
  })
})

describe("usedPasteIds", () => {
  it("reads the paste of each use signal answered from the cache or the origin", () => {
    assert.deepEqual(usedPasteIds(LOG), ["uZ5ATN1fRy", "uZ5ATN1fRy", "kR2kYIhDtY"])
  })

  it("ignores other paths, failed requests and malformed pastes", () => {
    const log = [HEADER, line("/api/pastes/uZ5ATN1fRy", "200", "-"), line("/api/events/use.json", "403", "paste=uZ5ATN1fRy"), line("/api/events/use.json", "200", "paste=bad"), line("/api/events/use.json", "200", "-")].join("\n")

    assert.deepEqual(usedPasteIds(log), [])
  })

  it("reads nothing from a file without the fields header", () => {
    assert.deepEqual(usedPasteIds(line("/api/events/use.json", "200", "paste=uZ5ATN1fRy")), [])
  })
})

describe("counts and ranking", () => {
  it("counts the uses of each paste", () => {
    assert.deepEqual(countUses(["a1B2c3D4e5", "f6G7h8I9j0", "a1B2c3D4e5"]), { a1B2c3D4e5: 2, f6G7h8I9j0: 1 })
  })

  it("adds the counts of several days", () => {
    assert.deepEqual(sumCounts([{ a1B2c3D4e5: 2 }, { a1B2c3D4e5: 1, f6G7h8I9j0: 4 }, {}]), { a1B2c3D4e5: 3, f6G7h8I9j0: 4 })
  })

  it("ranks the 20 most used pastes, breaking ties by id", () => {
    const counts = Object.fromEntries(Array.from({ length: 25 }, (_, index) => [`paste${String(index).padStart(5, "0")}`, index % 5]))
    counts.zTopPaste0 = 9

    const top = ranking(counts)

    assert.equal(top.length, 20)
    assert.deepEqual(top.slice(0, 3), [
      { pasteId: "zTopPaste0", uses: 9 },
      { pasteId: "paste00004", uses: 4 },
      { pasteId: "paste00009", uses: 4 }
    ])
  })
})

function memoryStore({ logs = {}, json = {} } = {}) {
  const saved = new Map(Object.entries(json))
  const writes = []

  return {
    saved,
    writes,
    async listLogKeys(prefix) {
      return Object.keys(logs).filter(key => key.startsWith(prefix))
    },
    async listDailyKeys() {
      return [...saved.keys()].filter(key => key.startsWith("stats/daily/"))
    },
    async readLog(key) {
      return logs[key]
    },
    async getJson(key) {
      return saved.has(key) ? saved.get(key) : null
    },
    async putJson(key, value, headers) {
      writes.push({ key, headers })
      saved.set(key, value)
    }
  }
}

describe("runTeamStats", () => {
  const logs = { "E1P9W3D5YSMZFY.2026-10-12-15.a1.gz": LOG, "E1P9W3D5YSMZFY.2026-10-12-16.b2.gz": [HEADER, line("/api/events/use.json", "200", "paste=kR2kYIhDtY")].join("\n"), "E1P9W3D5YSMZFY.2026-10-11-23.c3.gz": LOG }

  it("counts the day, totals every day and ranks the last 7 days", async () => {
    const store = memoryStore({ logs, json: { "stats/daily/2026-10-10.json": { oldPaste01: 5 }, "stats/daily/2026-10-05.json": { tooOld0001: 50, uZ5ATN1fRy: 8 } } })

    const result = await runTeamStats({ store, distributionId: "E1P9W3D5YSMZFY", day: "2026-10-12", now: NOW })

    assert.deepEqual(result, { day: "2026-10-12", logFiles: 2, uses: 4, ranked: 3, daysInTotals: 3 })
    assert.deepEqual(store.saved.get("stats/daily/2026-10-12.json"), { uZ5ATN1fRy: 2, kR2kYIhDtY: 2 })
    assert.deepEqual(store.saved.get("stats/totals.json"), { oldPaste01: 5, tooOld0001: 50, uZ5ATN1fRy: 10, kR2kYIhDtY: 2 })
    assert.deepEqual(store.saved.get("api/teams/most-viewed.json"), [
      { pasteId: "oldPaste01", uses: 5 },
      { pasteId: "kR2kYIhDtY", uses: 2 },
      { pasteId: "uZ5ATN1fRy", uses: 2 }
    ])
    assert.deepEqual(
      store.writes.find(write => write.key === "api/teams/most-viewed.json"),
      { key: "api/teams/most-viewed.json", headers: { cacheControl: "public", expires: new Date("2026-10-14T03:10:00.000Z") } }
    )
  })

  it("replaces the counts of a day that runs again, without counting it twice", async () => {
    const store = memoryStore({ logs, json: { "stats/daily/2026-10-12.json": { uZ5ATN1fRy: 1 }, "stats/daily/2026-10-11.json": { uZ5ATN1fRy: 3 } } })

    await runTeamStats({ store, distributionId: "E1P9W3D5YSMZFY", day: "2026-10-12", now: NOW })

    assert.deepEqual(store.saved.get("stats/daily/2026-10-12.json"), { uZ5ATN1fRy: 2, kR2kYIhDtY: 2 })
    assert.deepEqual(store.saved.get("stats/totals.json"), { uZ5ATN1fRy: 5, kR2kYIhDtY: 2 })
  })

  it("keeps the ranking of a day without daily stats of the week before", async () => {
    const store = memoryStore({ logs: {}, json: { "stats/daily/2026-10-11.json": null } })

    const result = await runTeamStats({ store, distributionId: "E1P9W3D5YSMZFY", day: "2026-10-12", now: NOW })

    assert.equal(result.uses, 0)
    assert.deepEqual(store.saved.get("stats/totals.json"), {})
    assert.deepEqual(store.saved.get("api/teams/most-viewed.json"), [])
  })
})
