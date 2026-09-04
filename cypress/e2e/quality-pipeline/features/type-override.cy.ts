import { Header } from "@page-object/header"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()

describe("Type override", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should show the species types without override marks", () => {
    const build = team.add("Charizard")

    build.typesAre("Fire", "Flying")
    build.hasNoTypeOverride()
  })

  it("Should replace only the primary type", () => {
    const build = team.add("Charizard")

    build.selectType1("Water")

    build.typesAre("Water", "Flying")
    build.hasTypeOverride()
  })

  it("Should replace only the secondary type", () => {
    const build = team.add("Charizard")

    build.selectType2("Steel")

    build.typesAre("Fire", "Steel")
    build.hasTypeOverride()
  })

  it("Should turn the Pokémon into a single type when the secondary type is removed", () => {
    const build = team.add("Charizard")

    build.removeType2()

    build.typesAre("Fire")
    build.hasTypeOverride()
  })

  it("Should promote the secondary type when the primary type is removed", () => {
    const build = team.add("Charizard")

    build.removeType1()

    build.typesAre("Flying")
    build.hasTypeOverride()
  })

  it("Should not offer the none option for a single type Pokémon", () => {
    const build = team.add("Charizard")
    build.removeType2()

    build.openType1Menu()

    build.type1MenuHasNoNoneOption()
    build.closeTypeMenu()
  })

  it("Should add a second type to a single type Pokémon", () => {
    const build = team.add("Flutter Mane")
    build.removeType2()

    build.addSecondType("Steel")

    build.typesAre("Ghost", "Steel")
  })

  it("Should restore the species types when the override is cleared", () => {
    const build = team.add("Charizard")
    build.selectType1("Water")

    build.restoreTypes()

    build.typesAre("Fire", "Flying")
    build.hasNoTypeOverride()
  })

  it("Should discard the override when another Pokémon is selected", () => {
    const build = team.add("Charizard")
    build.selectType1("Water")

    build.selectPokemon("Flutter Mane")

    build.typesAre("Ghost", "Fairy")
    build.hasNoTypeOverride()
  })

  it("Should not dim the species types when Tera is active without an override", () => {
    const build = team.add("Charizard")

    build.terastalyze()

    build.typesAreNotDimmed()
  })

  it("Should dim the types when Tera is active and the types are overridden", () => {
    const build = team.add("Charizard")
    build.selectType1("Water")

    build.terastalyze()

    build.typesAreDimmed()
  })

  it("Should set the unknown type after a move like Burn Up", () => {
    const build = team.add("Charizard")

    build.selectUnknownType1()

    build.typesAre("???", "Flying")
    build.hasTypeOverride()
  })

  it("Should turn the Pokémon into a pure unknown type", () => {
    const build = team.add("Charizard")
    build.selectUnknownType1()

    build.removeType2()

    build.typesAre("???")
    build.hasTypeOverride()
  })

  it("Should offer the none option only in the second type menu", () => {
    const build = team.add("Charizard")

    build.openType1Menu()
    build.type1MenuHasNoneOption()
    build.closeTypeMenu()

    build.openType2Menu()
    build.type2MenuHasNoneOption()
    build.closeTypeMenu()
  })

  it("Should offer the unknown type in both type menus", () => {
    const build = team.add("Charizard")

    build.openType1Menu()
    build.type1MenuHasUnknownOption()
    build.closeTypeMenu()

    build.openType2Menu()
    build.type2MenuHasUnknownOption()
    build.closeTypeMenu()
  })

  it("Should not offer the none option for a pure unknown type Pokémon", () => {
    const build = team.add("Charizard")
    build.selectUnknownType1()
    build.removeType2()

    build.openType1Menu()

    build.type1MenuHasNoNoneOption()
    build.type1MenuHasUnknownOption()
    build.closeTypeMenu()
  })

  it("Should add a second type to a pure unknown type Pokémon", () => {
    const build = team.add("Charizard")
    build.selectUnknownType1()
    build.removeType2()

    build.addSecondType("Flying")

    build.typesAre("???", "Flying")
  })

  it("Should keep the unknown type when the primary type is removed", () => {
    const build = team.add("Charizard")
    build.selectUnknownType2()

    build.removeType1()

    build.typesAre("???")
    build.hasTypeOverride()
  })

  it("Should keep the override after reloading the page", () => {
    const build = team.add("Charizard")
    build.selectType1("Water")
    build.removeType2()

    cy.reload()

    build.typesAre("Water")
    build.hasTypeOverride()
  })
})
