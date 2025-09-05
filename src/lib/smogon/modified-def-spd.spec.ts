import { Ability } from "@lib/model/ability"
import { Field, FieldSide } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import DefensiveStatCalculator from "./modified-def-spd"

const calculator = new DefensiveStatCalculator()

describe("DefensiveStatCalculator", () => {
  describe("by stat modifiers", () => {
    it("should return raw defense stat when does not have any modification", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 } })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(157)
      expect(spd).toBe(133)
    })

    it("should return modified defense when have positive stat modifiers", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 }, boosts: { def: 2 } })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(314)
      expect(spd).toBe(133)
    })

    it("should ignore positive defense modifiers when is a critical hit", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100 }, boosts: { def: 2 } })
      const field = new Field({ defenderSide: new FieldSide({ isCriticalHit: true }) })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(157)
    })

    it("should return modified defense when have negative stat modifiers", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 }, boosts: { def: -4 } })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(52)
      expect(spd).toBe(133)
    })

    it("should not ignore negative defense modifiers when is a critical hit", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 }, boosts: { def: -4 } })
      const field = new Field({ defenderSide: new FieldSide({ isCriticalHit: true }) })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(52)
      expect(spd).toBe(133)
    })
  })

  describe("by weather", () => {
    it("should boost special defense under sandstorm if Rock type", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Careful", evs: { def: 100, spd: 100 } })
      const field = new Field({ weather: "Sand" })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(143)
      expect(spd).toBe(219)
    })

    it("should not boost special defense under sandstorm if Rock type use tera to another type", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Careful", evs: { spd: 100 }, teraType: "Water", teraTypeActive: true })
      const field = new Field({ weather: "Sand" })

      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(spd).toBe(146)
    })

    it("should not ignore boost special defense under sandstorm if Rock type when is a critical hit", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Careful", evs: { spd: 100 } })
      const field = new Field({ weather: "Sand", defenderSide: new FieldSide({ isCriticalHit: true }) })

      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(spd).toBe(219)
    })

    it("should not boost special defense under sandstorm if is not Rock type", () => {
      const pokemon = new Pokemon("Porygon", { nature: "Careful", evs: { spd: 100 } })
      const field = new Field({ weather: "Sand" })

      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(spd).toBe(118)
    })

    it("should boost special defense under sandstorm if is not Rock type but use tera Rock", () => {
      const pokemon = new Pokemon("Porygon", { nature: "Careful", evs: { spd: 100 }, teraType: "Rock", teraTypeActive: true })
      const field = new Field({ weather: "Sand" })

      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(spd).toBe(177)
    })

    it("should boost defense under snow if Ice type", () => {
      const pokemon = new Pokemon("Avalugg", { nature: "Impish", evs: { def: 100, spd: 100 } })
      const field = new Field({ weather: "Snow" })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(357)
      expect(spd).toBe(79)
    })

    it("should not boost defense under snow if Ice type use tera to another type", () => {
      const pokemon = new Pokemon("Avalugg", { nature: "Impish", evs: { def: 100 }, teraType: "Water", teraTypeActive: true })
      const field = new Field({ weather: "Snow" })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(238)
    })

    it("should not ignore boost defense under snow if Ice type when is a critical hit", () => {
      const pokemon = new Pokemon("Avalugg", { nature: "Impish", evs: { def: 100 } })
      const field = new Field({ weather: "Snow", defenderSide: new FieldSide({ isCriticalHit: true }) })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(357)
    })

    it("should not boost defense under snow if is not Ice type", () => {
      const pokemon = new Pokemon("Porygon", { nature: "Impish", evs: { def: 100 } })
      const field = new Field({ weather: "Snow" })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(113)
    })

    it("should boost defense under snow if is not Ice type but use tera Ice", () => {
      const pokemon = new Pokemon("Porygon", { nature: "Impish", evs: { def: 100 }, teraType: "Ice", teraTypeActive: true })
      const field = new Field({ weather: "Snow" })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(169)
    })
  })

  describe("by abilities", () => {
    it("should modify defense when has Marvel Scale and is statused", () => {
      const pokemon = new Pokemon("Milotic", { nature: "Bold", evs: { def: 100, spd: 100 }, ability: new Ability("Marvel Scale"), status: Status.BURN })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(184)
      expect(spd).toBe(158)
    })

    it("should not modify defense when has Marvel Scale but not is statused", () => {
      const pokemon = new Pokemon("Milotic", { nature: "Bold", evs: { def: 100 }, ability: new Ability("Marvel Scale"), status: Status.HEALTHY })

      const def = calculator.getFinalDefense(pokemon, new Field())

      expect(def).toBe(123)
    })

    it("should modify defense when has Fur Coat", () => {
      const pokemon = new Pokemon("Persian-Alola", { nature: "Impish", evs: { def: 100, spd: 100 }, ability: new Ability("Fur Coat") })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(204)
      expect(spd).toBe(98)
    })

    it("should modify defense when has Grass Pelt on Grassy Terrain", () => {
      const pokemon = new Pokemon("Gogoat", { nature: "Impish", evs: { def: 100, spd: 100 }, ability: new Ability("Grass Pelt") })
      const field = new Field({ terrain: "Grassy" })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(156)
      expect(spd).toBe(114)
    })

    it("should not modify defense when has Grass Pelt but not in Grassy Terrain", () => {
      const pokemon = new Pokemon("Gogoat", { nature: "Impish", evs: { def: 100 }, ability: new Ability("Grass Pelt") })
      const field = new Field({ terrain: "Electric" })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(104)
    })

    it("should reduce defense when Sword of Ruin is active", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 } })
      const field = new Field({ isSwordOfRuin: true })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(118)
      expect(spd).toBe(133)
    })

    it("should not reduce defense when Sword of Ruin is active but Pokémon has Sword of Ruin ability", () => {
      const pokemon = new Pokemon("Chien-Pao", { nature: "Impish", evs: { def: 100 } })
      const field = new Field({ isSwordOfRuin: true })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(124)
    })

    it("should reduce special defense when Beads of Ruin is active", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Careful", evs: { def: 100, spd: 100 } })
      const field = new Field({ isBeadsOfRuin: true })

      const def = calculator.getFinalDefense(pokemon, field)
      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(def).toBe(143)
      expect(spd).toBe(109)
    })

    it("should not reduce special defense when Beads of Ruin is active but Pokémon has Beads of Ruin", () => {
      const pokemon = new Pokemon("Chi-Yu", { nature: "Careful", evs: { spd: 100 } })
      const field = new Field({ isBeadsOfRuin: true })

      const spd = calculator.getFinalSpecialDefense(pokemon, field)

      expect(spd).toBe(168)
    })
  })

  describe("by items", () => {
    it("should modify defense when holding Eviolite", () => {
      const pokemon = new Pokemon("Chansey", { nature: "Bold", evs: { def: 100, spd: 100 }, item: "Eviolite" })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(61)
      expect(spd).toBe(207)
    })

    it("should not modify defense when holding Eviolite but is a final form", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100, spd: 100 }, item: "Eviolite" })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(157)
      expect(spd).toBe(133)
    })

    it("should modify special defense when holding Assault Vest", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Careful", evs: { def: 100, spd: 100 }, item: "Assault Vest" })

      const def = calculator.getFinalDefense(pokemon, new Field())
      const spd = calculator.getFinalSpecialDefense(pokemon, new Field())

      expect(def).toBe(143)
      expect(spd).toBe(219)
    })
  })

  describe("Neutralizing Gas", () => {
    it("should deactivate ability because the Neutralizing Gas", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100 } })
      const field = new Field({ isSwordOfRuin: true, isNeutralizingGas: true })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(157)
    })

    it("should not deactivate ability because the Neutralizing Gas when the Pokémon has Ability Shield equipped", () => {
      const pokemon = new Pokemon("Tyranitar", { nature: "Impish", evs: { def: 100 }, item: "Ability Shield" })
      const field = new Field({ isSwordOfRuin: true, isNeutralizingGas: true })

      const def = calculator.getFinalDefense(pokemon, field)

      expect(def).toBe(118)
    })
  })
})
