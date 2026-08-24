import { goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const teamTabs = new TeamTabsMobile()
const bottomNav = new BottomNav()

describe("Action menu on a page with several team tabs instances", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    bottomNav.goTo("Build")
  })

  it("Should show the action menu inside the viewport and above the bottom nav", () => {
    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()
    teamTabs.actionMenuIsInsideViewport()
    teamTabs.actionMenuIsAboveBottomNav()
  })

  it("Should render the action menu outside the swipe track", () => {
    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()
    teamTabs.actionMenuIsRenderedOutsideTheSwipeTrack()
  })

  it("Should delete the member from the action menu", () => {
    teamTabs.visibleTeamSizeIs(4)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()

    teamTabs.visibleTeamSizeIs(3)
    teamTabs.actionMenuIsHidden()
  })
})
