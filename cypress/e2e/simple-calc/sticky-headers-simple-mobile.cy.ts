import { MOBILE_SUITE, goToSimpleCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { StickyHeadersMobile } from "@page-object/sticky-headers-mobile"

const sticky = new StickyHeadersMobile()
const bottomNav = new BottomNav()

const PAGE = "app-simple-calc-mobile"

describe("Sticky tabs and moves on One vs One", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
  })

  it("Should keep the side tabs on top while scrolling", () => {
    sticky.teamTabsAreStuckToTop()

    sticky.scrollDown(400)

    sticky.teamTabsAreStuckToTop()
  })

  it("Should keep the moves right below the side tabs while scrolling", () => {
    sticky.scrollDown(400)

    sticky.movesAreStuckBelowTeamTabs()
  })

  it("Should hide the moves edit button only when the moves are stuck", () => {
    sticky.movesEditButtonIsVisible()

    sticky.scrollDown(400)

    sticky.movesEditButtonIsHidden()

    sticky.scrollToTop()

    sticky.movesEditButtonIsVisible()
  })

  it("Should hide the header and the bottom nav when scrolling down", () => {
    sticky.headerIsVisible()
    bottomNav.isVisible()

    sticky.scrollDown(400)

    sticky.headerIsHidden()
    bottomNav.isHidden()

    sticky.scrollToTop()

    sticky.headerIsVisible()
    bottomNav.isVisible()
  })

  it("Should give the hidden header space back to the content", () => {
    sticky.contentReservesHeaderSpace(PAGE)

    sticky.scrollDown(400)

    sticky.contentUsesFullHeight(PAGE)
  })
})
