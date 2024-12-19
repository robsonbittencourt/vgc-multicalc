import { DamageResult } from "@page-object/damage-result"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

let defaultTeamData: string
let defaultOpponentsData: string
let terapagosStellarData: string
let terapagosTerastalData: string
let tornadusData: string
let flutterManeData: string
let porygon2Data: string

before(() => {
  cy.fixture("default-team-data").then(data => {
    defaultTeamData = data
  })
  cy.fixture("default-opponents-data").then(data => {
    defaultOpponentsData = data
  })
  cy.fixture("terapagos-stellar-data").then(data => {
    terapagosStellarData = data
  })
  cy.fixture("terapagos-terastal-data").then(data => {
    terapagosTerastalData = data
  })
  cy.fixture("tornadus-data").then(data => {
    tornadusData = data
  })
  cy.fixture("flutter-mane-data").then(data => {
    flutterManeData = data
  })
  cy.fixture("porygon2-data").then(data => {
    porygon2Data = data
  })
})

describe("Test calcs with Terastal", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })

    team.delete("Team 1")
    team.importPokepaste(defaultTeamData)

    opponents.deleteAll()
    opponents.importPokemon(defaultOpponentsData)
  })

  it("Validate the damage with Koraidon Terastallized using Flame Charge", () => {
    team.selectPokemon("Koraidon").selectAttackThree().terastalyze()

    opponents.get("Urshifu Rapid Strike").damageIs(16.5, 19.4).possible6HKO()
    opponents.get("Calyrex Shadow").damageIs(39.4, 46.8).cause3HKO()
    opponents.get("Ogerpon Wellspring").damageIs(30.4, 35.8).haveChanceOfToCause3HKO(38.1)
    opponents.get("Incineroar").possible7HKO()
    opponents.get("Raging Bolt").damageIs(12.9, 15.5).possible7HKO()
    opponents.get("Zamazenta Crowned").damageIs(25, 29.1).cause4HKO()
    opponents.get("Calyrex Ice").damageIs(40.5, 47.3).cause3HKO()
    opponents.get("Amoonguss").damageIs(47.4, 57.5).haveChanceOfToCause2HKO(85.9)
    opponents.get("Terapagos Terastal").damageIs(10.8, 13.3)
    opponents.get("Rillaboom").damageIs(61.9, 74.1).cause2HKO()
  })

  it("Validate the damage with Miraidon using Electro Drift in Terastallyzed Ogerpon", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Ogerpon Wellspring").terastalyze()

    opponents.get("Ogerpon Wellspring").damageIs(126.2, 148.6).causeOHKO()
  })
})

describe("Terapagos Terastal calcs", () => {
  beforeEach(() => {
    cy.get('[data-cy="one-vs-one"]').click({ force: true })
    leftPokemonBuild.importPokemon(terapagosTerastalData)
  })

  it("Validate the damage with Terapagos-Terastal using Terastar Storm in not Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(porygon2Data)

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 29.6, 34.8, 57, 67)
  })

  it("Validate the damage with Terapagos-Terastal using Terastar Storm in Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(porygon2Data)
    rightPokemonBuild.terastalyze()

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 29.6, 34.8, 57, 67)
  })

  it("Terapagos-Terastal Terastar Storm is a Normal type attack and should not hit Ghost types", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 0, 0, 0, 0)
  })

  it("Validate the damage with Terapagos-Terastal using Tera Blast in not Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(porygon2Data)

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 19.2, 23.4, 37, 45)
  })

  it("Validate the damage with Terapagos-Terastal using Tera Blast in Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(porygon2Data)
    rightPokemonBuild.terastalyze()

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 19.2, 23.4, 37, 45)
  })

  it("Terapagos-Terastal Tera Blast is a Normal type attack and should not hit Ghost types", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 0, 0, 0, 0)
  })

  it("Validate the damage with Terapagos-Terastal using Earth Power", () => {
    rightPokemonBuild.importPokemon(porygon2Data)

    leftPokemonBuild.selectAttackThree()

    leftDamageResult.damageIs(2, 14.5, 17.7, 28, 34)
  })

  it("Validate the damage with Terapagos-Terastal using Hyper Beam", () => {
    rightPokemonBuild.importPokemon(porygon2Data)

    leftPokemonBuild.selectAttackFour()

    leftDamageResult.damageIs(3, 36.4, 43.7, 70, 84)
  })
})

describe("Terapagos Stellar calcs", () => {
  beforeEach(() => {
    cy.get('[data-cy="one-vs-one"]').click({ force: true })
    leftPokemonBuild.importPokemon(terapagosStellarData)
  })

  it("Validate the damage with Terapagos-Stellar using Terastar Storm in not Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(tornadusData)

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 70.9, 84.5, 110, 131)
  })

  it("Validate the damage with Terapagos-Stellar using Terastar Storm in Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(tornadusData)
    rightPokemonBuild.terastalyze()

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 141.9, 169, 220, 262)
  })

  it("Terapagos-Stellar Terastar Storm is a Stellar type attack and should hit Ghost types", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 44.9, 53.1, 71, 84)
  })

  it("Validate the damage with Terapagos-Stellar using Tera Blast in not Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(tornadusData)

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 80, 94.1, 124, 146)
  })

  it("Validate the damage with Terapagos-Stellar using Tera Blast in Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(tornadusData)
    rightPokemonBuild.terastalyze()

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 160, 188.3, 248, 292)
  })

  it("Terapagos-Stellar Tera Blast is a Stellar type attack and should hit Ghost types", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackTwo()

    leftDamageResult.damageIs(1, 50.6, 60.1, 80, 95)
  })

  it("Validate the damage with Terapagos-Stellar using Earth Power", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackThree()

    leftDamageResult.damageIs(2, 45.5, 53.7, 72, 85)
  })

  it("Terapagos-Stellar Hyper Beam is a Normal type attack and should not hit Ghost types", () => {
    rightPokemonBuild.importPokemon(flutterManeData)

    leftPokemonBuild.selectAttackFour()

    leftDamageResult.damageIs(3, 0, 0, 0, 0)
  })
})
