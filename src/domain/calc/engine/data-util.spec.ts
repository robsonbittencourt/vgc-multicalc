import { mergeDeep, toID } from "@calc/engine/data-util"

describe("toID", () => {
  it("lowercases and strips punctuation and spaces", () => {
    expect(toID("Great Tusk")).toBe("greattusk")
  })

  it("strips hyphens and periods", () => {
    expect(toID("Ho-Oh")).toBe("hooh")
  })

  it("maps Flabébé to its accent free id", () => {
    expect(toID("Flabébé")).toBe("flabebe")
  })

  it("keeps digits", () => {
    expect(toID("Porygon2")).toBe("porygon2")
  })
})

describe("mergeDeep", () => {
  it("copies source values onto the target", () => {
    expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it("ignores undefined sources", () => {
    expect(mergeDeep({ a: 1 }, undefined, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it("skips undefined values keeping the target value", () => {
    expect(mergeDeep({ a: 1 }, { a: undefined })).toEqual({ a: 1 })
  })

  it("copies arrays instead of sharing the reference", () => {
    const source = { list: [1, 2] }
    const merged = mergeDeep<{ list: number[] }>({}, source)

    merged.list.push(3)

    expect({ merged: merged.list, source: source.list }).toEqual({ merged: [1, 2, 3], source: [1, 2] })
  })

  it("merges nested objects recursively", () => {
    expect(mergeDeep({ stats: { atk: 10, def: 20 } }, { stats: { def: 99 } })).toEqual({ stats: { atk: 10, def: 99 } })
  })

  it("replaces a non object target value with the nested source object", () => {
    expect(mergeDeep({ stats: 5 }, { stats: { atk: 1 } })).toEqual({ stats: { atk: 1 } })
  })

  it("applies later sources over earlier ones", () => {
    expect(mergeDeep({}, { a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })
})
