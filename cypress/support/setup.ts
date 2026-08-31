import { Header } from "@page-object/header"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"
import { SpeedCalc } from "@page-object/speed-calc"
import { TeamTabsMobile } from "@page-object/team-tabs-mobile"
import { TeamsWidget } from "@page-object/teams-widget"

import { poke } from "./e2e"

export const NATIONAL_DEX_MODE = {
  teraType: true,
  battery: true,
  powerSpot: true,
  tabletsOfRuin: true,
  swordOfRuin: true,
  vesselOfRuin: true,
  beadsOfRuin: true,
  neutralizingGas: true,
  allowAllPokes: true,
  allItems: true
}

export const MOBILE_VIEWPORT = { width: 390, height: 844 }

export function visitWithLocalStorage(entries: Record<string, string | null>) {
  cy.visit("http://localhost:4200/", {
    onBeforeLoad(win) {
      win.localStorage.setItem("announcementBypass", "true")
      win.localStorage.setItem("featureFlags", JSON.stringify(NATIONAL_DEX_MODE))

      Object.entries(entries).forEach(([key, value]) => {
        if (value === null) {
          win.localStorage.removeItem(key)
        } else {
          win.localStorage.setItem(key, value)
        }
      })
    }
  })
}

export function visitWithUserData(userData: object | string | null) {
  const raw = userData === null ? null : typeof userData === "string" ? userData : JSON.stringify(userData)

  visitWithLocalStorage({ userData: raw })
}

export function readUserData(): Cypress.Chainable<any> {
  return cy.window().then(win => JSON.parse(win.localStorage.getItem("userData")!))
}

export function goToMobile(screen: string) {
  cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height)
  cy.reload()

  new MobileCalcShell().isReady()
  new HeaderMobile().goToScreen(screen)
}

export function goToTeamVsManyMobile() {
  cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height)
  cy.reload()

  new MobileCalcShell().isReady()
  new HeaderMobile().goToTeamVsMany()
}

export function goToSimpleCalcMobile() {
  goToMobile("One vs One")
}

export function goToTypeCalcMobile() {
  goToMobile("Type Calc")
}

export function goToSpeedCalcMobile() {
  goToMobile("Speed Calc")
}

export function goToProbabilityCalcMobile() {
  goToMobile("Probability Calc")
}

export function buildSingleMemberTeamMobile(pokepaste: string, buildTabLabel = "Build") {
  const bottomNav = new BottomNav()
  const build = new PokemonBuildMobile()
  const teamTabs = new TeamTabsMobile()

  bottomNav.goTo(buildTabLabel)
  build.importPokemon(pokepaste)

  teamTabs.teamSizeIs(4)

  for (let i = 0; i < 3; i++) {
    teamTabs.longPressTeamMember(1)
    teamTabs.deleteFromTeamMenu()
  }

  teamTabs.teamSizeIs(1)
}

export function setUpDefaultTeam(): void {
  new Header().openTeamVsMany()
  setUpDefaultTeamOnCurrentScreen()
}

export function openSpeedCalcWithMetaScale(): void {
  const speedCalc = new SpeedCalc()

  new Header().openSpeedCalc()
  speedCalc.topUsage("60")
  speedCalc.mode("Stats and Meta")
}

export function openSpeedCalcWithEmptyTeam(): void {
  const header = new Header()

  header.openTeamVsMany()
  new TeamsWidget().delete("Team 1")

  header.openSpeedCalc()
}

export function setUpDefaultTeamOnCurrentScreen(): void {
  const teamsWidget = new TeamsWidget()

  teamsWidget.delete("Team 1")
  teamsWidget.importPokepaste(poke["default-team"])
}
