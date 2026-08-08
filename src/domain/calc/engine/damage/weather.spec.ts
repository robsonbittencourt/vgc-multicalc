import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — weather effects on move damage", () => {
  it("Rain: weakens Fire moves by 0.5x", () => {
    const attacker = new Pokemon("Chi-Yu", { evs: { spa: 252 }, nature: "Modest", ability: "Levitate" })
    const defender = new Pokemon("Amoonguss", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Rain" }))

    expect(result.description()).toEqual("252+ SpA Chi-Yu Overheat vs. 252 HP / 4 SpD Amoonguss in Rain: 150-176 (67.8 - 79.6%) -- guaranteed 2HKO")
  })

  it("Hydro Steam: gets stronger in Sun instead of weaker", () => {
    const attacker = new Pokemon("Walking Wake", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Heatran", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hydro Steam")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("252+ SpA Walking Wake Hydro Steam vs. 252 HP / 4 SpD Heatran in Sun: 206-246 (104 - 124.2%) -- guaranteed OHKO")
  })

  it("Mega Sol halves a Water move without any weather, crediting the ability instead of the sun", () => {
    const attacker = new Pokemon("Torkoal", { ability: "Mega Sol", evs: { spa: 252 } })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const result = calculate(attacker, defender, new Move("Surf"), new Field({ gameType: "Doubles" }))

    expect(result.description()).toEqual("252 SpA Mega Sol Torkoal Surf vs. 252 HP / 0 SpD Blissey: 11-14 (3 - 3.8%)")
  })

  it("Sun halves a Water move, crediting the weather", () => {
    const attacker = new Pokemon("Torkoal", { evs: { spa: 252 } })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })

    const result = calculate(attacker, defender, new Move("Surf"), new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("252 SpA Torkoal Surf vs. 252 HP / 0 SpD Blissey in Sun: 11-14 (3 - 3.8%)")
  })

  it("Hydro Steam: Mega Sol boosts it without any weather, crediting the ability", () => {
    const attacker = new Pokemon("Walking Wake", { evs: { spa: 252 }, nature: "Modest", ability: "Mega Sol" })
    const defender = new Pokemon("Heatran", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hydro Steam")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles" }))

    expect(result.description()).toContain("Mega Sol")
  })

  it("Hydro Steam: a Utility Umbrella on the attacker cancels the Sun boost", () => {
    const attacker = new Pokemon("Walking Wake", { evs: { spa: 252 }, nature: "Modest", item: "Utility Umbrella" })
    const defender = new Pokemon("Heatran", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hydro Steam")

    const boosted = calculate(new Pokemon("Walking Wake", { evs: { spa: 252 }, nature: "Modest" }), defender, new Move("Hydro Steam"), new Field({ gameType: "Doubles", weather: "Sun" }))
    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.range()[1]).toBeLessThan(boosted.range()[1])
  })

  describe("Weather Ball — Utility Umbrella and Mega Sol", () => {
    const weatherBall = (attackerOptions: Record<string, unknown>, weather?: string, species = "Politoed") => {
      const attacker = new Pokemon(species, { evs: { spa: 252 }, nature: "Modest", ...attackerOptions })
      const defender = new Pokemon("Kartana", { evs: { hp: 252, spd: 4 } })

      return calculate(attacker, defender, new Move("Weather Ball"), new Field({ gameType: "Doubles", weather } as any))
    }

    it("Utility Umbrella negates the type change and the BP boost in Sun", () => {
      const result = weatherBall({ item: "Utility Umbrella" }, "Sun")

      expect(result.description()).toEqual("252+ SpA Politoed Weather Ball (50 BP Normal) vs. 252 HP / 4 SpD Kartana in Sun: 28-34 (16.8 - 20.4%) -- possible 5HKO")
    })

    it("Utility Umbrella negates the type change and the BP boost in Rain", () => {
      const result = weatherBall({ item: "Utility Umbrella" }, "Rain")

      expect(result.description()).toEqual("252+ SpA Politoed Weather Ball (50 BP Normal) vs. 252 HP / 4 SpD Kartana in Rain: 28-34 (16.8 - 20.4%) -- possible 5HKO")
    })

    it("Utility Umbrella does not affect Sand", () => {
      const result = weatherBall({ item: "Utility Umbrella" }, "Sand")

      expect(result.description()).toEqual("252+ SpA Politoed Weather Ball (100 BP Rock) vs. 252 HP / 4 SpD Kartana in Sand: 56-67 (33.7 - 40.3%) -- guaranteed 3HKO")
    })

    it("Utility Umbrella does not affect Snow", () => {
      const result = weatherBall({ item: "Utility Umbrella" }, "Snow")

      expect(result.description()).toEqual("252+ SpA Politoed Weather Ball (100 BP Ice) vs. 252 HP / 4 SpD Kartana in Snow: 113-134 (68 - 80.7%) -- guaranteed 2HKO")
    })

    it("Mega Sol overrides Utility Umbrella, keeping Fire and the BP boost", () => {
      const result = weatherBall({ ability: "Mega Sol", item: "Utility Umbrella" }, undefined, "Meganium-Mega")

      expect(result.description()).toEqual("252+ SpA Mega Sol Meganium-Mega Weather Ball (100 BP Fire) vs. 252 HP / 4 SpD Kartana: 928-1096 (559 - 660.2%) -- guaranteed OHKO")
    })

    it("Mega Sol overrides Utility Umbrella under Rain", () => {
      const result = weatherBall({ ability: "Mega Sol", item: "Utility Umbrella" }, "Rain", "Meganium-Mega")

      expect(result.description()).toEqual("252+ SpA Mega Sol Meganium-Mega Weather Ball (100 BP Fire) vs. 252 HP / 4 SpD Kartana: 928-1096 (559 - 660.2%) -- guaranteed OHKO")
    })

    it("Mega Sol overrides Sand, treating the weather as Sun", () => {
      const result = weatherBall({ ability: "Mega Sol" }, "Sand", "Meganium-Mega")

      expect(result.description()).toEqual("252+ SpA Mega Sol Meganium-Mega Weather Ball (100 BP Fire) vs. 252 HP / 4 SpD Kartana: 928-1096 (559 - 660.2%) -- guaranteed OHKO")
    })
  })
})
