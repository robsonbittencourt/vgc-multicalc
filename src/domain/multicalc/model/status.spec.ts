import { Status } from "./status"

describe("Status", () => {
  it("should initialize with the correct code and description", () => {
    expect(Status.HEALTHY.code).toBe("")
    expect(Status.HEALTHY.description).toBe("Healthy")

    expect(Status.SLEEP.code).toBe("slp")
    expect(Status.SLEEP.description).toBe("Sleep")

    expect(Status.POISON.code).toBe("psn")
    expect(Status.POISON.description).toBe("Poison")

    expect(Status.BURN.code).toBe("brn")
    expect(Status.BURN.description).toBe("Burn")

    expect(Status.FREEZE.code).toBe("frz")
    expect(Status.FREEZE.description).toBe("Freeze")

    expect(Status.PARALYSIS.code).toBe("par")
    expect(Status.PARALYSIS.description).toBe("Paralysis")
  })

  it("should find status by code", () => {
    expect(Status.byCode("slp")).toBe(Status.SLEEP)
    expect(Status.byCode("psn")).toBe(Status.POISON)
    expect(Status.byCode("brn")).toBe(Status.BURN)
    expect(Status.byCode("frz")).toBe(Status.FREEZE)
    expect(Status.byCode("par")).toBe(Status.PARALYSIS)
  })

  it("should find status by description", () => {
    expect(Status.byDescription("Sleep")).toBe(Status.SLEEP)
    expect(Status.byDescription("Poison")).toBe(Status.POISON)
    expect(Status.byDescription("Burn")).toBe(Status.BURN)
    expect(Status.byDescription("Freeze")).toBe(Status.FREEZE)
    expect(Status.byDescription("Paralysis")).toBe(Status.PARALYSIS)
  })

  it("should return all descriptions", () => {
    const descriptions = Status.allDescriptions()
    expect(descriptions).toContain("Healthy")
    expect(descriptions).toContain("Sleep")
    expect(descriptions).toContain("Poison")
    expect(descriptions).toContain("Burn")
    expect(descriptions).toContain("Freeze")
    expect(descriptions).toContain("Paralysis")
  })
})
