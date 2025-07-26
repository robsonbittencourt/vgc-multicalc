import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const team = new Team()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })
  team.delete("Team 1")
})

describe("Add Pokémon to the Team", () => {
  it("Add Pokémon to the team until have 6", () => {
    team.add("Squirtle")
    team.add("Bulbasaur")
    team.add("Pikachu")
    team.add("Tyranitar")
    team.add("Lugia")
    team.add("Mewtwo")

    cy.get('[data-cy="add-team-member-tab"]').should("not.exist")
  })

  it("Do not allow delete Pokémon when no Pokémon exist", () => {
    team.importPokepaste(poke["default-team"])

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    cy.get('[data-cy="add-team-member-tab"]').should("exist")
    cy.get('[data-cy="delete-from-team-button"]').should("not.exist")
  })

  it("Add 4 Pokémon to the team, delete 2, and add new 2", () => {
    team.importPokepaste(poke["default-team"])

    team.add("Pikachu")
    team.add("Tyranitar")
    team.add("Lugia")
    team.add("Mewtwo")

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    team.add("Zacian")
    team.add("Zamazenta")

    team.teamIs(["Pikachu", "Tyranitar", "Lugia", "Mewtwo", "Zacian", "Zamazenta"])
    cy.get('[data-cy="add-team-member-tab"]').should("not.exist")
  })

  it("Fill all 4 teams", () => {
    team.importPokepaste(poke["default-team"])

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    team.add("Tornadus")
    team.add("Calyrex-Shadow")
    team.add("Clefairy")
    team.add("Chi-Yu")
    team.add("Urshifu-Rapid-Strike")
    team.add("Rillaboom")
    team.teamIs(["Tornadus", "Calyrex", "Clefairy", "Chi-Yu", "Urshifu", "Rillaboom"])

    team.selectTeam("Team 2")
    team.add("Calyrex-Ice")
    team.add("Incineroar")
    team.add("Amoonguss")
    team.add("Urshifu-Rapid-Strike")
    team.add("Pelipper")
    team.add("Ting-Lu")
    team.teamIs(["Calyrex", "Incineroar", "Amoonguss", "Urshifu", "Pelipper", "Ting-Lu"])

    team.selectTeam("Team 3")
    team.add("Miraidon")
    team.add("Whimsicott")
    team.add("Iron Hands")
    team.add("Farigiraf")
    team.add("Chi-Yu")
    team.add("Ursaluna-Bloodmoon")
    team.teamIs(["Miraidon", "Whimsicott", "Iron Hands", "Farigiraf", "Chi-Yu", "Ursaluna"])

    team.selectTeam("Team 4")
    team.add("Kyogre")
    team.add("Tornadus")
    team.add("Landorus")
    team.add("Archaludon")
    team.add("Farigiraf")
    team.add("Rillaboom")
    team.teamIs(["Kyogre", "Tornadus", "Landorus", "Archaludon", "Farigiraf", "Rillaboom"])
  })

  it("Delete team", () => {
    team.selectTeam("Team 3")
    team.add("Miraidon")
    team.add("Whimsicott")
    team.add("Iron Hands")
    team.add("Farigiraf")
    team.add("Chi-Yu")
    team.add("Ursaluna-Bloodmoon")

    team.delete("Team 3")

    team.selectTeam("Team 3").isEmpty()
  })

  it("Change Team Name", () => {
    team.selectTeam("Team 3").updateTeamName("Hyper Offense")

    team.selectTeam("Team 1")

    team.selectTeam("Hyper Offense")
  })

  it("Change Team Name", () => {
    team.selectTeam("Team 3").updateTeamName("Hyper Offense")
    team.add("Miraidon")

    team.delete("Hyper Offense")

    team.selectTeam("Team 1")
    team.selectTeam("Team 3")
  })
})

describe("Create Teams", () => {
  it("Create 9 teams", () => {
    for (let i = 1; i <= 4; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    for (let i = 5; i <= 8; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    team.selectTeam("Team 9")
    team.add("Abomasnow")
  })

  it("Should import on empty slot on the middle and give focus on imported team", () => {
    for (let i = 1; i <= 9; i++) {
      team.importPokepaste(poke["default-team"])
    }

    team.goToLeftPage()
    team.delete("Team 7")

    team.goToLeftPage()

    team.importPokepaste(poke["pokepaste-forms-1"])

    team.pokemonOnEditNameIs("Vivillon")
  })

  it("Should remove empty pages when reload", () => {
    for (let i = 1; i <= 8; i++) {
      team.importPokepaste(poke["default-team"])
    }

    team.importPokepaste(poke["pokepaste-forms-1"])

    team.goToLeftPage()
    team.delete("Team 5")
    team.delete("Team 6")
    team.delete("Team 7")
    team.delete("Team 8")

    cy.reload()
    cy.get('[data-cy="team-vs-many"]').click({ force: true })
    team.goToRightPage()

    team.pokemonOnEditNameIs("Vivillon")
  })

  it("Should mantain second page when delete team and first page is full", () => {
    for (let i = 1; i <= 5; i++) {
      team.importPokepaste(poke["default-team"])
    }

    team.delete("Team 5")

    cy.reload()
    cy.get('[data-cy="team-vs-many"]').click({ force: true })
    team.goToRightPage()

    team.pokemonOnEditNameIs("Select a Pokémon")
  })

  it("Should navigate to left until first page", () => {
    team.selectTeam("Team 1")
    team.add("Pikachu")

    for (let i = 2; i <= 4; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    team.selectTeam("Team 5")
    team.add("Tyranitar")

    for (let i = 6; i <= 8; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    team.selectTeam("Team 9")
    team.add("Abomasnow")

    team.goToLeftPage()
    team.pokemonOnEditNameIs("Tyranitar")

    team.goToLeftPage()
    team.pokemonOnEditNameIs("Pikachu")
  })
})
