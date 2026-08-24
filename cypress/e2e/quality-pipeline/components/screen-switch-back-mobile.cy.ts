import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"

const bottomNav = new BottomNav()
const headerMobile = new HeaderMobile()

const PROBABILITY_TABS = ["Detailed", "General", "Build", "Teams"]
const SPEED_TABS = ["Speed", "Insights", "Teams", "Settings"]

describe("Switching screens from the menu", () => {
  it("Should switch screens without growing the history", () => {
    goToTeamVsManyMobile()
    bottomNav.goTo("Teams")

    cy.window().then(win => {
      const before = win.history.length

      headerMobile.goToScreen("Probability Calc")

      bottomNav.tabsAre(PROBABILITY_TABS)
      cy.window().its("history.length").should("eq", before)
    })
  })

  it("Should keep the back button working inside the screen after a switch", () => {
    goToTeamVsManyMobile()

    headerMobile.goToScreen("Speed Calc")
    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    headerMobile.androidBack()

    bottomNav.tabsAre(SPEED_TABS)
    bottomNav.onlyActiveTabIs("Speed")
  })
})
