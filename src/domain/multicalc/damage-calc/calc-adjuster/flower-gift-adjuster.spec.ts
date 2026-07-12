import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"
import { FlowerGiftAdjuster } from "./flower-gift-adjuster"
import { Field } from "@multicalc/model/field"
import { Ability } from "@multicalc/model/ability"
import { Pokemon } from "@multicalc/model/pokemon"

describe("Flower Gift Adjuster", () => {
  it("should activate attacker side Flower Gift when the second attacker is Cherrim with Flower Gift", () => {
    const move = new Move("Return")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Cherrim", { ability: new Ability("Flower Gift") })
    const field = new Field()

    new FlowerGiftAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isFlowerGift).toBe(true)
  })

  it("should not activate attacker side Flower Gift when the second attacker is Cherrim without Flower Gift", () => {
    const move = new Move("Return")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const secondAttacker = new Pokemon("Cherrim", { ability: new Ability("Flower Veil") })
    const field = new Field()

    new FlowerGiftAdjuster().adjust(attacker, target, move, moveCalc, calcField, secondAttacker, field)

    expect(calcField.attackerSide.isFlowerGift).toBe(false)
  })

  it("should not activate attacker side Flower Gift when there is no second attacker", () => {
    const move = new Move("Return")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Incineroar", { ability: "Intimidate" })
    const target = new CalcPokemon("Ferrothorn")
    const calcField = new FieldCalc()
    const field = new Field()

    new FlowerGiftAdjuster().adjust(attacker, target, move, moveCalc, calcField, undefined, field)

    expect(calcField.attackerSide.isFlowerGift).toBe(false)
  })
})
