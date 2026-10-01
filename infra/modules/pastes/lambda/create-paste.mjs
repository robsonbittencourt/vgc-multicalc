import { randomInt } from "node:crypto"
import { requestLimiter } from "./core.mjs"
import { createPasteHandler, fromFunctionUrlEvent, pasteApiHandler, unlockPasteHandler, withRejectionLog } from "./handlers.mjs"
import { s3PasteStore } from "./s3-store.mjs"

const store = s3PasteStore(process.env.PASTES_BUCKET)
const allowRequest = requestLimiter()

const pasteApi = withRejectionLog(
  pasteApiHandler({
    createPaste: createPasteHandler({ store, now: () => new Date(), randomIndex: max => randomInt(max), allowRequest }),
    unlockPaste: unlockPasteHandler({ store, now: () => new Date(), allowRequest })
  }),
  console.warn
)

export const handler = async event => pasteApi(fromFunctionUrlEvent(event))
