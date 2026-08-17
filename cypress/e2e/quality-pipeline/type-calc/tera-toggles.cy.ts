import { poke } from "@cy-support/e2e"
import { DefensiveCoverage } from "@page-object/defensive-coverage"
import { Header } from "@page-object/header"
import { OffensiveCoverage } from "@page-object/offensive-coverage"
import { Team } from "@page-object/team"

const header = new Header()
const team = new Team()
const defensiveCoverage = new DefensiveCoverage()
const offensiveCoverage = new OffensiveCoverage()

describe("Consider Tera Type on the defensive coverage", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
    team.importPokemon(poke["tyranitar"])
  })

  it("Should offer the toggle even when there is no second team", () => {
    defensiveCoverage.teraTypeToggleIsVisible()
  })

  it("Should recalculate the cells with the Tera Flying typing", () => {
    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
    defensiveCoverage.cellForTypeIs("Ground", 0, "2x")
    defensiveCoverage.cellForTypeIs("Psychic", 0, "immune")

    defensiveCoverage.toggleTeraType()

    defensiveCoverage.teraTypeToggleIsChecked()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "1/2")
    defensiveCoverage.cellForTypeIs("Ground", 0, "immune")
    defensiveCoverage.cellForTypeIs("Psychic", 0, "")
  })

  it("Should restore the original typing when the toggle is turned off", () => {
    defensiveCoverage.toggleTeraType()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "1/2")

    defensiveCoverage.toggleTeraType()

    defensiveCoverage.cellForTypeIs("Fighting", 0, "4x")
  })

  it("Should update the totals along with the cells", () => {
    defensiveCoverage.totalWeakForTypeIs("Fighting", 1)
    defensiveCoverage.totalResistForTypeIs("Fighting", 0)

    defensiveCoverage.toggleTeraType()

    defensiveCoverage.totalWeakForTypeIs("Fighting", 0)
    defensiveCoverage.totalResistForTypeIs("Fighting", 1)
  })
})

describe("Consider Tera Type on the offensive coverage", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
    team.importPokemon(poke["tyranitar"])
  })

  it("Should not offer the toggle when there is no second team", () => {
    offensiveCoverage.teraTypeToggleIsHidden()
  })

  it("Should offer the toggle once a second team is selected", () => {
    team.selectTeam("Team 2")
    team.importPokemon(poke["hatterene"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    offensiveCoverage.teraTypeToggleIsVisible()
  })
})

describe("Tera Blast toggle", () => {
  beforeEach(() => {
    header.openTypeCalc()
    team.delete("Team 1")
  })

  it("Should not offer the Tera Blast toggle when no Pokémon has the move", () => {
    team.importPokemon(poke["tyranitar"])

    team.selectTeam("Team 2")
    team.importPokemon(poke["hatterene"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    offensiveCoverage.teraBlastToggleIsHidden()
    defensiveCoverage.teraBlastToggleIsHidden()
  })

  it("Should offer the Tera Blast toggle when a team member has the move", () => {
    team.importPokemon(poke["porygon2"])
    team.selectPokemon("Porygon2").changeAttackOne("Tera Blast")

    team.selectTeam("Team 2")
    team.importPokemon(poke["hatterene"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    offensiveCoverage.teraBlastToggleIsVisible()
  })

  it("Should key the defensive toggle on the second team, not on the own team", () => {
    team.importPokemon(poke["porygon2"])
    team.selectPokemon("Porygon2").changeAttackOne("Tera Blast")

    team.selectTeam("Team 2")
    team.importPokemon(poke["hatterene"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    defensiveCoverage.teraBlastToggleIsHidden()
  })

  it("Should read Tera Blast as the tera type of the attacker when the offensive toggle is turned on", () => {
    team.importPokemon(poke["porygon2"])

    team.selectTeam("Team 2")
    team.importPokemon(poke["tyranitar"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    offensiveCoverage.cellForAttackerIs("Porygon2", 0, "")

    offensiveCoverage.toggleTeraBlast()

    offensiveCoverage.cellForAttackerIs("Porygon2", 0, "4x")

    offensiveCoverage.toggleTeraBlast()

    offensiveCoverage.cellForAttackerIs("Porygon2", 0, "")
  })

  it("Should read Tera Blast of the second team when the defensive toggle is turned on", () => {
    team.importPokemon(poke["tyranitar"])

    team.selectTeam("Team 2")
    team.importPokemon(poke["porygon2"])

    team.selectTeam("Team 1")
    team.selectSecondTeam("Team 2")

    defensiveCoverage.cellForTargetIs("Porygon2", 0, "")

    defensiveCoverage.toggleTeraBlast()

    defensiveCoverage.cellForTargetIs("Porygon2", 0, "4x")
  })
})
