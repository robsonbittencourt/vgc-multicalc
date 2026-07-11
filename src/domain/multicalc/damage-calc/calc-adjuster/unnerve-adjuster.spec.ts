import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"
import { UnnerveAdjuster } from "./unnerve-adjuster"
import { Field } from "@multicalc/model/field"
import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"

describe("Unnerve Adjuster", () => {
  it("should activate field Unnerve when the attacker has Unnerve", () => {
    const move = new Move("Rock Slide")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Aerodactyl", { ability: "Unnerve" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = undefined
    const field = new Field()

    new UnnerveAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.isUnnerve).toBe(true)
  })

  it("should activate field Unnerve when the second attacker has Unnerve", () => {
    const move = new Move("Flare Blitz")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kangaskhan-Mega", { ability: "Parental Bond" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Aerodactyl", { ability: new Ability("Unnerve") })
    const field = new Field()

    new UnnerveAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.isUnnerve).toBe(true)
  })

  it("should activate field Unnerve when the second attacker has As One (Glastrier)", () => {
    const move = new Move("Flare Blitz")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kangaskhan-Mega", { ability: "Parental Bond" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Calyrex-Ice", { ability: new Ability("As One (Glastrier)") })
    const field = new Field()

    new UnnerveAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.isUnnerve).toBe(true)
  })

  it("should not activate field Unnerve when neither attacker has it", () => {
    const move = new Move("Flare Blitz")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kangaskhan-Mega", { ability: "Parental Bond" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Incineroar", { ability: new Ability("Intimidate") })
    const field = new Field()

    new UnnerveAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.isUnnerve).toBe(false)
  })

  it("should not throw when there is no second attacker and the attacker does not have Unnerve", () => {
    const move = new Move("Flare Blitz")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kangaskhan-Mega", { ability: "Parental Bond" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const field = new Field()

    new UnnerveAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, field)

    expect(calcField.isUnnerve).toBe(false)
  })
})
