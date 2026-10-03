import { parseSets } from "./core.mjs"
import { fromFunctionUrlEvent, pastePageHandler, withRejectionLog } from "./handlers.mjs"
import { fileAssets } from "./og-assets.mjs"
import { buildOgSvg } from "./og-image.mjs"
import { measureText, renderPng } from "./og-render.mjs"
import { activeReleaseBaseHtml, s3PasteStore } from "./s3-store.mjs"

const assets = fileAssets(new URL("./og-assets/", import.meta.url).pathname)

const pastePage = withRejectionLog(
  pastePageHandler({
    store: s3PasteStore(process.env.PASTES_BUCKET),
    loadBaseHtml: activeReleaseBaseHtml(process.env.SITE_BUCKET, process.env.ACTIVE_RELEASE_PARAMETER),
    publicOrigin: process.env.PUBLIC_ORIGIN,
    renderImage: paste => renderPng(buildOgSvg(parseSets(paste.showdown), assets, measureText)),
    isKnownSpecies: assets.hasSprite
  }),
  console.warn
)

export const handler = async event => pastePage(fromFunctionUrlEvent(event))
