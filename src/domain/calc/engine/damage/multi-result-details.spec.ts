import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — combined attackers, result details", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Stamina defender: Defense rises across hits and is noted in the text", () => {
    const a1 = new Pokemon("Cinccino", { sps: { atk: 13 }, nature: "Jolly" })
    const a2 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const defender = new Pokemon("Mudsdale", { sps: { hp: 32, def: 1 }, ability: "Stamina" })

    const result = calculateMulti(a1, a2, new Move("Tail Slap"), new Move("Wood Hammer"), defender, field())

    expect(result.description()).toEqual("13 Atk Cinccino Tail Slap (3 hits) AND 13+ Atk Rillaboom Wood Hammer vs. 32 HP / +2 1 Def Mudsdale (Stamina considered): 227-272 (109.6 - 131.4%) -- 1.8% chance to 2HKO")
  })

  it("Toxic damage is added at the end of the turn", () => {
    const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
    const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish", status: "tox" })

    const result = calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("13+ Atk Rillaboom Wood Hammer AND 13+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ Def / 0 SpD Dondozo: 175-208 (68 - 80.9%) -- guaranteed 2HKO after toxic damage")
  })

  it("weak combined attackers take many turns to KO", () => {
    const a1 = new Pokemon("Sylveon", { sps: { spa: 1 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 1 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32, spd: 32 }, nature: "Calm" })

    const result = calculateMulti(a1, a2, new Move("Hyper Voice"), new Move("Hyper Voice"), defender, field())

    expect(result.getHKO()).toEqual("21.4% chance to 9HKO")
  })

  it("Sitrus Berry consumed mid-fight delays a multi-turn KO further", () => {
    const a1 = new Pokemon("Sylveon", { sps: { spa: 1 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { sps: { spa: 1 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { sps: { hp: 32, spd: 32 }, nature: "Calm", item: "Sitrus Berry" })

    const result = calculateMulti(a1, a2, new Move("Hyper Voice"), new Move("Hyper Voice"), defender, field())

    expect(result.description()).toEqual("1+ SpA Sylveon Hyper Voice AND 1+ SpA Sylveon Hyper Voice vs. 32 HP / 32+ SpD Blissey: 36-44 (9.9 - 12.1%) -- 10HKO or more")
  })
  describe("hit-count guards", () => {
    const combined = () => {
      const a1 = new Pokemon("Rillaboom", { sps: { atk: 13 }, nature: "Adamant" })
      const a2 = new Pokemon("Sylveon", { sps: { spa: 13 }, nature: "Modest" })
      const defender = new Pokemon("Dondozo", { sps: { hp: 32, def: 32 }, nature: "Impish" })

      return calculateMulti(a1, a2, new Move("Wood Hammer"), new Move("Hyper Voice"), defender, field())
    }

    it("treats zero hits as always survived", () => {
      expect(combined().survivesHits(0)).toBe(true)
    })

    it("survives a single combined hit", () => {
      expect(combined().survivesHits(1)).toBe(true)
    })

    it("never reports a certain KO for zero hits", () => {
      expect(combined().certainlyKOs(0)).toBe(false)
    })

    it("reports a certain KO once two hits land", () => {
      expect(combined().certainlyKOs(2)).toBe(true)
    })

    it("reports the highest combined damage roll", () => {
      expect(combined().maxDamage()).toBe(208)
    })

    it("reports the damage dealt up to a given turn", () => {
      expect(combined().damageWithRemainingUntilTurn(1)).toBe(208)
    })
  })
})
