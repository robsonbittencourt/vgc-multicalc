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

function idOf(url: string): string {
  return url.split("/").pop()!
}

function parseBody(body: any): any {
  return typeof body === "string" ? JSON.parse(body) : body
}

const storage = new Map<string, any>()

function fakeUserDataStorage() {
  cy.intercept("PUT", USER_DATA_API, req => {
    storage.set(idOf(req.url), parseBody(req.body))
    req.reply({ statusCode: 200, body: {} })
  }).as("uploadUserData")

  cy.intercept("GET", USER_DATA_API, req => {
    const id = idOf(req.url)

    if (!storage.has(id)) {
      req.reply({ statusCode: 404, body: {} })
      return
    }

    req.reply({ statusCode: 200, body: storage.get(id) })
  }).as("loadUserData")
}

function buildAndShare(): Cypress.Chainable<any> {
  header.openOneVsOne()
  leftPokemonBuild.importPokemon(poke["ursaluna"])
  rightPokemonBuild.importPokemon(poke["tyranitar"])

  header.shareCalcs()

  return cy.wait("@uploadUserData").then(() => cy.get('[data-cy="user-data-link"]').invoke("attr", "href"))
}

function openSharedLink(sharedLink: string) {
  fakeUserDataStorage()

  cy.visit(`http://localhost:4200${new URL(sharedLink).pathname}`, {
    onBeforeLoad(win) {
      win.localStorage.setItem("announcementBypass", "true")
    }
  })

  cy.wait("@loadUserData").then(interception => {
    expect(interception.response?.statusCode).to.eq(200)
  })
}

describe("Uploading the current state", () => {
  beforeEach(() => {
    fakeUserDataStorage()
  })

  it("Should upload the current state and offer the link", () => {
    header.openOneVsOne()
    leftPokemonBuild.importPokemon(poke["ursaluna"])
    rightPokemonBuild.importPokemon(poke["tyranitar"])

    header.shareCalcs()

    cy.wait("@uploadUserData").then(interception => {
      const payload = parseBody(interception.request.body)

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

    header.shareCalcs()

    cy.wait("@uploadUserData").then(interception => {
      const payload = parseBody(interception.request.body)

      const sharedField = payload.fields.simple

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
  beforeEach(() => {
    fakeUserDataStorage()
  })

  it("Should rebuild the two sides from the loaded data", () => {
    buildAndShare().then(sharedLink => {
      leftPokemonBuild.importPokemon(poke["rillaboom"])
      rightPokemonBuild.importPokemon(poke["incineroar"])

      leftPokemonBuild.nameIs("Rillaboom")
      rightPokemonBuild.nameIs("Incineroar")

      openSharedLink(sharedLink)

      leftPokemonBuild.nameIs("Ursaluna")
      rightPokemonBuild.nameIs("Tyranitar")
    })
  })

  it("Should keep the local data untouched", () => {
    buildAndShare().then(sharedLink => {
      let localBefore = ""

      cy.window().then(win => {
        localBefore = win.localStorage.getItem("userData")!
      })

      cy.then(() => {
        openSharedLink(sharedLink)
      })

      cy.window().should(win => {
        expect(win.localStorage.getItem("userData")).to.eq(localBefore)
      })
    })
  })

  it("Should ask the crawlers not to index the shared page", () => {
    buildAndShare().then(sharedLink => {
      openSharedLink(sharedLink)

      cy.get('head meta[name="robots"]').should("have.attr", "content", "noindex, follow")
    })
  })
})
