import { AllPokemon } from "@data/pokemon-details"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { Regulation, SpeedFilterType } from "@lib/types"

export class SpeedCalculatorOptions {
  _topUsage: string
  readonly filterType: SpeedFilterType
  readonly regulation: Regulation
  readonly teamId: string
  readonly showMyTeam: boolean
  readonly targetName: string
  readonly mode: SpeedCalculatorMode
  readonly paralyzedActive: boolean
  readonly choiceScarfActive: boolean
  readonly speedDropActive: boolean
  readonly speedModifier: number

  constructor(
    options: {
      topUsage?: string
      filterType?: SpeedFilterType
      regulation?: Regulation
      teamId?: string
      showMyTeam?: boolean
      targetName?: string
      mode?: SpeedCalculatorMode
      speedDropActive?: boolean
      speedModifier?: number
      paralyzedActive?: boolean
      choiceScarfActive?: boolean
    } = {}
  ) {
    this._topUsage = options.topUsage ?? "All"
    this.filterType = options.filterType ?? "regulation"
    this.regulation = options.regulation ?? "I"
    this.teamId = options.teamId ?? ""
    this.showMyTeam = options.showMyTeam ?? false
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
