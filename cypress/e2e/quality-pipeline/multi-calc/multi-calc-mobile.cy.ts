import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()
const headerMobile = new HeaderMobile()
const shell = new MobileCalcShell()
const opponents = new Opponent()
const teamsWidget = new TeamsWidget()

describe("Bottom nav tabs", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should offer Results, Teams and Settings", () => {
    bottomNav.tabsAre(["Results", "Teams", "Settings"])
    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should switch between the three tabs", () => {
    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Settings")
    bottomNav.onlyActiveTabIs("Settings")

    bottomNav.goTo("Results")
    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(300)
    shell.contentScrollIs(300)

    bottomNav.goTo("Teams")

    shell.contentScrollIs(0)

    bottomNav.goTo("Results")

    shell.contentScrollIs(300)
  })
})

describe("Teams tab", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should stay on Teams when another team is activated", () => {
    bottomNav.goTo("Teams")

    teamsWidget.selectTeamAt(1)

    bottomNav.onlyActiveTabIs("Teams")
  })

  it("Should go back to Results when a new team is created", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()

    bottomNav.onlyActiveTabIs("Results")
  })
})

describe("Collapsible cards", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should start collapsed and expand the tapped card", () => {
    shell.expansionTogglesCountIsAtLeast(2)

    shell.cardIsCollapsed(0)

    shell.toggleFirstCardExpansion()

    shell.cardIsExpanded(0)
  })

  it("Should keep the expansion per card", () => {
    shell.toggleFirstCardExpansion()

    shell.cardIsExpanded(0)
    shell.cardIsCollapsed(1)
  })

  it("Should survive a re-render of the list", () => {
    shell.toggleFirstCardExpansion()

    shell.cardIsExpanded(0)

    bottomNav.goTo("Teams")
    bottomNav.goTo("Results")

    shell.cardIsExpanded(0)
  })
})

describe("Bottom nav reacting to the scroll", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should hide when scrolling down and come back when scrolling up", () => {
    bottomNav.isVisible()

    shell.scrollContentTo(400)

    bottomNav.isHidden()

    shell.scrollContentTo(300)
    shell.scrollContentTo(100)

    bottomNav.isVisible()
  })

  it("Should stay visible for a scroll shorter than the threshold", () => {
    shell.scrollContentTo(30)

    bottomNav.isVisible()
  })
})

describe("Switching between the two modes", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should go back to Results and reset the scroll", () => {
    bottomNav.goTo("Settings")
    bottomNav.onlyActiveTabIs("Settings")

    headerMobile.goToScreen("Many vs Team")

    bottomNav.onlyActiveTabIs("Results")
    shell.contentScrollIs(0)
  })

  it("Should reset the scroll of the Results tab itself", () => {
    shell.scrollContentTo(300)
    shell.contentScrollIs(300)

    headerMobile.goToScreen("Many vs Team")

    bottomNav.onlyActiveTabIs("Results")
    shell.contentScrollIs(0)
  })
})

describe("Activating an opponent", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should move the activated card to the top of the list", () => {
    opponents.cardOrderStartsWith("Blastoise")

    opponents.selectDefender("Snorlax")

    opponents.cardOrderStartsWith("Snorlax")
  })

  it("Should scroll back to the top when a card further down is activated", () => {
    shell.scrollContentTo(500)
    shell.contentScrollIs(500)

    opponents.selectDefender("Snorlax")

    opponents.cardOrderStartsWith("Snorlax")
    shell.contentScrollIs(0)
  })
})

describe("Removing the opponent being edited", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should give the edition back to the team when the edited opponent is removed", () => {
    opponents.selectDefender("Snorlax")

    build.nameIs("Snorlax")

    shell.expandOpponentCard("Snorlax")
    shell.deleteOpponentCard("Snorlax")

    opponents.doesNotExists("Snorlax")
    build.nameIs("Charizard")
  })
})
