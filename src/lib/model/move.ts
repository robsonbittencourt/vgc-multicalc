import { Generations, MOVES, Move as MoveSmogon } from "@robsonbittencourt/calc"

export class Move {
  readonly name: string
  readonly possibleHits: string[]
  readonly hits: string
  readonly alliesFainted: string
  readonly bp: number

  constructor(name: string, options: { alliesFainted?: string; hits?: string } = {}) {
    this.name = name
    this.possibleHits = this.moveHits(name)
    this.hits = options.hits ?? this.possibleHits[this.possibleHits.length - 1]
    this.alliesFainted = options.alliesFainted ?? "0"
    this.bp = new MoveSmogon(Generations.get(9), name).bp
  }

  moveHits(move: string): string[] {
    if (move === "Population Bomb") {
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }

    if (move === "Rage Fist") {
      return ["6", "5", "4", "3", "2", "1", "0"]
    }

    const multihit = MOVES[9][move]?.multihit

    if (!multihit) return []

    if (Array.isArray(multihit)) {
      const result: string[] = []

      for (let index = multihit[0]; index <= multihit[multihit.length - 1]; index++) {
        result.push(index.toString())
      }

      return result
    }

    return []
  }
}
