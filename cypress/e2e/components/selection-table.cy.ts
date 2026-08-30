import { poke } from "@cy-support/e2e"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Header } from "@page-object/header"

const header = new Header()
const leftPokemonBuild = new PokemonBuild("left-pokemon")

describe("Sorting, filtering and closing", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
  })

  it("Should cycle the sorting of a column between asc, desc and none", () => {
    leftPokemonBuild.openPokemonTable()
    leftPokemonBuild.storeFirstTableEntry("unsorted")

    leftPokemonBuild.clickTableHeader("BST")
    leftPokemonBuild.firstTableEntryIsNotTheStored("unsorted")
    leftPokemonBuild.storeFirstTableEntry("ascending")

    leftPokemonBuild.clickTableHeader("BST")
    leftPokemonBuild.firstTableEntryIsNotTheStored("ascending")
    leftPokemonBuild.storeFirstTableEntry("descending")

    leftPokemonBuild.clickTableHeader("BST")
    leftPokemonBuild.firstTableEntryIsNotTheStored("descending")
  })

  it("Should apply and remove the filter tag of a column", () => {
    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.hasNoFilterTag()

    leftPokemonBuild.clickTableHeader("Cat")
    leftPokemonBuild.filterListIsVisible()
    leftPokemonBuild.selectFilterOption("Status")

    leftPokemonBuild.filterTagIs("Status")
    leftPokemonBuild.firstTableEntryIsNot("Headlong Rush")

    leftPokemonBuild.removeFilterTag()

    leftPokemonBuild.hasNoFilterTag()
  })

  it("Should show the empty message when the filter combination has no result", () => {
    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.clickTableHeader("Cat")
    leftPokemonBuild.selectFilterOption("Status")

    leftPokemonBuild.clickTableHeader("Type")
    leftPokemonBuild.selectFilterOption("Dragon")

    leftPokemonBuild.noResultsMessageIsVisible()
  })

  it("Should go back to the table without applying a filter", () => {
    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.clickTableHeader("Cat")
    leftPokemonBuild.filterListIsVisible()

    leftPokemonBuild.backFromFilterList()

    leftPokemonBuild.tableIsVisible()
    leftPokemonBuild.hasNoFilterTag()
  })

  it("Should show more entries when the table is expanded", () => {
    leftPokemonBuild.openPokemonTable()
    leftPokemonBuild.storeVisibleTableEntriesCount("collapsed")

    leftPokemonBuild.expandTable()

    leftPokemonBuild.showsMoreTableEntriesThan("collapsed")
  })

  it("Should close the table by the X button of the header", () => {
    leftPokemonBuild.openPokemonTable()
    leftPokemonBuild.tableIsVisible()

    leftPokemonBuild.closeTableByHeaderButton()

    leftPokemonBuild.tableIsClosed()
    leftPokemonBuild.nameIs("Ursaluna")
  })

  it("Should render other entries when the virtual scroll reaches the end", () => {
    leftPokemonBuild.openPokemonTable()
    leftPokemonBuild.storeFirstTableEntry("firstOfTheTop")

    leftPokemonBuild.scrollTableToBottom()

    leftPokemonBuild.tableIsScrolled()
    leftPokemonBuild.firstTableEntryIsNotTheStored("firstOfTheTop")
  })
})

describe("Reopen positioned on the current value", () => {
  beforeEach(() => {
    header.openOneVsOne()
  })

  it("Should open the item table on the item of the current Pokémon", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.itemIs("Flame Orb")

    leftPokemonBuild.openItemTable()

    leftPokemonBuild.tableEntryIsSelected("Flame Orb")
  })

  it("Should not leak the previous position when coming from a mega stone", () => {
    leftPokemonBuild.importPokemon(poke["excadrill-mega"])
    leftPokemonBuild.openItemTable()
    leftPokemonBuild.tableEntryIsSelected("Excadrite")

    leftPokemonBuild.closeTable()
    leftPokemonBuild.selectPokemonByFilter("Pikachu", "Pikachu")

    leftPokemonBuild.openItemTable()

    leftPokemonBuild.tableEntryIsSelected("Light Ball")
  })

  it("Should open the ability table on the current ability", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.abilityIs("Guts")

    leftPokemonBuild.openAbilityTable()

    leftPokemonBuild.tableEntryIsSelected("Guts")
  })

  it("Should open the move table on the current move", () => {
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.attackIs(1, "Headlong Rush")

    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.tableEntryIsVisible("Headlong Rush")
    leftPokemonBuild.tableEntryIsSelected("Headlong Rush")
  })
})
