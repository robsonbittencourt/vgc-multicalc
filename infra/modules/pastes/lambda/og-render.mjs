import { Resvg } from "@resvg/resvg-js"
import { join } from "node:path"

const FONTS_DIR = new URL("./fonts/", import.meta.url).pathname

export function renderPng(svg) {
  const resvg = new Resvg(svg, {
    font: { fontFiles: [join(FONTS_DIR, "outfit-500.ttf"), join(FONTS_DIR, "outfit-700.ttf")], loadSystemFonts: false, defaultFontFamily: "Outfit" }
  })

  return resvg.render().asPng()
}
