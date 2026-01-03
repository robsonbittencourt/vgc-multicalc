import { poke } from "@cy-support/e2e"
import { Team } from "@page-object/team"
import { OffensiveCoverage } from "@page-object/offensive-coverage"

const team = new Team()
const offensiveCoverage = new OffensiveCoverage()

describe("Offensive Coverage", () => {
  beforeEach(() => {
    cy.get('[data-cy="type-calc"]').click({ force: true })
    team.delete("Team 1")
  })

  describe("Basic coverage display", () => {
    it("should display coverage table when Pokémon is added", () => {
      team.importPokemon(poke["tyranitar"])

      offensiveCoverage.verifyTableVisible()
    })

    it("should display Pokémon headers in table", () => {
      team.importPokemon(poke["tyranitar"])

      offensiveCoverage.verifyPokemonHeaderContains("Tyranitar")
    })

    it("should display effectiveness cells with values", () => {
      team.importPokemon(poke["tyranitar"])

      offensiveCoverage.verifyEffectivenessCellsCount(1)
    })

    it("should display total columns with correct values", () => {
      team.importPokemon(poke["tyranitar"])

      offensiveCoverage.verifyTotalNotVeryEffective(0, 0)
      offensiveCoverage.verifyTotalSuperEffective(0, 0)
    })
  })

  describe("Tera Type toggle", () => {
    it("should display Tera Type toggle when not against team", () => {
      team.importPokemon(poke["tyranitar"])

      offensiveCoverage.verifyTeraTypeToggleNotExists()
    })

    it("should display Tera Type toggle when against team", () => {
      team.importPokemon(poke["tyranitar"])

      team.selectTeam("Team 2")
      team.importPokemon(poke["tyranitar"])

      team.selectSecondTeam("Team 1")

      offensiveCoverage.verifyTeraTypeToggleVisible()
    })

    it("should toggle Tera Type consideration", () => {
      team.importPokemon(poke["tyranitar"])

      team.selectTeam("Team 2")
      team.importPokemon(poke["farigiraf"])

      team.selectTeam("Team 1")
      team.selectSecondTeam("Team 2")

      offensiveCoverage.toggleTeraType()

      offensiveCoverage.verifyTotalSuperEffective(0, 0)
    })
  })

  describe("Tera Blast toggle", () => {
    it("should not display Tera Blast toggle when team has no Tera Blast", () => {
      team.importPokemon(poke["tyranitar"])
      team.selectSecondTeam("Team 2")

      offensiveCoverage.verifyTeraBlastToggleNotExists()
    })

    it("should display Tera Blast toggle when team has Tera Blast", () => {
      team.importPokemon(poke["annihilape"])
      team.selectTeam("Team 2")
      team.importPokemon(poke["rillaboom"])

      const pokemonBuild = team.selectPokemon("Rillaboom")
      pokemonBuild.changeAttackOne("Tera Blast")
      pokemonBuild.selectTeraType("Flying")

      team.selectTeam("Team 2")
      team.selectSecondTeam("Team 1")

      offensiveCoverage.toggleTeraBlast()

      offensiveCoverage.verifyTeraBlastToggleVisible()
      offensiveCoverage.verifyTotalSuperEffective(0, 1)
    })
  })

  describe("Against team mode", () => {
    it("should display table when against team", () => {
      team.delete("Team 1")
      team.importPokepaste(poke["pokepaste"])
      team.importPokepaste(poke["pokepaste-forms-1"])

      team.selectSecondTeam("Team 2")

      offensiveCoverage.verifyEffectivenessValue(0, 0, "2x")
      offensiveCoverage.verifyEffectivenessValue(0, 5, "1/2")
      offensiveCoverage.verifyEffectivenessValue(2, 0, "2x")
      offensiveCoverage.verifyEffectivenessValue(5, 0, "2x")
      offensiveCoverage.verifyEffectivenessValue(5, 2, "2x")
      offensiveCoverage.verifyEffectivenessValue(5, 5, "1/2")
    })
  })
})
