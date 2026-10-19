import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { KoColumnsMobile } from "@page-object/ko-columns-mobile"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const koColumns = new KoColumnsMobile()
const build = new PokemonBuildMobile()

describe("Dense view on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    koColumns.useDenseView()
  })

  it("Should not edit the Pokémon on tap", () => {
    koColumns.tapPokemon("Blastoise")

    koColumns.infoSheetIsHidden()
    build.nameIs("Charizard")
  })

  it("Should edit the Pokémon from the sheet opened on hold", () => {
    koColumns.holdPokemon("Blastoise")

    koColumns.editFromInfoSheet()

    koColumns.infoSheetIsHidden()
    build.nameIs("Blastoise")
  })
})
