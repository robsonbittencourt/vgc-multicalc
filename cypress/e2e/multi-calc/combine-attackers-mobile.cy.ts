import { MOBILE_SUITE } from "@cy-support/setup"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const teamTabs = new TeamTabsMobile()
const headerMobile = new HeaderMobile()
const shell = new MobileCalcShell()

const COMBINE_HINT_KEY = "combineAttackersHintDismissed"

function openTeamVsManyMobile(hintDismissed = false) {
  cy.window().then(win => {
    win.localStorage.removeItem("userData")

    if (hintDismissed) {
      win.localStorage.setItem(COMBINE_HINT_KEY, "true")
    } else {
      win.localStorage.removeItem(COMBINE_HINT_KEY)
    }
  })

  cy.reload()
  shell.isReady()
  headerMobile.goToTeamVsMany()
}

describe("Second attacker set by long press", MOBILE_SUITE, () => {
  beforeEach(() => {
    openTeamVsManyMobile()
  })

  it("Should set the second attacker and show the badge", () => {
    teamTabs.activateTeamMember(0)
    teamTabs.noSecondAttackerBadge()

    teamTabs.longPressTeamMemberToCombine(1)

    teamTabs.secondAttackerBadgeIsOn(1)
  })

  it("Should dismiss the coach mark when the second attacker is set", () => {
    teamTabs.activateTeamMember(0)
    teamTabs.combineHintIsVisible()

    teamTabs.longPressTeamMemberToCombine(1)

    teamTabs.combineHintIsHidden()
  })

  it("Should not set a second attacker when the long press is on the active tab", () => {
    teamTabs.activateTeamMember(0)

    teamTabs.longPressTeamMember(0)

    teamTabs.noSecondAttackerBadge()
    teamTabs.actionMenuIsVisible()
  })
})

describe("Coach mark of the combine gesture", MOBILE_SUITE, () => {
  it("Should appear in Team vs Many with two or more members", () => {
    openTeamVsManyMobile()

    teamTabs.combineHintIsVisible()
  })

  it("Should stay dismissed after Got it", () => {
    openTeamVsManyMobile()

    teamTabs.combineHintIsVisible()
    teamTabs.dismissCombineHint()

    teamTabs.combineHintIsHidden()

    cy.window().then(win => {
      expect(win.localStorage.getItem(COMBINE_HINT_KEY)).to.eq("true")
    })
  })

  it("Should stay hidden on the next visit once dismissed", () => {
    openTeamVsManyMobile(true)

    teamTabs.combineHintIsHidden()
  })
})

describe("Deleting a Pokémon of the combined pair", MOBILE_SUITE, () => {
  beforeEach(() => {
    openTeamVsManyMobile(true)
  })

  it("Should undo the combine when the primary attacker is deleted", () => {
    teamTabs.activateTeamMember(0)
    teamTabs.longPressTeamMemberToCombine(1)

    teamTabs.combinedPairIsOn(0, 1)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()

    teamTabs.noCombinedPairExists()
    teamTabs.noSecondAttackerBadge()
  })

  it("Should keep the remaining attacker selectable after the primary is deleted", () => {
    teamTabs.activateTeamMember(0)
    teamTabs.longPressTeamMemberToCombine(1)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()

    teamTabs.activateTeamMember(0)

    teamTabs.noCombinedPairExists()
    teamTabs.longPressTeamMember(0)
    teamTabs.actionMenuIsVisible()
  })
})
