import { DamageResult } from "cypress/page-object/damage-result"
import { Field } from "cypress/page-object/field"
import { PokemonBuild } from "cypress/page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

const field = new Field()

let ursalunaData: string
let tyranitarData: string
let baxcaliburData: string
let rillaboomData: string

before(() => {
  cy.fixture("ursaluna-data").then((data) => { ursalunaData = data })
  cy.fixture("tyranitar-data").then((data) => { tyranitarData = data })
  cy.fixture("baxcalibur-data").then((data) => { baxcaliburData = data })
  cy.fixture("rillaboom-data").then((data) => { rillaboomData = data })
})

describe('Test calcs with One vs One activated', () => {
  beforeEach(() => {
    cy.get('[data-cy="one-vs-one"]').click({force: true})
    leftPokemonBuild.importPokemon(ursalunaData)
    rightPokemonBuild.importPokemon(tyranitarData)
  })

  describe('Ursaluna vs Tyranitar', () => {
    it('First attack', () => {
      leftDamageResult.damageIs(0, 117.2, 139.7, 218, 260)
      rightDamageResult.isFainted()
  
      rightDamageResult.damageIs(0, 31.3, 36.8, 69, 81)
      leftDamageResult.surviveWithThisHpAmmount(139)
    })

    it('Second attack', () => {
      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.selectAttackTwo()

      leftDamageResult.damageIs(1, 12.3, 14.5, 23, 27)
      rightDamageResult.surviveWithThisHpAmmount(159)

      rightDamageResult.damageIs(1, 31.3, 37.2, 69, 82)
      leftDamageResult.surviveWithThisHpAmmount(138)
    })

    it('Third attack', () => {
      leftPokemonBuild.selectAttackThree()
      rightPokemonBuild.selectAttackThree()

      leftDamageResult.damageIs(2, 17.2, 20.4, 32, 38)
      rightDamageResult.surviveWithThisHpAmmount(148)

      rightDamageResult.damageIs(2, 62.7, 74.5, 138, 164)
      leftDamageResult.surviveWithThisHpAmmount(56)
    })

    it('Fourth attack', () => {
      leftPokemonBuild.selectAttackFour()
      rightPokemonBuild.selectAttackFour()

      leftDamageResult.damageIs(3, 0, 0, 0, 0)
      rightDamageResult.surviveWithThisHpAmmount(186)

      rightDamageResult.damageIs(3, 61.3, 72.2, 135, 159)
      leftDamageResult.surviveWithThisHpAmmount(61)
    })
  })

  describe('Roll variation', () => {
    it('with High roll', () => {
      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.selectAttackTwo()

      leftDamageResult.withHighRoll()
      rightDamageResult.withHighRoll()

      rightDamageResult.surviveWithThisHpAmmount(159)
      leftDamageResult.surviveWithThisHpAmmount(138)
    })

    it('with Medium roll', () => {
      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.selectAttackTwo()

      leftDamageResult.withMediumRoll()
      rightDamageResult.withMediumRoll()

      rightDamageResult.surviveWithThisHpAmmount(161)
      leftDamageResult.surviveWithThisHpAmmount(145)
    })

    it('with Low roll', () => {
      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.selectAttackTwo()

      leftDamageResult.withLowRoll()
      rightDamageResult.withLowRoll()

      rightDamageResult.surviveWithThisHpAmmount(163)
      leftDamageResult.surviveWithThisHpAmmount(151)
    })
  })

  describe('With some field influence', () => {
    it('with critical hit', () => {
      field.criticalHit()

      leftPokemonBuild.selectAttackTwo()
      rightPokemonBuild.selectAttackTwo()

      leftDamageResult.damageIs(1, 18.2, 22, 34, 41)
      rightDamageResult.surviveWithThisHpAmmount(145)
  
      rightDamageResult.damageIs(1, 47.2, 55.9, 104, 123)
      leftDamageResult.surviveWithThisHpAmmount(97)
    })    
  })

  describe('Hp bar appearance', () => {
    it ('Item icon should appear', () => {
      leftDamageResult.withPokemonIcon('flame-orb')
      rightDamageResult.withPokemonIcon('choice-band')

      leftPokemonBuild.selectItem("Choice Band")
      rightPokemonBuild.selectItem("Flame Orb")

      leftDamageResult.withPokemonIcon('choice-band')
      rightDamageResult.withPokemonIcon('flame-orb')
    })

    it ('Hp value should be ok by each Pokémon', () => {
      leftDamageResult.withMaxHpValue(220)
      rightDamageResult.withMaxHpValue(186)

      leftPokemonBuild.importPokemon(baxcaliburData)
      rightPokemonBuild.importPokemon(rillaboomData)

      leftDamageResult.withMaxHpValue(190)
      rightDamageResult.withMaxHpValue(207)
    })
  })

})
