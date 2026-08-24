import { goToSpeedCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()
const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()

describe("Create a team and add the first Pokemon on Speed Calc", () => {
  beforeEach(() => {
    goToSpeedCalcMobile()
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

  it("Should stay on Speed Calc after picking the Pokemon for a new team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()
    build.selectFirstPokemonFromOpenTable()

    bottomNav.tabsAre(["Speed", "Insights", "Teams", "Settings"])
  })

  it("Should show the empty state when there is no team left", () => {
    bottomNav.goTo("Teams")

    teamsWidget.deleteActiveTeam()

    teamsWidget.noTeamsMessageIsVisible()

    bottomNav.goTo("Speed")

    teamTabs.noPokemonMessageIsVisible()
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
