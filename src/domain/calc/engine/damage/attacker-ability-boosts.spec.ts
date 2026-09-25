import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — attacker ability BP/damage boosts", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Flare Boost: boosts special moves by 1.5x when burned", () => {
    const attacker = new Pokemon("Drifblim", { sps: { spa: 32 }, nature: "Modest", ability: "Flare Boost", status: "brn" })
    const defender = new Pokemon("Tyranitar", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Flare Boost Drifblim Shadow Ball vs. 32 HP / 1 SpD Tyranitar: 44-52 (21.2 - 25.1%) -- 0.1% chance to 4HKO")
  })

  it("Toxic Boost: boosts physical moves by 1.5x when poisoned", () => {
    const attacker = new Pokemon("Zangoose", { sps: { atk: 32 }, nature: "Adamant", ability: "Toxic Boost", status: "psn" })
    const defender = new Pokemon("Tyranitar", { sps: { hp: 32, def: 1 } })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Toxic Boost Zangoose Facade (140 BP) vs. 32 HP / 1 Def Tyranitar: 83-98 (40 - 47.3%) -- guaranteed 3HKO")
  })

  it("Steely Spirit: boosts Steel moves by 1.5x", () => {
    const attacker = new Pokemon("Gholdengo", { sps: { spa: 32 }, nature: "Modest", ability: "Steely Spirit" })
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Make It Rain")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Steely Spirit Gholdengo Make It Rain vs. 32 HP / 1 SpD Flutter Mane: 200-236 (123.4 - 145.6%) -- guaranteed OHKO")
  })

  it("Analytic: boosts by 1.3x when the target already moved", () => {
    const attacker = new Pokemon("Torkoal", { sps: { spa: 32 }, nature: "Modest", ability: "Analytic" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat", { targetAlreadyMoved: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Analytic Torkoal Overheat vs. 32 HP / 1 SpD Dragapult: 75-88 (38.4 - 45.1%) -- guaranteed 3HKO")
  })

  it("Analytic: does not boost when the target has not moved even if the attacker is slower", () => {
    const attacker = new Pokemon("Torkoal", { sps: { spa: 32 }, nature: "Modest", ability: "Analytic" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Torkoal Overheat vs. 32 HP / 1 SpD Dragapult: 57-68 (29.2 - 34.8%) -- 10.5% chance to 3HKO")
  })

  it("Analytic: does not boost when the ally still has to move", () => {
    const attacker = new Pokemon("Torkoal", { sps: { spa: 32 }, nature: "Modest", ability: "Analytic" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat", { targetAlreadyMoved: true, allyMovesLater: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Torkoal Overheat vs. 32 HP / 1 SpD Dragapult: 57-68 (29.2 - 34.8%) -- 10.5% chance to 3HKO")
  })

  it("Analytic: notes 'switching boosted' in the text when the defender is switching out", () => {
    const attacker = new Pokemon("Torkoal", { sps: { spa: 32 }, nature: "Modest", ability: "Analytic" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat")
    const switchingField = new Field({ gameType: "Doubles", defenderSide: { isSwitching: "out" } })

    const result = calculate(attacker, defender, move, switchingField)

    expect(result.description()).toEqual("32+ SpA Analytic Torkoal switching boosted Overheat vs. 32 HP / 1 SpD Dragapult: 75-88 (38.4 - 45.1%) -- guaranteed 3HKO")
  })

  it("Punk Rock: boosts sound moves by 1.3x", () => {
    const attacker = new Pokemon("Toxtricity", { sps: { spa: 32 }, nature: "Modest", ability: "Punk Rock" })
    const defender = new Pokemon("Hydreigon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overdrive")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Punk Rock Toxtricity Overdrive vs. 32 HP / 1 SpD Hydreigon: 36-43 (18 - 21.6%) -- possible 5HKO")
  })
})
