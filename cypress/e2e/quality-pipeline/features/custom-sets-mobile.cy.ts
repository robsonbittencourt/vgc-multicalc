import { goToTeamVsManyMobile } from "@cy-support/setup"
import { CustomSet } from "@page-object/custom-set"
import { CustomSetMobile } from "@page-object/custom-set-mobile"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const teamTabs = new TeamTabsMobile()
const customSet = new CustomSet()
const customSetMobile = new CustomSetMobile()

function saveASetAndOpenTheTable() {
  teamTabs.activateTeamMember(0)

  customSet.saveSet()
  customSetMobile.exitEditMode()

  build.openPokemonTable()
}

describe("Long press on a set row", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    saveASetAndOpenTheTable()
  })

  it("Should open the action menu with Edit, Duplicate and Delete", () => {
    customSetMobile.menuIsHidden()

    customSetMobile.longPressRow()

    customSetMobile.menuIsVisible()
  })

  it("Should cancel the long press when the finger moves more than eight pixels", () => {
    customSetMobile.longPressRowMoving(40)

    customSetMobile.menuIsHidden()
  })

  it("Should keep the long press for a movement within the threshold", () => {
    customSetMobile.longPressRowMoving(4)

    customSetMobile.menuIsVisible()
  })
})

describe("Actions of the menu", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    saveASetAndOpenTheTable()
  })

  it("Should duplicate the set keeping the original", () => {
    customSetMobile.rowsCountIs(1)

    customSetMobile.longPressRow()
    customSetMobile.duplicateFromMenu()

    customSetMobile.menuIsHidden()
    customSetMobile.rowsCountIs(2)
  })

  it("Should delete the set", () => {
    customSetMobile.rowsCountIs(1)

    customSetMobile.longPressRow()
    customSetMobile.deleteFromMenu()

    customSetMobile.menuIsHidden()
    customSetMobile.rowsCountIs(0)
  })

  it("Should enter the edit mode of the set", () => {
    customSetMobile.longPressRow()
    customSetMobile.editFromMenu()

    customSetMobile.menuIsHidden()
    customSetMobile.editTabIsOpen()
  })
})
