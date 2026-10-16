import { deletedTeam, fakeCommunityTeamsBackend, SUBMITTED_PASTE_ID, submittedTeam, useSignalsSent } from "@cy-support/community-teams-backend"
import { goToMobile, MOBILE_SUITE } from "@cy-support/setup"
import { CommunityTeams } from "@page-object/community-teams"
import { HeaderMobile } from "@page-object/header-mobile"
import { Snackbar } from "@page-object/snackbar"

const headerMobile = new HeaderMobile()
const teams = new CommunityTeams()
const snackbar = new Snackbar()

const RAIN = [
  "Pelipper @ Damp Rock\nAbility: Drizzle\nEVs: 2 HP / 32 SpA\nModest Nature\n- Hurricane\n- Weather Ball\n- Tailwind\n- Protect",
  "Archaludon\nAbility: Stamina\nModest Nature\n- Electro Shot\n- Draco Meteor\n- Flash Cannon\n- Protect",
  "Incineroar @ Sitrus Berry\nAbility: Intimidate\nCareful Nature\n- Fake Out\n- Darkest Lariat\n- Flare Blitz\n- Parting Shot",
  "Rillaboom @ Miracle Seed\nAbility: Grassy Surge\nAdamant Nature\n- Wood Hammer\n- Fake Out\n- U-turn\n- Grassy Glide",
  "Primarina @ Leftovers\nAbility: Liquid Voice\nModest Nature\n- Hyper Voice\n- Protect\n- Calm Mind\n- Moonblast",
  "Farigiraf @ Colbur Berry\nAbility: Armor Tail\nCalm Nature\n- Trick Room\n- Protect\n- Psychic\n- Helping Hand"
].join("\n\n")

function openTeams() {
  goToMobile("Teams")
  cy.location("pathname").should("eq", "/teams")
}

describe("Community teams list on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    openTeams()
  })

  it("Should show 10 teams as cards and 10 more on each Show more", () => {
    teams.mobileStatusShowsTeams().mobileCardsAre(10).showMore().mobileCardsAre(20)
  })

  it("Should search the teams and show the empty result when nothing matches", () => {
    teams.searchMobile("zzzz no team zzzz").emptyResultIsShown().clearMobileSearch().mobileCardsAre(10)
  })

  it("Should keep the search in the link and load the creator of a desktop link into it", () => {
    teams.searchMobile("louisville").linkHasFilter("q", "louisville")
    teams.visitWithFilters("creator=Rain").mobileSearchIs("Rain").linkHasFilter("q", "Rain").linkHasNoFilter("creator")
  })

  it("Should open a team and come back to the list, sending one use signal", () => {
    teams.openFirstMobileCard().backToMobileList().openFirstMobileCard().backToMobileList()

    useSignalsSent().should("have.length", 1)
  })
})

describe("Community teams filters on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    openTeams()
  })

  it("Should filter by source in the sheet and count the active filters", () => {
    teams.openFiltersSheet().pageScrollIsLocked().filterBySource("vgcpastes").applyFilters()

    teams.filtersSheetIsClosed().pageScrollIsFree().filtersButtonIs("Filters (1)").mobileCardsExist().everyMobileOriginIs("VGCPastes")
  })

  it("Should clear the filters", () => {
    teams.openFiltersSheet().filterBySource("community").emptyResultIsShown().clearAllFilters().applyFilters()

    teams.filtersButtonIs("Filters").mobileCardsAre(10)
  })

  it("Should close only the sheet on back", () => {
    teams.openFiltersSheet()
    headerMobile.androidBack()

    teams.filtersSheetIsClosed().pageScrollIsFree().mobileListIsShown()
    cy.location("pathname").should("eq", "/teams")
  })
})

describe("Submit and remove a community team on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    fakeCommunityTeamsBackend()
    openTeams()
    teams.openSubmit().fillTeam({ name: "Rain Archaludon", player: "Eric Rios", handle: "Eric_Rios" }).typeShowdown(RAIN).submit()
  })

  it("Should send the team and show it in the list searched by the creator", () => {
    submittedTeam().its("player").should("eq", "Eric Rios")
    snackbar.messageIs("Team submitted")

    teams.mobileListIsShown().mobileSearchIs("Eric Rios").firstMobileCardCreatorIs("Eric Rios").everyMobileOriginIs("Community")
  })

  it("Should remove the team after the confirmation in the card", () => {
    teams.mobileListIsShown().askToDeleteFirstTeam().confirmDelete()

    deletedTeam().its("url").should("contain", `/api/teams/${SUBMITTED_PASTE_ID}`)
    snackbar.messageIs("Team removed")
    teams.emptyResultIsShown()
  })
})
