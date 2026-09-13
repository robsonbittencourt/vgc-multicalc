import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — more base power formulas", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Triple Axel: base power grows with each hit", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Landorus-Therian", { sps: { hp: 32, def: 1 } })
    const move = new Move("Triple Axel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Baxcalibur Triple Axel (120 BP) (3 hits) vs. 32 HP / 1 Def Landorus-Therian: 544-644 (277.5 - 328.5%) -- guaranteed OHKO")
  })

  it("Hex: stays at base power against a status-free target", () => {
    const attacker = new Pokemon("Chi-Yu", { sps: { spa: 32 }, nature: "Modest", ability: "Levitate" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Hex")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Chi-Yu Hex (65 BP) vs. 32 HP / 1 SpD Dondozo: 59-70 (22.9 - 27.2%) -- 54.3% chance to 4HKO")
  })
})
