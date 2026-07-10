import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, defender bulk notation", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const attackers = () => [new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" }), new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })]
  const moves = () => [new Move("Wood Hammer"), new Move("Flare Blitz")]

  it("a Defense-lowering nature is shown with a minus in the bulk", () => {
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, def: 4 }, nature: "Lonely" })

    const result = calculateMulti(attackers(), defender, moves(), field())

    expect(result.description()).toEqual("252+ Atk Rillaboom Wood Hammer AND 252+ Atk Incineroar Flare Blitz vs. 252 HP / 4- Def Garchomp: 186-220 (86.5 - 102.3%) -- 7% chance to OHKO")
  })

  it("a negative Defense boost is shown in the bulk", () => {
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, def: 4 }, boosts: { def: -2 } })

    const result = calculateMulti(attackers(), defender, moves(), field())

    expect(result.description()).toEqual("252+ Atk Rillaboom Wood Hammer AND 252+ Atk Incineroar Flare Blitz vs. 252 HP / -2 4 Def Garchomp: 332-393 (154.4 - 182.7%) -- guaranteed OHKO")
  })
})
