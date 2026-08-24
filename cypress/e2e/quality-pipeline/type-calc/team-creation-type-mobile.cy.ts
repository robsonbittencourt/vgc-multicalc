import { goToTypeCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()
const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()

describe("Create a team and add the first Pokemon on Type Calc", () => {
  beforeEach(() => {
    goToTypeCalcMobile()
  })

  it("Should open the Pokemon table and add the first member to a brand new team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable().then(chosen => {
      teamTabs.visibleTeamSizeIs(1)
      build.visibleNameIs(chosen)
    })
  })

  it("Should stay on Type Calc after picking the Pokemon for a new team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()
    build.selectFirstPokemonFromOpenTable()

    bottomNav.tabsAre(["Coverage", "Insights", "Build", "Teams"])
  })

  it("Should show the empty state with the add tab on Coverage when there is no team left", () => {
    bottomNav.goTo("Teams")

    teamsWidget.deleteActiveTeam()

    bottomNav.goTo("Coverage")

    teamTabs.noPokemonMessageIsVisible()
    teamTabs.addTabIsVisible()
  })

  it("Should show the empty state with the add tab on Insights when there is no team left", () => {
    bottomNav.goTo("Teams")

    teamsWidget.deleteActiveTeam()

    bottomNav.goTo("Insights")

    teamTabs.noPokemonMessageIsVisible()
    teamTabs.addTabIsVisible()
  })

  it("Should open the Pokemon table from the add tab on the empty Coverage state", () => {
    bottomNav.goTo("Teams")

    teamsWidget.deleteActiveTeam()

    bottomNav.goTo("Coverage")
    teamTabs.noPokemonMessageIsVisible()
    teamTabs.addTeamMember()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable().then(chosen => {
      build.pokemonTableIsHidden()
      teamTabs.visibleTeamSizeIs(1)
      teamTabs.visibleTabsHaveSprite(chosen)
    })
  })

  it("Should add a new member without overwriting the first one when a second Pokemon is added", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable().then(firstPokemon => {
      teamTabs.addTeamMember()
      build.pokemonTableIsVisible()

      build.selectFirstPokemonFromOpenTable().then(() => {
        teamTabs.visibleTeamSizeIs(2)
        teamTabs.activateVisibleTeamMember(0)
        build.visibleNameIs(firstPokemon)
      })
    })
  })
})
