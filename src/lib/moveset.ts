export class MoveSet {
  
  activeMoveStorage: string
  move1Storage: string
  move2Storage: string
  move3Storage: string
  move4Storage: string

  constructor(move1: string, move2: string = "", move3: string = "", move4: string = "") {
    this.activeMoveStorage = move1
    this.move1Storage = move1
    this.move2Storage = move2
    this.move3Storage = move3
    this.move4Storage = move4
  }

  get activeMove(): string {
    return this.activeMoveStorage
  }

  set activeMove(move: string) {
    this.activeMoveStorage = move
  }
  
  get move1(): string {
    return this.move1Storage
  }

  set move1(move1: string) {
    this.move1Storage = move1
  }

  get move2(): string {
    return this.move2Storage
  }

  set move2(move2: string) {
    this.move2Storage = move2
  }

  get move3(): string {
    return this.move3Storage
  }

  set move3(move3: string) {
    this.move3Storage = move3
  }

  get move4(): string {
    return this.move4Storage
  }

  set move4(move4: string) {
    this.move4Storage = move4
  }

  activatedMovePosition(): number {
    if (this.move1Storage == this.activeMoveStorage) return 1
    if (this.move2Storage == this.activeMoveStorage) return 2
    if (this.move3Storage == this.activeMoveStorage) return 3
    if (this.move4Storage == this.activeMoveStorage) return 4
    return 0
  }

  clone(): MoveSet {
    return new MoveSet(this.move1Storage, this.move2Storage, this.move3Storage, this.move4Storage)
  }

}