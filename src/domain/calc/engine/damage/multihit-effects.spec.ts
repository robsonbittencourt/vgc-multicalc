import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — per-hit effects on multi-hit moves", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina: raises Defense on each hit, reducing later hits", () => {
    const attacker = new Pokemon("Cinccino", { evs: { atk: 252 }, nature: "Jolly" })
    const defender = new Pokemon("Mudsdale", { evs: { hp: 252, def: 4 }, ability: "Stamina" })
    const move = new Move("Bullet Seed")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252 Atk Cinccino Bullet Seed (3 hits) vs. 252 HP / 4 Def Stamina Mudsdale: 52-66 (25.1 - 31.8%) -- guaranteed 4HKO")
  })

  it("Weak Armor: lowers Defense per hit, increasing later hits", () => {
    const attacker = new Pokemon("Breloom", { evs: { atk: 252 }, nature: "Jolly" })
    const defender = new Pokemon("Skarmory", { evs: { hp: 252, def: 4 }, ability: "Weak Armor" })
    const move = new Move("Bullet Seed")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252 Atk Breloom Bullet Seed (3 hits) vs. 252 HP / 4 Def Weak Armor Skarmory: 18-22 (10.4 - 12.7%) -- possible 8HKO")
  })

  it("Mummy: copies onto the attacker on contact, affecting later hits", () => {
    const attacker = new Pokemon("Corviknight", { evs: { atk: 252 }, nature: "Adamant", ability: "Tough Claws" })
    const defender = new Pokemon("Runerigus", { evs: { hp: 252, def: 4 }, ability: "Mummy" })
    const move = new Move("Dual Wingbeat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Tough Claws Corviknight Dual Wingbeat (2 hits) vs. 252 HP / 4 Def Mummy Runerigus: 49-60 (29.6 - 36.3%) -- 15.5% chance to 3HKO")
  })
})
