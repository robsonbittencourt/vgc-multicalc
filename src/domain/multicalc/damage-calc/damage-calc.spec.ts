import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { Field, FieldSide } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { Ability } from "@multicalc/model/ability"

describe("Damage Calc Service", () => {
  let service: DamageCalc

  beforeEach(() => {
    service = new DamageCalc()
  })

  it("should calculate damage", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Thunderbolt")
    expect(damageResult.result).toEqual("40 - 48.4%")
    expect(damageResult.koChance).toEqual("guaranteed 3HKO")
    expect(damageResult.damage).toEqual(48.4)
    expect(damageResult.description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")
    expect(damageResult.attackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])
  })

  it("should apply Light Ball attack boost", () => {
    const attacker = new Pokemon("Pikachu", { item: "Light Ball", nature: "Hasty", evs: { spa: 252 }, moveSet: new MoveSet(new Move("Rising Voltage"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Lucario-Mega", { evs: { hp: 0, spd: 12 } }))
    const field = new Field({ terrain: "Electric" })

    const damageResult = service.calcDamageAllAttacks(attacker, target.pokemon, field, true)

    expect(damageResult[0].move).toEqual("Rising Voltage")
    expect(damageResult[0].result).toEqual("157.2 - 184.8%")
    expect(damageResult[0].koChance).toEqual("guaranteed OHKO")
    expect(damageResult[0].damage).toEqual(184.8)
    expect(damageResult[0].description).toEqual("252 SpA Light Ball Pikachu Rising Voltage (140 BP) vs. 0 HP / 12 SpD Lucario-Mega in Electric Terrain: 228-268 (157.2 - 184.8%) -- guaranteed OHKO")
  })

  it("should calculate damage with multi hit move", () => {
    const attacker = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })

    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Surging Strikes")
    expect(damageResult.result).toEqual("133.8 - 159.2%")
    expect(damageResult.koChance).toEqual("guaranteed OHKO")
    expect(damageResult.damage).toEqual(159.2)
    expect(damageResult.description).toEqual("252+ Atk Urshifu-Rapid-Strike Surging Strikes (3 hits) vs. 0 HP / 0 Def Flutter Mane on a critical hit: 174-207 (133.8 - 159.2%) -- guaranteed OHKO")
    expect(damageResult.attackerRolls[0]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
    expect(damageResult.attackerRolls[1]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
    expect(damageResult.attackerRolls[2]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
  })

  it("should calculate damage to all attacks", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResults = service.calcDamageAllAttacks(attacker, target.pokemon, field, true)

    expect(damageResults.length).toEqual(4)

    expect(damageResults[0].attacker.id).toEqual(attacker.id)
    expect(damageResults[0].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[0].move).toEqual("Thunderbolt")
    expect(damageResults[0].result).toEqual("40 - 48.4%")
    expect(damageResults[0].koChance).toEqual("guaranteed 3HKO")
    expect(damageResults[0].damage).toEqual(48.4)
    expect(damageResults[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane: 52-63 (40 - 48.4%) -- guaranteed 3HKO")
    expect(damageResults[0].attackerRolls).toEqual([[52, 54, 54, 54, 55, 55, 57, 57, 58, 58, 58, 60, 60, 61, 61, 63]])

    expect(damageResults[1].attacker.id).toEqual(attacker.id)
    expect(damageResults[1].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[1].move).toEqual("Thunderclap")
    expect(damageResults[1].result).toEqual("32.3 - 37.6%")
    expect(damageResults[1].koChance).toEqual("92.7% chance to 3HKO")
    expect(damageResults[1].damage).toEqual(37.6)
    expect(damageResults[1].description).toEqual("0 SpA Raging Bolt Thunderclap vs. 0 HP / 0 SpD Flutter Mane: 42-49 (32.3 - 37.6%) -- 92.7% chance to 3HKO")
    expect(damageResults[1].attackerRolls).toEqual([[42, 42, 42, 43, 43, 43, 45, 45, 45, 46, 46, 46, 48, 48, 48, 49]])

    expect(damageResults[2].attacker.id).toEqual(attacker.id)
    expect(damageResults[2].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[2].move).toEqual("Draco Meteor")
    expect(damageResults[2].result).toEqual("0 - 0%")
    expect(damageResults[2].koChance).toEqual("Does not cause any damage")
    expect(damageResults[2].damage).toEqual(0)
    expect(damageResults[2].description).toEqual("Raging Bolt Draco Meteor vs. Flutter Mane: 0-0 (0 - 0%) -- possibly the worst move ever")
    expect(damageResults[2].attackerRolls).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])

    expect(damageResults[3].attacker.id).toEqual(attacker.id)
    expect(damageResults[3].defender.id).toEqual(target.pokemon.id)
    expect(damageResults[3].move).toEqual("Protect")
    expect(damageResults[2].result).toEqual("0 - 0%")
    expect(damageResults[2].koChance).toEqual("Does not cause any damage")
    expect(damageResults[2].damage).toEqual(0)
    expect(damageResults[3].description).toEqual("Raging Bolt Protect vs. Flutter Mane: 0-0 (0 - 0%)")
    expect(damageResults[2].attackerRolls).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
  })

  it("should calculate damage to two attackers", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(secondAttacker.id)
    expect(damageResult.secondAttacker!.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Grassy Glide")
    expect(damageResult.result).toEqual("72.3 - 87.6%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(87.6)
    expect(damageResult.description).toEqual("0 Atk Rillaboom Grassy Glide AND 0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 Def / 0 SpD Assault Vest Flutter Mane: 94-114 (72.3 - 87.6%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls).toEqual([[60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]])
    expect(damageResult.secondAttackerRolls).toEqual([[34, 36, 36, 36, 36, 37, 37, 37, 39, 39, 39, 39, 40, 40, 40, 42]])
  })

  it("should calculate damage to two attackers considering speed", () => {
    const attacker = new Pokemon("Raging Bolt", { boosts: { spe: 2 }, moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.secondAttacker?.id).toEqual(secondAttacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Thunderbolt")
    expect(damageResult.result).toEqual("72.3 - 87.6%")
    expect(damageResult.koChance).toEqual("guaranteed 2HKO")
    expect(damageResult.damage).toEqual(87.6)
    expect(damageResult.description).toEqual("0 SpA Raging Bolt Thunderbolt AND 0 Atk Rillaboom Grassy Glide vs. 0 HP / 0 Def / 0 SpD Assault Vest Flutter Mane: 94-114 (72.3 - 87.6%) -- guaranteed 2HKO")
    expect(damageResult.attackerRolls).toEqual([[34, 36, 36, 36, 36, 37, 37, 37, 39, 39, 39, 39, 40, 40, 40, 42]])
    expect(damageResult.secondAttackerRolls).toEqual([[60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]])
  })

  it("should calculate damage to two attackers without damage", () => {
    const attacker = new Pokemon("Jolteon", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Zapdos", { moveSet: new MoveSet(new Move("Thunder"), new Move("Thunderbolt"), new Move("Air Slash"), new Move("Protect")) })
    const target = new Target(new Pokemon("Ting-Lu"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toEqual("Jolteon Thunder AND Zapdos Thunder vs. Ting-Lu: 0-0 (0 - 0%) -- possibly the worst move ever")
  })

  it("should inject adjusted BP in description when adjuster sets override", () => {
    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum", { lastMoveFailed: true }), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toContain("Stomping Tantrum (150 BP)")
  })

  it("should not inject adjusted BP when adjuster does not set override", () => {
    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum", { lastMoveFailed: false }), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).not.toContain("BP)")
  })

  it("should inject adjusted BP in description for both attackers when both have overrides", () => {
    const attacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum", { lastMoveFailed: true }), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Garchomp", { moveSet: new MoveSet(new Move("Stomping Tantrum", { lastMoveFailed: true }), new Move("Earthquake"), new Move("Dragon Claw"), new Move("Protect")) })
    const target = new Target(new Pokemon("Venusaur"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description.match(/Stomping Tantrum \(150 BP\)/g)?.length).toBe(2)
  })

  it("should calculate damage to two attackers one with multi hit move", () => {
    const attacker = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
      evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
    })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })

    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attacker.id).toEqual(attacker.id)
    expect(damageResult.defender.id).toEqual(target.pokemon.id)
    expect(damageResult.move).toEqual("Surging Strikes")
    expect(damageResult.result).toEqual("180 - 214.6%")
    expect(damageResult.koChance).toEqual("guaranteed OHKO")
    expect(damageResult.damage).toEqual(214.6)
    expect(damageResult.description).toEqual("252+ Atk Urshifu-Rapid-Strike Surging Strikes (3 hits) AND 0 Atk Rillaboom Grassy Glide vs. 0 HP / 0 Def Flutter Mane on a critical hit: 234-279 (180 - 214.6%) -- guaranteed OHKO")
    expect(damageResult.attackerRolls[0]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
    expect(damageResult.attackerRolls[1]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
    expect(damageResult.attackerRolls[2]).toEqual([58, 58, 60, 60, 60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69])
    expect(damageResult.secondAttackerRolls).toEqual([[60, 61, 61, 63, 63, 64, 64, 66, 66, 67, 67, 69, 69, 70, 70, 72]])
  })

  it("should calculate damage to two attackers with Tera active in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { teraType: "Fairy", teraTypeActive: true, nature: "Bold", boosts: { def: 1 }, evs: { def: 252, spd: 12 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +1 252+ Def / 12 SpD Assault Vest Tera Fairy Flutter Mane")
  })

  it("should calculate damage to two attackers with positive def modifier/nature in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { nature: "Bold", boosts: { def: 1 }, evs: { def: 252, spd: 12 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +1 252+ Def / 12 SpD Assault Vest Flutter Mane")
  })

  it("should calculate damage to two attackers with positive spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { nature: "Sassy", boosts: { spd: 3 }, evs: { def: 20, spd: 228 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / 20 Def / +3 228+ SpD Assault Vest Flutter Mane")
  })

  it("should calculate damage to two attackers with negative def modifier/nature in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { nature: "Hasty", boosts: { def: -1 }, evs: { def: 140, spd: 28 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / -1 140- Def / 28 SpD Assault Vest Flutter Mane")
  })

  it("should calculate damage to two attackers with negative spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { nature: "Naive", boosts: { spd: -3 }, evs: { def: 36, spd: 148 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / 36 Def / -3 148- SpD Assault Vest Flutter Mane")
  })

  it("should calculate damage to two attackers with positive def modifier/nature and negative spd modifier/nature in defender", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new Target(new Pokemon("Flutter Mane", { nature: "Lax", boosts: { def: 6, spd: -4 }, evs: { def: 252, spd: 140 }, item: "Assault Vest" }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.description).toContain("vs. 0 HP / +6 252+ Def / -4 140- SpD Assault Vest Flutter Mane")
  })

  it("should calculate damage in a critical hit when attacker have critical hit configured and right is defender", () => {
    const rightIsDefender = true
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const attackerSide = new FieldSide({ isCriticalHit: true })
    const field = new Field({ attackerSide })

    const damageResult = service.calcDamageAllAttacks(attacker, target.pokemon, field, rightIsDefender)

    expect(damageResult[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane on a critical hit: 79-94 (60.7 - 72.3%) -- guaranteed 2HKO")
  })

  it("should calculate damage in a critical hit when defender have critical hit configured and right is not defender", () => {
    const rightIsDefender = false
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const defenderSide = new FieldSide({ isCriticalHit: true })
    const field = new Field({ defenderSide })

    const damageResult = service.calcDamageAllAttacks(attacker, target.pokemon, field, rightIsDefender)

    expect(damageResult[0].description).toEqual("0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 SpD Flutter Mane on a critical hit: 79-94 (60.7 - 72.3%) -- guaranteed 2HKO")
  })

  it("should calculate damage of a fixed damage move", () => {
    const attacker = new Pokemon("Annihilape", { moveSet: new MoveSet(new Move("Final Gambit"), new Move("Close Combat"), new Move("Shadow Claw"), new Move("Coaching")) })
    const target = new Target(new Pokemon("Incineroar"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.move).toEqual("Final Gambit")
    expect(damageResult.result).toEqual("108.8 - 108.8%")
    expect(damageResult.koChance).toEqual("guaranteed OHKO")
    expect(damageResult.damage).toEqual(108.8)
    expect(damageResult.description).toEqual("Annihilape Final Gambit vs. 0 HP Incineroar: 185-185 (108.8 - 108.8%) -- guaranteed OHKO")
    expect(damageResult.attackerRolls).toEqual([[185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185, 185]])
  })

  it("should calculate Ruination damage as half of the target current HP", () => {
    const attacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(new Move("Ruination"), new Move("Leech Seed"), new Move("Pollen Puff"), new Move("Protect")) })
    const target = new Target(new Pokemon("Flutter Mane"))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.move).toEqual("Ruination")
    expect(damageResult.damage).toEqual(50)
    expect(damageResult.attackerRolls).toEqual([[65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65]])
  })

  it("should consider berry in damage calculation", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Flapple", { item: "Sitrus Berry", ability: new Ability("Ripen") }))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toEqual("0 Atk Urshifu Close Combat vs. 0 HP / 0 Def Flapple: 102-121 (70.3 - 83.4%) -- 77.3% chance to 2HKO after Sitrus Berry recovery")
  })

  it("should return berryHP when Sitrus Berry triggers", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field()

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toEqual(50)
  })

  it("should trigger Sitrus Berry and affect second attacker damage (Water Spout)", () => {
    const attacker1 = new Pokemon("Urshifu", { item: "Choice Band", moveSet: new MoveSet(new Move("Rock Smash"), new Move(""), new Move(""), new Move("")) })
    const attacker2 = new Pokemon("Kyogre", { moveSet: new MoveSet(new Move("Water Spout"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 }, nature: "Modest" })

    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", evs: { hp: 252 } }))
    const field = new Field()

    const result = service.calcDamageForTwoAttackers(attacker1, attacker2, target.pokemon, field)

    expect(result.description).toContain("after Sitrus Berry recovery")
  })

  it("should trigger Enigma Berry correctly with two attackers (Neutral -> Super Effective)", () => {
    const attacker1 = new Pokemon("Flutter Mane", { moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")) })
    const attacker2 = new Pokemon("Landorus-Therian", { moveSet: new MoveSet(new Move("Bulldoze"), new Move(""), new Move(""), new Move("")) })

    const target = new Target(new Pokemon("Incineroar", { item: "Enigma Berry", evs: { hp: 252 } }))
    const field = new Field()

    const result = service.koChanceForTwoAttackers(attacker1, attacker2, target.pokemon, field)

    expect(result).toContain("after Enigma Berry recovery")
  })

  it("should apply Colbur Berry damage reduction when Unnerve is off", () => {
    const attacker = new Pokemon("Tyranitar-Mega", { evs: { spa: 0 }, moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Farigiraf", { item: "Colbur Berry", evs: { hp: 29, spd: 11 } }))
    const field = new Field({ isUnnerve: false })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).toContain("Colbur Berry")
  })

  it("should NOT apply Colbur Berry damage reduction when Unnerve is on", () => {
    const attacker = new Pokemon("Tyranitar-Mega", { evs: { spa: 0 }, moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Farigiraf", { item: "Colbur Berry", evs: { hp: 29, spd: 11 } }))
    const field = new Field({ isUnnerve: true })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.description).not.toContain("Colbur Berry")
  })

  it("should apply Sitrus Berry recovery when Unnerve is off", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field({ isUnnerve: false })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toBeGreaterThan(0)
  })

  it("should NOT apply Sitrus Berry recovery when Unnerve is on", () => {
    const attacker = new Pokemon("Urshifu", { moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Incineroar", { item: "Sitrus Berry", nature: "Impish", evs: { hp: 252, def: 252 } }))
    const field = new Field({ isUnnerve: true })

    const damageResult = service.calcDamage(attacker, target.pokemon, field)

    expect(damageResult.berryHP).toEqual(0)
  })

  it("should fill scalar fixed damage into a full roll array for two attackers", () => {
    const attacker = new Pokemon("Alakazam", { moveSet: new MoveSet(new Move("Seismic Toss"), new Move(""), new Move(""), new Move("")) })
    const secondAttacker = new Pokemon("Chansey", { moveSet: new MoveSet(new Move("Seismic Toss"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Snorlax", { evs: { hp: 252 } }))
    const field = new Field()

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)

    expect(damageResult.attackerRolls).toEqual([[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]])
    expect(damageResult.secondAttackerRolls).toEqual([[50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]])
  })

  it("should read the left attacker crit flag when rightIsDefender is false for two attackers", () => {
    const attacker = new Pokemon("Raging Bolt", { moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")) })
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")) })
    const target = new Target(new Pokemon("Flutter Mane", { item: "Assault Vest" }))
    const field = new Field({ defenderSide: new FieldSide({ isCriticalHit: true }) })

    const damageResult = service.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field, false)

    expect(damageResult.description).toEqual("0 Atk Rillaboom Grassy Glide AND 0 SpA Raging Bolt Thunderbolt vs. 0 HP / 0 Def / 0 SpD Assault Vest Flutter Mane on a critical hit: 143-171 (110 - 131.5%) -- guaranteed OHKO")
  })
})
