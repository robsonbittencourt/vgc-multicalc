import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { Header } from "@page-object/header"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Snackbar } from "@page-object/snackbar"

const field = new Field()
const header = new Header()
const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")
const snackbar = new Snackbar()

const USER_DATA_API = "**/vgc-multi-calc/*"

function parseBody(body: any): any {
  return typeof body === "string" ? JSON.parse(body) : body
}

function buildAndShare(): Cypress.Chainable<any> {
  header.openOneVsOne()
  leftPokemonBuild.importPokemon(poke["ursaluna"])
  rightPokemonBuild.importPokemon(poke["tyranitar"])

  cy.intercept("PUT", USER_DATA_API, { statusCode: 200, body: {} }).as("uploadUserData")

  header.shareCalcs()

  return cy.wait("@uploadUserData").then(interception => parseBody(interception.request.body))
}

function openSharedLink(userData: any) {
  cy.intercept("GET", USER_DATA_API, { statusCode: 200, body: { data: userData } }).as("loadUserData")

  cy.window().then(win => {
    win.history.pushState({}, "", "/data/shared-calc-id")
    win.dispatchEvent(new win.PopStateEvent("popstate", { state: {} }))
  })

  cy.wait("@loadUserData")
}

describe("Uploading the current state", () => {
  it("Should upload the current state and offer the link", () => {
    buildAndShare().then(payload => {
      expect(payload.leftPokemon.name).to.eq("Ursaluna")
      expect(payload.rightPokemon.name).to.eq("Tyranitar")
      expect(payload).to.have.property("teams")
      expect(payload).to.have.property("targets")

      expect(payload).to.have.property("simpleCalcLeftRollLevel")
      expect(payload).to.have.property("multiCalcRollLevel")
      expect(payload).to.have.property("manyVsTeamRollLevel")
    })

    snackbar.messageIs("Your calc link has been created!")

    header.shareLinkIsVisible("/data/")
  })

  it("Should upload the active field along with the calc", () => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])

    field.sun()
    field.trickRoom()
    field.reflectDefender()

    cy.intercept("PUT", USER_DATA_API, { statusCode: 200, body: {} }).as("uploadUserData")

    header.shareCalcs()

    cy.wait("@uploadUserData").then(interception => {
      const payload = parseBody(interception.request.body)

      const sharedField = payload.champions.fields.simple

      expect(sharedField.weather).to.eq("Sun")
      expect(sharedField.isTrickRoom).to.eq(true)
      expect(sharedField.defenderSide.isReflect).to.eq(true)
      expect(sharedField.attackerSide.isReflect).to.eq(false)
    })
  })

  it("Should copy the generated link", () => {
    buildAndShare()

    cy.window().then(win => {
      cy.stub(win.navigator.clipboard, "writeText").as("writeText")
    })

    header.copyShareLink()

    cy.get("@writeText").should("have.been.calledWithMatch", /\/data\//)
  })
})

describe("Open a shared link", () => {
  it("Should rebuild the two sides from the loaded data", () => {
    buildAndShare().then(payload => {
      openSharedLink(payload)

      leftPokemonBuild.nameIs("Ursaluna")
      rightPokemonBuild.nameIs("Tyranitar")
    })
  })

  it("Should keep the local data untouched", () => {
    buildAndShare().then(payload => {
      let localBefore = ""

      cy.window().then(win => {
        localBefore = win.localStorage.getItem("userData")!
      })

      cy.then(() => {
        openSharedLink(payload)
      })

      cy.window().should(win => {
        expect(win.localStorage.getItem("userData")).to.eq(localBefore)
      })
    })
  })

  it("Should ask the crawlers not to index the shared page", () => {
    buildAndShare().then(payload => {
      openSharedLink(payload)

      cy.get('head meta[name="robots"]').should("have.attr", "content", "noindex, follow")
    })
  })
})
