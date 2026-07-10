import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — aura abilities", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Fairy Aura: boosts Fairy moves by 1.33x", () => {
    const attacker = new Pokemon("Xerneas", { evs: { spa: 252 }, nature: "Modest", ability: "Fairy Aura" })
    const defender = new Pokemon("Roaring Moon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Fairy Aura Xerneas Moonblast vs. 252 HP / 4 SpD Roaring Moon: 472-556 (222.6 - 262.2%) -- guaranteed OHKO")
  })

  it("Dark Aura: boosts Dark moves by 1.33x", () => {
    const attacker = new Pokemon("Yveltal", { evs: { spa: 252 }, nature: "Modest", ability: "Dark Aura" })
    const defender = new Pokemon("Gholdengo", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Dark Pulse")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Dark Aura Yveltal Dark Pulse vs. 252 HP / 4 SpD Gholdengo: 216-254 (111.3 - 130.9%) -- guaranteed OHKO")
  })

  it("Field Fairy Aura: boosts Fairy moves from a non-aura attacker", () => {
    const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Baxcalibur", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isFairyAura: true }))

    expect(result.description()).toEqual("252+ SpA Flutter Mane Fairy Aura Moonblast vs. 252 HP / 4 SpD Baxcalibur: 272-324 (122.5 - 145.9%) -- guaranteed OHKO")
  })

  it("Aura Break: inverts the aura boost into a 0.75x reduction", () => {
    const attacker = new Pokemon("Xerneas", { evs: { spa: 252 }, nature: "Modest", ability: "Fairy Aura" })
    const defender = new Pokemon("Zygarde", { evs: { hp: 252, spd: 4 }, ability: "Aura Break" })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Fairy Aura Xerneas Moonblast vs. 252 HP / 4 SpD Zygarde: 140-168 (65.1 - 78.1%) -- guaranteed 2HKO")
  })
})
