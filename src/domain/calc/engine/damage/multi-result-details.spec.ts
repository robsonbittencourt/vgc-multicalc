import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, result details", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina defender: Defense rises across hits and is noted in the text", () => {
    const a1 = new Pokemon("Cinccino", { evs: { atk: 100 }, nature: "Jolly" })
    const a2 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const defender = new Pokemon("Mudsdale", { evs: { hp: 252, def: 4 }, ability: "Stamina" })

    const result = calculateMulti([a1, a2], defender, [new Move("Tail Slap"), new Move("Wood Hammer")], field())

    expect(result.description()).toEqual("100 Atk Cinccino Tail Slap (3 hits) AND 100+ Atk Rillaboom Wood Hammer vs. 252 HP / +2 4 Def Mudsdale (Stamina considered): 227-272 (109.6 - 131.4%) -- 1.8% chance to 2HKO")
  })

  it("Toxic damage is added at the end of the turn", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 100 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 252 }, nature: "Impish", status: "tox" })

    const result = calculateMulti([a1, a2], defender, [new Move("Wood Hammer"), new Move("Hyper Voice")], field())

    expect(result.description()).toEqual("100+ Atk Rillaboom Wood Hammer AND 100+ SpA Sylveon Hyper Voice vs. 252 HP / 252+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after toxic damage")
  })

  it("weak combined attackers take many turns to KO", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 }, nature: "Calm" })

    const result = calculateMulti([a1, a2], defender, [new Move("Hyper Voice"), new Move("Hyper Voice")], field())

    expect(result.getHKO()).toEqual("21.4% chance to 9HKO")
  })

  it("Sitrus Berry consumed mid-fight delays a multi-turn KO further", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 }, nature: "Calm", item: "Sitrus Berry" })

    const result = calculateMulti([a1, a2], defender, [new Move("Hyper Voice"), new Move("Hyper Voice")], field())

    expect(result.description()).toEqual("4+ SpA Sylveon Hyper Voice AND 4+ SpA Sylveon Hyper Voice vs. 252 HP / 252+ SpD Blissey: 36-44 (9.9 - 12.1%) -- 10HKO or more")
  })
})
