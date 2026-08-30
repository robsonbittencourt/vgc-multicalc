import { smoke } from "@cy-support/smoke"
import { poke } from "@cy-support/e2e"
import { setUpDefaultTeamOnCurrentScreen } from "@cy-support/setup"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { Header } from "@page-object/header"
import { TeamsWidget } from "@page-object/teams-widget"

const teamsWidget = new TeamsWidget()
const header = new Header()
const team = new Team()
const opponents = new Opponent()

function setUpDefaultTeamAndOpponents() {
  header.openTeamVsMany()
  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
  setUpDefaultTeamOnCurrentScreen()
}

describe("Combining two attackers", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  smoke("Should mark both tabs, show both sprites and sum the two attacks", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    team.activeTabsAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").descriptionContains("AND")
    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2).causeOHKO()
  })

  it("Should clear the second attacker when the combine is turned off", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2)

    team.selectTeamMember("Koraidon").disableCombineDamage()

    team.activeTabsAre(["Koraidon"])
    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Koraidon"])
    opponents.get("Urshifu Rapid Strike").descriptionDoesNotContain("AND")
  })
})

describe("Second attacker set by Ctrl+Click", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should combine the two attackers without using the Combine Damage button", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    team.ctrlSelectTeamMember("Koraidon")

    team.activeTabsAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2).causeOHKO()
  })

  it("Should reach the same result as the Combine Damage button", () => {
    team.selectPokemon("Koraidon").selectAttackThree()

    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2)

    team.selectTeamMember("Koraidon").disableCombineDamage()

    opponents.get("Urshifu Rapid Strike").descriptionDoesNotContain("AND")

    team.selectTeamMember("Miraidon")
    team.ctrlSelectTeamMember("Koraidon")

    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2).causeOHKO()
  })
})

describe("Second attacker lifecycle", () => {
  beforeEach(() => {
    setUpDefaultTeamAndOpponents()
  })

  it("Should recalculate for the new pair when the second attacker is replaced", () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()
    team.importPokemon(poke["tornadus"])
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Tornadus"])
    opponents.get("Urshifu Rapid Strike").damageIs(620.5, 729.1).causeOHKO()

    team.selectTeamMember("Tornadus").disableCombineDamage()
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")

    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Koraidon"])
    opponents.get("Urshifu Rapid Strike").damageIs(532.5, 626.2).causeOHKO()
  })

  it("Should undo the combine when the second attacker is deleted", () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon")

    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Koraidon"])

    team.selectTeamMember("Miraidon").delete()

    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Koraidon"])
    opponents.get("Urshifu Rapid Strike").damageIs(18.2, 21.7)
  })

  it("Should use a newly imported Pokémon as the second attacker", () => {
    team.importPokemon(poke["tornadus"])

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    team.activeTabsAre(["Miraidon", "Tornadus"])
    opponents.get("Urshifu Rapid Strike").attackerSpritesAre(["Miraidon", "Tornadus"])
    opponents.get("Urshifu Rapid Strike").damageIs(620.5, 729.1).causeOHKO()
  })
})

describe("Second attacker with no ghost pair", () => {
  beforeEach(() => {
    header.openTeamVsMany()
    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
    teamsWidget.delete("Team 1")
    teamsWidget.importPokepaste(poke["pokepaste"])
  })

  it("Should always reflect the current pair when the combine is cycled", () => {
    team.selectPokemon("Tatsugiri")
    team.selectTeamMember("Tatsugiri").combineDamage()
    team.selectTeamMember("Dondozo")

    opponents.get("Urshifu Rapid Strike").damageIs(122.2, 144.5).causeOHKO()

    team.selectTeamMember("Tatsugiri").disableCombineDamage()

    opponents.get("Urshifu Rapid Strike").damageIs(97.7, 115.4).haveChanceOfToCauseOHKO(87.5)

    team.selectTeamMember("Tatsugiri").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(209.7, 246.8).causeOHKO()

    team.selectTeamMember("Tatsugiri").disableCombineDamage()
    team.selectTeamMember("Dondozo").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(104, 122.8).causeOHKO()

    team.selectTeamMember("Dondozo").disableCombineDamage()

    opponents.get("Urshifu Rapid Strike").damageIs(24.5, 29.1).haveChanceOfToCause4HKO(99.9)
  })
})
