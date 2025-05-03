import { AllPokemon } from "@data/all-pokemon"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { Regulation } from "@lib/types"

export class SpeedCalculatorOptions {
  _topUsage: string
  readonly regulation: Regulation
  readonly targetName: string
  readonly mode: SpeedCalculatorMode
  readonly paralyzedActive: boolean
  readonly choiceScarfActive: boolean
  readonly speedDropActive: boolean
  readonly speedModifier: number

  constructor(options: { topUsage?: string; regulation?: Regulation; targetName?: string; mode?: SpeedCalculatorMode; speedDropActive?: boolean; speedModifier?: number; paralyzedActive?: boolean; choiceScarfActive?: boolean } = {}) {
    this._topUsage = options.topUsage ?? "60"
    this.regulation = options.regulation ?? "I"
    this.targetName = options.targetName ?? ""
    this.mode = options.mode ?? SpeedCalculatorMode.StatsAndMeta
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
    this.speedDropActive = options.speedDropActive ?? false
    this.speedModifier = options.speedModifier ?? 0
  }

  get topUsage(): number {
    if (this._topUsage == "All") {
      return AllPokemon.instance.allPokemonNames.length + 1
    }

    return +this._topUsage
  }
}
