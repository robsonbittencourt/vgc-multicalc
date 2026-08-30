import { HowToUse } from "@page-object/how-to-use"

const howToUse = new HowToUse()

describe("Navigation", () => {
  beforeEach(() => {
    howToUse.open()
  })

  it("Should open the index from the header", () => {
    howToUse.pathIs("/how-to-use")

    howToUse.cardsCountIsAtLeast(5)
  })

  it("Should navigate to a subpage and back to the index", () => {
    howToUse.openCard("speed-calc")

    howToUse.pathIs("/how-to-use/speed-calc")
    howToUse.subpageTitleIs("Speed Calc")

    howToUse.back()

    howToUse.pathIs("/how-to-use")
    howToUse.indexIsVisible()
  })

  it("Should open each subpage with its own title", () => {
    howToUse.openCard("import-data")

    howToUse.subpageHasTitle()

    howToUse.back()

    howToUse.openCard("type-calc")

    howToUse.pathIs("/how-to-use/type-calc")
    howToUse.subpageHasTitle()
  })
})

describe("Scroll position", () => {
  beforeEach(() => {
    howToUse.open()
  })

  it("Should put the scroll back on top when entering a subpage", () => {
    howToUse.scrollToBottom()

    howToUse.pageIsScrolled()

    howToUse.openCard("speed-calc")

    howToUse.pathIs("/how-to-use/speed-calc")

    howToUse.pageScrollIsAtTop()
  })
})
