import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — hazards and combined end-of-turn text", () => {
  it("Stealth Rock: chip damage lowers the KO threshold", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSR: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 4HKO after Stealth Rock")
  })

  it("Stealth Rock: a Flying type takes doubled chip", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tornadus", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSR: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 0 Def Tornadus: 50-59 (26.8 - 31.7%) -- guaranteed 3HKO after Stealth Rock")
  })

  it("Heavy-Duty Boots: nullifies Stealth Rock chip", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Heavy-Duty Boots" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSR: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- 10.3% chance to 4HKO")
  })

  it("Spikes: one layer adds an eighth of chip", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { spikes: 1 } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 4HKO after 1 layer of Spikes")
  })

  it("Spikes: three layers add a quarter of chip", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { spikes: 3 } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- 13.4% chance to 3HKO after 3 layers of Spikes")
  })

  it("Spikes: a grounded Flying type ignores the layers", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Corviknight", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { spikes: 3 } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Corviknight: 72-85 (35.1 - 41.4%) -- guaranteed 3HKO")
  })

  it("Stealth Rock and Leftovers: both effects are listed together", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Leftovers" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSR: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- possible 5HKO after Stealth Rock and Leftovers recovery")
  })

  it("poison and Leech Seed: two end-of-turn effects join with 'and'", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, status: "psn" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSeeded: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- 7.4% chance to 2HKO after Leech Seed damage and poison damage")
  })
})
