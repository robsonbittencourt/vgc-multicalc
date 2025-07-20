import { Field } from "@page-object/field"
import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"
import { poke } from "../support/e2e"

const team = new Team()
const opponents = new Opponent()
const field = new Field()

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  opponents.deleteAll()
  opponents.importPokemon(poke["default-opponents"])
})

describe("Test calcs with combined damage", () => {
  beforeEach(() => {
    team.delete("Team 1")
    team.importPokepaste(poke["default-team"])
  })

  it("Calculate damage with two Pokémon", () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()
  })

  it("Change second Pokémon in combined damage", () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.importPokemon(poke["tornadus"])

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()

    team.selectTeamMember("Koraidon").disableCombineDamage()
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    opponents.get("Urshifu Rapid Strike").damageIs(402.2, 474.2).causeOHKO()
  })

  it("Create new Pokémon and use it with combined damage", () => {
    team.importPokemon(poke["tornadus"])
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(402.2, 474.2).causeOHKO()
  })

  it("Remove second Pokémon from calculation when it is deleted", () => {
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()
    team.selectTeamMember("Miraidon").delete()

    opponents.get("Urshifu Rapid Strike").damageIs(9.1, 10.8)
  })
})

describe("Test edit in combined damage", () => {
  it("Select a Pokémon to combine damage and repeat the process", () => {
    team.delete("Team 1")
    team.importPokepaste(poke["pokepaste"])

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

describe("Combined Damage with Ruin abilities", () => {
  it("Calculate damage with two Pokémon, one with Tablets of Ruin and another without ability", () => {
    team.importPokemon(poke["wo-chien"])
    team.importPokemon(poke["blaziken"])

    team.selectTeamMember("Wo-Chien").combineDamage()
    team.selectTeamMember("Blaziken")

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1).haveChanceOfToCause3HKO(69.8)
  })

  it("Calculate damage with two Pokémon, one without Tablets of Ruin and with ability", () => {
    team.importPokemon(poke["blaziken"])
    team.importPokemon(poke["wo-chien"])

    team.selectTeamMember("Blaziken").combineDamage()
    team.selectTeamMember("Wo-Chien")

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1).haveChanceOfToCause3HKO(69.8)
  })

  it("Calculate damage with two Pokémon, one with Sword of Ruin and another without ability", () => {
    team.importPokemon(poke["chien-pao"])
    team.importPokemon(poke["blaziken"])

    team.selectTeamMember("Chien-Pao").combineDamage()
    team.selectTeamMember("Blaziken")

    opponents.get("Urshifu Rapid Strike").damageIs(69.7, 82.2).cause2HKO()
  })

  it("Calculate damage with two Pokémon, one without Sword of Ruin and with ability", () => {
    team.importPokemon(poke["blaziken"])
    team.importPokemon(poke["chien-pao"])

    team.selectTeamMember("Blaziken").combineDamage()
    team.selectTeamMember("Chien-Pao")

    opponents.get("Urshifu Rapid Strike").damageIs(69.7, 82.2).cause2HKO()
  })

  it("Calculate damage with two Pokémon, one with Vessel of Ruin and another without ability", () => {
    team.importPokemon(poke["ting-lu"])
    team.importPokemon(poke["tornadus"])

    team.selectTeamMember("Ting-Lu").combineDamage()
    team.selectTeamMember("Tornadus")

    opponents.get("Urshifu Rapid Strike").damageIs(89.7, 106.8).haveChanceOfToCauseOHKO(38.3)
  })

  it("Calculate damage with two Pokémon, one without Vessel of Ruin and with ability", () => {
    team.importPokemon(poke["tornadus"])
    team.importPokemon(poke["ting-lu"])

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Ting-Lu")

    opponents.get("Urshifu Rapid Strike").damageIs(89.7, 106.8).haveChanceOfToCauseOHKO(38.3)
  })

  it("Calculate damage with two Pokémon, one with Beads of Ruin and another without ability", () => {
    team.importPokemon(poke["chi-yu"])
    team.importPokemon(poke["tornadus"])

    team.selectTeamMember("Chi-Yu").combineDamage()
    team.selectTeamMember("Tornadus")

    opponents.get("Urshifu Rapid Strike").damageIs(221.7, 261.7).causeOHKO()
  })

  it("Calculate damage with two Pokémon, one without Beads of Ruin and with ability", () => {
    team.importPokemon(poke["tornadus"])
    team.importPokemon(poke["chi-yu"])

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(221.7, 261.7).causeOHKO()
  })

  it("Calculate damage with two Pokémon, one with Tablets of Ruin and another with Sword of Ruin", () => {
    team.importPokemon(poke["wo-chien"])
    team.importPokemon(poke["chien-pao"])

    team.selectTeamMember("Wo-Chien").combineDamage()
    team.selectTeamMember("Chien-Pao")

    opponents.get("Urshifu Rapid Strike").damageIs(32, 38.2).haveChanceOfToCause3HKO(99.2)
  })

  it("Calculate damage with two Pokémon, one with Vessel of Ruin and another with Beads of Ruin", () => {
    team.importPokemon(poke["ting-lu"])
    team.importPokemon(poke["chi-yu"])

    team.selectTeamMember("Ting-Lu").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(74.8, 89.1).cause2HKO()
  })
})

describe("Combined Damage against reduce damage abilities", () => {
  beforeEach(() => {
    team.delete("Team 1")
  })

  it("two Pokémon against one with Multiscale when Miraidon is faster", () => {
    team.importPokepaste(poke["default-team"])
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Dragonite").damageIs(49.7, 58.6).haveChanceOfToCause2HKO(99.8)
  })

  it("two Pokémon against one with Multiscale when Koraidon is faster", () => {
    team.importPokepaste(poke["default-team"])
    team.selectPokemon("Koraidon").selectAttackThree().selectStatsModifier("spe", "+2")
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Dragonite").damageIs(83.8, 99.4).cause2HKO()
  })

  it("two Pokémon against one with Multiscale when the slower has priority move", () => {
    team.importPokemon(poke["blaziken"])
    team.importPokemon(poke["chi-yu"])
    team.selectTeamMember("Blaziken").combineDamage()
    team.selectTeamMember("Chi-Yu")

    team.selectPokemon("Blaziken").selectAttackThree()

    opponents.get("Dragonite").damageIs(62.2, 74.2).cause2HKO()
  })

  it("two Pokémon against one with Multiscale considering Ability in speed calculation", () => {
    team.importPokemon(poke["tornadus"])
    team.importPokemon(poke["kingdra"])

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Kingdra")

    field.rain()

    opponents.get("Dragonite").damageIs(51.4, 61).cause2HKO()
  })

  it("two Pokémon against one with Tera Shell", () => {
    team.importPokepaste(poke["default-team"])
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Terapagos Terastal").damageIs(42, 50.4).cause3HKO()
  })

  it("two Pokémon against one with Shadow Shield", () => {
    team.importPokepaste(poke["default-team"])
    team.selectPokemon("Koraidon").selectAttackThree()
    team.selectTeamMember("Koraidon").combineDamage()

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Lunala").damageIs(40, 47.5).cause3HKO()
  })
})
