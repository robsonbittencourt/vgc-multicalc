import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — combined Pledge", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const defender = () => new Pokemon("Snorlax", { sps: { hp: 32 } })

  it("keeps the regular base power when the ally did not use a Pledge", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge"), field())

    expect(result.description()).toEqual("32+ SpA Venusaur Fire Pledge vs. 32 HP / 0 SpD Snorlax: 39-47 (14.6 - 17.6%) -- possible 6HKO")
  })

  it("combines Fire Pledge with Grass Pledge into a 150 BP Fire attack with STAB", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge", { allyPledge: "Grass Pledge" }), field())

    expect(result.description()).toEqual("32+ SpA Venusaur Fire Pledge (150 BP Fire) vs. 32 HP / 0 SpD Snorlax: 109-129 (40.8 - 48.3%) -- guaranteed 3HKO")
  })

  it("combines Fire Pledge with Water Pledge into a 150 BP Water attack with STAB", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge", { allyPledge: "Water Pledge" }), field())

    expect(result.description()).toEqual("32+ SpA Venusaur Fire Pledge (150 BP Water) vs. 32 HP / 0 SpD Snorlax: 109-129 (40.8 - 48.3%) -- guaranteed 3HKO")
  })

  it("combines Water Pledge with Grass Pledge into a 150 BP Grass attack", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })

    const result = calculate(attacker, defender(), new Move("Water Pledge", { allyPledge: "Grass Pledge" }), field())

    expect(result.description()).toEqual("32+ SpA Venusaur Water Pledge (150 BP Grass) vs. 32 HP / 0 SpD Snorlax: 109-129 (40.8 - 48.3%) -- guaranteed 3HKO")
  })

  it("does not stack a Tera type matching the combined type on the forced STAB", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest", teraType: "Water" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge", { allyPledge: "Water Pledge" }), field())

    expect(result.description()).toEqual("32+ SpA Venusaur Fire Pledge (150 BP Water) vs. 32 HP / 0 SpD Snorlax: 109-129 (40.8 - 48.3%) -- guaranteed 3HKO")
  })

  it("applies Adaptability on the forced STAB of the combined Pledge", () => {
    const attacker = new Pokemon("Porygon-Z", { sps: { spa: 32 }, nature: "Modest", ability: "Adaptability" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge", { allyPledge: "Grass Pledge" }), field())

    expect(result.description()).toEqual("32+ SpA Adaptability Porygon-Z Fire Pledge (150 BP Fire) vs. 32 HP / 0 SpD Snorlax: 180-212 (67.4 - 79.4%) -- guaranteed 2HKO")
  })

  it("deals no damage while waiting for the ally Pledge", () => {
    const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })

    const result = calculate(attacker, defender(), new Move("Fire Pledge", { waitsForAllyPledge: true }), field())

    expect(result.damage).toEqual(0)
  })
})
