import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — ability-based type immunities (0 damage)", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Water Absorb: absorbs Water moves", () => {
    const attacker = new Pokemon("Palafin", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Gastrodon", { evs: { hp: 252, spd: 4 }, ability: "Water Absorb" })
    const move = new Move("Surf")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Volt Absorb: absorbs Electric moves", () => {
    const attacker = new Pokemon("Miraidon", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Jolteon", { evs: { hp: 252, spd: 4 }, ability: "Volt Absorb" })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Sap Sipper: absorbs Grass moves", () => {
    const attacker = new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Azumarill", { evs: { hp: 252, def: 4 }, ability: "Sap Sipper" })
    const move = new Move("Wood Hammer")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Levitate: is immune to Ground moves", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Rotom-Heat", { evs: { hp: 252, def: 4 }, ability: "Levitate" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Flash Fire: absorbs Fire moves", () => {
    const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Modest", ability: "Levitate" })
    const defender = new Pokemon("Skeledirge", { evs: { hp: 252, spd: 4 }, ability: "Flash Fire" })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Earth Eater: is immune to Ground moves", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Orthworm", { evs: { hp: 252, def: 4 }, ability: "Earth Eater" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })
})
