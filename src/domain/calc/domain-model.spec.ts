import { Field as LibField, Move as LibMove, Pokemon as LibPokemon, Side as LibSide } from "@calc"
import { Field, Side } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

describe("Internal domain model (gen 0)", () => {
  describe("Pokemon parity with lib", () => {
    it("computes the same stats for a basic attacker", () => {
      const internal = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const lib = new LibPokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })

      expect(internal.rawStats).toEqual(lib.rawStats)
      expect(internal.stats).toEqual(lib.stats)
      expect(internal.maxHp()).toEqual(lib.maxHp())
    })

    it("matches level, types, weight, ability and defaults", () => {
      const internal = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const lib = new LibPokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })

      expect(internal.level).toEqual(lib.level)
      expect(internal.types).toEqual(lib.types)
      expect(internal.weightKg).toEqual(lib.weightKg)
      expect(internal.ability).toEqual(lib.ability)
      expect(internal.gender).toEqual(lib.gender)
      expect(internal.nature).toEqual(lib.nature)
      expect(internal.ivs).toEqual(lib.ivs)
      expect(internal.evs).toEqual(lib.evs)
      expect(internal.boosts).toEqual(lib.boosts)
    })

    it("applies nature plus and minus modifiers like the lib", () => {
      const internal = new Pokemon("Tyranitar", { evs: { spe: 252 }, nature: "Modest" })
      const lib = new LibPokemon("Tyranitar", { evs: { spe: 252 }, nature: "Modest" })

      expect(internal.rawStats).toEqual(lib.rawStats)
    })

    it("resolves originalCurHP from a partial curHP", () => {
      const internal = new Pokemon("Arcanine", { curHP: 50 })
      const lib = new LibPokemon("Arcanine", { curHP: 50 })

      expect(internal.originalCurrrentHp).toEqual(lib.originalCurrrentHp)
    })

    it("clones to an equivalent Pokemon", () => {
      const internal = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Choice Band" as never, status: "brn" })

      const clone = internal.clone()

      expect(clone.rawStats).toEqual(internal.rawStats)
      expect(clone.item).toEqual(internal.item)
      expect(clone.status).toEqual(internal.status)
      expect(clone.nature).toEqual(internal.nature)
    })
  })

  describe("Pokemon Tera Type", () => {
    it("hasType reports the Tera type, not the original typing", () => {
      const tera = new Pokemon("Incineroar", { teraType: "Water" })

      expect(tera.hasType("Water")).toBe(true)
      expect(tera.hasType("Fire")).toBe(false)
      expect(tera.hasType("Dark")).toBe(false)
    })

    it("hasOriginalType ignores the Tera type", () => {
      const tera = new Pokemon("Incineroar", { teraType: "Water" })

      expect(tera.hasOriginalType("Fire")).toBe(true)
      expect(tera.hasOriginalType("Dark")).toBe(true)
      expect(tera.hasOriginalType("Water")).toBe(false)
    })

    it("Stellar Tera keeps the original typing", () => {
      const tera = new Pokemon("Incineroar", { teraType: "Stellar" })

      expect(tera.hasType("Fire")).toBe(true)
      expect(tera.hasType("Dark")).toBe(true)
    })

    it("matches the lib hasType behaviour under Tera", () => {
      const internal = new Pokemon("Garchomp", { teraType: "Steel" })
      const lib = new LibPokemon("Garchomp", { teraType: "Steel" })

      expect(internal.hasType("Steel")).toEqual(lib.hasType("Steel"))
      expect(internal.hasType("Ground")).toEqual(lib.hasType("Ground"))
      expect(internal.hasType("Dragon")).toEqual(lib.hasType("Dragon"))
    })
  })

  describe("Move parity with lib", () => {
    function assertMoveParity(name: string, options: Record<string, unknown> = {}) {
      const internal = new Move(name, options as never)
      const lib = new LibMove(name, options as never)

      expect(internal.name).toEqual(lib.name)
      expect(internal.bp).toEqual(lib.bp)
      expect(internal.type).toEqual(lib.type)
      expect(internal.category).toEqual(lib.category)
      expect(internal.target).toEqual(lib.target)
      expect(internal.priority).toEqual(lib.priority)
      expect(internal.hits).toEqual(lib.hits)
      expect(internal.flags).toEqual(lib.flags)
      expect(internal.ignoreDefensive).toEqual(lib.ignoreDefensive)
      expect(internal.overrideDefensiveStat).toEqual(lib.overrideDefensiveStat)
      expect(internal.breaksProtect).toEqual(lib.breaksProtect)
      expect(internal.isCrit).toEqual(lib.isCrit)
      expect(internal.dropsStats).toEqual(lib.dropsStats)
    }

    it("matches a basic physical move", () => {
      assertMoveParity("Fake Out")
    })

    it("matches a special move", () => {
      assertMoveParity("Moonblast")
    })

    it("matches Body Press", () => {
      assertMoveParity("Body Press")
    })

    it("matches Psyshock (defensive stat override)", () => {
      assertMoveParity("Psyshock")
    })

    it("matches a fixed multihit move", () => {
      assertMoveParity("Bullet Seed")
    })

    it("matches a multiaccuracy multihit move", () => {
      assertMoveParity("Triple Axel")
    })

    it("matches multihit with Skill Link", () => {
      assertMoveParity("Bullet Seed", { ability: "Skill Link" })
    })

    it("flags Struggle as typeless", () => {
      assertMoveParity("Struggle")
    })

    it("clones to an equivalent Move", () => {
      const internal = new Move("Bullet Seed", { ability: "Skill Link" as never })

      const clone = internal.clone()

      expect(clone.name).toEqual(internal.name)
      expect(clone.hits).toEqual(internal.hits)
      expect(clone.bp).toEqual(internal.bp)
    })
  })

  describe("Field and Side parity with lib", () => {
    it("defaults match the lib", () => {
      const internal = new Field()
      const lib = new LibField()

      expect(internal.gameType).toEqual(lib.gameType)
      expect(internal.attackerSide).toEqual(new Side())
      expect(internal.defenderSide).toEqual(new Side())
      expect(new Side()).toEqual(new LibSide())
    })

    it("carries weather, terrain and room flags", () => {
      const internal = new Field({ gameType: "Doubles", weather: "Sun", terrain: "Electric", isGravity: true })

      expect(internal.gameType).toEqual("Doubles")
      expect(internal.hasWeather("Sun")).toBe(true)
      expect(internal.hasTerrain("Electric")).toBe(true)
      expect(internal.isGravity).toBe(true)
    })

    it("swap exchanges the two sides", () => {
      const field = new Field({ attackerSide: { isHelpingHand: true }, defenderSide: { isReflect: true } })

      field.swap()

      expect(field.attackerSide.isReflect).toBe(true)
      expect(field.defenderSide.isHelpingHand).toBe(true)
    })

    it("clones to an equivalent Field", () => {
      const field = new Field({ gameType: "Doubles", weather: "Rain", attackerSide: { isTailwind: true } })

      const clone = field.clone()

      expect(clone.gameType).toEqual(field.gameType)
      expect(clone.weather).toEqual(field.weather)
      expect(clone.attackerSide.isTailwind).toBe(true)
    })
  })
})
