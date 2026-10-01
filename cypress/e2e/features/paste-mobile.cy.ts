import { poke } from "@cy-support/e2e"
import { createdPaste, watchPasteCreation } from "@cy-support/paste-backend"
import { MOBILE_SUITE, goToTeamVsManyMobile } from "@cy-support/setup"
import { BottomNav } from "@page-object/bottom-nav"
import { CreatePaste } from "@page-object/create-paste"
import { HeaderMobile } from "@page-object/header-mobile"
import { PastePage } from "@page-object/paste-page"
import { TeamsWidget } from "@page-object/teams-widget"

const bottomNav = new BottomNav()
const headerMobile = new HeaderMobile()
const teamsWidget = new TeamsWidget()
const createPaste = new CreatePaste()
const pastePage = new PastePage()

const INCINEROAR = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot"

describe("Create a paste from a team on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    watchPasteCreation()
    goToTeamVsManyMobile()
    bottomNav.goTo("Teams")
    teamsWidget.openImportModal().import(poke["pokepaste"])
  })

  it("Should open over the Teams tab and go back to it", () => {
    teamsWidget.exportActiveTeam().textContains("Tatsugiri @ Toxic Orb").back()

    createPaste.isClosed()
    bottomNav.onlyActiveTabIs("Teams")
  })

  it("Should create the paste of the exported team and show it", () => {
    teamsWidget.exportActiveTeam().create()

    createdPaste().its("showdown").should("contain", "Tatsugiri @ Toxic Orb")
    createPaste.openCreatedPaste()

    pastePage.cardsContain("Tatsugiri").cardsContain("Toxic Orb")
  })
})

describe("Create a paste from the menu on mobile", MOBILE_SUITE, () => {
  beforeEach(() => {
    watchPasteCreation()
    goToTeamVsManyMobile()
    headerMobile.openCreatePaste()
  })

  it("Should create a paste and open it in the calc as my team", () => {
    createPaste.isOpen().typeName("Sun Room").typeText(INCINEROAR).create()

    createPaste.openCreatedPaste()

    pastePage.teamNameIs("Sun Room").pokemonAre(["Incineroar"]).openInCalcAsMyTeam()
  })

  it("Should protect the paste with a password", () => {
    createPaste.typeText(INCINEROAR).protectWith("pika").create()

    createPaste.openCreatedPaste()

    pastePage.isLocked().unlock("pika").pokemonAre(["Incineroar"])
  })
})
