import { RageFistAdjuster } from "./rage-fist-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Rage Fist Adjuster", () => {
  it("Rage Fist BP should be 50 when no hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "0" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Annihilape")
    const target = new CalcPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(50)
  })

  it("Rage Fist BP should be 100 when 1 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "1" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Annihilape")
    const target = new CalcPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(100)
  })

  it("Rage Fist BP should be 150 when 2 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "2" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Annihilape")
    const target = new CalcPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Rage Fist", () => {
    const move = new Move("Drain Punch")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Annihilape")
    const target = new CalcPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(undefined)
  })
})
