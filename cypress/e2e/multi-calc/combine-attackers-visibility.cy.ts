import { poke } from "@cy-support/e2e"
import { setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { Header } from "@page-object/header"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { TeamsWidget } from "@page-object/teams-widget"

const header = new Header()
const teamsWidget = new TeamsWidget()
const team = new Team()
const opponents = new Opponent()

function setUpDefaultTeamAndOpponents() {
  header.openTeamVsMany()
  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
  setUpDefaultTeamOnCurrentScreen()
}

function setUpPokepasteTeamAndOpponents() {
  header.openTeamVsMany()
  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
  teamsWidget.delete("Team 1")
  teamsWidget.importPokepaste(poke["pokepaste"])
}

describe("Combine button visibility while a pair is active", () => {
  beforeEach(() => {
    setUpPokepasteTeamAndOpponents()
  })

  it("Should keep the team actions visible on the primary attacker when the second comes earlier in the team order", () => {
    team.selectTeamMember("Chi-Yu")
    team.ctrlSelectTeamMember("Tatsugiri")

    team.primaryTabIs("Chi-Yu")
    team.secondTabIs("Tatsugiri")

    team.selectTeamMember("Chi-Yu")

    team.disableCombineIsVisible()
    team.saveSetIsVisible()
    team.exportIsVisible()
  })

  it("Should keep the team actions visible on the primary attacker when the second comes later in the team order", () => {
    team.selectTeamMember("Tatsugiri")
    team.ctrlSelectTeamMember("Chi-Yu")

    team.primaryTabIs("Tatsugiri")
    team.secondTabIs("Chi-Yu")

    team.selectTeamMember("Tatsugiri")

    team.disableCombineIsVisible()
    team.saveSetIsVisible()
    team.exportIsVisible()
  })

  it("Should hide only the combine button on the second attacker of the pair", () => {
    team.selectTeamMember("Tatsugiri")
    team.ctrlSelectTeamMember("Chi-Yu")

    team.selectTeamMember("Chi-Yu")

    team.combineIsHidden()
    team.saveSetIsVisible()
    team.exportIsVisible()
  })

  it("Should keep the combine button visible when navigating to a Pokémon outside the pair", () => {
    team.selectTeamMember("Tatsugiri")
    team.ctrlSelectTeamMember("Chi-Yu")

    team.selectTeamMember("Dondozo")

    team.combineIsVisible()
    team.noSecondTabExists()
  })
})

describe("Combine button armed state", () => {
  beforeEach(() => {
    setUpPokepasteTeamAndOpponents()
  })

  it("Should not pair a third Pokémon with the clicks that follow the pair creation", () => {
    team.selectTeamMember("Tatsugiri").combineDamage()
    team.selectTeamMember("Dondozo")

    team.primaryTabIs("Tatsugiri")
    team.secondTabIs("Dondozo")

    team.selectTeamMember("Chi-Yu")

    team.primaryTabIs("Chi-Yu")
    team.noSecondTabExists()
    team.combineIsVisible()
  })
})

describe("Combine button on a single Pokémon team", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should not render the combine button when the team has a single Pokémon", () => {
    team.selectTeamMember("Miraidon").delete()

    team.teamSizeIs(1)
    team.combineIsHidden()
    team.exportIsVisible()
  })
})

describe("Deleting a Pokémon of the combined pair", () => {
  beforeEach(() => {
    setUpPokepasteTeamAndOpponents()
  })

  it("Should undo the combine when the primary attacker is deleted", () => {
    team.selectTeamMember("Tatsugiri")
    team.ctrlSelectTeamMember("Chi-Yu")

    team.selectTeamMember("Tatsugiri").delete()

    team.noSecondTabExists()
    team.combineIsVisible()
    opponents.get("Urshifu Rapid Strike").descriptionDoesNotContain("AND")
  })

  it("Should undo the combine when the second attacker is deleted", () => {
    team.selectTeamMember("Tatsugiri")
    team.ctrlSelectTeamMember("Chi-Yu")

    team.selectTeamMember("Chi-Yu").delete()

    team.noSecondTabExists()
    team.combineIsVisible()
    opponents.get("Urshifu Rapid Strike").descriptionDoesNotContain("AND")
  })
})
