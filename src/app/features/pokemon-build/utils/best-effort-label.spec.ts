import { formatBestEffortLabel, formatPendingAttackerLabel, formatPendingAttackerParts, formatUnprotectedLabel } from "@features/pokemon-build/utils/best-effort-label"

describe("formatBestEffortLabel", () => {
  it("should describe the remaining chance to be knocked out in one hit", () => {
    const koChance = 0.26171875

    const label = formatBestEffortLabel(koChance, 2)

    expect(label).toEqual("Best effort: 26.2% chance to OHKO")
  })

  it("should name the hit count of higher survival thresholds", () => {
    const koChance = 0.07421875

    const label = formatBestEffortLabel(koChance, 4)

    expect(label).toEqual("Best effort: 7.4% chance to 3HKO")
  })

  it("should never round a real chance down to zero", () => {
    const koChance = 0.0001

    const label = formatBestEffortLabel(koChance, 3)

    expect(label).toEqual("Best effort: 0.1% chance to 2HKO")
  })

  it("should never round a chance below certainty up to a hundred", () => {
    const koChance = 0.9999

    const label = formatBestEffortLabel(koChance, 2)

    expect(label).toEqual("Best effort: 99.9% chance to OHKO")
  })

  it("should state that no spread avoids a guaranteed knock out", () => {
    const koChance = 1

    const label = formatBestEffortLabel(koChance, 3)

    expect(label).toEqual("Can't avoid a guaranteed 2HKO")
  })

  it("should report the partial coverage when some attackers are survived", () => {
    const koChance = 0.42

    const label = formatBestEffortLabel(koChance, 2, 3, 5, "Koraidon")

    expect(label).toEqual("Survives 3 of 5 attackers")
  })

  it("should name the worst attacker when none is survived among several", () => {
    const koChance = 0.313

    const label = formatBestEffortLabel(koChance, 2, 0, 4, "Chien-Pao")

    expect(label).toEqual("Best effort: 31.3% chance to OHKO from Chien-Pao")
  })

  it("should name the attacker behind a guaranteed knock out among several", () => {
    const koChance = 1

    const label = formatBestEffortLabel(koChance, 2, 0, 3, "Koraidon + Miraidon")

    expect(label).toEqual("Can't avoid a guaranteed OHKO from Koraidon + Miraidon")
  })
})

describe("formatUnprotectedLabel", () => {
  it("should count the attackers that cannot be survived", () => {
    const label = formatUnprotectedLabel(2, 5)

    expect(label).toEqual("2 of 5 attackers can't be survived")
  })

  it("should stay silent when every attacker is survived", () => {
    const label = formatUnprotectedLabel(0, 5)

    expect(label).toEqual("")
  })

  it("should stay silent when there is a single attacker", () => {
    const label = formatUnprotectedLabel(1, 1)

    expect(label).toEqual("")
  })
})

describe("formatPendingAttackerLabel", () => {
  it("should describe the worst remaining attacker", () => {
    const label = formatPendingAttackerLabel(0.184, 3, "Chi-Yu")

    expect(label).toEqual("Worst case: Chi-Yu — 18.4% chance to 2HKO")
  })

  it("should stay silent without a pending attacker", () => {
    const label = formatPendingAttackerLabel(0.184, 2, null)

    expect(label).toEqual("")
  })

  it("should stay silent when there is no chance to be knocked out", () => {
    const label = formatPendingAttackerLabel(0, 2, "Chi-Yu")

    expect(label).toEqual("")
  })
})

describe("formatPendingAttackerParts", () => {
  it("should split the worst remaining attacker from its chance", () => {
    const parts = formatPendingAttackerParts(0.184, 3, "Chi-Yu")

    expect(parts).toEqual({ target: "Worst case: Chi-Yu", chance: "18.4% chance to 2HKO" })
  })

  it("should return nothing without a pending attacker", () => {
    const parts = formatPendingAttackerParts(0.184, 2, null)

    expect(parts).toBeNull()
  })

  it("should return nothing when there is no chance to be knocked out", () => {
    const parts = formatPendingAttackerParts(0, 2, "Chi-Yu")

    expect(parts).toBeNull()
  })
})
