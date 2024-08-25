export class SpeedCalculatorOptions {

  public speedModifier: number
  public paralyzedActive: boolean
  public choiceScarfActive: boolean

  constructor(options: {
    speedModifier?: number 
    paralyzedActive?: boolean
    choiceScarfActive?: boolean
  } = {}) {
    this.speedModifier = options.speedModifier ?? 0
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
  }

}