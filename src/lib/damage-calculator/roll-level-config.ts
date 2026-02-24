export class RollLevelConfig {
  static readonly HIGH_ROLL_INDEX = 15
  static readonly MEDIUM_ROLL_INDEX = 7
  static readonly LOW_ROLL_INDEX = 0
  static readonly ROLLS_NUMBER = 16

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

  toRollIndex(): number {
    if (this.high) return RollLevelConfig.HIGH_ROLL_INDEX
    if (this.medium) return RollLevelConfig.MEDIUM_ROLL_INDEX

    return RollLevelConfig.LOW_ROLL_INDEX
  }
}
