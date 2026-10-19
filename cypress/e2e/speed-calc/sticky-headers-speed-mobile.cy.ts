import { MOBILE_SUITE, goToSpeedCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { StickyHeadersMobile } from "@page-object/sticky-headers-mobile"

const sticky = new StickyHeadersMobile()
const bottomNav = new BottomNav()
const build = new PokemonBuildMobile()

const PAGE = "app-speed-calc-mobile"

describe("Sticky team tabs on Speed Calc", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should keep the team tabs on top while scrolling", () => {
    sticky.teamTabsAreStuckToTop()

    sticky.scrollDown(400)

    sticky.teamTabsAreStuckToTop()
  })

  it("Should show only the Spe slider once the build sliders scroll past", () => {
    sticky.scrollToBottom()

    sticky.stuckSpsAre(["spe"])

    sticky.inputStuckSp("spe", 20)
    sticky.scrollToTop()

    sticky.stuckSpsAreHidden()
    build.spValueIs("spe", 20)
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
