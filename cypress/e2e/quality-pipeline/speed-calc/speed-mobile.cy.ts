import { goToMobile, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { SpeedCalc } from "@page-object/speed-calc"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const headerMobile = new HeaderMobile()
const teamsWidget = new TeamsWidget()
const speedCalc = new SpeedCalc()

describe("Without a Pokémon selected", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()

    bottomNav.goTo("Teams")
    teamsWidget.deleteActiveTeam()
    teamsWidget.deleteActiveTeam()
    teamsWidget.deleteActiveTeam()

    headerMobile.goToScreen("Speed Calc")
  })

  it("Should ask to select a Pokémon on the Speed tab", () => {
    bottomNav.onlyActiveTabIs("Speed")

    speedCalc.emptyMessageIsVisible()
  })

  it("Should ask to select a Pokémon on the Insights tab", () => {
    bottomNav.goTo("Insights")

    speedCalc.emptyMessageIsVisible()
  })
})

describe("Scale on a narrow screen", () => {
  beforeEach(() => {
    goToMobile("Speed Calc")
  })

  it("Should list the tiers sorted by speed", () => {
    speedCalc.speedInOrder()
  })
})
