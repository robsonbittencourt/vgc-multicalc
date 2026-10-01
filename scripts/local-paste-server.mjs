import { createHash, randomInt } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { createServer } from "node:http"
import { basename, extname, join, normalize } from "node:path"
import { isPasteId, parseSets, requestLimiter } from "../infra/modules/pastes/lambda/core.mjs"
import { createPasteHandler, pasteApiHandler, pastePageHandler, unlockPasteHandler } from "../infra/modules/pastes/lambda/handlers.mjs"
import { fileAssets } from "../infra/modules/pastes/lambda/og-assets.mjs"
import { buildOgSvg } from "../infra/modules/pastes/lambda/og-image.mjs"
import { renderPng } from "../infra/modules/pastes/lambda/og-render.mjs"

const PORT = Number(process.env.PORT ?? 4200)
const DIST_DIR = process.env.DIST_DIR ?? "dist/browser"
const PASTES_DIR = process.env.PASTES_DIR ?? "tmp/pastes"
const CLIENT_ONLY_PREFIXES = ["/data/", "/team/"]
const REVALIDATE_CACHE_CONTROL = "public, max-age=0, must-revalidate"
const ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable"
const REVALIDATED_FILES = ["ngsw.json", "ngsw-worker.js", "safety-worker.js", "worker-basic.min.js", "manifest.json", "robots.txt", "sitemap.xml"]
const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".xml": "application/xml"
}

const store = {
  async get(id) {
    const text = await readOrNull(join(PASTES_DIR, `${id}.json`))

    return text === null ? null : JSON.parse(text)
  },

  async putIfAbsent(id, paste) {
    return writeIfAbsent(`${id}.json`, paste)
  },

  async getSecret(id) {
    const text = await readOrNull(join(PASTES_DIR, `${id}.secret.json`))

    return text === null ? null : { secret: JSON.parse(text), version: createHash("sha256").update(text).digest("hex") }
  },

  async putSecretIfAbsent(id, secret) {
    return writeIfAbsent(`${id}.secret.json`, secret)
  },

  async replaceSecret(id, secret, version) {
    const current = await this.getSecret(id)

    if (current?.version !== version) return null

    const text = JSON.stringify(secret)

    await writeFile(join(PASTES_DIR, `${id}.secret.json`), text)

    return createHash("sha256").update(text).digest("hex")
  }
}

async function writeIfAbsent(file, value) {
  await mkdir(PASTES_DIR, { recursive: true })

  try {
    await writeFile(join(PASTES_DIR, file), JSON.stringify(value), { flag: "wx" })

    return true
  } catch (error) {
    if (error.code === "EEXIST") return false

    throw error
  }
}

const allowRequest = requestLimiter()
const pasteApi = pasteApiHandler({
  createPaste: createPasteHandler({ store, now: () => new Date(), randomIndex: max => randomInt(max), allowRequest }),
  unlockPaste: unlockPasteHandler({ store, now: () => new Date(), allowRequest })
})
const assets = fileAssets("infra/modules/pastes/lambda/og-assets")
const pastePage = pastePageHandler({
  store,
  loadBaseHtml: () => readFile(join(DIST_DIR, "404.html"), "utf8"),
  publicOrigin: `http://localhost:${PORT}`,
  renderImage: paste => renderPng(buildOgSvg(parseSets(paste.showdown), assets)),
  isKnownSpecies: assets.hasSprite
})

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname)

  try {
    if (path === "/api/pastes" || path.endsWith("/unlock")) return send(res, await pasteApi({ method: req.method, path, headers: req.headers, body: await readBody(req) }))
    if (path.startsWith("/api/pastes/")) return send(res, await pasteJson(path.substring("/api/pastes/".length)))
    if (path.startsWith("/paste/")) return send(res, await pastePage({ method: req.method, path, body: "" }))

    return send(res, await staticFile(path))
  } catch (error) {
    console.error(error)

    return send(res, { statusCode: 500, headers: { "content-type": "text/plain" }, body: "Internal error" })
  }
}).listen(PORT, () => console.log(`Local paste server on http://localhost:${PORT} (dist: ${DIST_DIR}, pastes: ${PASTES_DIR})`))

async function pasteJson(id) {
  const paste = isPasteId(id) ? await store.get(id) : null

  if (!paste) return { statusCode: 404, headers: { "content-type": "application/json" }, body: '{"error":"Not found"}' }

  return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify(paste) }
}

async function staticFile(path) {
  const relative = normalize(path.endsWith("/") ? `${path}index.html` : path).replace(/^(\.\.[/\\])+/, "")
  const candidates = [join(DIST_DIR, relative), join(DIST_DIR, `${relative}/index.html`)]

  for (const file of candidates) {
    const content = await readOrNull(file, null)

    if (content !== null) return { statusCode: 200, headers: { "content-type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream", "cache-control": cacheControl(file) }, body: content }
  }

  const statusCode = CLIENT_ONLY_PREFIXES.some(prefix => path.startsWith(prefix)) ? 200 : 404

  return { statusCode, headers: { "content-type": CONTENT_TYPES[".html"], "cache-control": REVALIDATE_CACHE_CONTROL }, body: await readFile(join(DIST_DIR, "404.html")) }
}

function cacheControl(file) {
  return extname(file) === ".html" || REVALIDATED_FILES.includes(basename(file)) ? REVALIDATE_CACHE_CONTROL : ASSET_CACHE_CONTROL
}

async function readOrNull(file, encoding = "utf8") {
  try {
    return await readFile(file, encoding)
  } catch {
    return null
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []

    req.on("data", chunk => chunks.push(chunk))
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
    req.on("error", reject)
  })
}

function send(res, response) {
  res.writeHead(response.statusCode, response.headers)
  res.end(response.isBase64Encoded ? Buffer.from(response.body, "base64") : response.body)
}
