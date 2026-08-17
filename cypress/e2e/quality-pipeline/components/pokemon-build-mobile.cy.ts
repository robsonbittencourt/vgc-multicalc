import { poke } from "@cy-support/e2e"
import { MOBILE_VIEWPORT } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()
const headerMobile = new HeaderMobile()
const teamTabs = new TeamTabsMobile()
const shell = new MobileCalcShell()

function openOneVsOneMobile() {
  cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height)
  cy.reload()
  shell.isReady()
}

describe("Sides", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
  })

  it("Should switch the build between the two top tabs", () => {
    build.rightPokemonIsActive()
    build.nameIs("Tyranitar")

    build.activateLeftPokemon()

    build.leftPokemonIsActive()
    build.nameIs("Ursaluna")
  })

  it("Should change the card description when the role is inverted", () => {
    build.cardDescription().then((before: string) => {
      build.toggleRole("defender")

      build.cardDescriptionIsNot(before)
    })
  })
})

describe("Selection overlays", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
  })

  it("Should hide the evs and the moves while a table is open", () => {
    build.openPokemonTable()

    build.evsAreHidden()
    build.movesAreHidden()
  })

  it("Should select a Pokémon from the full screen overlay", () => {
    build.selectPokemonFromTable("Rillaboom")

    build.nameIs("Rillaboom")
    build.movesAreVisible()
  })

  it("Should close the Pokémon overlay keeping the current Pokémon", () => {
    build.openPokemonTable()
    build.closePokemonTable()

    build.nameIs("Ursaluna")
  })

  it("Should select an item from the item overlay", () => {
    build.openItemTable()
    build.selectItemFromTable("Leftovers")

    build.itemIs("Leftovers")
  })

  it("Should select an ability from the ability overlay", () => {
    build.openAbilityTable()
    build.selectAbilityFromTable("Bulletproof")

    build.abilityIs("Bulletproof")
  })

  it("Should turn the header into Close while the table is open", () => {
    build.closeTableButtonIsHidden()

    build.openPokemonTable()

    build.closeTableButtonIsVisible()

    build.closePokemonTable()

    build.closeTableButtonIsHidden()
  })

  it("Should freeze the name column of the table", () => {
    build.openPokemonTable()

    build.nameColumnIsFrozen()
  })
})

describe("Moves", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
  })

  it("Should change the active move when a chip is touched", () => {
    build.moveChipIsActive(1)

    build.activateMoveChip(2)

    build.moveChipIsActive(2)
    build.moveChipIsNotActive(1)
  })

  it("Should change the card description when the active move changes", () => {
    build.cardDescription().then((before: string) => {
      build.activateMoveChip(2)

      build.cardDescriptionIsNot(before)
    })
  })

  it("Should filter the moves by the search field of the overlay", () => {
    build.editMoves()
    build.searchMove("Body Press")
    build.selectMoveFromTable("Body Press")

    build.moveChipIs(1, "Body Press")
  })

  it("Should close the move edition and bring the chips back", () => {
    build.editMoves()
    build.closeMoves()

    build.movesAreVisible()
  })
})

describe("EVs and SPs", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
  })

  it("Should update the value and the remaining when an ev is typed", () => {
    build.ensureEvMode()
    build.clearEvs()
    build.inputEv("hp", 100)

    build.evValueIs("hp", 100)
    build.remainingIs(420)
  })

  it("Should clear the evs and restore the remaining", () => {
    build.ensureEvMode()
    build.clearEvs()

    build.evValueIs("hp", 0)
    build.remainingIs(524)
  })

  it("Should show the remaining in sps by default", () => {
    build.clearEvs()

    build.remainingIs(66)
  })

  it("Should switch the values between evs and sps", () => {
    build.ensureEvMode()
    build.clearEvs()
    build.inputEv("hp", 8)

    build.evValueIs("hp", 8)

    build.toggleSpsMode()

    build.evValueIs("hp", 1)
  })

  it("Should remove the focus of the open input when the evs area is touched", () => {
    build.focusEvInput("hp")
    build.evInputIsFocused("hp")

    build.touchEvsArea()

    build.evInputIsNotFocused("hp")
  })

  it("Should show the stat acronym in the label of the reduced sliders", () => {
    build.evLabelIs("hp", "HP")
    build.evLabelIs("spa", "SPA")
    build.evLabelIs("spe", "SPE")
  })
})

describe("Hits select", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
  })

  it("Should show the hits select only for a multi hit move", () => {
    build.importPokemon(poke["ursaluna"])

    build.hitsSelectIsHidden()

    build.importPokemon(poke["dragapult"])

    build.hitsSelectIsVisible()
  })
})

describe("Optimize bulk", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["bronzong"])
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.ensureEvMode()
    build.toggleRole("defender")
    build.selectHighRoll()
  })

  it("Should restore the original evs when the proposal is discarded", () => {
    build.optimizeBulkIsVisible()

    build.toggleUpdateNature()
    build.optimizeBulk()
    build.evValueIs("hp", 12)
    build.evValueIs("def", 44)

    build.discardOptimization()

    build.evValueIs("hp", 88)
    build.evValueIs("def", 0)
    build.optimizationButtonsAreHidden()
  })

  it("Should discard a pending proposal when the tab changes", () => {
    build.optimizeBulkIsVisible()
    build.toggleUpdateNature()
    build.optimizeBulk()
    build.evValueIs("hp", 12)

    build.activateLeftPokemon()
    build.activateRightPokemon()

    build.optimizationButtonsAreHidden()
  })
})

describe("Bottom navigation", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
  })

  it("Should switch between the results and the settings tabs", () => {
    bottomNav.goTo("Settings")

    bottomNav.activeTabIs("Settings")

    bottomNav.goTo("Results")

    build.movesAreVisible()
  })

  it("Should preserve the scroll of each tab", () => {
    shell.scrollContentTo(300)
    shell.contentScrollIs(300)

    bottomNav.goTo("Settings")

    shell.contentScrollIs(0)

    bottomNav.goTo("Results")

    shell.contentScrollIs(300)
  })
})

describe("Duplicate item warning", () => {
  beforeEach(() => {
    openOneVsOneMobile()
    headerMobile.goToTeamVsMany()
    teamTabs.teamSizeIs(4)

    build.importPokemon(poke["ursaluna"])
    teamTabs.teamSizeIs(5)

    build.importPokemon(poke["ursaluna"])
    teamTabs.teamSizeIs(6)
  })

  it("Should open the tooltip by click on the warning", () => {
    build.hasDuplicateItemWarning()

    build.clickDuplicateItemWarning()

    build.duplicateItemTooltipIsVisible()
  })
})
