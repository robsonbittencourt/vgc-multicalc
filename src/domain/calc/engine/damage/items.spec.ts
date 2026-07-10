import { calculate, Field, Move, Pokemon, Side } from "@calc"

describe("Damage — item modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Type-boost item: Charcoal boosts Fire by 1.2x", () => {
    const attacker = new Pokemon("Skeledirge", { evs: { spa: 252 }, nature: "Modest", item: "Charcoal" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Torch Song")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Charcoal Skeledirge Torch Song vs. 252 HP / 4 SpD Ferrothorn: 280-336 (154.6 - 185.6%) -- guaranteed OHKO")
  })

  it("Soul Dew: boosts Latios Psychic/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Latios", { evs: { spa: 252 }, nature: "Modest", item: "Soul Dew" })
    const defender = new Pokemon("Hydreigon", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Soul Dew Latios Draco Meteor vs. 252 HP / 4 SpD Hydreigon: 318-374 (159.7 - 187.9%) -- guaranteed OHKO")
  })

  it("Adamant Orb: boosts Dialga Steel/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Dialga", { evs: { spa: 252 }, nature: "Modest", item: "Adamant Orb" })
    const defender = new Pokemon("Baxcalibur", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Adamant Orb Dialga Draco Meteor vs. 252 HP / 4 SpD Baxcalibur: 366-432 (164.8 - 194.5%) -- guaranteed OHKO")
  })

  it("Punching Glove: boosts punch moves by 1.1x", () => {
    const attacker = new Pokemon("Iron Hands", { evs: { atk: 252 }, nature: "Adamant", item: "Punching Glove" })
    const defender = new Pokemon("Glimmora", { evs: { hp: 252, def: 4 } })
    const move = new Move("Drain Punch")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Punching Glove Iron Hands Drain Punch vs. 252 HP / 4 Def Glimmora: 90-106 (47.3 - 55.7%) -- 78.9% chance to 2HKO")
  })

  it("Light Ball: doubles Pikachu offenses", () => {
    const attacker = new Pokemon("Pikachu", { evs: { spa: 252 }, nature: "Modest", item: "Light Ball" })
    const defender = new Pokemon("Pelipper", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Light Ball Pikachu Thunderbolt vs. 252 HP / 4 SpD Pelipper: 504-592 (301.7 - 354.4%) -- guaranteed OHKO")
  })

  it("Metronome: boosts by 1.2x after one prior use", () => {
    const attacker = new Pokemon("Flutter Mane", { evs: { spa: 252 }, nature: "Modest", item: "Metronome" })
    const defender = new Pokemon("Basculegion", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Moonblast", { timesUsedWithMetronome: 1 })

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Metronome Flutter Mane Moonblast vs. 252 HP / 4 SpD Basculegion: 138-163 (60.7 - 71.8%) -- guaranteed 2HKO")
  })

  it("Resist berry: halves a super-effective hit", () => {
    const attacker = new Pokemon("Talonflame", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Kingambit", { evs: { hp: 252, spd: 4 }, item: "Occa Berry" })
    const move = new Move("Overheat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Talonflame Overheat vs. 252 HP / 4 SpD Kingambit: 96-114 (46.3 - 55%) reduced by Occa Berry -- guaranteed 2HKO")
  })

  it("Adamant Crystal: boosts Dialga-Origin Steel/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Dialga-Origin", { evs: { spa: 252 }, nature: "Modest", item: "Adamant Crystal" })
    const defender = new Pokemon("Baxcalibur", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Adamant Crystal Dialga-Origin Draco Meteor vs. 252 HP / 4 SpD Baxcalibur: 366-432 (164.8 - 194.5%) -- guaranteed OHKO")
  })

  it("Lustrous Orb: boosts Palkia Water/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Palkia", { evs: { spa: 252 }, nature: "Modest", item: "Lustrous Orb" })
    const defender = new Pokemon("Landorus", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Hydro Pump")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Lustrous Orb Palkia Hydro Pump vs. 252 HP / 4 SpD Landorus: 326-386 (166.3 - 196.9%) -- guaranteed OHKO")
  })

  it("Lustrous Globe: boosts Palkia-Origin Water/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Palkia-Origin", { evs: { spa: 252 }, nature: "Modest", item: "Lustrous Globe" })
    const defender = new Pokemon("Garchomp", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Lustrous Globe Palkia-Origin Draco Meteor vs. 252 HP / 4 SpD Garchomp: 368-434 (171.1 - 201.8%) -- guaranteed OHKO")
  })

  it("Griseous Orb: boosts Giratina Ghost/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Giratina", { evs: { atk: 252 }, nature: "Adamant", item: "Griseous Orb" })
    const defender = new Pokemon("Gholdengo", { evs: { hp: 252, def: 4 } })
    const move = new Move("Shadow Force")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Griseous Orb Giratina Shadow Force vs. 252 HP / 4 Def Gholdengo: 236-278 (121.6 - 143.2%) -- guaranteed OHKO")
  })

  it("Griseous Core: boosts Giratina-Origin Ghost/Dragon by 1.2x", () => {
    const attacker = new Pokemon("Giratina-Origin", { evs: { spa: 252 }, nature: "Modest", item: "Griseous Core" })
    const defender = new Pokemon("Dragonite", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Draco Meteor")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Griseous Core Giratina-Origin Draco Meteor vs. 252 HP / 4 SpD Dragonite: 276-326 (139.3 - 164.6%) -- guaranteed OHKO")
  })

  it("Cornerstone Mask: boosts Ogerpon-Cornerstone by 1.2x", () => {
    const attacker = new Pokemon("Ogerpon-Cornerstone", { evs: { atk: 252 }, nature: "Adamant", ability: "Sturdy", item: "Cornerstone Mask" })
    const defender = new Pokemon("Volcarona", { evs: { hp: 252, def: 4 } })
    const move = new Move("Ivy Cudgel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Cornerstone Mask Ogerpon-Cornerstone Ivy Cudgel vs. 252 HP / 4 Def Volcarona: 600-708 (312.5 - 368.7%) -- guaranteed OHKO")
  })

  it("Hearthflame Mask: boosts Ogerpon-Hearthflame by 1.2x", () => {
    const attacker = new Pokemon("Ogerpon-Hearthflame", { evs: { atk: 252 }, nature: "Adamant", ability: "Mold Breaker", item: "Hearthflame Mask" })
    const defender = new Pokemon("Kingambit", { evs: { hp: 252, def: 4 } })
    const move = new Move("Ivy Cudgel")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Hearthflame Mask Ogerpon-Hearthflame Ivy Cudgel vs. 252 HP / 4 Def Kingambit: 182-216 (87.9 - 104.3%) -- 18.8% chance to OHKO")
  })

  it("Utility Umbrella: negates the attacker's Sun boost on Fire moves", () => {
    const attacker = new Pokemon("Arcanine", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, spd: 4 }, item: "Utility Umbrella" })
    const move = new Move("Flamethrower")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", weather: "Sun" }))

    expect(result.description()).toEqual("252+ SpA Arcanine Flamethrower vs. 252 HP / 4 SpD Ferrothorn: 252-300 (139.2 - 165.7%) -- guaranteed OHKO")
  })

  it("Heavy-Duty Boots: keeps Multiscale active despite Stealth Rock", () => {
    const attacker = new Pokemon("Arcanine", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Dragonite", { evs: { hp: 252 }, ability: "Multiscale", item: "Heavy-Duty Boots" })
    const move = new Move("Wild Charge")

    const result = calculate(attacker, defender, move, new Field({ gameType: "Doubles", defenderSide: new Side({ isSR: true }) }))

    expect(result.description()).toEqual("252+ Atk Arcanine Wild Charge vs. 252 HP / 0 Def Multiscale Dragonite: 26-31 (13.1 - 15.6%) -- possible 7HKO")
  })
})
