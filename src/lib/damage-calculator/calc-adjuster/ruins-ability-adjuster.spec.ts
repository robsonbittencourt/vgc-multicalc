import { RuinsAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/ruins-ability-adjuster"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Field as FieldSmogon, Generations, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

describe("Ruins Ability Adjuster", () => {
  const gen = Generations.get(9)

  it("should not turn any Ruin Ability when have just one attacker", () => {
    const move = new Move("Leech Seed")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Wo-Chien")
    const secondAttacker = undefined
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when attacker have this ability", () => {
    const move = new Move("Leech Seed")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Wo-Chien")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(true)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Rillaboom")
    const secondAttacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(new Move("Leech Seed"), new Move("Pollen Puff"), new Move("Ruination"), new Move("Protect")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(true)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when attacker have this ability", () => {
    const move = new Move("Icicle Crash")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Chien-Pao")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(true)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Rillaboom")
    const secondAttacker = new Pokemon("Chien-Pao", { moveSet: new MoveSet(move, new Move("Sacred Sword"), new Move("Sucker Punch"), new Move("Protect")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(true)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when attacker have this ability", () => {
    const move = new Move("Ruination")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Ting-Lu")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(true)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Rillaboom")
    const secondAttacker = new Pokemon("Ting-Lu", { moveSet: new MoveSet(new Move("Ruination"), new Move("Throat Chop"), new Move("Stomping Tantrum"), new Move("Taunt")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(true)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Beads of Ruin when attacker have this ability", () => {
    const move = new Move("Heat Wave")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Chi-Yu")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(true)
  })

  it("should turn on Beads of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Rillaboom")
    const secondAttacker = new Pokemon("Chi-Yu", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Snarl"), new Move("Overheat"), new Move("Dark Pulse")) })
    const target = new SmogonPokemon(gen, "Flutter Mane")
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(true)
  })
})
