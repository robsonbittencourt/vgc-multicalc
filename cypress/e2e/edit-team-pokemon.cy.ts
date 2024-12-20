import { Team } from "@page-object/team"

const team = new Team()

let defaultTeamData: string

before(() => {
  cy.fixture("default-team-data").then(data => {
    defaultTeamData = data
  })
})

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
    team.importPokepaste(defaultTeamData)

    team.selectTeamMember("Miraidon").delete()
    team.selectTeamMember("Koraidon").delete()

    cy.get('[data-cy="add-team-member-tab"]').should("exist")
    cy.get('[data-cy="delete-from-team-button"]').should("not.exist")
  })

  it("Add 4 Pokémon to the team, delete 2, and add new 2", () => {
    team.importPokepaste(defaultTeamData)

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
    team.importPokepaste(defaultTeamData)

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
