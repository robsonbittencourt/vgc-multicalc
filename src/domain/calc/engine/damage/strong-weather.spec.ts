import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

describe("Damage — strong weathers", () => {
  const field = (weather?: string, options: Record<string, unknown> = {}) => new Field({ gameType: "Doubles", weather, ...options } as any)

  const kyogrePrimal = () => new Pokemon("Kyogre-Primal", { sps: { spa: 32 }, nature: "Modest" })
  const incineroar = () => new Pokemon("Incineroar", { sps: { hp: 32, spd: 1 } })
  const amoonguss = () => new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })

  describe("Heavy Rain", () => {
    it("boosts Water moves by 1.5x like Rain", () => {
      const result = calculate(kyogrePrimal(), incineroar(), new Move("Hydro Pump"), field("Heavy Rain"))

      expect(result.description()).toEqual("32+ SpA Kyogre-Primal Hydro Pump vs. 32 HP / 1 SpD Incineroar in Heavy Rain: 428-506 (211.8 - 250.4%) -- guaranteed OHKO")
    })

    it("makes Fire moves fail", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })

      const result = calculate(attacker, amoonguss(), new Move("Flare Blitz"), field("Heavy Rain"))

      expect(result.damage).toEqual(0)
      expect(result.rawDesc.weather).toEqual("Heavy Rain")
    })

    it("turns Weather Ball into a 100 BP Water move", () => {
      const attacker = new Pokemon("Politoed", { sps: { spa: 32 }, nature: "Modest" })
      const defender = new Pokemon("Kartana", { sps: { hp: 32, spd: 1 } })

      const result = calculate(attacker, defender, new Move("Weather Ball"), field("Heavy Rain"))

      expect(result.description()).toEqual("32+ SpA Politoed Weather Ball (100 BP Water) vs. 32 HP / 1 SpD Kartana in Heavy Rain: 127-150 (76.5 - 90.3%) -- guaranteed 2HKO")
    })

    it("lets a Utility Umbrella holder ignore it on Weather Ball", () => {
      const attacker = new Pokemon("Kyogre-Primal", { sps: { spa: 32 }, nature: "Modest", item: "Utility Umbrella" })

      const result = calculate(attacker, incineroar(), new Move("Weather Ball"), field("Heavy Rain"))

      expect(result.description()).toEqual("32+ SpA Kyogre-Primal Weather Ball (50 BP Normal) vs. 32 HP / 1 SpD Incineroar in Heavy Rain: 44-52 (21.7 - 25.7%) -- 0.9% chance to 4HKO")
    })

    it("halves Solar Beam like Rain", () => {
      const attacker = new Pokemon("Venusaur", { sps: { spa: 32 }, nature: "Modest" })
      const defender = new Pokemon("Kyogre", { sps: { hp: 32, spd: 1 } })

      const result = calculate(attacker, defender, new Move("Solar Beam"), field("Heavy Rain"))

      expect(result.description()).toEqual("32+ SpA Venusaur Solar Beam (60 BP) vs. 32 HP / 1 SpD Kyogre in Heavy Rain: 72-86 (34.7 - 41.5%) -- guaranteed 3HKO")
    })

    it("heals a Rain Dish defender at the end of the turn", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 } })
      const defender = new Pokemon("Ludicolo", { ability: "Rain Dish", sps: { hp: 32 } })

      const result = calculate(attacker, defender, new Move("Darkest Lariat"), field("Heavy Rain"))

      expect(result.description()).toEqual("32 Atk Incineroar Darkest Lariat vs. 32 HP / 0 Def Ludicolo: 90-106 (48.1 - 56.6%) -- 37.5% chance to 2HKO after Rain Dish recovery")
    })

    it("turns Forecast Castform into a Water type", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 } })
      const defender = new Pokemon("Castform", { ability: "Forecast", sps: { hp: 32 } })

      const result = calculate(attacker, defender, new Move("Wild Charge"), field("Heavy Rain"))

      expect(result.description()).toEqual("32 Atk Incineroar Wild Charge vs. 32 HP / 0 Def Castform: 126-150 (71.1 - 84.7%) -- guaranteed 2HKO")
    })

    it("doubles the Speed of a Swift Swim Pokemon", () => {
      const defender = new Pokemon("Ludicolo", { ability: "Swift Swim" })

      const result = calculate(new Pokemon("Incineroar"), defender, new Move("Darkest Lariat"), field("Heavy Rain"))

      expect(result.defender.stats.spe).toEqual(180)
    })
  })

  describe("Harsh Sunshine", () => {
    const groudonPrimal = () => new Pokemon("Groudon-Primal", { sps: { atk: 32 }, nature: "Adamant" })

    it("boosts Fire moves by 1.5x like Sun", () => {
      const result = calculate(groudonPrimal(), amoonguss(), new Move("Fire Punch"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32+ Atk Groudon-Primal Fire Punch vs. 32 HP / 1 Def Amoonguss in Harsh Sunshine: 356-422 (161 - 190.9%) -- guaranteed OHKO")
    })

    it("makes Water moves fail", () => {
      const attacker = new Pokemon("Pelipper", { sps: { spa: 32 }, nature: "Modest" })

      const result = calculate(attacker, new Pokemon("Groudon-Primal", { sps: { hp: 32 } }), new Move("Hydro Pump"), field("Harsh Sunshine"))

      expect(result.damage).toEqual(0)
      expect(result.rawDesc.weather).toEqual("Harsh Sunshine")
    })

    it("makes Hydro Steam fail", () => {
      const attacker = new Pokemon("Walking Wake", { sps: { spa: 32 }, nature: "Modest" })

      const result = calculate(attacker, amoonguss(), new Move("Hydro Steam"), field("Harsh Sunshine"))

      expect(result.damage).toEqual(0)
    })

    it("turns Weather Ball into a 100 BP Fire move", () => {
      const attacker = new Pokemon("Politoed", { sps: { spa: 32 }, nature: "Modest" })
      const defender = new Pokemon("Kartana", { sps: { hp: 32, spd: 1 } })

      const result = calculate(attacker, defender, new Move("Weather Ball"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32+ SpA Politoed Weather Ball (100 BP Fire) vs. 32 HP / 1 SpD Kartana in Harsh Sunshine: 680-804 (409.6 - 484.3%) -- guaranteed OHKO")
    })

    it("boosts the Special Attack of a Solar Power Pokemon", () => {
      const attacker = new Pokemon("Charizard", { ability: "Solar Power", sps: { spa: 32 }, nature: "Modest" })

      const result = calculate(attacker, new Pokemon("Amoonguss", { sps: { hp: 32, spd: 1 } }), new Move("Flamethrower"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32+ SpA Solar Power Charizard Flamethrower vs. 32 HP / 1 SpD Amoonguss in Harsh Sunshine: 398-470 (180 - 212.6%) -- guaranteed OHKO")
    })

    it("boosts the Attack of an Orichalcum Pulse Pokemon", () => {
      const attacker = new Pokemon("Koraidon", { sps: { atk: 32 }, nature: "Adamant" })

      const result = calculate(attacker, amoonguss(), new Move("Collision Course"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32+ Atk Orichalcum Pulse Koraidon Collision Course vs. 32 HP / 1 Def Amoonguss: 84-100 (38 - 45.2%) -- guaranteed 3HKO")
    })

    it("boosts the Attack of the ally of a Flower Gift Pokemon", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 } })

      const result = calculate(attacker, new Pokemon("Amoonguss", { sps: { hp: 32 } }), new Move("Darkest Lariat"), field("Harsh Sunshine", { attackerSide: { isFlowerGift: true } }))

      expect(result.description()).toEqual("32 Atk Incineroar with an ally's Flower Gift Darkest Lariat vs. 32 HP / 0 Def Amoonguss in Harsh Sunshine: 133-157 (60.1 - 71%) -- guaranteed 2HKO")
    })

    it("damages a Dry Skin defender at the end of the turn", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 } })
      const defender = new Pokemon("Toxicroak", { ability: "Dry Skin", sps: { hp: 32 } })

      const result = calculate(attacker, defender, new Move("Darkest Lariat"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32 Atk Incineroar Darkest Lariat vs. 32 HP / 0 Def Toxicroak: 47-56 (24.7 - 29.4%) -- guaranteed 3HKO after Dry Skin damage")
    })

    it("turns Forecast Castform into a Fire type", () => {
      const attacker = new Pokemon("Incineroar", { sps: { atk: 32 } })
      const defender = new Pokemon("Castform", { ability: "Forecast", sps: { hp: 32 } })

      const result = calculate(attacker, defender, new Move("Stone Edge"), field("Harsh Sunshine"))

      expect(result.description()).toEqual("32 Atk Incineroar Stone Edge vs. 32 HP / 0 Def Castform: 140-166 (79 - 93.7%) -- guaranteed 2HKO")
    })

    it("doubles the Speed of a Chlorophyll Pokemon", () => {
      const defender = new Pokemon("Venusaur", { ability: "Chlorophyll" })

      const result = calculate(new Pokemon("Incineroar"), defender, new Move("Darkest Lariat"), field("Harsh Sunshine"))

      expect(result.defender.stats.spe).toEqual(200)
    })
  })

  describe("Strong Winds", () => {
    const raichu = () => new Pokemon("Raichu", { sps: { spa: 32 }, nature: "Modest" })
    const megaRayquaza = () => new Pokemon("Rayquaza-Mega", { sps: { hp: 32, spd: 1 } })

    it("removes the Flying weakness from the defender", () => {
      const result = calculate(raichu(), megaRayquaza(), new Move("Thunderbolt"), field("Strong Winds"))

      expect(result.description()).toEqual("32+ SpA Raichu Thunderbolt vs. 32 HP / 1 SpD Rayquaza-Mega in Strong Winds: 33-39 (15.5 - 18.3%) -- possible 6HKO")
    })

    it("keeps the Flying weakness without the weather", () => {
      const result = calculate(raichu(), megaRayquaza(), new Move("Thunderbolt"), field())

      expect(result.description()).toEqual("32+ SpA Raichu Thunderbolt vs. 32 HP / 1 SpD Rayquaza-Mega: 67-79 (31.6 - 37.2%) -- 83.6% chance to 3HKO")
    })

    it("keeps Weather Ball as a 50 BP Normal move", () => {
      const attacker = new Pokemon("Politoed", { sps: { spa: 32 }, nature: "Modest" })
      const defender = new Pokemon("Kartana", { sps: { hp: 32, spd: 1 } })

      const result = calculate(attacker, defender, new Move("Weather Ball"), field("Strong Winds"))

      expect(result.description()).toEqual("32+ SpA Politoed Weather Ball (50 BP Normal) vs. 32 HP / 1 SpD Kartana in Strong Winds: 28-34 (16.8 - 20.4%) -- possible 5HKO")
    })
  })

  describe("Sand Spit", () => {
    const excadrill = () => new Pokemon("Excadrill", { ability: "Sand Force", sps: { atk: 32 }, nature: "Adamant" })
    const sandaconda = () => new Pokemon("Sandaconda", { ability: "Sand Spit", sps: { hp: 32 } })

    it("does not replace a strong weather between hits", () => {
      const result = calculate(excadrill(), sandaconda(), new Move("Rock Blast", { hits: 3 }), field("Heavy Rain"))

      expect(result.description()).toEqual("32+ Atk Excadrill Rock Blast (3 hits) vs. 32 HP / 0 Def Sandaconda: 21-24 (11.7 - 13.4%) -- possible 8HKO")
    })

    it("does not replace a strong weather for the partner of combined attackers", () => {
      const result = calculateMulti(kyogrePrimal(), excadrill(), new Move("Ice Beam"), new Move("Iron Head"), sandaconda(), field("Heavy Rain"))

      expect(result.rollsFor(1)).toEqual([[64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73, 73, 75, 76]])
    })
  })

  describe("Knock Off against a Primal holding its Orb", () => {
    const incineroarAttacker = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })

    it("does not get the 1.5x boost", () => {
      const defender = new Pokemon("Kyogre-Primal", { item: "Blue Orb", sps: { hp: 32, def: 1 } })

      const result = calculate(incineroarAttacker(), defender, new Move("Knock Off"), field())

      expect(result.description()).toEqual("32+ Atk Incineroar Knock Off vs. 32 HP / 1 Def Kyogre-Primal: 61-73 (29.4 - 35.2%) -- 22.2% chance to 3HKO")
    })

    it("does not get the 1.5x boost against the base form holding the Orb", () => {
      const defender = new Pokemon("Kyogre", { item: "Blue Orb", sps: { hp: 32, def: 1 } })

      const result = calculate(incineroarAttacker(), defender, new Move("Knock Off"), field())

      expect(result.description()).toEqual("32+ Atk Incineroar Knock Off vs. 32 HP / 1 Def Kyogre: 61-73 (29.4 - 35.2%) -- 22.2% chance to 3HKO")
    })

    it("does not remove the Orb between uses", () => {
      const defender = new Pokemon("Kyogre-Primal", { item: "Blue Orb", sps: { hp: 32, def: 1 } })

      const result = calculate(incineroarAttacker(), defender, new Move("Knock Off", { timesUsed: 2 }), field())

      expect(result.damage).toEqual([
        [61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73],
        [61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72, 72, 73]
      ])
    })

    it("gets the 1.5x boost against another Orb", () => {
      const defender = new Pokemon("Groudon-Primal", { item: "Blue Orb", sps: { hp: 32, def: 1 } })

      const result = calculate(incineroarAttacker(), defender, new Move("Knock Off"), field())

      expect(result.rawDesc.moveBP).toEqual(97.5)
    })
  })
})
