import { StompingTantrumAdjuster } from "@lib/damage-calculator/calc-adjuster/stomping-tantrum-adjuster"
import { Move } from "@lib/model/move"
import { Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

describe("Stomping Tantrum Adjuster", () => {
  it("Stomping Tantrum BP should be 75 when last move did not fail", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: false })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Landorus-Therian")
    const target = new SmogonPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })

  it("Stomping Tantrum BP should be 150 when last move failed", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: true })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Landorus-Therian")
    const target = new SmogonPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Stomping Tantrum", () => {
    const move = new Move("Earthquake")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Landorus-Therian")
    const target = new SmogonPokemon("Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})
