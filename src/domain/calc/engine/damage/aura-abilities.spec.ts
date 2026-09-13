import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — aura abilities", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Fairy Aura: boosts Fairy moves by 1.33x", () => {
    const attacker = new Pokemon("Xerneas", { sps: { spa: 32 }, nature: "Modest", ability: "Fairy Aura" })
    const defender = new Pokemon("Roaring Moon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Fairy Aura Xerneas Moonblast vs. 32 HP / 1 SpD Roaring Moon: 472-556 (222.6 - 262.2%) -- guaranteed OHKO")
  })

  it("Dark Aura: boosts Dark moves by 1.33x", () => {
    const attacker = new Pokemon("Yveltal", { sps: { spa: 32 }, nature: "Modest", ability: "Dark Aura" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Dark Pulse")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Dark Aura Yveltal Dark Pulse vs. 32 HP / 1 SpD Gholdengo: 216-254 (111.3 - 130.9%) -- guaranteed OHKO")
  })

  it("Field Fairy Aura: boosts Fairy moves from a non-aura attacker", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Baxcalibur", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isFairyAura: true }))

    expect(result.description()).toEqual("32+ SpA Flutter Mane Fairy Aura Moonblast vs. 32 HP / 1 SpD Baxcalibur: 272-324 (122.5 - 145.9%) -- guaranteed OHKO")
  })

  it("Aura Break: inverts the aura boost into a 0.75x reduction", () => {
    const attacker = new Pokemon("Xerneas", { sps: { spa: 32 }, nature: "Modest", ability: "Fairy Aura" })
    const defender = new Pokemon("Zygarde", { sps: { hp: 32, spd: 1 }, ability: "Aura Break" })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Fairy Aura Xerneas Moonblast vs. 32 HP / 1 SpD Zygarde: 140-168 (65.1 - 78.1%) -- guaranteed 2HKO")
  })
})
