import { chainMods, getModifiedStat, higherStat, isQPActive, OF16, OF32, pokeRound } from "@multicalc/stat-calc/stat-utils"
import { Pokemon } from "@multicalc/model/pokemon"
import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Pokemon as CalcPokemon } from "@calc"

describe("stat-utils", () => {
  describe("getModifiedStat", () => {
    it("leaves the stat unchanged at neutral boost", () => {
      const result = getModifiedStat(200, 0)

      expect(result).toEqual(200)
    })

    it("applies a positive boost with the modern table", () => {
      const result = getModifiedStat(200, 2)

      expect(result).toEqual(400)
    })

    it("applies a negative boost with the modern table", () => {
      const result = getModifiedStat(200, -2)

      expect(result).toEqual(100)
    })
  })

  describe("higherStat", () => {
    it("picks the highest offensive stat", () => {
      const calc = new CalcPokemon("Iron Bundle", { evs: { spa: 252 }, nature: "Modest" })

      const stat = higherStat(calc)

      expect(stat).toEqual("spa")
    })

    it("keeps atk when no other stat is higher", () => {
      const calc = new CalcPokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })

      const stat = higherStat(calc)

      expect(stat).toEqual("atk")
    })
  })

  describe("isQPActive", () => {
    it("is active for Protosynthesis in Sun", () => {
      const pokemon = new Pokemon("Roaring Moon", { ability: new Ability("Protosynthesis") })
      const field = new Field({ weather: "Sun" })

      const active = isQPActive(pokemon, field)

      expect(active).toBe(true)
    })

    it("is active for Quark Drive in Electric Terrain", () => {
      const pokemon = new Pokemon("Iron Valiant", { ability: new Ability("Quark Drive") })
      const field = new Field({ terrain: "Electric" })

      const active = isQPActive(pokemon, field)

      expect(active).toBe(true)
    })

    it("is active for Protosynthesis with Booster Energy toggled on", () => {
      const pokemon = new Pokemon("Roaring Moon", { ability: new Ability("Protosynthesis", true) })
      const field = new Field({})

      const active = isQPActive(pokemon, field)

      expect(active).toBe(true)
    })

    it("is active for Quark Drive with Booster Energy toggled on", () => {
      const pokemon = new Pokemon("Iron Valiant", { ability: new Ability("Quark Drive", true) })
      const field = new Field({})

      const active = isQPActive(pokemon, field)

      expect(active).toBe(true)
    })

    it("is inactive without the enabling condition", () => {
      const pokemon = new Pokemon("Roaring Moon", { ability: new Ability("Protosynthesis") })
      const field = new Field({})

      const active = isQPActive(pokemon, field)

      expect(active).toBe(false)
    })
  })

  describe("overflow and rounding helpers", () => {
    it("OF16 wraps values above 65535", () => {
      expect(OF16(65536)).toEqual(0)
    })

    it("OF16 leaves smaller values untouched", () => {
      expect(OF16(500)).toEqual(500)
    })

    it("OF32 wraps values above 4294967295", () => {
      expect(OF32(4294967296)).toEqual(0)
    })

    it("pokeRound floors the value", () => {
      expect(pokeRound(3.9)).toEqual(3)
    })

    it("chainMods clamps to the lower bound", () => {
      expect(chainMods([2048], 4096, 131072)).toEqual(4096)
    })

    it("chainMods skips neutral mods equal to 4096", () => {
      expect(chainMods([4096, 6144], 1, 131072)).toEqual(6144)
    })
  })
})
