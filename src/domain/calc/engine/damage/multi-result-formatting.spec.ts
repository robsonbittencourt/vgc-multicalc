import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, formatting paths", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("a Terastallized defender shows its Tera type in the bulk", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const a2 = new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, def: 1 }, teraType: "Steel" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Flare Blitz"), defender, field())

    expect(result.description()).toEqual("32+ Atk Rillaboom Wood Hammer AND 32+ Atk Incineroar Flare Blitz vs. 32 HP / 1 Def Tera Steel Garchomp: 273-321 (126.9 - 149.3%) -- guaranteed OHKO")
  })

  it("a Special-Defense-lowering nature is shown with a minus in the bulk", () => {
    const a1 = new Pokemon("Sylveon", { sps: { spa: 32 }, nature: "Modest" })
    const a2 = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Timid" })
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, spd: 1 }, nature: "Naughty" })

    const result = calculateMulti(a1, a2, new Move("Hyper Voice"), new Move("Moonblast"), defender, field())

    expect(result.description()).toEqual("32+ SpA Sylveon Hyper Voice AND 32 SpA Flutter Mane Moonblast vs. 32 HP / 1- SpD Garchomp: 260-309 (120.9 - 143.7%) -- guaranteed OHKO")
  })
})
