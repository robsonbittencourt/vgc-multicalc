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
})
