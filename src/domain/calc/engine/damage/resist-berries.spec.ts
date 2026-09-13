import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — type-resist berries", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Passho Berry: halves a super-effective Water hit", () => {
    const attacker = new Pokemon("Palafin", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ninetales", { sps: { hp: 32, def: 1 }, item: "Passho Berry" })
    const move = new Move("Wave Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Palafin Wave Crash vs. 32 HP / 1 Def Ninetales: 94-112 (52.2 - 62.2%) reduced by Passho Berry -- guaranteed 2HKO")
  })

  it("Yache Berry: halves a super-effective Ice hit", () => {
    const attacker = new Pokemon("Baxcalibur", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Landorus-Therian", { sps: { hp: 32, def: 1 }, item: "Yache Berry" })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Baxcalibur Icicle Crash vs. 32 HP / 1 Def Landorus-Therian: 186-222 (94.8 - 113.2%) reduced by Yache Berry -- 68.8% chance to OHKO")
  })

  it("Haban Berry: halves a super-effective Dragon hit", () => {
    const attacker = new Pokemon("Miraidon", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Dragonite", { sps: { hp: 32, spd: 1 }, item: "Haban Berry" })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Miraidon Draco Meteor vs. 32 HP / 1 SpD Dragonite: 124-147 (62.6 - 74.2%) reduced by Haban Berry -- guaranteed 2HKO")
  })

  it("Roseli Berry: halves a super-effective Fairy hit", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Roaring Moon", { sps: { hp: 32, spd: 1 }, item: "Roseli Berry" })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Flutter Mane Moonblast vs. 32 HP / 1 SpD Roaring Moon: 182-216 (85.8 - 101.8%) reduced by Roseli Berry -- 12.5% chance to OHKO")
  })

  it("Shuca Berry: halves a super-effective Ground hit", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Heatran", { sps: { hp: 32, def: 1 }, item: "Shuca Berry" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Earthquake vs. 32 HP / 1 Def Heatran: 134-158 (67.6 - 79.7%) reduced by Shuca Berry -- guaranteed 2HKO")
  })

  it("Chilan Berry: halves any Normal hit even when not super-effective", () => {
    const attacker = new Pokemon("Ursaluna", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, def: 1 }, item: "Chilan Berry" })
    const move = new Move("Body Slam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Ursaluna Body Slam vs. 32 HP / 1 Def Snorlax: 59-69 (22 - 25.8%) reduced by Chilan Berry -- guaranteed 3HKO")
  })
})
