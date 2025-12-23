import { poke } from "@cy-support/e2e"
import { ProbabilityCard } from "@page-object/probability-card"
import { Team } from "@page-object/team"
import { TeamScore } from "@page-object/team-score"

const team = new Team()
const teamScore = new TeamScore()

describe("Probability Calculator", () => {
  beforeEach(() => {
    cy.get('[data-cy="probability-calc"]').click({ force: true })
  })

  describe("Team Score", () => {
    it("should display team score after importing a team", () => {
      team.importPokepaste(poke["pokepaste"])

      teamScore.verifyTeamScore("89")
    })
  })

  describe("Pokémon Scores", () => {
    it("should display individual Pokémon scores", () => {
      team.importPokepaste(poke["pokepaste"])

      teamScore.verifyPokemonScore(0, "70")
      teamScore.verifyPokemonScore(1, "100")
      teamScore.verifyPokemonScore(2, "100")
      teamScore.verifyPokemonScore(3, "69")
      teamScore.verifyPokemonScore(4, "100")
      teamScore.verifyPokemonScore(5, "95")
    })
  })

  describe("Single Target Move", () => {
    it("should display probabilities for Overheat (Chi-Yu)", () => {
      team.importPokemon(poke["chi-yu"])
      const pokemonBuild = team.selectPokemon("Chi-Yu")
      pokemonBuild.selectAttackOne()

      const singleTargetCard = new ProbabilityCard("single-target")

      singleTargetCard.verifyTurn1SingleTarget("90", "90", "10", "10")
      singleTargetCard.verifyTurn2SingleTarget("81", "99", "1.0", "19")
      singleTargetCard.verifyTurn3SingleTarget("72.9", "99.9", "0.10", "27.1")
      singleTargetCard.verifyTurn4SingleTarget("65.6", "100", "0.010", "34.4")
      singleTargetCard.verifyTurn5SingleTarget("59", "100", "0.010", "41")
    })

    it("should display Effect columns for Single Target move with secondary effect", () => {
      team.importPokemon(poke["chi-yu"])
      const pokemonBuild = team.selectPokemon("Chi-Yu")
      pokemonBuild.selectAttackThree()

      const singleTargetCard = new ProbabilityCard("single-target")

      singleTargetCard.verifyEffectAtLeastOnce(1, "20")
      singleTargetCard.verifyEffectAtLeastOnce(2, "36")
      singleTargetCard.verifyEffectAtLeastOnce(3, "48.8")
      singleTargetCard.verifyEffectAtLeastOnce(4, "59")
      singleTargetCard.verifyEffectAtLeastOnce(5, "67.2")
      singleTargetCard.verifyEffectAllTurns(1, "20")
      singleTargetCard.verifyEffectAllTurns(2, "4")
      singleTargetCard.verifyEffectAllTurns(3, "0.8")
      singleTargetCard.verifyEffectAllTurns(4, "0.16")
      singleTargetCard.verifyEffectAllTurns(5, "0.032")
    })
  })

  describe("Spread Target Move", () => {
    it("should display probabilities for Heat Wave (Chi-Yu)", () => {
      team.importPokemon(poke["chi-yu"])
      const pokemonBuild = team.selectPokemon("Chi-Yu")
      pokemonBuild.selectAttackTwo()

      const spreadTargetCard = new ProbabilityCard("spread-target")

      spreadTargetCard.verifyTurn1SpreadTarget("81", "99", "1.0")
      spreadTargetCard.verifyTurn2SpreadTarget("65.6", "98", "2")
      spreadTargetCard.verifyTurn3SpreadTarget("53.1", "97", "3")
      spreadTargetCard.verifyTurn4SpreadTarget("43", "96.1", "3.9")
      spreadTargetCard.verifyTurn5SpreadTarget("34.9", "95.1", "4.9")
    })

    it("should display Effect columns for Spread Target move with secondary effect", () => {
      team.importPokemon(poke["chi-yu"])
      const pokemonBuild = team.selectPokemon("Chi-Yu")
      pokemonBuild.selectAttackTwo()

      const spreadTargetCard = new ProbabilityCard("spread-target")

      spreadTargetCard.verifyEffectOnePlus(1, "19")
      spreadTargetCard.verifyEffectOnePlus(2, "34.4")
      spreadTargetCard.verifyEffectOnePlus(3, "46.9")
      spreadTargetCard.verifyEffectOnePlus(4, "57")
      spreadTargetCard.verifyEffectOnePlus(5, "65.1")
      spreadTargetCard.verifyEffectBoth(1, "1.0")
      spreadTargetCard.verifyEffectBoth(2, "2")
      spreadTargetCard.verifyEffectBoth(3, "3")
      spreadTargetCard.verifyEffectBoth(4, "3.9")
      spreadTargetCard.verifyEffectBoth(5, "4.9")
    })
  })

  describe("Empty States", () => {
    it("should display empty message when no Pokémon is selected", () => {
      team.clickOnAdd()

      cy.get('[data-cy="pokemon-probability-empty-message"]').should("be.visible")
      cy.get('[data-cy="pokemon-probability-empty-message"]').should("contain", "Select a Pokémon")
    })

    it("should display empty message when team has no Pokémon", () => {
      team.selectTeam("Team 2")

      cy.get('[data-cy="team-probability-empty-message"]').should("be.visible")
      cy.get('[data-cy="team-probability-empty-message"]').should("contain", "Select a Pokémon")

      teamScore.verifyTeamScoreDoesNotExist()
    })
  })
})
