import { calculate, Field, Move, Pokemon, Side } from "@calc"

describe("Damage — description flags", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Beads of Ruin: appears in the attacker clause and lowers the defender's Sp. Def", () => {
    const attacker = new Pokemon("Chi-Yu", { sps: { spa: 32 }, nature: "Modest", ability: "Beads of Ruin" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Beads of Ruin Chi-Yu Overheat vs. 32 HP / 1 SpD Amoonguss: 396-468 (179.1 - 211.7%) -- guaranteed OHKO")
  })

  it("Sword of Ruin: appears in the attacker clause and lowers the defender's Def", () => {
    const attacker = new Pokemon("Chien-Pao", { sps: { atk: 32 }, nature: "Adamant", ability: "Sword of Ruin" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Sword of Ruin Chien-Pao Icicle Crash vs. 32 HP / 1 Def Amoonguss: 266-314 (120.3 - 142%) -- guaranteed OHKO")
  })

  it("Vessel of Ruin: appears in the defender clause and lowers the attacker's Sp. Atk", () => {
    const attacker = new Pokemon("Iron Bundle", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Ting-Lu", { sps: { hp: 32, spd: 1 }, ability: "Vessel of Ruin" })
    const move = new Move("Ice Beam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Iron Bundle Ice Beam vs. 32 HP / 1 SpD Vessel of Ruin Ting-Lu: 146-174 (55.7 - 66.4%) -- guaranteed 2HKO")
  })

  it("Tablets of Ruin: appears in the defender clause and lowers the attacker's Atk", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Wo-Chien", { sps: { hp: 32, def: 1 }, ability: "Tablets of Ruin" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Headlong Rush vs. 32 HP / 1 Def Tablets of Ruin Wo-Chien: 42-50 (21.8 - 26%) -- 3.5% chance to 4HKO")
  })

  it("Wonder Room: swaps the defensive stats and is noted in the description", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32, def: 1 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isWonderRoom: true }))

    expect(result.description()).toEqual("32+ SpA Iron Hands Thunderbolt vs. 32 HP / 1 SpD (Def) Blissey in Wonder Room: 184-217 (50.8 - 59.9%) -- guaranteed 2HKO")
  })

  it("a critical hit ignores the defender's positive Defense boost", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 }, boosts: { def: 2 } })
    const move = new Move("Close Combat", { isCrit: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Iron Hands Close Combat vs. 32 HP / 1 Def Amoonguss on a critical hit: 118-139 (53.3 - 62.8%) -- guaranteed 2HKO")
  })
  it("Gale Wings: credited on a Flying move at full HP", () => {
    const attacker = new Pokemon("Talonflame", { ability: "Gale Wings", sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32 } })

    const result = calculate(attacker, defender, new Move("Brave Bird"), new Field())

    expect(result.description()).toEqual("32+ Atk Gale Wings Talonflame Brave Bird vs. 32 HP / 0 Def Blissey: 328-387 (90.6 - 106.9%) -- 43.8% chance to OHKO")
  })

  it("returns a zero-damage result for a move with no base power", () => {
    const result = calculate(new Pokemon("Garchomp"), new Pokemon("Blissey"), new Move("Splash"), new Field())

    expect(result.description()).toEqual("Garchomp Splash vs. Blissey: 0-0 (0 - 0%)")
  })

  it("Power Trick on the defending side swaps its Defense with Attack", () => {
    const attacker = new Pokemon("Garchomp", { sps: { atk: 32 } })
    const defender = new Pokemon("Shuckle", { sps: { def: 32 } })
    const field = new Field({ defenderSide: new Side({ isPowerTrick: true }) })

    const result = calculate(attacker, defender, new Move("Earthquake"), field)

    expect(result.description()).toEqual("32 Atk Garchomp Earthquake vs. 0 HP / 0 Def (Atk) Shuckle with Power Trick: 340-402 (357.8 - 423.1%) -- guaranteed OHKO")
  })

  it("Power Trick on the defending side does not affect a Special move", () => {
    const attacker = new Pokemon("Gengar", { sps: { spa: 32 } })
    const defender = new Pokemon("Shuckle", { sps: { def: 32 } })
    const field = new Field({ defenderSide: new Side({ isPowerTrick: true }) })

    const result = calculate(attacker, defender, new Move("Shadow Ball"), field)

    expect(result.description()).toEqual("32 SpA Gengar Shadow Ball vs. 0 HP / 0 SpD Shuckle: 33-40 (34.7 - 42.1%) -- guaranteed 3HKO")
  })
})
