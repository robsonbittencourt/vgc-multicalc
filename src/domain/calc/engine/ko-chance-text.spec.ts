import { calculate, Field, Move, Pokemon } from "@calc"

describe("KO chance text — end-of-turn damage changes the outcome", () => {
  const incineroar = () => new Pokemon("Incineroar", { evs: { atk: 252, spa: 252 } })

  it("reports a guaranteed KO in parentheses when end-of-turn damage finishes the job", () => {
    const defender = new Pokemon("Snorlax", { evs: { hp: 252 }, status: "psn" })

    const result = calculate(incineroar(), defender, new Move("Close Combat"), new Field({ gameType: "Doubles", defenderSide: { spikes: 3 } }))

    expect(result.description()).toBe("252 Atk Incineroar Close Combat vs. 252 HP / 0 Def Snorlax: 178-210 (66.6 - 78.6%) -- 25% chance to OHKO after 3 layers of Spikes (guaranteed OHKO after poison damage)")
  })

  it("reports both chances when end-of-turn damage raises but does not guarantee the KO", () => {
    const defender = new Pokemon("Snorlax", { evs: { hp: 252 } })

    const result = calculate(incineroar(), defender, new Move("Close Combat"), new Field({ gameType: "Doubles", weather: "Sand", defenderSide: { spikes: 3 } }))

    expect(result.description()).toBe("252 Atk Incineroar Close Combat vs. 252 HP / 0 Def Snorlax: 178-210 (66.6 - 78.6%) -- 25% chance to OHKO after 3 layers of Spikes (75% chance to OHKO after sandstorm damage)")
  })

  it("reports a single chance when hazards and end-of-turn damage are folded together", () => {
    const defender = new Pokemon("Blissey", { evs: { hp: 252 }, status: "psn" })

    const result = calculate(incineroar(), defender, new Move("Body Slam"), new Field({ gameType: "Doubles", weather: "Sand", defenderSide: { spikes: 3 } }))

    expect(result.description()).toBe("252 Atk Incineroar Body Slam vs. 252 HP / 0 Def Blissey: 178-210 (49.1 - 58%) -- 18.8% chance to OHKO after 3 layers of Spikes, sandstorm damage, and poison damage")
  })

  it("reports a single chance when only end-of-turn damage can secure the KO", () => {
    const defender = new Pokemon("Blissey", { evs: { hp: 252 }, status: "tox" })

    const result = calculate(incineroar(), defender, new Move("Body Slam"), new Field({ gameType: "Doubles" }))

    expect(result.description()).toBe("252 Atk Incineroar Body Slam vs. 252 HP / 0 Def Blissey: 178-210 (49.1 - 58%) -- 97.7% chance to 2HKO after toxic damage")
  })

  it("reports a plain guaranteed KO when end-of-turn damage alone secures it", () => {
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const result = calculate(incineroar(), defender, new Move("Body Slam"), new Field({ gameType: "Doubles", weather: "Sand" }))

    expect(result.description()).toBe("252 Atk Incineroar Body Slam vs. 252 HP / 0 Def Blissey: 178-210 (49.1 - 58%) -- guaranteed 2HKO after sandstorm damage")
  })
})
