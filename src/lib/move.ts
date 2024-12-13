import { Generations, MOVES, Move as MoveSmogon } from "@robsonbittencourt/calc"

export class Move {

  nameStorage: string
  possibleHitsStorage: string[]
  hitsStorage: string
  alliesFainted: string
  bpStorage: number

  constructor(name: string, options: {
    alliesFainted?: string
    hits?: string
  } = {}) {
    this.nameStorage = name
    this.possibleHitsStorage = this.moveHits(name)
    this.hitsStorage = options.hits ?? this.possibleHitsStorage[0]
    this.alliesFainted = options.alliesFainted ?? "0"
    this.bpStorage = new MoveSmogon(Generations.get(9), name).bp
  }

  get name(): string {
    return this.nameStorage
  }

  set name(name: string) {
    if(name != this.nameStorage) {
      this.nameStorage = name
      this.possibleHitsStorage = this.moveHits(name)
      this.hitsStorage = this.possibleHitsStorage[0]
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

  bp(): number {
    return this.bpStorage
  }

  moveHits(move: string): string[] {
    if (move === "Population Bomb") {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }

    if (move === "Rage Fist") {
      return ["0", "1", "2", "3", "4", "5", "6"]
    }
    
    const multihit = MOVES[9][move]?.multihit
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

  equals(move: Move): boolean {
    return this.name == move.name
  }

}