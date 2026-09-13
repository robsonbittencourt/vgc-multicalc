import { calculate, Field, Move, Pokemon, Side } from "@calc"

describe("Damage — item modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Type-boost item: Charcoal boosts Fire by 1.2x", () => {
    const attacker = new Pokemon("Skeledirge", { sps: { spa: 32 }, nature: "Modest", item: "Charcoal" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Torch Song")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Charcoal Skeledirge Torch Song vs. 32 HP / 1 SpD Ferrothorn: 280-336 (154.6 - 185.6%) -- guaranteed OHKO")
  })

  it("Soul Dew: boosts Latios Psychic/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Latios", { sps: { spa: 32 }, nature: "Modest", item: "Soul Dew" })
    const defender = new Pokemon("Hydreigon", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Soul Dew Latios Draco Meteor vs. 32 HP / 1 SpD Hydreigon: 318-374 (159.7 - 187.9%) -- guaranteed OHKO")
  })

  it("Adamant Orb: boosts Dialga Steel/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Dialga", { sps: { spa: 32 }, nature: "Modest", item: "Adamant Orb" })
    const defender = new Pokemon("Baxcalibur", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Adamant Orb Dialga Draco Meteor vs. 32 HP / 1 SpD Baxcalibur: 366-432 (164.8 - 194.5%) -- guaranteed OHKO")
  })

  it("Punching Glove: boosts punch moves by 1.1x", () => {
    const attacker = new Pokemon("Iron Hands", { sps: { atk: 32 }, nature: "Adamant", item: "Punching Glove" })
    const defender = new Pokemon("Glimmora", { sps: { hp: 32, def: 1 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Punching Glove Iron Hands Drain Punch vs. 32 HP / 1 Def Glimmora: 90-106 (47.3 - 55.7%) -- 78.9% chance to 2HKO")
  })

  it("Light Ball: doubles Pikachu offenses", () => {
    const attacker = new Pokemon("Pikachu", { sps: { spa: 32 }, nature: "Modest", item: "Light Ball" })
    const defender = new Pokemon("Pelipper", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Light Ball Pikachu Thunderbolt vs. 32 HP / 1 SpD Pelipper: 504-592 (301.7 - 354.4%) -- guaranteed OHKO")
  })

  it("Metronome: boosts by 1.2x after one prior use", () => {
    const attacker = new Pokemon("Flutter Mane", { sps: { spa: 32 }, nature: "Modest", item: "Metronome" })
    const defender = new Pokemon("Basculegion", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Moonblast", { timesUsedWithMetronome: 1 })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Metronome Flutter Mane Moonblast vs. 32 HP / 1 SpD Basculegion: 138-163 (60.7 - 71.8%) -- guaranteed 2HKO")
  })

  it("Resist berry: halves a super-effective hit", () => {
    const attacker = new Pokemon("Talonflame", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Kingambit", { sps: { hp: 32, spd: 1 }, item: "Occa Berry" })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Talonflame Overheat vs. 32 HP / 1 SpD Kingambit: 96-114 (46.3 - 55%) reduced by Occa Berry -- guaranteed 2HKO")
  })

  it("Adamant Crystal: boosts Dialga-Origin Steel/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Dialga-Origin", { sps: { spa: 32 }, nature: "Modest", item: "Adamant Crystal" })
    const defender = new Pokemon("Baxcalibur", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Adamant Crystal Dialga-Origin Draco Meteor vs. 32 HP / 1 SpD Baxcalibur: 366-432 (164.8 - 194.5%) -- guaranteed OHKO")
  })

  it("Lustrous Orb: boosts Palkia Water/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Palkia", { sps: { spa: 32 }, nature: "Modest", item: "Lustrous Orb" })
    const defender = new Pokemon("Landorus", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Hydro Pump")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Lustrous Orb Palkia Hydro Pump vs. 32 HP / 1 SpD Landorus: 326-386 (166.3 - 196.9%) -- guaranteed OHKO")
  })

  it("Lustrous Globe: boosts Palkia-Origin Water/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Palkia-Origin", { sps: { spa: 32 }, nature: "Modest", item: "Lustrous Globe" })
    const defender = new Pokemon("Garchomp", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Lustrous Globe Palkia-Origin Draco Meteor vs. 32 HP / 1 SpD Garchomp: 368-434 (171.1 - 201.8%) -- guaranteed OHKO")
  })

  it("Griseous Orb: boosts Giratina Ghost/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Giratina", { sps: { atk: 32 }, nature: "Adamant", item: "Griseous Orb" })
    const defender = new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 } })
    const move = new Move("Shadow Force")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Griseous Orb Giratina Shadow Force vs. 32 HP / 1 Def Gholdengo: 236-278 (121.6 - 143.2%) -- guaranteed OHKO")
  })

  it("Griseous Core: boosts Giratina-Origin Ghost/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Giratina-Origin", { sps: { spa: 32 }, nature: "Modest", item: "Griseous Core" })
    const defender = new Pokemon("Dragonite", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Griseous Core Giratina-Origin Draco Meteor vs. 32 HP / 1 SpD Dragonite: 276-326 (139.3 - 164.6%) -- guaranteed OHKO")
  })

  it("Cornerstone Mask: boosts Ogerpon-Cornerstone by 1.2x", () => {
    const attacker = new Pokemon("Ogerpon-Cornerstone", { sps: { atk: 32 }, nature: "Adamant", ability: "Sturdy", item: "Cornerstone Mask" })
    const defender = new Pokemon("Volcarona", { sps: { hp: 32, def: 1 } })
    const move = new Move("Ivy Cudgel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Cornerstone Mask Ogerpon-Cornerstone Ivy Cudgel vs. 32 HP / 1 Def Volcarona: 600-708 (312.5 - 368.7%) -- guaranteed OHKO")
  })

  it("Hearthflame Mask: boosts Ogerpon-Hearthflame by 1.2x", () => {
    const attacker = new Pokemon("Ogerpon-Hearthflame", { sps: { atk: 32 }, nature: "Adamant", ability: "Mold Breaker", item: "Hearthflame Mask" })
    const defender = new Pokemon("Kingambit", { sps: { hp: 32, def: 1 } })
    const move = new Move("Ivy Cudgel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Hearthflame Mask Ogerpon-Hearthflame Ivy Cudgel vs. 32 HP / 1 Def Kingambit: 182-216 (87.9 - 104.3%) -- 18.8% chance to OHKO")
  })

  it("Utility Umbrella: negates the attacker's Sun boost on Fire moves", () => {
    const attacker = new Pokemon("Arcanine", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, spd: 1 }, item: "Utility Umbrella" })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("32+ SpA Arcanine Flamethrower vs. 32 HP / 1 SpD Ferrothorn: 252-300 (139.2 - 165.7%) -- guaranteed OHKO")
  })

  it("Heavy-Duty Boots: keeps Multiscale active despite Stealth Rock", () => {
    const attacker = new Pokemon("Arcanine", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Dragonite", { sps: { hp: 32 }, ability: "Multiscale", item: "Heavy-Duty Boots" })
    const move = new Move("Wild Charge")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isSR: true }) }))

    expect(result.description()).toEqual("32+ Atk Arcanine Wild Charge vs. 32 HP / 0 Def Multiscale Dragonite: 26-31 (13.1 - 15.6%) -- 79.6% chance to 4HKO")
  })

  it("Ring Target: lets a Ground move deal damage to a Flying-type defender", () => {
    const attacker = new Pokemon("Landorus-Therian", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Tornadus", { sps: { hp: 32 }, item: "Ring Target" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Landorus-Therian Earthquake vs. 32 HP / 0 Def Tornadus: 102-120 (54.8 - 64.5%) -- guaranteed 2HKO")
  })

  it("Ring Target: lets a Normal move deal damage to a Ghost-type defender", () => {
    const attacker = new Pokemon("Snorlax", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Dragapult", { sps: { hp: 32 }, item: "Ring Target" })
    const move = new Move("Body Slam")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Snorlax Body Slam vs. 32 HP / 0 Def Dragapult: 91-108 (46.6 - 55.3%) -- 66.8% chance to 2HKO")
  })

  it("Ring Target: Klutz suppresses the item, keeping the type immunity", () => {
    const attacker = new Pokemon("Landorus-Therian", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Tornadus", { sps: { hp: 32 }, item: "Ring Target", ability: "Klutz" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.damage).toEqual(0)
  })

  it("Iron Ball: lets a Ground move deal damage to a Flying-type defender", () => {
    const attacker = new Pokemon("Landorus-Therian", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Tornadus", { sps: { hp: 32 }, item: "Iron Ball" })
    const move = new Move("Earthquake")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Landorus-Therian Earthquake vs. 32 HP / 0 Def Tornadus: 102-120 (54.8 - 64.5%) -- guaranteed 2HKO")
  })
})
