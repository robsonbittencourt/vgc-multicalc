export class SpeedCalculatorOptions {

  public regulation: string
  public targetName: string
  public paralyzedActive: boolean
  public choiceScarfActive: boolean
  
  private _speedDropActive: boolean
  private _speedModifier: number


  constructor(options: {
    regulation?: string
    targetName?: string
    speedDropActive?: boolean
    speedModifier?: number 
    paralyzedActive?: boolean
    choiceScarfActive?: boolean
  } = {}) {
    this.regulation = options.regulation ?? "Reg H"
    this.targetName = options.targetName ?? ""
    this._speedDropActive = options.speedDropActive ?? false
    this._speedModifier = options.speedModifier ?? 0
    this.paralyzedActive = options.paralyzedActive ?? false
    this.choiceScarfActive = options.choiceScarfActive ?? false
  }

  get speedDropActive(): boolean {
    return this._speedDropActive
  }

  set speedDropActive(speedDropActive: boolean) {
    if(speedDropActive) {
      this.speedModifier = -1
    } else {
      this.speedModifier = 0
    }

    this._speedDropActive = speedDropActive
  }

  get speedModifier(): number {
    return this._speedModifier
  }

  set speedModifier(speedModifier: number) {
    this._speedModifier = speedModifier
    
    if(speedModifier != 1) {
      this._speedDropActive = false
    }
  }

}