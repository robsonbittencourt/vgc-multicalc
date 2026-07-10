import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — type-resist berries", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Passho Berry: halves a super-effective Water hit", () => {
    const attacker = new Pokemon("Palafin", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ninetales", { evs: { hp: 252, def: 4 }, item: "Passho Berry" })
    const move = new Move("Wave Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Palafin Wave Crash vs. 252 HP / 4 Def Ninetales: 94-112 (52.2 - 62.2%) reduced by Passho Berry -- guaranteed 2HKO")
  })

  it("Yache Berry: halves a super-effective Ice hit", () => {
    const attacker = new Pokemon("Baxcalibur", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Landorus-Therian", { evs: { hp: 252, def: 4 }, item: "Yache Berry" })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Baxcalibur Icicle Crash vs. 252 HP / 4 Def Landorus-Therian: 186-222 (94.8 - 113.2%) reduced by Yache Berry -- 68.8% chance to OHKO")
  })

  it("Haban Berry: halves a super-effective Dragon hit", () => {
    const attacker = new Pokemon("Miraidon", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Dragonite", { evs: { hp: 252, spd: 4 }, item: "Haban Berry" })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Miraidon Draco Meteor vs. 252 HP / 4 SpD Dragonite: 124-147 (62.6 - 74.2%) reduced by Haban Berry -- guaranteed 2HKO")
  })

  it("Roseli Berry: halves a super-effective Fairy hit", () => {
    const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Roaring Moon", { evs: { hp: 252, spd: 4 }, item: "Roseli Berry" })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Flutter Mane Moonblast vs. 252 HP / 4 SpD Roaring Moon: 182-216 (85.8 - 101.8%) reduced by Roseli Berry -- 12.5% chance to OHKO")
  })

  it("Shuca Berry: halves a super-effective Ground hit", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Heatran", { evs: { hp: 252, def: 4 }, item: "Shuca Berry" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Earthquake vs. 252 HP / 4 Def Heatran: 134-158 (67.6 - 79.7%) reduced by Shuca Berry -- guaranteed 2HKO")
  })

  it("Chilan Berry: halves any Normal hit even when not super-effective", () => {
    const attacker = new Pokemon("Ursaluna", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 4 }, item: "Chilan Berry" })
    const move = new Move("Body Slam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Ursaluna Body Slam vs. 252 HP / 4 Def Snorlax: 59-69 (22 - 25.8%) reduced by Chilan Berry -- guaranteed 3HKO")
  })
})
