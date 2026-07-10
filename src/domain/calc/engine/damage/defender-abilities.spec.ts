import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — defender ability modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Heatproof: halves Fire damage", () => {
    const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Bronzong", { evs: { hp: 252, spd: 4 }, ability: "Heatproof" })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 252 HP / 4 SpD Heatproof Bronzong: 62-74 (35.6 - 42.5%) -- guaranteed 3HKO")
  })

  it("Grass Pelt: boosts Defense by 1.5x on Grassy Terrain", () => {
    const attacker = new Pokemon("Ursaluna", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Gogoat", { evs: { hp: 252, def: 4 }, ability: "Grass Pelt" })
    const move = new Move("Facade")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Grassy" }))

    expect(result.description()).toEqual("252+ Atk Ursaluna Facade vs. 252 HP / 4 Def Grass Pelt Gogoat: 67-81 (29.1 - 35.2%) -- 99.9% chance to 4HKO after Grassy Terrain recovery")
  })

  it("Fluffy: halves contact damage", () => {
    const attacker = new Pokemon("Kingambit", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Dachsbun", { evs: { hp: 252, def: 4 }, ability: "Fluffy" })
    const move = new Move("Kowtow Cleave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Kingambit Kowtow Cleave vs. 252 HP / 4 Def Fluffy Dachsbun: 18-21 (10.9 - 12.8%) -- possible 8HKO")
  })

  it("Fluffy: doubles Fire damage", () => {
    const attacker = new Pokemon("Volcarona", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Dachsbun", { evs: { hp: 252, spd: 4 }, ability: "Fluffy" })
    const move = new Move("Heat Wave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Volcarona Heat Wave vs. 252 HP / 4 SpD Fluffy Dachsbun: 162-192 (98.7 - 117%) -- 93.8% chance to OHKO")
  })

  it("Ice Scales: halves special damage", () => {
    const attacker = new Pokemon("Miraidon", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Frosmoth", { evs: { hp: 252, spd: 4 }, ability: "Ice Scales" })
    const move = new Move("Dazzling Gleam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Miraidon Dazzling Gleam vs. 252 HP / 4 SpD Ice Scales Frosmoth: 21-25 (11.8 - 14.1%) -- possible 8HKO")
  })

  it("Punk Rock: halves sound-move damage", () => {
    const attacker = new Pokemon("Primarina", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Toxtricity", { evs: { hp: 252, spd: 4 }, ability: "Punk Rock" })
    const move = new Move("Hyper Voice")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Primarina Hyper Voice vs. 252 HP / 4 SpD Punk Rock Toxtricity: 27-32 (14.8 - 17.5%) -- possible 6HKO")
  })

  it("Filter: reduces super-effective damage by 0.75x", () => {
    const attacker = new Pokemon("Ceruledge", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Mimikyu", { evs: { hp: 252, def: 4 }, ability: "Filter" })
    const move = new Move("Shadow Sneak")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Ceruledge Shadow Sneak vs. 252 HP / 4 Def Filter Mimikyu: 64-78 (39.5 - 48.1%) -- guaranteed 3HKO")
  })

  it("Prism Armor: reduces super-effective damage by 0.75x", () => {
    const attacker = new Pokemon("Roaring Moon", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Necrozma", { evs: { hp: 252, def: 4 }, ability: "Prism Armor" })
    const move = new Move("Crunch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Roaring Moon Crunch vs. 252 HP / 4 Def Prism Armor Necrozma: 117-139 (57.3 - 68.1%) -- guaranteed 2HKO")
  })

  it("Shadow Shield: halves damage at full HP", () => {
    const attacker = new Pokemon("Grimmsnarl", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Lunala", { evs: { hp: 252, def: 4 }, ability: "Shadow Shield" })
    const move = new Move("Crunch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Grimmsnarl Crunch vs. 252 HP / 4 Def Shadow Shield Lunala: 156-186 (63.9 - 76.2%) -- guaranteed 2HKO")
  })
})
