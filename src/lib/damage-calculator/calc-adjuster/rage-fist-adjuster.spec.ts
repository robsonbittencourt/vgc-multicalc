import { RageFistAdjuster } from "@lib/damage-calculator/calc-adjuster/rage-fist-adjuster"
import { Move } from "@lib/model/move"
import { Move as MoveSmogon, Pokemon as SmogonPokemon } from "@calc"

describe("Rage Fist Adjuster", () => {
  it("Rage Fist BP should be 50 when no hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "0" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Annihilape")
    const target = new SmogonPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(50)
  })

  it("Rage Fist BP should be 100 when 1 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "1" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Annihilape")
    const target = new SmogonPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(100)
  })

  it("Rage Fist BP should be 150 when 2 hit was taken", () => {
    const move = new Move("Rage Fist", { hits: "2" })
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Annihilape")
    const target = new SmogonPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(150)
  })

  it("should not change BP of move when it is not Rage Fist", () => {
    const move = new Move("Drain Punch")
    const moveSmogon = new MoveSmogon(move.name)
    const attacker = new SmogonPokemon("Annihilape")
    const target = new SmogonPokemon("Flutter Mane")

    new RageFistAdjuster().adjust(attacker, target, move, moveSmogon)

    expect(moveSmogon.overrides?.basePower).toBe(undefined)
  })
})
