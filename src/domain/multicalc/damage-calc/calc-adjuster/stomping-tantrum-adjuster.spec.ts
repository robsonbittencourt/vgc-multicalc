import { StompingTantrumAdjuster } from "./stomping-tantrum-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon } from "@calc"

describe("Stomping Tantrum Adjuster", () => {
  it("Stomping Tantrum BP should be 75 when last move did not fail", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: false })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Landorus-Therian")
    const target = new CalcPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(undefined)
  })

  it("Stomping Tantrum BP should be 150 when last move failed", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: true })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Landorus-Therian")
    const target = new CalcPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Stomping Tantrum", () => {
    const move = new Move("Earthquake")
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Landorus-Therian")
    const target = new CalcPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveCalc)

    expect(moveCalc.overrides?.basePower).toBe(undefined)
  })
})
