import { previousDay } from "./stats-core.mjs"
import { runTeamStats } from "./stats-job.mjs"
import { s3StatsStore } from "./stats-store.mjs"

const store = s3StatsStore({ logsBucket: process.env.LOGS_BUCKET, statsBucket: process.env.PASTES_BUCKET })

export const handler = async event => {
  const now = new Date()
  const result = await runTeamStats({ store, distributionId: process.env.DISTRIBUTION_ID, day: event?.day ?? previousDay(now), now })

  console.warn(JSON.stringify(result))

  return result
}
