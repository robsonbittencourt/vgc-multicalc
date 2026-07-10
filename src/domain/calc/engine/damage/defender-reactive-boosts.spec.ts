import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — defender reactive boosts across multihit", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina: Def rises after the first hit of a multihit move", () => {
    const attacker = new Pokemon("Cinccino", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Mudsdale", { evs: { hp: 252, def: 4 }, ability: "Stamina" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Cinccino Tail Slap (3 hits) vs. 252 HP / 4 Def Stamina Mudsdale: 42-53 (20.2 - 25.6%) -- 0.1% chance to 4HKO")
  })

  it("Weak Armor: Def drops and Speed rises after the first hit", () => {
    const attacker = new Pokemon("Cinccino", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Skarmory", { evs: { hp: 252, def: 4 }, ability: "Weak Armor" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Cinccino Tail Slap (3 hits) vs. 252 HP / 4 Def Weak Armor Skarmory: 34-40 (19.7 - 23.2%) -- possible 5HKO")
  })

  it("Kee Berry: raises Def against a physical move mid-multihit", () => {
    const attacker = new Pokemon("Cinccino", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, def: 4 }, item: "Kee Berry" })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Cinccino Tail Slap (3 hits) vs. 252 HP / 4 Def Kee Berry Tyranitar: 21-27 (10.1 - 13%) -- possible 8HKO")
  })

  it("Maranga Berry: raises Sp. Def against a special multihit move", () => {
    const attacker = new Pokemon("Greninja", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, spd: 4 }, item: "Maranga Berry" })
    const move = new Move("Water Shuriken")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Greninja Water Shuriken (3 hits) vs. 252 HP / 4 SpD Maranga Berry Tyranitar: 62-80 (29.9 - 38.6%) -- 34.2% chance to 3HKO")
  })

  it("Parental Bond: a stat-dropping move lowers the child hit's Sp. Atk", () => {
    const attacker = new Pokemon("Kangaskhan", { evs: { spa: 252 }, nature: "Modest", ability: "Parental Bond" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Parental Bond Kangaskhan Overheat vs. 252 HP / 4 SpD Amoonguss: 110-132 (49.7 - 59.7%) -- 99.9% chance to 2HKO")
  })
})
