import { MOVES } from "@smogon/calc"
import { Move } from "./move"

export class MoveSet {
  
  activeMoveStorage: Move
  
  move1Storage: Move
  move2Storage: Move
  move3Storage: Move
  move4Storage: Move
  
  constructor(move1: string, move2: string, move3: string, move4: string) {
    this.activeMoveStorage = new Move(move1)
    this.move1Storage = new Move(move1)
    this.move2Storage = new Move(move2)
    this.move3Storage = new Move(move3)
    this.move4Storage = new Move(move4)
  }

  get activeMove(): Move {
    return this.activeMoveStorage
  }

  set activeMove(move: Move) {
    this.activeMoveStorage = move
  }
  
  get move1(): Move {
    return this.move1Storage
  }

  set move1(move1: Move) {
    this.move1Storage = move1
  }

  get move2(): Move {
    return this.move2Storage
  }

  set move2(move2: Move) {
    this.move2Storage = move2
  }

  get move3(): Move {
    return this.move3Storage
  }

  set move3(move3: Move) {
    this.move3Storage = move3
  }

  get move4(): Move {
    return this.move4Storage
  }

  set move4(move4: Move) {
    this.move4Storage = move4
  }

  activatedMovePosition(): number {
    if (this.move1Storage.name == this.activeMoveStorage.name) return 1
    if (this.move2Storage.name == this.activeMoveStorage.name) return 2
    if (this.move3Storage.name == this.activeMoveStorage.name) return 3
    if (this.move4Storage.name == this.activeMoveStorage.name) return 4
    return 0
  }

  clone(): MoveSet {
    return new MoveSet(this.move1Storage.name, this.move2Storage.name, this.move3Storage.name, this.move4Storage.name)
  }

}