import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"

const team = new Team()

describe("Filtered Table behaviors", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })
    cy.location("pathname").should("eq", "/team-vs-many")
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
      const build = team.selectPokemon("Charizard")

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
      const build = team.selectPokemon("Dragonite")

      build.selectAbilityByFilter("In", "Inner Focus")
      team.pokemonOnEditAbilityIs("Inner Focus")

      build.selectAbilityByFilter("Mu", "Multiscale")
      team.pokemonOnEditAbilityIs("Multiscale")
    })

    it("Select a Move in the middle of the list after filter", () => {
      const build = team.selectPokemon("Dragonite")

      build.changeAttackOneByFilter("Ea", "Earthquake")
      build.changeAttackTwoByFilter("Br", "Brick Break")
      build.changeAttackThreeByFilter("Di", "Dive")
      build.changeAttackFourByFilter("En", "Endure")
      team.pokemonOnEditAttacksIs("Earthquake", "Brick Break", "Dive", "Endure")
    })
  })

  describe("Mega Pokémon search", () => {
    it("when searching 'Mega Dra', then lists Dragonite-Mega", () => {
      const build = new PokemonBuild("your-team")
      build.inputPokemonName("Mega Dra")

      cy.get('[data-cy="table-entry-Dragonite-Mega"]').should("exist")
      cy.get('[data-cy="table-entry-Garchomp-Mega"]').should("not.exist")
    })

    it("when selecting Dragonite-Mega via 'Mega Dra' search, then pokemon is set to Dragonite-Mega", () => {
      const build = new PokemonBuild("your-team")
      build.selectPokemonByFilter("Mega Dra", "Dragonite-Mega")

      cy.get('[data-cy="pokemon-select"] input').should("have.value", "Dragonite-Mega")
    })
  })

  describe("Select first after filter and press tab", () => {
    it("Select a Pokémon after filter and press tab", () => {
      const build = team.selectPokemon("Charizard")

      build.inputPokemonName("Ty")
      cy.realPress("Tab")

      team.pokemonOnEditNameIs("Tyranitar-Mega")
      build.tableEntryIsSelected("Tyranitarite")

      build.inputPokemonName("Pik")
      cy.realPress("Tab")

      team.pokemonOnEditNameIs("Pikachu")
      build.tableEntryIsSelected("Light Ball")
    })

    it("Select a Item after filter and press tab", () => {
      const build = team.selectPokemon("Dragonite")

      build.inputPokemonItem("Cho")
      cy.realPress("Tab")

      team.pokemonOnEditItemIs("Choice Band")
    })

    it("Select a Ability after filter and press tab", () => {
      const build = team.selectPokemon("Dragonite")

      build.inputPokemonAbility("In")
      cy.realPress("Tab")

      team.pokemonOnEditAbilityIs("Inner Focus")
    })

    it("Select a Move after filter and press tab", () => {
      const build = team.selectPokemon("Dragonite")

      build.inputPokemonAttackOne("Ea")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackTwo("Bri")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackThree("Di")
      cy.realPress("Tab").wait(100)

      build.inputPokemonAttackFour("En")
      cy.realPress("Tab").wait(100)

      team.pokemonOnEditAttacksIs("Earthquake", "Brick Break", "Dive", "Endure")
      team.pokemonOnEditAttacksIs("Earthquake", "Brick Break", "Dive", "Endure")
    })
  })
})
