import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — ally-provided field boosts", () => {
  it("Helping Hand: boosts the attacker's damage by 1.5x", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", attackerSide: { isHelpingHand: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Helping Hand Close Combat vs. 252 HP / 4 Def Amoonguss: 117-138 (52.9 - 62.4%) -- guaranteed 2HKO")
  })

  it("Battery: boosts an ally's special attack by 1.3x", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", attackerSide: { isBattery: true } }))

    expect(result.description()).toEqual("252+ SpA Iron Hands Battery boosted Thunderbolt vs. 252 HP / 4 SpD Amoonguss: 37-44 (16.7 - 19.9%) -- guaranteed 6HKO")
  })

  it("Battery: does not boost a physical move", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", attackerSide: { isBattery: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss: 78-93 (35.2 - 42%) -- guaranteed 3HKO")
  })

  it("Power Spot: boosts an ally's damage by 1.3x", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", attackerSide: { isPowerSpot: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Power Spot boosted Close Combat vs. 252 HP / 4 Def Amoonguss: 102-120 (46.1 - 54.2%) -- 56.6% chance to 2HKO")
  })

  it("Friend Guard: reduces incoming damage to 0.75x", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: { isFriendGuard: true } }))

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss with an ally's Friend Guard: 58-70 (26.2 - 31.6%) -- guaranteed 4HKO")
  })
})
