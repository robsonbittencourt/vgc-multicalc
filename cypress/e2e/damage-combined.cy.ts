import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

let tornadusData: string
let chienPaoData: string
let woChienData: string
let tingLuData: string
let chiYuData: string
let blazikenData: string
let defaultTeamData: string
let defaultOpponentsData: string
let pokepasteData: string

before(() => {
  cy.fixture("tornadus-data").then(data => (tornadusData = data))
  cy.fixture("chien-pao-data").then(data => (chienPaoData = data))
  cy.fixture("wo-chien-data").then(data => (woChienData = data))
  cy.fixture("ting-lu-data").then(data => (tingLuData = data))
  cy.fixture("chi-yu-data").then(data => (chiYuData = data))
  cy.fixture("blaziken-data").then(data => (blazikenData = data))
  cy.fixture("default-team-data").then(data => (defaultTeamData = data))
  cy.fixture("default-opponents-data").then(data => (defaultOpponentsData = data))
  cy.fixture("pokepaste-data").then(data => (pokepasteData = data))
})

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  opponents.deleteAll()
  opponents.importPokemon(defaultOpponentsData)
})

describe("Test calcs with combined damage", () => {
  beforeEach(() => {
    team.delete("Team 1")
    team.importPokepaste(defaultTeamData)
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

    team.importPokemon(tornadusData)

    team.selectTeamMember("Miraidon")
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Urshifu Rapid Strike").damageIs(305.1, 360.5).causeOHKO()

    team.selectTeamMember("Koraidon").disableCombineDamage()
    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Miraidon")
    opponents.get("Urshifu Rapid Strike").damageIs(402.2, 474.2).causeOHKO()
  })

  it("Create new Pokémon and use it with combined damage", () => {
    team.importPokemon(tornadusData)
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
    team.importPokepaste(pokepasteData)

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
    team.importPokemon(woChienData)
    team.importPokemon(blazikenData)

    team.selectTeamMember("Wo-Chien").combineDamage()
    team.selectTeamMember("Blaziken")

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1).haveChanceOfToCause3HKO(65.3)
  })

  it("Calculate damage with two Pokémon, one without Tablets of Ruin and with ability", () => {
    team.importPokemon(blazikenData)
    team.importPokemon(woChienData)

    team.selectTeamMember("Blaziken").combineDamage()
    team.selectTeamMember("Wo-Chien")

    opponents.get("Urshifu Rapid Strike").damageIs(30.8, 37.1).haveChanceOfToCause3HKO(65.3)
  })

  it("Calculate damage with two Pokémon, one with Sword of Ruin and another without ability", () => {
    team.importPokemon(chienPaoData)
    team.importPokemon(blazikenData)

    team.selectTeamMember("Chien-Pao").combineDamage()
    team.selectTeamMember("Blaziken")

    opponents.get("Urshifu Rapid Strike").damageIs(69.7, 82.2).cause2HKO()
  })

  it("Calculate damage with two Pokémon, one without Sword of Ruin and with ability", () => {
    team.importPokemon(blazikenData)
    team.importPokemon(chienPaoData)

    team.selectTeamMember("Blaziken").combineDamage()
    team.selectTeamMember("Chien-Pao")

    opponents.get("Urshifu Rapid Strike").damageIs(69.7, 82.2).cause2HKO()
  })

  it("Calculate damage with two Pokémon, one with Vessel of Ruin and another without ability", () => {
    team.importPokemon(tingLuData)
    team.importPokemon(tornadusData)

    team.selectTeamMember("Ting-Lu").combineDamage()
    team.selectTeamMember("Tornadus")

    opponents.get("Urshifu Rapid Strike").damageIs(89.7, 106.8).haveChanceOfToCauseOHKO(37.5)
  })

  it("Calculate damage with two Pokémon, one without Vessel of Ruin and with ability", () => {
    team.importPokemon(tornadusData)
    team.importPokemon(tingLuData)

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Ting-Lu")

    opponents.get("Urshifu Rapid Strike").damageIs(89.7, 106.8).haveChanceOfToCauseOHKO(37.5)
  })

  it("Calculate damage with two Pokémon, one with Beads of Ruin and another without ability", () => {
    team.importPokemon(chiYuData)
    team.importPokemon(tornadusData)

    team.selectTeamMember("Chi-Yu").combineDamage()
    team.selectTeamMember("Tornadus")

    opponents.get("Urshifu Rapid Strike").damageIs(221.7, 261.7).causeOHKO()
  })

  it("Calculate damage with two Pokémon, one without Beads of Ruin and with ability", () => {
    team.importPokemon(tornadusData)
    team.importPokemon(chiYuData)

    team.selectTeamMember("Tornadus").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(221.7, 261.7).causeOHKO()
  })

  it("Calculate damage with two Pokémon, one with Tablets of Ruin and another with Sword of Ruin", () => {
    team.importPokemon(woChienData)
    team.importPokemon(chienPaoData)

    team.selectTeamMember("Wo-Chien").combineDamage()
    team.selectTeamMember("Chien-Pao")

    opponents.get("Urshifu Rapid Strike").damageIs(32, 38.2).haveChanceOfToCause3HKO(95.9)
  })

  it("Calculate damage with two Pokémon, one with Vessel of Ruin and another with Beads of Ruin", () => {
    team.importPokemon(tingLuData)
    team.importPokemon(chiYuData)

    team.selectTeamMember("Ting-Lu").combineDamage()
    team.selectTeamMember("Chi-Yu")

    opponents.get("Urshifu Rapid Strike").damageIs(74.8, 89.1).cause2HKO()
  })
})
