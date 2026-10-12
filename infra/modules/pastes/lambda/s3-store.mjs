import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm"
import { pasteKey, secretKey, teamEntryKey, teamIndexKey } from "./core.mjs"

const BASE_HTML_TTL_MS = 60000
const PASTE_CACHE_CONTROL = "public, max-age=31536000, immutable"
const TEAM_INDEX_CACHE_CONTROL = "public, max-age=60"

const s3 = new S3Client({})
const ssm = new SSMClient({})

export function s3PasteStore(bucket) {
  return {
    async get(id) {
      const text = await readText(bucket, pasteKey(id))

      return text === null ? null : JSON.parse(text)
    },

    async putIfAbsent(id, paste, cacheControl = PASTE_CACHE_CONTROL) {
      return conditionalPut({ Bucket: bucket, Key: pasteKey(id), Body: JSON.stringify(paste), ContentType: "application/json", CacheControl: cacheControl, IfNoneMatch: "*" })
    },

    async deletePaste(id) {
      await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: pasteKey(id) }))
    },

    async getEntry(id) {
      const text = await readText(bucket, teamEntryKey(id))

      return text === null ? null : JSON.parse(text)
    },

    async putEntryIfAbsent(id, entry) {
      return conditionalPut({ Bucket: bucket, Key: teamEntryKey(id), Body: JSON.stringify(entry), ContentType: "application/json", IfNoneMatch: "*" })
    },

    async deleteEntry(id) {
      await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: teamEntryKey(id) }))
    },

    async getIndex(regulation) {
      try {
        const response = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: teamIndexKey(regulation) }))

        return { index: JSON.parse(await response.Body.transformToString("utf8")), version: response.ETag }
      } catch (error) {
        if (isNotFound(error)) return { index: [], version: null }

        throw error
      }
    },

    async replaceIndex(regulation, index, version) {
      const condition = version ? { IfMatch: version } : { IfNoneMatch: "*" }

      return conditionalPut({ Bucket: bucket, Key: teamIndexKey(regulation), Body: JSON.stringify(index), ContentType: "application/json", CacheControl: TEAM_INDEX_CACHE_CONTROL, ...condition })
    },

    async getSecret(id) {
      try {
        const response = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: secretKey(id) }))

        return { secret: JSON.parse(await response.Body.transformToString("utf8")), version: response.ETag }
      } catch (error) {
        if (isNotFound(error)) return null

        throw error
      }
    },

    async putSecretIfAbsent(id, secret) {
      return conditionalPut({ Bucket: bucket, Key: secretKey(id), Body: JSON.stringify(secret), ContentType: "application/json", IfNoneMatch: "*" })
    },

    async replaceSecret(id, secret, version) {
      try {
        const response = await s3.send(new PutObjectCommand({ Bucket: bucket, Key: secretKey(id), Body: JSON.stringify(secret), ContentType: "application/json", IfMatch: version }))

        return response.ETag
      } catch (error) {
        if (isConditionFailure(error)) return null

        throw error
      }
    }
  }
}

async function conditionalPut(input) {
  try {
    await s3.send(new PutObjectCommand(input))

    return true
  } catch (error) {
    if (isConditionFailure(error)) return false

    throw error
  }
}

function isConditionFailure(error) {
  return error.$metadata?.httpStatusCode === 412 || error.$metadata?.httpStatusCode === 409
}

function isNotFound(error) {
  return error.name === "NoSuchKey" || error.$metadata?.httpStatusCode === 404
}

export function activeReleaseBaseHtml(siteBucket, activeReleaseParameter) {
  let cached = null

  return async () => {
    if (cached && Date.now() - cached.loadedAt < BASE_HTML_TTL_MS) return cached.html

    const parameter = await ssm.send(new GetParameterCommand({ Name: activeReleaseParameter }))
    const releasePath = parameter.Parameter.Value.replace(/^\/+/, "")
    const html = await readText(siteBucket, `${releasePath}/404.html`)

    if (html === null) throw new Error(`404.html missing in ${releasePath}`)

    cached = { html, loadedAt: Date.now() }

    return html
  }
}

async function readText(bucket, key) {
  try {
    const response = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))

    return await response.Body.transformToString("utf8")
  } catch (error) {
    if (isNotFound(error)) return null

    throw error
  }
}
