import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"

describe("MoveSet", () => {
  it("should set the correct active move", () => {
    const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"), 2)

    expect(moveSet.activeMove.name).toBe("Quick Attack")
  })

  it("should clone the MoveSet correctly", () => {
    const moveSet = new MoveSet(new Move("Thunderbolt"), new Move("Quick Attack"), new Move("Iron Tail"), new Move("Electro Ball"), 2)

    const clonedMoveSet = moveSet.clone()

    expect(clonedMoveSet.move1.name).toBe("Thunderbolt")
    expect(clonedMoveSet.move2.name).toBe("Quick Attack")
    expect(clonedMoveSet.move3.name).toBe("Iron Tail")
    expect(clonedMoveSet.move4.name).toBe("Electro Ball")
    expect(clonedMoveSet.activeMovePosition).toBe(2)
  })
})
