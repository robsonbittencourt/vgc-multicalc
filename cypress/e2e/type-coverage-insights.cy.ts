import { poke } from "@cy-support/e2e"
import { Team } from "@page-object/team"
import { TypeCoverageInsights } from "@page-object/type-coverage-insights"

const team = new Team()
const insights = new TypeCoverageInsights()

describe("Type Coverage Insights", () => {
  beforeEach(() => {
    cy.get('[data-cy="type-calc"]').click({ force: true })
  })

  describe("Empty state", () => {
    it("should display empty message when no Pokémon is selected", () => {
      team.selectTeam("Team 2")

      insights.verifyEmptyMessage()
    })
  })

  describe("Basic insights display", () => {
    it("should display insights when Pokémon is added", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyInsightsContainerVisible()
    })

    it("should display offensive section", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyOffensiveSectionVisible()
    })

    it("should display defensive section", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyDefensiveSectionVisible()
    })
  })

  describe("Offensive insights", () => {
    it("should display super effective Pokémon when available", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyOffensiveSuperEffectiveCount2x(0, "Tyranitar", 13)
      insights.verifyOffensiveSuperEffectiveCount2x(1, "Koraidon", 7)
    })

    it("should display not very effective Pokémon when available", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyOffensiveNotVeryEffectiveCount(0, "Rillaboom", 1)
    })

    it("should display most super effective type when not against team", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifySummarySuperEffectiveCount(3, "Grass")
    })

    it("should display most not very effective type when not against team", () => {
      team.selectTeam("Team 2")
      team.importPokemon(poke["flutter-mane-high-spa"])
      team.importPokemon(poke["flutter-mane-high-spa"])
      team.importPokemon(poke["flutter-mane-high-spa"])

      insights.verifySummaryNotVeryEffectiveCount(3, "Fire")
    })
  })

  describe("Defensive insights", () => {
    it("should display positive defensive Pokémon when available", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyDefensiveResistCount(0, "Koraidon", 7)
      insights.verifyDefensiveImmuneCount(1, "Incineroar", 1)
      insights.verifyDefensiveResistCount(1, "Incineroar", 6)
    })

    it("should display weak Pokémon when available", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyDefensiveWeakCount2x(0, "Tyranitar", 6)
      insights.verifyDefensiveWeakCount4x(0, "Tyranitar", 1)
      insights.verifyDefensiveWeaknessesCoveredByTera(0, "Tyranitar", 7)

      insights.verifyDefensiveWeakCount2x(1, "Koraidon", 4)
      insights.verifyDefensiveWeakCount4x(1, "Koraidon", 1)
      insights.verifyDefensiveWeaknessesCoveredByTera(1, "Koraidon", 5)
    })

    it("should display most resistance type when not against team", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifySummaryResistanceCount(4, "Fire")
    })

    it("should display most weakness type when not against team", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifySummaryWeaknessCount(3, "Ice")
    })
  })

  describe("Pokémon icons and explanations", () => {
    it("should display Pokémon icons in insights", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyPokemonIconsCount(1)
    })

    it("should display explanations for offensive Pokémon", () => {
      team.importPokemon(poke["tyranitar"])

      insights.verifyExplanationsCount(1)
    })
  })

  describe("Against team mode", () => {
    it("should display insights when against team", () => {
      team.selectTeam("Team 2")
      team.importPokemon(poke["tyranitar"])

      team.selectSecondTeam("Team 1")

      insights.verifyOffensiveSuperEffectiveCount2x(0, "Tyranitar", 4)
      insights.verifyDefensiveResistCount(0, "Tyranitar", 1)
    })

    it("should not display type summaries when against team", () => {
      team.selectTeam("Team 2")
      team.importPokemon(poke["tyranitar"])

      team.selectSecondTeam("Team 1")

      insights.verifyTypeSummariesNotExist()
    })
  })
})
