import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — recovery and recoil descriptions", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("drain move: the move description reports the healed range", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.moveDesc()).toEqual("22.1 - 26.2% (10.9 - 12.6% recovered)")
  })

  it("Big Root: boosts the drained amount", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant", item: "Big Root" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.moveDesc()).toEqual("22.1 - 26.2% (13.9 - 16.1% recovered)")
  })

  it("Shell Bell: heals an eighth of the damage dealt", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant", item: "Shell Bell" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.moveDesc()).toEqual("253.5 - 298.8% (19.6 - 19.6% recovered)")
  })

  it("recoil move: the move description reports the recoil range", () => {
    const attacker = new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Wood Hammer")

    const result = calculate(attacker, defender, move, field())

    expect(result.moveDesc()).toEqual("16.2 - 19% (6.7 - 7.9% recoil damage)")
  })

  it("Rock Head: suppresses recoil in the move description", () => {
    const attacker = new Pokemon("Tyranitar", { evs: { atk: 252 }, nature: "Adamant", ability: "Rock Head" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Head Smash")

    const result = calculate(attacker, defender, move, field())

    expect(result.moveDesc()).toEqual("85.5 - 100.9%")
  })

  it("crash move: a missed high-jump-style move notes crash damage", () => {
    const attacker = new Pokemon("Lucario", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("High Jump Kick")

    const result = calculate(attacker, defender, move, field())

    expect(result.recoil().text).toEqual("50% crash damage")
  })

  it("Mind Blown: the recoil object reports 50% self-damage", () => {
    const attacker = new Pokemon("Iron Moth", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Mind Blown")

    const result = calculate(attacker, defender, move, field())

    expect(result.recoil().text).toEqual("50% recoil damage")
  })
})
