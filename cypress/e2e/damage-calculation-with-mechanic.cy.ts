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
let basculegionData: string
let annihilapeData: string

before(() => {
  cy.fixture("tyranitar-data").then((data) => { tyranitarData = data })
  cy.fixture("rillaboom-data").then((data) => { rillaboomData = data })
  cy.fixture("kyogre-data").then((data) => { kyogreData = data })
  cy.fixture("blaziken-data").then((data) => { blazikenData = data })
  cy.fixture("sneasler-data").then((data) => { sneaslerData = data })
  cy.fixture("bronzong-data").then((data) => { bronzongData = data })
  cy.fixture("porygon2-data").then((data) => { porygon2Data = data })
  cy.fixture("basculegion-data").then((data) => { basculegionData = data })
  cy.fixture("annihilape-data").then((data) => { annihilapeData = data })
})

describe('Test calcs from moves with some mechanic', () => {
  describe('Knock off', () => {
    beforeEach(() => {
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

  describe('Last Respects', () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(basculegionData)
      rightPokemonBuild.importPokemon(rillaboomData)
    })

    it('with 0 ally fainted', () => {
      leftDamageResult.damageIs(0, 33.3, 39.6, 69, 82)
    })

    it('with 1 ally fainted', () => {
      leftPokemonBuild.allieFainted(1)

      leftDamageResult.damageIs(0, 66.6, 78.7, 138, 163)
    })

    it('with 2 allie fainted', () => {
      leftPokemonBuild.allieFainted(2)

      leftDamageResult.damageIs(0, 99, 117.3, 205, 243)
    })

    it('with 3 allie fainted', () => {
      leftPokemonBuild.allieFainted(3)

      leftDamageResult.damageIs(0, 132.3, 156.5, 274, 324)
    })

    it('with 4 allie fainted', () => {
      leftPokemonBuild.allieFainted(4)

      leftDamageResult.damageIs(0, 165.2, 194.6, 342, 403)
    })

    it('with 5 allie fainted', () => {
      leftPokemonBuild.allieFainted(5)

      leftDamageResult.damageIs(0, 198.5, 233.8, 411, 484)
    })

    it('with 6 allie fainted', () => {
      leftPokemonBuild.allieFainted(6)

      leftDamageResult.damageIs(0, 230.9, 272.4, 478, 564)
    })

    it('with 7 allie fainted', () => {
      leftPokemonBuild.allieFainted(7)

      leftDamageResult.damageIs(0, 264.2, 311.5, 547, 645)
    })
  })

  describe('Rage Fist', () => {
    beforeEach(() => {
      leftPokemonBuild.importPokemon(annihilapeData)
      rightPokemonBuild.importPokemon(rillaboomData)
    })

    it('with 0 hit taken', () => {
      leftDamageResult.damageIs(0, 20.7, 25.1, 43, 52)
    })

    it('with 1 hit taken', () => {
      leftPokemonBuild.hitsTaken(1)

      leftDamageResult.damageIs(0, 41, 49.2, 85, 102)
    })

    it('with 2 hits taken', () => {
      leftPokemonBuild.hitsTaken(2)

      leftDamageResult.damageIs(0, 61.3, 72.9, 127, 151)
    })

    it('with 3 hits taken', () => {
      leftPokemonBuild.hitsTaken(3)

      leftDamageResult.damageIs(0, 81.6, 97.1, 169, 201)
    })

    it('with 4 hits taken', () => {
      leftPokemonBuild.hitsTaken(4)

      leftDamageResult.damageIs(0, 101.9, 120.7, 211, 250)
    })

    it('with 5 hits taken', () => {
      leftPokemonBuild.hitsTaken(5)

      leftDamageResult.damageIs(0, 123.1, 144.9, 255, 300)
    })

    it('with 6 hits taken', () => {
      leftPokemonBuild.hitsTaken(6)

      leftDamageResult.damageIs(0, 143.4, 168.5, 297, 349)
    })
  })
})    