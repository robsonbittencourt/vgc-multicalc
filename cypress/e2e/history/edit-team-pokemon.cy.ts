import { poke } from "@cy-support/e2e"
import { Team } from "@page-object/team"

const team = new Team()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })
  team.delete("Team 1")
})

describe("Add Pokémon to the Team", () => {
  it("Add Pokémon to the team until have 6", () => {
    team.add("Abomasnow")
    team.add("Aipom")
    team.add("Alcremie")
    team.add("Alomomola")
    team.add("Altaria")
    team.add("Ambipom")

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

    team.add("Abomasnow")
    team.add("Aipom")
    team.add("Alcremie")
    team.add("Alomomola")

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    team.add("Altaria")
    team.add("Ambipom")

    team.teamIs(["Abomasnow", "Aipom", "Alcremie", "Alomomola", "Altaria", "Ambipom"])
    cy.get('[data-cy="add-team-member-tab"]').should("not.exist")
  })

  it("Fill all 4 teams", () => {
    team.importPokepaste(poke["default-team"])

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    team.add("Abomasnow")
    team.add("Aipom")
    team.add("Alcremie")
    team.add("Alomomola")
    team.add("Altaria")
    team.add("Ambipom")
    team.teamIs(["Abomasnow", "Aipom", "Alcremie", "Alomomola", "Altaria", "Ambipom"])

    team.selectTeam("Team 2")
    team.add("Amoonguss")
    team.add("Ampharos")
    team.add("Annihilape")
    team.add("Appletun")
    team.add("Applin")
    team.add("Araquanid")
    team.teamIs(["Amoonguss", "Ampharos", "Annihilape", "Appletun", "Applin", "Araquanid"])

    team.selectTeam("Team 3")
    team.add("Abomasnow")
    team.add("Aipom")
    team.add("Alcremie")
    team.add("Alomomola")
    team.add("Altaria")
    team.add("Ambipom")
    team.teamIs(["Abomasnow", "Aipom", "Alcremie", "Alomomola", "Altaria", "Ambipom"])

    team.selectTeam("Team 4")
    team.add("Amoonguss")
    team.add("Ampharos")
    team.add("Annihilape")
    team.add("Appletun")
    team.add("Applin")
    team.add("Araquanid")
    team.teamIs(["Amoonguss", "Ampharos", "Annihilape", "Appletun", "Applin", "Araquanid"])
  })

  it("Delete team", () => {
    team.selectTeam("Team 3")
    team.add("Abomasnow")
    team.add("Aipom")
    team.add("Alcremie")
    team.add("Alomomola")
    team.add("Altaria")
    team.add("Ambipom")

    team.delete("Team 3")

    team.selectTeam("Team 3").isEmpty()
  })

  it("Change team name", () => {
    team.selectTeam("Team 3").updateTeamName("Hyper Offense")

    team.selectTeam("Team 1")

    team.selectTeam("Hyper Offense")
  })

  it("Delete team with updated name", () => {
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
    team.add("Aipom")

    for (let i = 2; i <= 4; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    team.selectTeam("Team 5")
    team.add("Alcremie")

    for (let i = 6; i <= 8; i++) {
      team.selectTeam(`Team ${i}`)
      team.add("Abomasnow")
    }

    team.goToRightPage()

    team.selectTeam("Team 9")
    team.add("Abomasnow")

    team.goToLeftPage()
    team.pokemonOnEditNameIs("Alcremie")

    team.goToLeftPage()
    team.pokemonOnEditNameIs("Aipom")
  })
})
