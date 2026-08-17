import { goToMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { PokemonProbability } from "@page-object/pokemon-probability"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const build = new PokemonBuildMobile()
const bottomNav = new BottomNav()
const teamTabs = new TeamTabsMobile()
const pokemonProbability = new PokemonProbability()

function openProbabilityCalcMobile() {
  goToMobile("Probability Calc")
}

describe("Move chips of the Detailed tab", () => {
  beforeEach(() => {
    openProbabilityCalcMobile()
  })

  it("Should never show the hits combo, even with a multi hit move", () => {
    bottomNav.goTo("Build")

    build.editMoves()
    build.searchMove("Scale Shot")
    build.selectMoveFromTable("Scale Shot")
    build.closeMoves()

    build.hitsSelectIsVisible()

    bottomNav.goTo("Detailed")

    pokemonProbability.activateMoveChip("Scale Shot")

    pokemonProbability.hitsSelectIsHidden()
  })

  it("Should show the move chips without the Edit button", () => {
    bottomNav.goTo("Detailed")

    pokemonProbability.moveChipsAreVisible()
    pokemonProbability.editButtonIsHidden()
  })
})

describe("Adding a member from the Detailed tab", () => {
  beforeEach(() => {
    openProbabilityCalcMobile()
  })

  it("Should go to the Build tab with the Pokémon table open", () => {
    bottomNav.onlyActiveTabIs("Detailed")

    teamTabs.addTeamMember()

    bottomNav.onlyActiveTabIs("Build")
    build.visiblePokemonSelectCountIs(1)
    build.visibleTableEntriesCountIsAtLeast(1)
  })
})
