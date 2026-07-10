import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — weather effects on move damage", () => {
  it("Rain: weakens Fire moves by 0.5x", () => {
    const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Modest", ability: "Levitate" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Rain" }))

    expect(result.description()).toEqual("252+ SpA Chi-Yu Overheat vs. 252 HP / 4 SpD Amoonguss in Rain: 150-176 (67.8 - 79.6%) -- guaranteed 2HKO")
  })

  it("Hydro Steam: gets stronger in Sun instead of weaker", () => {
    const attacker = new Pokemon("Walking Wake", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Heatran", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hydro Steam")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("252+ SpA Walking Wake Hydro Steam vs. 252 HP / 4 SpD Heatran in Sun: 206-246 (104 - 124.2%) -- guaranteed OHKO")
  })
})
