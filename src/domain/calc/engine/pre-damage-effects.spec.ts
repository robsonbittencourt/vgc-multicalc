import { calculate, Field, Move, Pokemon, Side } from "@calc"

describe("checkForecast — Castform type change", () => {
  const defender = () => new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })
  const castform = () => new Pokemon("Castform", { ability: "Forecast", evs: { spa: 252 }, nature: "Modest" })

  it("should become Fire-type and gain STAB on Ember during Sun", () => {
    const result = calculate(castform(), defender(), new Move("Ember"), new Field({ weather: "Sun" }))

    expect(result.description()).toEqual("252+ SpA Castform Ember vs. 252 HP / 0 SpD Blissey in Sun: 31-37 (8.5 - 10.2%)")
  })

  it("should become Water-type and gain STAB on Water Gun during Rain", () => {
    const result = calculate(castform(), defender(), new Move("Water Gun"), new Field({ weather: "Rain" }))

    expect(result.description()).toEqual("252+ SpA Castform Water Gun vs. 252 HP / 0 SpD Blissey in Rain: 31-37 (8.5 - 10.2%)")
  })

  it("should become Ice-type and gain STAB on Powder Snow during Hail", () => {
    const result = calculate(castform(), defender(), new Move("Powder Snow"), new Field({ weather: "Hail" }))

    expect(result.description()).toEqual("252+ SpA Castform Powder Snow vs. 252 HP / 0 SpD Blissey: 21-25 (5.8 - 6.9%) -- possible 8HKO after hail damage")
  })

  it("should become Ice-type and gain STAB on Powder Snow during Snow", () => {
    const result = calculate(castform(), defender(), new Move("Powder Snow"), new Field({ weather: "Snow" }))

    expect(result.description()).toEqual("252+ SpA Castform Powder Snow vs. 252 HP / 0 SpD Blissey: 21-25 (5.8 - 6.9%)")
  })

  it("should stay Normal-type without weather", () => {
    const result = calculate(castform(), defender(), new Move("Ember"), new Field())

    expect(result.description()).toEqual("252+ SpA Castform Ember vs. 252 HP / 0 SpD Blissey: 14-17 (3.8 - 4.6%)")
  })
})

describe("checkItem — Klutz and Magic Room disable held items", () => {
  const defender = () => new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })

  it("should not disable a held item without Klutz or Magic Room", () => {
    const attacker = new Pokemon("Slowbro", { item: "Choice Band", evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, defender(), new Move("Body Slam"), new Field())

    expect(result.description()).toEqual("252+ Atk Choice Band Slowbro Body Slam vs. 252 HP / 4 Def Blissey: 214-252 (59.1 - 69.6%) -- guaranteed 2HKO")
  })

  it("should disable a regular held item when the attacker has Klutz", () => {
    const attacker = new Pokemon("Slowbro", { ability: "Klutz", item: "Choice Band", evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, defender(), new Move("Body Slam"), new Field())

    expect(result.description()).toEqual("252+ Atk Slowbro Body Slam vs. 252 HP / 4 Def Blissey: 143-169 (39.5 - 46.6%) -- guaranteed 3HKO")
  })

  it("should not disable an EV item like Power Anklet even with Klutz", () => {
    const attacker = new Pokemon("Slowbro", { ability: "Klutz", item: "Power Anklet", evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, defender(), new Move("Body Slam"), new Field())

    expect(result.description()).toEqual("252+ Atk Slowbro Body Slam vs. 252 HP / 4 Def Blissey: 143-169 (39.5 - 46.6%) -- guaranteed 3HKO")
  })

  it("should disable any held item when Magic Room is active, regardless of ability", () => {
    const attacker = new Pokemon("Slowbro", { item: "Choice Band", evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(attacker, defender(), new Move("Body Slam"), new Field({ isMagicRoom: true }))

    expect(result.description()).toEqual("252+ Atk Slowbro Body Slam vs. 252 HP / 4 Def Blissey: 143-169 (39.5 - 46.6%) -- guaranteed 3HKO")
  })
})

describe("checkRawStatChanges — Power Trick and Wonder Room swap stats", () => {
  it("should swap atk/def when Power Trick is active on the attacker's side", () => {
    const attacker = new Pokemon("Shuckle", { evs: { atk: 0, def: 252 }, nature: "Bold" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field({ attackerSide: new Side({ isPowerTrick: true }) }))

    expect(result.description()).toEqual("252+ Atk (Def) Shuckle with Power Trick Tackle vs. 252 HP / 4 Def Blissey: 151-178 (41.7 - 49.1%) -- guaranteed 3HKO")
  })

  it("should not swap atk/def without Power Trick", () => {
    const attacker = new Pokemon("Shuckle", { evs: { atk: 0, def: 252 }, nature: "Bold" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field())

    expect(result.description()).toEqual("0- Atk Shuckle Tackle vs. 252 HP / 4 Def Blissey: 14-17 (3.8 - 4.6%)")
  })

  it("should swap def/spd on the defender when Wonder Room is active", () => {
    const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 0, def: 4, spd: 252 }, nature: "Careful" })

    const result = calculate(attacker, defender, new Move("Facade"), new Field({ isWonderRoom: true }))

    expect(result.description()).toEqual("252+ Atk Incineroar Facade vs. 0 HP / 252+ Def (SpD) Ferrothorn in Wonder Room: 13-16 (8.7 - 10.7%)")
  })

  it("should not swap def/spd without Wonder Room", () => {
    const attacker = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 0, def: 4, spd: 252 }, nature: "Careful" })

    const result = calculate(attacker, defender, new Move("Facade"), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Facade vs. 0 HP / 4 Def Ferrothorn: 16-19 (10.7 - 12.7%) -- possible 8HKO")
  })
})

describe("checkIntimidate — lowers the target's attack on entry", () => {
  const intimidator = () => new Pokemon("Incineroar", { ability: "Intimidate", abilityOn: true })

  it("should lower the target's attack, reducing Foul Play damage (which uses the target's Attack)", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })

    const result = calculate(intimidator(), defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("-1 252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 63-75 (34.4 - 40.9%) -- guaranteed 3HKO")
  })

  it("should not lower attack when the intimidator's ability is off", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant" })
    const attacker = new Pokemon("Incineroar", { ability: "Intimidate", abilityOn: false })

    const result = calculate(attacker, defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 93-111 (50.8 - 60.6%) -- guaranteed 2HKO")
  })

  it("should raise attack instead of lowering it when the target has Contrary", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ability: "Contrary" })

    const result = calculate(intimidator(), defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("+1 252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 141-166 (77 - 90.7%) -- guaranteed 2HKO")
  })

  it("should drop attack by 2 stages when the target has Simple", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ability: "Simple" })

    const result = calculate(intimidator(), defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("-2 252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 48-57 (26.2 - 31.1%) -- guaranteed 4HKO")
  })

  it("should also raise the target's Special Attack when it has Competitive", () => {
    const defender = new Pokemon("Garchomp", { evs: { spa: 252 }, nature: "Modest", ability: "Competitive" })

    const result = calculate(defender, intimidator(), new Move("Moonblast"), new Field())

    expect(result.description()).toEqual("+2 252+ SpA Garchomp Moonblast vs. 0 HP / 0 SpD Incineroar: 95-112 (55.8 - 65.8%) -- guaranteed 2HKO")
  })

  it("should be blocked entirely when the target holds Clear Amulet", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", item: "Clear Amulet" })

    const result = calculate(intimidator(), defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 93-111 (50.8 - 60.6%) -- guaranteed 2HKO")
  })

  it("should be blocked entirely when the target has Clear Body", () => {
    const defender = new Pokemon("Garchomp", { evs: { atk: 252 }, nature: "Adamant", ability: "Clear Body" })

    const result = calculate(intimidator(), defender, new Move("Foul Play"), new Field())

    expect(result.description()).toEqual("252+ Atk Incineroar Foul Play vs. 0 HP / 0 Def Garchomp: 93-111 (50.8 - 60.6%) -- guaranteed 2HKO")
  })
})

describe("checkMultihitBoost — reactive effects triggered by being hit multiple times", () => {
  it("should set Grassy Terrain when a Seed Sower defender is hit multiple times", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tornadus-Therian", { ability: "Seed Sower", evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("252+ Atk Cloyster Icicle Spear (3 hits) vs. 252 HP / 4 Def Tornadus-Therian: 144-168 (77.4 - 90.3%) -- guaranteed 2HKO")
  })

  it("should set Sand weather when a Sand Spit defender is hit multiple times", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Tyranitar", { ability: "Sand Spit", evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("252+ Atk Cloyster Icicle Spear (3 hits) vs. 252 HP / 4 Def Tyranitar: 54-66 (26 - 31.8%) -- guaranteed 4HKO")
  })

  it("should raise the Stamina defender's Defense progressively as it takes more hits", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 0 }, nature: "Bold" })
    const defender2 = new Pokemon("Ferrothorn", { ability: "Stamina", evs: { hp: 252, def: 252 }, nature: "Bold" })
    const defender5 = new Pokemon("Ferrothorn", { ability: "Stamina", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const twoHits = calculate(attacker, defender2, new Move("Icicle Spear", { hits: 2 }), new Field())
    const fiveHits = calculate(attacker, defender5, new Move("Icicle Spear", { hits: 5 }), new Field())

    expect(twoHits.description()).toEqual("0- Atk Cloyster Icicle Spear (2 hits) vs. 252 HP / 252+ Def Stamina Ferrothorn: 13-17 (7.1 - 9.3%)")
    expect(fiveHits.description()).toEqual("0- Atk Cloyster Icicle Spear (5 hits) vs. 252 HP / 252+ Def Stamina Ferrothorn: 24-33 (13.2 - 18.2%) -- approx. possible 6HKO")
  })

  it("should not raise the Stamina defender's Defense when the attacker has Unaware", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 0 }, nature: "Bold", ability: "Unaware" })
    const defender = new Pokemon("Ferrothorn", { ability: "Stamina", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toContain("Unaware Cloyster")
  })

  it("should lower a Weak Armor defender's Defense and raise its Speed when hit multiple times", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Skarmory", { ability: "Weak Armor", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("0- Atk Cloyster Icicle Spear (3 hits) vs. 252 HP / 252+ Def Weak Armor Skarmory: 34-43 (19.7 - 25%) -- 0.1% chance to 4HKO")
  })

  it("should boost the defender's Special Defense with Luminous Moss on a Water multi-hit move", () => {
    const attacker = new Pokemon("Cloyster", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Ferrothorn", { item: "Luminous Moss", evs: { hp: 252, spd: 4 } })

    const result = calculate(attacker, defender, new Move("Water Shuriken"), new Field())

    expect(result.description()).toEqual("252+ SpA Cloyster Water Shuriken (3 hits) vs. 252 HP / 4 SpD Luminous Moss Ferrothorn: 11-14 (6 - 7.7%)")
  })

  it("should boost the defender's Special Defense with Maranga Berry on a Special multi-hit move", () => {
    const attacker = new Pokemon("Cloyster", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Ferrothorn", { item: "Maranga Berry", evs: { hp: 252, spd: 4 } })

    const result = calculate(attacker, defender, new Move("Water Shuriken"), new Field())

    expect(result.description()).toEqual("252+ SpA Cloyster Water Shuriken (3 hits) vs. 252 HP / 4 SpD Maranga Berry Ferrothorn: 11-14 (6 - 7.7%)")
  })

  it("should lower the defender's Defense instead of raising it when Kee Berry defender has Contrary", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Ferrothorn", { item: "Kee Berry", ability: "Contrary", evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Icicle Spear", { hits: 5 }), new Field())

    expect(result.description()).toEqual("0- Atk Cloyster Icicle Spear (5 hits) vs. 252 HP / 4 Def Kee Berry Contrary Ferrothorn: 74-89 (40.8 - 49.1%) -- guaranteed 3HKO")
  })

  it("should not consume Kee Berry when the attacker has Unaware", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 252 }, nature: "Adamant", ability: "Unaware" })
    const defender = new Pokemon("Ferrothorn", { item: "Kee Berry", evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Icicle Spear", { hits: 5 }), new Field())

    expect(result.description()).not.toContain("Kee Berry")
  })

  it("should replace the attacker's ability with Mummy on a contact multi-hit move", () => {
    const attacker = new Pokemon("Zangoose", { evs: { atk: 252 }, nature: "Adamant", ability: "Unaware" })
    const defender = new Pokemon("Ferrothorn", { ability: "Mummy", item: "Kee Berry", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Double Hit"), new Field())

    expect(result.description()).toEqual("252+ Atk Unaware Zangoose Double Hit (2 hits) vs. 252 HP / 252+ Def Mummy Ferrothorn: 18-24 (9.9 - 13.2%) -- possible 8HKO")
  })
})

describe("checkInfiltrator — bypasses screens", () => {
  it("should ignore Reflect and deal full physical damage", () => {
    const attacker = new Pokemon("Ludicolo", { ability: "Infiltrator", evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field({ defenderSide: new Side({ isReflect: true }) }))

    expect(result.description()).toEqual("252+ Atk Ludicolo Tackle vs. 252 HP / 4 Def Blissey: 66-78 (18.2 - 21.5%) -- possible 5HKO")
  })

  it("should take reduced physical damage through Reflect without Infiltrator", () => {
    const attacker = new Pokemon("Ludicolo", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 4 } })

    const result = calculate(attacker, defender, new Move("Tackle"), new Field({ defenderSide: new Side({ isReflect: true }) }))

    expect(result.description()).toEqual("252+ Atk Ludicolo Tackle vs. 252 HP / 4 Def Blissey through Reflect: 33-39 (9.1 - 10.7%)")
  })
})

describe("checkMultihitBoost — Water Compaction and Weak Armor edge cases", () => {
  it("should raise the defender's Defense by 2 stages with Water Compaction on a Water multi-hit move", () => {
    const attacker = new Pokemon("Cloyster", { evs: { spa: 0 }, nature: "Bold" })
    const defender = new Pokemon("Ferrothorn", { ability: "Water Compaction", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Water Shuriken"), new Field())

    expect(result.description()).toEqual("0 SpA Cloyster Water Shuriken (3 hits) vs. 252 HP / 0 SpD Water Compaction Ferrothorn: 9-15 (4.9 - 8.2%)")
  })

  it("should not raise Water Compaction defense when the attacker has Unaware", () => {
    const attacker = new Pokemon("Cloyster", { evs: { spa: 252 }, nature: "Modest", ability: "Unaware" })
    const defender = new Pokemon("Ferrothorn", { ability: "Water Compaction", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Water Shuriken"), new Field())

    expect(result.description()).not.toContain("Water Compaction")
  })

  it("should keep the White Herb instead of dropping Defense when a Weak Armor defender is at 0 Defense boost", () => {
    const attacker = new Pokemon("Cloyster", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Skarmory", { ability: "Weak Armor", item: "White Herb", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Icicle Spear"), new Field())

    expect(result.description()).toEqual("0- Atk Cloyster Icicle Spear (3 hits) vs. 252 HP / 252+ Def White Herb Weak Armor Skarmory: 26-35 (15.1 - 20.3%) -- possible 5HKO")
  })
})

describe("checkMultihitBoost — Wandering Spirit swaps abilities in both directions", () => {
  it("should give the attacker the defender's ability and swap Wandering Spirit back", () => {
    const attacker = new Pokemon("Zangoose", { evs: { atk: 252 }, nature: "Adamant", ability: "Unaware" })
    const defender = new Pokemon("Ferrothorn", { ability: "Wandering Spirit", item: "Kee Berry", evs: { hp: 252, def: 252 }, nature: "Bold" })

    const result = calculate(attacker, defender, new Move("Double Hit"), new Field())

    expect(result.description()).toEqual("252+ Atk Unaware Zangoose Double Hit (2 hits) vs. 252 HP / 252+ Def Wandering Spirit Ferrothorn: 18-24 (9.9 - 13.2%) -- possible 8HKO")
  })
})

describe("checkMultihitBoost — item and ability reactions across hits", () => {
  it("should lower the attacker's Speed via Gooey, raising Gyro Ball's power", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })
    const defender = new Pokemon("Sliggoo", { ability: "Gooey", evs: { hp: 252 } })
    const result = calculate(attacker, defender, new Move("Gyro Ball", { hits: 2 }), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Gyro Ball (17 BP) vs. 252 HP / 0 Def Sliggoo: 17-20 (9.7 - 11.4%) -- possible 9HKO")
  })

  it("should raise the attacker's Attack between Power-Up Punch hits", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })
    const defender = new Pokemon("Blissey", { evs: { hp: 252 } })
    const result = calculate(attacker, defender, new Move("Power-Up Punch", { hits: 2 }), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Power-Up Punch vs. 252 HP / 0 Def Blissey: 182-216 (50.2 - 59.6%) -- guaranteed 2HKO")
  })

  it("should raise the defender's Special Defense with Luminous Moss against a Water move", () => {
    const attacker = new Pokemon("Pelipper", { evs: { spa: 252 } })
    const defender = new Pokemon("Blissey", { item: "Luminous Moss", evs: { hp: 252 } })
    const result = calculate(attacker, defender, new Move("Water Shuriken", { hits: 3 }), new Field())

    expect(result.description()).toEqual("252 SpA Pelipper Water Shuriken (3 hits) vs. 252 HP / 0 SpD Luminous Moss Blissey: 23-30 (6.3 - 8.2%)")
  })
})
