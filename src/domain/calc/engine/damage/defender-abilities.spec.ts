import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — defender ability modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Heatproof: halves Fire damage", () => {
    const attacker = new Pokemon("Arcanine", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Bronzong", { sps: { hp: 32, spd: 1 }, ability: "Heatproof" })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Arcanine Flamethrower vs. 32 HP / 1 SpD Heatproof Bronzong: 62-74 (35.6 - 42.5%) -- guaranteed 3HKO")
  })

  it("Grass Pelt: boosts Defense by 1.5x on Grassy Terrain", () => {
    const attacker = new Pokemon("Ursaluna", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Gogoat", { sps: { hp: 32, def: 1 }, ability: "Grass Pelt" })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Grassy" }))

    expect(result.description()).toEqual("32+ Atk Ursaluna Facade vs. 32 HP / 1 Def Grass Pelt Gogoat: 67-81 (29.1 - 35.2%) -- 99.9% chance to 4HKO after Grassy Terrain recovery")
  })

  it("Fluffy: halves contact damage", () => {
    const attacker = new Pokemon("Kingambit", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Dachsbun", { sps: { hp: 32, def: 1 }, ability: "Fluffy" })
    const move = new Move("Kowtow Cleave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Kingambit Kowtow Cleave vs. 32 HP / 1 Def Fluffy Dachsbun: 18-21 (10.9 - 12.8%) -- possible 8HKO")
  })

  it("Fluffy: doubles Fire damage", () => {
    const attacker = new Pokemon("Volcarona", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Dachsbun", { sps: { hp: 32, spd: 1 }, ability: "Fluffy" })
    const move = new Move("Heat Wave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Volcarona Heat Wave vs. 32 HP / 1 SpD Fluffy Dachsbun: 162-192 (98.7 - 117%) -- 93.8% chance to OHKO")
  })

  it("Aura Guard: halves contact damage", () => {
    const attacker = new Pokemon("Kingambit", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Lucario-Mega-Z", { sps: { hp: 32, def: 1 }, ability: "Aura Guard" })
    const move = new Move("Kowtow Cleave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Kingambit Kowtow Cleave vs. 32 HP / 1 Def Aura Guard Lucario-Mega-Z: 27-32 (15.2 - 18%) -- possible 6HKO")
  })

  it("Aura Guard: does not reduce non-contact damage", () => {
    const attacker = new Pokemon("Kingambit", { sps: { spa: 32 } })
    const defender = new Pokemon("Lucario-Mega-Z", { sps: { hp: 32, spd: 1 }, ability: "Aura Guard" })
    const move = new Move("Dark Pulse")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 SpA Kingambit Dark Pulse vs. 32 HP / 1 SpD Lucario-Mega-Z: 28-33 (15.8 - 18.6%) -- possible 6HKO")
  })

  it("Aura Guard: is bypassed by Long Reach", () => {
    const attacker = new Pokemon("Decidueye", { sps: { atk: 32 }, nature: "Adamant", ability: "Long Reach" })
    const defender = new Pokemon("Lucario-Mega-Z", { sps: { hp: 32, def: 1 }, ability: "Aura Guard" })
    const move = new Move("Leaf Blade")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Decidueye Leaf Blade vs. 32 HP / 1 Def Lucario-Mega-Z: 48-57 (27.1 - 32.2%) -- guaranteed 4HKO")
  })

  it("Aura Guard: is ignored by Mold Breaker", () => {
    const attacker = new Pokemon("Haxorus", { sps: { atk: 32 }, nature: "Adamant", ability: "Mold Breaker" })
    const defender = new Pokemon("Lucario-Mega-Z", { sps: { hp: 32, def: 1 }, ability: "Aura Guard" })
    const move = new Move("Outrage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Mold Breaker Haxorus Outrage vs. 32 HP / 1 Def Lucario-Mega-Z: 81-96 (45.7 - 54.2%) -- 49.2% chance to 2HKO")
  })

  it("Ice Scales: halves special damage", () => {
    const attacker = new Pokemon("Miraidon", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Frosmoth", { sps: { hp: 32, spd: 1 }, ability: "Ice Scales" })
    const move = new Move("Dazzling Gleam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Miraidon Dazzling Gleam vs. 32 HP / 1 SpD Ice Scales Frosmoth: 21-25 (11.8 - 14.1%) -- possible 8HKO")
  })

  it("Punk Rock: halves sound-move damage", () => {
    const attacker = new Pokemon("Primarina", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Toxtricity", { sps: { hp: 32, spd: 1 }, ability: "Punk Rock" })
    const move = new Move("Hyper Voice")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Primarina Hyper Voice vs. 32 HP / 1 SpD Punk Rock Toxtricity: 27-32 (14.8 - 17.5%) -- possible 6HKO")
  })

  it("Filter: reduces super-effective damage by 0.75x", () => {
    const attacker = new Pokemon("Ceruledge", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Mimikyu", { sps: { hp: 32, def: 1 }, ability: "Filter" })
    const move = new Move("Shadow Sneak")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Ceruledge Shadow Sneak vs. 32 HP / 1 Def Filter Mimikyu: 64-78 (39.5 - 48.1%) -- guaranteed 3HKO")
  })

  it("Prism Armor: reduces super-effective damage by 0.75x", () => {
    const attacker = new Pokemon("Roaring Moon", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Necrozma", { sps: { hp: 32, def: 1 }, ability: "Prism Armor" })
    const move = new Move("Crunch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Roaring Moon Crunch vs. 32 HP / 1 Def Prism Armor Necrozma: 117-139 (57.3 - 68.1%) -- guaranteed 2HKO")
  })

  it("Shadow Shield: halves damage at full HP", () => {
    const attacker = new Pokemon("Grimmsnarl", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Lunala", { sps: { hp: 32, def: 1 }, ability: "Shadow Shield" })
    const move = new Move("Crunch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Grimmsnarl Crunch vs. 32 HP / 1 Def Shadow Shield Lunala: 156-186 (63.9 - 76.2%) -- guaranteed 2HKO")
  })
})
