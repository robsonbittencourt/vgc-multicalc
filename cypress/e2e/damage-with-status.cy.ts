import { Opponent } from "@page-object/opponent"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

let bronzongData: string
let ursalunaData: string
let zangooseData: string
let flutterManeData: string
let defaultTeamData: string
let defaultOpponentsData: string

before(() => {
  cy.fixture("bronzong-data").then(data => {
    bronzongData = data
  })
  cy.fixture("ursaluna-data").then(data => {
    ursalunaData = data
  })
  cy.fixture("zangoose-data").then(data => {
    zangooseData = data
  })
  cy.fixture("flutter-mane-data").then(data => {
    flutterManeData = data
  })
  cy.fixture("default-team-data").then(data => {
    defaultTeamData = data
  })
  cy.fixture("default-opponents-data").then(data => {
    defaultOpponentsData = data
  })
})

beforeEach(() => {
  cy.get('[data-cy="team-vs-many"]').click({ force: true })

  team.delete("Team 1")
  team.importPokepaste(defaultTeamData)

  opponents.deleteAll()
  opponents.importPokemon(defaultOpponentsData)
})

describe("Test calcs with status", () => {
  it("Validate the damage with Koraidon burned", () => {
    team.selectPokemon("Koraidon").selectAttackOne()
    opponents.get("Rillaboom").damageIs(83.2, 98.4).cause2HKO()

    team.selectPokemon("Koraidon").burned()

    opponents.get("Rillaboom").damageIs(41.6, 49.2).cause3HKO()
  })

  it("Validate the damage using Gyro Ball against paralyzed Pokémon", () => {
    team.importPokemon(bronzongData)
    team.selectPokemon("Bronzong").selectAttackThree()

    opponents.get("Calyrex Shadow").damageIs(37.7, 44.5).cause3HKO()

    opponents.selectDefender("Calyrex Shadow").paralyzed()

    opponents.get("Calyrex Shadow").damageIs(18.8, 22.8).possible5HKO()
  })

  it("Validate the damage using burned Guts Ursaluna with Facade", () => {
    const ursaluna = team.importPokemon(ursalunaData)
    team.selectPokemon("Ursaluna").selectAttackThree()

    opponents.get("Urshifu Rapid Strike").damageIs(40, 48).cause3HKO()

    ursaluna.burned()

    opponents.get("Urshifu Rapid Strike").damageIs(118.8, 140.5).causeOHKO()
  })

  it("Validate the damage using burned Guts Ursaluna with Headlong Rush", () => {
    const ursaluna = team.importPokemon(ursalunaData)
    team.selectPokemon("Ursaluna")

    opponents.get("Urshifu Rapid Strike").damageIs(67.4, 80.5).cause2HKO()

    ursaluna.burned()

    opponents.get("Urshifu Rapid Strike").damageIs(101.7, 120.5).causeOHKO()
  })

  it("Validate the damage using poisoned Toxic Boost Zangoose with Facade", () => {
    const zangoose = team.importPokemon(zangooseData)
    team.selectPokemon("Zangoose")

    opponents.get("Urshifu Rapid Strike").damageIs(31.4, 37.7).haveChanceOfToCause3HKO(85.4)

    zangoose.poisoned()

    opponents.get("Urshifu Rapid Strike").damageIs(94.2, 111.4).haveChanceOfToCauseOHKO(68.8)
  })

  it("Validate the damage using poisoned Toxic Boost Zangoose with Quick Attack", () => {
    const zangoose = team.importPokemon(zangooseData).selectAttackThree()
    team.selectPokemon("Zangoose").selectAttackThree()
    opponents.get("Urshifu Rapid Strike").damageIs(18.8, 22.2).possible5HKO()

    zangoose.poisoned()

    opponents.get("Urshifu Rapid Strike").damageIs(27.4, 32.5).cause4HKO()
  })

  it("Validate the damage using Hex against poisoned Pokémon", () => {
    team.importPokemon(flutterManeData)
    team.selectPokemon("Flutter Mane").selectAttackFour()
    opponents.get("Calyrex Shadow").damageIs(178.2, 212.5).causeOHKO()

    opponents.selectDefender("Calyrex Shadow").poisoned()

    opponents.get("Calyrex Shadow").damageIs(356.5, 420.5).causeOHKO()
  })
})
