import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — condition-doubling base power moves", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Infernal Parade: doubles BP against a statused target", () => {
    const attacker = new Pokemon("Chandelure", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Milotic", { evs: { hp: 252, spd: 4 }, status: "brn" })
    const move = new Move("Infernal Parade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Chandelure Infernal Parade (130 BP) vs. 252 HP / 4 SpD Milotic: 109-129 (53.9 - 63.8%) -- guaranteed 2HKO after burn damage")
  })

  it("Smelling Salts: doubles BP against a paralyzed target", () => {
    const attacker = new Pokemon("Lucario", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, status: "par" })
    const move = new Move("Smelling Salts")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Lucario Smelling Salts (140 BP) vs. 252 HP / 4 Def Amoonguss: 103-122 (46.6 - 55.2%) -- 69.5% chance to 2HKO")
  })

  it("Barb Barrage: doubles BP against a poisoned target", () => {
    const attacker = new Pokemon("Overqwil", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 4 }, status: "psn" })
    const move = new Move("Barb Barrage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Overqwil Barb Barrage (120 BP) vs. 252 HP / 4 Def Dondozo: 93-109 (36.1 - 42.4%) -- 86.3% chance to 2HKO after poison damage")
  })

  it("Psyblade: gets 1.5x BP on Electric Terrain", () => {
    const attacker = new Pokemon("Iron Leaves", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Iron Hands", { evs: { hp: 252, def: 4 } })
    const move = new Move("Psyblade")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Electric" }))

    expect(result.description()).toEqual("252+ Atk Iron Leaves Psyblade (120 BP) vs. 252 HP / 4 Def Iron Hands in Electric Terrain: 210-248 (80.4 - 95%) -- guaranteed 2HKO")
  })
})
