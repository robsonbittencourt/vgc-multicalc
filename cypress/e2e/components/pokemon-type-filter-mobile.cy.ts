import { MOBILE_SUITE, goToSimpleCalcMobile } from "@cy-support/setup"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()

describe("Pokemon type filter on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.openPokemonTable()
    build.pokemonTableIsVisible()
  })

  it("Should filter by a single type from the mobile header", () => {
    build.hasNoFilterTag()

    build.clickTableHeader("Types")
    build.filterListIsVisible()
    build.selectFilterOption("Water")

    build.filterTagsAre(["Water"])
    build.tableEntryIsVisible("Swampert")
    build.tableEntryIsVisible("Milotic")
    build.tableEntryDoesNotExist("Incineroar")
  })

  it("Should accumulate a second type and filter by both", () => {
    build.clickTableHeader("Types")
    build.selectFilterOption("Water")

    build.clickTableHeader("Types")
    build.selectFilterOption("Ground")

    build.filterTagsAre(["Water", "Ground"])
    build.tableEntryIsVisible("Swampert")
    build.tableEntryDoesNotExist("Milotic")
  })

  it("Should replace the second type when a third one is selected", () => {
    build.clickTableHeader("Types")
    build.selectFilterOption("Water")

    build.clickTableHeader("Types")
    build.selectFilterOption("Ground")

    build.clickTableHeader("Types")
    build.selectFilterOption("Flying")

    build.filterTagsAre(["Water", "Flying"])
    build.tableEntryIsVisible("Pelipper")
    build.tableEntryDoesNotExist("Swampert")
  })

  it("Should remove one of the two types keeping the other applied", () => {
    build.clickTableHeader("Types")
    build.selectFilterOption("Water")

    build.clickTableHeader("Types")
    build.selectFilterOption("Ground")

    build.removeFilterTagOf("Ground")

    build.filterTagsAre(["Water"])
    build.tableEntryIsVisible("Milotic")
  })
})
