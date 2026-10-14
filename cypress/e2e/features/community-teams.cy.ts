import { deletedTeam, fakeCommunityTeamsBackend, SUBMITTED_PASTE_ID, submittedTeam, useSignalsSent } from "@cy-support/community-teams-backend"
import { CommunityTeams } from "@page-object/community-teams"
import { Header } from "@page-object/header"
import { Snackbar } from "@page-object/snackbar"

const header = new Header()
const teams = new CommunityTeams()
const snackbar = new Snackbar()

const RAIN = "Pelipper @ Damp Rock\nAbility: Drizzle\nEVs: 2 HP / 32 SpA\nModest Nature\n- Hurricane\n\nArchaludon\nAbility: Stamina\n- Electro Shot"

describe("Community teams list", () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    header.openTeams()
  })

  it("Should list the teams in the compact view and show them with cards in the detailed view", () => {
    teams.compactRowsExist().pageStatusShowsTeams().useDetailedView().detailedTeamsHaveCards()
  })

  it("Should keep only the teams of the chosen source", () => {
    teams.filterBySource("vgcpastes").compactRowsExist().everyOriginIs("VGCPastes")
    teams.filterBySource("community").emptyResultIsShown()
  })

  it("Should keep the filters in the link and load them when the link is opened", () => {
    teams.filterBySource("vgcpastes").linkHasFilter("source", "vgcpastes")

    cy.reload()

    teams.sourceIs("vgcpastes").everyOriginIs("VGCPastes")
    teams.filterBySource("all").linkHasNoFilter("source")
  })

  it("Should ignore the values of a link that the list does not know", () => {
    teams.visitWithFilters("source=smogon&creator=Rain").sourceIs("all").creatorFilterIs("Rain").linkHasNoFilter("source")
  })

  it("Should start the side lists empty when nothing was submitted or used", () => {
    teams.recentTeamsAreEmpty().mostViewedIsEmpty()
  })

  it("Should send one use signal per team per day", () => {
    teams.firstPasteId().then(pasteId => {
      teams.openFirstRow().backToTeams().openFirstRow()

      useSignalsSent().should("deep.equal", [pasteId])
    })
  })
})

describe("Most viewed teams", () => {
  it("Should show the most used teams of the week", () => {
    const state = fakeCommunityTeamsBackend()
    header.openTeams()

    teams.firstPasteId().then(pasteId => {
      state.mostViewed = [{ pasteId, uses: 5 }]
      cy.reload()

      teams.mostViewedHasTeams(1)
    })
  })
})

describe("Submit a community team", () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    header.openTeams()
    teams.openSubmit()
  })

  it("Should send the team and show it in the list filtered by the creator", () => {
    teams.fillTeam({ name: "Rain Archaludon", player: "Eric Rios", handle: "@Eric_Rios", event: "Recife Regional 2027", placement: "Top 8", replicaCode: "a4rb rnn9ye" }).typeShowdown(RAIN).submit()

    submittedTeam().then(body => {
      expect(body).to.include({ name: "Rain Archaludon", player: "Eric Rios", handle: "Eric_Rios", event: "Recife Regional 2027", placement: "Top 8", replicaCode: "A4RBRNN9YE" })
      expect(body.showdown).to.contain("Archaludon @ (none)").and.contain("Pelipper @ Damp Rock")
    })

    snackbar.messageIs("Team submitted")
    teams.listIsShown().sourceIs("community").creatorFilterIs("Eric Rios").firstRowCreatorIs("Eric Rios").everyOriginIs("Community").recentTeamsContain("Rain Archaludon")
  })

  it("Should not send a team without the creator", () => {
    teams.fillTeam({ name: "Rain Archaludon" }).typeShowdown(RAIN).submit().submitErrorIs("Add the creator.")

    cy.get("@submitTeam.all").should("have.length", 0)
  })

  it("Should not send a placement the list cannot rank", () => {
    teams.fillTeam({ name: "Rain Archaludon", player: "Eric Rios", placement: "First" }).typeShowdown(RAIN).submit().submitErrorIs("Use a placement like Champion, 2nd, Top 8 or 5th.")

    cy.get("@submitTeam.all").should("have.length", 0)
  })
})

describe("Remove a submitted team", () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    header.openTeams()
    teams.openSubmit().fillTeam({ name: "Rain Archaludon", player: "Eric Rios" }).typeShowdown(RAIN).submit()
    teams.listIsShown().firstRowCreatorIs("Eric Rios")
  })

  it("Should remove the team after the confirmation next to the button", () => {
    teams.askToDeleteFirstTeam().confirmDelete()

    deletedTeam().then(request => {
      expect(request.url).to.contain(`/api/teams/${SUBMITTED_PASTE_ID}`)
      expect(request.headers["x-team-token"]).to.eq("fake-delete-token")
    })
    snackbar.messageIs("Team removed")
    teams.emptyResultIsShown().recentTeamsAreEmpty()
  })

  it("Should keep the team when the removal is canceled", () => {
    teams.askToDeleteFirstTeam().cancelDelete().firstRowCreatorIs("Eric Rios")

    cy.get("@deleteTeam.all").should("have.length", 0)
  })
})
