import { poke } from "@cy-support/e2e"
import { goToSimpleCalcMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { Field } from "@page-object/field"
import { MobileShell } from "@page-object/mobile-shell"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const bottomNav = new BottomNav()
const shell = new MobileShell()
const build = new PokemonBuildMobile()
const field = new Field()
const opponents = new Opponent()

function importBothSides() {
  build.activateLeftPokemon()
  build.importPokemon(poke["ursaluna"])

  build.activateRightPokemon()
  build.importPokemon(poke["tyranitar"])

  build.activateLeftPokemon()
}

describe("Bottom nav tabs", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
  })

  it("Should offer Results and Settings", () => {
    bottomNav.tabsAre(["Results", "Settings"])
    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should switch between the two tabs", () => {
    bottomNav.goTo("Settings")
    bottomNav.onlyActiveTabIs("Settings")

    bottomNav.goTo("Results")
    bottomNav.onlyActiveTabIs("Results")
  })

  it("Should keep the scroll of each tab when coming back to it", () => {
    shell.scrollContentTo(200)
    shell.contentScrollIs(200)

    bottomNav.goTo("Settings")

    shell.tabScrollIs("scrollable-content-field", 0)

    bottomNav.goTo("Results")

    shell.contentScrollIs(200)
  })
})

describe("Switching between the two sides", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should start with the left side active", () => {
    build.leftPokemonIsActive()
    build.nameIs("Ursaluna")
  })

  it("Should show the build of the side that was activated", () => {
    build.activateRightPokemon()

    build.rightPokemonIsActive()
    build.nameIs("Tyranitar")
  })

  it("Should make the activated side the attacker", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)

    build.activateRightPokemon()

    opponents.get("Ursaluna").damageIs(31.3, 36.8)
  })
})

describe("Result card", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should show the damage of the active attacker", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)
  })

  it("Should never collapse the card", () => {
    shell.tableOverlayIsClosed()

    opponents.get("Tyranitar").descriptionContains("Ursaluna")
  })

  it("Should change the result when another move is activated", () => {
    build.activateMoveChip(2)

    opponents.get("Tyranitar").damageIs(12.3, 14.5)
  })
})

describe("Role toggle", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should invert who attacks whom", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)

    build.toggleRole("defender")

    opponents.get("Ursaluna").damageIs(31.3, 36.8)
  })
})

describe("Table overlay", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
  })

  it("Should open and close the Pokémon table", () => {
    build.openPokemonTable()

    shell.tableOverlayIsOpen()

    shell.closePokemonTable()

    shell.tableOverlayIsClosed()
  })

  it("Should hide the result card while the table is open", () => {
    build.openPokemonTable()

    cy.get(".results-list").should("not.be.visible")
  })

  it("Should select a Pokémon from the table", () => {
    build.selectPokemonFromTable("Miraidon")

    build.nameIs("Miraidon")
  })
})

describe("Settings tab", () => {
  let descriptionWithoutReflect: string

  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()

    build.cardDescription().then((text: string) => {
      descriptionWithoutReflect = text
    })
  })

  it("Should show the field on the Settings tab", () => {
    bottomNav.goTo("Settings")

    cy.get("app-field").should("be.visible")
  })

  it("Should apply a field condition to the result", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)

    bottomNav.goTo("Settings")
    cy.get("[data-cy=reflect-defender] button").scrollIntoView()
    field.reflectDefender()
    bottomNav.goTo("Results")

    build.cardDescriptionIsNot(descriptionWithoutReflect)
  })
})

describe("Narrow screen", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should not overflow the page horizontally", () => {
    shell.pageDoesNotOverflowHorizontally()
  })
})
