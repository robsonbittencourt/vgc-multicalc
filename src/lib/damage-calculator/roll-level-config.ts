export class RollLevelConfig {
  high: boolean
  medium: boolean
  low: boolean

  private constructor(high: boolean, medium: boolean, low: boolean) {
    this.high = high
    this.medium = medium
    this.low = low
  }

  static high(): RollLevelConfig {
    return new RollLevelConfig(true, false, false)
  }

  static medium(): RollLevelConfig {
    return new RollLevelConfig(false, true, false)
  }

  static low(): RollLevelConfig {
    return new RollLevelConfig(false, false, true)
  }
}
