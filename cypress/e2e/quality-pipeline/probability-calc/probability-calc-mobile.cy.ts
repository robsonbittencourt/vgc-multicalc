import { goToProbabilityCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { CombinedProbability } from "@page-object/combined-probability"
import { GeneralProbability } from "@page-object/general-probability"
import { MobileShell } from "@page-object/mobile-shell"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const build = new PokemonBuildMobile()
const generalProbability = new GeneralProbability()
const combinedProbability = new CombinedProbability()

function clearAllProbabilities() {
  for (let i = 1; i <= 5; i++) {
    combinedProbability.inputProbability(i, "")
  }
}

const CARD_TITLES = ["Critical hit", "Protect", "Turns to sleep", "Wake up from sleep", "Fully paralyzed", "Freeze", "Snap out of confusion", "Multi hit moves"]

describe("Bottom nav tabs", () => {
  beforeEach(() => {
    goToProbabilityCalcMobile()
  })

  it("Should offer Detailed, General, Build and Teams", () => {
    bottomNav.tabsAre(["Detailed", "General", "Build", "Teams"])
    bottomNav.onlyActiveTabIs("Detailed")
  })

  it("Should switch between the four tabs", () => {
    bottomNav.goTo("General")
    bottomNav.onlyActiveTabIs("General")

    bottomNav.goTo("Build")
    bottomNav.onlyActiveTabIs("Build")

    bottomNav.goTo("Teams")
    bottomNav.onlyActiveTabIs("Teams")

    bottomNav.goTo("Detailed")
    bottomNav.onlyActiveTabIs("Detailed")
  })
})

describe("General tab", () => {
  beforeEach(() => {
    goToProbabilityCalcMobile()
    bottomNav.goTo("General")
  })

  it("Should render the eight reference tables", () => {
    generalProbability.cardCountIs(8)
    generalProbability.cardTitlesAre(CARD_TITLES)
  })

  it("Should fill the reference tables with rows", () => {
    generalProbability.cardHasRows("Critical hit")
    generalProbability.cardHasRows("Protect")
  })

  it("Should combine the filled probabilities on the same tab", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "50")

    combinedProbability.resultIs("75")
  })

  it("Should recalculate when a probability is edited", () => {
    clearAllProbabilities()

    combinedProbability.inputProbability(1, "50")
    combinedProbability.inputProbability(2, "50")

    combinedProbability.resultIs("75")

    combinedProbability.inputProbability(2, "100")

    combinedProbability.resultIs("100")
  })
})

describe("Detailed tab", () => {
  beforeEach(() => {
    goToProbabilityCalcMobile()
  })

  it("Should show the detailed widgets of the active Pokémon", () => {
    cy.get("app-pokemon-probability").should("exist")
    cy.get("app-team-probability").should("exist")
    cy.get("app-probability-field").should("exist")
  })
})

describe("Table overlay", () => {
  beforeEach(() => {
    goToProbabilityCalcMobile()
    bottomNav.goTo("Build")
  })

  it("Should open and close the Pokémon table", () => {
    build.openPokemonTable()

    shell.tableOverlayIsOpen()

    shell.closePokemonTable()

    shell.tableOverlayIsClosed()
  })
})

describe("Narrow screen", () => {
  beforeEach(() => {
    goToProbabilityCalcMobile()
  })

  it("Should not overflow the page horizontally", () => {
    shell.pageDoesNotOverflowHorizontally()
  })
})
