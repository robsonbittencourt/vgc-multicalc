import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

let dondozoData: string
let tornadusData: string

before(() => {
  cy.fixture("dondozo-data").then((data) => { dondozoData = data })
  cy.fixture("tornadus-data").then((data) => { tornadusData = data })
})

describe('Test calcs with Dondozo with Tatsugiri Commander', () => {
  it('as attacker', () => {
    leftPokemonBuild.importPokemon(dondozoData)
    rightPokemonBuild.importPokemon(tornadusData)

    leftDamageResult.damageIs(0, 63.8, 75.4, 99, 117)

    leftPokemonBuild.activateCommander()

    leftDamageResult.damageIs(0, 125.8, 149, 195, 231)
  })

  it('as defender', () => {
    leftPokemonBuild.importPokemon(tornadusData)
    rightPokemonBuild.importPokemon(dondozoData)

    leftDamageResult.damageIs(0, 30.5, 36.2, 69, 82)

    rightPokemonBuild.activateCommander()

    leftDamageResult.damageIs(0, 15, 18.5, 34, 42)
  })
})    