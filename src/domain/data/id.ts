import type { ID } from "@data/types"

const idCache = new Map<string, ID>()

export function toID(text: string): ID {
  if (typeof text !== "string") {
    return computeID(text)
  }

  const cached = idCache.get(text)

  if (cached !== undefined) {
    return cached
  }

  const id = computeID(text)
  idCache.set(text, id)

  return id
}

function computeID(text: string): ID {
  const lower = `${text}`.toLowerCase()

  if (lower === "flabébé") {
    return "flabebe" as ID
  }

  return lower.replace(/[^a-z0-9]+/g, "") as ID
}
