import { Move } from "./move"

export class MoveSet {
  
  private _moves: Move[]
  
  constructor(move1: string, move2: string, move3: string, move4: string) {
    this._moves = [new Move(move1), new Move(move2), new Move(move3), new Move(move4)].sort((a, b) => b.bp() - a.bp())
    this.move1.active = true
  }

  get activeMove(): Move {
    return this._moves.find(m => m.active)!
  }

  activeMoveByPosition(position: number) {
    this.deactivateAll()
    this._moves[position - 1].active = true
  }

  activeMoveByName(moveName: string) {
    this.deactivateAll()
    this._moves.find(move => move.name == moveName)!.active = true
  }
  
  get move1(): Move {
    return this._moves[0]
  }

  set move1(move1: Move) {
    this.setMoveByPosition(1, move1)
  }

  get move2(): Move {
    return this._moves[1]
  }

  set move2(move2: Move) {
    this.setMoveByPosition(2, move2)
  }

  get move3(): Move {
    return this._moves[2]
  }

  set move3(move3: Move) {
    this.setMoveByPosition(3, move3)
  }

  get move4(): Move {
    return this._moves[3]
  }

  set move4(move4: Move) {
    this.setMoveByPosition(4, move4)
  }

  moves(): Move[] {
    return this._moves
  }

  clone(): MoveSet {
    const newMoveSet = new MoveSet(this.move1.name, this.move2.name, this.move3.name, this.move4.name)
    newMoveSet.activeMoveByName(this.activeMove.name)

    return newMoveSet
  }

  private setMoveByPosition(position: 1 | 2 | 3 | 4, move: Move) {
    this.deactivateAll()
    move.active = true
    this._moves[position - 1] = move
  }

  private deactivateAll() {
    this._moves.forEach(m => m.active = false)
  }

}