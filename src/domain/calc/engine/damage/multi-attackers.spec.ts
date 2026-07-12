import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers (calculateMulti)", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("combines two attackers of different categories onto one defender", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" })
    const a2 = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Timid" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 4 } })
    const m1 = new Move("Wood Hammer")
    const m2 = new Move("Moonblast")

    const result = calculateMulti(a1, a2, m1, m2, defender, field())

    expect(result.description()).toEqual("252+ Atk Rillaboom Wood Hammer AND 252 SpA Flutter Mane Moonblast vs. 252 HP / 4 Def / 0 SpD Dondozo: 312-369 (121.4 - 143.5%) -- guaranteed OHKO")
  })

  it("defender's Sitrus Berry recovery is reflected in the KO chance", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 100 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 252 }, nature: "Impish", item: "Sitrus Berry" })
    const m1 = new Move("Wood Hammer")
    const m2 = new Move("Hyper Voice")

    const result = calculateMulti(a1, a2, m1, m2, defender, field())

    expect(result.description()).toEqual("100+ Atk Rillaboom Wood Hammer AND 100+ SpA Sylveon Hyper Voice vs. 252 HP / 252+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after Sitrus Berry recovery")
  })

  it("Leftovers recovery delays the KO across turns", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 100 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 252 }, nature: "Impish", item: "Leftovers" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("100+ Atk Rillaboom Wood Hammer AND 100+ SpA Sylveon Hyper Voice vs. 252 HP / 252+ Def / 0 SpD Leftovers Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after Leftovers recovery")
  })

  it("poison damage is added at the end of the turn", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 100 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 252 }, nature: "Impish", status: "psn" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("100+ Atk Rillaboom Wood Hammer AND 100+ SpA Sylveon Hyper Voice vs. 252 HP / 252+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after poison damage")
  })
})
