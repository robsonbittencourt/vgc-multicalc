import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, formatting paths", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("a Terastallized defender shows its Tera type in the bulk", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" })
    const a2 = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, def: 4 }, teraType: "Steel" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Flare Blitz"), defender, field())

    expect(result.description()).toEqual("252+ Atk Rillaboom Wood Hammer AND 252+ Atk Incineroar Flare Blitz vs. 252 HP / 4 Def Tera Steel Garchomp: 273-321 (126.9 - 149.3%) -- guaranteed OHKO")
  })

  it("a Special-Defense-lowering nature is shown with a minus in the bulk", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 252 }, nature: "Modest" })
    const a2 = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Timid" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, spd: 4 }, nature: "Naughty" })

    const result = calculateMulti(a1, a2, new Move("Hyper Voice"), new Move("Moonblast"), defender, field())

    expect(result.description()).toEqual("252+ SpA Sylveon Hyper Voice AND 252 SpA Flutter Mane Moonblast vs. 252 HP / 4- SpD Garchomp: 260-309 (120.9 - 143.7%) -- guaranteed OHKO")
  })
})
