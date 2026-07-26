const idCache = new Map<string, string>()

export function toID(text: string): string {
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

function computeID(text: string): string {
  const lower = `${text}`.toLowerCase()

  if (lower === "flabébé") {
    return "flabebe"
  }

  return lower.replace(/[^a-z0-9]+/g, "")
}
