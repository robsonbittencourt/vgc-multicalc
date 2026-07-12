import { calculate, Field, Move, Pokemon } from "@calc"

describe("computeMultiHitDamage", () => {
  const field = () => new Field()

  it("should scale damage over multiple turns for a move used consecutively", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 4 } })
    const move = new Move("Rollout", { timesUsed: 3 })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Garchomp Rollout over 3 turns vs. 252 HP / 4 Def Ferrothorn: 24-27 (13.2 - 14.9%) -- not a KO")
  })

  it("should apply the Sp. Atk drop of a stat-dropping special move on the second consecutive use", () => {
    const attacker = new Pokemon("Incineroar", { evs: { spa: 252 } })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })
    const move = new Move("Overheat", { timesUsed: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("252 SpA Incineroar Overheat over 2 turns vs. 252 HP / 0 SpD Blissey: 96-114 (26.5 - 31.4%) -- not a KO")
    expect(Math.min(...damage[0])).toBe(63)
    expect(Math.max(...damage[0])).toBe(75)
    expect(Math.min(...damage[1])).toBe(33)
    expect(Math.max(...damage[1])).toBe(39)
  })

  it("should apply the Sp. Atk drop of Draco Meteor on the second consecutive use", () => {
    const attacker = new Pokemon("Dragapult", { evs: { spa: 252 } })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })
    const move = new Move("Draco Meteor", { timesUsed: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("252 SpA Dragapult Draco Meteor over 2 turns vs. 252 HP / 0 SpD Snorlax: 128-154 (47.9 - 57.6%) -- not a KO")
    expect(Math.min(...damage[1])).toBe(43)
    expect(Math.max(...damage[1])).toBe(52)
  })

  it("should keep applying the Ate-ability type change on every hit of a multi-hit Normal move", () => {
    const attacker = new Pokemon("Altaria-Mega", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 4 } })
    const move = new Move("Fury Attack", { hits: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("252+ Atk Pixilate Altaria-Mega Fury Attack (2 hits) vs. 252 HP / 4 Def Ferrothorn: 12-16 (6.6 - 8.8%)")
    expect(damage.length).toBe(2)
  })

  it("should not scale damage over turns for a regular multi-hit move used once", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 4 } })
    const move = new Move("Icicle Spear")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).not.toContain("over")
  })

  it("should not keep the Ate-ability type change when the attacker does not have an Ate ability", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 4 } })
    const move = new Move("Icicle Spear")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).not.toContain("Ability")
  })
})
