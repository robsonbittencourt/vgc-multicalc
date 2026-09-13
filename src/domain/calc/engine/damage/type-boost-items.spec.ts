import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — type-boost items", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Draco Plate: boosts Dragon moves by 1.2x", () => {
    const attacker = new Pokemon("Dragonite", { sps: { atk: 32 }, nature: "Adamant", item: "Draco Plate" })
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, def: 1 } })
    const move = new Move("Outrage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Draco Plate Dragonite Outrage vs. 32 HP / 1 Def Garchomp: 288-338 (133.9 - 157.2%) -- guaranteed OHKO")
  })

  it("Magnet: boosts Electric moves by 1.2x", () => {
    const attacker = new Pokemon("Rotom-Wash", { sps: { spa: 32 }, nature: "Modest", item: "Magnet" })
    const defender = new Pokemon("Pelipper", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Magnet Rotom-Wash Thunderbolt vs. 32 HP / 1 SpD Pelipper: 460-544 (275.4 - 325.7%) -- guaranteed OHKO")
  })

  it("Pixie Plate: boosts Fairy moves by 1.2x", () => {
    const attacker = new Pokemon("Enamorus", { sps: { spa: 32 }, nature: "Modest", item: "Pixie Plate" })
    const defender = new Pokemon("Hydreigon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Pixie Plate Enamorus Moonblast vs. 32 HP / 1 SpD Hydreigon: 472-564 (237.1 - 283.4%) -- guaranteed OHKO")
  })

  it("Sharp Beak: boosts Flying moves by 1.2x", () => {
    const attacker = new Pokemon("Talonflame", { sps: { atk: 32 }, nature: "Adamant", item: "Sharp Beak" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Brave Bird")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Sharp Beak Talonflame Brave Bird vs. 32 HP / 1 Def Amoonguss: 260-308 (117.6 - 139.3%) -- guaranteed OHKO")
  })

  it("Spell Tag: boosts Ghost moves by 1.2x", () => {
    const attacker = new Pokemon("Dragapult", { sps: { spa: 32 }, nature: "Modest", item: "Spell Tag" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Spell Tag Dragapult Shadow Ball vs. 32 HP / 1 SpD Gholdengo: 162-192 (83.5 - 98.9%) -- guaranteed 2HKO")
  })
})
