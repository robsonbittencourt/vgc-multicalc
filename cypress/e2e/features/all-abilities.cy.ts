import { Header } from "@page-object/header"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()

describe("All Abilities toggle", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    teamsWidget.delete("Team 1")
  })

  it("Should show only the Pokémon abilities without group titles when the toggle is off", () => {
    const build = team.add("Venusaur")

    build.openAbilityTable()

    build.allAbilitiesToggleIsOff()
    build.tableHasNoGroups()
    build.tableEntryIsVisible("Overgrow")
    build.tableEntryIsVisible("Chlorophyll")
    build.tableEntryDoesNotExist("Aerilate")
  })

  it("Should split the abilities in two groups when the toggle is on", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()

    build.toggleAllAbilities()

    build.allAbilitiesToggleIsOn()
    build.tableGroupIsVisible("This Pokémon")
    build.tableGroupIsVisible("All Abilities")
    build.tableEntryIsVisible("Overgrow")
    build.tableEntryIsVisible("Aerilate")
  })

  it("Should keep an ability that does not belong to the Pokémon after selecting it", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()

    build.selectAbilityByFilter("Aerilate", "Aerilate")

    build.abilityIs("Aerilate")
  })

  it("Should disable the toggle while a non native ability is selected", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.selectAbilityByFilter("Aerilate", "Aerilate")

    build.openAbilityTable()

    build.allAbilitiesToggleIsOn()
    build.allAbilitiesToggleIsDisabled()
  })

  it("Should open the full table with the non native ability selected", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.selectAbilityByFilter("Aerilate", "Aerilate")

    build.openAbilityTable()

    build.tableGroupIsVisible("This Pokémon")
    build.tableGroupIsVisible("All Abilities")
    build.tableEntryIsVisible("Aerilate")
  })

  it("Should enable the toggle again when a native ability is selected back", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.selectAbilityByFilter("Aerilate", "Aerilate")
    build.openAbilityTable()

    build.selectAbilityByFilter("Chlorophyll", "Chlorophyll")

    build.abilityIs("Chlorophyll")
    build.openAbilityTable()
    build.allAbilitiesToggleIsEnabled()
  })

  it("Should reset the toggle when another Pokémon is edited", () => {
    const build = team.add("Venusaur")
    build.openAbilityTable()
    build.toggleAllAbilities()
    build.allAbilitiesToggleIsOn()
    build.closeTable()

    const otherBuild = team.add("Incineroar")
    otherBuild.openAbilityTable()

    otherBuild.allAbilitiesToggleIsOff()
    otherBuild.tableHasNoGroups()
  })
})
