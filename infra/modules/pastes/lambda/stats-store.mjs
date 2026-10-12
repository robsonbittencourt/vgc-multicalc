import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { gunzipSync } from "node:zlib"
import { DAILY_STATS_PREFIX } from "./stats-core.mjs"

const s3 = new S3Client({})

export function s3StatsStore({ logsBucket, statsBucket }) {
  return {
    listLogKeys(prefix) {
      return listKeys(logsBucket, prefix)
    },

    listDailyKeys() {
      return listKeys(statsBucket, DAILY_STATS_PREFIX)
    },

    async readLog(key) {
      const response = await s3.send(new GetObjectCommand({ Bucket: logsBucket, Key: key }))

      return gunzipSync(Buffer.from(await response.Body.transformToByteArray())).toString("utf8")
    },

    async getJson(key) {
      try {
        const response = await s3.send(new GetObjectCommand({ Bucket: statsBucket, Key: key }))

        return JSON.parse(await response.Body.transformToString("utf8"))
      } catch (error) {
        if (error.name === "NoSuchKey" || error.$metadata?.httpStatusCode === 404) return null

        throw error
      }
    },

    async putJson(key, value, { cacheControl, expires } = {}) {
      await s3.send(new PutObjectCommand({ Bucket: statsBucket, Key: key, Body: JSON.stringify(value), ContentType: "application/json", ...(cacheControl ? { CacheControl: cacheControl } : {}), ...(expires ? { Expires: expires } : {}) }))
    }
  }
}

async function listKeys(bucket, prefix) {
  const keys = []
  let token

  do {
    const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token }))

    keys.push(...(page.Contents ?? []).map(object => object.Key))
    token = page.NextContinuationToken
  } while (token)

  return keys
}
