import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — per-hit effects on multi-hit moves", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina: raises Defense on each hit, reducing later hits", () => {
    const attacker = new Pokemon("Cinccino", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Mudsdale", { sps: { hp: 32, def: 1 }, ability: "Stamina" })
    const move = new Move("Bullet Seed")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 Atk Cinccino Bullet Seed (3 hits) vs. 32 HP / 1 Def Stamina Mudsdale: 52-66 (25.1 - 31.8%) -- guaranteed 4HKO")
  })

  it("Weak Armor: lowers Defense per hit, increasing later hits", () => {
    const attacker = new Pokemon("Breloom", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Skarmory", { sps: { hp: 32, def: 1 }, ability: "Weak Armor" })
    const move = new Move("Bullet Seed")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 Atk Breloom Bullet Seed (3 hits) vs. 32 HP / 1 Def Weak Armor Skarmory: 18-22 (10.4 - 12.7%) -- possible 8HKO")
  })

  it("Mummy: copies onto the attacker on contact, affecting later hits", () => {
    const attacker = new Pokemon("Corviknight", { sps: { atk: 32 }, nature: "Adamant", ability: "Tough Claws" })
    const defender = new Pokemon("Runerigus", { sps: { hp: 32, def: 1 }, ability: "Mummy" })
    const move = new Move("Dual Wingbeat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Tough Claws Corviknight Dual Wingbeat (2 hits) vs. 32 HP / 1 Def Mummy Runerigus: 49-60 (29.6 - 36.3%) -- 15.5% chance to 3HKO")
  })

  it("Galvanize: keeps the -ate boost on every hit of a multi-hit move", () => {
    const attacker = new Pokemon("Cinccino", { sps: { atk: 32 }, nature: "Adamant", ability: "Galvanize" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Tail Slap")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Galvanize Cinccino Tail Slap (3 hits) vs. 32 HP / 1 Def Amoonguss: 30-36 (13.5 - 16.2%) -- possible 7HKO")
  })
})
