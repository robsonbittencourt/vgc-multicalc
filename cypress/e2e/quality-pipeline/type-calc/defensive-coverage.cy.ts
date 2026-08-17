import { poke } from "@cy-support/e2e"
import { DefensiveCoverage } from "@page-object/defensive-coverage"
import { Header } from "@page-object/header"
import { OffensiveCoverage } from "@page-object/offensive-coverage"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const defensiveCoverage = new DefensiveCoverage()
const offensiveCoverage = new OffensiveCoverage()

describe("Against types", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
    team.importPokemon(poke["tyranitar"])
  })

  it("Should render one row per type with the Pokémon as a column", () => {
    defensiveCoverage.tableIsVisible()
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

    defensiveCoverage.totalWeakForTypeIs("Psychic", 0)
    defensiveCoverage.totalResistForTypeIs("Psychic", 1)
  })

  it("Should update the cells when the Pokémon of the team changes", () => {
    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    defensiveCoverage.cellForTypeIs("Poison", 0, "1/2")

    team.selectPokemon("Tyranitar").selectPokemon("Hatterene")

    defensiveCoverage.pokemonHeaderContains("Hatterene")

    defensiveCoverage.cellForTypeIs("Fighting", 0, "1/4")
    defensiveCoverage.cellForTypeIs("Poison", 0, "2x")
    defensiveCoverage.cellForTypeIs("Dragon", 0, "immune")
  })

  it("Should sum the totals across every member of the team", () => {
    team.importPokemon(poke["hatterene"])

    defensiveCoverage.totalWeakForTypeIs("Poison", 1)
    defensiveCoverage.totalResistForTypeIs("Poison", 1)

    defensiveCoverage.totalWeakForTypeIs("Fighting", 1)
    defensiveCoverage.totalResistForTypeIs("Fighting", 1)
  })
})

describe("With an empty team", () => {
  it("Should not render the coverage section when the team has no Pokémon", () => {
    header.openTypeCalc()
    team.delete("Team 1")

    defensiveCoverage.componentIsHidden()
    offensiveCoverage.componentIsHidden()
  })
})
