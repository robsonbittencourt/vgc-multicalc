export type SpeedData = {
  referenceDate: string
  baseSpeed: number
  minSpeedWithIvZero: number
  minSpeed: number
  maxSpeed: number
  maxSpeedWithNature: number
  choiceScarfPercentage?: number
  choiceScarfIsMoreUsed?: boolean
  boosterEnergyPercentage?: number
  boosterEnergyIsMoreUsed?: boolean
  statistics: SpeedStatistic[]
}

export type SpeedStatistic = {
  type: SpeedStatisticType
  speed: number
  percentile: number
  percentage: number
  speedEv: number
  nature: string
}

export type SpeedStatisticType = "usage" | "scarf" | "booster"
