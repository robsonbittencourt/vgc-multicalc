import { goToSpeedCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { SpeedCalc } from "@page-object/speed-calc"
import { SpeedInsights } from "@page-object/speed-insights"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"

const bottomNav = new BottomNav()
const speedCalc = new SpeedCalc()
const speedInsights = new SpeedInsights()
const teamTabs = new TeamTabsMobile()

describe("Selecting a Pokémon on the scale", () => {
  let activePokemon: string

  beforeEach(() => {
    goToSpeedCalcMobile()

    speedCalc.activePokemonName().then(name => {
      activePokemon = name
    })

    speedCalc.scaleSettles()
  })

  function selectAnotherPokemon(): Cypress.Chainable<string> {
    return speedCalc.distinctPokemonInScale().then(names => {
      const target = names.find(name => name !== activePokemon)!

      speedCalc.selectTier(target)

      return cy.wrap(target)
    })
  }

  it("Should offer the button on the Speed tab after selecting a tier", () => {
    speedCalc.outspeedButtonIsHidden()

    selectAnotherPokemon().then(target => {
      speedCalc.outspeedButtonIs(target)
      bottomNav.onlyActiveTabIs("Speed")
    })
  })

  it("Should highlight the selected Pokémon on the scale", () => {
    selectAnotherPokemon().then(target => {
      speedCalc.tierIsSelected(target)
    })
  })

  it("Should open the Insights tab with the selected Pokémon", () => {
    selectAnotherPokemon().then(target => {
      bottomNav.goTo("Insights")

      speedInsights.nameIs(target)
    })
  })

  it("Should show the team Pokémon on the Insights tab while nothing is selected", () => {
    bottomNav.goTo("Insights")

    speedInsights.nameIs(activePokemon)
  })

  it("Should drop the selection when another team member is activated", () => {
    selectAnotherPokemon().then(target => {
      speedCalc.outspeedButtonIs(target)

      teamTabs.activateTeamMember(1)

      speedCalc.scaleSettles()

      speedCalc.outspeedButtonIsHidden()
    })
  })
})
