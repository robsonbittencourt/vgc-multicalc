import { pageCount, pageItems } from "@multicalc/community-teams"

describe("pageCount", () => {
  it("should round the last partial page up", () => {
    expect(pageCount(861, 20)).toBe(44)
  })

  it("should keep one page when there is nothing to show", () => {
    expect(pageCount(0, 20)).toBe(1)
  })
})

describe("pageItems", () => {
  const items = ["A", "B", "C", "D", "E", "F", "G"]

  it("should return the items of the requested page", () => {
    expect(pageItems(items, 2, 3)).toEqual(["D", "E", "F"])
  })

  it("should return the remaining items on the last page", () => {
    expect(pageItems(items, 3, 3)).toEqual(["G"])
  })

  it("should return nothing past the last page", () => {
    expect(pageItems(items, 4, 3)).toEqual([])
  })
})
