import { POKEMON_DETAILS } from "@data/pokemon-details"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { Regulation } from "@lib/types"

export class SpeedCalculatorOptions {
  _topUsage: string
  readonly regulation: Regulation
  readonly targetName: string
  readonly mode: SpeedCalculatorMode
  readonly paralyzedActive: boolean
  readonly speedDropActive: boolean
  readonly speedModifier: number

  constructor(options: { topUsage?: string; regulation?: Regulation; targetName?: string; mode?: SpeedCalculatorMode; speedDropActive?: boolean; speedModifier?: number; paralyzedActive?: boolean } = {}) {
    this._topUsage = options.topUsage ?? "All"
    this.regulation = options.regulation ?? "MA"
    this.targetName = options.targetName ?? ""
    this.mode = options.mode ?? SpeedCalculatorMode.StatsAndMeta
    this.paralyzedActive = options.paralyzedActive ?? false
    this.speedDropActive = options.speedDropActive ?? false
    this.speedModifier = options.speedModifier ?? 0
  }

  get topUsage(): number {
    if (this._topUsage == "All") {
      return Object.keys(POKEMON_DETAILS).length + 1
    }

    return +this._topUsage
  }
}
