import { formatOffensiveBestEffortLabel, formatOutOfReachLabel, formatPendingTargetLabel, formatPendingTargetParts } from "@features/pokemon-build/utils/offensive-best-effort-label"

describe("formatOffensiveBestEffortLabel", () => {
  it("should describe the best reachable chance to knock out in one hit", () => {
    const koChance = 0.3125

    const label = formatOffensiveBestEffortLabel(koChance, 1)

    expect(label).toEqual("Best effort: 31.3% chance to OHKO")
  })

  it("should name the hit count of higher thresholds", () => {
    const koChance = 0.07421875

    const label = formatOffensiveBestEffortLabel(koChance, 3)

    expect(label).toEqual("Best effort: 7.4% chance to 3HKO")
  })

  it("should never round a real chance down to zero", () => {
    const koChance = 0.0001

    const label = formatOffensiveBestEffortLabel(koChance, 2)

    expect(label).toEqual("Best effort: 0.1% chance to 2HKO")
  })

  it("should never round a chance below certainty up to a hundred", () => {
    const koChance = 0.9999

    const label = formatOffensiveBestEffortLabel(koChance, 1)

    expect(label).toEqual("Best effort: 99.9% chance to OHKO")
  })

  it("should state that no spread reaches the knock out when the chance is zero", () => {
    const koChance = 0

    const label = formatOffensiveBestEffortLabel(koChance, 2)

    expect(label).toEqual("No spread reaches the 2HKO")
  })

  it("should report how many targets are knocked out when the spread covers some of them", () => {
    const koChance = 0.875

    const label = formatOffensiveBestEffortLabel(koChance, 1, 3, 4, "Kingambit")

    expect(label).toEqual("Knocks out 3 of 4 targets")
  })

  it("should name the best target when nothing is covered and there is more than one target", () => {
    const koChance = 0.875

    const label = formatOffensiveBestEffortLabel(koChance, 1, 0, 4, "Kingambit")

    expect(label).toEqual("Best effort: 87.5% chance to OHKO Kingambit")
  })

  it("should omit the target name when there is a single target", () => {
    const koChance = 0.875

    const label = formatOffensiveBestEffortLabel(koChance, 1, 0, 1, "Kingambit")

    expect(label).toEqual("Best effort: 87.5% chance to OHKO")
  })
})

describe("formatOutOfReachLabel", () => {
  it("should report how many targets take no damage at all", () => {
    const label = formatOutOfReachLabel(2, 4)

    expect(label).toEqual("2 of 4 targets out of reach")
  })

  it("should say nothing when every target is reachable", () => {
    const label = formatOutOfReachLabel(0, 4)

    expect(label).toEqual("")
  })

  it("should say nothing when there is a single target", () => {
    const label = formatOutOfReachLabel(1, 1)

    expect(label).toEqual("")
  })
})

describe("formatPendingTargetLabel", () => {
  it("should name the target the remaining investment is spent on", () => {
    const koChance = 0.875

    const label = formatPendingTargetLabel(koChance, 1, "Kingambit")

    expect(label).toEqual("Best result: Kingambit — 87.5% chance to OHKO")
  })

  it("should name the hit count of higher thresholds", () => {
    const koChance = 0.3125

    const label = formatPendingTargetLabel(koChance, 3, "Garchomp")

    expect(label).toEqual("Best result: Garchomp — 31.3% chance to 3HKO")
  })

  it("should say nothing when no target is pending", () => {
    const koChance = 0.875

    const label = formatPendingTargetLabel(koChance, 1, null)

    expect(label).toEqual("")
  })

  it("should say nothing when the pending target cannot be knocked out at all", () => {
    const koChance = 0

    const label = formatPendingTargetLabel(koChance, 1, "Kingambit")

    expect(label).toEqual("")
  })
})

describe("formatPendingTargetParts", () => {
  it("should split the target and the chance into separate parts", () => {
    const koChance = 0.875

    const parts = formatPendingTargetParts(koChance, 1, "Kingambit")

    expect(parts).toEqual({ target: "Best result: Kingambit", chance: "87.5% chance to OHKO" })
  })

  it("should name the hit count of higher thresholds", () => {
    const koChance = 0.3125

    const parts = formatPendingTargetParts(koChance, 3, "Garchomp")

    expect(parts).toEqual({ target: "Best result: Garchomp", chance: "31.3% chance to 3HKO" })
  })

  it("should return nothing when no target is pending", () => {
    const koChance = 0.875

    const parts = formatPendingTargetParts(koChance, 1, null)

    expect(parts).toBeNull()
  })

  it("should return nothing when the pending target cannot be knocked out at all", () => {
    const koChance = 0

    const parts = formatPendingTargetParts(koChance, 1, "Kingambit")

    expect(parts).toBeNull()
  })
})
