import { MOBILE_SUITE, goToSpeedCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { MobileShell } from "@page-object/mobile-shell"
import { SpeedCalc } from "@page-object/speed-calc"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const speedCalc = new SpeedCalc()

describe("Bottom nav tabs", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should offer Speed, Insights, Teams and Modifiers", () => {
    bottomNav.tabsAre(["Speed", "Insights", "Teams", "Modifiers"])
    bottomNav.onlyActiveTabIs("Speed")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("Insights")
    bottomNav.onlyActiveTabIs("Insights")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Modifiers")
    bottomNav.onlyActiveTabIs("Modifiers")

    bottomNav.goTo("Speed")
    bottomNav.onlyActiveTabIs("Speed")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(50)
    shell.contentScrollIs(50)

    bottomNav.goTo("Modifiers")

    shell.tabScrollIs("scrollable-content-settings", 0)

    bottomNav.goTo("Speed")

    shell.contentScrollIs(50)
  })
})

describe("The scale", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should list the tiers sorted by speed", () => {
    speedCalc.speedInOrder()
  })

  it("Should keep the scale sorted after the Top Usage changes", () => {
    bottomNav.goTo("Modifiers")
    speedCalc.topUsage("60")

    bottomNav.goTo("Speed")

    speedCalc.speedInOrder()
  })
})

describe("Filters on the Modifiers tab", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
    bottomNav.goTo("Modifiers")
  })

  it("Should show the filters and the opponent side options", () => {
    speedCalc.filtersAreVisible()
  })

  it("Should offer every mode while the filter is a regulation with statistics", () => {
    speedCalc.filter("Reg M-B")

    speedCalc.availableModesAre(["Stats and Meta", "Stats", "Meta", "Base"])
  })

  it("Should hide the Top Usage when the filter is not a regulation", () => {
    speedCalc.filter("Opponents")

    speedCalc.topUsageIsHidden()
  })
})

describe("Insights tab", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should show the insights of the selected Pokémon", () => {
    bottomNav.goTo("Insights")

    cy.get("app-speed-insights").should("exist")
  })
})

describe("Narrow screen", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should not overflow the page horizontally", () => {
    shell.pageDoesNotOverflowHorizontally()
  })
})
