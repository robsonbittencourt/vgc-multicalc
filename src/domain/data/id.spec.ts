import { toID } from "@data/id"

describe("toID", () => {
  it("maps Flabébé's accented name to the flabebe id", () => {
    expect(toID("Flabébé")).toBe("flabebe")
  })

  it("lowercases and strips non-alphanumeric characters for ordinary names", () => {
    expect(toID("Farfetch'd")).toBe("farfetchd")
  })
})
