export class SpeedCalculatorOptions {
  readonly regulation: string
  readonly targetName: string
  readonly paralyzedActive: boolean
  readonly choiceScarfActive: boolean
  readonly speedDropActive: boolean
  readonly speedModifier: number

  constructor(options: { regulation?: string; targetName?: string; speedDropActive?: boolean; speedModifier?: number; paralyzedActive?: boolean; choiceScarfActive?: boolean } = {}) {
    this.regulation = options.regulation ?? "Reg H"
    this.targetName = options.targetName ?? ""
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
    this.speedDropActive = options.speedDropActive ?? false
    this.speedModifier = options.speedModifier ?? 0
  }
}
