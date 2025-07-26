import { poke } from "@cy-support/e2e"
import { Field } from "@page-object/field"
import { SpeedCalculator } from "@page-object/speed-calculator"
import { Team } from "@page-object/team"

const team = new Team()
const field = new Field()
const speedCalculator = new SpeedCalculator()

describe("Speed Calculator", () => {
  beforeEach(() => {
    cy.get('[data-cy="speed-calculator"]').click({ force: true })
  })

  context("Validate all Speed Tier", () => {
    it("shows the Pokémon sorted by speed in ascending order", () => {
      speedCalculator.speedInOrder()
    })
  })

  context("Validate opponent options", () => {
    it("increment speed modifier of opponent Pokémon", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.speedModifier("+2")
      cy.wait(300)

      speedCalculator.speedInOrder()
    })

    it("decrement speed modifier of opponent Pokémon", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.speedModifier("-2")
      cy.wait(300)

      speedCalculator.speedInOrder()
    })

    it("decrement speed of opponent Pokémon with Ice Wind", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.iceWind()
      cy.wait(300)

      speedCalculator.speedInOrder()
    })

    it("decrement speed of opponent Pokémon with Paralyzis", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.paralyzed()
      cy.wait(300)

      speedCalculator.speedInOrder()
    })

    it("increment speed of opponent Pokémon with Choice Scarf", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedInOrder()
    })

    it("activate all opponent options at the same time", () => {
      team.importPokemon(poke["tyranitar"])

      speedCalculator.iceWind()
      speedCalculator.paralyzed()
      speedCalculator.choiceScarf()
      cy.wait(300)

      speedCalculator.speedInOrder()
    })
  })

  context("Validate Pokémon variations", () => {
    it("change the speed tier when nature changes", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.selectNature("Jolly")
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 108, "Actual")
    })

    it("change the speed tier when speed ev changes", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.speedEvs(156)
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 101, "Actual")
    })

    it("change the speed tier when speed iv changes", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.speedIvs(15)
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 91, "Actual")
    })

    it("change the speed tier when Pokémon is paralyzed", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.paralyzed()
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 49, "Actual")
    })

    it("change the speed tier when Pokémon has Choice Scarf", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.selectItem("Choice Scarf")
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 148, "Actual")
    })

    it("change the speed tier when Pokémon has Iron Ball", () => {
      const pokemon = team.importPokemon(poke["tyranitar"])

      pokemon.selectItem("Iron Ball")
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 49, "Actual")
    })

    it("change the speed tier when Pokémon has activated Unburden", () => {
      const pokemon = team.importPokemon(poke["sneasler"])

      pokemon.selectAbility("Unburden")
      pokemon.activateAbility()
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Sneasler", 378, "Actual")
    })
  })

  describe("Field influence", () => {
    it("change the speed tier when Attacker Tailwind was activated", () => {
      team.importPokemon(poke["tyranitar"])

      field.tailwindAttacker()
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 198, "Actual")
    })

    it("change the speed tier when Defender Tailwind was activated", () => {
      team.importPokemon(poke["tyranitar"])

      field.tailwindDefender()
      cy.wait(300)

      speedCalculator.speedInOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 99, "Actual")
    })

    it("change the speed tier when Trick Room was activated", () => {
      team.importPokemon(poke["tyranitar"])

      field.trickRoom()
      cy.wait(300)

      speedCalculator.speedInRerverseOrder()
      speedCalculator.speedTierIs(28, "Tyranitar", 99, "Actual")
    })

    it("double speed when Pokémon has Chlorophyll and Sun was activated", () => {
      team.importPokemon(poke["jumpluff"])

      field.sun()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Jumpluff", 356, "Actual")
    })

    it("double speed when Pokémon has Swift Swim and Rain was activated", () => {
      team.importPokemon(poke["kingdra"])

      field.rain()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Kingdra", 274, "Actual")
    })

    it("double speed when Pokémon has Sand Rush and Sun was activated", () => {
      team.importPokemon(poke["excadrill"])

      field.sand()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Excadrill", 280, "Actual")
    })

    it("double speed when Pokémon has Slush Rush and Snow was activated", () => {
      team.importPokemon(poke["beartic"])

      field.snow()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Beartic", 204, "Actual")
    })

    it("double speed when Pokémon has Surge Surfer and Electric Terrain was activated", () => {
      team.importPokemon(poke["raichu-alola"])

      field.eletricTerrain()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Raichu-Alola", 260, "Actual")
    })

    it("don't double speed when Pokémon has Surge Surfer and Electric Terrain was activated but Neutralizing Gas was activated", () => {
      team.importPokemon(poke["raichu-alola"])

      field.eletricTerrain()
      field.neutralizingGas()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Raichu-Alola", 130, "Actual")
    })

    it("ignore Neutralizing Gas when Pokémon have Ability Shield equipped", () => {
      team.importPokemon(poke["raichu-alola"])
      team.selectPokemon("Raichu").selectItem("Ability Shield")

      field.eletricTerrain()
      field.neutralizingGas()
      cy.wait(300)

      speedCalculator.speedTierIs(28, "Raichu-Alola", 260, "Actual")
    })
  })
})
