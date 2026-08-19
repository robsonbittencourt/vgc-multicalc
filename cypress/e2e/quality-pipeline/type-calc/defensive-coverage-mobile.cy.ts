import { poke } from "@cy-support/e2e"
import { buildSingleMemberTeamMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { DefensiveCoverageMobile } from "@page-object/defensive-coverage-mobile"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const bottomNav = new BottomNav()
const build = new PokemonBuildMobile()
const defensiveCoverage = new DefensiveCoverageMobile()

describe("Against types", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Coverage")
  })

  it("Should render one row per type with the Pokémon as a column", () => {
    defensiveCoverage.pokemonHeaderContains("Tyranitar")

    defensiveCoverage.rowsCountIs(18)
  })

  it("Should classify each cell by the real effectiveness of the Rock Dark typing", () => {
    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    defensiveCoverage.cellForTypeHasClass("Fighting", 0, "weakness-4x")

    defensiveCoverage.cellForTypeIs("Water", 0, "2x")
    defensiveCoverage.cellForTypeHasClass("Water", 0, "weakness")

    defensiveCoverage.cellForTypeIs("Fire", 0, "1/2")
    defensiveCoverage.cellForTypeHasClass("Fire", 0, "resistance")

    defensiveCoverage.cellForTypeIs("Psychic", 0, "immune")
    defensiveCoverage.cellForTypeHasClass("Psychic", 0, "immune")
  })

  it("Should leave the neutral types without a label", () => {
    defensiveCoverage.cellForTypeIs("Ice", 0, "")
    defensiveCoverage.cellForTypeIs("Dragon", 0, "")
  })

  it("Should total one weakness and one resistance per row for a single Pokémon", () => {
    defensiveCoverage.totalWeakForTypeIs("Fighting", 1)
    defensiveCoverage.totalResistForTypeIs("Fighting", 0)

    defensiveCoverage.totalWeakForTypeIs("Fire", 0)
    defensiveCoverage.totalResistForTypeIs("Fire", 1)
  })

  it("Should sum the totals across every member of the team", () => {
    bottomNav.goTo("Build")
    build.selectPokemonFromTable("Hatterene")
    bottomNav.goTo("Coverage")

    defensiveCoverage.totalWeakForTypeIs("Poison", 1)
    defensiveCoverage.totalResistForTypeIs("Poison", 0)
  })
})
