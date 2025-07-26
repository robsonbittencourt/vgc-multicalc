import { poke } from "@cy-support/e2e"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  team.delete("Team 1")
  team.importPokepaste(poke["default-team"])

  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
})

describe("Test calcs with stats modifiers in attacker", () => {
  it("Validate the damage Miraidon +1 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+1")

    opponents.get("Urshifu Rapid Strike").damageIs(443.4, 522.2).causeOHKO()
    opponents.get("Rillaboom").damageIs(44.1, 51.7).haveChanceOfToCause2HKO(14.1)
  })

  it("Validate the damage Miraidon +2 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+2")

    opponents.get("Urshifu Rapid Strike").damageIs(590.8, 697.1).causeOHKO()
    opponents.get("Rillaboom").damageIs(58.8, 69.5).cause2HKO()
  })

  it("Validate the damage Miraidon +3 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+3")

    opponents.get("Urshifu Rapid Strike").damageIs(737.1, 868.5).causeOHKO()
    opponents.get("Rillaboom").damageIs(73, 86.8).cause2HKO()
  })

  it("Validate the damage Miraidon +4 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+4")

    opponents.get("Urshifu Rapid Strike").damageIs(885.7, 1043.4).causeOHKO()
    opponents.get("Rillaboom").damageIs(88.3, 104).haveChanceOfToCauseOHKO(31.3)
  })

  it("Validate the damage Miraidon +5 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+5")

    opponents.get("Urshifu Rapid Strike").damageIs(1033.1, 1217.1).causeOHKO()
    opponents.get("Rillaboom").damageIs(103, 121.3).causeOHKO()
  })
  it("Validate the damage Miraidon +6 spa", () => {
    team.selectPokemon("Miraidon").selectAttackTwo().selectStatsModifier("spa", "+6")

    opponents.get("Urshifu Rapid Strike").damageIs(1182.8, 1392).causeOHKO()
    opponents.get("Rillaboom").damageIs(117.7, 138.5).causeOHKO()
  })

  it("Validate the damage Koraidon +1 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+1")

    opponents.get("Rillaboom").damageIs(124.8, 147.2).causeOHKO()
    opponents.get("Raging Bolt").damageIs(26.4, 31.1).cause4HKO()
  })

  it("Validate the damage Koraidon +2 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+2")

    opponents.get("Rillaboom").damageIs(166.4, 195.9).causeOHKO()
    opponents.get("Raging Bolt").damageIs(35.4, 41.5).cause3HKO()
  })

  it("Validate the damage Koraidon +3 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+3")

    opponents.get("Rillaboom").damageIs(207.1, 243.6).causeOHKO()
    opponents.get("Raging Bolt").damageIs(44.1, 51.9).haveChanceOfToCause2HKO(13.3)
  })

  it("Validate the damage Koraidon +4 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+4")

    opponents.get("Rillaboom").damageIs(247.7, 292.3).causeOHKO()
    opponents.get("Raging Bolt").damageIs(52.8, 62.3).cause2HKO()
  })

  it("Validate the damage Koraidon +5 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+5")

    opponents.get("Rillaboom").damageIs(289.3, 341.1).causeOHKO()
    opponents.get("Raging Bolt").damageIs(61.4, 72.7).cause2HKO()
  })

  it("Validate the damage Koraidon +6 atk", () => {
    team.selectPokemon("Koraidon").selectAttackOne().selectStatsModifier("atk", "+6")

    opponents.get("Rillaboom").damageIs(330.9, 389.8).causeOHKO()
    opponents.get("Raging Bolt").damageIs(70.5, 83.1).cause2HKO()
  })
})
