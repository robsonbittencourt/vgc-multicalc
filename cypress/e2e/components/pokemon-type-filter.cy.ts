import { poke } from "@cy-support/e2e"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Header } from "@page-object/header"

const header = new Header()
const leftPokemonBuild = new PokemonBuild("left-pokemon")

describe("Pokemon type filter", () => {
  beforeEach(() => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    leftPokemonBuild.openPokemonTable()
  })

  it("Should filter by a single type keeping every Pokemon that has it", () => {
    leftPokemonBuild.hasNoFilterTag()

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.filterListIsVisible()
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.filterTagsAre(["Water"])
    leftPokemonBuild.tableEntryIsVisible("Swampert")
    leftPokemonBuild.tableEntryIsVisible("Milotic")
    leftPokemonBuild.tableEntryDoesNotExist("Incineroar")
  })

  it("Should match a type in any position of the pair", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.filterTagsAre(["Ground"])
    leftPokemonBuild.tableEntryIsVisible("Excadrill")
    leftPokemonBuild.tableEntryIsVisible("Swampert")
    leftPokemonBuild.tableEntryDoesNotExist("Milotic")
  })

  it("Should accumulate a second type and filter by both", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.filterTagsAre(["Water", "Ground"])
    leftPokemonBuild.tableEntryIsVisible("Swampert")
    leftPokemonBuild.tableEntryDoesNotExist("Milotic")
    leftPokemonBuild.tableEntryDoesNotExist("Pelipper")
  })

  it("Should replace the second type when a third one is selected", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Flying")

    leftPokemonBuild.filterTagsAre(["Water", "Flying"])
    leftPokemonBuild.tableEntryIsVisible("Pelipper")
    leftPokemonBuild.tableEntryDoesNotExist("Swampert")
  })

  it("Should never keep more than two types", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Fire")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Dark")

    leftPokemonBuild.filterTagsAre(["Water", "Dark"])
  })

  it("Should ignore a type that is already applied", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.filterTagsAre(["Water"])
  })

  it("Should show the empty message when no Pokemon has both types", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Normal")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ice")

    leftPokemonBuild.noResultsMessageIsVisible()
  })

  it("Should remove one of the two types keeping the other applied", () => {
    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Water")

    leftPokemonBuild.clickTableHeader("Types")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.removeFilterTagOf("Ground")

    leftPokemonBuild.filterTagsAre(["Water"])
    leftPokemonBuild.tableEntryIsVisible("Milotic")
  })

  it("Should keep a single type filter on the move table", () => {
    leftPokemonBuild.closeTable()
    leftPokemonBuild.openMoveTable(1)

    leftPokemonBuild.clickTableHeader("Type")
    leftPokemonBuild.selectFilterOption("Ground")

    leftPokemonBuild.clickTableHeader("Type")
    leftPokemonBuild.selectFilterOption("Normal")

    leftPokemonBuild.filterTagsAre(["Normal"])
  })
})
