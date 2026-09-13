import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — fixed-damage moves", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Night Shade: deals damage equal to the user's level", () => {
    const attacker = new Pokemon("Dragapult", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Night Shade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("Dragapult Night Shade vs. 32 HP Amoonguss: 50-50 (22.6 - 22.6%) -- guaranteed 5HKO")
  })

  it("Dragon Rage: always deals 40 damage", () => {
    const attacker = new Pokemon("Dragonite", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Dragon Rage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("Dragonite Dragon Rage vs. 32 HP Amoonguss: 40-40 (18 - 18%) -- guaranteed 6HKO")
  })

  it("Sonic Boom: always deals 20 damage", () => {
    const attacker = new Pokemon("Pelipper", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Kingambit", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Sonic Boom")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("Pelipper Sonic Boom vs. 32 HP Kingambit: 20-20 (9.6 - 9.6%)")
  })

  it("Ruination: deals half the target's current HP", () => {
    const attacker = new Pokemon("Ting-Lu", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Ruination")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("Ting-Lu Ruination vs. 32 HP Dondozo: 128-128 (49.8 - 49.8%) -- guaranteed 3HKO")
  })
})
