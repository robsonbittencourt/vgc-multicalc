import { poke } from "@cy-support/e2e"
import { goToTeamVsManyMobile } from "@cy-support/setup"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const teamTabs = new TeamTabsMobile()

describe("Action menu of a team tab", () => {
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

describe("Action menu with the team full", () => {
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

describe("Actions of the menu really change the team", () => {
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
