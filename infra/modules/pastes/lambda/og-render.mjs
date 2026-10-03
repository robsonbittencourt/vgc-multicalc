import { Resvg } from "@resvg/resvg-js"
import { join } from "node:path"
import { escapeHtml } from "./core.mjs"

const FONTS_DIR = new URL("./fonts/", import.meta.url).pathname
const FONT = { fontFiles: [join(FONTS_DIR, "roboto-500.ttf"), join(FONTS_DIR, "roboto-700.ttf")], loadSystemFonts: false, defaultFontFamily: "Roboto" }

export function renderPng(svg) {
  return new Resvg(svg, { font: FONT }).render().asPng()
}

export function measureText(value, size, weight) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${(value.length + 1) * size}" height="${size * 2}"><text x="0" y="${size}" font-family="Roboto" font-size="${size}" font-weight="${weight}">${escapeHtml(value)}</text></svg>`

  return new Resvg(svg, { font: FONT }).getBBox()?.width ?? 0
}
