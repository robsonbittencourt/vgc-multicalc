import { goToSpeedCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { MobileShell } from "@page-object/mobile-shell"
import { SpeedCalc } from "@page-object/speed-calc"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const speedCalc = new SpeedCalc()

describe("Bottom nav tabs", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should offer Speed, Insights, Teams and Settings", () => {
    bottomNav.tabsAre(["Speed", "Insights", "Teams", "Settings"])
    bottomNav.onlyActiveTabIs("Speed")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("Insights")
    bottomNav.onlyActiveTabIs("Insights")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Settings")
    bottomNav.onlyActiveTabIs("Settings")

    bottomNav.goTo("Speed")
    bottomNav.onlyActiveTabIs("Speed")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(50)
    shell.contentScrollIs(50)

    bottomNav.goTo("Settings")

    shell.tabScrollIs("scrollable-content-settings", 0)

    bottomNav.goTo("Speed")

    shell.contentScrollIs(50)
  })
})

describe("The scale", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should list the tiers sorted by speed", () => {
    speedCalc.speedInOrder()
  })

  it("Should keep the scale sorted after the Top Usage changes", () => {
    bottomNav.goTo("Settings")
    speedCalc.topUsage("60")

    bottomNav.goTo("Speed")

    speedCalc.speedInOrder()
  })
})

describe("Filters on the Settings tab", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
    bottomNav.goTo("Settings")
  })

  it("Should show the filters and the opponent side options", () => {
    speedCalc.filtersAreVisible()
  })

  it("Should offer every mode while the filter is a regulation", () => {
    speedCalc.availableModesAre(["Stats and Meta", "Stats", "Meta", "Base"])
  })

  it("Should hide the Top Usage when the filter is not a regulation", () => {
    speedCalc.filter("Opponents")

    speedCalc.topUsageIsHidden()
  })
})

describe("Insights tab", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should show the insights of the selected Pokémon", () => {
    bottomNav.goTo("Insights")

    cy.get("app-speed-insights").should("exist")
  })
})

describe("Narrow screen", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
  })

  it("Should not overflow the page horizontally", () => {
    shell.pageDoesNotOverflowHorizontally()
  })
})
