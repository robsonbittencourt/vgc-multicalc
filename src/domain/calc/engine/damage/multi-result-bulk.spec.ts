import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, defender bulk notation", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const attacker1 = () => new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
  const attacker2 = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const move1 = () => new Move("Wood Hammer")
  const move2 = () => new Move("Flare Blitz")

  it("a Defense-lowering nature is shown with a minus in the bulk", () => {
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, def: 1 }, nature: "Lonely" })

    const result = calculateMulti(attacker1(), attacker2(), move1(), move2(), defender, field())

    expect(result.description()).toEqual("32+ Atk Rillaboom Wood Hammer AND 32+ Atk Incineroar Flare Blitz vs. 32 HP / 1- Def Garchomp: 186-220 (86.5 - 102.3%) -- 7% chance to OHKO")
  })

  it("a negative Defense boost is shown in the bulk", () => {
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, def: 1 }, boosts: { def: -2 } })

    const result = calculateMulti(attacker1(), attacker2(), move1(), move2(), defender, field())

    expect(result.description()).toEqual("32+ Atk Rillaboom Wood Hammer AND 32+ Atk Incineroar Flare Blitz vs. 32 HP / -2 1 Def Garchomp: 332-393 (154.4 - 182.7%) -- guaranteed OHKO")
  })
})
