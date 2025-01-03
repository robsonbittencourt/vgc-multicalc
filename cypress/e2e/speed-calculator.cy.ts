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

      cy.get('[data-cy="speed-box"]').should("have.length", 63)
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

      speedCalculator.speedTierIs(21, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(62, "Regidrago", 200, "Min")
    })

    it("decrement speed modifier of opponent Pokémon", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.speedModifier("-2")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Lunala", 81, "Max")
      speedCalculator.speedTierIs(54, "Flutter Mane", 144, "Booster")
    })

    it("decrement speed of opponent Pokémon with Ice Wind", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Volcarona", 84, "Meta")
      speedCalculator.speedTierIs(62, "Landorus", 112, "Max")
    })

    it("decrement speed of opponent Pokémon with Paralyzis", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Lunala", 81, "Max")
      speedCalculator.speedTierIs(54, "Flutter Mane", 144, "Booster")
    })

    it("increment speed of opponent Pokémon with Choice Scarf", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Ditto", 47, "Min")
      speedCalculator.speedTierIs(62, "Basculegion", 118, "Meta")
    })

    it("activate all opponent options at the same time", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      speedCalculator.paralyzed()
      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Terapagos-Terastal", 75, "Scarf")
      speedCalculator.speedTierIs(45, "Flutter Mane", 144, "Booster")
    })
  })

  context("Validate Pokémon variations", () => {
    it("change the speed tier when nature changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectNature("Jolly")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Dondozo", 75, "Meta")
      speedCalculator.speedTierIs(31, "Tyranitar", 108, "Actual")
      speedCalculator.speedTierIs(62, "Iron Treads", 126, "Min")
    })

    it("change the speed tier when speed ev changes", () => {
      const pokemon = team.importPokemon(tyranitarData)
      pokemon.hpEvs(0)

      pokemon.speedEvs(156)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Ursaluna-Bloodmoon", 51, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 101, "Actual")
      speedCalculator.speedTierIs(62, "Farigiraf", 123, "Max")
    })

    it("change the speed tier when speed iv changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.speedIvs(15)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 91, "Actual")
      speedCalculator.speedTierIs(62, "Urshifu", 117, "Min")
    })

    it("change the speed tier when Pokémon is paralyzed", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(24, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(62, "Dragonite", 100, "Min")
    })

    it("change the speed tier when Pokémon has Choice Scarf", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Choice Scarf")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Iron Treads", 126, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 148, "Actual")
      speedCalculator.speedTierIs(62, "Volcarona", 167, "Max")
    })

    it("change the speed tier when Pokémon has Iron Ball", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Iron Ball")
      cy.wait(300)

      speedCalculator.speedTierIs(24, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(62, "Dragonite", 100, "Min")
    })

    it("change the speed tier when Pokémon has activated Unburden", () => {
      const pokemon = team.importPokemon(sneaslerData)

      pokemon.selectAbility("Unburden")
      pokemon.activateAbility()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Thundurus", 179, "Max")
      speedCalculator.speedTierIs(31, "Sneasler", 378, "Actual")
    })
  })

  describe("Field influence", () => {
    it("change the speed tier when Attacker Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindAttacker()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Lunala", 163, "Max")
      speedCalculator.speedTierIs(31, "Tyranitar", 198, "Actual")
      speedCalculator.speedTierIs(54, "Flutter Mane", 288, "Booster")
    })

    it("change the speed tier when Defender Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindDefender()
      cy.wait(300)

      speedCalculator.speedTierIs(21, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(62, "Regidrago", 200, "Min")
    })

    it("change the speed tier when Trick Room was activated", () => {
      team.importPokemon(tyranitarData)

      field.trickRoom()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Volcarona", 120, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(62, "Ditto", 47, "Min")
    })

    it("double speed when Pokémon has Chlorophyll and Sun was activated", () => {
      team.importPokemon(jumpluffData)

      field.sun()
      cy.wait(300)

      speedCalculator.speedTierIs(31, "Jumpluff", 356, "Actual")
    })

    it("double speed when Pokémon has Swift Swim and Rain was activated", () => {
      team.importPokemon(kingdraData)

      field.rain()
      cy.wait(300)

      speedCalculator.speedTierIs(31, "Kingdra", 274, "Actual")
    })

    it("double speed when Pokémon has Sand Rush and Sun was activated", () => {
      team.importPokemon(excadrillData)

      field.sand()
      cy.wait(300)

      speedCalculator.speedTierIs(31, "Excadrill", 280, "Actual")
    })

    it("double speed when Pokémon has Slush Rush and Snow was activated", () => {
      team.importPokemon(bearticData)

      field.snow()
      cy.wait(300)

      speedCalculator.speedTierIs(31, "Beartic", 204, "Actual")
    })

    it("double speed when Pokémon has Surge Surfer and Electric Terrain was activated", () => {
      team.importPokemon(raichuAlolaData)

      field.eletricTerrain()
      cy.wait(300)

      speedCalculator.speedTierIs(31, "Raichu-Alola", 260, "Actual")
    })
  })
})

const palafinSpeedTier = [
  { pokemon: "Basculegion", speed: 98, description: "Min" },
  { pokemon: "Dragonite", speed: 100, description: "Min" },
  { pokemon: "Gastrodon", speed: 100, description: "Max" },
  { pokemon: "Chandelure", speed: 100, description: "Min" },
  { pokemon: "Regidrago", speed: 100, description: "Min" },
  { pokemon: "Gallade", speed: 100, description: "Min" },
  { pokemon: "Dragonite", speed: 101, description: "Meta" },
  { pokemon: "Tatsugiri", speed: 102, description: "Min" },
  { pokemon: "Gholdengo", speed: 104, description: "Min" },
  { pokemon: "Rillaboom", speed: 105, description: "Min" },
  { pokemon: "Terapagos-Terastal", speed: 105, description: "Meta" },
  { pokemon: "Indeedee-F", speed: 105, description: "Meta" },
  { pokemon: "Ditto", speed: 108, description: "Meta" },
  { pokemon: "Kyogre", speed: 110, description: "Min" },
  { pokemon: "Ditto", speed: 110, description: "Max" },
  { pokemon: "Groudon", speed: 110, description: "Min" },
  { pokemon: "Annihilape", speed: 110, description: "Min" },
  { pokemon: "Iron Hands", speed: 112, description: "Max" },
  { pokemon: "Calyrex-Ice", speed: 112, description: "Max" },
  { pokemon: "Ursaluna", speed: 112, description: "Max" },
  { pokemon: "Tyranitar", speed: 113, description: "Meta" },
  { pokemon: "Ursaluna-Bloodmoon", speed: 114, description: "Max" },
  { pokemon: "Rillaboom", speed: 115, description: "Meta" },
  { pokemon: "Kyogre", speed: 115, description: "Meta" },
  { pokemon: "Urshifu-Rapid-Strike", speed: 117, description: "Min" },
  { pokemon: "Urshifu", speed: 117, description: "Min" },
  { pokemon: "Brute Bonnet", speed: 117, description: "Max" },
  { pokemon: "Lunala", speed: 117, description: "Min" },
  { pokemon: "Iron Crown", speed: 118, description: "Min" },
  { pokemon: "Basculegion", speed: 118, description: "Meta" },
  { pokemon: "Groudon", speed: 119, description: "Meta" },
  { pokemon: "Palafin-Hero", speed: 120, description: "Actual" },
  { pokemon: "Chi-Yu", speed: 120, description: "Min" },
  { pokemon: "Entei", speed: 120, description: "Min" },
  { pokemon: "Volcarona", speed: 120, description: "Min" },
  { pokemon: "Landorus", speed: 121, description: "Min" },
  { pokemon: "Incineroar", speed: 123, description: "Max" },
  { pokemon: "Farigiraf", speed: 123, description: "Max" },
  { pokemon: "Weezing-Galar", speed: 123, description: "Max" },
  { pokemon: "Grimmsnarl", speed: 123, description: "Max" },
  { pokemon: "Tyranitar", speed: 124, description: "Max" },
  { pokemon: "Mienshao", speed: 125, description: "Min" },
  { pokemon: "Volcarona", speed: 126, description: "Meta" },
  { pokemon: "Iron Treads", speed: 126, description: "Min" },
  { pokemon: "Raging Bolt", speed: 127, description: "Meta" },
  { pokemon: "Gholdengo", speed: 127, description: "Meta" },
  { pokemon: "Pelipper", speed: 128, description: "Max" },
  { pokemon: "Iron Jugulis", speed: 128, description: "Min" },
  { pokemon: "Tsareena", speed: 129, description: "Meta" },
  { pokemon: "Lunala", speed: 129, description: "Meta" },
  { pokemon: "Regidrago", speed: 129, description: "Meta" },
  { pokemon: "Ogerpon-Hearthflame", speed: 130, description: "Min" },
  { pokemon: "Ogerpon-Cornerstone", speed: 130, description: "Min" },
  { pokemon: "Ogerpon-Wellspring", speed: 130, description: "Min" },
  { pokemon: "Ogerpon", speed: 130, description: "Min" },
  { pokemon: "Latios", speed: 130, description: "Min" },
  { pokemon: "Tornadus", speed: 131, description: "Min" },
  { pokemon: "Scream Tail", speed: 131, description: "Min" },
  { pokemon: "Thundurus", speed: 131, description: "Min" },
  { pokemon: "Maushold", speed: 131, description: "Meta" },
  { pokemon: "Chandelure", speed: 132, description: "Meta" },
  { pokemon: "Tatsugiri", speed: 134, description: "Meta" },
  { pokemon: "Whimsicott", speed: 136, description: "Min" }
]
