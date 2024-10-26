import { DamageResult } from "cypress/page-object/damage-result"
import { PokemonBuild } from "cypress/page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

let tyranitarData: string
let rillaboomData: string
let kyogreData: string
let blazikenData: string
let sneaslerData: string
let bronzongData: string
let porygon2Data: string

before(() => {
  cy.fixture("tyranitar-data").then((data) => { tyranitarData = data })
  cy.fixture("rillaboom-data").then((data) => { rillaboomData = data })
  cy.fixture("kyogre-data").then((data) => { kyogreData = data })
  cy.fixture("blaziken-data").then((data) => { blazikenData = data })
  cy.fixture("sneasler-data").then((data) => { sneaslerData = data })
  cy.fixture("bronzong-data").then((data) => { bronzongData = data })
  cy.fixture("porygon2-data").then((data) => { porygon2Data = data })
})

describe('Test calcs from moves with some mechanic', () => {
  describe('Knock off', () => {
    beforeEach(() => {
      cy.get('[data-cy="one-vs-one"]').click({force: true})
      leftPokemonBuild.importPokemon(tyranitarData)
      rightPokemonBuild.importPokemon(rillaboomData)
    })

    it('with item', () => {
      leftPokemonBuild.selectAttackFour()
      
      leftDamageResult.damageIs(3, 72.9, 85.9, 151, 178)
      rightDamageResult.surviveWithThisHpAmmount(29)
    })

    it('without item', () => {
      rightPokemonBuild.selectItem("(none)")
      leftPokemonBuild.selectAttackFour()
      
      leftDamageResult.damageIs(3, 49.2, 57.9, 102, 120)
      rightDamageResult.surviveWithThisHpAmmount(87)
    })
  })

  describe('Unburden', () => {
    beforeEach(() => {
      cy.get('[data-cy="one-vs-one"]').click({force: true})
      leftPokemonBuild.importPokemon(bronzongData)
      rightPokemonBuild.importPokemon(sneaslerData)
    })

    it('without Unburden actived', () => {
      leftPokemonBuild.selectAttackThree()

      leftDamageResult.damageIs(2, 44.2, 52.5, 69, 82)
      rightDamageResult.surviveWithThisHpAmmount(74)
    })

    it('with Unburden actived', () => {
      rightPokemonBuild.activateAbility()
      leftPokemonBuild.selectAttackThree()

      leftDamageResult.damageIs(2, 73.7, 87.1, 115, 136)
      rightDamageResult.surviveWithThisHpAmmount(20)
    })
  })

  describe  ('Analytic', () => {
    beforeEach(() => {
      cy.get('[data-cy="one-vs-one"]').click({force: true})
      leftPokemonBuild.importPokemon(porygon2Data)
      rightPokemonBuild.importPokemon(sneaslerData)
    })

    it('without Analytic actived', () => {
      leftDamageResult.damageIs(0, 42.9, 50.6, 67, 79)
      rightDamageResult.surviveWithThisHpAmmount(77)
    })

    it('with Analytic actived', () => {
      leftPokemonBuild.activateAbility()

      leftDamageResult.damageIs(0, 55.1, 65.3, 86, 102)
      rightDamageResult.surviveWithThisHpAmmount(54)
    })
  })

  describe('Water Spout', () => {
    beforeEach(() => {
      cy.get('[data-cy="one-vs-one"]').click({force: true})
      leftPokemonBuild.importPokemon(kyogreData)
      rightPokemonBuild.importPokemon(tyranitarData)
    })

    it('with 100% hp', () => {
      leftPokemonBuild.hpPercentage(100)
      
      leftDamageResult.damageIs(0, 110.7, 132.2, 206, 246)
      rightDamageResult.isFainted()
    })

    it('with 75% hp', () => {
      leftPokemonBuild.hpPercentage(75)
      
      leftDamageResult.damageIs(0, 81.7, 97.8, 152, 182)
      rightDamageResult.surviveWithThisHpAmmount(4)
    })

    it('with 10% hp', () => {
      leftPokemonBuild.hpPercentage(10)
      
      leftDamageResult.damageIs(0, 10.7, 13.9, 20, 26)
      rightDamageResult.surviveWithThisHpAmmount(160)
    })
  })

  describe('Blaze', () => {
    beforeEach(() => {
      cy.get('[data-cy="one-vs-one"]').click({force: true})
      leftPokemonBuild.importPokemon(blazikenData)
      rightPokemonBuild.importPokemon(tyranitarData)
    })

    it('with 100% hp', () => {
      leftPokemonBuild.hpPercentage(100)
      
      leftDamageResult.damageIs(0, 26.3, 31.1, 49, 58)
      rightDamageResult.surviveWithThisHpAmmount(128)
    })

    it('with 34% hp', () => {
      leftPokemonBuild.hpPercentage(34)
      
      leftDamageResult.damageIs(0, 26.3, 31.1, 49, 58)
      rightDamageResult.surviveWithThisHpAmmount(128)
    })

    it('with 33% hp', () => {
      leftPokemonBuild.hpPercentage(33)
      
      leftDamageResult.damageIs(0, 39.2, 46.7, 73, 87)
      rightDamageResult.surviveWithThisHpAmmount(99)
    })

    it('with 1% hp', () => {
      leftPokemonBuild.hpPercentage(1)
      
      leftDamageResult.damageIs(0, 39.2, 46.7, 73, 87)
      rightDamageResult.surviveWithThisHpAmmount(99)
    })
  })
})    