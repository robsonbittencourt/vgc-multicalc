import { computeDamageWithoutBerry, getDamageWithoutBerry } from "@calc/engine/berry"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { RawDesc } from "@data/types"

describe("getDamageWithoutBerry", () => {
  const move = new Move("Flamethrower")

  it("returns undefined when the defender holds no item", () => {
    const defender = new Pokemon("Snorlax")
    const rawDesc = {} as RawDesc

    expect(getDamageWithoutBerry(120, rawDesc, move, defender)).toBeUndefined()
  })

  it("returns undefined when the held berry does not resist the move type", () => {
    const defender = new Pokemon("Snorlax", { item: "Colbur Berry" })
    const rawDesc = { defenderItem: "Colbur Berry" } as RawDesc

    expect(getDamageWithoutBerry(120, rawDesc, move, defender)).toBeUndefined()
  })

  it("doubles a scalar damage when the berry resists the move type", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    expect(getDamageWithoutBerry(120, rawDesc, move, defender)).toBe(240)
  })

  it("quadruples a scalar damage when the defender has Ripen", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry", ability: "Ripen" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    expect(getDamageWithoutBerry(120, rawDesc, move, defender)).toBe(480)
  })

  it("doubles every roll of a damage list", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    expect(getDamageWithoutBerry([10, 11, 12], rawDesc, move, defender)).toEqual([20, 22, 24])
  })

  it("only unreduces the first hit of a multi-hit matrix", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    const result = getDamageWithoutBerry(
      [
        [10, 12],
        [20, 24]
      ],
      rawDesc,
      move,
      defender
    )

    expect(result).toEqual([
      [20, 24],
      [20, 24]
    ])
  })
})

describe("computeDamageWithoutBerry", () => {
  const move = new Move("Flamethrower")

  it("returns undefined when there is no berry to unreduce", () => {
    const defender = new Pokemon("Snorlax")
    const rawDesc = {} as RawDesc

    expect(computeDamageWithoutBerry(120, rawDesc, move, defender)).toBeUndefined()
  })

  it("wraps a scalar damage into a single-element list", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    expect(computeDamageWithoutBerry(120, rawDesc, move, defender)).toEqual([240])
  })

  it("returns the unreduced roll list as-is", () => {
    const defender = new Pokemon("Snorlax", { item: "Occa Berry" })
    const rawDesc = { defenderItem: "Occa Berry" } as RawDesc

    expect(computeDamageWithoutBerry([10, 11, 12], rawDesc, move, defender)).toEqual([20, 22, 24])
  })
})
