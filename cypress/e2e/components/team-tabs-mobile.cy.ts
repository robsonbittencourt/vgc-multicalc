import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const teamTabs = new TeamTabsMobile()

describe("Action menu of a team tab", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    teamTabs.teamSizeIs(4)
    teamTabs.activateTeamMember(0)
  })

  it("Should open the action menu with a long press on the active tab", () => {
    teamTabs.actionMenuIsHidden()

    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()
    teamTabs.actionMenuDuplicateIsEnabled()
    teamTabs.actionMenuDeleteIsEnabled()
  })

  it("Should close the action menu when the backdrop is touched", () => {
    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()

    teamTabs.touchActionMenuBackdrop()

    teamTabs.actionMenuIsHidden()
  })
})

describe("Action menu with the team full", MOBILE_SUITE, () => {
  it("Should disable the duplicate action", () => {
    goToTeamVsManyMobile()
    teamTabs.teamSizeIs(4)

    build.importPokemon(poke["ursaluna"])
    teamTabs.teamSizeIs(5)
    build.importPokemon(poke["dragapult"])
    teamTabs.teamSizeIs(6)

    teamTabs.activateTeamMember(0)
    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()
    teamTabs.actionMenuDuplicateIsDisabled()
    teamTabs.actionMenuDeleteIsEnabled()
  })
})

describe("Actions of the menu really change the team", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    teamTabs.teamSizeIs(4)
    teamTabs.activateTeamMember(0)
  })

  it("Should duplicate the member", () => {
    teamTabs.longPressTeamMember(0)
    teamTabs.actionMenuIsVisible()

    teamTabs.duplicateFromTeamMenu()

    teamTabs.actionMenuIsHidden()
    teamTabs.teamSizeIs(5)
  })

  it("Should delete the member", () => {
    teamTabs.longPressTeamMember(0)
    teamTabs.actionMenuIsVisible()

    teamTabs.deleteFromTeamMenu()

    teamTabs.actionMenuIsHidden()
    teamTabs.teamSizeIs(3)
  })
})

describe("Reorder team tabs", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    teamTabs.teamSizeIs(4)
    teamTabs.activateTeamMember(0)
  })

  it("Should offer the reorder action in the action menu", () => {
    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuReorderIsEnabled()
  })

  it("Should enter the reorder mode from the action menu", () => {
    teamTabs.reorderBarIsHidden()

    teamTabs.longPressTeamMember(0)
    teamTabs.reorderFromTeamMenu()

    teamTabs.actionMenuIsHidden()
    teamTabs.reorderBarIsVisible()
  })

  it("Should leave the reorder mode when done is touched", () => {
    teamTabs.longPressTeamMember(0)
    teamTabs.reorderFromTeamMenu()
    teamTabs.reorderBarIsVisible()

    teamTabs.doneReordering()

    teamTabs.reorderBarIsHidden()
  })

  it("Should move a Pokémon to the first position when its tab is dragged there", () => {
    teamTabs.tabOrderIs(["Charizard", "Dragonite", "Venusaur", "Incineroar"])

    teamTabs.longPressTeamMember(0)
    teamTabs.reorderFromTeamMenu()
    teamTabs.dragTabToPosition(2, 0)

    teamTabs.tabOrderIs(["Venusaur", "Charizard", "Dragonite", "Incineroar"])
  })

  it("Should keep the new order after leaving the reorder mode", () => {
    teamTabs.longPressTeamMember(0)
    teamTabs.reorderFromTeamMenu()
    teamTabs.dragTabToPosition(0, 3)

    teamTabs.doneReordering()

    teamTabs.reorderBarIsHidden()
    teamTabs.tabOrderIs(["Dragonite", "Venusaur", "Incineroar", "Charizard"])
  })

  it("Should change the Pokémon being edited when another tab is touched inside the reorder mode", () => {
    teamTabs.longPressTeamMember(0)
    teamTabs.reorderFromTeamMenu()

    teamTabs.activateVisibleTeamMember(2)

    teamTabs.reorderBarIsVisible()
    teamTabs.visibleActiveTabHasSprite("Venusaur")
  })

  it("Should not reorder while the reorder mode is off", () => {
    teamTabs.dragTabToPosition(2, 0)

    teamTabs.tabOrderIs(["Charizard", "Dragonite", "Venusaur", "Incineroar"])
  })
})

describe("Reorder with a single Pokémon", MOBILE_SUITE, () => {
  it("Should disable the reorder action", () => {
    goToTeamVsManyMobile()
    teamTabs.teamSizeIs(4)
    teamTabs.activateTeamMember(0)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()
    teamTabs.teamSizeIs(3)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()
    teamTabs.teamSizeIs(2)

    teamTabs.longPressTeamMember(0)
    teamTabs.deleteFromTeamMenu()
    teamTabs.teamSizeIs(1)

    teamTabs.longPressTeamMember(0)

    teamTabs.actionMenuIsVisible()
    teamTabs.actionMenuReorderIsDisabled()
  })
})
