import { Ability } from "@multicalc/model/ability"
import { RuinsAbilityAdjuster } from "@multicalc/calc-adjuster/ruins-ability-adjuster"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Field as FieldCalc, Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Ruins Ability Adjuster", () => {
  it("should not turn any Ruin Ability when have just one attacker", () => {
    const move = new Move("Leech Seed")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Wo-Chien")
    const secondAttacker = undefined
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when attacker have this ability", () => {
    const move = new Move("Leech Seed")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Wo-Chien")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(true)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Tablets of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Rillaboom")
    const secondAttacker = new Pokemon("Wo-Chien", { moveSet: new MoveSet(new Move("Leech Seed"), new Move("Pollen Puff"), new Move("Ruination"), new Move("Protect")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(true)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when attacker have this ability", () => {
    const move = new Move("Icicle Crash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chien-Pao")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(true)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Sword of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Rillaboom")
    const secondAttacker = new Pokemon("Chien-Pao", { moveSet: new MoveSet(move, new Move("Sacred Sword"), new Move("Sucker Punch"), new Move("Protect")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(true)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when attacker have this ability", () => {
    const move = new Move("Ruination")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Ting-Lu")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(true)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Vessel of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Rillaboom")
    const secondAttacker = new Pokemon("Ting-Lu", { moveSet: new MoveSet(new Move("Ruination"), new Move("Throat Chop"), new Move("Stomping Tantrum"), new Move("Taunt")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(true)
    expect(fieldCalc.isBeadsOfRuin).toBe(false)
  })

  it("should turn on Beads of Ruin when attacker have this ability", () => {
    const move = new Move("Heat Wave")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chi-Yu")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(true)
  })

  it("should turn on Beads of Ruin when second attacker have this ability", () => {
    const move = new Move("Grassy Glide")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Rillaboom")
    const secondAttacker = new Pokemon("Chi-Yu", { moveSet: new MoveSet(new Move("Heat Wave"), new Move("Snarl"), new Move("Overheat"), new Move("Dark Pulse")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker)

    expect(fieldCalc.isTabletsOfRuin).toBe(false)
    expect(fieldCalc.isSwordOfRuin).toBe(false)
    expect(fieldCalc.isVesselOfRuin).toBe(false)
    expect(fieldCalc.isBeadsOfRuin).toBe(true)
  })

  it("should NOT turn on Sword of Ruin when attacker have this ability but Neutralizing Gas is active", () => {
    const move = new Move("Icicle Crash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chien-Pao")
    const secondAttacker = new Pokemon("Rillaboom", { moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Fake Out"), new Move("Wood Hammer"), new Move("High Horsepower")) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()
    const field = new Field({ isNeutralizingGas: true })

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker, field)

    expect(fieldCalc.isSwordOfRuin).toBe(false)
  })

  it("should NOT turn on Sword of Ruin when second attacker has Neutralizing Gas", () => {
    const move = new Move("Icicle Crash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Chien-Pao")
    const secondAttacker = new Pokemon("Weezing", { ability: new Ability("Neutralizing Gas", true) })
    const target = new CalcPokemon("Flutter Mane")
    const fieldCalc = new FieldCalc()
    const field = new Field({ isNeutralizingGas: false })

    new RuinsAbilityAdjuster().adjust(attacker, target, move, moveCalc, fieldCalc, secondAttacker, field)

    expect(fieldCalc.isSwordOfRuin).toBe(false)
  })
})
