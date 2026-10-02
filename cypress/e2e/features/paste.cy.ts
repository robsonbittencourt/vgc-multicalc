import { poke } from "@cy-support/e2e"
import { createdPaste, watchPasteCreation } from "@cy-support/paste-backend"
import { CreatePaste } from "@page-object/create-paste"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { PastePage } from "@page-object/paste-page"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const teamsWidget = new TeamsWidget()
const createPaste = new CreatePaste()
const pastePage = new PastePage()
const opponents = new Opponent()

const INCINEROAR = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot"

describe("Create a paste from a team", () => {
  beforeEach(() => {
    watchPasteCreation()
    header.openTeamVsMany()
    teamsWidget.importPokepaste(poke["default-team"])
  })

  it("Should create the paste of the exported team and show it", () => {
    teamsWidget.exportTeam("Team 2").create()

    createdPaste().its("name").should("eq", "Team 2")
    createPaste.openCreatedPaste()

    pastePage.teamNameIs("Team 2").pokemonAre(["Miraidon", "Koraidon"]).cardsContain("Choice Specs").cardsContain("Collision Course")
  })

  it("Should go back to the calc", () => {
    teamsWidget.exportTeam("Team 2").back()

    header.urlIs("/team-vs-many")
    teamsWidget.activeTeamNameIs("Team 2")
  })
})

describe("Create a paste from Showdown text", () => {
  beforeEach(() => {
    watchPasteCreation()
    header.openCreatePaste()
  })

  it("Should create a paste with a name and open it in the calc as my team", () => {
    createPaste.isOpen().createIsDisabled().typeName("Sun Room").typeText(INCINEROAR).create()

    createdPaste().its("showdown").should("contain", "EVs: 32 HP / 2 Def / 32 SpD")
    createPaste.openCreatedPaste()

    pastePage.teamNameIs("Sun Room").pokemonAre(["Incineroar"]).cardsContain("Fake Out").openInCalcAsMyTeam()
    teamsWidget.activeTeamNameIs("Sun Room")
  })

  it("Should create an open team sheet without the spreads", () => {
    createPaste.typeText(INCINEROAR).hideSpreads().create()

    createdPaste().its("showdown").should("not.contain", "EVs:")
    createPaste.openCreatedPaste()

    pastePage.pokemonAre(["Incineroar"]).cardsContain("Careful").cardsDoNotContain("32 HP")
  })

  it("Should read EVs when the EV unit is selected", () => {
    createPaste.useEvs().typeText(INCINEROAR.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 252 SpD")).create()

    createdPaste().should(body => {
      expect(body.useSpsMode).to.eq(false)
      expect(body.showdown).to.contain("EVs: 252 HP / 12 Def / 252 SpD")
    })
  })

  it("Should protect the paste with a password", () => {
    createPaste.typeText(INCINEROAR).protectWith("pik").passwordHintIsVisible().createIsDisabled().typePassword("a").create()

    createdPaste().should(body => {
      expect(body.protected).to.eq(true)
      expect(JSON.stringify(body)).not.to.contain("Incineroar")
    })
    createPaste.openCreatedPaste()

    pastePage.isLocked().unlock("nope").unlockErrorIs("Wrong password.").unlock("pika").pokemonAre(["Incineroar"])
  })

  it("Should tell when the text has more than 6 Pokémon", () => {
    createPaste.typeText(Array.from({ length: 7 }, () => INCINEROAR).join("\n\n")).create()

    createPaste.errorIs("A paste has at most 6 Pokémon.")
  })

  it("Should tell when a Pokémon is unknown", () => {
    createPaste.typeText("Missingno @ Leftovers\n- Tackle").create()

    createPaste.errorIs("Unknown Pokémon: Missingno. Check the names.")
  })

  it("Should copy the Showdown text", () => {
    createPaste.typeText(INCINEROAR).copyButtonIs("Copy").copy().copyButtonIs("Copied")
  })
})

describe("Open a paste", () => {
  it("Should tell when the paste does not exist", () => {
    pastePage.visit("AAAAAAAAAA").isNotFound()
  })
})

describe("Open a paste in the calc as opponents", () => {
  beforeEach(() => {
    watchPasteCreation()
    header.openCreatePaste()
  })

  it("Should filter the opponents by the team with its own EVs without adding it to the teams", () => {
    createPaste.typeName("Sun Room").useEvs().typeText(INCINEROAR.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 244 SpD")).create()
    createPaste.openCreatedPaste().pokemonAre(["Incineroar"]).openInCalcAsOpponents()

    opponents.teamFilterIs("Sun Room")
    opponents.exists("Incineroar")
    opponents.defaultSpsNoticeIsHidden()
    teamsWidget.teamBoxDoesNotExist("Sun Room")

    opponents.selectDefender("Incineroar").spsIs(252, 0, 12, 0, 244, 0)
  })

  it("Should load the SPs of the default moveset when the team has no spreads", () => {
    createPaste.typeName("Sun Room").typeText(INCINEROAR).hideSpreads().create()
    createPaste.openCreatedPaste().cardsDoNotContain("32 HP").openInCalcAsOpponents()

    opponents.teamFilterIs("Sun Room")
    opponents.defaultSpsNoticeIs("Spreads missing: default SPs loaded")

    const incineroar = opponents.selectDefender("Incineroar")
    incineroar.natureIs("Careful")
    incineroar.itemIs("Sitrus Berry")
    incineroar.spsIs(252, 0, 28, 0, 236, 0)

    opponents.defaultSpsNoticeIs("Spreads missing: default EVs loaded")
  })

  it("Should keep the team available in the filter until the page is reloaded", () => {
    createPaste.typeName("Sun Room").typeText(INCINEROAR).create()
    createPaste.openCreatedPaste().openInCalcAsOpponents()

    opponents.clearTeamFilter()
    opponents.filterByTeam("Sun Room")
    opponents.exists("Incineroar")

    cy.reload()

    opponents.teamFilterDoesNotOffer("Sun Room")
    teamsWidget.teamBoxDoesNotExist("Sun Room")
  })
})
