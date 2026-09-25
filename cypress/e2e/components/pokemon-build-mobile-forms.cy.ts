import { poke } from "@cy-support/e2e"
import { MOBILE_SUITE, goToSimpleCalcMobile } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { PokemonBuildMobile } from "@page-object/pokemon-build-mobile"

const build = new PokemonBuildMobile()
const opponents = new Opponent()

describe("Aegislash form toggle", MOBILE_SUITE, () => {
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

describe("Palafin form toggle", MOBILE_SUITE, () => {
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

describe("Morpeko form toggle", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Morpeko")
  })

  it("Should offer the form toggle for Morpeko", () => {
    cy.get('[data-cy="morpeko-form-toggle"]').should("exist")
  })

  it("Should toggle between the Full Belly and the Hangry mode", () => {
    build.nameIs("Morpeko")

    cy.get('[data-cy="morpeko-form-toggle"]').click({ force: true })

    build.nameIs("Morpeko-Hangry")

    cy.get('[data-cy="morpeko-form-toggle"]').click({ force: true })

    build.nameIs("Morpeko")
  })

  it("Should not offer the toggle of another Pokémon", () => {
    cy.get('[data-cy="aegislash-form-toggle"]').should("not.exist")
  })
})

describe("Aura Wheel with Morpeko", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["morpeko"])
  })

  it("Should change the type of Aura Wheel when the form is toggled", () => {
    opponents.get("Tyranitar").damageIs(37.6, 45.1)

    cy.get('[data-cy="morpeko-form-toggle"]').click({ force: true })

    build.nameIs("Morpeko-Hangry")

    opponents.get("Tyranitar").damageIs(18.8, 22.5)
  })
})

describe("Allies fainted with Last Respects", MOBILE_SUITE, () => {
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

describe("Last move failed with Stomping Tantrum", MOBILE_SUITE, () => {
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

describe("Last move failed with Temper Flare", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["blaziken"])
    build.editMoves()
    build.searchMove("Temper Flare")
    build.selectMoveFromTable("Temper Flare")
    build.closeMoves()
    build.activateMoveChip(1)
  })

  it("Should show the last move failed control", () => {
    cy.get('[data-cy="last-move-failed"]').should("exist")
  })
})

describe("Target already moved with Payback", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.importPokemon(poke["ting-lu"])
    build.activateMoveChip(3)
  })

  it("Should show the target already moved control", () => {
    cy.get('[data-cy="target-already-moved"]').should("exist")
  })

  it("Should double the base power only when the target already moved", () => {
    opponents.get("Tyranitar").damageIs(9.6, 11.2)
    opponents.get("Tyranitar").descriptionContains("Payback (50 BP)")

    cy.get('[data-cy="target-already-moved"] input').click({ force: true })

    opponents.get("Tyranitar").damageIs(18.8, 22.5)
    opponents.get("Tyranitar").descriptionContains("100 BP")
  })
})

describe("Target already moved with Bolt Beak", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Dracozolt")
    build.editMoves()
    build.searchMove("Bolt Beak")
    build.selectMoveFromTable("Bolt Beak")
    build.closeMoves()
    build.activateMoveChip(1)
  })

  it("Should show the target already moved control", () => {
    cy.get('[data-cy="target-already-moved"]').should("exist")
  })
})

describe("Damaged by target with Revenge", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Bewear")
    build.editMoves()
    build.searchMove("Revenge")
    build.selectMoveFromTable("Revenge")
    build.closeMoves()
    build.activateMoveChip(1)
  })

  it("Should show the damaged by target control", () => {
    cy.get('[data-cy="damaged-by-target"]').should("exist")
  })

  it("Should double the base power when the target already damaged the attacker", () => {
    opponents.get("Tyranitar").damageIs(98.9, 118.2)

    cy.get('[data-cy="damaged-by-target"] input').click({ force: true })

    opponents.get("Tyranitar").damageIs(200, 234.4)
    opponents.get("Tyranitar").descriptionContains("Revenge (120 BP)")
  })
})

describe("Ally Pledge with a Pledge", MOBILE_SUITE, () => {
  beforeEach(() => {
    goToSimpleCalcMobile()
    build.activateRightPokemon()
    build.importPokemon(poke["tyranitar"])
    build.activateLeftPokemon()
    build.selectPokemonFromTable("Mew")
    build.editMoves()
    build.searchMove("Fire Pledge")
    build.selectMoveFromTable("Fire Pledge")
    build.closeMoves()
    build.activateMoveChip(1)
  })

  it("Should show the ally Pledge control", () => {
    cy.get('[data-cy="ally-pledge"]').should("exist")
  })

  it("Should combine the Pledge with the one declared as used by the ally", () => {
    opponents.get("Tyranitar").damageIs(5.3, 6.4)

    cy.get('[data-cy="ally-pledge-Water"] button').click({ force: true })

    opponents.get("Tyranitar").damageIs(62.3, 74.1)
    opponents.get("Tyranitar").descriptionContains("150 BP Water")
  })
})

describe("Target damaged with Assurance", MOBILE_SUITE, () => {
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

describe("Hits taken with Rage Fist", MOBILE_SUITE, () => {
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

describe("Commander with Dondozo", MOBILE_SUITE, () => {
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
