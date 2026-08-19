import { poke } from "@cy-support/e2e"
import { buildSingleMemberTeamMobile, goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TypeCoverageInsights } from "@page-object/type-coverage-insights"

const bottomNav = new BottomNav()
const build = new PokemonBuildMobile()
const insights = new TypeCoverageInsights("app-type-coverage-insights-mobile")

describe("Offensive and defensive sections", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Insights")
  })

  it("Should explain the defensive profile with the real counts of the Rock Dark typing", () => {
    insights.defensiveResistCountIs(0, "Tyranitar", 6)
    insights.defensiveImmuneCountIs(0, "Tyranitar", 1)
    insights.defensiveWeakCount2xIs(0, "Tyranitar", 6)
  })

  it("Should count the 4x weakness separately from the 2x ones", () => {
    insights.defensiveWeakCount4xIs(0, "Tyranitar", 1)
  })

  it("Should explain the offensive profile with the real counts of the Tyranitar moves", () => {
    insights.offensiveSuperEffectiveCount2xIs(0, "Tyranitar", 13)
  })

  it("Should show an icon and an explanation for every Pokémon listed in the sections", () => {
    insights.pokemonIconsCountIsAtLeast(3)
    insights.explanationsCountIsAtLeast(4)
  })

  it("Should update the explanation when the Pokémon changes", () => {
    insights.defensiveResistCountIs(0, "Tyranitar", 6)

    bottomNav.goTo("Build")
    build.selectPokemonFromTable("Archaludon")
    bottomNav.goTo("Insights")

    insights.defensiveResistCountIs(0, "Archaludon", 9)
    insights.defensiveImmuneCountIs(0, "Archaludon", 1)
    insights.defensiveWeakCount2xIs(0, "Archaludon", 2)
  })
})

describe("Type summaries outside the against team mode", () => {
  it("Should not summarize a type shared by fewer than three members", () => {
    goToTypeCalcMobile()
    buildSingleMemberTeamMobile(poke["tyranitar"])
    bottomNav.goTo("Insights")

    insights.summaryWeaknessIsHidden()
    insights.summaryResistanceIsHidden()
  })
})

describe("With an empty team", () => {
  it("Should ask for a team while there is no Pokémon", () => {
    goToTypeCalcMobile()

    bottomNav.goTo("Teams")
    cy.get('[data-cy="delete-team-button"]').click({ force: true })

    bottomNav.goTo("Insights")

    insights.emptyMessageIsVisible()
  })
})
