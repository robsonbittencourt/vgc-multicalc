import { EV_INTERVALS } from "./ev-optimizer-constants"

describe("EV_INTERVALS", () => {
  it("should start with the correct sequence", () => {
    expect(EV_INTERVALS[0]).toBe(0)
    expect(EV_INTERVALS[1]).toBe(4)
    expect(EV_INTERVALS[2]).toBe(12)
    expect(EV_INTERVALS[3]).toBe(20)
    expect(EV_INTERVALS[4]).toBe(28)
  })

  it("should include 0 and 4 as first two values", () => {
    expect(EV_INTERVALS.length).toBeGreaterThanOrEqual(2)
    expect(EV_INTERVALS[0]).toBe(0)
    expect(EV_INTERVALS[1]).toBe(4)
  })

  it("should increment by 8 after the first interval", () => {
    for (let i = 2; i < EV_INTERVALS.length; i++) {
      expect(EV_INTERVALS[i] - EV_INTERVALS[i - 1]).toBe(8)
    }
  })

  it("should not exceed 252", () => {
    EV_INTERVALS.forEach(evInterval => {
      expect(evInterval).toBeLessThanOrEqual(252)
    })
  })

  it("should have last value at or near 252", () => {
    const lastEvInterval = EV_INTERVALS[EV_INTERVALS.length - 1]

    expect(lastEvInterval).toBeGreaterThanOrEqual(244)
    expect(lastEvInterval).toBeLessThanOrEqual(252)
  })

  it("should have correct total number of intervals", () => {
    expect(EV_INTERVALS.length).toBe(33)
  })

  it("should contain all expected values up to 252", () => {
    const expectedValues = [0, 4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244, 252]

    expectedValues.forEach(expected => {
      expect(EV_INTERVALS).toContain(expected)
    })
  })
})
