import { MainPage } from "cypress/page-object/main-page"

describe('Add Pokémon to the Team', () => {
  it('Add Pokémon to the team until have 6', () => {
    const mainPage = new MainPage()
    
    mainPage.addNewTeamMember("Pikachu")
    mainPage.addNewTeamMember("Tyranitar")
    mainPage.addNewTeamMember("Lugia")
    mainPage.addNewTeamMember("Mewtwo")

    cy.get('[data-cy="add-team-member-tab"]').should('not.exist')
  })

  it('Do not allow delete Pokémon when no Pokémon exist', () => {
    const mainPage = new MainPage()
    
    mainPage.selectTeamMember("Miraidon").delete()
    mainPage.selectTeamMember("Koraidon").delete()

    cy.get('[data-cy="add-team-member-tab"]').should('exist')
    cy.get('[data-cy="delete-from-team-button"]').should('not.exist')
  })

  it('Add 4 Pokémon to the team, delete 2, and add new 2', () => {
    const mainPage = new MainPage()
    
    mainPage.addNewTeamMember("Pikachu")
    mainPage.addNewTeamMember("Tyranitar")
    mainPage.addNewTeamMember("Lugia")
    mainPage.addNewTeamMember("Mewtwo")

    mainPage.selectTeamMember("Miraidon").delete()
    mainPage.selectTeamMember("Koraidon").delete()

    mainPage.addNewTeamMember("Zacian")
    mainPage.addNewTeamMember("Zamazenta")

    mainPage.teamIs(["Pikachu", "Tyranitar", "Lugia", "Mewtwo", "Zacian", "Zamazenta"])
    cy.get('[data-cy="add-team-member-tab"]').should('not.exist')
  })

  it('Fill all 4 teams', () => {
    const mainPage = new MainPage()

    mainPage.selectTeamMember("Miraidon").delete()
    mainPage.selectTeamMember("Koraidon").delete()
    
    mainPage.addNewTeamMember("Tornadus")
    mainPage.addNewTeamMember("Calyrex-Shadow")
    mainPage.addNewTeamMember("Clefairy")
    mainPage.addNewTeamMember("Chi-Yu")
    mainPage.addNewTeamMember("Urshifu-Rapid-Strike")
    mainPage.addNewTeamMember("Rillaboom")
    mainPage.teamIs(["Tornadus", "Calyrex-Shadow", "Clefairy", "Chi-Yu", "Urshifu-Rapid-Strike", "Rillaboom"])

    mainPage.selectTeam("Team 2")
    mainPage.addNewTeamMember("Calyrex-Ice")
    mainPage.addNewTeamMember("Incineroar")
    mainPage.addNewTeamMember("Amoonguss")
    mainPage.addNewTeamMember("Urshifu-Rapid-Strike")
    mainPage.addNewTeamMember("Pelipper")
    mainPage.addNewTeamMember("Ting-Lu")
    mainPage.teamIs(["Calyrex-Ice", "Incineroar", "Amoonguss", "Urshifu-Rapid-Strike", "Pelipper", "Ting-Lu"])

    mainPage.selectTeam("Team 3")
    mainPage.addNewTeamMember("Miraidon")
    mainPage.addNewTeamMember("Whimsicott")
    mainPage.addNewTeamMember("Iron Hands")
    mainPage.addNewTeamMember("Farigiraf")
    mainPage.addNewTeamMember("Chi-Yu")
    mainPage.addNewTeamMember("Ursaluna-Bloodmoon")
    mainPage.teamIs(["Miraidon", "Whimsicott", "Iron Hands", "Farigiraf", "Chi-Yu", "Ursaluna-Bloodmoon"])

    mainPage.selectTeam("Team 4")
    mainPage.addNewTeamMember("Kyogre")
    mainPage.addNewTeamMember("Tornadus")
    mainPage.addNewTeamMember("Landorus")
    mainPage.addNewTeamMember("Archaludon")
    mainPage.addNewTeamMember("Farigiraf")
    mainPage.addNewTeamMember("Rillaboom")
    mainPage.teamIs(["Kyogre", "Tornadus", "Landorus", "Archaludon", "Farigiraf", "Rillaboom"])
  })

  it('Delete team', () => {
    const mainPage = new MainPage()

    mainPage.selectTeam("Team 3")
    mainPage.addNewTeamMember("Miraidon")
    mainPage.addNewTeamMember("Whimsicott")
    mainPage.addNewTeamMember("Iron Hands")
    mainPage.addNewTeamMember("Farigiraf")
    mainPage.addNewTeamMember("Chi-Yu")
    mainPage.addNewTeamMember("Ursaluna-Bloodmoon")
    
    mainPage.deleteTeam("Team 3")

    mainPage.teamIsEmpty("Team 3")
  })
})