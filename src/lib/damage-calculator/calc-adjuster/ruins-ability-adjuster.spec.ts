import { Field as FieldSmogon, Generations, Move as MoveSmogon } from "@robsonbittencourt/calc"
import { Move } from '../../move'
import { MoveSet } from '../../moveset'
import { Pokemon } from '../../pokemon'
import { Target } from '../../target'
import { RuinsAbilityAdjuster } from './ruins-ability-adjuster'

describe("Ruins Ability Adjuster", () => {
  it("should not turn any Ruin Ability when have just one attacker", () => {
    const move = new Move("Leech Seed")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(move, new Move("Pollen Puff"), new Move("Ruination"), new Move("Protect"))})
    const secondAttacker = undefined
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when attacker have this ability", () => {
    const move = new Move("Leech Seed")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(move, new Move("Pollen Puff"), new Move("Ruination"), new Move("Protect"))})
    const secondAttacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(true)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(move, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const secondAttacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(new Move("Leech Seed"), new Move("Pollen Puff"), new Move("Ruination"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(true)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when attacker have this ability", () => {
    const move = new Move("Icicle Crash")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Chien-Pao", { moveSet: new MoveSet(move, new Move("Sacred Sword"), new Move("Sucker Punch"), new Move("Protect"))})
    const secondAttacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(true)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(move, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const secondAttacker = new Pokemon("Chien-Pao", { moveSet: new MoveSet(move, new Move("Sacred Sword"), new Move("Sucker Punch"), new Move("Protect"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(true)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when attacker have this ability", () => {
    const move = new Move("Ruination")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Ting-Lu", { moveSet: new MoveSet(move, new Move("Throat Chop"), new Move("Stomping Tanrum"), new Move("Taunt"))})
    const secondAttacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(true)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(move, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const secondAttacker = new Pokemon("Ting-Lu", { moveSet: new MoveSet(new Move("Ruination"), new Move("Throat Chop"), new Move("Stomping Tanrum"), new Move("Taunt"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(true)
    expect(fieldSmogon.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Beads of Ruin when attacker have this ability", () => {
    const move = new Move("Heat Wave")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon("Chi-Yu", { moveSet: new MoveSet(move, new Move("Snarl"), new Move("Overheat"), new Move("Dark Pulse"))})
    const secondAttacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(true)
  })

  it("should turn on Beads of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveSmogon = new MoveSmogon(Generations.get(9), move.name)
    const attacker = new Pokemon('Rillaboom', { moveSet: new MoveSet(move, new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower"))})
    const secondAttacker = new Pokemon("Chi-Yu", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Snarl"), new Move("Overheat"), new Move("Dark Pulse"))})
    const target = new Target(new Pokemon("Flutter Mane"))
    const fieldSmogon = new FieldSmogon()

    new RuinsAbilityAdjuster().adjust(attacker, target.pokemon, move, moveSmogon, fieldSmogon, secondAttacker)

    expect(fieldSmogon.isTabletsOfRuin).toBe(false)
    expect(fieldSmogon.isSwordOfRuin).toBe(false)
    expect(fieldSmogon.isVesselOfRuin).toBe(false)
    expect(fieldSmogon.isBeadsOfRuin).toBe(true)
  })

})