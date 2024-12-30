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

      speedCalculator.speedTierIs(19, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(62, "Basculegion", 196, "Min")
    })

    it("decrement speed modifier of opponent Pokémon", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.speedModifier("-2")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Annihilape", 78, "Meta")
      speedCalculator.speedTierIs(40, "Garchomp", 126, "Scarf")
    })

    it("decrement speed of opponent Pokémon with Ice Wind", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Clefable", 82, "Max")
      speedCalculator.speedTierIs(62, "Delphox", 114, "Meta")
    })

    it("decrement speed of opponent Pokémon with Paralyzis", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Annihilape", 78, "Meta")
      speedCalculator.speedTierIs(40, "Garchomp", 126, "Scarf")
    })

    it("increment speed of opponent Pokémon with Choice Scarf", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Amoonguss", 50, "Meta")
      speedCalculator.speedTierIs(62, "Milotic", 115, "Meta")
    })

    it("activate all opponent options at the same time", () => {
      team.importPokemon(tyranitarData)

      speedCalculator.iceWind()
      speedCalculator.paralyzed()
      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Baxcalibur", 75, "Scarf")
      speedCalculator.speedTierIs(32, "Dragapult", 106, "Scarf")
    })
  })

  context("Validate Pokémon variations", () => {
    it("change the speed tier when nature changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectNature("Jolly")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Pelipper", 85, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 108, "Actual")
      speedCalculator.speedTierIs(62, "Clefable", 123, "Max")
    })

    it("change the speed tier when speed ev changes", () => {
      const pokemon = team.importPokemon(tyranitarData)
      pokemon.hpEvs(0)

      pokemon.speedEvs(156)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Ursaluna", 63, "Meta")
      speedCalculator.speedTierIs(31, "Tyranitar", 101, "Actual")
      speedCalculator.speedTierIs(62, "Rillaboom", 118, "Meta")
    })

    it("change the speed tier when speed iv changes", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.speedIvs(15)
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Garganacl", 36, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 91, "Actual")
      speedCalculator.speedTierIs(62, "Ursaluna", 112, "Max")
    })

    it("change the speed tier when Pokémon is paralyzed", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.paralyzed()
      cy.wait(300)

      speedCalculator.speedTierIs(21, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(62, "Armarouge", 95, "Meta")
    })

    it("change the speed tier when Pokémon has Choice Scarf", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Choice Scarf")
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Tyranitar", 124, "Max")
      speedCalculator.speedTierIs(31, "Tyranitar", 148, "Actual")
      speedCalculator.speedTierIs(62, "Lilligant-Hisui", 172, "Meta")
    })

    it("change the speed tier when Pokémon has Iron Ball", () => {
      const pokemon = team.importPokemon(tyranitarData)

      pokemon.selectItem("Iron Ball")
      cy.wait(300)

      speedCalculator.speedTierIs(21, "Torkoal", 22, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 49, "Actual")
      speedCalculator.speedTierIs(62, "Armarouge", 95, "Meta")
    })

    it("change the speed tier when Pokémon has activated Unburden", () => {
      const pokemon = team.importPokemon(sneaslerData)

      pokemon.selectAbility("Unburden")
      pokemon.activateAbility()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Dragapult", 162, "Min")
      speedCalculator.speedTierIs(30, "Garchomp", 253, "Scarf")
      speedCalculator.speedTierIs(31, "Sneasler", 378, "Actual")
    })
  })

  describe("Field influence", () => {
    it("change the speed tier when Attacker Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindAttacker()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Annihilape", 156, "Meta")
      speedCalculator.speedTierIs(31, "Tyranitar", 198, "Actual")
      speedCalculator.speedTierIs(40, "Garchomp", 253, "Scarf")
    })

    it("change the speed tier when Defender Tailwind was activated", () => {
      team.importPokemon(tyranitarData)

      field.tailwindDefender()
      cy.wait(300)

      speedCalculator.speedTierIs(19, "Torkoal", 44, "Min")
      speedCalculator.speedTierIs(31, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(62, "Basculegion", 196, "Min")
    })

    it("change the speed tier when Trick Room was activated", () => {
      team.importPokemon(tyranitarData)

      field.trickRoom()
      cy.wait(300)

      speedCalculator.speedTierIs(0, "Magmar", 115, "Meta")
      speedCalculator.speedTierIs(31, "Tyranitar", 99, "Actual")
      speedCalculator.speedTierIs(62, "Amoonguss", 50, "Meta")
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
  { pokemon: "Gholdengo", speed: 104, description: "Min" },
  { pokemon: "Ursaluna-Bloodmoon", speed: 104, description: "Meta" },
  { pokemon: "Rillaboom", speed: 105, description: "Min" },
  { pokemon: "Archaludon", speed: 105, description: "Min" },
  { pokemon: "Indeedee-F", speed: 105, description: "Min" },
  { pokemon: "Kommo-o", speed: 105, description: "Min" },
  { pokemon: "Corviknight", speed: 105, description: "Meta" },
  { pokemon: "Samurott-Hisui", speed: 105, description: "Min" },
  { pokemon: "Ceruledge", speed: 105, description: "Min" },
  { pokemon: "Glimmora", speed: 106, description: "Min" },
  { pokemon: "Baxcalibur", speed: 107, description: "Min" },
  { pokemon: "Excadrill", speed: 108, description: "Min" },
  { pokemon: "Ceruledge", speed: 108, description: "Meta" },
  { pokemon: "Vivillon", speed: 109, description: "Min" },
  { pokemon: "Annihilape", speed: 110, description: "Min" },
  { pokemon: "Flamigo", speed: 110, description: "Min" },
  { pokemon: "Arcanine-Hisui", speed: 110, description: "Min" },
  { pokemon: "Murkrow", speed: 111, description: "Meta" },
  { pokemon: "Ursaluna", speed: 112, description: "Max" },
  { pokemon: "Kingambit", speed: 112, description: "Max" },
  { pokemon: "Magmar", speed: 113, description: "Min" },
  { pokemon: "Ursaluna-Bloodmoon", speed: 114, description: "Max" },
  { pokemon: "Indeedee", speed: 115, description: "Min" },
  { pokemon: "Magmar", speed: 115, description: "Meta" },
  { pokemon: "Arcanine", speed: 115, description: "Min" },
  { pokemon: "Milotic", speed: 115, description: "Meta" },
  { pokemon: "Typhlosion-Hisui", speed: 115, description: "Min" },
  { pokemon: "Pelipper", speed: 117, description: "Meta" },
  { pokemon: "Rillaboom", speed: 118, description: "Meta" },
  { pokemon: "Tatsugiri", speed: 118, description: "Meta" },
  { pokemon: "Hydreigon", speed: 118, description: "Min" },
  { pokemon: "Palafin-Hero", speed: 120, description: "Actual" },
  { pokemon: "Volcarona", speed: 120, description: "Min" },
  { pokemon: "Charizard", speed: 120, description: "Min" },
  { pokemon: "Tauros-Paldea-Aqua", speed: 120, description: "Min" },
  { pokemon: "Palafin", speed: 120, description: "Min" },
  { pokemon: "Garchomp", speed: 122, description: "Min" },
  { pokemon: "Incineroar", speed: 123, description: "Meta" },
  { pokemon: "Porygon2", speed: 123, description: "Max" },
  { pokemon: "Primarina", speed: 123, description: "Max" },
  { pokemon: "Farigiraf", speed: 123, description: "Max" },
  { pokemon: "Grimmsnarl", speed: 123, description: "Max" },
  { pokemon: "Clefable", speed: 123, description: "Max" },
  { pokemon: "Tyranitar", speed: 124, description: "Max" },
  { pokemon: "Delphox", speed: 124, description: "Min" },
  { pokemon: "Electabuzz", speed: 125, description: "Min" },
  { pokemon: "Lilligant-Hisui", speed: 125, description: "Min" },
  { pokemon: "Pelipper", speed: 128, description: "Max" },
  { pokemon: "Ninetales-Alola", speed: 129, description: "Min" },
  { pokemon: "Basculegion", speed: 130, description: "Meta" },
  { pokemon: "Corviknight", speed: 130, description: "Max" },
  { pokemon: "Jumpluff", speed: 130, description: "Min" },
  { pokemon: "Maushold", speed: 131, description: "Min" },
  { pokemon: "Dragonite", speed: 132, description: "Meta" },
  { pokemon: "Electabuzz", speed: 133, description: "Meta" },
  { pokemon: "Volcarona", speed: 133, description: "Meta" },
  { pokemon: "Glimmora", speed: 133, description: "Meta" },
  { pokemon: "Baxcalibur", speed: 133, description: "Meta" },
  { pokemon: "Sinistcha", speed: 134, description: "Max" },
  { pokemon: "Whimsicott", speed: 136, description: "Min" },
  { pokemon: "Kommo-o", speed: 137, description: "Meta" },
  { pokemon: "Armarouge", speed: 139, description: "Max" },
  { pokemon: "Sneasler", speed: 140, description: "Min" }
]
