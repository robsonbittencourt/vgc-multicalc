import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToSimpleCalcMobile } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()
const opponents = new Opponent()

function selectStatus(status: string) {
  cy.get('[data-cy="pokemon-status"]').find('[data-cy="input-select"]').click()
  cy.get("mat-option").contains(status).click()
  cy.get("mat-option").should("not.exist")
}

function selectToxicTurn(turn: number) {
  cy.get('[data-cy="toxic-counter"]').find('[data-cy="input-select"]').click()
  cy.get("mat-option")
    .contains(new RegExp(`^${turn}$`))
    .click()
  cy.get("mat-option").should("not.exist")
}

function selectTeraType(teraType: string) {
  cy.get('[data-cy="tera-type"]').find('[data-cy="input-select"]').click()
  cy.get("mat-option").contains(teraType).click()
  cy.get("mat-option").should("not.exist")
}

function importBothSides() {
  build.activateLeftPokemon()
  build.importPokemon(poke["ursaluna"])

  build.activateRightPokemon()
  build.importPokemon(poke["tyranitar"])

  build.activateLeftPokemon()
}

describe("Status", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should offer every status on the combo box", () => {
    cy.get('[data-cy="pokemon-status"]').find('[data-cy="input-select"]').click()

    cy.get("mat-option").should($options => {
      const labels = [...$options].map(option => option.textContent!.trim())

      expect(labels).to.deep.eq(["Healthy", "Sleep", "Poison", "Badly Poison", "Burn", "Freeze", "Paralysis"])
    })
  })

  it("Should raise the damage when Guts is activated by the burn", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)

    selectStatus("Burn")

    opponents.get("Tyranitar").damageIs(177.4, 209.6)
    opponents.get("Tyranitar").descriptionContains("Guts")
  })

  it("Should restore the original damage when the status goes back to healthy", () => {
    selectStatus("Burn")
    selectStatus("Healthy")

    opponents.get("Tyranitar").damageIs(117.2, 139.7)
  })
})

describe("Toxic turn", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
    build.activateRightPokemon()
  })

  it("Should not show the toxic turn input on the other status", () => {
    cy.get('[data-cy="toxic-counter"]').should("not.exist")

    selectStatus("Burn")

    cy.get('[data-cy="toxic-counter"]').should("not.exist")
  })

  it("Should start the toxic turn at one when the Pokémon becomes Badly Poisoned", () => {
    selectStatus("Badly Poison")

    cy.get('[data-cy="toxic-counter"]').should("contain.text", "1")

    build.activateLeftPokemon()
    build.activateMoveChip(2)

    opponents.get("Tyranitar").descriptionContains("after toxic damage")
  })

  it("Should change the damage result when the toxic turn is increased", () => {
    selectStatus("Badly Poison")

    selectToxicTurn(5)

    cy.get('[data-cy="toxic-counter"]').should("contain.text", "5")

    build.activateLeftPokemon()
    build.activateMoveChip(2)

    opponents.get("Tyranitar").descriptionContains("after toxic damage (turn 5)")
  })

  it("Should restart the toxic turn at one when Badly Poison is applied again", () => {
    selectStatus("Badly Poison")
    selectToxicTurn(5)

    selectStatus("Burn")
    selectStatus("Badly Poison")

    cy.get('[data-cy="toxic-counter"]').should("contain.text", "1")
  })
})

describe("Tera type", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should offer the tera selector on the build", () => {
    cy.get('[data-cy="tera-type"]').should("exist")
  })

  it("Should change the damage result when the defender terastalizes", () => {
    opponents.get("Tyranitar").damageIs(117.2, 139.7)

    build.activateRightPokemon()
    selectTeraType("Flying")
    cy.get('[data-cy="terastal-button"]:visible').first().click({ force: true })

    build.activateLeftPokemon()

    opponents.get("Tyranitar").damageIs(0, 0)
  })
})

describe("Stat modifiers", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    importBothSides()
  })

  it("Should offer a modifier select for every stat but hp", () => {
    cy.get('[data-cy="stat-modifier"]').should("have.length", 5)
  })
})
