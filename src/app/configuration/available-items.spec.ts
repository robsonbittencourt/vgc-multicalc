import { AVAILABLE_ITEMS, availableItemNames } from "@configuration/available-items"
import { FEATURES } from "@configuration/feature-flags"
import { ITEM_DETAILS } from "@data/item-data"

describe("availableItemNames", () => {
  afterEach(() => {
    FEATURES.allItems = false
  })

  it("should return the curated list when the all items flag is off", () => {
    FEATURES.allItems = false

    expect(availableItemNames()).toBe(AVAILABLE_ITEMS)
  })

  it("should return every known item when the all items flag is on", () => {
    FEATURES.allItems = true

    expect(availableItemNames()).toEqual(Object.keys(ITEM_DETAILS))
  })

  it("should offer more items when the flag is on than when it is off", () => {
    FEATURES.allItems = false
    const curated = availableItemNames().length

    FEATURES.allItems = true
    const all = availableItemNames().length

    expect(all).toBeGreaterThan(curated)
  })

  it("should include the no item entry in the curated list", () => {
    expect(AVAILABLE_ITEMS).toContain("none")
  })

  it("should not repeat any item in the curated list", () => {
    expect(new Set(AVAILABLE_ITEMS).size).toBe(AVAILABLE_ITEMS.length)
  })

  it("should only list items that exist in the item data", () => {
    const unknown = AVAILABLE_ITEMS.filter(item => !(item in ITEM_DETAILS))

    expect(unknown).toEqual([])
  })
})
