import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — condition-doubling base power moves", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Infernal Parade: doubles BP against a statused target", () => {
    const attacker = new Pokemon("Chandelure", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Milotic", { sps: { hp: 32, spd: 1 }, status: "brn" })
    const move = new Move("Infernal Parade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Chandelure Infernal Parade (130 BP) vs. 32 HP / 1 SpD Milotic: 109-129 (53.9 - 63.8%) -- guaranteed 2HKO after burn damage")
  })

  it("Smelling Salts: doubles BP against a paralyzed target", () => {
    const attacker = new Pokemon("Lucario", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, status: "par" })
    const move = new Move("Smelling Salts")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Lucario Smelling Salts (140 BP) vs. 32 HP / 1 Def Amoonguss: 103-122 (46.6 - 55.2%) -- 69.5% chance to 2HKO")
  })

  it("Barb Barrage: doubles BP against a poisoned target", () => {
    const attacker = new Pokemon("Overqwil", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 1 }, status: "psn" })
    const move = new Move("Barb Barrage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Overqwil Barb Barrage (120 BP) vs. 32 HP / 1 Def Dondozo: 93-109 (36.1 - 42.4%) -- 86.3% chance to 2HKO after poison damage")
  })

  it("Psyblade: gets 1.5x BP on Electric Terrain", () => {
    const attacker = new Pokemon("Iron Leaves", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Iron Hands", { sps: { hp: 32, def: 1 } })
    const move = new Move("Psyblade")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Electric" }))

    expect(result.description()).toEqual("32+ Atk Iron Leaves Psyblade (120 BP) vs. 32 HP / 1 Def Iron Hands in Electric Terrain: 210-248 (80.4 - 95%) -- guaranteed 2HKO")
  })
})
