import { calculate, Field, Move, Pokemon } from "@calc"

describe("computeAttack — Power Trick on the attacker's side", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })
  const garchomp = () => new Pokemon("Garchomp", { evs: { atk: 252, spa: 252, def: 252 }, nature: "Adamant" })
  const powerTrickField = () => new Field({ attackerSide: { isPowerTrick: true } })

  it("swaps Atk and Def for a regular physical move", () => {
    const result = calculate(garchomp(), blissey(), new Move("Earthquake"), powerTrickField())

    expect(result.description()).toEqual("252 Atk (Def) Garchomp with Power Trick Earthquake vs. 252 HP / 0 Def Blissey: 276-325 (76.2 - 89.7%) -- guaranteed 2HKO")
  })

  it("swaps Atk and Def for Body Press, which attacks with Def", () => {
    const result = calculate(garchomp(), blissey(), new Move("Body Press"), powerTrickField())

    expect(result.description()).toEqual("252+ Def (Atk) Garchomp with Power Trick Body Press vs. 252 HP / 0 Def Blissey: 400-472 (110.4 - 130.3%) -- guaranteed OHKO")
  })

  it("leaves a special move untouched, since Power Trick only swaps Atk and Def", () => {
    const result = calculate(garchomp(), blissey(), new Move("Flamethrower"), powerTrickField())

    expect(result.description()).toEqual("252- SpA Garchomp Flamethrower vs. 252 HP / 0 SpD Blissey: 27-32 (7.4 - 8.8%)")
  })

  it("leaves Foul Play untouched, since it uses the defender's Atk instead", () => {
    const result = calculate(garchomp(), blissey(), new Move("Foul Play"), powerTrickField())

    expect(result.description()).toEqual("0 Atk Garchomp Foul Play vs. 252 HP / 0 Def Blissey: 36-43 (9.9 - 11.8%) -- possible 9HKO")
  })
})
