export class SpeedCalculatorOptions {

  public speedDropMoveActive: boolean
  public paralyzedActive: boolean
  public choiceScarfActive: boolean

  constructor(options: { 
    speedDropMoveActive?: boolean
    paralyzedActive?: boolean
    choiceScarfActive?: boolean
  } = {}) {
    this.speedDropMoveActive = options.speedDropMoveActive ?? false
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
  }

}