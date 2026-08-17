import { goToMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { SpeedCalc } from "@page-object/speed-calc"

const bottomNav = new BottomNav()
const speedCalc = new SpeedCalc()

describe("Tabs of the Speed Calc", () => {
  beforeEach(() => {
    goToMobile("Speed Calc")
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

  it("Should keep the filters and the Opponent side inside Settings", () => {
    speedCalc.filtersAreHidden()

    bottomNav.goTo("Settings")

    speedCalc.filtersAreVisible()
  })
})

describe("Tabs of the Probability Calc", () => {
  beforeEach(() => {
    goToMobile("Probability Calc")
  })

  it("Should offer Detailed, General, Build and Teams", () => {
    bottomNav.tabsAre(["Detailed", "General", "Build", "Teams"])
    bottomNav.onlyActiveTabIs("Detailed")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("General")
    bottomNav.onlyActiveTabIs("General")

    bottomNav.goTo("Build")
    bottomNav.onlyActiveTabIs("Build")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Detailed")
    bottomNav.onlyActiveTabIs("Detailed")
  })
})

describe("Tabs of the Type Calc", () => {
  beforeEach(() => {
    goToMobile("Type Calc")
  })

  it("Should offer Coverage, Insights, Build and Teams", () => {
    bottomNav.tabsAre(["Coverage", "Insights", "Build", "Teams"])
    bottomNav.onlyActiveTabIs("Coverage")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("Insights")
    bottomNav.onlyActiveTabIs("Insights")

    bottomNav.goTo("Build")
    bottomNav.onlyActiveTabIs("Build")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Coverage")
    bottomNav.onlyActiveTabIs("Coverage")
  })
})
