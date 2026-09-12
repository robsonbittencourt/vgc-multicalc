import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"
import { SteelySpiritAdjuster } from "./steely-spirit-adjuster"
import { Field } from "@multicalc/model/field"
import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"

describe("Steely Spirit Adjuster", () => {
  it("should activate attacker side Steely Spirit when the second attacker has Steely Spirit", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Perrserker", { ability: new Ability("Steely Spirit") })
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(true)
  })

  it("should not activate attacker side Steely Spirit when the second attacker does not have Steely Spirit", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Perrserker", { ability: new Ability("Clear Body") })
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })

  it("should not activate attacker side Steely Spirit when there is no second attacker", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })

  it("should NOT turn on Steely Spirit when the second attacker has this ability but Neutralizing Gas is active on the field", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Perrserker", { ability: new Ability("Steely Spirit") })
    const field = new Field({ isNeutralizingGas: true })

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })

  it("should turn off the Steely Spirit that came from the field when the attacker has Neutralizing Gas", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Weezing-Galar", { ability: "Neutralizing Gas" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc({ attackerSide: { isSteelySpirit: true } })
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })

  it("should turn off the Steely Spirit that came from the field when the target has Neutralizing Gas", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Weezing-Galar", { ability: "Neutralizing Gas" })
    const calcField = new FieldCalc({ attackerSide: { isSteelySpirit: true } })
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })

  it("should NOT turn on Steely Spirit when the second attacker has both this ability and Neutralizing Gas is on another Pokemon", () => {
    const move = new Move("Iron Head")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Weezing-Galar", { ability: new Ability("Neutralizing Gas") })
    const field = new Field()

    new SteelySpiritAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isSteelySpirit).toBe(false)
  })
})
