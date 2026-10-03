import { readFileSync, writeFileSync } from "node:fs"
import { parseSets } from "../../infra/modules/pastes/lambda/core.mjs"
import { fileAssets } from "../../infra/modules/pastes/lambda/og-assets.mjs"
import { buildOgSvg } from "../../infra/modules/pastes/lambda/og-image.mjs"
import { measureText, renderPng } from "../../infra/modules/pastes/lambda/og-render.mjs"

const input = process.argv[2] ?? "infra/modules/pastes/test/fixtures/sample-team.txt"
const output = process.argv[3] ?? "og-sample.png"
const started = performance.now()
const svg = buildOgSvg(parseSets(readFileSync(input, "utf8")), fileAssets("infra/modules/pastes/lambda/og-assets"), measureText)
const png = renderPng(svg)

writeFileSync(output, png)
console.log(`${output} (${Math.round(png.length / 1024)} KB, ${Math.round(performance.now() - started)} ms)`)
