import { poke } from "@cy-support/e2e"
import { goToSimpleCalcMobile } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()
const opponents = new Opponent()

describe("Aegislash form toggle", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Aegislash-Shield")
  })

  it("Should offer the form toggle for Aegislash", () => {
    cy.get('[data-cy="aegislash-form-toggle"]').should("exist")
  })

  it("Should toggle between the Shield and the Blade form", () => {
    build.nameIs("Aegislash-Shield")

    cy.get('[data-cy="aegislash-form-toggle"]').click({ force: true })

    build.nameIs("Aegislash-Blade")

    cy.get('[data-cy="aegislash-form-toggle"]').click({ force: true })

    build.nameIs("Aegislash-Shield")
  })

  it("Should not offer the toggle of another Pokémon", () => {
    cy.get('[data-cy="palafin-form-toggle"]').should("not.exist")
  })
})

describe("Palafin form toggle", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Palafin")
  })

  it("Should offer the form toggle for Palafin", () => {
    cy.get('[data-cy="palafin-form-toggle"]').should("exist")
  })

  it("Should toggle between the Zero and the Hero form", () => {
    build.nameIs("Palafin")

    cy.get('[data-cy="palafin-form-toggle"]').click({ force: true })

    build.nameIs("Palafin-Hero")
  })

  it("Should not offer the toggle of another Pokémon", () => {
    cy.get('[data-cy="aegislash-form-toggle"]').should("not.exist")
  })
})

describe("Allies fainted with Last Respects", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["basculegion"])
  })

  it("Should show the allies fainted control", () => {
    cy.get('[data-cy="allies-fainted"]').should("exist")
  })

  it("Should raise the base power when two allies fainted", () => {
    opponents.get("Tyranitar").damageIs(15.5, 18.8)

    cy.get('[data-cy="allies-fainted-2"]').find("button").click({ force: true })

    opponents.get("Tyranitar").damageIs(47.3, 55.9)
    opponents.get("Tyranitar").descriptionContains("150 BP")
  })
})

describe("Last move failed with Stomping Tantrum", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["ting-lu"])
    build.activateMoveChip(2)
  })

  it("Should show the last move failed control", () => {
    cy.get('[data-cy="last-move-failed"]').should("exist")
  })

  it("Should double the base power when the last move failed", () => {
    opponents.get("Tyranitar").damageIs(55.9, 67.7)

    cy.get('[data-cy="last-move-failed"] input').click({ force: true })

    opponents.get("Tyranitar").damageIs(112.9, 133.3)
    opponents.get("Tyranitar").descriptionContains("150 BP")
  })
})

describe("Target damaged with Assurance", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["incineroar"])
    build.editMoves()
    build.searchMove("Assurance")
    build.selectMoveFromTable("Assurance")
    build.closeMoves()
    build.activateMoveChip(1)
  })

  it("Should show the target damaged control", () => {
    cy.get('[data-cy="target-damaged"]').should("exist")
  })

  it("Should double the base power when the target was already damaged", () => {
    opponents.get("Tyranitar").damageIs(9.6, 11.2)

    cy.get('[data-cy="target-damaged"] input').click({ force: true })

    opponents.get("Tyranitar").damageIs(18.8, 22.5)
    opponents.get("Tyranitar").descriptionContains("120 BP")
  })
})

describe("Hits taken with Rage Fist", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["annihilape"])
  })

  it("Should show the hits taken control", () => {
    cy.get('[data-cy="hits-taken"]').should("exist")
  })

  it("Should raise the base power when three hits were taken", () => {
    opponents.get("Tyranitar").damageIs(9.6, 11.8)

    cy.get('[data-cy="hits-taken"]').find("input").click({ force: true })
    cy.get("mat-option").contains("3").click({ force: true })

    opponents.get("Tyranitar").damageIs(38.7, 46.2)
    opponents.get("Tyranitar").descriptionContains("200 BP")
  })
})

describe("Commander with Dondozo", () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateRightPokemon()
    build.importPokemon(poke["dondozo"])
  })

  it("Should offer the commander button for Dondozo", () => {
    cy.get('[data-cy="commander"]').should("exist")
    cy.get('[data-cy="commander-activated"]').should("not.exist")
  })

  it("Should raise the defenses by two stages when commander is activated", () => {
    build.activateLeftPokemon()

    opponents.get("Dondozo").damageIs(56.1, 66.8)

    build.activateRightPokemon()
    cy.get('[data-cy="commander"]').click({ force: true })

    cy.get('[data-cy="commander-activated"]').should("exist")

    build.activateLeftPokemon()

    opponents.get("Dondozo").damageIs(28.3, 33.6)
  })
})
