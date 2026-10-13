export const SUBMITTED_PASTE_ID = "FakeTeam01"
const SUBMITTED_TOKEN = "fake-delete-token"

type Use = { pasteId: string; uses: number }

export function fakeCommunityTeamsBackend(state: { mostViewed: Use[] } = { mostViewed: [] }) {
  cy.intercept("GET", "/api/teams/index/*", { statusCode: 200, body: [] }).as("teamsIndex")
  cy.intercept("GET", "/api/teams/most-viewed.json", req => req.reply({ statusCode: 200, body: state.mostViewed })).as("mostViewed")
  cy.intercept("POST", "/api/teams", { statusCode: 201, body: { pasteId: SUBMITTED_PASTE_ID, token: SUBMITTED_TOKEN } }).as("submitTeam")
  cy.intercept("DELETE", "/api/teams/*", { statusCode: 204, body: "" }).as("deleteTeam")
  cy.intercept("GET", "/api/events/use.json*", { statusCode: 200, body: {} }).as("useSignal")
  cy.intercept("GET", "/api/pastes/*", { statusCode: 200, body: { kind: "team", version: 1, useSpsMode: true, name: "Fake Paste", showdown: "Incineroar @ Sitrus Berry\nAbility: Intimidate\n- Fake Out" } }).as("paste")

  return state
}

export function submittedTeam(): Cypress.Chainable<any> {
  return cy.wait("@submitTeam").its("request.body")
}

export function deletedTeam(): Cypress.Chainable<any> {
  return cy.wait("@deleteTeam").its("request")
}

export function useSignalsSent(): Cypress.Chainable<string[]> {
  return cy.get("@useSignal.all").then(calls => (calls as unknown as { request: { url: string } }[]).map(call => new URL(call.request.url).searchParams.get("paste") ?? ""))
}
