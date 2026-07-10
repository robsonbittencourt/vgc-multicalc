import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — more base power formulas", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Triple Axel: base power grows with each hit", () => {
    const attacker = new Pokemon("Baxcalibur", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Landorus-Therian", { evs: { hp: 252, def: 4 } })
    const move = new Move("Triple Axel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Baxcalibur Triple Axel (60 BP) (2 hits) vs. 252 HP / 4 Def Landorus-Therian: 276-328 (140.8 - 167.3%) -- guaranteed OHKO")
  })

  it("Hex: stays at base power against a status-free target", () => {
    const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Modest", ability: "Levitate" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hex")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Chi-Yu Hex (65 BP) vs. 252 HP / 4 SpD Dondozo: 59-70 (22.9 - 27.2%) -- 54.3% chance to 4HKO")
  })
})
