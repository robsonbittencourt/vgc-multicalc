import { StompingTantrumAdjuster } from "@lib/damage-calculator/calc-adjuster/stomping-tantrum-adjuster"
import { Move } from "@lib/model/move"
import { Generations, Move as MoveSmogon, Pokemon as SmogonPokemon } from "@robsonbittencourt/calc"

describe("Stomping Tantrum Adjuster", () => {
  const gen = Generations.get(9)

  it("Stomping Tantrum BP should be 75 when last move did not fail", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: false })
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Landorus-Therian")
    const target = new SmogonPokemon(gen, "Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })

  it("Stomping Tantrum BP should be 150 when last move failed", () => {
    const move = new Move("Stomping Tantrum", { lastMoveFailed: true })
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Landorus-Therian")
    const target = new SmogonPokemon(gen, "Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Stomping Tantrum", () => {
    const move = new Move("Earthquake")
    const moveSmogon = new MoveSmogon(gen, move.name)
    const attacker = new SmogonPokemon(gen, "Landorus-Therian")
    const target = new SmogonPokemon(gen, "Flutter Mane")

    new StompingTantrumAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})
