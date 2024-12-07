import { Move } from "./move"
import { MovePosition } from "./types"

export class MoveSet {
  
  private _moves: Move[]
  private _activeMove: Move
  private _activeMovePosition: MovePosition
  
  constructor(move1: Move, move2: Move, move3: Move, move4: Move, activeMovePosition: MovePosition = 1) {
    this._moves = [move1, move2, move3, move4]
    this._activeMove = this._moves[activeMovePosition - 1]
    this._activeMovePosition = activeMovePosition
  }

  get activeMove(): Move {
    return this._activeMove
  }

  get activeMovePosition(): MovePosition {
    return this._activeMovePosition
  }

  get move1(): Move {
    return this._moves[0]
  }

  get move2(): Move {
    return this._moves[1]
  }

  get move3(): Move {
    return this._moves[2]
  }

  get move4(): Move {
    return this._moves[3]
  }

  moves(): Move[] {
    return this._moves
  }

  clone(): MoveSet {
    return new MoveSet(new Move(this.move1.name), new Move(this.move2.name), new Move(this.move3.name), new Move(this.move4.name), this._activeMovePosition)
  }


}