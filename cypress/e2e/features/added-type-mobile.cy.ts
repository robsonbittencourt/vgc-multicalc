import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToSimpleCalcMobile } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()
const opponents = new Opponent()

describe("Added type on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["garchomp-special-wall"])
    build.activateLeftPokemon()
    build.importPokemon(poke["gourgeist-trick-or-treat"])
  })

  it("Should show the Trick-or-Treat check", () => {
    build.typeAddingMoveUsedIsVisible("Trick-or-Treat")
  })

  it("Should show three types and double the Shadow Ball damage", () => {
    opponents.get("Garchomp").damageIs(17.2, 20.9)

    build.typeAddingMoveUsed()

    opponents.get("Garchomp").damageIs(34.4, 41.8)
    build.activateRightPokemon()
    build.typesAre("Dragon", "Ground")
    build.addedTypeIs("Ghost")
  })

  it("Should show the added type next to the only type of the Pokémon", () => {
    build.activateRightPokemon()
    build.importPokemon(poke["politoad"])
    build.activateLeftPokemon()

    build.typeAddingMoveUsed()

    build.activateRightPokemon()
    build.typesAre("Water")
    build.addedTypeIs("Ghost")
    build.hasNoEmptyTypeSlot()
  })
})
