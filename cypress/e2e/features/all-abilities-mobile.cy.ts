import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const teamTabs = new TeamTabsMobile()

describe("All Abilities toggle on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    teamTabs.activateTeamMember(0)
  })

  it("Should show only the Pokémon abilities without the search input when the toggle is off", () => {
    build.selectPokemonFromTable("Venusaur")

    build.openAbilityTable()

    build.allAbilitiesToggleIsOff()
    build.abilitySearchDoesNotExist()
    build.tableHasNoGroups()
    build.tableEntryIsVisible("Overgrow")
    build.tableEntryDoesNotExist("Aerilate")
  })

  it("Should show the search input and both groups when the toggle is on", () => {
    build.selectPokemonFromTable("Venusaur")
    build.openAbilityTable()

    build.toggleAllAbilities()

    build.allAbilitiesToggleIsOn()
    build.abilitySearchIsVisible()
    build.tableGroupIsVisible("This Pokémon")
    build.tableGroupIsVisible("All Abilities")
  })

  it("Should filter the abilities through the search input", () => {
    build.selectPokemonFromTable("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()

    build.searchAbility("Aerilate")

    build.tableEntryIsVisible("Aerilate")
    build.tableEntryDoesNotExist("Overgrow")
  })

  it("Should keep an ability that does not belong to the Pokémon after selecting it", () => {
    build.selectPokemonFromTable("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.searchAbility("Aerilate")

    build.selectAbilityFromTable("Aerilate")

    build.abilityIs("Aerilate")
  })

  it("Should disable the toggle and open the full table while a non native ability is selected", () => {
    build.selectPokemonFromTable("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.searchAbility("Aerilate")
    build.selectAbilityFromTable("Aerilate")

    build.openAbilityTable()

    build.allAbilitiesToggleIsOn()
    build.allAbilitiesToggleIsDisabled()
    build.tableGroupIsVisible("This Pokémon")
    build.tableGroupIsVisible("All Abilities")
  })
})
