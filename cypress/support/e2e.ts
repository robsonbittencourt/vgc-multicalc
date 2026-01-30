// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "cypress-real-events"
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const poke: Record<string, string> = {}
const pokeNames = [
  "default-team",
  "default-opponents",
  "pokepaste",
  "pokepaste-cts",
  "pokepaste-forms-1",
  "pokepaste-forms-2",
  "pokepaste-forms-3",
  "pokepaste-forms-4",
  "pokepaste-forms-5",
  "pokepaste-forms-6",
  "terapagos",
  "terapagos-stellar",
  "terapagos-terastal",
  "chi-yu",
  "chien-pao",
  "wo-chien",
  "vaporeon",
  "tyranitar",
  "baxcalibur",
  "rillaboom",
  "roaring-moon-high-atk",
  "hatterene",
  "talonflame",
  "bronzong",
  "brute-bonnet-high-def",
  "brute-bonnet-high-spd",
  "dondozo",
  "dragonite",
  "rhyperior",
  "tornadus",
  "ursaluna",
  "great-tusk-high-atk",
  "great-tusk-high-def",
  "flutter-mane",
  "flutter-mane-high-spa",
  "flutter-mane-high-spd",
  "flutter-mane-high-spe",
  "incineroar",
  "iron-treads-high-atk",
  "iron-treads-high-def",
  "iron-moth-high-spa",
  "iron-moth-high-spd",
  "iron-moth-high-spe",
  "iron-thorns-high-atk",
  "iron-thorns-high-def",
  "kyogre",
  "blaziken",
  "sneasler",
  "porygon2",
  "basculegion",
  "annihilape",
  "ting-lu",
  "ting-lu-speed",
  "zacian",
  "zacian-crowned",
  "zamazenta",
  "zamazenta-crowned",
  "farigiraf",
  "ogerpon",
  "ogerpon-cornerstone",
  "ogerpon-hearthflame",
  "ogerpon-wellspring",
  "zangoose",
  "jumpluff",
  "kingdra",
  "excadrill",
  "beartic",
  "raichu-alola",
  "ninetales-alola",
  "groudon",
  "weezing-galar",
  "weezing-galar-misty-surge",
  "indeedee-f",
  "miraidon",
  "politoad",
  "dragapult",
  "urshifu-rapid-strike"
]

before(() => {
  pokeNames.forEach(name => {
    cy.fixture(`${name}-data`).then(data => {
      poke[name] = data as string
    })
  })
})

beforeEach(() => {
  cy.visit("http://localhost:4200/")
})
