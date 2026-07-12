import { calculate, Field, Move, Pokemon } from "@calc"

describe("prepareCombatants — Meteor Beam and Electro Shot raise the user's Special Attack before damage", () => {
  it("applies the Meteor Beam self Special Attack boost before computing damage", () => {
    const attacker = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 } })
    const move = new Move("Meteor Beam")

    const result = calculate(attacker, defender, move, new Field())

    expect(result.description()).toEqual("+1 252+ SpA Garchomp Meteor Beam vs. 252 HP / 252 SpD Blissey: 53-63 (14.6 - 17.4%) -- possible 6HKO")
  })

  it("applies the Electro Shot self Special Attack boost before computing damage", () => {
    const attacker = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 } })
    const move = new Move("Electro Shot")

    const result = calculate(attacker, defender, move, new Field())

    expect(result.description()).toEqual("+1 252+ SpA Garchomp Electro Shot vs. 252 HP / 252 SpD Blissey: 57-68 (15.7 - 18.7%) -- possible 6HKO")
  })

  it("lowers the attacker's Special Attack instead of raising it when Contrary is active", () => {
    const attacker = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest", ability: "Contrary" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 } })
    const move = new Move("Meteor Beam")

    const result = calculate(attacker, defender, move, new Field())

    expect(result.description()).toEqual("-1 252+ SpA Garchomp Meteor Beam vs. 252 HP / 252 SpD Blissey: 24-29 (6.6 - 8%)")
  })
})
