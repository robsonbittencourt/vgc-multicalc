export class SpeedCalculatorOptions {

  public regulation: string
  public speedModifier: number
  public paralyzedActive: boolean
  public choiceScarfActive: boolean

  constructor(options: {
    regulation?: string
    speedModifier?: number 
    paralyzedActive?: boolean
    choiceScarfActive?: boolean
  } = {}) {
    this.regulation = options.regulation ?? "Reg G"
    this.speedModifier = options.speedModifier ?? 0
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
  }

}