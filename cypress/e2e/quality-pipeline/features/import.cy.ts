import { poke } from "@cy-support/e2e"
import { ALL_FEATURES_ENABLED } from "@cy-support/setup"
import { ImportModal } from "@page-object/import-modal"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Snackbar } from "@page-object/snackbar"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"
import { Header } from "@page-object/header"

const header = new Header()
const team = new Team()
const teamsWidget = new TeamsWidget()
const build = new PokemonBuild("your-team")
const opponents = new Opponent()
const modal = new ImportModal()
const snackbar = new Snackbar()

const MIRAIDON_WITH_INVALID_MOVE = "Miraidon @ Choice Specs\nAbility: Hadron Engine\nLevel: 50\nEVs: 4 HP / 252 SpA / 252 Spe\nTimid Nature\n- Draco Meteor\n- Splashzzz"
const FARFETCHD_ONLY = "Farfetch'd @ Leek\nAbility: Defiant\nLevel: 50\nEVs: 4 HP / 252 Atk / 252 Spe\nAdamant Nature\n- Brave Bird"
const FARFETCHD_WITH_TYRANITAR = "Farfetch'd @ Leek\nAbility: Defiant\nLevel: 50\nEVs: 4 HP / 252 Atk\nAdamant Nature\n- Brave Bird\n\nTyranitar @ Assault Vest\nAbility: Sand Stream\nLevel: 50\nEVs: 4 HP / 252 Atk\nAdamant Nature\n- Rock Slide"
const MIRAIDON_SMALL_SPREAD = "Miraidon @ Choice Specs\nAbility: Hadron Engine\nLevel: 50\nEVs: 4 HP / 20 SpA\nTimid Nature\n- Draco Meteor"

function openTeamImport() {
  teamsWidget.openImportModal()
}

describe("A Pokémon and a team", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should replace the Pokémon on edit and show the snackbar", () => {
    team.selectPokemon("Charizard")

    build.importPokemon(poke["chi-yu"])

    build.nameIs("Chi-Yu")
    build.abilityIs("Beads of Ruin")
    build.attackIs(1, "Overheat")
    snackbar.messageIs("Pokémon imported")
  })

  it("Should fill the team with the name of the paste and activate it", () => {
    teamsWidget.importPokepaste(poke["default-team"])

    teamsWidget.activeTeamNameIs("Team 2")
    team.teamSizeIs(2)
    team.tabIsActive("Miraidon")
    build.nameIs("Miraidon")
  })

  it("Should add the cards when the opponents are imported", () => {
    opponents.deleteAll()
    opponents.empty()

    opponents.importPokemon(poke["chi-yu"])

    opponents.exists("Chi-Yu")
  })
})

describe("Validation", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    openTeamImport()
  })

  it("Should disable the Import button while the textarea is empty", () => {
    modal.confirmIsDisabled()

    modal.typePaste("Miraidon")

    modal.confirmIsEnabled()
  })

  it("Should keep the modal open showing the error when the paste is invalid", () => {
    modal.typePaste("this is not a Pokémon at all")

    modal.confirm()

    modal.errorIs("Could not import the Pokémon")
    modal.isOpen()
  })

  it("Should show the invalid SPs error", () => {
    modal.typePaste("Miraidon @ Choice Specs\nAbility: Hadron Engine\nLevel: 50\nEVs: 999 HP / 999 Atk\nTimid Nature\n- Draco Meteor")
    modal.useSpMode()

    modal.confirm()

    modal.errorIs("Invalid SPs")
    modal.isOpen()
  })

  it("Should remove the moves that are invalid for the current mode informing by the snackbar", () => {
    modal.typePaste(MIRAIDON_WITH_INVALID_MOVE)
    modal.useEvMode()

    modal.confirm()

    snackbar.messageIs("Some moves were invalid for the current mode and removed")
    team.tabIsActive("Miraidon")
    build.attackIs(1, "Draco Meteor")
    build.attackIs(2, "")
  })
})

describe("Validation of the Pokémon available for the current mode", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("announcementBypass", "true")
        win.localStorage.setItem("featureFlags", JSON.stringify({ ...ALL_FEATURES_ENABLED, allowAllPokes: false }))
      }
    })

    header.openTeamVsMany()
    openTeamImport()
  })

  it("Should remove the Pokémon that is invalid for the current mode keeping the valid one", () => {
    modal.typePaste(FARFETCHD_WITH_TYRANITAR)
    modal.useEvMode()

    modal.confirm()

    snackbar.messageIs("1 Pokémon was invalid for the current mode and removed")
    team.teamSizeIs(1)
    team.tabIsActive("Tyranitar")
  })

  it("Should not change anything when every Pokémon is invalid for the current mode", () => {
    modal.typePaste(FARFETCHD_ONLY)
    modal.useEvMode()

    modal.confirm()

    snackbar.messageIs("No valid Pokémon for the current mode")
    team.teamSizeIs(4)
    team.tabIsActive("Charizard")
  })
})

describe("The add tab afterwards", () => {
  beforeEach(() => {
    header.openTeamVsMany()
  })

  it("Should keep the add tab when the paste has less than 6 Pokémon", () => {
    teamsWidget.importPokepaste(poke["pokepaste-forms-4"])

    teamsWidget.selectTeam("Team 2")

    team.addPokemonAvailable()
  })

  it("Should hide the add tab when the paste has 6 Pokémon", () => {
    teamsWidget.importPokepaste(poke["pokepaste"])

    teamsWidget.selectTeam("Team 2")

    team.addPokemonUnavailable()
  })

  it("Should complete the team when a single Pokémon is imported over five", () => {
    teamsWidget.importPokepaste(poke["pokepaste-forms-5"])
    teamsWidget.selectTeam("Team 2")

    team.clickOnAdd()
    team.importPokemon(poke["chi-yu"])

    team.addPokemonUnavailable()
    team.selectPokemon("Chi-Yu")
  })
})

describe("Best move by target afterwards", () => {
  it("Should reactivate the best move of every target when a new opponent is imported", () => {
    header.openManyVsTeam()
    opponents.deleteAll()
    opponents.importPokemon(poke["tyranitar"])

    opponents.get("Tyranitar").descriptionContains("Stone Edge")

    opponents.selectAttacker("Tyranitar").selectAttackFour()

    opponents.get("Tyranitar").descriptionContains("Knock Off")

    opponents.importPokemon(poke["flutter-mane"])

    opponents.get("Tyranitar").descriptionContains("Stone Edge")
    opponents.get("Flutter Mane").descriptionContains("Power Gem")
  })
})

describe("SP toggle of the modal", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    team.selectPokemon("Charizard")
  })

  it("Should read the same paste as EVs or as SPs", () => {
    build.importPokemon(MIRAIDON_SMALL_SPREAD, false)

    build.evsIs(28, 0, 0, 156, 0, 0)

    build.importPokemon(MIRAIDON_SMALL_SPREAD, true)

    build.evsIs(4, 0, 0, 20, 0, 0)
  })
})
