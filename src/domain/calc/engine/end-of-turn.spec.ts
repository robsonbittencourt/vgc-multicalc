import { getEndOfTurn } from "@calc/engine/end-of-turn"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"

function endOfTurn(defenderName: string, defenderOptions: Record<string, unknown>, moveName: string): { damage: number; texts: string[] } {
  const attacker = new Pokemon("Garchomp")
  const defender = new Pokemon(defenderName, defenderOptions as never)

  return getEndOfTurn(attacker, defender, new Move(moveName), new Field())
}

describe("getEndOfTurn — Black Sludge", () => {
  it("damages a non-Poison holder for an eighth of its max HP", () => {
    const result = endOfTurn("Blissey", { item: "Black Sludge" }, "Tackle")

    expect(result).toEqual({ damage: -41, texts: ["Black Sludge damage"] })
  })

  it("spares a non-Poison holder protected by Magic Guard", () => {
    const result = endOfTurn("Clefable", { item: "Black Sludge", ability: "Magic Guard" }, "Tackle")

    expect(result).toEqual({ damage: 0, texts: [] })
  })
})

describe("getEndOfTurn — Sea of Fire", () => {
  it("burns the defender for an eighth of its max HP under the Fire Pledge combination", () => {
    const result = endOfTurn("Blissey", {}, "Fire Pledge (Grass Pledge Boosted)")

    expect(result).toEqual({ damage: -41, texts: ["Sea of Fire damage"] })
  })

  it("burns the defender under the Grass Pledge combination as well", () => {
    const result = endOfTurn("Blissey", {}, "Grass Pledge (Fire Pledge Boosted)")

    expect(result).toEqual({ damage: -41, texts: ["Sea of Fire damage"] })
  })

  it("spares a Fire-type defender, which is immune to the Sea of Fire", () => {
    const result = endOfTurn("Charizard", {}, "Fire Pledge (Grass Pledge Boosted)")

    expect(result).toEqual({ damage: 0, texts: [] })
  })
})
