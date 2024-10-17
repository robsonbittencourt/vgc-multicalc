import { Move } from "./move"

export class MoveSet {
  
  activeMoveStorage: Move
  
  move1Storage: Move
  move2Storage: Move
  move3Storage: Move
  move4Storage: Move
  
  constructor(move1: string, move2: string, move3: string, move4: string) {
    const orderedByBp = [new Move(move1), new Move(move2), new Move(move3), new Move(move4)].sort((a, b) => b.bp() - a.bp())

    this.activeMoveStorage = orderedByBp[0]
    
    this.move1Storage = orderedByBp[0]
    this.move2Storage = orderedByBp[1]
    this.move3Storage = orderedByBp[2]
    this.move4Storage = orderedByBp[3]
  }

  get activeMove(): Move {
    return this.activeMoveStorage
  }

  activeMoveByPosition(position: number, move: Move) {
    this.activeMoveStorage = move

    switch(position) {
      case 1: 
        this.move1Storage = move 
        break
      case 2: 
        this.move2Storage = move 
        break
      case 3: 
        this.move3Storage = move 
        break
      case 4: 
        this.move4Storage = move 
        break
    }
  }

  activeMoveByName(moveName: string) {
    this.activeMoveStorage = this.moves().find(move => move.name == moveName)!
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

  moves(): Move[] {
    return [this.move1, this.move2, this.move3, this.move4]
  }

  clone(): MoveSet {
    return new MoveSet(this.move1Storage.name, this.move2Storage.name, this.move3Storage.name, this.move4Storage.name)
  }

}