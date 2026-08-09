import { poke } from "@cy-support/e2e"
import { Team } from "@page-object/team"
import { DefensiveCoverage } from "@page-object/defensive-coverage"

const team = new Team()
const defensiveCoverage = new DefensiveCoverage()

describe("Defensive Coverage", () => {
  beforeEach(() => {
    cy.get('[data-cy="type-calc"]').click({ force: true })
    team.delete("Team 1")
  })

  describe("Basic coverage display", () => {
    it("should display coverage table when Pokémon is added", () => {
      team.importPokemon(poke["tyranitar"])

      defensiveCoverage.verifyTableVisible()
    })

    it("should display Pokémon headers in table", () => {
      team.importPokemon(poke["tyranitar"])

      defensiveCoverage.verifyPokemonHeaderContains("Tyranitar")
    })

    it("should display effectiveness cells with values", () => {
      team.importPokemon(poke["tyranitar"])

      defensiveCoverage.verifyEffectivenessCellsCount(1)
    })

    it("should display total columns with correct values", () => {
      team.importPokemon(poke["tyranitar"])

      defensiveCoverage.verifyTotalWeak(0, 0)
      defensiveCoverage.verifyTotalResist(0, 1)
    })
  })

  describe("Tera Type toggle", () => {
    it("should display Tera Type toggle when not against team", () => {
      team.importPokemon(poke["tyranitar"])

      defensiveCoverage.verifyTeraTypeToggleVisible()
    })

    it("should display Tera Type toggle when against team", () => {
      team.importPokemon(poke["tyranitar"])
      team.selectSecondTeam("Team 2")

      defensiveCoverage.verifyTeraTypeToggleVisible()
    })

    it("should toggle Tera Type consideration", () => {
      team.importPokemon(poke["tyranitar"])

      const pokemonBuild = team.selectPokemon("Tyranitar")
      pokemonBuild.selectTeraType("Flying")

      defensiveCoverage.toggleTeraType()
      defensiveCoverage.verifyTeraTypeToggleChecked()
    })
  })

  describe("Tera Blast toggle", () => {
    it("should not display Tera Blast toggle when second team has no Tera Blast", () => {
      team.importPokemon(poke["tyranitar"])

      team.selectSecondTeam("Team 2")

      defensiveCoverage.verifyTeraBlastToggleNotExists()
    })

    it("should display Tera Blast toggle when second team has Tera Blast", () => {
      team.importPokemon(poke["annihilape"])
      team.selectTeam("Team 2")
      team.importPokemon(poke["rillaboom"])

      const secondTeamPokemon = team.selectPokemon("Rillaboom")
      secondTeamPokemon.changeAttackOne("Tera Blast")
      secondTeamPokemon.selectTeraType("Flying")

      team.selectTeam("Team 1")
      team.selectSecondTeam("Team 2")

      defensiveCoverage.toggleTeraBlast()

      defensiveCoverage.verifyTeraBlastToggleVisible()
      defensiveCoverage.verifyTotalWeak(0, 1)
    })
  })

  describe("Against team mode", () => {
    it("should display table when against team", () => {
      team.delete("Team 1")
      team.importPokepaste(poke["pokepaste"])
      team.importPokepaste(poke["pokepaste-forms-1"])

      team.selectSecondTeam("Team 1")

      defensiveCoverage.verifyEffectivenessValue(3, 0, "2x")
      defensiveCoverage.verifyEffectivenessValue(5, 0, "2x")
      defensiveCoverage.verifyEffectivenessValue(5, 2, "2x")
    })
  })
})
