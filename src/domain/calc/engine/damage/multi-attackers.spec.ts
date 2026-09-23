import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers (calculateMulti)", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("combines two attackers of different categories onto one defender", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const a2 = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Timid" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 1 } })
    const m1 = new Move("Wood Hammer")
    const m2 = new Move("Moonblast")

    const result = calculateMulti(a1, a2, m1, m2, defender, field())

    expect(result.description()).toEqual("32+ Atk Rillaboom Wood Hammer AND 32 SpA Flutter Mane Moonblast vs. 32 HP / 1 Def / 0 SpD Dondozo: 312-369 (121.4 - 143.5%) -- guaranteed OHKO")
  })

  it("defender's Sitrus Berry recovery is reflected in the KO chance", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", item: "Sitrus Berry" })
    const m1 = new Move("Wood Hammer")
    const m2 = new Move("Hyper Voice")

    const result = calculateMulti(a1, a2, m1, m2, defender, field())

    expect(result.description()).toEqual("13+ Atk Rillaboom Wood Hammer AND 13+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after Sitrus Berry recovery")
  })

  it("Leftovers recovery is not mentioned when it does not change the KO", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", item: "Leftovers" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("13+ Atk Rillaboom Wood Hammer AND 13+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Leftovers Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO")
  })

  it("end of turn effects that cancel each other out are not mentioned", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", item: "Leftovers", status: "brn" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("13+ Atk Rillaboom Wood Hammer AND 13+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Leftovers Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO")
  })

  it("a type-resisting berry only reduces the first hit", () => {
    const a1 = new Pokemon("Hydreigon", { nature: "Modest", sps: { spa: 32 } })
    const a2 = new Pokemon("Kingambit", { item: "Black Glasses", nature: "Adamant", sps: { atk: 32 } })
    const defender = new Pokemon("Farigiraf", { item: "Colbur Berry", nature: "Impish", sps: { hp: 25, def: 26, spd: 15 } })

    const result = calculateMulti(a1, a2, new Move("Dark Pulse"), new Move("Kowtow Cleave"), defender, field())

    expect(result.description()).toEqual("32+ SpA Hydreigon Dark Pulse AND 32+ Atk Black Glasses Kingambit Kowtow Cleave vs. 25 HP / 26+ Def / 15 SpD Colbur Berry Farigiraf: 270-322 (122.7 - 146.3%) -- guaranteed OHKO")
  })

  it("poison damage is not mentioned when it does not change the KO", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", status: "psn" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("13+ Atk Rillaboom Wood Hammer AND 13+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO")
  })

  it("burn damage is mentioned when it brings the KO forward", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 0 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 16 }, nature: "Modest" })
    const defender = new Pokemon("Amoonguss", { sps: { hp: 32, def: 32 }, nature: "Impish", status: "brn" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("0+ Atk Rillaboom Wood Hammer AND 16+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Amoonguss: 61-73 (27.6 - 33%) -- guaranteed 3HKO after burn damage")
  })

  it("combines an immune attacker with a damaging one against a defender holding an item", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const a2 = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Timid" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 }, item: "Leftovers" })

    const result = calculateMulti(a1, a2, new Move("Body Slam"), new Move("Moonblast"), defender, field())

    expect(result.description()).toEqual("Rillaboom Body Slam AND 32 SpA Flutter Mane Moonblast vs. 32 HP / 0 SpD Leftovers Gholdengo: 45-54 (23.1 - 27.8%) -- 77% chance to 5HKO after Leftovers recovery")
  })

  it("combines a damaging attacker with an immune one against a defender holding an item", () => {
    const a1 = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Timid" })
    const a2 = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 }, item: "Leftovers" })

    const result = calculateMulti(a1, a2, new Move("Moonblast"), new Move("Body Slam"), defender, field())

    expect(result.description()).toEqual("32 SpA Flutter Mane Moonblast AND Rillaboom Body Slam vs. 32 HP / 0 SpD Leftovers Gholdengo: 45-54 (23.1 - 27.8%) -- 77% chance to 5HKO after Leftovers recovery")
  })

  it("both attackers immune results in the worst-move description", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })
    const a2 = new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 } })

    const result = calculateMulti(a1, a2, new Move("Body Slam"), new Move("Fake Out"), defender, field())

    expect(result.description()).toEqual("Rillaboom Body Slam AND Incineroar Fake Out vs. Gholdengo: 0-0 (0 - 0%) -- possibly the worst move ever")
  })
})
