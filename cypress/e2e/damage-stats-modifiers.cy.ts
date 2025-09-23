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
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+1")

    opponents.get("Urshifu Rapid Strike").damageIs(288.5, 340).causeOHKO()
    opponents.get("Rillaboom").damageIs(152.7, 180.2).causeOHKO()
  })

  it("Validate the damage Miraidon +2 spa", () => {
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+2")

    opponents.get("Urshifu Rapid Strike").damageIs(385.7, 454.2).causeOHKO()
    opponents.get("Rillaboom").damageIs(204, 240.6).causeOHKO()
  })

  it("Validate the damage Miraidon +3 spa", () => {
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+3")

    opponents.get("Urshifu Rapid Strike").damageIs(480.5, 566.2).causeOHKO()
    opponents.get("Rillaboom").damageIs(254.3, 300).causeOHKO()
  })

  it("Validate the damage Miraidon +4 spa", () => {
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+4")

    opponents.get("Urshifu Rapid Strike").damageIs(577.7, 680.5).causeOHKO()
    opponents.get("Rillaboom").damageIs(306, 359.8).causeOHKO()
  })

  it("Validate the damage Miraidon +5 spa", () => {
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+5")

    opponents.get("Urshifu Rapid Strike").damageIs(673.7, 792.5).causeOHKO()
    opponents.get("Rillaboom").damageIs(356.8, 420.3).causeOHKO()
  })

  it("Validate the damage Miraidon +6 spa", () => {
    team.selectPokemon("Miraidon").selectStatsModifier("spa", "+6")

    opponents.get("Urshifu Rapid Strike").damageIs(770.2, 906.8).causeOHKO()
    opponents.get("Rillaboom").damageIs(408.1, 480.2).causeOHKO()
  })

  it("Validate the damage Koraidon +1 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+1")

    opponents.get("Rillaboom").damageIs(247.7, 292.3).causeOHKO()
    opponents.get("Raging Bolt").damageIs(52.8, 62.3).cause2HKO()
  })

  it("Validate the damage Koraidon +2 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+2")

    opponents.get("Rillaboom").damageIs(330.9, 389.8).causeOHKO()
    opponents.get("Raging Bolt").damageIs(70.5, 83.1).cause2HKO()
  })

  it("Validate the damage Koraidon +3 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+3")

    opponents.get("Rillaboom").damageIs(414.2, 487.3).causeOHKO()
    opponents.get("Raging Bolt").damageIs(88.3, 103.8).haveChanceOfToCauseOHKO(25)
  })

  it("Validate the damage Koraidon +4 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+4")

    opponents.get("Rillaboom").damageIs(496.4, 584.7).causeOHKO()
    opponents.get("Raging Bolt").damageIs(105.6, 124.6).causeOHKO()
  })

  it("Validate the damage Koraidon +5 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+5")

    opponents.get("Rillaboom").damageIs(577.6, 680.2).causeOHKO()
    opponents.get("Raging Bolt").damageIs(122.9, 145).causeOHKO()
  })

  it("Validate the damage Koraidon +6 atk", () => {
    team.selectPokemon("Koraidon").selectStatsModifier("atk", "+6")

    opponents.get("Rillaboom").damageIs(660.9, 777.6).causeOHKO()
    opponents.get("Raging Bolt").damageIs(140.6, 165.8).causeOHKO()
  })
})
