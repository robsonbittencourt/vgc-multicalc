import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — parity-review coverage gaps", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Muscle Band: boosts a physical move by 1.1x", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant", item: "Muscle Band" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Muscle Band Great Tusk Headlong Rush vs. 32 HP / 1 Def Amoonguss: 165-195 (74.6 - 88.2%) -- guaranteed 2HKO")
  })

  it("Wise Glasses: boosts a special move by 1.1x", () => {
    const attacker = new Pokemon("Iron Moth", { sps: { spa: 32 }, nature: "Modest", item: "Wise Glasses" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Fiery Dance")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Wise Glasses Iron Moth Fiery Dance vs. 32 HP / 1 SpD Amoonguss: 206-246 (93.2 - 111.3%) -- 62.5% chance to OHKO")
  })

  it("Freeze-Dry: is super-effective against Water types", () => {
    const attacker = new Pokemon("Iron Bundle", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Milotic", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Freeze-Dry")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Iron Bundle Freeze-Dry vs. 32 HP / 1 SpD Milotic: 104-126 (51.4 - 62.3%) -- guaranteed 2HKO")
  })

  it("Unseen Fist: a contact move hits through Protect at reduced power", () => {
    const attacker = new Pokemon("Urshifu", { sps: { atk: 32 }, nature: "Adamant", ability: "Unseen Fist" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isProtected: true } }))

    expect(result.description()).toEqual("32+ Atk Urshifu Close Combat vs. 32 HP / 1 Def protected Amoonguss: 19-22 (8.5 - 9.9%)")
  })

  it("Fire Mane: boosts a Fire move by 1.5x", () => {
    const attacker = new Pokemon("Pyroar-Mega", { sps: { spa: 32 }, nature: "Modest", ability: "Fire Mane" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Fire Mane Pyroar-Mega Flamethrower vs. 32 HP / 1 SpD Snorlax: 117-138 (43.8 - 51.6%) -- 9.8% chance to 2HKO")
  })

  it("Fire Mane: boosts the attacking stat, not the base power", () => {
    const attacker = new Pokemon("Pyroar-Mega", { sps: { spa: 32 }, nature: "Timid", ability: "Fire Mane" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32 SpA Fire Mane Pyroar-Mega Flamethrower vs. 32 HP / 1 SpD Snorlax: 105-124 (39.3 - 46.4%) -- guaranteed 3HKO")
  })

  it("Mega Sol: boosts a Fire move as if in permanent Sun", () => {
    const attacker = new Pokemon("Meganium-Mega", { sps: { spa: 32 }, nature: "Modest", ability: "Mega Sol" })
    const defender = new Pokemon("Snorlax", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Mega Sol Meganium-Mega Overheat vs. 32 HP / 1 SpD Snorlax: 120-142 (44.9 - 53.1%) -- 30.5% chance to 2HKO")
  })

  it("Eelevate: grants Ground immunity like Levitate", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Eelektross-Mega", { sps: { hp: 32, def: 1 }, ability: "Eelevate" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })
})
