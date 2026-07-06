import { poke } from "@cy-support/e2e"
import { DamageResult } from "@page-object/damage-result"
import { Opponent } from "@page-object/opponent"
import { PokemonBuild } from "@page-object/pokemon-build"
import { Team } from "@page-object/team"

const team = new Team()
const opponents = new Opponent()

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

describe("Test calcs with Terastal", () => {
  beforeEach(() => {
    cy.get('[data-cy="team-vs-many"]').click({ force: true })

    team.delete("Team 1")
    team.importPokepaste(poke["default-team"])

    opponents.deleteAll()
    opponents.importPokemon(poke["default-opponents"])
  })

  it("Validate the damage with Koraidon Terastallized using Flame Charge", () => {
    team.selectPokemon("Koraidon").selectAttackThree().terastalyze()

    opponents.get("Urshifu Rapid Strike").damageIs(32.5, 38.2).haveChanceOfToCause3HKO(97.9)
    opponents.get("Calyrex Shadow").damageIs(77.7, 92.5).cause2HKO()
    opponents.get("Ogerpon Wellspring").damageIs(59.3, 70.5).cause2HKO()
    opponents.get("Incineroar").damageIs(25.3, 30.3).cause4HKO()
    opponents.get("Raging Bolt").damageIs(26.4, 31.1).cause4HKO()
    opponents.get("Zamazenta Crowned").damageIs(47.9, 57.2).haveChanceOfToCause2HKO(90.6)
    opponents.get("Calyrex Ice").damageIs(78.2, 92.7).cause2HKO()
    opponents.get("Amoonguss").damageIs(94, 112.3).haveChanceOfToCauseOHKO(62.5)
    opponents.get("Terapagos Terastal").damageIs(22.2, 26.7).possible5HKO()
    opponents.get("Rillaboom").damageIs(124.8, 147.2).causeOHKO()
  })

  it("Validate the damage with Miraidon using Electro Drift in Terastallyzed Ogerpon", () => {
    team.selectPokemon("Miraidon").selectAttackTwo()

    opponents.get("Ogerpon Wellspring").terastalyze()

    opponents.get("Ogerpon Wellspring").damageIs(218.1, 256.6).causeOHKO()
  })
})

describe("Terapagos Terastal calcs", () => {
  beforeEach(() => {
    leftPokemonBuild.importPokemon(poke["terapagos-terastal"])
  })

  it("Validate the damage with Terapagos-Terastal using Terastar Storm in not Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(poke["porygon2"])

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 29.6, 34.8, 57, 67)
  })

  it("Validate the damage with Terapagos-Terastal using Terastar Storm in Terastallyzed Pokemon", () => {
    rightPokemonBuild.importPokemon(poke["porygon2"])
    rightPokemonBuild.terastalyze()

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 29.6, 34.8, 57, 67)
  })

  it("Terapagos-Terastal Terastar Storm is a Normal type attack and should not hit Ghost types", () => {
    rightPokemonBuild.importPokemon(poke["flutter-mane"])

    leftPokemonBuild.selectAttackOne()

    leftDamageResult.damageIs(0, 0, 0, 0, 0)
  })
})
