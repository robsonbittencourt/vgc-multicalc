import { PokemonType, Stats } from "@multicalc/types"
import { getMoveData } from "@data/move-data"

export type Category = "Physical" | "Special" | "Status"

export type SecondaryEffect = {
  chance: number
  status?: string
  volatileStatus?: string
  boosts?: Partial<Record<keyof Stats | "accuracy", number>>
}

interface MoveOptions {
  alliesFainted?: string
  hits?: string
  lastMoveFailed?: boolean
}

interface MoveDetailsResolved {
  bp: number
  category: Category
  type: PokemonType
  accuracy: number
  secondary: SecondaryEffect | null
  target: string
}

const EMPTY_MOVE_DEFAULTS: MoveDetailsResolved = {
  bp: 0,
  category: "Status",
  type: "Normal",
  accuracy: 100,
  secondary: null,
  target: "normal"
}

export class Move {
  readonly name: string
  readonly possibleHits: string[]
  readonly multiaccuracy: boolean
  readonly hits: string
  readonly alliesFainted: string
  readonly lastMoveFailed: boolean
  readonly bp: number
  readonly accuracy: number
  readonly secondary: SecondaryEffect | null
  readonly target: string
  readonly category: Category
  readonly type: PokemonType

  constructor(name: string, options: MoveOptions = {}) {
    this.name = name ?? ""
    this.possibleHits = this.moveHits(name)
    this.multiaccuracy = getMoveData(name)?.multiaccuracy ?? false
    this.hits = this.hitsValue(name, options)
    this.alliesFainted = options.alliesFainted ?? "0"
    this.lastMoveFailed = options.lastMoveFailed ?? false

    const resolved = this.resolveDetails(name)

    this.bp = resolved.bp
    this.category = resolved.category
    this.type = resolved.type
    this.accuracy = resolved.accuracy
    this.secondary = resolved.secondary
    this.target = resolved.target
  }

  hasType(type: PokemonType): boolean {
    return this.type === type
  }

  private resolveDetails(name: string): MoveDetailsResolved {
    const moveDetails = getMoveData(name)

    if (!moveDetails) {
      return { ...EMPTY_MOVE_DEFAULTS }
    }

    return {
      bp: moveDetails.basePower,
      category: (moveDetails.category as Category) ?? "Status",
      type: moveDetails.type as PokemonType,
      accuracy: !moveDetails.accuracy || moveDetails.accuracy === true ? 100 : moveDetails.accuracy,
      secondary: (moveDetails.secondary as SecondaryEffect | null) ?? null,
      target: moveDetails.target ?? "normal"
    }
  }

  private hitsValue(name: string, options: MoveOptions): string {
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

    const multihit = getMoveData(move)?.multihit

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
