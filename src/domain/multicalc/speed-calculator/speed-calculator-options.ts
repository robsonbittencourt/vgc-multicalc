import { POKEMON_DATA } from "@data/pokemon-data"
import { SpeedCalculatorMode } from "@multicalc/speed-calculator/speed-calculator-mode"
import { Regulation, SpeedFilterType } from "@multicalc/types"

export class SpeedCalculatorOptions {
  _topUsage: string
  readonly filterType: SpeedFilterType
  readonly regulation: Regulation
  readonly teamId: string
  readonly showMyTeam: boolean
  readonly targetName: string
  readonly mode: SpeedCalculatorMode
  readonly paralyzedActive: boolean
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
    } = {}
  ) {
    this._topUsage = options.topUsage ?? "All"
    this.filterType = options.filterType ?? "regulation"
    this.regulation = options.regulation ?? "MB"
    this.teamId = options.teamId ?? ""
    this.showMyTeam = options.showMyTeam ?? false
    this.targetName = options.targetName ?? ""
    this.mode = options.mode ?? SpeedCalculatorMode.StatsAndMeta
    this.paralyzedActive = options.paralyzedActive ?? false
    this.speedDropActive = options.speedDropActive ?? false
    this.speedModifier = options.speedModifier ?? 0
  }

  get topUsage(): number {
    if (this._topUsage == "All") {
      return Object.values(POKEMON_DATA).filter(p => p.group !== undefined).length + 1
    }

    return +this._topUsage
  }
}
