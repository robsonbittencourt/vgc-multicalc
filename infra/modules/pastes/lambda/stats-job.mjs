import { countUses, dailyStatsKey, lastDays, logPrefix, nextRefresh, RANKING_DAYS, ranking, rankingKey, sumCounts, totalsKey, usedPasteIds } from "./stats-core.mjs"

export async function runTeamStats({ store, distributionId, day, now }) {
  const logKeys = await store.listLogKeys(logPrefix(distributionId, day))
  const logs = await Promise.all(logKeys.map(key => store.readLog(key)))
  const daily = countUses(logs.flatMap(usedPasteIds))

  await store.putJson(dailyStatsKey(day), daily)

  const dailyKeys = await store.listDailyKeys()
  const allDays = await Promise.all(dailyKeys.map(async key => (key === dailyStatsKey(day) ? daily : ((await store.getJson(key)) ?? {}))))

  await store.putJson(totalsKey(), sumCounts(allDays))

  const week = await Promise.all(lastDays(day, RANKING_DAYS).map(async current => (current === day ? daily : ((await store.getJson(dailyStatsKey(current))) ?? {}))))
  const top = ranking(sumCounts(week))

  await store.putJson(rankingKey(), top, { cacheControl: "public", expires: nextRefresh(now) })

  return { day, logFiles: logKeys.length, uses: Object.values(daily).reduce((sum, uses) => sum + uses, 0), ranked: top.length, daysInTotals: dailyKeys.length }
}
