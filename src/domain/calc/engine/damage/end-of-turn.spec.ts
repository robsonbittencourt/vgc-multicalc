import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — end-of-turn effects in KO chance", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Leftovers: recovery pushes the KO out a turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, item: "Leftovers" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Amoonguss: 49-58 (22.1 - 26.2%) -- possible 5HKO after Leftovers recovery")
  })

  it("Black Sludge: a non-Poison holder takes end-of-turn damage", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Bronzong", { sps: { hp: 32, def: 1 }, item: "Black Sludge" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Bronzong: 66-78 (37.9 - 44.8%) -- guaranteed 2HKO after Black Sludge damage")
  })

  it("Black Sludge: a Poison holder recovers at end of turn", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, item: "Black Sludge" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Headlong Rush vs. 32 HP / 1 Def Amoonguss: 150-177 (67.8 - 80%) -- guaranteed 2HKO after Black Sludge recovery")
  })

  it("Sticky Barb: chips the holder each turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, item: "Sticky Barb" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after Sticky Barb damage")
  })

  it("Poison Heal: a poisoned holder heals instead of taking damage", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Breloom", { sps: { hp: 32, def: 1 }, ability: "Poison Heal", status: "psn" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Headlong Rush vs. 32 HP / 1 Def Breloom: 67-80 (40.1 - 47.9%) -- 99% chance to 3HKO after Poison Heal")
  })

  it("Toxic: escalating poison damage factors into the KO", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, status: "tox", toxicCounter: 1 })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after toxic damage")
  })

  it("Heatproof: reduces burn damage at end of turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Bronzong", { sps: { hp: 32, def: 1 }, ability: "Heatproof", status: "brn" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Bronzong: 66-78 (37.9 - 44.8%) -- guaranteed 3HKO after reduced burn damage")
  })

  it("Salt Cure: a Water type loses an eighth per turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Milotic", { sps: { hp: 32, def: 1 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSaltCured: true } }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Milotic: 90-106 (44.5 - 52.4%) -- guaranteed 2HKO after Salt Cure")
  })

  it("Leech Seed: drains the defender each turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isSeeded: true } }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 3HKO after Leech Seed damage")
  })

  it("Sand: chips a non-immune defender each turn", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sand" }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Amoonguss: 49-58 (22.1 - 26.2%) -- guaranteed 4HKO after sandstorm damage")
  })

  describe("Psychic Noise blocks healing for the rest of the turn", () => {
    const indeedee = () => new Pokemon("Indeedee", { sps: { spa: 0 }, nature: "Bold" })
    const doubles = () => new Field({ gameType: "Doubles" })
    const gliscor = (status: "psn" | "tox") => new Pokemon("Gliscor", { sps: { hp: 32, spd: 32 }, nature: "Careful", ability: "Poison Heal", status })

    it("suppresses Leftovers recovery", () => {
      const defender = new Pokemon("Dondozo", { sps: { hp: 32 }, item: "Leftovers" })

      const result = calculate(indeedee(), defender, new Move("Psychic Noise"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic Noise vs. 32 HP / 0 SpD Dondozo: 63-75 (24.5 - 29.1%) -- 99.8% chance to 4HKO")
    })

    it("still counts Leftovers recovery for a move that does not block healing", () => {
      const defender = new Pokemon("Dondozo", { sps: { hp: 32 }, item: "Leftovers" })

      const result = calculate(indeedee(), defender, new Move("Psychic"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic vs. 32 HP / 0 SpD Dondozo: 76-90 (29.5 - 35%) -- 99.9% chance to 4HKO after Leftovers recovery")
    })

    it("suppresses Poison Heal for a poisoned defender", () => {
      const result = calculate(indeedee(), gliscor("psn"), new Move("Psychic Noise"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic Noise vs. 32 HP / 32+ SpD Gliscor: 39-46 (21.4 - 25.2%) -- 0.1% chance to 4HKO")
    })

    it("still counts Poison Heal for a move that does not block healing", () => {
      const result = calculate(indeedee(), gliscor("psn"), new Move("Psychic"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic vs. 32 HP / 32+ SpD Gliscor: 46-55 (25.2 - 30.2%) -- possible 5HKO after Poison Heal")
    })

    it("suppresses Black Sludge recovery for a Poison-type defender", () => {
      const defender = new Pokemon("Amoonguss", { sps: { hp: 32 }, item: "Black Sludge" })

      const result = calculate(indeedee(), defender, new Move("Psychic Noise"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic Noise vs. 32 HP / 0 SpD Amoonguss: 108-128 (48.8 - 57.9%) -- 93.8% chance to 2HKO")
    })

    it("still counts Black Sludge recovery for a move that does not block healing", () => {
      const defender = new Pokemon("Amoonguss", { sps: { hp: 32 }, item: "Black Sludge" })

      const result = calculate(indeedee(), defender, new Move("Psychic"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic vs. 32 HP / 0 SpD Amoonguss: 128-152 (57.9 - 68.7%) -- guaranteed 2HKO after Black Sludge recovery")
    })

    it("suppresses Poison Heal for a badly poisoned defender", () => {
      const result = calculate(indeedee(), gliscor("tox"), new Move("Psychic Noise"), doubles())

      expect(result.description()).toEqual("0 SpA Indeedee Psychic Noise vs. 32 HP / 32+ SpD Gliscor: 39-46 (21.4 - 25.2%) -- 0.1% chance to 4HKO")
    })
  })

  it("Rain Dish: recovers a sixteenth each turn in Rain", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ludicolo", { sps: { hp: 32, def: 1 }, ability: "Rain Dish" })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Rain" }))

    expect(result.description()).toEqual("32+ Atk Iron Hands Drain Punch vs. 32 HP / 1 Def Ludicolo: 99-117 (52.9 - 62.5%) -- guaranteed 2HKO after Rain Dish recovery")
  })
})
