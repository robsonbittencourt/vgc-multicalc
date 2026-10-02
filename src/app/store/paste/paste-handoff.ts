import { isSharedTeam, SharedTeam } from "@store/paste/shared-team"

export type PasteHandoff = {
  team: SharedTeam
  asOpponents: boolean
}

const KEY_PREFIX = "pasteHandoff:"
const MAX_AGE_MS = 60000

export function savePasteHandoff(storage: Storage, id: string, handoff: PasteHandoff, now: number) {
  removeExpiredHandoffs(storage, now)
  storage.setItem(KEY_PREFIX + id, JSON.stringify({ ...handoff, savedAt: now }))
}

function removeExpiredHandoffs(storage: Storage, now: number) {
  for (let index = storage.length - 1; index >= 0; index--) {
    const key = storage.key(index)!

    if (key.startsWith(KEY_PREFIX) && !isFresh(storage.getItem(key)!, now)) storage.removeItem(key)
  }
}

function isFresh(raw: string, now: number): boolean {
  try {
    const { savedAt } = JSON.parse(raw)

    return typeof savedAt === "number" && now - savedAt <= MAX_AGE_MS
  } catch {
    return false
  }
}

export function takePasteHandoff(storage: Storage, id: string, now: number): PasteHandoff | null {
  const key = KEY_PREFIX + id
  const raw = storage.getItem(key)

  storage.removeItem(key)

  if (!raw || !isFresh(raw, now)) return null

  const { team, asOpponents } = JSON.parse(raw)

  return isSharedTeam(team) && typeof asOpponents === "boolean" ? { team, asOpponents } : null
}

export function discardPasteHandoff(storage: Storage, id: string) {
  storage.removeItem(KEY_PREFIX + id)
}
