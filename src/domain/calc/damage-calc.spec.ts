import { calculate, calculateMulti, Field, Move, Pokemon, Side } from "@calc"

describe("Damage Calc Service (new)", () => {
  describe("Base damage", () => {
    it("physical STAB move", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Darkest Lariat")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Darkest Lariat vs. 0 HP / 0 Def Arcanine: 88-105 (53.3 - 63.6%) -- guaranteed 2HKO")
      expect(result.damage).toEqual([88, 90, 90, 91, 93, 94, 94, 96, 97, 97, 99, 100, 100, 102, 103, 105])
    })

    it("special STAB move", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 196 }, nature: "Modest" })
      const defender = new Pokemon("Tyranitar", { evs: { hp: 252, spd: 4 } })
      const move = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("196+ SpA Gardevoir Moonblast vs. 252 HP / 4 SpD Tyranitar: 168-198 (81.1 - 95.6%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(168)
      expect((result.damage as number[])[15]).toEqual(198)
    })

    it("super-effective move (2x)", () => {
      const attacker = new Pokemon("Chandelure", { evs: { spa: 172 }, nature: "Modest" })
      const defender = new Pokemon("Avalugg", { evs: { hp: 252, def: 252 }, nature: "Bold" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("172+ SpA Chandelure Flamethrower vs. 252 HP / 0 SpD Avalugg: 318-374 (157.4 - 185.1%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(318)
      expect((result.damage as number[])[15]).toEqual(374)
    })

    it("not very effective move (0.5x)", () => {
      const attacker = new Pokemon("Volcarona", { evs: { spa: 124 }, nature: "Modest" })
      const defender = new Pokemon("Arcanine", { evs: { hp: 244, spd: 12 } })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("124+ SpA Volcarona Flamethrower vs. 244 HP / 12 SpD Arcanine: 46-55 (23.4 - 28%) -- 90.1% chance to 4HKO")
      expect((result.damage as number[])[0]).toEqual(46)
      expect((result.damage as number[])[15]).toEqual(55)
    })

    it("immune type (0x) — Normal vs Ghost", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gengar", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("spread damage reduction (0.75x) in Doubles", () => {
      const attacker = new Pokemon("Manectric", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, spd: 100 } })
      const move = new Move("Discharge")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Manectric Discharge vs. 252 HP / 100 SpD Incineroar: 42-51 (20.7 - 25.2%) -- 0.1% chance to 4HKO")
      expect((result.damage as number[])[0]).toEqual(42)
      expect((result.damage as number[])[15]).toEqual(51)
    })
  })

  describe("Base Power — variable move formulas", () => {
    it("Payback: doubles BP when attacker moves last", () => {
      const attacker = new Pokemon("Hydreigon", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gardevoir", { evs: { spe: 252 }, nature: "Timid" })
      const move = new Move("Payback")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Hydreigon Payback (100 BP) vs. 0 HP / 0 Def Gardevoir: 115-136 (80.4 - 95.1%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(115)
      expect((result.damage as number[])[15]).toEqual(136)
    })

    it("Electro Ball: r>=4 → BP 150", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252, spe: 252 }, nature: "Timid" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Electro Ball")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Ampharos Electro Ball (60 BP) vs. 0 HP / 0 SpD Incineroar: 52-63 (30.5 - 37%) -- 66.9% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(52)
      expect((result.damage as number[])[15]).toEqual(63)
    })

    it("Gyro Ball: slow attacker vs fast defender → high BP", () => {
      const attacker = new Pokemon("Avalugg", { evs: { atk: 252 } })
      const defender = new Pokemon("Arcanine", { evs: { spe: 252 }, nature: "Timid" })
      const move = new Move("Gyro Ball")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 Atk Avalugg Gyro Ball (84 BP) vs. 0 HP / 0 Def Arcanine: 27-32 (16.3 - 19.3%) -- possible 6HKO")
      expect((result.damage as number[])[0]).toEqual(27)
      expect((result.damage as number[])[15]).toEqual(32)
    })

    it("Low Kick: heavy target (>=200 kg) → BP 120", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Snorlax", {})
      const move = new Move("Low Kick")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Low Kick (120 BP) vs. 0 HP / 0 Def Snorlax: 194-230 (82.5 - 97.8%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(194)
      expect((result.damage as number[])[15]).toEqual(230)
    })

    it("Grass Knot: heavy target → BP 120", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Snorlax", {})
      const move = new Move("Grass Knot")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Gardevoir Grass Knot (120 BP) vs. 0 HP / 0 SpD Snorlax: 62-73 (26.3 - 31%) -- guaranteed 4HKO")
      expect((result.damage as number[])[0]).toEqual(62)
      expect((result.damage as number[])[15]).toEqual(73)
    })

    it("Hex: doubles BP when defender has status", () => {
      const attacker = new Pokemon("Sableye", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Arcanine", { status: "brn" })
      const move = new Move("Hex")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Sableye Hex (130 BP) vs. 0 HP / 0 SpD Arcanine: 94-112 (56.9 - 67.8%) -- guaranteed 2HKO after burn damage")
      expect((result.damage as number[])[0]).toEqual(94)
      expect((result.damage as number[])[15]).toEqual(112)
    })

    it("Heavy Slam: large weight ratio → BP 120", () => {
      const attacker = new Pokemon("Snorlax", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Heavy Slam")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Snorlax Heavy Slam (120 BP) vs. 0 HP / 0 Def Gardevoir: 190-224 (132.8 - 156.6%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(190)
      expect((result.damage as number[])[15]).toEqual(224)
    })

    it("Stored Power: BP scales with positive boosts", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", boosts: { spa: 4, spe: 2 } })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Stored Power")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("+4 252 SpA Gardevoir Stored Power (140 BP) vs. 0 HP / 0 SpD Arcanine: 418-493 (253.3 - 298.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(418)
      expect((result.damage as number[])[15]).toEqual(493)
    })

    it("Acrobatics: doubles BP without item", () => {
      const attacker = new Pokemon("Hawlucha", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Acrobatics")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Hawlucha Acrobatics (110 BP) vs. 0 HP / 0 Def Incineroar: 90-106 (52.9 - 62.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(90)
      expect((result.damage as number[])[15]).toEqual(106)
    })

    it("Acrobatics: doubles BP with Booster Energy consumed when Protosynthesis is active", () => {
      const attacker = new Pokemon("Roaring Moon", { evs: { atk: 252 }, nature: "Adamant", ability: "Protosynthesis", item: "Booster Energy", abilityOn: true, boostedStat: "atk" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, def: 252 }, nature: "Impish" })
      const move = new Move("Acrobatics")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Protosynthesis Roaring Moon Acrobatics (110 BP) vs. 252 HP / 252+ Def Incineroar: 73-86 (36.1 - 42.5%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(73)
      expect((result.damage as number[])[15]).toEqual(86)
    })

    it("Weather Ball: doubles BP in weather, changes type", () => {
      const attacker = new Pokemon("Charizard-Mega-Y", { evs: { spa: 0 } })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Weather Ball")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("0 SpA Charizard-Mega-Y Weather Ball (100 BP Fire) vs. 0 HP / 0 SpD Gardevoir in Sun: 114-135 (79.7 - 94.4%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(114)
      expect((result.damage as number[])[15]).toEqual(135)
    })

    it("Terrain Pulse: doubles BP when grounded in terrain", () => {
      const attacker = new Pokemon("Kangaskhan", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Terrain Pulse")
      const field = new Field({ gameType: "Doubles", terrain: "Electric" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Kangaskhan Terrain Pulse (100 BP Electric) vs. 0 HP / 0 SpD Incineroar in Electric Terrain: 45-54 (26.4 - 31.7%) -- guaranteed 4HKO")
      expect((result.damage as number[])[0]).toEqual(45)
      expect((result.damage as number[])[15]).toEqual(54)
    })

    it("Rising Voltage: doubles BP vs grounded target in Electric Terrain", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Rising Voltage")
      const field = new Field({ gameType: "Doubles", terrain: "Electric" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Rising Voltage (140 BP) vs. 0 HP / 0 SpD Incineroar in Electric Terrain: 171-202 (100.5 - 118.8%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(171)
      expect((result.damage as number[])[15]).toEqual(202)
    })

    it("Eruption: BP at full HP = 150", () => {
      const attacker = new Pokemon("Typhlosion", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Eruption")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Typhlosion Eruption (150 BP) vs. 0 HP / 0 SpD Gardevoir: 84-99 (58.7 - 69.2%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(84)
      expect((result.damage as number[])[15]).toEqual(99)
    })

    it("Flail: near faint (p<=1) → BP 200", () => {
      const attacker = new Pokemon("Arcanine", { evs: { atk: 252 }, nature: "Adamant" })
      attacker.originalCurrrentHp = Math.round(attacker.maxHp() * 0.02)
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Reversal")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Arcanine Reversal (200 BP) vs. 0 HP / 0 Def Gardevoir: 39-46 (27.2 - 32.1%) -- guaranteed 4HKO")
    })

    it("Hard Press: full HP target → BP near 100", () => {
      const attacker = new Pokemon("Metagross", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Hard Press")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Metagross Hard Press (100 BP) vs. 0 HP / 0 Def Arcanine: 58-69 (35.1 - 41.8%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(58)
      expect((result.damage as number[])[15]).toEqual(69)
    })

    it("Fling: with Iron Ball → BP 130", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Iron Ball" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Fling")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Iron Ball Incineroar Fling (130 BP) vs. 0 HP / 0 Def Gardevoir: 159-187 (111.1 - 130.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(159)
      expect((result.damage as number[])[15]).toEqual(187)
    })
  })

  describe("Attacker abilities", () => {
    it("Technician: boosts moves with BP<=60 by 1.5x", () => {
      const attacker = new Pokemon("Scizor", { evs: { atk: 252 }, nature: "Adamant", ability: "Technician" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Bullet Punch")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Technician Scizor Bullet Punch vs. 0 HP / 0 Def Arcanine: 33-40 (20 - 24.2%) -- guaranteed 5HKO")
      expect((result.damage as number[])[0]).toEqual(33)
      expect((result.damage as number[])[15]).toEqual(40)
    })

    it("Strong Jaw: boosts biting moves by 1.5x", () => {
      const attacker = new Pokemon("Sharpedo-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Strong Jaw" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Bite")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Strong Jaw Sharpedo-Mega Bite vs. 0 HP / 0 Def Arcanine: 108-127 (65.4 - 76.9%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(108)
      expect((result.damage as number[])[15]).toEqual(127)
    })

    it("Sharpness: boosts slicing moves by 1.5x", () => {
      const attacker = new Pokemon("Gallade", { evs: { atk: 252 }, nature: "Adamant", ability: "Sharpness" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Sacred Sword")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Sharpness Gallade Sacred Sword vs. 0 HP / 0 Def Arcanine: 148-175 (89.6 - 106%) -- 37.5% chance to OHKO")
      expect((result.damage as number[])[0]).toEqual(148)
      expect((result.damage as number[])[15]).toEqual(175)
    })

    it("Mega Launcher: boosts pulse moves by 1.5x", () => {
      const attacker = new Pokemon("Clawitzer", { evs: { spa: 252 }, nature: "Modest", ability: "Mega Launcher" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Water Pulse")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Mega Launcher Clawitzer Water Pulse vs. 0 HP / 0 SpD Incineroar: 176-210 (103.5 - 123.5%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(176)
      expect((result.damage as number[])[15]).toEqual(210)
    })

    it("Tough Claws: boosts contact moves by 1.3x", () => {
      const attacker = new Pokemon("Charizard-Mega-X", { evs: { atk: 252 }, nature: "Adamant", ability: "Tough Claws" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Dragon Claw")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Tough Claws Charizard-Mega-X Dragon Claw vs. 0 HP / 0 Def Incineroar: 108-127 (63.5 - 74.7%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(108)
      expect((result.damage as number[])[15]).toEqual(127)
    })

    it("Iron Fist: boosts punching moves by 1.2x", () => {
      const attacker = new Pokemon("Infernape", { evs: { atk: 252 }, nature: "Adamant", ability: "Iron Fist" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Fire Punch")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Iron Fist Infernape Fire Punch vs. 0 HP / 0 Def Gardevoir: 102-121 (71.3 - 84.6%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(102)
      expect((result.damage as number[])[15]).toEqual(121)
    })

    it("Sheer Force: boosts moves with secondary effects by 1.3x", () => {
      const attacker = new Pokemon("Mawile", { evs: { atk: 252 }, nature: "Adamant", ability: "Sheer Force" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Iron Head")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Sheer Force Mawile Iron Head vs. 0 HP / 0 Def Arcanine: 44-52 (26.6 - 31.5%) -- guaranteed 4HKO")
      expect((result.damage as number[])[0]).toEqual(44)
      expect((result.damage as number[])[15]).toEqual(52)
    })

    it("Reckless: boosts recoil moves by 1.2x", () => {
      const attacker = new Pokemon("Staraptor", { evs: { atk: 252 }, nature: "Adamant", ability: "Reckless" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Brave Bird")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Reckless Staraptor Brave Bird vs. 0 HP / 0 Def Incineroar: 139-165 (81.7 - 97%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(139)
      expect((result.damage as number[])[15]).toEqual(165)
    })

    it("Sand Force: boosts Rock/Ground/Steel in Sand by 1.3x", () => {
      const attacker = new Pokemon("Excadrill", { evs: { atk: 252 }, nature: "Adamant", ability: "Sand Force" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Iron Head")
      const field = new Field({ gameType: "Doubles", weather: "Sand" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Sand Force Excadrill Iron Head vs. 0 HP / 0 Def Gardevoir: 284-336 (198.6 - 234.9%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(284)
      expect((result.damage as number[])[15]).toEqual(336)
    })

    it("Adaptability: STAB becomes 2x", () => {
      const attacker = new Pokemon("Dragalge", { evs: { spa: 252 }, nature: "Modest", ability: "Adaptability" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Draco Meteor")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Adaptability Dragalge Draco Meteor vs. 0 HP / 0 SpD Arcanine: 160-190 (96.9 - 115.1%) -- 81.3% chance to OHKO")
      expect((result.damage as number[])[0]).toEqual(160)
      expect((result.damage as number[])[15]).toEqual(190)
    })

    it("Guts: boosts physical Attack by 1.5x when statused", () => {
      const attacker = new Pokemon("Flareon", { evs: { atk: 252 }, nature: "Adamant", ability: "Guts", status: "brn" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Flare Blitz")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Guts Flareon Flare Blitz vs. 0 HP / 0 Def Arcanine: 102-120 (61.8 - 72.7%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(102)
      expect((result.damage as number[])[15]).toEqual(120)
    })

    it("Huge Power: doubles physical Attack", () => {
      const attacker = new Pokemon("Azumarill", { evs: { atk: 252 }, nature: "Adamant", ability: "Huge Power" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Play Rough")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Huge Power Azumarill Play Rough vs. 0 HP / 0 Def Incineroar: 103-123 (60.5 - 72.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(103)
      expect((result.damage as number[])[15]).toEqual(123)
    })

    it("Water Bubble: doubles Water-type attack", () => {
      const attacker = new Pokemon("Araquanid", { evs: { atk: 252 }, nature: "Adamant", ability: "Water Bubble" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Liquidation")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Water Bubble Araquanid Liquidation vs. 0 HP / 0 Def Incineroar: 236-278 (138.8 - 163.5%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(236)
      expect((result.damage as number[])[15]).toEqual(278)
    })

    it("Solar Power: boosts Special Attack by 1.5x in Sun", () => {
      const attacker = new Pokemon("Charizard", { evs: { spa: 252 }, nature: "Modest", ability: "Solar Power" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Solar Power Charizard Flamethrower vs. 0 HP / 0 SpD Gardevoir in Sun: 150-177 (104.8 - 123.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(150)
      expect((result.damage as number[])[15]).toEqual(177)
    })

    it("Flash Fire (active): boosts Fire moves by 1.5x", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", ability: "Flash Fire", abilityOn: true })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Flash Fire Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir: 94-112 (65.7 - 78.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(94)
      expect((result.damage as number[])[15]).toEqual(112)
    })

    it("Parental Bond: adds child hit at 0.25x", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Facade")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Parental Bond Kangaskhan-Mega Facade vs. 0 HP / 0 Def Arcanine: 94-113 (56.9 - 68.4%) -- guaranteed 2HKO")
      expect(Array.isArray((result.damage as unknown[])[0])).toBe(true)
    })

    it("Parental Bond: child hit deals exactly 0.25x of the first hit's damage", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Facade")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)
      const [firstHitDamage, childHitDamage] = result.damage as [number[], number[]]

      expect(firstHitDamage).toEqual([76, 78, 79, 79, 81, 81, 82, 84, 84, 85, 85, 87, 88, 88, 90, 91])
      expect(childHitDamage).toEqual([18, 18, 19, 19, 19, 19, 19, 19, 19, 21, 21, 21, 21, 21, 21, 22])
    })

    it("Parental Bond: Assurance child hit deals double base power because the target was already hurt", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { evs: { atk: 252 }, nature: "Adamant", ability: "Parental Bond" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Assurance")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)
      const [firstHitDamage, childHitDamage] = result.damage as [number[], number[]]

      expect(firstHitDamage).toEqual([45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 53])
      expect(childHitDamage).toEqual([22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 26])
    })

    it("Sniper: boosts crit multiplier to 2.25x", () => {
      const attacker = new Pokemon("Beedrill", { evs: { atk: 252 }, nature: "Adamant", ability: "Sniper" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Cross Poison", { isCrit: true })
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Sniper Beedrill Cross Poison vs. 0 HP / 0 Def Gardevoir on a critical hit: 327-390 (228.6 - 272.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(327)
      expect((result.damage as number[])[15]).toEqual(390)
    })

    it("Overgrow: boosts Grass moves when HP<=1/3", () => {
      const attacker = new Pokemon("Venusaur", { evs: { spa: 252 }, nature: "Modest", ability: "Overgrow" })
      attacker.originalCurrrentHp = Math.round(attacker.maxHp() * 0.33)
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Giga Drain")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Overgrow Venusaur Giga Drain vs. 0 HP / 0 SpD Incineroar: 48-57 (28.2 - 33.5%) -- 0.5% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(48)
      expect((result.damage as number[])[15]).toEqual(57)
    })
  })

  describe("Defender abilities", () => {
    it("Thick Fat: halves Fire and Ice damage", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 76 }, nature: "Careful", ability: "Thick Fat" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 252 HP / 76+ SpD Thick Fat Snorlax: 28-34 (10.4 - 12.7%) -- possible 8HKO")
      expect((result.damage as number[])[0]).toEqual(28)
      expect((result.damage as number[])[15]).toEqual(34)
    })

    it("Purifying Salt: halves Ghost damage", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Garganacl", { ability: "Purifying Salt" })
      const move = new Move("Shadow Ball")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Gardevoir Shadow Ball vs. 0 HP / 0 SpD Purifying Salt Garganacl: 25-30 (14.2 - 17.1%) -- possible 6HKO")
      expect((result.damage as number[])[0]).toEqual(25)
      expect((result.damage as number[])[15]).toEqual(30)
    })

    it("Multiscale: halves damage at full HP", () => {
      const attacker = new Pokemon("Arcanine", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Dragonite", { ability: "Multiscale", evs: { hp: 252 } })
      const move = new Move("Wild Charge")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Arcanine Wild Charge vs. 252 HP / 0 Def Multiscale Dragonite: 26-31 (13.1 - 15.6%) -- possible 7HKO")
      expect((result.damage as number[])[0]).toEqual(26)
      expect((result.damage as number[])[15]).toEqual(31)
    })

    it("Solid Rock / Filter: reduces super-effective moves to 0.75x", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Rhyperior", { evs: { hp: 252, def: 100 }, nature: "Impish", ability: "Solid Rock" })
      const move = new Move("Close Combat")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Close Combat vs. 252 HP / 100+ Def Solid Rock Rhyperior: 69-82 (31 - 36.9%) -- 73% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(69)
      expect((result.damage as number[])[15]).toEqual(82)
    })

    it("Fur Coat: doubles physical Defense", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Furfrou", { ability: "Fur Coat" })
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Fake Out vs. 0 HP / 0 Def Fur Coat Furfrou: 18-22 (12 - 14.6%) -- possible 7HKO")
      expect((result.damage as number[])[0]).toEqual(18)
      expect((result.damage as number[])[15]).toEqual(22)
    })

    it("Marvel Scale: boosts Defense by 1.5x when statused", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Milotic", { ability: "Marvel Scale", status: "brn" })
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Fake Out vs. 0 HP / 0 Def Marvel Scale Milotic: 19-23 (11.1 - 13.5%) -- guaranteed 6HKO after burn damage")
      expect((result.damage as number[])[0]).toEqual(19)
      expect((result.damage as number[])[15]).toEqual(23)
    })

    it("Unaware: ignores attacker boosts", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", boosts: { spa: 6 } })
      const defender = new Pokemon("Clefable", { ability: "Unaware" })
      const move = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Gardevoir Moonblast vs. 0 HP / 0 SpD Unaware Clefable: 87-103 (51.1 - 60.5%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(87)
      expect((result.damage as number[])[15]).toEqual(103)
    })

    it("Water Bubble (defender): halves Fire damage", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Araquanid", { ability: "Water Bubble" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 0 HP / 0 SpD Water Bubble Araquanid: 28-34 (19.5 - 23.7%) -- possible 5HKO")
      expect((result.damage as number[])[0]).toEqual(28)
      expect((result.damage as number[])[15]).toEqual(34)
    })

    it("Dry Skin: amplifies Fire damage by 1.25x", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 164 }, nature: "Modest" })
      const defender = new Pokemon("Heliolisk", { evs: { hp: 100 }, ability: "Dry Skin" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("164+ SpA Arcanine Flamethrower vs. 100 HP / 0 SpD Dry Skin Heliolisk: 87-103 (58 - 68.6%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(87)
      expect((result.damage as number[])[15]).toEqual(103)
    })

    it("Friend Guard: reduces damage to ally by 0.75x", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles", defenderSide: new Side({ isFriendGuard: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Thunderbolt vs. 0 HP / 0 SpD Incineroar with an ally's Friend Guard: 63-75 (37 - 44.1%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(63)
      expect((result.damage as number[])[15]).toEqual(75)
    })
  })

  describe("Immunity abilities (0 damage)", () => {
    it("Sap Sipper: immune to Grass moves", () => {
      const attacker = new Pokemon("Appletun", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Azumarill", { ability: "Sap Sipper" })
      const move = new Move("Giga Drain")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Flash Fire (passive): immune to Fire moves", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Arcanine", { ability: "Flash Fire" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Water Absorb: immune to Water moves", () => {
      const attacker = new Pokemon("Araquanid", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Vaporeon", { ability: "Water Absorb" })
      const move = new Move("Liquidation")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Lightning Rod: immune to Electric moves", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Rhyperior", { ability: "Lightning Rod" })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Volt Absorb: immune to Electric moves", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Jolteon", { ability: "Volt Absorb" })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Earth Eater: immune to Ground moves", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Orthworm", { ability: "Earth Eater" })
      const move = new Move("Earthquake")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Bulletproof: immune to ball/bomb moves", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Kommo-o", { ability: "Bulletproof" })
      const move = new Move("Electro Ball")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Queenly Majesty: immune to priority moves", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Tsareena", { ability: "Queenly Majesty" })
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })
  })

  describe("Items (attacker)", () => {
    it("Choice Band: 1.5x physical Attack", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 156 }, nature: "Adamant", item: "Choice Band" })
      const defender = new Pokemon("Arcanine", { evs: { hp: 252, def: 116 } })
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("156+ Atk Choice Band Incineroar Fake Out vs. 252 HP / 116 Def Arcanine: 34-41 (17.2 - 20.8%) -- possible 5HKO")
      expect((result.damage as number[])[0]).toEqual(34)
      expect((result.damage as number[])[15]).toEqual(41)
    })

    it("Choice Specs: 1.5x Special Attack", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", item: "Choice Specs" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Choice Specs Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir: 94-112 (65.7 - 78.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(94)
      expect((result.damage as number[])[15]).toEqual(112)
    })

    it("Life Orb: 1.3x damage", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 200 }, nature: "Modest", item: "Life Orb" })
      const defender = new Pokemon("Gardevoir", { evs: { hp: 156, spd: 100 } })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("200+ SpA Life Orb Arcanine Flamethrower vs. 156 HP / 100 SpD Gardevoir: 71-86 (43.5 - 52.7%) -- 13.7% chance to 2HKO")
      expect((result.damage as number[])[0]).toEqual(71)
      expect((result.damage as number[])[15]).toEqual(86)
    })

    it("Expert Belt: 1.2x on super-effective hits", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", item: "Expert Belt" })
      const defender = new Pokemon("Avalugg", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Expert Belt Arcanine Flamethrower vs. 0 HP / 0 SpD Avalugg: 310-367 (182.3 - 215.8%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(310)
      expect((result.damage as number[])[15]).toEqual(367)
    })

    it("Muscle Band: 1.1x physical moves", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant", item: "Muscle Band" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Muscle Band Incineroar Fake Out vs. 0 HP / 0 Def Arcanine: 31-37 (18.7 - 22.4%) -- possible 5HKO")
      expect((result.damage as number[])[0]).toEqual(31)
      expect((result.damage as number[])[15]).toEqual(37)
    })

    it("Wise Glasses: 1.1x special moves", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", item: "Wise Glasses" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Wise Glasses Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir: 69-82 (48.2 - 57.3%) -- 91% chance to 2HKO")
      expect((result.damage as number[])[0]).toEqual(69)
      expect((result.damage as number[])[15]).toEqual(82)
    })

    it("Type-boost item (Charcoal): 1.2x Fire moves", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", item: "Charcoal" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Charcoal Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir: 76-90 (53.1 - 62.9%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(76)
      expect((result.damage as number[])[15]).toEqual(90)
    })
  })

  describe("Field conditions", () => {
    it("Sun: boosts Fire moves by 1.5x", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 220 }, nature: "Modest" })
      const defender = new Pokemon("Gardevoir", { evs: { hp: 252, spd: 196 }, nature: "Calm" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("220+ SpA Arcanine Flamethrower vs. 252 HP / 196+ SpD Gardevoir in Sun: 72-85 (41.1 - 48.5%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(72)
      expect((result.damage as number[])[15]).toEqual(85)
    })

    it("Sun: weakens Water moves by 0.5x", () => {
      const attacker = new Pokemon("Politoed", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Surf")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Politoed Surf vs. 0 HP / 0 SpD Incineroar in Sun: 50-62 (29.4 - 36.4%) -- 52.5% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(50)
      expect((result.damage as number[])[15]).toEqual(62)
    })

    it("Rain: boosts Water moves by 1.5x", () => {
      const attacker = new Pokemon("Politoed", { evs: { spa: 108 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, spd: 52 } })
      const move = new Move("Surf")
      const field = new Field({ gameType: "Doubles", weather: "Rain" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("108+ SpA Politoed Surf vs. 252 HP / 52 SpD Incineroar in Rain: 134-162 (66.3 - 80.1%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(134)
      expect((result.damage as number[])[15]).toEqual(162)
    })

    it("Sand: boosts Rock SpDef by 1.5x", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Tyranitar", { evs: { spd: 252 } })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles", weather: "Sand" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Thunderbolt vs. 0 HP / 252 SpD Tyranitar in Sand: 42-49 (24 - 28%) -- 89.4% chance to 4HKO")
      expect((result.damage as number[])[0]).toEqual(42)
      expect((result.damage as number[])[15]).toEqual(49)
    })

    it("Snow: boosts Ice physical Defense by 1.5x", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Avalugg", { evs: { def: 252 }, nature: "Bold" })
      const move = new Move("Earthquake")
      const field = new Field({ gameType: "Doubles", weather: "Snow" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Earthquake vs. 0 HP / 252+ Def Avalugg in Snow: 13-16 (7.6 - 9.4%)")
      expect((result.damage as number[])[0]).toEqual(13)
      expect((result.damage as number[])[15]).toEqual(16)
    })

    it("Electric Terrain: boosts Electric moves by 1.3x for grounded", () => {
      const attacker = new Pokemon("Manectric", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 196 } })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles", terrain: "Electric" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Manectric Thunderbolt vs. 196 HP / 0 SpD Incineroar in Electric Terrain: 103-123 (52.8 - 63%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(103)
      expect((result.damage as number[])[15]).toEqual(123)
    })

    it("Grassy Terrain: boosts Grass moves by 1.3x", () => {
      const attacker = new Pokemon("Appletun", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Giga Drain")
      const field = new Field({ gameType: "Doubles", terrain: "Grassy" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Appletun Giga Drain vs. 0 HP / 0 SpD Incineroar in Grassy Terrain: 42-50 (24.7 - 29.4%) -- 0.1% chance to 4HKO after Grassy Terrain recovery")
      expect((result.damage as number[])[0]).toEqual(42)
      expect((result.damage as number[])[15]).toEqual(50)
    })

    it("Grassy Terrain: weakens Earthquake by 0.5x", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Earthquake")
      const field = new Field({ gameType: "Doubles", terrain: "Grassy" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Earthquake vs. 0 HP / 0 Def Arcanine in Grassy Terrain: 52-62 (31.5 - 37.5%) -- 0.1% chance to 3HKO after Grassy Terrain recovery")
      expect((result.damage as number[])[0]).toEqual(52)
      expect((result.damage as number[])[15]).toEqual(62)
    })

    it("Misty Terrain: weakens Dragon moves by 0.5x vs grounded", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Dragon Claw")
      const field = new Field({ gameType: "Doubles", terrain: "Misty" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).not.toEqual(0)
    })

    it("Psychic Terrain: blocks priority moves vs grounded", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles", terrain: "Psychic" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Reflect: halves physical damage in Doubles", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles", defenderSide: new Side({ isReflect: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Fake Out vs. 0 HP / 0 Def Arcanine through Reflect: 19-23 (11.5 - 13.9%) -- possible 8HKO")
      expect((result.damage as number[])[0]).toEqual(19)
      expect((result.damage as number[])[15]).toEqual(23)
    })

    it("Light Screen: halves special damage in Doubles", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles", defenderSide: new Side({ isLightScreen: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir through Light Screen: 42-50 (29.3 - 34.9%) -- 14% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(42)
      expect((result.damage as number[])[15]).toEqual(50)
    })

    it("Aurora Veil: halves all damage in Doubles", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles", defenderSide: new Side({ isAuroraVeil: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Fake Out vs. 0 HP / 0 Def Arcanine with an ally's Aurora Veil: 19-23 (11.5 - 13.9%) -- possible 8HKO")
      expect((result.damage as number[])[0]).toEqual(19)
      expect((result.damage as number[])[15]).toEqual(23)
    })

    it("Helping Hand: boosts ally's move by 1.5x", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles", attackerSide: new Side({ isHelpingHand: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Arcanine Helping Hand Flamethrower vs. 0 HP / 0 SpD Gardevoir: 94-112 (65.7 - 78.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(94)
      expect((result.damage as number[])[15]).toEqual(112)
    })
  })

  describe("Battery and Power Spot", () => {
    it("Battery: boosts special moves by 1.3x", () => {
      const attacker = new Pokemon("Miraidon", { evs: { hp: 44, def: 4, spa: 244, spd: 12, spe: 204 }, nature: "Modest", ability: "Hadron Engine", abilityOn: true, item: "Choice Specs" })
      const defender = new Pokemon("Koraidon", { evs: { hp: 236, atk: 196, def: 4, spd: 4, spe: 68 }, nature: "Adamant", ability: "Orichalcum Pulse", item: "Clear Amulet" })
      const move = new Move("Draco Meteor")
      const field = new Field({ gameType: "Doubles", terrain: "Electric", attackerSide: new Side({ isBattery: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("244+ SpA Choice Specs Hadron Engine Miraidon Battery boosted Draco Meteor vs. 236 HP / 4 SpD Koraidon: 642-756 (313.1 - 368.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(642)
      expect((result.damage as number[])[15]).toEqual(756)
    })

    it("Battery: does not boost physical moves", () => {
      const attacker = new Pokemon("Miraidon", { evs: { hp: 44, def: 4, spa: 244, spd: 12, spe: 204 }, nature: "Modest", ability: "Hadron Engine", abilityOn: true, item: "Choice Specs" })
      const defender = new Pokemon("Koraidon", { evs: { hp: 236, atk: 196, def: 4, spd: 4, spe: 68 }, nature: "Adamant", ability: "Orichalcum Pulse", item: "Clear Amulet" })
      const move = new Move("Outrage")
      const field = new Field({ gameType: "Doubles", terrain: "Electric", attackerSide: new Side({ isBattery: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).not.toContain("Battery")
    })

    it("Power Spot: boosts all moves by 1.3x", () => {
      const attacker = new Pokemon("Miraidon", { evs: { hp: 44, def: 4, spa: 244, spd: 12, spe: 204 }, nature: "Modest", ability: "Hadron Engine", abilityOn: true, item: "Choice Specs" })
      const defender = new Pokemon("Koraidon", { evs: { hp: 236, atk: 196, def: 4, spd: 4, spe: 68 }, nature: "Adamant", ability: "Orichalcum Pulse", item: "Clear Amulet" })
      const move = new Move("Draco Meteor")
      const field = new Field({ gameType: "Doubles", terrain: "Electric", attackerSide: new Side({ isPowerSpot: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("244+ SpA Choice Specs Hadron Engine Miraidon Power Spot boosted Draco Meteor vs. 236 HP / 4 SpD Koraidon: 642-756 (313.1 - 368.7%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(642)
      expect((result.damage as number[])[15]).toEqual(756)
    })
  })

  describe("Critical hits", () => {
    it("Normal crit: 1.5x damage, ignores negative atk boosts and positive def boosts", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest", boosts: { spa: -1 } })
      const defender = new Pokemon("Gardevoir", { boosts: { spd: 2 } })
      const move = new Move("Flamethrower", { isCrit: true })
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 0 HP / 0 SpD Gardevoir on a critical hit: 94-112 (65.7 - 78.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(94)
      expect((result.damage as number[])[15]).toEqual(112)
    })

    it("Shell Armor: prevents critical hits", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Slowbro-Mega", { ability: "Shell Armor" })
      const move = new Move("Thunderbolt", { isCrit: true })
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Thunderbolt vs. 0 HP / 0 SpD Slowbro-Mega: 186-222 (109.4 - 130.5%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(186)
      expect((result.damage as number[])[15]).toEqual(222)
    })

    it("Merciless: always crits vs poisoned", () => {
      const attacker = new Pokemon("Toxapex", { evs: { spa: 252 }, nature: "Modest", ability: "Merciless" })
      const defenderPoisoned = new Pokemon("Gardevoir", { status: "psn" })
      const defenderHealthy = new Pokemon("Gardevoir", {})
      const move = new Move("Sludge Wave")
      const field = new Field({ gameType: "Doubles" })

      const resultPoisoned = calculate(attacker, defenderPoisoned, move, field)
      const resultHealthy = calculate(attacker, defenderHealthy, move, field)

      expect(resultPoisoned.description()).toContain("on a critical hit")
      expect(resultHealthy.description()).not.toContain("on a critical hit")
    })
  })

  describe("Fixed damage moves", () => {
    it("Seismic Toss: deals damage equal to level (50)", () => {
      const attacker = new Pokemon("Machamp", {})
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Seismic Toss")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("Machamp Seismic Toss vs. 0 HP Arcanine: 50-50 (30.3 - 30.3%) -- guaranteed 4HKO")
      expect(result.damage).toEqual(50)
    })

    it("Super Fang: deals half of target current HP", () => {
      const attacker = new Pokemon("Houndoom", {})
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Super Fang")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("Houndoom Super Fang vs. 0 HP Arcanine: 82-82 (49.6 - 49.6%) -- guaranteed 3HKO")
      expect(result.damage).toEqual(Math.floor(defender.maxHp() / 2))
    })

    it("Final Gambit: deals damage equal to attacker HP", () => {
      const attacker = new Pokemon("Staraptor", { evs: { hp: 252 } })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Final Gambit")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("Staraptor Final Gambit vs. 0 HP Incineroar: 192-192 (112.9 - 112.9%) -- guaranteed OHKO")
      expect(result.damage).toEqual(attacker.maxHp())
    })
  })

  describe("Multi-hit moves", () => {
    it("Triple Axel: multi-hit with progressive BP", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Triple Axel")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Weavile Triple Axel (60 BP) (2 hits) vs. 0 HP / 0 Def Incineroar: 30-36 (17.6 - 21.1%) -- possible 5HKO")
      const dmg = result.damage as unknown as number[][]
      expect(dmg.length).toBeGreaterThanOrEqual(2)
      expect(Math.max(...dmg[dmg.length - 1])).toBeGreaterThan(Math.max(...dmg[0]))
    })
  })

  describe("Special move categories", () => {
    it("Foul Play: uses defender's Attack stat", () => {
      const attacker = new Pokemon("Kingambit", { evs: { atk: 0 } })
      const defender = new Pokemon("Krookodile", { evs: { atk: 252, hp: 4 }, nature: "Adamant" })
      const move = new Move("Foul Play")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Kingambit Foul Play vs. 4 HP / 0 Def Krookodile: 50-59 (29.2 - 34.5%) -- 4.8% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(50)
      expect((result.damage as number[])[15]).toEqual(59)
    })

    it("Body Press: uses attacker's Defense as attack stat", () => {
      const attacker = new Pokemon("Corviknight", { evs: { def: 196 }, nature: "Impish" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, def: 4 } })
      const move = new Move("Body Press")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("196+ Def Corviknight Body Press vs. 252 HP / 4 Def Incineroar: 90-108 (44.5 - 53.4%) -- 33.6% chance to 2HKO")
      expect((result.damage as number[])[0]).toEqual(90)
      expect((result.damage as number[])[15]).toEqual(108)
    })
  })

  describe("Tera type interactions", () => {
    it("Tera STAB: adds STAB bonus for Tera type", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid", teraType: "Fairy" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Tera Fairy Gardevoir Moonblast vs. 0 HP / 0 SpD Incineroar: 116-138 (68.2 - 81.1%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(116)
      expect((result.damage as number[])[15]).toEqual(138)
    })

    it("Tera type changes effectiveness: Tera Steel vs Fairy", () => {
      const attacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Timid" })
      const defender = new Pokemon("Snorlax", { teraType: "Steel" })
      const move = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Gardevoir Moonblast vs. 0 HP / 0 SpD Tera Steel Snorlax: 36-43 (15.3 - 18.2%) -- possible 6HKO")
      expect((result.damage as number[])[0]).toEqual(36)
      expect((result.damage as number[])[15]).toEqual(43)
    })
  })

  describe("Early-return guards", () => {
    it("Status move: returns 0 damage", () => {
      const attacker = new Pokemon("Incineroar", {})
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Will-O-Wisp")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Protected: returns 0 damage", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Fake Out")
      const field = new Field({ gameType: "Doubles", defenderSide: new Side({ isProtected: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })

    it("Steel Roller without terrain: returns 0 damage", () => {
      const attacker = new Pokemon("Metagross", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Steel Roller")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.damage).toEqual(0)
    })
  })

  describe("Composite interactions", () => {
    it("Helping Hand × Life Orb: both boosts stack", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 116 }, nature: "Modest", item: "Life Orb" })
      const defender = new Pokemon("Gardevoir", { evs: { hp: 252, spd: 52 } })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles", attackerSide: new Side({ isHelpingHand: true }) })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("116+ SpA Life Orb Arcanine Helping Hand Flamethrower vs. 252 HP / 52 SpD Gardevoir: 103-122 (58.8 - 69.7%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(103)
      expect((result.damage as number[])[15]).toEqual(122)
    })

    it("Wonder Room: swaps Def and SpDef for damage calc", () => {
      const attacker = new Pokemon("Corviknight", { evs: { def: 252 }, nature: "Impish" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Body Press")
      const field = new Field({ gameType: "Doubles", isWonderRoom: true })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpD (Def) Corviknight Body Press vs. 0 HP / 0 Def (SpD) Arcanine in Wonder Room: 52-62 (31.5 - 37.5%) -- 87.9% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(52)
      expect((result.damage as number[])[15]).toEqual(62)
    })
  })

  describe("Multi calc (two attackers)", () => {
    it("combines two attackers vs one defender", () => {
      const firstAttacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
      const secondAttacker = new Pokemon("Gardevoir", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, spd: 4 } })
      const firstMove = new Move("Earthquake")
      const secondMove = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculateMulti([firstAttacker, secondAttacker], defender, [firstMove, secondMove], field)

      expect(result.description()).toEqual("252+ Atk Garchomp Earthquake AND 252+ SpA Gardevoir Moonblast vs. 252 HP / 0 Def / 4 SpD Incineroar: 246-294 (121.7 - 145.5%) -- guaranteed OHKO")
      expect(result.resultString()).toEqual("121.7 - 145.5%")
      expect(result.getHKO()).toEqual("guaranteed OHKO")
      expect((result.results[0].damage as number[])[0]).toEqual(152)
      expect((result.results[0].damage as number[])[15]).toEqual(182)
      expect((result.results[1].damage as number[])[0]).toEqual(94)
      expect((result.results[1].damage as number[])[15]).toEqual(112)
    })
  })

  describe("Real VGC Matchup", () => {
    it("Ogerpon-Wellspring Ivy Cudgel vs Miraidon", () => {
      const attacker = new Pokemon("Ogerpon-Wellspring", { evs: { hp: 236, atk: 76, def: 148, spd: 92, spe: 20 }, nature: "Adamant", ability: "Water Absorb", item: "Wellspring Mask" })
      const defender = new Pokemon("Miraidon", { evs: { hp: 4, spa: 252, spe: 252 }, nature: "Timid", ability: "Hadron Engine", item: "Choice Specs" })
      const move = new Move("Ivy Cudgel")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("76+ Atk Wellspring Mask Ogerpon-Wellspring Ivy Cudgel vs. 4 HP / 0 Def Miraidon: 46-55 (26.1 - 31.2%) -- guaranteed 4HKO")
      expect((result.damage as number[])[0]).toEqual(46)
      expect((result.damage as number[])[15]).toEqual(55)
    })

    it("Ogerpon-Wellspring Ivy Cudgel vs Koraidon", () => {
      const attacker = new Pokemon("Ogerpon-Wellspring", { evs: { hp: 236, atk: 76, def: 148, spd: 92, spe: 20 }, nature: "Adamant", ability: "Water Absorb", item: "Wellspring Mask" })
      const defender = new Pokemon("Koraidon", { evs: { hp: 36 } })
      const move = new Move("Ivy Cudgel")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("76+ Atk Wellspring Mask Ogerpon-Wellspring Ivy Cudgel vs. 36 HP / 0 Def Koraidon in Sun: 21-24 (11.6 - 13.3%) -- possible 8HKO")
      expect((result.damage as number[])[0]).toEqual(21)
      expect((result.damage as number[])[15]).toEqual(24)
    })

    it("Koraidon Collision Course vs Terapagos-Terastal keeps super-effective boost despite Tera Shell", () => {
      const attacker = new Pokemon("Koraidon", { evs: { hp: 36, atk: 220, spe: 252 }, nature: "Adamant", ability: "Orichalcum Pulse", item: "Clear Amulet", abilityOn: true })
      const defender = new Pokemon("Terapagos-Terastal", { evs: { hp: 252, def: 180, spa: 76 }, nature: "Modest", ability: "Tera Shell", item: "Leftovers", teraType: "Stellar" })
      const move = new Move("Collision Course")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("220+ Atk Orichalcum Pulse Koraidon Collision Course (133.3251953125 BP) vs. 252 HP / 180 Def Tera Shell Terapagos-Terastal: 66-78 (32.6 - 38.6%) -- 3.1% chance to 3HKO after Leftovers recovery")
      expect((result.damage as number[])[0]).toEqual(66)
      expect((result.damage as number[])[15]).toEqual(78)
    })

    it("Koraidon Tera Fire Flame Charge raises base power to 60 (Tera STAB floor)", () => {
      const attacker = new Pokemon("Koraidon", { evs: { hp: 36, atk: 220, spe: 252 }, nature: "Adamant", ability: "Orichalcum Pulse", item: "Clear Amulet", teraType: "Fire", abilityOn: true })
      const defender = new Pokemon("Urshifu-Rapid-Strike", { evs: { atk: 252, spd: 4, spe: 252 }, nature: "Jolly", ability: "Unseen Fist", item: "Choice Scarf" })
      const move = new Move("Flame Charge")
      const field = new Field({ gameType: "Doubles", weather: "Sun" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("220+ Atk Orichalcum Pulse Tera Fire Koraidon Flame Charge (60 BP) vs. 0 HP / 0 Def Urshifu-Rapid-Strike in Sun: 57-67 (32.5 - 38.2%) -- 97.9% chance to 3HKO")
      expect((result.damage as number[])[0]).toEqual(57)
      expect((result.damage as number[])[15]).toEqual(67)
    })
  })

  describe("Ruin abilities", () => {
    it("Beads of Ruin: lowers other Pokémon's Special Defense by 0.75x", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, spd: 4 } })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles", isBeadsOfRuin: true })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Beads of Ruin Ampharos Thunderbolt vs. 252 HP / 4 SpD Incineroar: 112-133 (55.4 - 65.8%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(112)
      expect((result.damage as number[])[15]).toEqual(133)
    })

    it("Sword of Ruin: lowers other Pokémon's Defense by 0.75x", () => {
      const attacker = new Pokemon("Chien-Pao", { evs: { atk: 252 }, nature: "Jolly", ability: "Sword of Ruin" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, def: 4 } })
      const move = new Move("Icicle Crash")
      const field = new Field({ gameType: "Doubles", isSwordOfRuin: true })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 Atk Sword of Ruin Chien-Pao Icicle Crash vs. 252 HP / 4 Def Incineroar: 50-59 (24.7 - 29.2%) -- 99.9% chance to 4HKO")
      expect((result.damage as number[])[0]).toEqual(50)
      expect((result.damage as number[])[15]).toEqual(59)
    })

    it("Tablets of Ruin: lowers other Pokémon's Attack by 0.75x", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Arcanine", {})
      const move = new Move("Darkest Lariat")
      const field = new Field({ gameType: "Doubles", isTabletsOfRuin: true })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Darkest Lariat vs. 0 HP / 0 Def Tablets of Ruin Arcanine: 67-79 (40.6 - 47.8%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(67)
      expect((result.damage as number[])[15]).toEqual(79)
    })

    it("Vessel of Ruin: lowers other Pokémon's Special Attack by 0.75x", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles", isVesselOfRuin: true })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Thunderbolt vs. 0 HP / 0 SpD Vessel of Ruin Gardevoir: 52-63 (36.3 - 44%) -- guaranteed 3HKO")
      expect((result.damage as number[])[0]).toEqual(52)
      expect((result.damage as number[])[15]).toEqual(63)
    })
  })

  describe("Defensive items", () => {
    it("Assault Vest: 1.5x Special Defense", () => {
      const attacker = new Pokemon("Ampharos", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Incineroar", { evs: { hp: 252, spd: 4 }, item: "Assault Vest" })
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Ampharos Thunderbolt vs. 252 HP / 4 SpD Assault Vest Incineroar: 57-67 (28.2 - 33.1%) -- guaranteed 4HKO")
      expect((result.damage as number[])[0]).toEqual(57)
      expect((result.damage as number[])[15]).toEqual(67)
    })

    it("Eviolite: 1.5x Defense for not-fully-evolved Pokémon", () => {
      const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
      const defender = new Pokemon("Dusclops", { evs: { hp: 252, def: 4 }, item: "Eviolite" })
      const move = new Move("Darkest Lariat")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Incineroar Darkest Lariat vs. 252 HP / 4 Def Eviolite Dusclops: 80-96 (54.4 - 65.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(80)
      expect((result.damage as number[])[15]).toEqual(96)
    })

    it("Occa Berry: halves a super-effective Fire hit", () => {
      const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
      const defender = new Pokemon("Scizor", { item: "Occa Berry" })
      const move = new Move("Flamethrower")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toContain("reduced by Occa Berry")
    })
  })

  describe("Knock Off", () => {
    it("Knock Off: 1.5x BP when target holds a removable item", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Jolly" })
      const defender = new Pokemon("Gardevoir", { item: "Leftovers" })
      const move = new Move("Knock Off")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 Atk Weavile Knock Off (97.5 BP) vs. 0 HP / 0 Def Gardevoir: 111-132 (77.6 - 92.3%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(111)
      expect((result.damage as number[])[15]).toEqual(132)
    })

    it("Knock Off: base BP when target holds no item", () => {
      const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Jolly" })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Knock Off")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 Atk Weavile Knock Off vs. 0 HP / 0 Def Gardevoir: 75-88 (52.4 - 61.5%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(75)
      expect((result.damage as number[])[15]).toEqual(88)
    })
  })

  describe("Type-damage abilities", () => {
    it("Tinted Lens: doubles not-very-effective damage", () => {
      const attacker = new Pokemon("Venusaur", { evs: { spa: 252 }, nature: "Modest", ability: "Tinted Lens" })
      const defender = new Pokemon("Charizard", {})
      const move = new Move("Giga Drain")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Tinted Lens Venusaur Giga Drain vs. 0 HP / 0 SpD Charizard: 32-40 (20.9 - 26.1%) -- 1.6% chance to 4HKO")
      expect((result.damage as number[])[0]).toEqual(32)
      expect((result.damage as number[])[15]).toEqual(40)
    })

    it("Rocky Payload: boosts Rock moves by 1.5x", () => {
      const attacker = new Pokemon("Garganacl", { evs: { atk: 252 }, nature: "Adamant", ability: "Rocky Payload" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Rock Slide")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Rocky Payload Garganacl Rock Slide vs. 0 HP / 0 Def Incineroar: 146-174 (85.8 - 102.3%) -- 12.5% chance to OHKO")
      expect((result.damage as number[])[0]).toEqual(146)
      expect((result.damage as number[])[15]).toEqual(174)
    })

    it("Transistor: boosts Electric moves by 1.5x", () => {
      const attacker = new Pokemon("Regieleki", { evs: { spa: 252 }, nature: "Modest", ability: "Transistor" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Thunderbolt")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ SpA Transistor Regieleki Thunderbolt vs. 0 HP / 0 SpD Incineroar: 102-120 (60 - 70.5%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(102)
      expect((result.damage as number[])[15]).toEqual(120)
    })

    it("Supreme Overlord: boosts power per fallen ally", () => {
      const attacker = new Pokemon("Kingambit", { evs: { atk: 252 }, nature: "Adamant", ability: "Supreme Overlord", alliesFainted: 2 })
      const defender = new Pokemon("Gardevoir", {})
      const move = new Move("Kowtow Cleave")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect((result.damage as number[])[0]).toEqual(139)
      expect((result.damage as number[])[15]).toEqual(165)
    })
  })

  describe("Quark Drive / Protosynthesis stat boost", () => {
    it("Protosynthesis: boosts highest stat (Special Attack) by 1.3x", () => {
      const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Timid", ability: "Protosynthesis", abilityOn: true, boostedStat: "spa" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Moonblast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252 SpA Protosynthesis Flutter Mane Moonblast vs. 0 HP / 0 SpD Incineroar: 118-141 (69.4 - 82.9%) -- guaranteed 2HKO")
      expect((result.damage as number[])[0]).toEqual(118)
      expect((result.damage as number[])[15]).toEqual(141)
    })
  })

  describe("Tera Blast", () => {
    it("Tera Blast: uses physical category and Tera type when Attack is higher", () => {
      const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", teraType: "Ground" })
      const defender = new Pokemon("Incineroar", {})
      const move = new Move("Tera Blast")
      const field = new Field({ gameType: "Doubles" })

      const result = calculate(attacker, defender, move, field)

      expect(result.description()).toEqual("252+ Atk Tera Ground Garchomp Tera Blast (80 BP) vs. 0 HP / 0 Def Incineroar: 224-264 (131.7 - 155.2%) -- guaranteed OHKO")
      expect((result.damage as number[])[0]).toEqual(224)
      expect((result.damage as number[])[15]).toEqual(264)
    })
  })
})
