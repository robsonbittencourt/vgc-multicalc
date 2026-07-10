import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — move-specific base power modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Venoshock: doubles BP against a poisoned target", () => {
    const attacker = new Pokemon("Iron Moth", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, spd: 4 }, status: "psn" })
    const move = new Move("Venoshock")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Iron Moth Venoshock (130 BP) vs. 252 HP / 4 SpD Dondozo: 180-213 (70 - 82.8%) -- guaranteed 2HKO after poison damage")
  })

  it("Lash Out: doubles BP when the attacker has a lowered stat", () => {
    const attacker = new Pokemon("Meowscarada", { evs: { atk: 252 }, nature: "Jolly", boosts: { atk: -1 } })
    const defender = new Pokemon("Slowbro", { evs: { hp: 252, def: 4 } })
    const move = new Move("Lash Out")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("-1 252 Atk Meowscarada Lash Out (150 BP) vs. 252 HP / 4 Def Slowbro: 140-168 (69.3 - 83.1%) -- guaranteed 2HKO")
  })

  it("Expanding Force: +50% BP on Psychic Terrain when grounded", () => {
    const attacker = new Pokemon("Indeedee", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Dragonite", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Expanding Force")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Psychic" }))

    expect(result.description()).toEqual("252+ SpA Indeedee Expanding Force (120 BP) vs. 252 HP / 4 SpD Dragonite in Psychic Terrain: 93-111 (46.9 - 56%) -- 77.7% chance to 2HKO")
  })

  it("Misty Explosion: +50% BP on Misty Terrain when grounded", () => {
    const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Baxcalibur", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Misty Explosion")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Misty" }))

    expect(result.description()).toEqual("252+ SpA Flutter Mane Misty Explosion (150 BP) vs. 252 HP / 4 SpD Baxcalibur: 242-288 (109 - 129.7%) -- guaranteed OHKO")
  })

  it("Grav Apple: +50% BP under Gravity", () => {
    const attacker = new Pokemon("Appletun", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, def: 4 } })
    const move = new Move("Grav Apple")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isGravity: true }))

    expect(result.description()).toEqual("252+ Atk Appletun Grav Apple (135 BP) vs. 252 HP / 4 Def Tyranitar: 176-210 (85 - 101.4%) -- 6.3% chance to OHKO")
  })

  it("Solar Beam: halves BP in non-Sun weather", () => {
    const attacker = new Pokemon("Lilligant", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Gastrodon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Solar Beam")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Rain" }))

    expect(result.description()).toEqual("252+ SpA Lilligant Solar Beam (60 BP) vs. 252 HP / 4 SpD Gastrodon in Rain: 232-280 (106.4 - 128.4%) -- guaranteed OHKO")
  })

  it("Electro Drift: +33% BP on a super-effective hit", () => {
    const attacker = new Pokemon("Miraidon", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Pelipper", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Electro Drift")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Miraidon Electro Drift (133.3251953125 BP) vs. 252 HP / 4 SpD Pelipper: 676-796 (404.7 - 476.6%) -- guaranteed OHKO")
  })
})
