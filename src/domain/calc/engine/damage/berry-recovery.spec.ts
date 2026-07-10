import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — healing berries in KO chance", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Sitrus Berry: quarter-HP heal when dropping below half", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Sitrus Berry" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss: 78-93 (35.2 - 42%) -- 0.2% chance to 3HKO after Sitrus Berry recovery")
  })

  it("Oran Berry: flat 10-HP heal when dropping below half", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Oran Berry" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss: 78-93 (35.2 - 42%) -- guaranteed 3HKO after Oran Berry recovery")
  })

  it("Figy Berry: third-HP heal when dropping below a quarter", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Figy Berry" })
    const move = new Move("Headlong Rush")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Headlong Rush vs. 252 HP / 4 Def Amoonguss: 150-177 (67.8 - 80%) -- guaranteed 2HKO after Figy Berry recovery")
  })

  it("Sitrus Berry with Ripen: doubles the healed amount", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Alomomola", { evs: { hp: 252, def: 4 }, item: "Sitrus Berry", ability: "Ripen" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Alomomola: 142-168 (52.2 - 61.7%) -- guaranteed 3HKO after Sitrus Berry recovery")
  })

  it("Enigma Berry: heals a quarter after a super-effective hit", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Snorlax", { evs: { hp: 252, def: 252 }, nature: "Impish", item: "Enigma Berry" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 252+ Def Snorlax: 224-266 (83.8 - 99.6%) -- guaranteed 2HKO after Enigma Berry recovery")
  })

  it("Unnerve: suppresses the defender's healing berry", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant", ability: "Unnerve" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 }, item: "Sitrus Berry" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Iron Hands Close Combat vs. 252 HP / 4 Def Amoonguss: 78-93 (35.2 - 42%) -- guaranteed 3HKO")
  })
})
