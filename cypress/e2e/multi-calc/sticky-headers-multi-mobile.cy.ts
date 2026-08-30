import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { StickyHeadersMobile } from "@page-object/sticky-headers-mobile"

const sticky = new StickyHeadersMobile()
const bottomNav = new BottomNav()

const PAGE = "app-multi-calc-mobile"

describe("Sticky team tabs and moves", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should keep the team tabs on top while scrolling", () => {
    sticky.teamTabsAreStuckToTop()

    sticky.scrollDown(400)

    sticky.teamTabsAreStuckToTop()
  })

  it("Should keep the moves right below the team tabs while scrolling", () => {
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
})

describe("Header and bottom nav on scroll", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should hide the header and the bottom nav when scrolling down", () => {
    sticky.headerIsVisible()
    bottomNav.isVisible()

    sticky.scrollDown(400)

    sticky.headerIsHidden()
    bottomNav.isHidden()
  })

  it("Should show the header and the bottom nav again when scrolling up", () => {
    sticky.scrollDown(400)
    sticky.headerIsHidden()

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
