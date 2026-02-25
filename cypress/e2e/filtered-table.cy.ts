import { Team } from "@page-object/team"

const team = new Team()

describe("Filtered Table behaviors", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })
  })

  describe("Filter and select", () => {
    it("Select a Pokémon in the middle of the list after filter", () => {
      team.addWithFilter("Sa", "Sableye")
      team.pokemonOnEditNameIs("Sableye")

      team.addWithFilter("Sa", "Sandshrew")
      team.pokemonOnEditNameIs("Sandshrew")

      team.addWithFilter("Sa", "Sandshrew-Alola")
      team.pokemonOnEditNameIs("Sandshrew-Alola")

      team.addWithFilter("Sa", "Sandslash")
      team.pokemonOnEditNameIs("Sandslash")

      team.addWithFilter("Sa", "Sandslash-Alola")
      team.pokemonOnEditNameIs("Sandslash-Alola")

      team.addWithFilter("Sa", "Salamence")
      team.pokemonOnEditNameIs("Salamence")
    })

    it("Select a Pokémon in the middle of the list after filter using Add new button", () => {
      const build = team.clickOnAdd()
      team.addWithFilter("Sa", "Sableye")
      team.pokemonOnEditNameIs("Sableye")
      build.delete()

      team.clickOnAdd()
      team.addWithFilter("Sa", "Sandshrew")
      team.pokemonOnEditNameIs("Sandshrew")
      build.delete()

      team.clickOnAdd()
      team.addWithFilter("Sa", "Sandshrew-Alola")
      team.pokemonOnEditNameIs("Sandshrew-Alola")
      build.delete()

      team.clickOnAdd()
      team.addWithFilter("Sa", "Sandslash")
      team.pokemonOnEditNameIs("Sandslash")
      build.delete()

      team.clickOnAdd()
      team.addWithFilter("Sa", "Sandslash-Alola")
      team.pokemonOnEditNameIs("Sandslash-Alola")
      build.delete()

      team.clickOnAdd()
      team.addWithFilter("oger", "Ogerpon-Cornerstone")
      team.pokemonOnEditNameIs("Ogerpon-Cornerstone")
      build.delete()
    })

    it("Select a Item in the middle of the list after filter", () => {
      const build = team.selectPokemon("Miraidon")

      build.selectItemByFilter("Ch", "Choice Scarf")
      team.pokemonOnEditItemIs("Choice Scarf")

      build.selectItemByFilter("Ch", "Choice Specs")
      team.pokemonOnEditItemIs("Choice Specs")

      build.selectItemByFilter("Ch", "Charcoal")
      team.pokemonOnEditItemIs("Charcoal")

      build.selectItemByFilter("Ch", "Charti Berry")
      team.pokemonOnEditItemIs("Charti Berry")

      build.selectItemByFilter("Ch", "Chesto Berry")
      team.pokemonOnEditItemIs("Chesto Berry")

      build.selectItemByFilter("Ch", "Chilan Berry")
      team.pokemonOnEditItemIs("Chilan Berry")
    })

    it("Select a Ability in the middle of the list after filter", () => {
      const build = team.selectPokemon("Rillaboom")

      build.selectAbilityByFilter("Ov", "Overgrow")
      team.pokemonOnEditAbilityIs("Overgrow")

      build.selectAbilityByFilter("Gr", "Grassy Surge")
      team.pokemonOnEditAbilityIs("Grassy Surge")
    })

    it("Select a Move in the middle of the list after filter", () => {
      const build = team.selectPokemon("Rillaboom")

      build.changeAttackOneByFilter("Ea", "Earthquake")
      build.changeAttackTwoByFilter("Ea", "Brick Break")
      build.changeAttackThreeByFilter("Ea", "Drum Beating")
      build.changeAttackFourByFilter("Ea", "Endeavor")
      team.pokemonOnEditAttacksIs("Earthquake", "Brick Break", "Drum Beating", "Endeavor")
    })
  })

  describe("Select first after filter and press tab", () => {
    it("Select a Pokémon after filter and press tab", () => {
      const build = team.selectPokemon("Rillaboom")

      build.inputPokemonName("Ty")
      cy.realPress("Tab")

      team.pokemonOnEditNameIs("Tyranitar")
    })

    it("Select a Item after filter and press tab", () => {
      const build = team.selectPokemon("Rillaboom")

      build.inputPokemonItem("Ch")
      cy.realPress("Tab")

      team.pokemonOnEditItemIs("Choice Band")
    })

    it("Select a Ability after filter and press tab", () => {
      const build = team.selectPokemon("Rillaboom")

      build.inputPokemonAbility("Ov")
      cy.realPress("Tab")

      team.pokemonOnEditAbilityIs("Overgrow")
    })

    it("Select a Move after filter and press tab", () => {
      const build = team.selectPokemon("Rillaboom")

      build.inputPokemonAttackOne("Ea")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackTwo("Re")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackThree("Es")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackFour("Rs")
      cy.realPress("Tab").wait(100)

      team.pokemonOnEditAttacksIs("Earth Power", "Rest", "Body Press", "High Horsepower")
    })
  })
})
