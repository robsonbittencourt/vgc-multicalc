import { poke } from "@cy-support/e2e"
import { DefensiveCoverage } from "@page-object/defensive-coverage"
import { Header } from "@page-object/header"
import { OffensiveCoverage } from "@page-object/offensive-coverage"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const defensiveCoverage = new DefensiveCoverage()
const offensiveCoverage = new OffensiveCoverage()

function setUpTwoTeams() {
  header.openTypeCalc()
  teamsWidget.delete("Team 1")
  team.importPokemon(poke["tyranitar"])

  teamsWidget.selectTeam("Team 2")
  teamsWidget.delete("Team 2")
  team.importPokemon(poke["dragonite"])
  team.importPokemon(poke["hatterene"])

  teamsWidget.selectTeam("Team 1")
  teamsWidget.selectSecondTeam("Team 2")
}

describe("Transposed tables", () => {
  beforeEach(() => {
    setUpTwoTeams()
  })

  it("Should transpose the offensive table to my attackers by their targets", () => {
    offensiveCoverage.attackerRowsAre(["Tyranitar"])
    offensiveCoverage.targetColumnsAre(["Dragonite", "Hatterene"])
  })

  it("Should show the best effectiveness my attacker reaches against each target", () => {
    offensiveCoverage.cellForAttackerIs("Tyranitar", 0, "4x")
    offensiveCoverage.cellForAttackerIs("Tyranitar", 1, "")
  })

  it("Should list the opposing Pokémon as the rows of the defensive table", () => {
    defensiveCoverage.targetRowsAre(["Dragonite", "Hatterene"])
  })

  it("Should show the best effectiveness each opposing Pokémon reaches against my team", () => {
    defensiveCoverage.cellForTargetIs("Hatterene", 0, "2x")
  })

  it("Should go back to the per type tables when the second team is cleared", () => {
    offensiveCoverage.attackerRowsAre(["Tyranitar"])

    teamsWidget.selectTeam("Team 3")
    teamsWidget.hasNoStackedSecondTeam()

    teamsWidget.selectTeam("Team 1")

    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    offensiveCoverage.cellForTypeIs("Flying", 0, "2x")
  })
})

describe("When one of the teams is empty", () => {
  it("Should not stack an empty team as the second team", () => {
    header.openTypeCalc()
    teamsWidget.delete("Team 1")
    team.importPokemon(poke["tyranitar"])

    teamsWidget.selectSecondTeam("Team 2")

    teamsWidget.hasNoStackedSecondTeam()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
  })
})
