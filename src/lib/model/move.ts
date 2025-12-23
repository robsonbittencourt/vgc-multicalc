import { MOVE_DETAILS } from "@data/move-details"
import { Generations, MOVES, Move as MoveSmogon } from "@robsonbittencourt/calc"

export class Move {
  readonly name: string
  readonly possibleHits: string[]
  readonly hits: string
  readonly alliesFainted: string
  readonly bp: number
  readonly accuracy: number
  readonly secondary: any
  readonly target: string

  constructor(name: string, options: { alliesFainted?: string; hits?: string } = {}) {
    this.name = name
    this.possibleHits = this.moveHits(name)
    this.hits = this.hitsValue(name, options)
    this.alliesFainted = options.alliesFainted ?? "0"
    this.bp = new MoveSmogon(Generations.get(9), name).bp

    const moveName = name?.toLowerCase().replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "")

    if (!moveName) {
      this.accuracy = 100
      this.secondary = null
      this.target = "normal"
    } else {
      const moveDetails = MOVE_DETAILS[moveName]
      this.accuracy = moveDetails.accuracy === true ? 100 : moveDetails.accuracy
      this.secondary = moveDetails.secondary
      this.target = moveDetails.target
    }
  }

  private hitsValue(name: string, options: any): string {
    const hits = options.hits ?? this.possibleHits[this.possibleHits.length - 1]

    if (name == "Dragon Darts") {
      return options.hits ?? this.possibleHits[0]
    }

    return hits
  }

  private moveHits(move: string): string[] {
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
