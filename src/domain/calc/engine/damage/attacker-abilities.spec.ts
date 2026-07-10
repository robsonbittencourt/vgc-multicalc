import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — attacker ability modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Steelworker: boosts Steel moves by 1.5x", () => {
    const attacker = new Pokemon("Dhelmise", { evs: { atk: 252 }, nature: "Adamant", ability: "Steelworker" })
    const defender = new Pokemon("Gardevoir", {})
    const move = new Move("Gyro Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Steelworker Dhelmise Gyro Ball (42 BP) vs. 0 HP / 0 Def Gardevoir: 112-134 (78.3 - 93.7%) -- guaranteed 2HKO")
  })

  it("Dragon's Maw: boosts Dragon moves by 1.5x", () => {
    const attacker = new Pokemon("Regidrago", { evs: { atk: 252 }, nature: "Adamant", ability: "Dragon's Maw" })
    const defender = new Pokemon("Garchomp", {})
    const move = new Move("Dragon Claw")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Dragon's Maw Regidrago Dragon Claw vs. 0 HP / 0 Def Garchomp: 198-234 (108.1 - 127.8%) -- guaranteed OHKO")
  })

  it("Stakeout: doubles damage when ability is active", () => {
    const attacker = new Pokemon("Yveltal", { evs: { atk: 252 }, nature: "Adamant", ability: "Stakeout", abilityOn: true })
    const defender = new Pokemon("Rillaboom", { evs: { hp: 252, def: 4 } })
    const move = new Move("Sucker Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Stakeout Yveltal Sucker Punch vs. 252 HP / 4 Def Rillaboom: 144-169 (69.5 - 81.6%) -- guaranteed 2HKO")
  })

  it("Pure Power: doubles physical Attack", () => {
    const attacker = new Pokemon("Medicham", { evs: { atk: 252 }, nature: "Adamant", ability: "Pure Power" })
    const defender = new Pokemon("Amoonguss", {})
    const move = new Move("Zen Headbutt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Pure Power Medicham Zen Headbutt vs. 0 HP / 0 Def Amoonguss: 248-294 (131.2 - 155.5%) -- guaranteed OHKO")
  })

  it("Gorilla Tactics: boosts physical Attack by 1.5x", () => {
    const attacker = new Pokemon("Darmanitan-Galar", { evs: { atk: 252 }, nature: "Adamant", ability: "Gorilla Tactics" })
    const defender = new Pokemon("Landorus-Therian", { evs: { hp: 252, def: 252 }, nature: "Impish" })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Gorilla Tactics Darmanitan-Galar Icicle Crash vs. 252 HP / 252+ Def Landorus-Therian: 388-460 (197.9 - 234.6%) -- guaranteed OHKO")
  })

  it("Defeatist: halves Attack when at or below half HP", () => {
    const attacker = new Pokemon("Archeops", { evs: { atk: 252 }, nature: "Adamant", ability: "Defeatist", curHP: 1 })
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 4 } })
    const move = new Move("Rock Slide")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Defeatist Archeops Rock Slide vs. 4 HP / 0 Def Flutter Mane: 45-54 (34.3 - 41.2%) -- guaranteed 3HKO")
  })

  it("Flower Gift (Cherrim): boosts physical Attack by 1.5x in Sun", () => {
    const attacker = new Pokemon("Cherrim", { evs: { atk: 252 }, nature: "Adamant", ability: "Flower Gift" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 4 } })
    const move = new Move("Seed Bomb")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("252+ Atk Flower Gift Cherrim Seed Bomb vs. 252 HP / 4 Def Dondozo in Sun: 122-146 (47.4 - 56.8%) -- 87.1% chance to 2HKO")
  })

  it("Neuroforce: boosts super-effective moves by 1.25x", () => {
    const attacker = new Pokemon("Necrozma-Dusk-Mane", { evs: { atk: 252 }, nature: "Adamant", ability: "Neuroforce" })
    const defender = new Pokemon("Gardevoir", {})
    const move = new Move("Sunsteel Strike")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Neuroforce Necrozma-Dusk-Mane Sunsteel Strike vs. 0 HP / 0 Def Gardevoir: 382-450 (267.1 - 314.6%) -- guaranteed OHKO")
  })

  it("Rivalry: boosts by 1.25x against the same gender", () => {
    const attacker = new Pokemon("Haxorus", { evs: { atk: 252 }, nature: "Adamant", ability: "Rivalry", gender: "M" })
    const defender = new Pokemon("Tyranitar", { evs: { hp: 252, def: 4 }, gender: "M" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Rivalry buffed Haxorus Earthquake vs. 252 HP / 4 Def Tyranitar: 118-140 (57 - 67.6%) -- guaranteed 2HKO")
  })

  it("Rivalry: reduces by 0.75x against the opposite gender", () => {
    const attacker = new Pokemon("Haxorus", { evs: { atk: 252 }, nature: "Adamant", ability: "Rivalry", gender: "M" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, def: 4 }, gender: "F" })
    const move = new Move("Iron Head")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Rivalry nerfed Haxorus Iron Head vs. 252 HP / 4 Def Garchomp: 43-51 (20 - 23.7%) -- guaranteed 5HKO")
  })
})
