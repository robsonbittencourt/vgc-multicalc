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

  describe("field effects that only change one of the moves", () => {
    const garchomp = () => new Pokemon("Garchomp", { sps: { atk: 32 }, nature: "Adamant" })
    const charizard = () => new Pokemon("Charizard-Mega-Y", { sps: { spa: 32 }, nature: "Modest" })
    const grimmsnarl = () => new Pokemon("Grimmsnarl", { sps: { hp: 31, def: 14, spd: 5 }, nature: "Sassy" })

    it("shows the weather and the Light Screen that only change the second move", () => {
      const result = calculateMulti(garchomp(), charizard(), new Move("Earthquake"), new Move("Heat Wave"), grimmsnarl(), new Field({ gameType: "Doubles", weather: "Sun", defenderSide: { isLightScreen: true } }))

      expect(result.description()).toEqual("32+ Atk Garchomp Earthquake AND 32+ SpA Charizard-Mega-Y Heat Wave vs. 31 HP / 14 Def / 5+ SpD Grimmsnarl in Sun through Light Screen: 169-200 (84 - 99.5%) -- guaranteed 2HKO")
    })

    it("shows the weather that only changes the first move", () => {
      const result = calculateMulti(charizard(), garchomp(), new Move("Heat Wave"), new Move("Earthquake"), grimmsnarl(), new Field({ gameType: "Doubles", weather: "Sun" }))

      expect(result.description()).toEqual("32+ SpA Charizard-Mega-Y Heat Wave AND 32+ Atk Garchomp Earthquake vs. 31 HP / 14 Def / 5+ SpD Grimmsnarl in Sun: 211-250 (104.9 - 124.3%) -- guaranteed OHKO")
    })

    it("shows Reflect and Light Screen together when each one weakens a different move", () => {
      const result = calculateMulti(garchomp(), charizard(), new Move("Earthquake"), new Move("Heat Wave"), grimmsnarl(), new Field({ gameType: "Doubles", defenderSide: { isReflect: true, isLightScreen: true } }))

      expect(result.description()).toEqual("32+ Atk Garchomp Earthquake AND 32+ SpA Charizard-Mega-Y Heat Wave vs. 31 HP / 14 Def / 5+ SpD Grimmsnarl through Reflect and Light Screen: 112-134 (55.7 - 66.6%) -- guaranteed 2HKO")
    })

    it("shows the terrain that only boosts the second move", () => {
      const rillaboom = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })

      const result = calculateMulti(charizard(), rillaboom, new Move("Heat Wave"), new Move("Grassy Glide"), grimmsnarl(), new Field({ gameType: "Doubles", terrain: "Grassy" }))

      expect(result.description()).toEqual("32+ SpA Charizard-Mega-Y Heat Wave AND 32+ Atk Rillaboom Grassy Glide vs. 31 HP / 14 Def / 5+ SpD Grimmsnarl in Grassy Terrain: 165-196 (82 - 97.5%) -- guaranteed 2HKO")
    })

    it("shows the critical hit of the second move", () => {
      const result = calculateMulti(garchomp(), charizard(), new Move("Earthquake"), new Move("Heat Wave", { isCrit: true }), grimmsnarl(), new Field({ gameType: "Doubles" }))

      expect(result.description()).toEqual("32+ Atk Garchomp Earthquake AND 32+ SpA Charizard-Mega-Y Heat Wave vs. 31 HP / 14 Def / 5+ SpD Grimmsnarl on a critical hit: 211-250 (104.9 - 124.3%) -- guaranteed OHKO")
    })
  })
})
