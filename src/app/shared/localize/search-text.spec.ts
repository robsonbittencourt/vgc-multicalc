import { searchText } from "@shared/localize/search-text"

describe("searchText", () => {
  it("should match a name typed in hiragana with its katakana spelling", () => {
    const typed = searchText("りざーどん")

    expect(typed).toBe(searchText("リザードン"))
  })

  it("should match full-width letters and digits with the ones typed on a keyboard", () => {
    const official = searchText("１０まんボルト ポリゴンＺ")

    expect(official).toBe(searchText("10まんぼると ぽりごんz"))
  })

  it("should ignore the case of Latin names", () => {
    const typed = searchText("Trick Room")

    expect(typed).toBe("trick room")
  })
})
