import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — description flags", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Beads of Ruin: appears in the attacker clause and lowers the defender's Sp. Def", () => {
    const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Modest", ability: "Beads of Ruin" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Beads of Ruin Chi-Yu Overheat vs. 252 HP / 4 SpD Amoonguss: 396-468 (179.1 - 211.7%) -- guaranteed OHKO")
  })

  it("Sword of Ruin: appears in the attacker clause and lowers the defender's Def", () => {
    const attacker = new Pokemon("Chien-Pao", { evs: { atk: 252 }, nature: "Adamant", ability: "Sword of Ruin" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Icicle Crash")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Sword of Ruin Chien-Pao Icicle Crash vs. 252 HP / 4 Def Amoonguss: 266-314 (120.3 - 142%) -- guaranteed OHKO")
  })

  it("Vessel of Ruin: appears in the defender clause and lowers the attacker's Sp. Atk", () => {
    const attacker = new Pokemon("Iron Bundle", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Ting-Lu", { evs: { hp: 252, spd: 4 }, ability: "Vessel of Ruin" })
    const move = new Move("Ice Beam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Iron Bundle Ice Beam vs. 252 HP / 4 SpD Vessel of Ruin Ting-Lu: 146-174 (55.7 - 66.4%) -- guaranteed 2HKO")
  })

  it("Tablets of Ruin: appears in the defender clause and lowers the attacker's Atk", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Wo-Chien", { evs: { hp: 252, def: 4 }, ability: "Tablets of Ruin" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Headlong Rush vs. 252 HP / 4 Def Tablets of Ruin Wo-Chien: 42-50 (21.8 - 26%) -- 3.5% chance to 4HKO")
  })

  it("Wonder Room: swaps the defensive stats and is noted in the description", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", isWonderRoom: true }))

    expect(result.description()).toEqual("252+ SpA Iron Hands Thunderbolt vs. 252 HP / 4 SpD (Def) Blissey in Wonder Room: 184-217 (50.8 - 59.9%) -- guaranteed 2HKO")
  })

  it("a critical hit ignores the defender's positive Defense boost", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, boosts: { def: 2 } })
    const move = new Move("Close Combat", { isCrit: true })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss on a critical hit: 118-139 (53.3 - 62.8%) -- guaranteed 2HKO")
  })
})
