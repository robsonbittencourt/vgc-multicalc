import { Move } from "@multicalc/model/move"

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

  it("should return correct possible hits taken for Rage Fist", () => {
    const move = new Move("Rage Fist")

    expect(move.possibleHitsTaken).toEqual(["6", "5", "4", "3", "2", "1", "0"])
    expect(move.possibleHits).toEqual([])
  })

  it("should return correct possible hits for a multihit move", () => {
    const move = new Move("Bullet Seed")

    expect(move.possibleHits).toEqual(["2", "3", "4", "5"])
  })

  it("should not offer hit options for a fixed three hit move", () => {
    const move = new Move("Surging Strikes")

    expect(move.possibleHits).toEqual([])
    expect(move.hits).toBe("3")
  })

  it("should not offer hit options for Triple Dive", () => {
    const move = new Move("Triple Dive")

    expect(move.possibleHits).toEqual([])
    expect(move.hits).toBe("3")
  })

  it("should not offer hit options for a fixed two hit move", () => {
    const move = new Move("Dual Chop")

    expect(move.possibleHits).toEqual([])
    expect(move.hits).toBe("2")
  })

  it("should ignore a stored hits value for a fixed hit move", () => {
    const move = new Move("Surging Strikes", { hits: "2" })

    expect(move.hits).toBe("3")
  })

  it("should still offer hit options for Dragon Darts", () => {
    const move = new Move("Dragon Darts")

    expect(move.possibleHits).toEqual(["1", "2"])
    expect(move.hits).toBe("1")
  })

  it("should return an empty array for a non-multihit move", () => {
    const move = new Move("Thunderbolt")

    expect(move.possibleHits).toEqual([])
  })

  it("should fall back to the normal target for a move whose data omits target", () => {
    const move = new Move("Barrage")

    expect(move.target).toBe("normal")
  })

  it("should fall back to an empty name when constructed without a name", () => {
    const move = new Move(undefined as unknown as string)

    expect(move.name).toBe("")
    expect(move.possibleHits).toEqual([])
    expect(move.category).toBe("Status")
  })

  it("should not throw and fall back to neutral values for an unknown move", () => {
    const move = new Move("Not A Real Move")

    expect(move.name).toBe("Not A Real Move")
    expect(move.bp).toBe(0)
    expect(move.category).toBe("Status")
    expect(move.type).toBe("Normal")
  })
})
