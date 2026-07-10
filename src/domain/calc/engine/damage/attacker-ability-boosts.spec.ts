import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — attacker ability BP/damage boosts", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Flare Boost: boosts special moves by 1.5x when burned", () => {
    const attacker = new Pokemon("Drifblim", { evs: { spa: 252 }, nature: "Modest", ability: "Flare Boost", status: "brn" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Flare Boost Drifblim Shadow Ball vs. 252 HP / 4 SpD Tyranitar: 44-52 (21.2 - 25.1%) -- 0.1% chance to 4HKO")
  })

  it("Toxic Boost: boosts physical moves by 1.5x when poisoned", () => {
    const attacker = new Pokemon("Zangoose", { evs: { atk: 252 }, nature: "Adamant", ability: "Toxic Boost", status: "psn" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, def: 4 } })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Toxic Boost Zangoose Facade (140 BP) vs. 252 HP / 4 Def Tyranitar: 83-98 (40 - 47.3%) -- guaranteed 3HKO")
  })

  it("Steely Spirit: boosts Steel moves by 1.5x", () => {
    const attacker = new Pokemon("Gholdengo", { evs: { spa: 252 }, nature: "Modest", ability: "Steely Spirit" })
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Make It Rain")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Steely Spirit Gholdengo Make It Rain vs. 252 HP / 4 SpD Flutter Mane: 200-236 (123.4 - 145.6%) -- guaranteed OHKO")
  })

  it("Analytic: boosts by 1.3x when the attacker moves last", () => {
    const attacker = new Pokemon("Torkoal", { evs: { spa: 252 }, nature: "Modest", ability: "Analytic" })
    const defender = new Pokemon("Dragapult", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Analytic Torkoal Overheat vs. 252 HP / 4 SpD Dragapult: 75-88 (38.4 - 45.1%) -- guaranteed 3HKO")
  })

  it("Punk Rock: boosts sound moves by 1.3x", () => {
    const attacker = new Pokemon("Toxtricity", { evs: { spa: 252 }, nature: "Modest", ability: "Punk Rock" })
    const defender = new Pokemon("Hydreigon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overdrive")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Punk Rock Toxtricity Overdrive vs. 252 HP / 4 SpD Hydreigon: 36-43 (18 - 21.6%) -- possible 5HKO")
  })
})
