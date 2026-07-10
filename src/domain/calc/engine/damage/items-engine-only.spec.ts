import { calculate, Field, Move, Pokemon } from "@calc"
import { ItemName } from "@data/types"

describe("Damage — item modifiers present in the engine but absent from the dataset", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("Thick Club: doubles Marowak physical Attack", () => {
    const attacker = new Pokemon("Marowak-Alola", { evs: { atk: 252 }, nature: "Adamant", item: "Thick Club" as ItemName })
    const defender = new Pokemon("Talonflame", { evs: { hp: 252, def: 4 } })
    const move = new Move("Shadow Bone")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Thick Club Marowak-Alola Shadow Bone vs. 252 HP / 4 Def Talonflame: 151-178 (81.6 - 96.2%) -- guaranteed 2HKO")
  })

  it("Deep Sea Tooth: doubles Clamperl Special Attack", () => {
    const attacker = new Pokemon("Clamperl", { evs: { spa: 252 }, nature: "Modest", item: "Deep Sea Tooth" as ItemName })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Surf")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Deep Sea Tooth Clamperl Surf vs. 252 HP / 4 SpD Ferrothorn: 38-45 (20.9 - 24.8%) -- guaranteed 5HKO")
  })

  it("Metal Powder: boosts Ditto Defense against physical", () => {
    const attacker = new Pokemon("Great Tusk", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Ditto", { evs: { hp: 252, def: 4 }, item: "Metal Powder" as ItemName })
    const move = new Move("Close Combat")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ Atk Great Tusk Close Combat vs. 252 HP / 4 Def Metal Powder Ditto: 198-234 (127.7 - 150.9%) -- guaranteed OHKO")
  })

  it("Deep Sea Scale: boosts Clamperl Special Defense", () => {
    const attacker = new Pokemon("Sylveon", { evs: { spa: 252 }, nature: "Modest" })
    const defender = new Pokemon("Clamperl", { evs: { hp: 252, spd: 4 }, item: "Deep Sea Scale" as ItemName })
    const move = new Move("Hyper Voice")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Sylveon Hyper Voice vs. 252 HP / 4 SpD Deep Sea Scale Clamperl: 30-36 (21.1 - 25.3%) -- 0.1% chance to 4HKO")
  })

  it("Type Gem: boosts the matching type by 1.3x on first use", () => {
    const attacker = new Pokemon("Raging Bolt", { evs: { spa: 252 }, nature: "Modest", item: "Electric Gem" as ItemName })
    const defender = new Pokemon("Pelipper", { evs: { hp: 252, spd: 4 } })
    const move = new Move("Thunderbolt")

    const result = calculate(attacker, defender, move, field())

    expect(result.description()).toEqual("252+ SpA Electric Gem Raging Bolt Thunderbolt vs. 252 HP / 4 SpD Pelipper: 604-712 (361.6 - 426.3%) -- guaranteed OHKO")
  })
})
