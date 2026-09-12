import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
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

describe("Bottom nav tabs", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should offer Results, Teams and Settings", () => {
    bottomNav.tabsAre(["Results", "Teams", "Settings"])
    bottomNav.onlyActiveTabIs("Results")
  })

  smoke("Should switch between the three tabs", () => {
    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Settings")
    bottomNav.onlyActiveTabIs("Settings")

    bottomNav.goTo("Results")
    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(300)
    shell.rememberContentScroll("resultsScroll")

    bottomNav.goTo("Teams")

    shell.tabScrollIs("scrollable-content-teams", 0)

    bottomNav.goTo("Results")

    shell.contentScrollIsTheRememberedOne("resultsScroll")
  })
})

describe("Teams tab", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should stay on Teams when another team is activated", () => {
    bottomNav.goTo("Teams")
    teamsWidget.importPokepaste(poke["pokepaste"])

    bottomNav.goTo("Teams")
    teamsWidget.visibleTeamsCountIs(2)

    teamsWidget.selectTeamAt(0)

    bottomNav.onlyActiveTabIs("Teams")
  })

  it("Should go back to Results when a new team is created", () => {
    bottomNav.goTo("Teams")

    teamsWidget.createTeam()

    bottomNav.onlyActiveTabIs("Results")
  })
})

describe("Collapsible cards", MOBILE_SUITE, () => {
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

describe("Bottom nav reacting to the scroll", MOBILE_SUITE, () => {
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

describe("Switching between the two modes", MOBILE_SUITE, () => {
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
    shell.contentIsScrolledDown()

    headerMobile.goToScreen("Many vs Team")

    bottomNav.onlyActiveTabIs("Results")
    shell.contentScrollIs(0)
  })
})

describe("Activating an opponent", MOBILE_SUITE, () => {
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
    shell.contentIsScrolledDown()

    opponents.selectDefender("Snorlax")

    opponents.cardOrderStartsWith("Snorlax")
    shell.contentScrollIs(0)
  })
})

describe("Removing the opponent being edited", MOBILE_SUITE, () => {
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

describe("Adding an opponent", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should keep the edition on the team Pokémon instead of the added opponent", () => {
    build.nameIs("Charizard")

    shell.addOpponent()
    build.selectFirstPokemonFromOpenTable().then(chosen => {
      opponents.exists(chosen)
      build.nameIs("Charizard")
    })
  })

  it("Should bring the added opponent into the viewport", () => {
    shell.addOpponent()
    build.selectFirstPokemonFromOpenTable().then(chosen => {
      shell.tableOverlayIsClosed()
      shell.opponentCardIsInsideTheViewport(chosen)
    })
  })

  it("Should bring the added opponent into the viewport with order by damage enabled", () => {
    bottomNav.goTo("Settings")
    opponents.toggleOrderByDamage()
    bottomNav.goTo("Results")

    shell.addOpponent()
    build.selectFirstPokemonFromOpenTable().then(chosen => {
      shell.opponentCardIsInsideTheViewport(chosen)
      build.nameIs("Charizard")
    })
  })
})

describe("Opponent boosts", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should label the selects as Def and SpD on Team vs Many", () => {
    opponents.physicalBoostLabelIs("Def")
    opponents.specialBoostLabelIs("SpD")
  })

  it("Should apply the chosen boost to every opponent", () => {
    shell.toggleFirstCardExpansion()

    opponents.get("Blastoise").descriptionContains("4 HP / 0 SpD Blastoise")

    opponents.applySpecialBoost("+2")

    opponents.get("Blastoise").descriptionContains("+2 4 HP / 0 SpD Blastoise")
  })

  it("Should keep the applied boost selected", () => {
    opponents.applySpecialBoost("+2")

    opponents.specialBoostSelectionIs("+2")
  })

  it("Should replace a previously applied boost instead of stacking it", () => {
    shell.toggleFirstCardExpansion()

    opponents.applySpecialBoost("+2")

    opponents.get("Blastoise").descriptionContains("+2 4 HP / 0 SpD Blastoise")

    opponents.applySpecialBoost("-1")

    opponents.get("Blastoise").descriptionContains("-1 4 HP / 0 SpD Blastoise")
  })
})

describe("Opponent boosts on Many vs Team", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    headerMobile.goToScreen("Many vs Team")
  })

  it("Should label the selects as Atk and SpA", () => {
    opponents.physicalBoostLabelIs("Atk")
    opponents.specialBoostLabelIs("SpA")
  })

  it("Should apply the chosen boost to every opponent attacker", () => {
    shell.toggleFirstCardExpansion()

    opponents.get("Blastoise").descriptionContains("4+ SpA Blastoise")

    opponents.applySpecialBoost("+2")

    opponents.get("Blastoise").descriptionContains("+2 4+ SpA Blastoise")
  })
})
