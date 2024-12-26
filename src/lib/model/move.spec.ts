import { Move } from "@lib/model/move"

describe("Move", () => {
  it("should initialize with the correct options", () => {
    const move = new Move("Population Bomb", { hits: "5", alliesFainted: "1" })

    expect(move.name).toBe("Population Bomb")
    expect(move.possibleHits).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
    expect(move.hits).toBe("5")
    expect(move.alliesFainted).toBe("1")
  })

  it("should return correct possible hits for Population Bomb", () => {
    const move = new Move("Population Bomb")

    expect(move.possibleHits).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
  })

  it("should return correct possible hits for Rage Fist", () => {
    const move = new Move("Rage Fist")

    expect(move.possibleHits).toEqual(["6", "5", "4", "3", "2", "1", "0"])
  })

  it("should return correct possible hits for a multihit move", () => {
    const move = new Move("Double Slap")

    expect(move.possibleHits).toEqual(["2", "3", "4", "5"])
  })

  it("should return an empty array for a non-multihit move", () => {
    const move = new Move("Thunderbolt")

    expect(move.possibleHits).toEqual([])
  })

  it("should return an empty array for a multihit move with fixed hits", () => {
    const move = new Move("Dual Wingbeat")

    expect(move.possibleHits).toEqual([])
  })
})
