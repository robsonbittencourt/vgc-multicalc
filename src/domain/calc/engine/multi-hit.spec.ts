import { calculate, Field, Move, Pokemon } from "@calc"

describe("computeMultiHitDamage", () => {
  const field = () => new Field()

  it("should scale damage over multiple turns for a move used consecutively", () => {
    const attacker = new Pokemon("Garchomp", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 1 } })
    const move = new Move("Rollout", { timesUsed: 3 })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Garchomp Rollout over 3 turns vs. 32 HP / 1 Def Ferrothorn: 24-27 (13.2 - 14.9%) -- not a KO")
  })

  it("should apply the Sp. Atk drop of a stat-dropping special move on the second consecutive use", () => {
    const attacker = new Pokemon("Incineroar", { sps: { spa: 32 } })
    const defender = new Pokemon("Blissey", { sps: { hp: 32 } })
    const move = new Move("Overheat", { timesUsed: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("32 SpA Incineroar Overheat over 2 turns vs. 32 HP / 0 SpD Blissey: 96-114 (26.5 - 31.4%) -- not a KO")
    expect(Math.min(...damage[0])).toBe(63)
    expect(Math.max(...damage[0])).toBe(75)
    expect(Math.min(...damage[1])).toBe(33)
    expect(Math.max(...damage[1])).toBe(39)
  })

  it("should apply the Sp. Atk drop of Draco Meteor on the second consecutive use", () => {
    const attacker = new Pokemon("Dragapult", { sps: { spa: 32 } })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32 } })
    const move = new Move("Draco Meteor", { timesUsed: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("32 SpA Dragapult Draco Meteor over 2 turns vs. 32 HP / 0 SpD Snorlax: 128-154 (47.9 - 57.6%) -- not a KO")
    expect(Math.min(...damage[1])).toBe(43)
    expect(Math.max(...damage[1])).toBe(52)
  })

  it("should keep applying the Ate-ability type change on every hit of a multi-hit Normal move", () => {
    const attacker = new Pokemon("Altaria-Mega", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 1 } })
    const move = new Move("Fury Attack", { hits: 2 })

    const result = calculate(attacker, defender, move, field())
    const damage = result.damage as number[][]

    expect(result.description()).toEqual("32+ Atk Pixilate Altaria-Mega Fury Attack (2 hits) vs. 32 HP / 1 Def Ferrothorn: 12-16 (6.6 - 8.8%)")
    expect(damage.length).toBe(2)
  })

  it("should not scale damage over turns for a regular multi-hit move used once", () => {
    const attacker = new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Spear")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).not.toContain("over")
  })

  it("should not keep the Ate-ability type change when the attacker does not have an Ate ability", () => {
    const attacker = new Pokemon("Cloyster", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Spear")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).not.toContain("Ability")
  })
})
