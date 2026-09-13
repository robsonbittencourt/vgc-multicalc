import { calculate, Field, Move, Pokemon, Side } from "@calc"

describe("Damage — terrain modifiers", () => {
  it("Electric Terrain: boosts grounded Electric moves by 1.3x", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Corviknight", { sps: { hp: 32, def: 1 } })
    const move = new Move("Wild Charge")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Electric" }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Wild Charge vs. 32 HP / 1 Def Corviknight in Electric Terrain: 222-264 (108.2 - 128.7%) -- guaranteed OHKO")
  })

  it("Grassy Terrain: boosts grounded Grass moves by 1.3x", () => {
    const attacker = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Rotom-Wash", { sps: { hp: 32, def: 1 } })
    const move = new Move("Grassy Glide")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Grassy" }))

    expect(result.description()).toEqual("32+ Atk Rillaboom Grassy Glide vs. 32 HP / 1 Def Rotom-Wash in Grassy Terrain: 126-150 (80.2 - 95.5%) -- guaranteed 2HKO")
  })

  it("Psychic Terrain: boosts grounded Psychic moves by 1.3x", () => {
    const attacker = new Pokemon("Indeedee", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Annihilape", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Psychic")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Psychic" }))

    expect(result.description()).toEqual("32+ SpA Indeedee Psychic vs. 32 HP / 1 SpD Annihilape in Psychic Terrain: 204-242 (94 - 111.5%) -- 62.5% chance to OHKO")
  })

  it("Misty Terrain: halves Dragon damage against a grounded defender", () => {
    const attacker = new Pokemon("Roaring Moon", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, def: 1 } })
    const move = new Move("Outrage")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Misty" }))

    expect(result.description()).toEqual("32+ Atk Roaring Moon Outrage vs. 32 HP / 1 Def Garchomp in Misty Terrain: 122-146 (56.7 - 67.9%) -- guaranteed 2HKO")
  })

  it("Grassy Terrain: halves Earthquake against a grounded defender", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 } })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Grassy" }))

    expect(result.description()).toEqual("32+ Atk Great Tusk Earthquake vs. 32 HP / 1 Def Gholdengo in Grassy Terrain: 74-90 (38.1 - 46.3%) -- guaranteed 3HKO after Grassy Terrain recovery")
  })
})

describe("Damage — screen modifiers", () => {
  it("Reflect in Doubles: reduces physical damage to 0.667x", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isReflect: true }) }))

    expect(result.description()).toEqual("32 Atk Baxcalibur Icicle Crash vs. 32 HP / 1 Def Amoonguss through Reflect: 137-164 (61.9 - 74.2%) -- guaranteed 2HKO")
  })

  it("Reflect in Singles: reduces physical damage to 0.5x", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Singles", defenderSide: new Side({ isReflect: true }) }))

    expect(result.description()).toEqual("32 Atk Baxcalibur Icicle Crash vs. 32 HP / 1 Def Amoonguss through Reflect: 103-123 (46.6 - 55.6%) -- 71.1% chance to 2HKO")
  })

  it("Reflect is bypassed by a critical hit", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Crash", { isCrit: true })

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isReflect: true }) }))

    expect(result.description()).toEqual("32 Atk Baxcalibur Icicle Crash vs. 32 HP / 1 Def Amoonguss on a critical hit: 312-368 (141.1 - 166.5%) -- guaranteed OHKO")
  })

  it("Light Screen in Doubles: reduces special damage to 0.667x", () => {
    const attacker = new Pokemon("Miraidon", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Hydreigon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Dazzling Gleam")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isLightScreen: true }) }))

    expect(result.description()).toEqual("32+ SpA Miraidon Dazzling Gleam vs. 32 HP / 1 SpD Hydreigon through Light Screen: 112-133 (56.2 - 66.8%) -- guaranteed 2HKO")
  })

  it("Aurora Veil reduces damage and suppresses the redundant Reflect", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Jolly" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isAuroraVeil: true, isReflect: true }) }))

    expect(result.description()).toEqual("32 Atk Baxcalibur Icicle Crash vs. 32 HP / 1 Def Amoonguss with an ally's Aurora Veil: 137-164 (61.9 - 74.2%) -- guaranteed 2HKO")
  })
})
