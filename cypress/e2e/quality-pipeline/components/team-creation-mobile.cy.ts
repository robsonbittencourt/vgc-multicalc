import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"

const teamsWidget = new TeamsWidget()
const teamTabs = new TeamTabsMobile()
const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()
const mobileShell = new MobileCalcShell()

describe("Create a team and add the first Pokemon", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should open the Pokemon table and add the first member to a brand new team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable().then(chosen => {
      teamTabs.teamSizeIs(1)
      build.nameIs(chosen)
    })

    teamTabs.noPokemonMessageIsHidden()
  })

  it("Should stay on Team vs Many after picking the Pokemon for a new team", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable()

    bottomNav.tabsAre(["Results", "Teams", "Settings"])
  })

  it("Should show the empty state and hide the opponents when there is no team left", () => {
    bottomNav.goTo("Teams")

    teamsWidget.deleteActiveTeam()
    teamsWidget.noTeamsMessageIsVisible()

    bottomNav.goTo("Results")

    teamTabs.noPokemonMessageIsVisible()
    mobileShell.opponentsAreHidden()
  })

  it("Should add a new member without overwriting the first one when a custom set is picked", () => {
    bottomNav.goTo("Teams")
    teamsWidget.createTeam()

    build.pokemonTableIsVisible()

    build.selectFirstPokemonFromOpenTable().then(firstPokemon => {
      teamTabs.addTeamMember()
      build.pokemonTableIsVisible()

      build.selectFirstPokemonFromOpenTable().then(() => {
        teamTabs.teamSizeIs(2)
        teamTabs.activateTeamMember(0)
        build.nameIs(firstPokemon)
      })
    })
  })
})
