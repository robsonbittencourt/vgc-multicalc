import { Field } from "@smogon/calc"
import { DamageResult } from "cypress/page-object/damage-result"
import { PokemonBuild } from "cypress/page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")
const rightDamageResult = new DamageResult("right-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

const field = new Field()

let tyranitarData: string
let rillaboomData: string

before(() => {
  cy.fixture("tyranitar-data").then((data) => { tyranitarData = data })
  cy.fixture("rillaboom-data").then((data) => { rillaboomData = data })
})

describe('Test calcs with moves with secondary effect', () => {
  beforeEach(() => {
    cy.get('[data-cy="one-vs-one"]').click({force: true})
    leftPokemonBuild.importPokemon(tyranitarData)
    rightPokemonBuild.importPokemon(rillaboomData)
  })

  describe('Knock off', () => {
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
})    