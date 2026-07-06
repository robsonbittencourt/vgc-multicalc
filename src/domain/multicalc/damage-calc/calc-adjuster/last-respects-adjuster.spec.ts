import { LastRespectsAdjuster } from "./last-respects-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Last Respects Adjuster", () => {
  it("Last Respects BP should be 50 when no ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "0" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Basculegion")
    const target = new CalcPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(50)
  })

  it("Last Respects BP should be 100 when 1 ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "1" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Basculegion")
    const target = new CalcPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(100)
  })

  it("Last Respects BP should be 150 when 2 allies fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "2" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Basculegion")
    const target = new CalcPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Last Respects", () => {
    const move = new Move("Wave Crash")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Basculegion")
    const target = new CalcPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(undefined)
  })
})
