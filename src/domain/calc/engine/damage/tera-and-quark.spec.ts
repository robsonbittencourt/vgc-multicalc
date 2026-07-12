import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — Quark Drive and Tera interactions", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Quark Drive: boosts the highest stat by 1.3x on Electric Terrain", () => {
    const attacker = new Pokemon("Iron Valiant", { evs: { spa: 252 }, nature: "Timid", ability: "Quark Drive", abilityOn: true, boostedStat: "spa" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", terrain: "Electric" }))

    expect(result.description()).toEqual("252 SpA Quark Drive Iron Valiant Moonblast vs. 252 HP / 4 SpD Amoonguss: 59-70 (26.6 - 31.6%) -- guaranteed 4HKO")
  })

  it("Quark Drive: boosts via Booster Energy without terrain", () => {
    const attacker = new Pokemon("Iron Moth", { evs: { spa: 252 }, nature: "Timid", ability: "Quark Drive", item: "Booster Energy", abilityOn: true, boostedStat: "spa" })
    const defender = new Pokemon("Kingambit", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Fiery Dance")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252 SpA Quark Drive Iron Moth Fiery Dance vs. 252 HP / 4 SpD Kingambit: 216-254 (104.3 - 122.7%) -- guaranteed OHKO")
  })

  it("Tera same type: STAB becomes 2x", () => {
    const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Timid", teraType: "Fairy" })
    const defender = new Pokemon("Hydreigon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252 SpA Tera Fairy Flutter Mane Moonblast vs. 252 HP / 4 SpD Hydreigon: 488-576 (245.2 - 289.4%) -- guaranteed OHKO")
  })

  it("Tera new type: gains STAB on the tera type while keeping base STAB", () => {
    const attacker = new Pokemon("Kingambit", { evs: { atk: 252 }, nature: "Adamant", teraType: "Flying" })
    const defender = new Pokemon("Rillaboom", { evs: { hp: 252, def: 4 } })
    const move = new Move("Fly")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Tera Flying Kingambit Fly vs. 252 HP / 4 Def Rillaboom: 188-224 (90.8 - 108.2%) -- 43.8% chance to OHKO")
  })

  it("Adaptability with Tera same type: STAB becomes 2.25x", () => {
    const attacker = new Pokemon("Porygon-Z", { evs: { spa: 252 }, nature: "Modest", ability: "Adaptability", teraType: "Normal" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Tri Attack")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Adaptability Tera Normal Porygon-Z Tri Attack vs. 252 HP / 4 SpD Snorlax: 108-128 (40.4 - 47.9%) -- guaranteed 3HKO")
  })

  it("Tera Blast Stellar: BP 100 and super effective against a Terastallized target", () => {
    const attacker = new Pokemon("Terapagos-Stellar", { evs: { spa: 252 }, nature: "Modest", teraType: "Stellar" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252 }, teraType: "Steel" })
    const move = new Move("Tera Blast", { isStellarFirstUse: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Tera Stellar Terapagos-Stellar Tera Blast (100 BP) vs. 252 HP / 0 SpD Tera Steel Garchomp: 172-204 (80 - 94.8%) -- guaranteed 2HKO")
  })

  it("Tera Blast Stellar: neutral against a target that is not Terastallized", () => {
    const attacker = new Pokemon("Iron Valiant", { evs: { spa: 252 }, nature: "Modest", teraType: "Stellar" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252 } })
    const move = new Move("Tera Blast", { isStellarFirstUse: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Tera Stellar (First Use) Iron Valiant Tera Blast (100 BP) vs. 252 HP / 0 SpD Garchomp: 82-97 (38.1 - 45.1%) -- guaranteed 3HKO")
  })

  it("Tera Blast Stellar: the Stellar STAB boost only applies on the first use", () => {
    const attacker = new Pokemon("Iron Valiant", { evs: { spa: 252 }, nature: "Modest", teraType: "Stellar" })
    const defender = new Pokemon("Dragonite", { evs: { hp: 252 }, teraType: "Ghost" })

    const firstUse = calculate(attacker, defender, new Move("Tera Blast", { isStellarFirstUse: true }), field())
    const laterUse = calculate(attacker, defender, new Move("Tera Blast", { isStellarFirstUse: false }), field())

    expect(firstUse.description()).toEqual("252+ SpA Tera Stellar (First Use) Iron Valiant Tera Blast (100 BP) vs. 252 HP / 0 SpD Tera Ghost Dragonite: 144-170 (72.7 - 85.8%) -- guaranteed 2HKO")
    expect(laterUse.description()).toEqual("252+ SpA Tera Stellar Iron Valiant Tera Blast (100 BP) vs. 252 HP / 0 SpD Tera Ghost Dragonite: 120-142 (60.6 - 71.7%) -- guaranteed 2HKO")
  })

  it("Tera Blast Stellar: Terapagos-Stellar keeps the Stellar STAB boost without the First Use flag", () => {
    const attacker = new Pokemon("Terapagos-Stellar", { evs: { spa: 252 }, nature: "Modest", teraType: "Stellar" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })
    const move = new Move("Tera Blast", { isStellarFirstUse: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Tera Stellar Terapagos-Stellar Tera Blast (100 BP) vs. 252 HP / 0 SpD Snorlax: 70-83 (26.2 - 31%) -- guaranteed 4HKO")
  })

  it("Tera Blast Stellar: becomes physical when Attack exceeds Special Attack", () => {
    const attacker = new Pokemon("Iron Valiant", { evs: { atk: 252 }, nature: "Adamant", teraType: "Stellar" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252 }, teraType: "Steel" })
    const move = new Move("Tera Blast", { isStellarFirstUse: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Tera Stellar (First Use) Iron Valiant Tera Blast (100 BP) vs. 252 HP / 0 Def Tera Steel Garchomp: 158-188 (73.4 - 87.4%) -- guaranteed 2HKO")
  })
})
