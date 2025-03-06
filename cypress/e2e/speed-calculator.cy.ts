import { Field } from "@page-object/field"
import { SpeedCalculator } from "@page-object/speed-calculator"
import { Team } from "@page-object/team"

const team = new Team()
const field = new Field()
const speedCalculator = new SpeedCalculator()

let palafinData: string
let tyranitarData: string
let sneaslerData: string
let jumpluffData: string
let kingdraData: string
let excadrillData: string
let bearticData: string
let raichuAlolaData: string

describe("Speed Calculator", () => {
  before(() => {
    cy.fixture("palafin-hero-data").then(data => {
      palafinData = data
    })
    cy.fixture("tyranitar-data").then(data => {
      tyranitarData = data
    })
    cy.fixture("sneasler-data").then(data => {
      sneaslerData = data
    })
    cy.fixture("jumpluff-data").then(data => {
      jumpluffData = data
    })
    cy.fixture("kingdra-data").then(data => {
      kingdraData = data
    })
    cy.fixture("excadrill-data").then(data => {
      excadrillData = data
    })
    cy.fixture("beartic-data").then(data => {
      bearticData = data
    })
    cy.fixture("raichu-alola-data").then(data => {
      raichuAlolaData = data
    })
  })

  beforeEach(() => {
    cy.get('[data-cy="speed-calculator"]').click({ force: true })
  })

  context("Validate all Speed Tier", () => {
    it("show the Pokémon sorted by speed in ascending order", () => {
      team.importPokemon(palafinData)
      cy.wait(300)

      cy.get('[data-cy="speed-box"]').should("have.length", 57)
      cy.get('[data-cy="speed-box"]').each(($el, index) => {
        const speedBoxValues = palafinSpeedTier[index]
        speedCalculator.speedTierIs(index, speedBoxValues.pokemon, speedBoxValues.speed, speedBoxValues.description)
      })
    })
  })

  context("Validate opponent options", () => {
    it("increment speed modifier of opponent Pokémon", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.speedModifier("+2")
      cy.wait(300)

      speedCalculator.speedTierIs(14, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(56, "Incineroar", 162, "11% Usage")
    })

    it("decrement speed modifier of opponent Pokémon", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.speedModifier("-2")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Zamazenta-Crowned", 84, "24% Usage")
      speedCalculator.speedTierIs(46, "Regieleki", 138, "Max23% Usage")
    })

    it("decrement speed of opponent Pokémon with Ice Wind", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Mienshao", 83, "Min")
      speedCalculator.speedTierIs(56, "Iron Crown", 110, "Max51% UsageBooster")
    })

    it("decrement speed of opponent Pokémon with Paralyzis", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Zamazenta-Crowned", 84, "24% Usage")
      speedCalculator.speedTierIs(53, "Flutter Mane", 153, "Booster")
    })

    it("increment speed of opponent Pokémon with Choice Scarf", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Ting-Lu", 65, "35% Usage")
      speedCalculator.speedTierIs(56, "Iron Crown", 118, "Min")
    })

    it("activate all opponent options at the same time", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      speedCalculator.paralyzed()
      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Rillaboom", 75, "Scarf")
      speedCalculator.speedTierIs(36, "Regieleki", 138, "Scarf")
    })
  })

  context("Validate Pokémon variations", () => {
    it("change the speed tier when nature changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectNature("Jolly")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Grimmsnarl", 81, "11% Usage")
      speedCalculator.speedTierIs(28, "Tyranitar", 108, "Actual")
      speedCalculator.speedTierIs(56, "Iron Treads", 126, "Min")
    })

    it("change the speed tier when speed ev changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.speedEvs(156)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Ursaluna-Bloodmoon", 72, "20% Usage")
      speedCalculator.speedTierIs(28, "Tyranitar", 101, "Actual")
      speedCalculator.speedTierIs(56, "Volcarona", 121, "16% Usage")
    })

    it("change the speed tier when speed iv changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.speedIvs(15)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Grimmsnarl", 58, "Min")
      speedCalculator.speedTierIs(28, "Tyranitar", 91, "Actual")
      speedCalculator.speedTierIs(56, "Groudon", 112, "17% Usage")
    })

    it("change the speed tier when Pokémon is paralyzed", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(18, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(28, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(56, "Incineroar", 80, "30% Usage")
    })

    it("change the speed tier when Pokémon has Choice Scarf", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Choice Scarf")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Iron Leaves", 124, "Min")
      speedCalculator.speedTierIs(28, "Tyranitar", 148, "Actual")
      speedCalculator.speedTierIs(56, "Ditto", 165, "Scarf")
    })

    it("change the speed tier when Pokémon has Iron Ball", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Iron Ball")
      cy.wait(300)

      speedCalculator.speedTierIs(18, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(28, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(56, "Incineroar", 80, "30% Usage")
    })

    it("change the speed tier when Pokémon has activated Unburden", () => {
      const pokemon = team.importPokemon(sneaslerData)

      pokemon.selectAbility("Unburden")
      pokemon.activateAbility()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Flutter Mane", 188, "12% Usage")
      speedCalculator.speedTierIs(28, "Sneasler", 378, "Actual")
    })
  })

  describe("Field influence", () => {
    it("change the speed tier when Attacker Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindAttacker()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Landorus", 168, "Max34% Usage")
      speedCalculator.speedTierIs(28, "Tyranitar", 198, "Actual")
      speedCalculator.speedTierIs(53, "Flutter Mane", 307, "Booster")
    })

    it("change the speed tier when Defender Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindDefender()
      cy.wait(300)

      speedCalculator.speedTierIs(14, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(28, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(56, "Incineroar", 162, "11% Usage")
    })

    it("change the speed tier when Trick Room was activated", () => {
      team.importPokemon(tyranitarData)

      field.trickRoom()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Groudon", 119, "11% Usage")
      speedCalculator.speedTierIs(28, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(56, "Ting-Lu", 66, "29% Usage")
    })

    it("double speed when Pokémon has Chlorophyll and Sun was activated", () => {
      team.importPokemon(jumpluffData)

      field.sun()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Jumpluff", 356, "ActualMax69% Usage")
    })

    it("double speed when Pokémon has Swift Swim and Rain was activated", () => {
      team.importPokemon(kingdraData)

      field.rain()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Kingdra", 274, "Actual")
    })

    it("double speed when Pokémon has Sand Rush and Sun was activated", () => {
      team.importPokemon(excadrillData)

      field.sand()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Excadrill", 280, "Actual")
    })

    it("double speed when Pokémon has Slush Rush and Snow was activated", () => {
      team.importPokemon(bearticData)

      field.snow()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Beartic", 204, "Actual")
    })

    it("double speed when Pokémon has Surge Surfer and Electric Terrain was activated", () => {
      team.importPokemon(raichuAlolaData)

      field.eletricTerrain()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Raichu-Alola", 260, "Actual")
    })
  })
})

const palafinSpeedTier = [
  { pokemon: "Ditto", speed: 100, description: "11% Usage" },
  { pokemon: "Dragonite", speed: 100, description: "Min23% Usage" },
  { pokemon: "Gastrodon", speed: 100, description: "Max" },
  { pokemon: "Chandelure", speed: 100, description: "Min" },
  { pokemon: "Regidrago", speed: 100, description: "Min" },
  { pokemon: "Dragonite", speed: 101, description: "21% Usage" },
  { pokemon: "Tatsugiri", speed: 102, description: "Min" },
  { pokemon: "Chandelure", speed: 103, description: "25% Usage" },
  { pokemon: "Rillaboom", speed: 105, description: "Min12% Usage" },
  { pokemon: "Terapagos-Terastal", speed: 105, description: "Min" },
  { pokemon: "Indeedee-F", speed: 105, description: "Min55% Usage" },
  { pokemon: "Rillaboom", speed: 106, description: "15% Usage" },
  { pokemon: "Ting-Lu", speed: 106, description: "Max" },
  { pokemon: "Kyogre", speed: 110, description: "Min" },
  { pokemon: "Ditto", speed: 110, description: "Max55% Usage" },
  { pokemon: "Groudon", speed: 110, description: "Min11% Usage" },
  { pokemon: "Gouging Fire", speed: 111, description: "Min" },
  { pokemon: "Calyrex-Ice", speed: 112, description: "Max" },
  { pokemon: "Iron Hands", speed: 112, description: "Max" },
  { pokemon: "Groudon", speed: 112, description: "17% Usage" },
  { pokemon: "Ursaluna", speed: 112, description: "Max" },
  { pokemon: "Ursaluna-Bloodmoon", speed: 114, description: "Max" },
  { pokemon: "Rillaboom", speed: 115, description: "12% Usage" },
  { pokemon: "Urshifu-Rapid-Strike", speed: 117, description: "Min" },
  { pokemon: "Urshifu", speed: 117, description: "Min" },
  { pokemon: "Pelipper", speed: 117, description: "31% Usage" },
  { pokemon: "Iron Crown", speed: 118, description: "Min" },
  { pokemon: "Groudon", speed: 119, description: "11% Usage" },
  { pokemon: "Palafin-Hero", speed: 120, description: "Actual" },
  { pokemon: "Chi-Yu", speed: 120, description: "Min" },
  { pokemon: "Entei", speed: 120, description: "Min" },
  { pokemon: "Volcarona", speed: 120, description: "Min16% Usage" },
  { pokemon: "Landorus", speed: 121, description: "Min" },
  { pokemon: "Volcarona", speed: 121, description: "16% Usage" },
  { pokemon: "Incineroar", speed: 123, description: "Max" },
  { pokemon: "Farigiraf", speed: 123, description: "Max" },
  { pokemon: "Weezing-Galar", speed: 123, description: "Max" },
  { pokemon: "Grimmsnarl", speed: 123, description: "Max" },
  { pokemon: "Tsareena", speed: 124, description: "15% Usage" },
  { pokemon: "Iron Leaves", speed: 124, description: "Min" },
  { pokemon: "Mienshao", speed: 125, description: "Min" },
  { pokemon: "Iron Treads", speed: 126, description: "Min" },
  { pokemon: "Raging Bolt", speed: 127, description: "14% UsageBooster" },
  { pokemon: "Pelipper", speed: 128, description: "Max12% Usage" },
  { pokemon: "Tsareena", speed: 129, description: "28% Usage" },
  { pokemon: "Regidrago", speed: 129, description: "19% Usage" },
  { pokemon: "Ogerpon-Hearthflame", speed: 130, description: "Min" },
  { pokemon: "Ogerpon-Cornerstone", speed: 130, description: "Min" },
  { pokemon: "Jumpluff", speed: 130, description: "Min" },
  { pokemon: "Ogerpon-Wellspring", speed: 130, description: "Min" },
  { pokemon: "Ogerpon", speed: 130, description: "Min" },
  { pokemon: "Tornadus", speed: 131, description: "Min14% Usage" },
  { pokemon: "Scream Tail", speed: 131, description: "Min" },
  { pokemon: "Dragonite", speed: 132, description: "11% Usage" },
  { pokemon: "Chandelure", speed: 132, description: "25% Usage" },
  { pokemon: "Regidrago", speed: 132, description: "33% Usage" },
  { pokemon: "Tatsugiri", speed: 134, description: "48% Usage" }
]
