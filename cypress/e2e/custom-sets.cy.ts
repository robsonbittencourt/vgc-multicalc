import { Header } from "@page-object/header"
import { CustomSet } from "@page-object/custom-set"
import { Team } from "@page-object/team"

const header = new Header()
const customSet = new CustomSet()
const team = new Team()

beforeEach(() => {
  header.selectChampions()
  cy.get('[data-cy="team-vs-many"]').click({ force: true })
  team.delete("Team 1")
})

describe("Custom sets full lifecycle", () => {
  it("Save a set, select it on another slot, update SPs and name, then verify persistence", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()
    customSet.exitEditMode()

    team.add("Aerodactyl")
    team.selectPokemon("Archaludon")
    build.openPokemonTable()

    cy.get('[data-cy^="custom-set-row-"]')
      .first()
      .invoke("attr", "data-cy")
      .then(attr => {
        const setId = attr!.replace("custom-set-row-", "")
        cy.wrap(setId).as("setId")
      })

    cy.get("@setId").then(setId => {
      cy.get(`[data-cy="custom-set-row-${setId}"]`).click({ force: true })
    })

    build.evsIs(10, 0, 0, 0, 0, 15)

    build.openPokemonTable()

    cy.get("@setId").then(setId => {
      customSet.editCustomSet(setId as unknown as string)
    })

    build.clearEvs()
    build.hpEvs(5).atkEvs(10)

    customSet.renameSet("My Archaludon Bulk")
    customSet.setNameInputIs("My Archaludon Bulk")
    customSet.exitEditMode()

    build.openPokemonTable()

    cy.get("@setId").then(setId => {
      customSet.customSetNameIs(setId as unknown as string, "My Archaludon Bulk")
      cy.get(`[data-cy="custom-set-row-${setId}"]`).click({ force: true })
    })

    build.evsIs(5, 10, 0, 0, 0, 0)
  })

  it("Save two sets, duplicate one, delete the other, then verify only two remain", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()

    build.selectPokemon("Archaludon")
    build.clearEvs()
    build.hpEvs(5).atkEvs(10).speedEvs(15)
    customSet.saveSet()

    build.openPokemonTable()

    cy.get('[data-cy^="custom-set-row-"]').should("have.length", 2)

    cy.get('[data-cy^="custom-set-row-"]')
      .eq(0)
      .invoke("attr", "data-cy")
      .then(attr => {
        const setId0 = attr!.replace("custom-set-row-", "")
        cy.get(`[data-cy="duplicate-custom-set-${setId0}"]`).click({ force: true })
      })

    cy.get('[data-cy^="custom-set-row-"]').should("have.length", 3)

    cy.get('[data-cy^="custom-set-row-"]')
      .eq(1)
      .invoke("attr", "data-cy")
      .then(attr => {
        const setId1 = attr!.replace("custom-set-row-", "")
        cy.get(`[data-cy="delete-custom-set-${setId1}"]`).click({ force: true })
      })

    cy.get('[data-cy^="custom-set-row-"]').should("have.length", 2)
  })

  it("Select a set then change Pokémon, verify active set is cleared and save set button is shown", () => {
    const build = team.add("Archaludon")
    build.clearEvs()
    build.hpEvs(10).speedEvs(15)
    customSet.saveSet()

    build.openPokemonTable()

    cy.get('[data-cy^="custom-set-row-"]').first().click({ force: true })

    build.selectPokemon("Aerodactyl")

    customSet.saveSetButtonIsVisible()
    cy.get('[data-cy="update-set-button"]').should("not.exist")
  })
})
