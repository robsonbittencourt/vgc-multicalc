import { DamageResult } from "@page-object/damage-result"
import { PokemonBuild } from "@page-object/pokemon-build"

const leftDamageResult = new DamageResult("left-damage-result")

const leftPokemonBuild = new PokemonBuild("left-pokemon")
const rightPokemonBuild = new PokemonBuild("right-pokemon")

let greatTuskHighAtkData: string
let greatTuskHighDefData: string
let flutterManeHighSpaData: string
let flutterManeHighSpdData: string
let flutterManeHighSpeData: string

let ironTreadsHighAtkData: string
let ironTreadsHighDefData: string
let ironMothHighSpaData: string
let ironMothHighSpdData: string
let ironMothHighSpeData: string

let rillaboomData: string
let tornadusData: string
let bronzongData: string

before(() => {
  cy.fixture("great-tusk-high-atk-data").then(data => {
    greatTuskHighAtkData = data
  })
  cy.fixture("great-tusk-high-def-data").then(data => {
    greatTuskHighDefData = data
  })
  cy.fixture("flutter-mane-high-spa-data").then(data => {
    flutterManeHighSpaData = data
  })
  cy.fixture("flutter-mane-high-spd-data").then(data => {
    flutterManeHighSpdData = data
  })
  cy.fixture("flutter-mane-high-spe-data").then(data => {
    flutterManeHighSpeData = data
  })
  cy.fixture("iron-treads-high-atk-data").then(data => {
    ironTreadsHighAtkData = data
  })
  cy.fixture("iron-treads-high-def-data").then(data => {
    ironTreadsHighDefData = data
  })
  cy.fixture("iron-moth-high-spa-data").then(data => {
    ironMothHighSpaData = data
  })
  cy.fixture("iron-moth-high-spd-data").then(data => {
    ironMothHighSpdData = data
  })
  cy.fixture("iron-moth-high-spe-data").then(data => {
    ironMothHighSpeData = data
  })
  cy.fixture("rillaboom-data").then(data => {
    rillaboomData = data
  })
  cy.fixture("tornadus-data").then(data => {
    tornadusData = data
  })
  cy.fixture("bronzong-data").then(data => {
    bronzongData = data
  })
})

describe("Test calcs with Paradox Pokémon and ability activated", () => {
  describe("Prothosynthesis", () => {
    it("with atk as high stat", () => {
      leftPokemonBuild.importPokemon(greatTuskHighAtkData)
      rightPokemonBuild.importPokemon(rillaboomData)

      leftDamageResult.damageIs(0, 44.9, 53.6, 93, 11)

      leftPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 58.4, 69.5, 121, 144)
    })

    it("with def as high stat", () => {
      leftPokemonBuild.importPokemon(rillaboomData)
      rightPokemonBuild.importPokemon(greatTuskHighDefData)

      leftDamageResult.damageIs(0, 83.1, 98.9, 158, 188)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 63.1, 75.7, 120, 144)
    })

    it("with spa as high stat", () => {
      leftPokemonBuild.importPokemon(flutterManeHighSpaData)
      rightPokemonBuild.importPokemon(rillaboomData)

      leftDamageResult.damageIs(0, 28, 33.3, 58, 69)

      leftPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 36.7, 43.4, 76, 90)
    })

    it("with spd as high stat", () => {
      leftPokemonBuild.importPokemon(tornadusData)
      rightPokemonBuild.importPokemon(flutterManeHighSpdData)

      leftDamageResult.damageIs(0, 33, 40, 43, 52)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 26.1, 32.3, 34, 42)
    })

    it("with spe as high stat", () => {
      leftPokemonBuild.importPokemon(bronzongData)
      rightPokemonBuild.importPokemon(flutterManeHighSpeData)

      leftPokemonBuild.selectAttackThree()
      leftDamageResult.damageIs(2, 103, 121.5, 134, 158)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(2, 153.8, 181.5, 200, 236)
    })
  })

  describe("Quark Drive", () => {
    it("with atk as high stat", () => {
      leftPokemonBuild.importPokemon(ironTreadsHighAtkData)
      rightPokemonBuild.importPokemon(rillaboomData)

      leftDamageResult.damageIs(0, 25.1, 29.9, 52, 62)

      leftPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 32.8, 39.1, 68, 81)
    })

    it("with def as high stat", () => {
      leftPokemonBuild.importPokemon(rillaboomData)
      rightPokemonBuild.importPokemon(ironTreadsHighDefData)

      leftDamageResult.damageIs(0, 51.5, 61.8, 85, 102)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 40.6, 47.8, 67, 79)
    })

    it("with spa as high stat", () => {
      leftPokemonBuild.importPokemon(ironMothHighSpaData)
      rightPokemonBuild.importPokemon(rillaboomData)

      leftDamageResult.damageIs(0, 44.4, 53.1, 92, 110)

      leftPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 57.9, 69.5, 120, 144)
    })

    it("with spd as high stat", () => {
      leftPokemonBuild.importPokemon(tornadusData)
      rightPokemonBuild.importPokemon(ironMothHighSpdData)

      leftDamageResult.damageIs(0, 29.6, 35.4, 46, 55)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(0, 23.2, 27.7, 36, 43)
    })

    it("with spe as high stat", () => {
      leftPokemonBuild.importPokemon(bronzongData)
      rightPokemonBuild.importPokemon(ironMothHighSpeData)

      leftPokemonBuild.selectAttackThree()
      leftDamageResult.damageIs(2, 18.7, 22.5, 29, 35)

      rightPokemonBuild.activateBoosterEnergy()

      leftDamageResult.damageIs(2, 28.3, 33.5, 44, 52)
    })
  })
})
