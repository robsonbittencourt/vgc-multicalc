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

  it("should default the ally Pledge to none", () => {
    const move = new Move("Fire Pledge")

    expect(move.allyPledge).toBe("")
  })

  it("should keep the ally Pledge declared for the move", () => {
    const move = new Move("Fire Pledge", { allyPledge: "Water Pledge" })

    expect(move.allyPledge).toBe("Water Pledge")
  })

  it("should depend on the last move failing for Stomping Tantrum", () => {
    expect(new Move("Stomping Tantrum").dependsOnLastMoveFailed()).toBe(true)
  })

  it("should depend on the last move failing for Temper Flare", () => {
    expect(new Move("Temper Flare").dependsOnLastMoveFailed()).toBe(true)
  })

  it("should not depend on the last move failing for a regular move", () => {
    expect(new Move("Flare Blitz").dependsOnLastMoveFailed()).toBe(false)
  })

  it("should depend on the target already moving for Payback", () => {
    expect(new Move("Payback").dependsOnTargetAlreadyMoved()).toBe(true)
  })

  it("should depend on the target already moving for Bolt Beak", () => {
    expect(new Move("Bolt Beak").dependsOnTargetAlreadyMoved()).toBe(true)
  })

  it("should depend on the target already moving for Fishious Rend", () => {
    expect(new Move("Fishious Rend").dependsOnTargetAlreadyMoved()).toBe(true)
  })

  it("should not depend on the target already moving for a regular move", () => {
    expect(new Move("Liquidation").dependsOnTargetAlreadyMoved()).toBe(false)
  })

  it("should default the damaged by target flag to false", () => {
    expect(new Move("Avalanche").damagedByTarget).toBe(false)
  })

  it("should keep the damaged by target flag declared for the move", () => {
    expect(new Move("Avalanche", { damagedByTarget: true }).damagedByTarget).toBe(true)
  })

  it("should depend on being damaged by the target for Avalanche", () => {
    expect(new Move("Avalanche").dependsOnDamagedByTarget()).toBe(true)
  })

  it("should depend on being damaged by the target for Revenge", () => {
    expect(new Move("Revenge").dependsOnDamagedByTarget()).toBe(true)
  })

  it("should not depend on being damaged by the target for a regular move", () => {
    expect(new Move("Icicle Crash").dependsOnDamagedByTarget()).toBe(false)
  })

  it("should recognize a Pledge move", () => {
    expect(new Move("Grass Pledge").isPledge()).toBe(true)
  })

  it("should not recognize a regular move as a Pledge", () => {
    expect(new Move("Flamethrower").isPledge()).toBe(false)
  })

  it("should list the other two Pledges as partners of a Pledge", () => {
    expect(new Move("Water Pledge").pledgePartners()).toEqual(["Fire Pledge", "Grass Pledge"])
  })

  it("should list no Pledge partners for a regular move", () => {
    expect(new Move("Flamethrower").pledgePartners()).toEqual([])
  })

  it("should combine with a different Pledge", () => {
    expect(new Move("Fire Pledge").combinesPledgeWith(new Move("Grass Pledge"))).toBe(true)
  })

  it("should not combine with the same Pledge", () => {
    expect(new Move("Fire Pledge").combinesPledgeWith(new Move("Fire Pledge"))).toBe(false)
  })

  it("should not combine a Pledge with a regular move", () => {
    expect(new Move("Fire Pledge").combinesPledgeWith(new Move("Flamethrower"))).toBe(false)
  })
})
