import { LastRespectsAdjuster } from "@lib/damage-calculator/calc-adjuster/last-respects-adjuster"
import { Move } from "@lib/model/move"
import { Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

describe("Last Respects Adjuster", () => {
  it("Last Respects BP should be 50 when no ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "0" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Basculegion")
    const target = new SmogonPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(50)
  })

  it("Last Respects BP should be 100 when 1 ally fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "1" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Basculegion")
    const target = new SmogonPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(100)
  })

  it("Last Respects BP should be 150 when 2 allies fainted", () => {
    const move = new Move("Last Respects", { alliesFainted: "2" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Basculegion")
    const target = new SmogonPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Last Respects", () => {
    const move = new Move("Wave Crash")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Basculegion")
    const target = new SmogonPokemon("Flutter Mane")

    new LastRespectsAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})
