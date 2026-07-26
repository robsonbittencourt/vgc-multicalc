import { toID } from "@data/id"

describe("toID", () => {
  it("maps Flabébé's accented name to the flabebe id", () => {
    expect(toID("Flabébé")).toBe("flabebe")
  })

  it("lowercases and strips non-alphanumeric characters for ordinary names", () => {
    expect(toID("Farfetch'd")).toBe("farfetchd")
  })

  it("lowercases and strips punctuation and spaces", () => {
    expect(toID("Great Tusk")).toBe("greattusk")
  })

  it("strips hyphens and periods", () => {
    expect(toID("Ho-Oh")).toBe("hooh")
  })

  it("keeps digits", () => {
    expect(toID("Porygon2")).toBe("porygon2")
  })
})
