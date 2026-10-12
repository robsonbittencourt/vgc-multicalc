import { randomBytes, randomInt } from "node:crypto"
import { requestLimiter } from "./core.mjs"
import { createPasteHandler, createTeamHandler, deleteTeamHandler, fromFunctionUrlEvent, pasteApiHandler, unlockPasteHandler, withRejectionLog } from "./handlers.mjs"
import { s3PasteStore } from "./s3-store.mjs"

const store = s3PasteStore(process.env.PASTES_BUCKET)
const allowRequest = requestLimiter()
const now = () => new Date()
const randomIndex = max => randomInt(max)

const pasteApi = withRejectionLog(
  pasteApiHandler({
    createPaste: createPasteHandler({ store, now, randomIndex, allowRequest }),
    unlockPaste: unlockPasteHandler({ store, now, allowRequest }),
    createTeam: createTeamHandler({ store, now, randomIndex, randomBytes, allowRequest, regulation: process.env.CURRENT_TEAM_REGULATION }),
    deleteTeam: deleteTeamHandler({ store, now, allowRequest })
  }),
  console.warn
)

export const handler = async event => pasteApi(fromFunctionUrlEvent(event))
