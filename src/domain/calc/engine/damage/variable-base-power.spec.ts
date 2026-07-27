import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — variable base power formulas", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Punishment: BP scales with the defender's positive boosts", () => {
    const attacker = new Pokemon("Weavile", { evs: { atk: 252 }, nature: "Jolly" })
    const defender = new Pokemon("Volcarona", { evs: { hp: 252, def: 4 }, boosts: { spa: 2, spe: 1 } })
    const move = new Move("Punishment")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252 Atk Weavile Punishment (120 BP) vs. 252 HP / 4 Def Volcarona: 135-160 (70.3 - 83.3%) -- guaranteed 2HKO")
  })

  it("Power Trip: BP scales with the attacker's positive boosts", () => {
    const attacker = new Pokemon("Grimmsnarl", { evs: { atk: 252 }, nature: "Adamant", boosts: { atk: 2 } })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Power Trip")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("+2 252+ Atk Grimmsnarl Power Trip (60 BP) vs. 252 HP / 4 Def Amoonguss: 141-166 (63.8 - 75.1%) -- guaranteed 2HKO")
  })

  it("Heat Crash: BP scales with the attacker/defender weight ratio", () => {
    const attacker = new Pokemon("Coalossal", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 252, def: 4 } })
    const move = new Move("Heat Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Coalossal Heat Crash (120 BP) vs. 252 HP / 4 Def Flutter Mane: 129-153 (79.6 - 94.4%) -- guaranteed 2HKO")
  })

  it("Water Spout: BP scales with the attacker's current HP", () => {
    const attacker = new Pokemon("Kyogre", { evs: { spa: 252 }, nature: "Modest", curHP: 100 })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Water Spout")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Kyogre Water Spout (85 BP) vs. 252 HP / 4 SpD Snorlax: 61-73 (22.8 - 27.3%) -- 63.1% chance to 4HKO")
  })

  it("Flail: BP is highest when the attacker's HP is low", () => {
    const attacker = new Pokemon("Basculegion", { evs: { atk: 252 }, nature: "Adamant", curHP: 5 })
    const defender = new Pokemon("Hydreigon", { evs: { hp: 252, def: 4 } })
    const move = new Move("Flail")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Basculegion Flail (200 BP) vs. 252 HP / 4 Def Hydreigon: 122-144 (61.3 - 72.3%) -- guaranteed 2HKO")
  })

  it("Wake-Up Slap: keeps base BP against an awake target", () => {
    const attacker = new Pokemon("Hariyama", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Wake-Up Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Hariyama Wake-Up Slap (70 BP) vs. 252 HP / 4 Def Amoonguss: 41-48 (18.5 - 21.7%) -- possible 5HKO")
  })

  it("Wake-Up Slap: doubles BP against a sleeping target", () => {
    const attacker = new Pokemon("Hariyama", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, status: "slp" })
    const move = new Move("Wake-Up Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Hariyama Wake-Up Slap (140 BP) vs. 252 HP / 4 Def Amoonguss: 81-96 (36.6 - 43.4%) -- guaranteed 3HKO")
  })

  it("Water Shuriken: keeps 15 BP for a regular Greninja", () => {
    const attacker = new Pokemon("Greninja", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Water Shuriken")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Greninja Water Shuriken (15 BP) (3 hits) vs. 252 HP / 4 SpD Amoonguss: 24-27 (10.8 - 12.2%) -- possible 9HKO")
  })

  it("Water Shuriken: rises to 20 BP for Greninja-Ash with Battle Bond", () => {
    const attacker = new Pokemon("Greninja-Ash", { evs: { spa: 252 }, nature: "Modest", ability: "Battle Bond" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Water Shuriken")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Greninja-Ash Water Shuriken (20 BP) (3 hits) vs. 252 HP / 4 SpD Amoonguss: 36-45 (16.2 - 20.3%) -- possible 5HKO")
  })

  it("Triple Kick: BP escalates 10/20/30 across the three hits", () => {
    const attacker = new Pokemon("Hitmontop", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Triple Kick")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Hitmontop Triple Kick (60 BP) (3 hits) vs. 252 HP / 4 Def Amoonguss: 30-36 (13.5 - 16.2%) -- possible 7HKO")
  })

  it("Crush Grip: reaches 120 BP against a full-HP target", () => {
    const attacker = new Pokemon("Regigigas", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Crush Grip")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Regigigas Crush Grip (120 BP) vs. 252 HP / 4 Def Amoonguss: 174-205 (78.7 - 92.7%) -- guaranteed 2HKO")
  })

  it("Crush Grip: halves BP against a target at half HP", () => {
    const attacker = new Pokemon("Regigigas", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, curHP: 111 })
    const move = new Move("Crush Grip")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Regigigas Crush Grip (60 BP) vs. 252 HP / 4 Def Amoonguss: 87-103 (39.3 - 46.6%) -- guaranteed 2HKO")
  })

  it("Wring Out: shares the Crush Grip formula", () => {
    const attacker = new Pokemon("Slowbro", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Wring Out")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Slowbro Wring Out (120 BP) vs. 252 HP / 4 SpD Amoonguss: 75-89 (33.9 - 40.2%) -- guaranteed 3HKO")
  })
})
