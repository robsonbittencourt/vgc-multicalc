import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { OffensiveCoverage } from "@page-object/offensive-coverage"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const header = new Header()
const team = new Team()
const offensiveCoverage = new OffensiveCoverage()

describe("Against types", () => {
  beforeEach(() => {
    header.openTypeCalc()
    teamsWidget.delete("Team 1")
    team.importPokemon(poke["tyranitar"])
  })

  it("Should render one row per type with the Pokémon as a column", () => {
    offensiveCoverage.tableIsVisible()
    offensiveCoverage.pokemonHeaderContains("Tyranitar")

    offensiveCoverage.rowsCountIs(18)
  })

  smoke("Should show the best effectiveness the moves reach against each type", () => {
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
    offensiveCoverage.cellForTypeIs("Bug", 0, "2x")

    team.selectPokemon("Tyranitar").changeAttackOne("Low Kick")

    offensiveCoverage.cellForTypeIs("Dark", 0, "2x")
    offensiveCoverage.totalSuperEffectiveForTypeIs("Dark", 1)

    offensiveCoverage.cellForTypeIs("Bug", 0, "")
    offensiveCoverage.totalSuperEffectiveForTypeIs("Bug", 0)
  })
})
