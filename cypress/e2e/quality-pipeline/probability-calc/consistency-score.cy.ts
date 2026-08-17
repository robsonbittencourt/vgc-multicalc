import { poke } from "@cy-support/e2e"
import { Header } from "@page-object/header"
import { PokemonProbability } from "@page-object/pokemon-probability"
import { Team } from "@page-object/team"
import { TeamScore } from "@page-object/team-score"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const teamScore = new TeamScore()
const pokemonProbability = new PokemonProbability()

describe("Scoring a team", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
  })

  it("Should score the team and each of its members", () => {
    teamsWidget.importPokepaste(poke["pokepaste"])

    teamScore.teamScoreIs("90")

    teamScore.pokemonScoreIs(0, "75")
    teamScore.pokemonScoreIs(1, "100")
    teamScore.pokemonScoreIs(3, "71")
    teamScore.pokemonScoreIs(5, "96")
  })

  it("Should not score an empty team", () => {
    teamsWidget.selectTeam("Team 2")

    pokemonProbability.teamEmptyMessageIsVisible()

    teamScore.teamScoreIsHidden()
  })
})

describe("Reacting to the build", () => {
  beforeEach(() => {
    header.openProbabilityCalc()
    teamsWidget.delete("Team 1")
  })

  it("Should raise the member and the team score when a move becomes more accurate", () => {
    const chiYu = team.importPokemon(poke["chi-yu"])

    let memberScore = 0
    let teamScoreBefore = 0

    teamScore.pokemonScoreValue(0).then(score => {
      memberScore = score
    })

    teamScore.teamScoreValue().then(score => {
      teamScoreBefore = score
    })

    chiYu.changeAttackOne("Dark Pulse")

    teamScore.pokemonScoreValue(0).should(score => {
      expect(score).to.be.greaterThan(memberScore)
    })

    teamScore.teamScoreValue().should(score => {
      expect(score).to.be.greaterThan(teamScoreBefore)
    })
  })
})
