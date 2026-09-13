import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — speed-driven moves and weight-based power", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Electro Ball: base power scales with the speed ratio", () => {
    const attacker = new Pokemon("Regieleki", { sps: { spa: 32, spe: 32 }, nature: "Timid", ability: "Levitate" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Electro Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 SpA Regieleki Electro Ball (150 BP) vs. 32 HP / 1 SpD Snorlax: 99-117 (37 - 43.8%) -- guaranteed 3HKO")
  })

  it("Electro Ball: mirrors of equal speed sit in the lowest base power tier", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32, spe: 32 }, nature: "Timid" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1, spe: 32 }, nature: "Jolly" })
    const move = new Move("Electro Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 SpA Flutter Mane Electro Ball (40 BP) vs. 32 HP / 1 SpD Dragapult: 15-18 (7.6 - 9.2%)")
  })

  it("Electro Ball: Tailwind raises the attacker's effective speed and base power", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32, spe: 32 }, nature: "Timid" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32, spd: 1, spe: 32 }, nature: "Jolly" })
    const move = new Move("Electro Ball")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", attackerSide: { isTailwind: true } }))

    expect(result.description()).toEqual("32 SpA Flutter Mane Electro Ball (60 BP) vs. 32 HP / 1 SpD Dragapult: 22-26 (11.2 - 13.3%) -- possible 8HKO")
  })

  it("Electro Ball: a paralyzed attacker loses speed and base power", () => {
    const attacker = new Pokemon("Regieleki", { sps: { spa: 32, spe: 32 }, nature: "Timid", ability: "Levitate", status: "par" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Electro Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 SpA Regieleki Electro Ball (80 BP) vs. 32 HP / 1 SpD Snorlax: 52-63 (19.4 - 23.5%) -- possible 5HKO")
  })

  it("Gyro Ball: base power scales inversely with the speed ratio", () => {
    const attacker = new Pokemon("Ferrothorn", { sps: { atk: 32 }, nature: "Brave" })
    const defender = new Pokemon("Flutter Mane", { sps: { hp: 32, def: 1, spe: 32 }, nature: "Timid" })
    const move = new Move("Gyro Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Ferrothorn Gyro Ball (143 BP) vs. 32 HP / 1 Def Flutter Mane: 338-402 (208.6 - 248.1%) -- guaranteed OHKO")
  })

  it("Grass Knot: heavier targets take more damage", () => {
    const attacker = new Pokemon("Rillaboom", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Rhydon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Grass Knot")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Rillaboom Grass Knot (100 BP) vs. 32 HP / 1 SpD Rhydon: 424-504 (200 - 237.7%) -- guaranteed OHKO")
  })

  it("Grass Knot: Float Stone halves the target's weight", () => {
    const attacker = new Pokemon("Rillaboom", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Rhydon", { sps: { hp: 32, spd: 1 }, item: "Float Stone" })
    const move = new Move("Grass Knot")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Rillaboom Grass Knot (80 BP) vs. 32 HP / 1 SpD Float Stone Rhydon: 336-400 (158.4 - 188.6%) -- guaranteed OHKO")
  })

  it("Heavy Slam: base power scales with the attacker-to-defender weight ratio", () => {
    const attacker = new Pokemon("Snorlax", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Rhydon", { sps: { hp: 32, def: 1 } })
    const move = new Move("Heavy Slam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Snorlax Heavy Slam (80 BP) vs. 32 HP / 1 Def Rhydon: 78-92 (36.7 - 43.3%) -- guaranteed 3HKO")
  })

  it("Heavy Slam: Light Metal lowers the attacker's weight and base power", () => {
    const attacker = new Pokemon("Snorlax", { sps: { atk: 32 }, nature: "Adamant", ability: "Light Metal" })
    const defender = new Pokemon("Rhydon", { sps: { hp: 32, def: 1 } })
    const move = new Move("Heavy Slam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Light Metal Snorlax Heavy Slam (40 BP) vs. 32 HP / 1 Def Rhydon: 40-48 (18.8 - 22.6%) -- possible 5HKO")
  })
})
