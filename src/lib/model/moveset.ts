import { MovePosition } from "../types"
import { Move } from "./move"

export class MoveSet {

  readonly moves: Move[]
  readonly activeMove: Move
  readonly activeMovePosition: MovePosition

  constructor(move1: Move, move2: Move, move3: Move, move4: Move, activeMovePosition: MovePosition = 1) {
    this.moves = [move1, move2, move3, move4]
    this.activeMove = this.moves[activeMovePosition - 1]
    this.activeMovePosition = activeMovePosition
  }

  get move1(): Move {
    return this.moves[0]
  }

  get move2(): Move {
    return this.moves[1]
  }

  get move3(): Move {
    return this.moves[2]
  }

  get move4(): Move {
    return this.moves[3]
  }

  clone(): MoveSet {
    return new MoveSet(new Move(this.move1.name), new Move(this.move2.name), new Move(this.move3.name), new Move(this.move4.name), this.activeMovePosition)
  }

}