import { formatBestEffortLabel } from "@features/pokemon-build/utils/best-effort-label"

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
})
