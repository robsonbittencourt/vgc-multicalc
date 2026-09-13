import { calculate, Field, Move, Pokemon } from "@calc"

describe("Damage — species-specific and Gem item modifiers", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Thick Club: doubles Marowak physical Attack", () => {
    const attacker = new Pokemon("Marowak-Alola", { sps: { atk: 32 }, nature: "Adamant", item: "Thick Club" })
    const defender = new Pokemon("Talonflame", { sps: { hp: 32, def: 1 } })
    const move = new Move("Shadow Bone")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Thick Club Marowak-Alola Shadow Bone vs. 32 HP / 1 Def Talonflame: 151-178 (81.6 - 96.2%) -- guaranteed 2HKO")
  })

  it("Deep Sea Tooth: doubles Clamperl Special Attack", () => {
    const attacker = new Pokemon("Clamperl", { sps: { spa: 32 }, nature: "Modest", item: "Deep Sea Tooth" })
    const defender = new Pokemon("Ferrothorn", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Surf")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Deep Sea Tooth Clamperl Surf vs. 32 HP / 1 SpD Ferrothorn: 38-45 (20.9 - 24.8%) -- guaranteed 5HKO")
  })

  it("Metal Powder: boosts Ditto Defense against physical", () => {
    const attacker = new Pokemon("Great Tusk", { sps: { atk: 32 }, nature: "Adamant" })
    const defender = new Pokemon("Ditto", { sps: { hp: 32, def: 1 }, item: "Metal Powder" })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ Atk Great Tusk Close Combat vs. 32 HP / 1 Def Metal Powder Ditto: 198-234 (127.7 - 150.9%) -- guaranteed OHKO")
  })

  it("Deep Sea Scale: boosts Clamperl Special Defense", () => {
    const attacker = new Pokemon("Sylveon", { sps: { spa: 32 }, nature: "Modest" })
    const defender = new Pokemon("Clamperl", { sps: { hp: 32, spd: 1 }, item: "Deep Sea Scale" })
    const move = new Move("Hyper Voice")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Sylveon Hyper Voice vs. 32 HP / 1 SpD Deep Sea Scale Clamperl: 30-36 (21.1 - 25.3%) -- 0.1% chance to 4HKO")
  })

  it("Type Gem: boosts the matching type by 1.3x on first use", () => {
    const attacker = new Pokemon("Raging Bolt", { sps: { spa: 32 }, nature: "Modest", item: "Electric Gem" })
    const defender = new Pokemon("Pelipper", { sps: { hp: 32, spd: 1 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("32+ SpA Electric Gem Raging Bolt Thunderbolt vs. 32 HP / 1 SpD Pelipper: 604-712 (361.6 - 426.3%) -- guaranteed OHKO")
  })
})
