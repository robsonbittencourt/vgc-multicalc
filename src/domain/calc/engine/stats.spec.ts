import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { getStatDescriptionText } from "@calc/engine/desc"
import { computeFinalStats, countBoosts, getFinalSpeed, getQPBoostedStat, getStabMod, getWeight, isGrounded, isQPActive } from "@calc/engine/stats"
import { RawDesc } from "@data/types"

describe("Internal stats/effectiveness (gen 0)", () => {
  describe("computeFinalStats", () => {
    it("applies boosts to atk and spa", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", boosts: { atk: 2 } })
      const defender = new Pokemon("Pelipper", { evs: { spa: 252 } })
      const rawAtk = attacker.rawStats.atk

      computeFinalStats(attacker, defender, new Field(), "atk", "spa")

      expect(attacker.stats.atk).toEqual(Math.floor((rawAtk * 4) / 2))
    })

    it("applies negative defensive boosts with the modern boost table", () => {
      const attacker = new Pokemon("Garchomp")
      const defender = new Pokemon("Pelipper", { evs: { def: 252 }, nature: "Bold", boosts: { def: -1 } })

      computeFinalStats(attacker, defender, new Field(), "def", "spd")

      expect(defender.stats.def).toEqual(Math.floor((defender.rawStats.def * 2) / 3))
      expect(defender.stats.spd).toEqual(defender.rawStats.spd)
    })
  })

  describe("getFinalSpeed", () => {
    it("matches base speed", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })
      expect(getFinalSpeed(p, new Field(), new Field().attackerSide)).toBeGreaterThan(0)
    })

    it("doubles speed under Tailwind", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const tailwind = getFinalSpeed(p, new Field(), new Field({ attackerSide: { isTailwind: true } }).attackerSide)

      expect(tailwind).toEqual(base * 2)
    })

    it("boosts speed 1.5x with Choice Scarf", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", item: "Choice Scarf" })
      const noScarf = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })

      const scarfSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(noScarf, new Field(), new Field().attackerSide)

      expect(scarfSpeed).toEqual(Math.floor(baseSpeed * 1.5))
    })

    it("halves speed with paralysis", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", status: "par" })
      const healthy = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })

      const parSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(healthy, new Field(), new Field().attackerSide)

      expect(parSpeed).toEqual(Math.floor(baseSpeed / 2))
    })

    it("doubles speed with Chlorophyll in Sun", () => {
      const p = new Pokemon("Venusaur", { evs: { spe: 252 }, nature: "Timid", ability: "Chlorophyll" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const sunSpeed = getFinalSpeed(p, new Field({ weather: "Sun" }), new Field().attackerSide)

      expect(sunSpeed).toEqual(base * 2)
    })

    it("doubles speed with Sand Rush in Sand", () => {
      const p = new Pokemon("Excadrill", { evs: { spe: 252 }, nature: "Jolly", ability: "Sand Rush" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const sandSpeed = getFinalSpeed(p, new Field({ weather: "Sand" }), new Field().attackerSide)

      expect(sandSpeed).toEqual(base * 2)
    })

    it("doubles speed with Swift Swim in Rain", () => {
      const p = new Pokemon("Kingdra", { evs: { spe: 252 }, nature: "Timid", ability: "Swift Swim" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const rainSpeed = getFinalSpeed(p, new Field({ weather: "Rain" }), new Field().attackerSide)

      expect(rainSpeed).toEqual(base * 2)
    })

    it("doubles speed with Slush Rush in Snow", () => {
      const p = new Pokemon("Arctozolt", { evs: { spe: 252 }, nature: "Jolly", ability: "Slush Rush" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const snowSpeed = getFinalSpeed(p, new Field({ weather: "Snow" }), new Field().attackerSide)

      expect(snowSpeed).toEqual(base * 2)
    })

    it("doubles speed with Surge Surfer on Electric Terrain", () => {
      const p = new Pokemon("Togedemaru", { evs: { spe: 252 }, nature: "Jolly", ability: "Surge Surfer" })

      const base = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const terrainSpeed = getFinalSpeed(p, new Field({ terrain: "Electric" }), new Field().attackerSide)

      expect(terrainSpeed).toEqual(base * 2)
    })

    it("boosts speed 1.5x with Quick Feet while statused", () => {
      const p = new Pokemon("Ursaring", { evs: { spe: 252 }, nature: "Jolly", ability: "Quick Feet", status: "par" })
      const healthy = new Pokemon("Ursaring", { evs: { spe: 252 }, nature: "Jolly", ability: "Quick Feet" })

      const parSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(healthy, new Field(), new Field().attackerSide)

      expect(parSpeed).toEqual(Math.floor(baseSpeed * 1.5))
    })

    it("halves speed with Slow Start active", () => {
      const p = new Pokemon("Regigigas", { evs: { spe: 252 }, nature: "Jolly", ability: "Slow Start", abilityOn: true })
      const inactive = new Pokemon("Regigigas", { evs: { spe: 252 }, nature: "Jolly", ability: "Slow Start" })

      const slowStartSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(inactive, new Field(), new Field().attackerSide)

      expect(slowStartSpeed).toEqual(Math.floor(baseSpeed / 2))
    })

    it("boosts speed when Quark Drive is active on the Speed stat", () => {
      const p = new Pokemon("Iron Bundle", { evs: { spe: 252 }, nature: "Timid", ability: "Quark Drive", boostedStat: "spe" })
      const noBoost = new Pokemon("Iron Bundle", { evs: { spe: 252 }, nature: "Timid", ability: "Quark Drive" })

      const boostedSpeed = getFinalSpeed(p, new Field({ terrain: "Electric" }), new Field().attackerSide)
      const base = getFinalSpeed(noBoost, new Field({ terrain: "Electric" }), new Field().attackerSide)

      expect(boostedSpeed).toBeGreaterThan(base)
    })

    it("does not apply the item speed boost when Unburden is already active", () => {
      const p = new Pokemon("Whimsicott", { evs: { spe: 252 }, nature: "Timid", ability: "Unburden", abilityOn: true, item: "Choice Scarf" })

      const withScarf = getFinalSpeed(p, new Field(), new Field().attackerSide)

      const noScarf = new Pokemon("Whimsicott", { evs: { spe: 252 }, nature: "Timid", ability: "Unburden", abilityOn: true })
      const unburdenOnly = getFinalSpeed(noScarf, new Field(), new Field().attackerSide)

      expect(withScarf).toEqual(unburdenOnly)
    })

    it("halves speed while holding Iron Ball", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", item: "Iron Ball" })
      const noItem = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })

      const ironBallSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(noItem, new Field(), new Field().attackerSide)

      expect(ironBallSpeed).toEqual(Math.floor(baseSpeed / 2))
    })

    it("doubles speed with Quick Powder on Ditto", () => {
      const p = new Pokemon("Ditto", { evs: { spe: 252 }, nature: "Timid", item: "Quick Powder" as never })
      const noItem = new Pokemon("Ditto", { evs: { spe: 252 }, nature: "Timid" })

      const quickPowderSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(noItem, new Field(), new Field().attackerSide)

      expect(quickPowderSpeed).toEqual(baseSpeed * 2)
    })

    it("does not halve speed with paralysis when the Pokémon has Quick Feet", () => {
      const p = new Pokemon("Ursaring", { evs: { spe: 252 }, nature: "Jolly", ability: "Quick Feet", status: "par" })
      const healthyNoAbility = new Pokemon("Ursaring", { evs: { spe: 252 }, nature: "Jolly" })

      const parSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(healthyNoAbility, new Field(), new Field().attackerSide)

      expect(parSpeed).toEqual(Math.floor(baseSpeed * 1.5))
    })

    it("applies positive speed boosts", () => {
      const p = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid", boosts: { spe: 2 } })
      const base = new Pokemon("Dragapult", { evs: { spe: 252 }, nature: "Timid" })

      const boostedSpeed = getFinalSpeed(p, new Field(), new Field().attackerSide)
      const baseSpeed = getFinalSpeed(base, new Field(), new Field().attackerSide)

      expect(boostedSpeed).toEqual(Math.floor((baseSpeed * 4) / 2))
    })
  })

  describe("isQPActive", () => {
    it("returns false when the Pokémon has no boostedStat set", () => {
      const p = new Pokemon("Iron Bundle", { ability: "Quark Drive" })
      expect(isQPActive(p, new Field())).toBe(false)
    })

    it("returns true for Protosynthesis in Sun", () => {
      const p = new Pokemon("Flutter Mane", { ability: "Protosynthesis", boostedStat: "spa" })
      expect(isQPActive(p, new Field({ weather: "Sun" }))).toBe(true)
    })

    it("returns true for Protosynthesis with Booster Energy regardless of weather", () => {
      const p = new Pokemon("Flutter Mane", { ability: "Protosynthesis", boostedStat: "spa", item: "Booster Energy" })
      expect(isQPActive(p, new Field())).toBe(true)
    })

    it("returns true for Quark Drive on Electric Terrain", () => {
      const p = new Pokemon("Iron Bundle", { ability: "Quark Drive", boostedStat: "spe" })
      expect(isQPActive(p, new Field({ terrain: "Electric" }))).toBe(true)
    })

    it("returns true for Quark Drive with Booster Energy regardless of terrain", () => {
      const p = new Pokemon("Iron Bundle", { ability: "Quark Drive", boostedStat: "spe", item: "Booster Energy" })
      expect(isQPActive(p, new Field())).toBe(true)
    })

    it("returns true when boostedStat is explicitly set and not auto, even without the matching ability", () => {
      const p = new Pokemon("Garchomp", { boostedStat: "atk" })
      expect(isQPActive(p, new Field())).toBe(true)
    })
  })

  describe("getQPBoostedStat", () => {
    it("returns the explicitly set boostedStat when it is not auto", () => {
      const p = new Pokemon("Iron Bundle", { boostedStat: "spa" })
      expect(getQPBoostedStat(p)).toBe("spa")
    })

    it("returns the highest of def/spa/spd/spe when boostedStat is auto", () => {
      const p = new Pokemon("Iron Bundle", { boostedStat: "auto", evs: { spe: 252 }, nature: "Timid" })
      expect(getQPBoostedStat(p)).toBe("spe")
    })
  })

  describe("getWeight", () => {
    it("returns the Pokémon's weight in kg unmodified", () => {
      const p = new Pokemon("Garchomp")
      const description = {} as RawDesc

      expect(getWeight(p, description, "attacker")).toBe(p.weightKg)
    })

    it("doubles weight with Heavy Metal and records the ability", () => {
      const p = new Pokemon("Aggron", { ability: "Heavy Metal" })
      const description = {} as RawDesc

      expect(getWeight(p, description, "defender")).toBe(p.weightKg * 2)
      expect(description.defenderAbility).toBe("Heavy Metal")
    })

    it("halves weight with Light Metal and records the ability", () => {
      const p = new Pokemon("Skarmory", { ability: "Light Metal" })
      const description = {} as RawDesc

      expect(getWeight(p, description, "attacker")).toBe(25.2)
      expect(description.attackerAbility).toBe("Light Metal")
    })

    it("halves weight with Float Stone and records the item", () => {
      const p = new Pokemon("Garchomp", { item: "Float Stone" })
      const description = {} as RawDesc

      expect(getWeight(p, description, "attacker")).toBe(p.weightKg / 2)
      expect(description.attackerItem).toBe("Float Stone")
    })
  })

  describe("getStabMod", () => {
    it("returns 6144 for STAB", () => {
      const p = new Pokemon("Garchomp", {})

      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(6144)
    })

    it("returns 4096 for no STAB", () => {
      const p = new Pokemon("Garchomp", {})

      const m = new Move("Ice Fang")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Ice Fang" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(4096)
    })

    it("returns 8192 for Adaptability STAB", () => {
      const p = new Pokemon("Dragapult", { ability: "Adaptability" })

      const m = new Move("Dragon Darts")
      const description = { attackerName: "Dragapult", defenderName: "", moveName: "Dragon Darts" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(8192)
    })

    it("returns 8192 for Tera boosting original-type STAB", () => {
      const p = new Pokemon("Garchomp", { teraType: "Ground" })

      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(8192)
    })

    it("returns 6144 for Tera on a non-original type but original STAB move", () => {
      const p = new Pokemon("Garchomp", { teraType: "Fire" })

      const m = new Move("Earthquake")
      const description = { attackerName: "Garchomp", defenderName: "", moveName: "Earthquake" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(6144)
    })

    it("returns 6144 for Protean granting STAB on a non-original type move, crediting the ability", () => {
      const p = new Pokemon("Greninja", { ability: "Protean" })

      const m = new Move("Ice Beam")
      const description = { attackerName: "Greninja", defenderName: "", moveName: "Ice Beam" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(6144)
      expect(description.attackerAbility).toBe("Protean")
    })

    it("does not grant Protean STAB when the attacker is Terastalized into a different type", () => {
      const p = new Pokemon("Greninja", { ability: "Protean", teraType: "Fire" })

      const m = new Move("Ice Beam")
      const description = { attackerName: "Greninja", defenderName: "", moveName: "Ice Beam" } as RawDesc

      expect(getStabMod(p, m, description)).toBe(4096)
    })
  })

  describe("countBoosts", () => {
    it("sums only positive boosts", () => {
      const boosts = { hp: 0, atk: 2, def: -1, spa: 1, spd: 0, spe: 3 }
      expect(countBoosts(boosts as never)).toBe(6)
    })
  })

  describe("getStatDescriptionText", () => {
    it("returns correct text for plus-nature attack stat", () => {
      const p = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      expect(getStatDescriptionText(p, "atk")).toBe("252+ Atk")
    })

    it("returns correct text for minus-nature stat", () => {
      const p = new Pokemon("Garchomp", { evs: { spe: 252 }, nature: "Adamant" })
      expect(getStatDescriptionText(p, "spa")).toBe("0- SpA")
    })

    it("returns correct text for HP EVs", () => {
      const p = new Pokemon("Pelipper", { evs: { hp: 252 } })
      expect(getStatDescriptionText(p, "hp")).toBe("252 HP")
    })
  })

  describe("isGrounded", () => {
    it("grounds a non-Flying Pokemon", () => {
      expect(isGrounded(new Pokemon("Garchomp"), new Field())).toBe(true)
    })

    it("does not ground a Flying type", () => {
      expect(isGrounded(new Pokemon("Corviknight"), new Field())).toBe(false)
    })

    it("grounds a Flying type under Gravity", () => {
      expect(isGrounded(new Pokemon("Corviknight"), new Field({ isGravity: true }))).toBe(true)
    })

    it("does not ground a Levitate Pokemon", () => {
      expect(isGrounded(new Pokemon("Hydreigon", { ability: "Levitate" }), new Field())).toBe(false)
    })

    it("does not ground an Eelevate Pokemon", () => {
      expect(isGrounded(new Pokemon("Eelektross", { ability: "Eelevate" as never }), new Field())).toBe(false)
    })

    it("does not ground a Pokemon holding Air Balloon", () => {
      expect(isGrounded(new Pokemon("Garchomp", { item: "Air Balloon" }), new Field())).toBe(false)
    })

    it("grounds a Pokemon holding Iron Ball even if it would otherwise be airborne", () => {
      expect(isGrounded(new Pokemon("Corviknight", { item: "Iron Ball" }), new Field())).toBe(true)
    })
  })
})
