import { poke } from "@cy-support/e2e"
import { buildSingleMemberTeamMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { OffensiveCoverageMobile } from "@page-object/offensive-coverage-mobile"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const bottomNav = new BottomNav()
const build = new PokemonBuildMobile()
const offensiveCoverage = new OffensiveCoverageMobile()

describe("Against types", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Coverage")
  })

  it("Should render one row per type with the Pokémon as a column", () => {
    offensiveCoverage.pokemonHeaderContains("Tyranitar")

    offensiveCoverage.rowsCountIs(18)
  })

  it("Should show the best effectiveness the moves reach against each type", () => {
    offensiveCoverage.cellForTypeIs("Flying", 0, "2x")
    offensiveCoverage.cellForTypeIs("Fire", 0, "2x")
    offensiveCoverage.cellForTypeIs("Electric", 0, "2x")
    offensiveCoverage.cellForTypeIs("Psychic", 0, "2x")

    offensiveCoverage.cellForTypeIs("Fairy", 0, "")
  })

  it("Should count how many members hit each type super effectively", () => {
    offensiveCoverage.totalSuperEffectiveForTypeIs("Flying", 1)
    offensiveCoverage.totalSuperEffectiveForTypeIs("Fire", 1)

    offensiveCoverage.totalSuperEffectiveForTypeIs("Fairy", 0)
  })

  it("Should update the coverage when a move of the team changes", () => {
    offensiveCoverage.cellForTypeIs("Dark", 0, "")

    bottomNav.goTo("Build")
    build.editMoves()
    build.searchMove("Low Kick")
    build.selectMoveFromTable("Low Kick")
    build.closeMoves()
    bottomNav.goTo("Coverage")

    offensiveCoverage.cellForTypeIs("Dark", 0, "2x")
    offensiveCoverage.totalSuperEffectiveForTypeIs("Dark", 1)
  })
})
