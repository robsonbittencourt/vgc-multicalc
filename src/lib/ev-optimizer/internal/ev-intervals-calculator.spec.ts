import { TestBed } from "@angular/core/testing"
import { EvIntervalsCalculator } from "./ev-intervals-calculator"

describe("EvIntervalsCalculator", () => {
  let service: EvIntervalsCalculator

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvIntervalsCalculator]
    })

    service = TestBed.inject(EvIntervalsCalculator)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("getEvIntervals", () => {
    it("should return correct EV intervals sequence", () => {
      const evIntervals = service.getEvIntervals()

      expect(evIntervals[0]).toBe(0)
      expect(evIntervals[1]).toBe(4)
      expect(evIntervals[2]).toBe(12)
      expect(evIntervals[3]).toBe(20)
      expect(evIntervals[4]).toBe(28)
    })

    it("should include 0 and 4 as first two values", () => {
      const evIntervals = service.getEvIntervals()

      expect(evIntervals.length).toBeGreaterThanOrEqual(2)
      expect(evIntervals[0]).toBe(0)
      expect(evIntervals[1]).toBe(4)
    })

    it("should increment by 8 after the first interval", () => {
      const evIntervals = service.getEvIntervals()

      for (let i = 2; i < evIntervals.length; i++) {
        expect(evIntervals[i] - evIntervals[i - 1]).toBe(8)
      }
    })

    it("should not exceed 252", () => {
      const evIntervals = service.getEvIntervals()

      evIntervals.forEach(evInterval => {
        expect(evInterval).toBeLessThanOrEqual(252)
      })
    })

    it("should have last value at or near 252", () => {
      const evIntervals = service.getEvIntervals()
      const lastEvInterval = evIntervals[evIntervals.length - 1]

      expect(lastEvInterval).toBeGreaterThanOrEqual(244)
      expect(lastEvInterval).toBeLessThanOrEqual(252)
    })

    it("should return consistent results on multiple calls", () => {
      const evIntervals1 = service.getEvIntervals()
      const evIntervals2 = service.getEvIntervals()

      expect(evIntervals1).toEqual(evIntervals2)
    })

    it("should have correct total number of intervals", () => {
      const evIntervals = service.getEvIntervals()

      expect(evIntervals.length).toBe(33)
    })

    it("should contain all expected values up to 252", () => {
      const evIntervals = service.getEvIntervals()
      const expectedValues = [0, 4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244, 252]

      expectedValues.forEach(expected => {
        expect(evIntervals).toContain(expected)
      })
    })
  })
})
