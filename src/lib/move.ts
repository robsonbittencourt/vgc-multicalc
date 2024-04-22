import { MOVES } from "@smogon/calc"

export class Move {

  nameStorage: string
  possibleHitsStorage: string[]
  hitsStorage: string

  constructor(name: string) {
    this.nameStorage = name
    this.possibleHitsStorage = this.moveHits(name)
    this.hitsStorage = this.possibleHitsStorage[this.possibleHitsStorage.length - 1]
  }

  get name(): string {
    return this.nameStorage
  }

  set name(name: string) {
    if(name != this.nameStorage) {
      this.nameStorage = name
      this.possibleHitsStorage = this.moveHits(name)
      this.hitsStorage = this.possibleHitsStorage[this.possibleHitsStorage.length - 1]
    }    
  }

  get possibleHits(): string[] {
    return this.possibleHitsStorage
  }

  get hits(): string {
    return this.hitsStorage
  }

  set hits(hits: string) {
    this.hitsStorage = hits
  }

  moveHits(move: string): string[] {
    if (move === "Population Bomb") {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }
    
    const multihit = MOVES[9][move].multihit
    if(!multihit) return []

    if (Array.isArray(multihit)) {
      const result: string[] = []

      for (let index = multihit[0]; index <= multihit[multihit.length -1]; index++) {
        result.push(index.toString())
      }
      return result
    }

    return []
  }

}