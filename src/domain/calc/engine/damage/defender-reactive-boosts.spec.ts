import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — defender reactive boosts across multihit", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina: Def rises after the first hit of a multihit move", () => {
    const attacker = new Pokemon("Cinccino", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Mudsdale", { sps: { hp: 32, def: 1 }, ability: "Stamina" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Cinccino Tail Slap (3 hits) vs. 32 HP / 1 Def Stamina Mudsdale: 42-53 (20.2 - 25.6%) -- 0.1% chance to 4HKO")
  })

  it("Weak Armor: Def drops and Speed rises after the first hit", () => {
    const attacker = new Pokemon("Cinccino", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Skarmory", { sps: { hp: 32, def: 1 }, ability: "Weak Armor" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Cinccino Tail Slap (3 hits) vs. 32 HP / 1 Def Weak Armor Skarmory: 34-40 (19.7 - 23.2%) -- possible 5HKO")
  })

  it("Kee Berry: raises Def against a physical move mid-multihit", () => {
    const attacker = new Pokemon("Cinccino", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Tyranitar", { sps: { hp: 32, def: 1 }, item: "Kee Berry" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Cinccino Tail Slap (3 hits) vs. 32 HP / 1 Def Kee Berry Tyranitar: 21-27 (10.1 - 13%) -- possible 8HKO")
  })

  it("Maranga Berry: raises Sp. Def against a special multihit move", () => {
    const attacker = new Pokemon("Greninja", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Tyranitar", { sps: { hp: 32, spd: 1 }, item: "Maranga Berry" })
    const move = new Move("Water Shuriken")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Greninja Water Shuriken (15 BP) (3 hits) vs. 32 HP / 1 SpD Maranga Berry Tyranitar: 62-80 (29.9 - 38.6%) -- 34.2% chance to 3HKO")
  })

  it("Parental Bond: a stat-dropping move lowers the child hit's Sp. Atk", () => {
    const attacker = new Pokemon("Kangaskhan", { sps: { spa: 32 }, nature: "Modest", ability: "Parental Bond" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Parental Bond Kangaskhan Overheat vs. 32 HP / 1 SpD Amoonguss: 110-132 (49.7 - 59.7%) -- 99.9% chance to 2HKO")
  })
})
