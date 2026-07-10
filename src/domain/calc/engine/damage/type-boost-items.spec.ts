import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — type-boost items", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Draco Plate: boosts Dragon moves by 1.2x", () => {
    const attacker = new Pokemon("Dragonite", { evs: { atk: 252 }, nature: "Adamant", item: "Draco Plate" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, def: 4 } })
    const move = new Move("Outrage")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Draco Plate Dragonite Outrage vs. 252 HP / 4 Def Garchomp: 288-338 (133.9 - 157.2%) -- guaranteed OHKO")
  })

  it("Magnet: boosts Electric moves by 1.2x", () => {
    const attacker = new Pokemon("Rotom-Wash", { evs: { spa: 252 }, nature: "Modest", item: "Magnet" })
    const defender = new Pokemon("Pelipper", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Magnet Rotom-Wash Thunderbolt vs. 252 HP / 4 SpD Pelipper: 460-544 (275.4 - 325.7%) -- guaranteed OHKO")
  })

  it("Pixie Plate: boosts Fairy moves by 1.2x", () => {
    const attacker = new Pokemon("Enamorus", { evs: { spa: 252 }, nature: "Modest", item: "Pixie Plate" })
    const defender = new Pokemon("Hydreigon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Pixie Plate Enamorus Moonblast vs. 252 HP / 4 SpD Hydreigon: 472-564 (237.1 - 283.4%) -- guaranteed OHKO")
  })

  it("Sharp Beak: boosts Flying moves by 1.2x", () => {
    const attacker = new Pokemon("Talonflame", { evs: { atk: 252 }, nature: "Adamant", item: "Sharp Beak" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Brave Bird")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Sharp Beak Talonflame Brave Bird vs. 252 HP / 4 Def Amoonguss: 260-308 (117.6 - 139.3%) -- guaranteed OHKO")
  })

  it("Spell Tag: boosts Ghost moves by 1.2x", () => {
    const attacker = new Pokemon("Dragapult", { evs: { spa: 252 }, nature: "Modest", item: "Spell Tag" })
    const defender = new Pokemon("Gholdengo", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Shadow Ball")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Spell Tag Dragapult Shadow Ball vs. 252 HP / 4 SpD Gholdengo: 162-192 (83.5 - 98.9%) -- guaranteed 2HKO")
  })
})
