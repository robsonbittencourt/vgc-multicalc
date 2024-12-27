import { Regulation } from "@lib/types"

export class SpeedCalculatorOptions {
  readonly regulation: Regulation
  readonly targetName: string
  readonly paralyzedActive: boolean
  readonly choiceScarfActive: boolean
  readonly speedDropActive: boolean
  readonly speedModifier: number

  constructor(options: { regulation?: Regulation; targetName?: string; speedDropActive?: boolean; speedModifier?: number; paralyzedActive?: boolean; choiceScarfActive?: boolean } = {}) {
    this.regulation = options.regulation ?? "H"
    this.targetName = options.targetName ?? ""
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
    this.speedDropActive = options.speedDropActive ?? false
    this.speedModifier = options.speedModifier ?? 0
  }
}
