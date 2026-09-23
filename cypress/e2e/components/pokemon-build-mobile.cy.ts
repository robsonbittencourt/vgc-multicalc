import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE } from "@cy-support/setup"
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
  shell.isReady()
}

describe("Sides", MOBILE_SUITE, () => {
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

describe("Selection overlays", MOBILE_SUITE, () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
  })

  it("Should hide the sps and the moves while a table is open", () => {
    build.openPokemonTable()

    build.spsAreHidden()
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

describe("Moves", MOBILE_SUITE, () => {
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

describe("EVs and SPs", MOBILE_SUITE, () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
  })

  it("Should update the value and the remaining when an ev is typed", () => {
    build.ensureEvMode()
    build.clearSps()
    build.inputSp("hp", 100)

    build.spValueIs("hp", 100)
    build.remainingIs(420)
  })

  it("Should bring the typed ev back to the budget limit when it is exceeded", () => {
    build.ensureEvMode()
    build.clearSps()
    build.inputSp("hp", 252)
    build.inputSp("atk", 252)

    build.inputSp("def", 100)

    build.spValueIs("def", 12)
    build.remainingIs(0)
  })

  it("Should bring the typed ev back when the budget is already spent and the value does not change", () => {
    build.ensureEvMode()
    build.clearSps()
    build.inputSp("hp", 252)
    build.inputSp("atk", 252)
    build.inputSp("def", 12)

    build.inputSp("def", 200)

    build.spValueIs("def", 12)
    build.remainingIs(0)
  })

  it("Should offer only the available sps as the maximum of the input", () => {
    build.ensureEvMode()
    build.clearSps()
    build.inputSp("hp", 252)
    build.inputSp("atk", 252)

    build.spMaxAttributeIs("def", 12)
  })

  it("Should clear the sps and restore the remaining", () => {
    build.ensureEvMode()
    build.clearSps()

    build.spValueIs("hp", 0)
    build.remainingIs(524)
  })

  it("Should show the remaining in sps by default", () => {
    build.clearSps()

    build.remainingIs(66)
  })

  it("Should switch the values between sps and evs", () => {
    build.ensureEvMode()
    build.clearSps()
    build.inputSp("hp", 8)

    build.spValueIs("hp", 4)

    build.toggleSpsMode()

    build.spValueIs("hp", 1)
  })

  it("Should remove the focus of the open input when the sps area is touched", () => {
    build.focusSpInput("hp")
    build.spInputIsFocused("hp")

    build.touchSpsArea()

    build.spInputIsNotFocused("hp")
  })

  it("Should show the stat acronym in the label of the reduced sliders", () => {
    build.spLabelIs("hp", "HP")
    build.spLabelIs("spa", "SPA")
    build.spLabelIs("spe", "SPE")
  })
})

describe("Hits select", MOBILE_SUITE, () => {
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

describe("Optimize bulk", MOBILE_SUITE, () => {
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

  it("Should restore the original sps when the proposal is discarded", () => {
    build.optimizeBulkIsVisible()

    build.optimizeBulk()
    build.spValueIs("hp", 12)
    build.spValueIs("def", 44)

    build.discardOptimization()

    build.spValueIs("hp", 84)
    build.spValueIs("def", 0)
    build.optimizationButtonsAreHidden()
  })

  it("Should propose a spread and highlight the optimized stats", () => {
    build.optimizeBulkIsVisible()

    build.optimizeBulk()

    build.optimizedStats(["hp", "def"])
    build.spValueIs("hp", 12)
    build.spValueIs("def", 44)
  })

  it("Should keep the spread when the proposal is applied", () => {
    build.optimizeBulkIsVisible()

    build.optimizeBulk()
    build.applyOptimization()

    build.spValueIs("hp", 12)
    build.spValueIs("def", 44)
    build.optimizationButtonsAreHidden()
  })

  it("Should show no solution needed when the Pokemon already survives", () => {
    build.activateLeftPokemon()
    build.importPokemon(poke["talonflame"])
    build.activateRightPokemon()
    build.toggleRole("defender")
    build.optimizeBulkIsVisible()

    build.optimizeBulk()

    build.noSolutionNeededIsVisible()
    build.okNotNeeded()
    build.optimizationButtonsAreHidden()
  })

  it("Should keep the nature when no solution is needed and update nature is on", () => {
    build.activateLeftPokemon()
    build.importPokemon(poke["talonflame"])
    build.activateRightPokemon()
    build.toggleRole("defender")
    build.optimizeBulkIsVisible()
    build.toggleUpdateNature()

    build.optimizeBulk()

    build.noSolutionNeededIsVisible()
    build.natureIs("Adamant")
  })

  it("Should state that no spread survives when the attack cannot be avoided", () => {
    build.activateLeftPokemon()
    build.importPokemon(poke["urshifu-rapid-strike"])
    build.activateRightPokemon()
    build.importPokemon(poke["flutter-mane"])
    build.toggleRole("defender")
    build.clearSps()
    build.optimizeBulkIsVisible()
    build.selectSurvivalThreshold("4HKO")

    build.optimizeBulk()

    build.optimizationImpossibleIsVisible()
    build.optimizationImpossibleLabelIs("No spread survives this attack")
    build.okOptimizationImpossible()
    build.optimizationButtonsAreHidden()
  })

  it("Should discard a pending proposal when the tab changes", () => {
    build.optimizeBulkIsVisible()
    build.optimizeBulk()
    build.spValueIs("hp", 12)

    build.activateLeftPokemon()
    build.activateRightPokemon()

    build.optimizationButtonsAreHidden()
  })
})

describe("Bottom navigation", MOBILE_SUITE, () => {
  beforeEach(() => {
    openOneVsOneMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["ursaluna"])
  })

  it("Should switch between the results and the modifiers tabs", () => {
    bottomNav.goTo("Modifiers")

    bottomNav.activeTabIs("Modifiers")

    bottomNav.goTo("Results")

    build.movesAreVisible()
  })

  it("Should preserve the scroll of each tab", () => {
    shell.scrollContentTo(300)
    shell.rememberContentScroll("resultsScroll")

    bottomNav.goTo("Modifiers")

    shell.tabScrollIs("scrollable-content-field", 0)

    bottomNav.goTo("Results")

    shell.contentScrollIsTheRememberedOne("resultsScroll")
  })
})

describe("Duplicate item warning", MOBILE_SUITE, () => {
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
