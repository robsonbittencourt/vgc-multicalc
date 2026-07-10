import { describe, expect, it } from "vitest"
import { uuid } from "@multicalc/utils/uuid"

describe("uuid", () => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  it("delegates to crypto.randomUUID when available", () => {
    const original = crypto.randomUUID
    crypto.randomUUID = () => "11111111-1111-4111-8111-111111111111"

    const result = uuid()

    crypto.randomUUID = original

    expect(result).toEqual("11111111-1111-4111-8111-111111111111")
  })

  it("falls back to a manual v4 uuid when randomUUID is unavailable", () => {
    const original = crypto.randomUUID
    // @ts-expect-error intentionally break the typeof-function guard
    crypto.randomUUID = undefined

    const result = uuid()

    crypto.randomUUID = original

    expect(result).toMatch(uuidPattern)
  })
})
