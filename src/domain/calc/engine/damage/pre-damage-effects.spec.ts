import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — pre-damage effects", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Intimidate: lowers the physical attacker's Attack", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, def: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("-1 32+ Atk Great Tusk Headlong Rush vs. 32 HP / 1 Def Incineroar: 164-194 (81.1 - 96%) -- guaranteed 2HKO")
  })

  it("Clear Amulet: blocks the Intimidate drop", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant", item: "Clear Amulet" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, def: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Headlong Rush vs. 32 HP / 1 Def Incineroar: 246-290 (121.7 - 143.5%) -- guaranteed OHKO")
  })

  it("Defiant: Intimidate instead raises the attacker's Attack", () => {
    const attacker = new Pokemon("Kingambit", { sps: { atk: 32 }, nature: "Adamant", ability: "Defiant" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, def: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Kowtow Cleave")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("+1 32+ Atk Kingambit Kowtow Cleave vs. 32 HP / 1 Def Incineroar: 66-78 (32.6 - 38.6%) -- 99.4% chance to 3HKO")
  })

  it("Forecast: Castform becomes Fire-type in Sun", () => {
    const attacker = new Pokemon("Castform", { sps: { spa: 32 }, nature: "Modest", ability: "Forecast" })
    const defender = new Pokemon("Kartana", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Weather Ball")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("32+ SpA Castform Weather Ball (100 BP Fire) vs. 32 HP / 1 SpD Kartana in Sun: 876-1032 (527.7 - 621.6%) -- guaranteed OHKO")
  })

  it("Competitive: Intimidate raises the special attacker's Sp. Atk by 2", () => {
    const attacker = new Pokemon("Milotic", { sps: { spa: 32 }, nature: "Modest", ability: "Competitive" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, spd: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Surf")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("+2 32+ SpA Milotic Surf vs. 32 HP / 1 SpD Incineroar: 230-272 (113.8 - 134.6%) -- guaranteed OHKO")
  })

  it("Guard Dog: Intimidate instead raises the attacker's Attack", () => {
    const attacker = new Pokemon("Okidogi", { sps: { atk: 32 }, nature: "Adamant", ability: "Guard Dog" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, def: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Gunk Shot")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("+1 32+ Atk Okidogi Gunk Shot vs. 32 HP / 1 Def Incineroar: 181-214 (89.6 - 105.9%) -- 37.5% chance to OHKO")
  })

  it("Clear Body: blocks the Intimidate drop", () => {
    const attacker = new Pokemon("Metagross", { sps: { atk: 32 }, nature: "Adamant", ability: "Clear Body" })
    const defender = new Pokemon("Incineroar", { sps: { hp: 32, def: 1 }, ability: "Intimidate", abilityOn: true })
    const move = new Move("Meteor Mash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Metagross Meteor Mash vs. 32 HP / 1 Def Incineroar: 47-56 (23.2 - 27.7%) -- 76.5% chance to 4HKO")
  })
})
