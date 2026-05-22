import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = resolve(__dirname, "../dist/browser/sitemap.xml")

const routeSources = {
  "https://vgcmulticalc.com/": ["src/app/pages/multi-calc", "src/app/pages/simple-calc", "src/app/core/main", "src/index.html"],
  "https://vgcmulticalc.com/one-vs-one": ["src/app/pages/simple-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/team-vs-many": ["src/app/pages/multi-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/many-vs-team": ["src/app/pages/multi-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/speed-calc": ["src/app/pages/speed-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/type-calc": ["src/app/pages/type-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/probability-calc": ["src/app/pages/probability-calc", "src/app/core/main"],
  "https://vgcmulticalc.com/how-to-use": ["src/app/pages/how-to-use"]
}

function lastCommitDate(paths) {
  try {
    const date = execSync(`git log -1 --format=%cs -- ${paths.join(" ")}`, { encoding: "utf8" }).trim()

    return date || new Date().toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

let sitemap = readFileSync(sitemapPath, "utf8")

for (const [loc, paths] of Object.entries(routeSources)) {
  const date = lastCommitDate(paths)
  const blockRegex = new RegExp(`(<loc>${loc.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`)
  sitemap = sitemap.replace(blockRegex, `$1${date}$2`)
}

writeFileSync(sitemapPath, sitemap)
console.log("sitemap.xml lastmod updated")
