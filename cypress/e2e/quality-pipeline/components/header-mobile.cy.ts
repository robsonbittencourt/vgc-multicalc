import { goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { HeaderMobile } from "@page-object/header-mobile"
import { MobileCalcShell } from "@page-object/mobile-calc-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const headerMobile = new HeaderMobile()
const bottomNav = new BottomNav()
const shell = new MobileCalcShell()
const build = new PokemonBuildMobile()

describe("Android back navigation", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should close the open table staying on the same screen", () => {
    build.openPokemonTable()

    shell.tableOverlayIsOpen()

    headerMobile.androidBack()

    shell.tableOverlayIsClosed()
    bottomNav.activeTabIs("Results")
  })

  it("Should return to the main tab from a secondary one", () => {
    bottomNav.goTo("Settings")

    bottomNav.activeTabIs("Settings")

    headerMobile.androidBack()

    bottomNav.activeTabIs("Results")
  })
})

describe("Hamburger menu", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should lock the scroll of the body while the menu is open", () => {
    headerMobile.bodyScrollIsFree()

    headerMobile.openMenu()

    headerMobile.menuIsOpen()
    headerMobile.bodyScrollIsLocked()

    headerMobile.touchMenuOverlay()

    headerMobile.menuIsClosed()
    headerMobile.bodyScrollIsFree()
  })

  it("Should close the menu when a screen is chosen", () => {
    headerMobile.goToScreen("Type Calc")

    headerMobile.menuIsClosed()
    headerMobile.bodyScrollIsFree()
  })
})

describe("Install as an app", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
  })

  it("Should offer the install button only between the prompt and the installation", () => {
    headerMobile.openMenu()

    headerMobile.installAppIsUnavailable()

    headerMobile.firePwaInstallPrompt()

    headerMobile.installAppIsAvailable()

    headerMobile.firePwaAppInstalled()

    headerMobile.installAppIsUnavailable()
  })
})

describe("Theme and color inside the menu", () => {
  beforeEach(() => {
    goToTeamVsManyMobile()
    headerMobile.openMenu()
  })

  it("Should highlight the selected theme", () => {
    headerMobile.selectThemeFromMenu("Dark")

    headerMobile.themeIsHighlighted("Dark")
  })

  it("Should keep the menu open after choosing a theme", () => {
    headerMobile.selectThemeFromMenu("Dark")

    headerMobile.menuIsOpen()
  })

  it("Should move the highlight when another theme is chosen", () => {
    headerMobile.selectThemeFromMenu("Dark")
    headerMobile.themeIsHighlighted("Dark")

    headerMobile.selectThemeFromMenu("Light")

    headerMobile.themeIsHighlighted("Light")
    headerMobile.menuIsOpen()
  })
})
