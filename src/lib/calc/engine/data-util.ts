import { ID } from "@lib/calc/model/types"

export function toID(text: string): ID {
  const lower = `${text}`.toLowerCase()

  if (lower === "flabébé") {
    return "flabebe" as ID
  }

  return lower.replace(/[^a-z0-9]+/g, "") as ID
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") {
    return false
  }

  const proto = Object.getPrototypeOf(value)

  return proto === Object.prototype || proto === null
}

type AnyRecord = Record<string, unknown>

export function mergeDeep<T>(target: AnyRecord, ...sources: (Partial<T> | AnyRecord | undefined)[]): T {
  for (const source of sources) {
    if (!source) {
      continue
    }

    for (const key of Object.keys(source)) {
      const value = (source as AnyRecord)[key]

      if (value === undefined || target === value) {
        continue
      }

      if (Array.isArray(value)) {
        target[key] = value.slice()
      } else if (isPlainObject(value)) {
        const base = isPlainObject(target[key]) ? (target[key] as AnyRecord) : {}
        target[key] = mergeDeep(base, value)
      } else {
        target[key] = value
      }
    }
  }

  return target as T
}
