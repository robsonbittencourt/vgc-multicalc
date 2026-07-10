import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — end-of-turn effects in KO chance", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Leftovers: recovery pushes the KO out a turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Leftovers" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- possible 5HKO after Leftovers recovery")
  })

  it("Black Sludge: a non-Poison holder takes end-of-turn damage", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Bronzong", { evs: { hp: 252, def: 4 }, item: "Black Sludge" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Bronzong: 66-78 (37.9 - 44.8%) -- guaranteed 2HKO after Black Sludge damage")
  })

  it("Black Sludge: a Poison holder recovers at end of turn", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Black Sludge" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Headlong Rush vs. 252 HP / 4 Def Amoonguss: 150-177 (67.8 - 80%) -- guaranteed 2HKO after Black Sludge recovery")
  })

  it("Sticky Barb: chips the holder each turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Sticky Barb" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after Sticky Barb damage")
  })

  it("Poison Heal: a poisoned holder heals instead of taking damage", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Breloom", { evs: { hp: 252, def: 4 }, ability: "Poison Heal", status: "psn" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Headlong Rush vs. 252 HP / 4 Def Breloom: 67-80 (40.1 - 47.9%) -- 99% chance to 3HKO after Poison Heal")
  })

  it("Toxic: escalating poison damage factors into the KO", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, status: "tox", toxicCounter: 1 })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after toxic damage")
  })

  it("Heatproof: reduces burn damage at end of turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Bronzong", { evs: { hp: 252, def: 4 }, ability: "Heatproof", status: "brn" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Bronzong: 66-78 (37.9 - 44.8%) -- guaranteed 3HKO after reduced burn damage")
  })

  it("Salt Cure: a Water type loses an eighth per turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Milotic", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSaltCured: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Milotic: 90-106 (44.5 - 52.4%) -- guaranteed 2HKO after Salt Cure")
  })

  it("Leech Seed: drains the defender each turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSeeded: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after Leech Seed damage")
  })

  it("Sand: chips a non-immune defender each turn", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sand" }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 4HKO after sandstorm damage")
  })

  it("Rain Dish: recovers a sixteenth each turn in Rain", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ludicolo", { evs: { hp: 252, def: 4 }, ability: "Rain Dish" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Rain" }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Drain Punch vs. 252 HP / 4 Def Ludicolo: 99-117 (52.9 - 62.5%) -- guaranteed 2HKO after Rain Dish recovery")
  })
})
